/**
 * Created by jongabilondo on 04/05/2016.
 */
/**
 *   Snap marker to closest point on a line.
 *
 *   Based on Distance to line example by
 *	Marcelo, maps.forum.nu - http://maps.forum.nu/gm_mouse_dist_to_line.html
 *   Then
 *	@ work of Björn Brala - Swis BV who wrapped the algorithm in a class operating on GMap Objects
 *   And now
 *	Bill Chadwick who factored the basic algorithm out of the class (removing much intermediate storage of results)
 *   	and added distance along line to nearest point calculation
 *
 *
 *   Usage:
 *
 *   Create the class
 *       var oSnap = new cSnapToRoute();
 *
 *   Initialize the subjects
 *       oSnap.init(oMap, oMarker, oPolyline);
 *
 *   If needed change the marker or polyline subjects. use null when no update
 *       Change Both:
 *           oSnap.updateTargets(oMarker, oPolyline);
 *       Change marker:
 *           oSnap.updateTargets(oMarker, null);
 *       Change polyline:
 *           oSnap.updateTargets(null, oPolyline);
 **/

function cSnapToRoute(){

    this.routePoints    = Array();
    this.routePixels    = Array();
    this.routeOverlay   = null;
    this.normalProj     = G_NORMAL_MAP.getProjection();


    /**
     *   @desc Initialize the objects.
     *   @param Map object
     *   @param GMarker object to move along the route
     *   @param GPolyline object - the 'route'
     **/
    this.init = function(oMap, oMarker, oPolyline){
        this._oMap      = oMap;
        this._oMarker   = oMarker;
        this._oPolyline = oPolyline;

        this.loadRouteData();   // Load needed data for point calculations
        this.loadMapListener();
    }

    /**
     *   @desc Update targets
     *   @param GMarker object to move along the route
     *   @param GPolyline object - the 'route'
     **/
    this.updateTargets = function(oMarker, oPolyline) {
        this._oMarker   = oMarker   || this._oMarker;
        this._oPolyline = oPolyline || this._oPolyline;
        this.loadRouteData();
    }

    /**
     *   @desc internal use only, Load map listeners to calculate and update this.oMarker position.
     **/
    this.loadMapListener = function(){
        var self = this;
        GEvent.addListener(self._oMap, 'mousemove', GEvent.callback(self, self.updateMarkerLocation));
        GEvent.addListener(self._oMap, 'zoomend', GEvent.callback(self, self.loadRouteData));
    }

    /**
     *   @desc internal use only, Load route points into RoutePixel array for calculations, do this whenever zoom changes
     **/
    this.loadRouteData = function(){
        var zoom = this._oMap.getZoom();
        this.routePixels = new Array();
        for ( var i = 0; i < this._oPolyline.getVertexCount(); i++ ) {
            var Px = this.normalProj.fromLatLngToPixel(this._oPolyline.getVertex(i), zoom);
            this.routePixels.push(Px);
        }
    }

    /**
     *   @desc internal use only, Handle the move listeners output and move the given marker.
     *   @param GLatLng()
     **/
    this.updateMarkerLocation = function(mouseLatLng) {
        var oMarkerLatLng = this.getClosestLatLng(mouseLatLng);
        this._oMarker.setPoint(oMarkerLatLng);
    }

    /**
     *   @desc Get closest point on route to test point
     *   @param GLatLng() the test point
     *   @return new GLatLng();
     **/
    this.getClosestLatLng = function(latlng){
        var r = this.distanceToLines(latlng);
        return this.normalProj.fromPixelToLatLng(new GPoint(r.x,r.y), this._oMap.getZoom());
    }

    /**
     *   @desc Get distance along route in meters of closest point on route to test point
     *   @param GLatLng() the test point
     *   @return distance in meters;
     **/
    this.getDistAlongRoute = function(latlng){
        var r = this.distanceToLines(latlng);
        return this.getDistToLine(r.i, r.fTo);
    }

    /**
     *   @desc internal use only, gets test point xy and then calls fundamental algorithm
     **/
    this.distanceToLines = function(mouseLatLng) {
        var zoom        = this._oMap.getZoom();
        var mousePx     = this.normalProj.fromLatLngToPixel(mouseLatLng, zoom);
        var routePixels = this.routePixels;
        return getClosestPointOnLines(mousePx,routePixels);
    }

    /**
     *   @desc internal use only, find distance along route to point nearest test point
     **/
    this.getDistToLine = function(iLine, fTo){

        var routeOverlay = this._oPolyline;
        var d = 0;
        for (var n = 1 ; n < iLine ; n++ )
            d += routeOverlay.getVertex(n-1).distanceFrom(routeOverlay.getVertex(n));
        d += routeOverlay.getVertex(iLine-1).distanceFrom(routeOverlay.getVertex(iLine)) * fTo;

        return d;
    }


}

/* desc Static function. Find point on lines nearest test point
 test point pXy with properties .x and .y
 lines defined by array aXys with nodes having properties .x and .y
 return is object with .x and .y properties and property i indicating nearest segment in aXys
 and property fFrom the fractional distance of the returned point from aXy[i-1]
 and property fTo the fractional distance of the returned point from aXy[i]	*/


function getClosestPointOnLines (pXy,aXys) {

    var minDist;
    var fTo;
    var fFrom;
    var x;
    var y;
    var i;
    var dist;

    if (aXys.length > 1){

        for (var n = 1 ; n < aXys.length ; n++ ) {

            if (aXys[n].x != aXys[n-1].x) {
                var a = (aXys[n].y - aXys[n-1].y) / (aXys[n].x - aXys[n-1].x);
                var b = aXys[n].y - a * aXys[n].x;
                dist = Math.abs(a*pXy.x + b - pXy.y) / Math.sqrt(a*a+1);
            }
            else
                dist = Math.abs(pXy.x - aXys[n].x)

            // length^2 of line segment
            var rl2 = Math.pow(aXys[n].y - aXys[n-1].y,2) + Math.pow(aXys[n].x - aXys[n-1].x,2);

            // distance^2 of pt to end line segment
            var ln2 = Math.pow(aXys[n].y - pXy.y,2) + Math.pow(aXys[n].x - pXy.x,2);

            // distance^2 of pt to begin line segment
            var lnm12 = Math.pow(aXys[n-1].y - pXy.y,2) + Math.pow(aXys[n-1].x - pXy.x,2);

            // minimum distance^2 of pt to infinite line
            var dist2 = Math.pow(dist,2);

            // calculated length^2 of line segment
            var calcrl2 = ln2 - dist2 + lnm12 - dist2;

            // redefine minimum distance to line segment (not infinite line) if necessary
            if (calcrl2 > rl2)
                dist = Math.sqrt( Math.min(ln2,lnm12) );

            if ( (minDist == null) || (minDist > dist) ) {
                if(calcrl2 > rl2){
                    if(lnm12 < ln2){
                        fTo = 0;//nearer to previous point
                        fFrom = 1;
                    }
                    else{
                        fFrom = 0;//nearer to current point
                        fTo = 1;
                    }
                }
                else {
                    // perpendicular from point intersects line segment
                    fTo  = ((Math.sqrt(lnm12 - dist2)) / Math.sqrt(rl2));
                    fFrom = ((Math.sqrt(ln2 - dist2))   / Math.sqrt(rl2));
                }
                minDist = dist;
                i = n;
            }
        }

        var dx = aXys[i-1].x - aXys[i].x;
        var dy = aXys[i-1].y - aXys[i].y;

        x = aXys[i-1].x - (dx * fTo);
        y = aXys[i-1].y - (dy * fTo);

    }

    return {'x':x, 'y':y, 'i':i, 'fTo':fTo, 'fFrom':fFrom};

}

