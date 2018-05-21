/**
 * Created by jongabilondo on 24/09/2017.
 */


/**
 * Class to wrap the functionality of THREE.TransformControls on the 3D device.
 */
class ORG3DDeviceTransformControl {

    /**
     * Constructor
     * @param scene - The ORG3DScene
     * @param mode - "translate" | "rotate"
     */
    constructor(scene, mode) {
        this._scene = scene;
        this._THREEScene = scene.THREEScene;
        this._sprite = null;
        this._controlMoving = false;

        this._THREETransformControl = this._createTransformControl(scene, mode);
        this._THREETransformControl.attach(this._scene.THREEDeviceAndScreenGroup);
        this._THREEScene.add(this._THREETransformControl);
    }

    /**
     * Call this method to destroy the transform control.
     */
    destroy() {
        this._removeTextSprite();
        if (this._THREETransformControl) {
            this._THREETransformControl.detach();
            this._THREETransformControl = null;
            this._THREEScene.remove(this._THREETransformControl);
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

    _createTransformControl(scene, mode) {
        let transformControl = new THREE.TransformControls( scene.THREECamera, scene.rendererDOMElement);
        transformControl.setMode( mode );
        transformControl.setSpace('local');
        transformControl.addEventListener('change', () => {
            this._transformControlChange();
        });
        transformControl.addEventListener('mouseUp', () => {
            this._transformControlEnd();
        });
        transformControl.addEventListener('mouseDown', () => {
            this._transformControlBegin();
        });
        return transformControl;
    }

    _transformControlBegin() {
        this._controlMoving = true;
    }

    _transformControlEnd() {
        this._removeTextSprite();
        this._controlMoving = false;
    }

    /**
     * When the transformation control has changed we get a call here.
     * In case of rotation this function will broadcast the new device attitude to the connected device.
     * @private
     */
    _transformControlChange() {
        if (!this._controlMoving) {
            return;
        }
        if (!this._THREETransformControl) {
            return;
        }
        const THREETransformedObject = this._THREETransformControl.object;
        if (THREETransformedObject) {
            if (this._THREETransformControl.getMode() === "rotate") {
                if (ORG.deviceController) {
                    ORG.deviceController.sendDeviceAttitudeUpdate(ORGMessageBuilder.attitudeUpdate(THREETransformedObject.quaternion)); // Broadcast Attitude
                }
            } else if (this._THREETransformControl.getMode() === "translate") {
                ORG.scenario.devicePointUpdate(THREETransformedObject.position);
                ORG.scene.devicePositionHasChanged();
                this._showPositionSprite(THREETransformedObject.position);
            }
        }
    }

    _showPositionSprite(position) {
        this._removeTextSprite();
        this._sprite = this._createTextSprite("X: " + position.x.toFixed(2) + "m\nY: " + position.y.toFixed(2) + "m\nZ: " + position.z.toFixed(2) + "m", position);
        this._THREEScene.add(this._sprite);
    }

    _createTextSprite(text, position) {
        let texture = new THREE.TextTexture({
            text: text,
            fontStyle: 'italic',
            textAlign: 'left',
            fontSize: 32,
            fontFamily: '"Times New Roman", Times, serif',
        });
        let material = new THREE.SpriteMaterial({map: texture, color: 0xffffbb});
        let sprite = new THREE.Sprite(material);
        sprite.position.set(position.x + 0.06, position.y + 0.07, position.z);
        sprite.scale.setX(texture.aspect).multiplyScalar(0.05);
        return sprite;
    }

    _removeTextSprite() {
        if (this._sprite && this._THREEScene) {
            this._THREEScene.remove(this._sprite);
            this._sprite = null;
        }
    }
}