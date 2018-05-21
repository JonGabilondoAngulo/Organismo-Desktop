/**
 * Created by jongabilondo on 20/07/2017.
 */


class ORGItinerary {

    constructor(route, elevations, startLocation, endLocation) {
        this._startLocation = startLocation;
        this._endLocation = endLocation;
        //this._startLocationAddress = null;
        //this._endLocationAddress = null;
        this._duration = 0;
        this._polyline = this._calculateRoutePolyline(route);
        this._length = google.maps.geometry.spherical.computeLength(this._polyline.getPath().getArray());
        this._elevations = elevations;
        this._startDate = null;
        this._mode = null;
    }

    //------------------------------------------------------------------------------------------------------------------
    // GET/SET
    //------------------------------------------------------------------------------------------------------------------

    get startlocation() {
        return this._startLocation;
    }

    get endLocation() {
        return this._endLocation;
    }

    //get startLocationAddress() {
    //    return this._startLocationAddress;
    //}
    //
    //get endLocationAddress() {
    //    return this._endLocationAddress;
    //}

    get duration() {
        return this._duration;
    }

    get length() {
        return this._length;
    }

    get polyline() {
        return this._polyline;
    }

    get elevations() {
        return this._elevations;
    }

    //------------------------------------------------------------------------------------------------------------------
    // PRIVATE
    //------------------------------------------------------------------------------------------------------------------

    _calculateRoutePolyline(route) {

        var totalDistance = 0;
        var totalDuration = 0;
        const legs = route.legs;

        var routePoly = new google.maps.Polyline({
            path: [],
            strokeColor: '#FF0000',
            strokeWeight: 3
        });
        for (let i = 0; i < legs.length; ++i) {
            totalDistance += legs[i].distance.value;
            totalDuration += legs[i].duration.value;

            const steps = legs[i].steps;
            for (let j = 0; j < steps.length; j++) {
                let nextSegment = steps[j].path;
                for (let k = 0; k < nextSegment.length; k++) {
                    routePoly.getPath().push(nextSegment[k]);
                }
            }
        }
        return routePoly;
    }
}