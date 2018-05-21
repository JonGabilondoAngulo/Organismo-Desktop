/**
 * Created by jongabilondo on 23/09/2017.
 */

/**
 * Class to hold all the information and elements that compose a scene, devices, beacons, geo information ..
 * Does not contain any 3D information, it's not connected to any THREE js.
 */
class ORGScenario {

    constructor() {
        this._beacons = [];
    }

    addBeacon(beacon) {
        this._beacons.push(beacon);
    }

    removeBeacon(beacon) {
        for (let i=0; i<this._beacons.length; i++) {
            if (this._beacons[i] == beacon) {
                this._beacons.splice( i, 1);
                break;
            }
        }
    }

    removeAllBeacons() {
        this._beacons = [];
    }

    beaconsAtPoint(point) {
        var beacons = [];
        for (let i=0; i<this._beacons.length; i++) {
            if (this._beacons[i].intersectsPoint(point)) {
                beacons.push(this._beacons[i]);
            }
        }
        return beacons;
    }

    devicePointUpdate(point) {
        const beacons = this.beaconsAtPoint(point);
        for (let i=0; i<beacons.length; i++) {
            // broadcast to Mobile Device that is inside a beacon range
            console.log("inside beacon");
        }
    }
}