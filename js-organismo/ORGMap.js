/**
 * Created by jongabilondo on 10/12/2016.
 */


/**
 * Class to visualize and operate a Google Map.
 * It is a Location provider. Holds a list of location listeners that will get notified the location.
 */
class ORGMap extends ORGLocationProvider {

    constructor() {
        super();

        this._map = this._createMap(document.getElementById('map'), true);
        this._elevationService = new google.maps.ElevationService();
        this._geocoder = new google.maps.Geocoder();
        this._directionsService = new google.maps.DirectionsService();
        this._directionsDisplay = this._createDirectionsRenderer(this._map);
        this._directions = null;
        this._elevations = null;
        this._itineraryRunner = null;
        this._startLocationMarker = null;
        this._itineraryLocationMarker = null;
        this._startLocation = null;
        this._endLocation = null;

        this._initSearchBoxAutocomplete();
        this._initAutocompleteStartLocation();
        this._initAutocompleteEndLocation();

        // Load the Visualization API and the piechart package.
        //var _this = this;
        //google.load("visualization", "1.0", {packages: ["columnchart"], "callback" : function() {_this._googlePackagesLoaded}});

        this._chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
    }

    //------------------------------------------------------------------------------------------------------------------
    // GET/SET
    //------------------------------------------------------------------------------------------------------------------

    get isCreated() {
        return !!this._map;
    }

    get travelMode() {
        return ORG.UI.dropdownTravelMode.val();
    }

    //------------------------------------------------------------------------------------------------------------------
    // PUBLIC
    //------------------------------------------------------------------------------------------------------------------

    run() {
        if (this._directions) {
            let itinerary = new ORGItinerary(this._directions.routes[0], this._elevations, this._startLocation, this._endLocation);
            this._itineraryRunner = new ORGItineraryRunner(itinerary);
            this._itineraryRunner.addListener(ORG.locationManager); // The locationManager will receive location updates
            this._itineraryRunner.start();
        }
    }

    pause() {
        if (this._itineraryRunner) {
            this._itineraryRunner.pause();
        }
    }

    resume() {
        if (this._itineraryRunner) {
            this._itineraryRunner.resume();
        }
    }

    stop() {
        if (this._itineraryRunner) {
            this._itineraryRunner.stop();
        }
    }

    updateItineraryLocation(lat, lng) {

        if (!this._itineraryLocationMarker) {
            this._itineraryLocationMarker = new google.maps.Marker({
                map: this._map,
                icon: "img/map_loc_20.png",
                anchorPoint: new google.maps.Point(10, 10)
            });
        }
        if (lat && lng) {
            const loc = new google.maps.LatLng(lat, lng);
            this._itineraryLocationMarker.setOptions({"position":loc, "anchorPoint":new google.maps.Point(10, 10)});
            this._map.setCenter(loc);
            //this._itineraryLocationMarker.setPosition(new google.maps.LatLng(lat, lng));

        } else {
            this._itineraryLocationMarker.setMap(null);
            this._itineraryLocationMarker = null;
        }
    }

    /**
     * Reset the itinerary. Remove the markers of start end points. Clean all structures and UI related to the itenerary.
     */
    resetItinerary() {
        if (this._startLocationMarker) {
            this._startLocationMarker.setMap(null);
            this._startLocationMarker = null;
        }

        this._directionsDisplay.setMap(null);
        this._directionsDisplay = null;
        this._directionsDisplay = this._createDirectionsRenderer(this._map);

        this._startLocation = null;
        this._endLocation = null;

        try {
            this._chart.clearChart(); // not working !
        } catch (e) {
            // TO DO, such a simple thing
        }

        ORG.dispatcher.dispatch({
            actionType: 'reset-itinerary'
        });
    }

    sendStartLocationToDevice() {
        if (this._startLocation) {
            this._broadcastLocation(this._startLocation, null, null);
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // PRIVATE
    //------------------------------------------------------------------------------------------------------------------

    /**
     * Create a Google map on the given DOM element and set the curret location provided by the browser.
     * @param DOM element placeholder
     * @param onCurrentLocation
     * @returns {google.maps.Map}
     * @private
     */
    _createMap(onElement, onCurrentLocation) {
        let map = new google.maps.Map(onElement, {
            //center: {lat: -33.8688, lng: 151.2195},
            zoom: 13,
            mapTypeId: 'roadmap'
        });

        if (onCurrentLocation) {
            const _this = this;
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    map.setCenter(pos);
                }, function () {
                    let center = new THREE.Vector3();
                    map.getCenter(center);
                    _this_.handleLocationError(true, center);
                });
            } else {
                // Browser doesn't support Geolocation
                let center = new THREE.Vector3();
                map.getCenter(center);
                _this._handleLocationError(false, center);
            }
        }

        return map;
    }

    _createDirectionsRenderer(map) {

        const _this = this;

        let directionsDisplay = new google.maps.DirectionsRenderer({
            'map': map,
            'preserveViewport': true,
            'draggable': true
        });

        google.maps.event.addListener(directionsDisplay, 'directions_changed',
            function () {

                // get new itinerary data
                _this._updateItineraryValues(directionsDisplay.getDirections());
                //const distance = _this._calculateDistance(directionsDisplay.getDirections());
                //const duration = _this._calculateDuration(directionsDisplay.getDirections());
                //
                //ORG.dispatcher.dispatch({
                //    actionType: 'itinerary-changed',
                //    distance: distance,
                //    duration: duration
                //});

                // get new elevations
                _this._elevationService.getElevationAlongPath({
                    path: directionsDisplay.getDirections().routes[0].overview_path,
                    samples: 256
                }, function (results) {
                    _this._plotElevation(results)
                });
            });
        return directionsDisplay;
    }


    _initSearchBoxAutocomplete() {
        // Create the search box and link it to the UI element.
        const input = document.getElementById('pac-input');
        const searchBox = new google.maps.places.SearchBox(input);
        this._map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        const _this = this;
        // Bias the SearchBox results towards current map's viewport.
        this._map.addListener('bounds_changed', function () {
            searchBox.setBounds(_this._map.getBounds());
        });

        this._map.addListener('rightclick', function (event) {
            _this._onRightClick(event, _this);
        });

        this._map.addListener('click', function (event) {
            _this._onClick(event);
        });


        //var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function () {
            const places = searchBox.getPlaces();

            if (places.length == 0) {
                return;
            }

            //_this._removeMarker();

            // For each place, get the icon, name and location.
            const bounds = new google.maps.LatLngBounds();
            places.forEach(function (place) {
                if (!place.geometry) {
                    console.log("Returned place contains no geometry");
                    return;
                }
                //const icon = {
                //    url: place.icon,
                //    size: new google.maps.Size(71, 71),
                //    origin: new google.maps.Point(0, 0),
                //    anchor: new google.maps.Point(17, 34),
                //    scaledSize: new google.maps.Size(25, 25)
                //};
                //
                //// Create a marker for each place.
                //markers.push(new google.maps.Marker({
                //    map: _this._map,
                //    icon: icon,
                //    title: place.name,
                //    position: place.geometry.location
                //}));
                //_this._createMarker(place.geometry.location);

                if (place.geometry.viewport) {
                    bounds.union(place.geometry.viewport); // Only geocodes have viewport.
                } else {
                    bounds.extend(place.geometry.location);
                }


            });
            _this._map.fitBounds(bounds);
        });
    }

    _initAutocompleteStartLocation() {
        const _this = this;
        const options = null;
        let autocomplete = new google.maps.places.Autocomplete(document.getElementById('start-point'), options);

        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            _this._autompleteSelectedStartPoint(autocomplete, _this._map);
        });
    }

    _initAutocompleteEndLocation() {
        const _this = this;
        const options = null;
        let autocomplete = new google.maps.places.Autocomplete(document.getElementById('end-point'), options);

        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            _this._autompleteSelectedEndPoint(autocomplete, _this._map);
        });

    }

    _autompleteSelectedStartPoint(autocomplete, map) {
        let place = autocomplete.getPlace();
        const location = place.geometry.location;
        map.panTo(location);
        this._setStartLocationWithAddress(location, place.formatted_address);
    }


    _autompleteSelectedEndPoint(autocomplete, map) {
        let place = autocomplete.getPlace();
        const location = place.geometry.location;
        this._setEndLocationWithAddress(location, place.formatted_address);
    }

    _onClick(event) {
        if (this._startLocation == null) {
            this._setStartLocation(event.latLng);
        } else {
            this._setEndLocation(event.latLng);
        }
    }

    _onRightClick(event, ORGMap) {

    }

    _setStartLocation(location) {
        const _this = this;
        this._getLocationAddress(location, function (address) {
            _this._setStartLocationWithAddress(location, address);
        });
    }

    _setStartLocationWithAddress(location, address) {
        this._startLocation = location;
        this._startLocationMarker = this._createMarker(location, "A");
        const _this = this;
        google.maps.event.addListener(this._startLocationMarker, 'dragend', function () {
            _this._startLocation = _this._startLocationMarker.getPosition();
            //_this._getLocationInfoAndBroadcast(_this._startLocation);

            _this._getLocationAddress( _this._startLocation, function(address) {
                _this._broadcastLocation(_this._startLocation, address, null);
                ORG.dispatcher.dispatch({
                    actionType: 'start-location-update',
                    lat: _this._startLocation.lat(),
                    lng: _this._startLocation.lng(),
                    elevation: null,
                    address: address
                });
            });
        });
        this._getLocationInfoAndBroadcast(location);


        if (this._endLocation) {
            this._removeMarker(); // Remove A, it's going to be created by the DirectionsRenderer
            this._calcRoute();
        }

        ORG.dispatcher.dispatch({
            actionType: 'start-location-update',
            lat: location.lat(),
            lng: location.lng(),
            elevation: null,
            address: address
        });
    }

    _setEndLocation(location) {
        const _this = this;
        this._getLocationAddress(location, function (address) {
            _this._setEndLocationWithAddress(location, address);
        });
    }

    _setEndLocationWithAddress(location, address) {
        this._endLocation = location;

        if (this._startLocation) {
            this._removeMarker(); // Remove A, it's going to be created by the DirectionsRenderer
            this._calcRoute();
        }

        ORG.dispatcher.dispatch({
            actionType: 'end-location-update',
            lat: location.lat(),
            lng: location.lng(),
            elevation: null,
            address: address
        });
    }

    _createMarker(location, label) {
        let marker = new google.maps.Marker({
            position: location,
            map: this._map,
            animation: google.maps.Animation.DROP,
            draggable: true,
            label: label
        });
        return marker;

    }

    _removeMarker() {
        if (this._startLocationMarker) {
            this._startLocationMarker.setMap(null);
            this._startLocationMarker = null;
        }
    }

    _getLocationAddress(location, completion) {
        const _this = this;
        this._geocodePosition(location, function (location, address, elevation) {
            if (completion) {
                completion(address);
            }
        });
    }

    _getLocationInfoAndBroadcast(location) {
        const _this = this;
        this._geocodePosition(location, function (location, address, elevation) {
            _this._broadcastLocation(location, address, elevation);
        });
    }

    _geocodePosition(location, onCompletion) {
        const _this = this;

        this._geocoder.geocode({
            latLng: location
        }, function (responses) {
            if (responses && responses.length > 0) {
                _this._elevationPosition(location, responses[0].formatted_address, onCompletion);
            } else {
                _this._elevationPosition(location, null, onCompletion);
            }
        });
    }

    _elevationPosition(location, address, onCompletion) {
        const _this = this;

        this._elevationService.getElevationForLocations({
            'locations': [location]
        }, function (results, status) {

            if (status === 'OK') {
                if (results[0] && onCompletion) {
                    onCompletion(location, address, results[0].elevation);
                }
            }
        });
    }

    _calcRoute() {
        const request = {
            origin: this._startLocation,
            destination: this._endLocation,
            travelMode: this.travelMode//google.maps.DirectionsTravelMode.DRIVING
        };

        let _this = this;
        this._directionsService.route(request, function (response, status) {

            if (status == google.maps.DirectionsStatus.OK) {
                const SAMPLES = 256;
                _this._directions = response;
                _this._directionsDisplay.setDirections(response);
                _this._elevationService.getElevationAlongPath({
                        path: response.routes[0].overview_path,
                        samples: SAMPLES
                    }, function (results) {
                        _this._elevations = results;
                        _this._plotElevation(results)
                    }
                );
            }
        });
    }

    // Takes an array of ElevationResult objects, draws the path on the map
    // and plots the elevation profile on a GViz ColumnChart
    _plotElevation(results) {
        const elevations = results;

        let path = [];
        for (let i = 0; i < results.length; i++) {
            path.push(elevations[i].location);
            //console.log("elevation:",i,"value:",elevations[i]);
            //console.log(elevations[i].location);
        }

        //if (this._polyline) {
        //    this._polyline.setMap(null);
        //}
        //
        //this._polyline = new google.maps.Polyline({
        //    path: path,
        //    strokeColor: "#000000",
        //    map: this.map});

        let data = new google.visualization.DataTable();
        data.addColumn('string', 'Sample');
        data.addColumn('number', 'Elevation');
        for (let i = 0; i < results.length; i++) {
            data.addRow(['', elevations[i].elevation]);
        }

        document.getElementById('chart_div').style.display = 'block';
        this._chart.draw(data, {
            //width: 200,
            height: 160,
            legend: 'none',
            titleY: 'Elevation (m)',
            focusBorderColor: '#00ff00'
        });
    }

    _removeElevationChart() {
        document.getElementById('chart_div').style.display = 'none';
    }


    _handleLocationError(browserHasGeolocation, pos) {
        let infoWindow = new google.maps.InfoWindow;
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }

    _calculateDistance(directions) {
        let distance = 0;
        const nlegs = directions.routes[0].legs.length;
        for (let i = 0; i < nlegs; i++) {
            distance += directions.routes[0].legs[i].distance.value;
        }
        return distance;
    }

    _calculateDuration(directions) {
        let duration = 0;
        const nlegs = directions.routes[0].legs.length;
        for (let i = 0; i < nlegs; i++) {
            duration += directions.routes[0].legs[i].duration.value;
        }
        return duration;
    }

    _updateItineraryValues(directions) {
        const nlegs = directions.routes[0].legs.length;

        this._startLocation = directions.routes[0].legs[0].start_location;
        this._endLocation = directions.routes[0].legs[nlegs-1].end_location;
        const startAddress = directions.routes[0].legs[0].start_address;
        const endAddress = directions.routes[0].legs[nlegs-1].end_address;

        const distance = this._calculateDistance(directions);
        const duration = this._calculateDuration(directions);

        ORG.dispatcher.dispatch({
            actionType: 'itinerary-changed',
            distance: distance,
            duration: duration,
            start_address: startAddress,
            end_address: endAddress,
            start_location: this._startLocation,
            end_location: this._endLocation,
        });
    }
}