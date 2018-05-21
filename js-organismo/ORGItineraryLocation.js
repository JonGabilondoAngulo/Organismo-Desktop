/**
 * Created by jongabilondo on 23/07/2017.
 */

class ORGItineraryLocation {

    constructor(routePolyline, elevations, routeLength) {
        this._routePolyline = routePolyline;
        this._elevations = elevations;
        this._routeTotalDistance = routeLength;
        this._lastLocation = null;
        this._lastLocationTime = 0;
        this._currentLocation = null;
        this._distance = 0;
        this._speed = 0;
    }

    //------------------------------------------------------------------------------------------------------------------
    // GET/SET
    //------------------------------------------------------------------------------------------------------------------

    set distance(distance) {
        const nowTime = new Date().getTime()/1000; // seconds

        if (this._lastLocationTime > 0) {
            const timeDelta = nowTime - this._lastLocationTime;
            const distanceDelta = distance - this._distance;
            this._speed = distanceDelta/timeDelta;
        }

        this._distance = distance;
        this._lastLocation = this._currentLocation;
        this._currentLocation = this._routePolyline.GetPointAtDistance(this._distance);
        this._lastLocationTime = nowTime;
    }

    get distance() {
        return this._distance;
    }

    get location() {
        return this._currentLocation;
    }

    get course() {
        return this._bearing( this._lastLocation, this._currentLocation);
    }

    get speed() {
        return this._speed;
    }

    get elevation() {
        var elevation = 0;

        if (this._elevations) {
            var intervalDistance = this._routeTotalDistance / this._elevations.length;
            const intervalIndexLeft = Math.floor(  this._distance / intervalDistance);
            const intervalIndexRight = Math.ceil(  this._distance / intervalDistance);
            if (intervalIndexRight >= this._elevations.length) {
                elevation = this._elevations[intervalIndexLeft].elevation;
            } else {
                const elevationLeft = this._elevations[intervalIndexLeft].elevation;
                const elevationRight = this._elevations[intervalIndexRight].elevation;
                const locationLeft = this._elevations[intervalIndexLeft].location;
                const locationRight = this._elevations[intervalIndexLeft].location;
                intervalDistance = locationRight.distanceFrom(locationLeft);
                if (intervalDistance > 0) {
                    const intervalRunnedDistance = this._currentLocation.distanceFrom(locationLeft);
                    elevation = elevationLeft + ((elevationRight - elevationLeft) * (intervalRunnedDistance/intervalDistance));
                } else {
                    elevation = elevationLeft;
                }
            }
        }
        return elevation;
    }

    //------------------------------------------------------------------------------------------------------------------
    // PRIVATE
    //------------------------------------------------------------------------------------------------------------------

    _bearing(fro, to) {
        if (from == null || to == null) {
            return 0;
        }

        // to rad
        const lat1 = from.lat()* Math.PI / 180;
        const lon1 = from.lng()* Math.PI / 180;
        const lat2 = to.lat()* Math.PI / 180;
        const lon2 = to.lng()* Math.PI / 180;

        // Compute the angle.
        let angle = - Math.atan2( Math.sin( lon1 - lon2 ) * Math.cos( lat2 ), Math.cos( lat1 ) * Math.sin( lat2 ) - Math.sin( lat1 ) * Math.cos( lat2 ) * Math.cos( lon1 - lon2 ) );
        if ( angle < 0.0 )
            angle  += Math.PI * 2.0;

        //if (angle == 0) {crash;}
        //console.log("angle :" + angle);
        return angle * (180/Math.PI); // to deg.
    }
}
