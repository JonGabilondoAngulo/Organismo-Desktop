/**
 * Created by jongabilondo on 24/09/2017.
 */


/**
 * Class to wrap the functionality of THREE.TransformControls on a beacon.
 */
class ORG3DBeaconTransformControl {

    /**
     * Constructor
     * @param scene - the ORG3DScene
     * @param mode - should be "translate"
     * @param THREEBeacon - the THREE obj that represents the beacon to enable THREE.TransformControls onto.
     */
    constructor(scene, mode, THREEBeacon) {
        const _this = this;
        this._scene = scene;
        this._THREEScene = scene.THREEScene;

        this._THREETransformControl = new THREE.TransformControls( scene.THREECamera, scene.rendererDOMElement);
        this._THREETransformControl.setMode( mode );
        this._THREETransformControl.addEventListener( 'change', function() {
            _this._transformControlChanged();
        } );

        // add it all to the scene
        this._THREETransformControl.attach( THREEBeacon );
        this._THREEScene.add( this._THREETransformControl );
    }

    /**
     * Call this method to destroy the transform control.
     */
    destroy() {
        if (this._THREETransformControl) {
            this._THREETransformControl.detach();
            this._THREETransformControl = null;
            this._THREEScene.remove( this._THREETransformControl );
        }
    }

    /**
     * Updates the proportions of the transform control according to camera position.
     * To be called from render loop.
     */
    update() {
        this._THREETransformControl.update();
    }

    // PRIVATE

    /**
     * When the transformation control has changed we get a call here.
     * Beacons can only be translated.
     * @private
     */
    _transformControlChanged() {
        if (this._THREETransformControl) {
            const THREETransformedObject = this._THREETransformControl.object;
            if (THREETransformedObject) {
                if (this._THREETransformControl.getMode() == "translate") {
                    // handle beacons intersection
                    //ORG.scenario.devicePointUpdate(THREETransformedObject.position);
                }
            }
        }
    }
}