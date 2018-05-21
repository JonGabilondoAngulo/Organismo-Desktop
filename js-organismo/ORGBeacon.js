/**
 * Created by jongabilondo on 22/09/2017.
 */

/**
 * Represents a beacon.
 */
class ORGBeacon {

    /**
     * Constructor
     * @param name - Name for the beacon
     * @param range - Range in meters
     * @param location - X,Y,Z in meters.
     */
    constructor(name, range, location) {
        this._name = name;
        this._range = range;
        this._minor = 0;
        this._major = 0;
        this._location = location;
        this._geoLocation = null;
    }

    get name() { return this._name;};
    get range() { return this._range;};
    get location() { return this._location;};
    get minor() { return this._minor;};
    get major() { return this._major;};

    set location(loc) { this._location = loc;};

    intersectsPoint(point) {
        const dist = this._dist(point.x, point.y, point.z, this._location.x, this._location.y, this._location.z);
        return (dist < this._range);
    }

    // PRIVATE

    _dist(x0,y0,z0,x1,y1,z1){
        const deltaX = x1 - x0;
        const deltaY = y1 - y0;
        const deltaZ = z1 - z0;

        return Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);
    }

}