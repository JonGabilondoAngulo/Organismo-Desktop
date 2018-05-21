/**
 * Created by jongabilondo on 22/09/2017.
 */

/**
 * Class to create and manipulate a beacon in the THREE scene.
 */
class ORG3DBeacon {

    /**
     * Constructor
     * @param beacon -  A ORGBeacon
     */
    constructor(beacon) {
        this._kCoreAnimationScale = 4;
        this._kCoreAnimationTime = 1000; //ms

        this._coreMesh = null;
        this._beacon = beacon;
        this._beaconModel = this._createaModel(beacon.range);
        this._coreTWEEN = null;
    }

    /**
     *
     * @returns a THREE.Group
     */
    get model() {
        return this._beaconModel;
    }

    /**
     * Location of the Beacon in the scene in meters.
     * @returns {{x: number, y: number, z: number}}
     */
    get location() {
        return {x:0, y:0, z:0};
    }

    /**
     * Starts animating the beacon core.
     */
    animateCore() {
        this._scaleUp().start();
    }

    // PRIVATE

    /**
     * Creates a THREE.Group with the beacon THREE objects.
     * @param radius
     * @returns {*|Group}
     * @private
     */
    _createaModel(radius) {
        const wSegments = 10;
        const hSegments = 10;
        var geometry = new THREE.SphereGeometry(radius, wSegments, hSegments);
        var material = new THREE.MeshBasicMaterial({
            color: 0x7788FF,
            wireframe: true
        });
        var coverMesh = new THREE.Mesh(geometry, material);
        coverMesh.name = "ORG.Beacon.Cover.Mesh";

        var coreGeometry = new THREE.SphereGeometry(2, 16, 16);
        var coreMaterial = new THREE.MeshPhongMaterial({
            color: 0x771122
        });
        this._coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
        this._coreMesh.name = "ORG.Beacon.Core.Mesh"

        var beaconGroup = new THREE.Group();
        beaconGroup.name = "ORG.Beacon.Group";
        beaconGroup.add(this._coreMesh);
        beaconGroup.add(coverMesh);

        return beaconGroup;
    }


    /**
     * Animates the Scale up of the beacon core, it launches the scale down on completion.
     * @returns {*}
     * @private
     */
    _scaleUp () {
        const _this = this;
        return new TWEEN.Tween(this._coreMesh.scale).to ({
            x : this._kCoreAnimationScale,
            y : this._kCoreAnimationScale,
            z : this._kCoreAnimationScale
        }, this._kCoreAnimationTime).onUpdate(function () {
            //
        }).onComplete(function () {
            _this._scaleDown().start();
        });
    }

    /**
     * Animates the Scale down of the beacon core, it launches the scale up on completion.
     * @returns {*}
     * @private
     */
    _scaleDown () {
        const _this = this;
        return new TWEEN.Tween(this._coreMesh.scale).to ({
            x : 1, y : 1, z: 1
        }, this._kCoreAnimationTime).onUpdate(function () {
            //
        }).onComplete(function () {
            _this._scaleUp().start();
        });
    }

}