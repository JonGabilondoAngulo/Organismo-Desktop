/**
 * Created by jongabilondo on 22/03/2017.
 */


/**
 * Class to keep the THREE model of the device and to wrap the actions on it.
 * It contains only the body of the device, not the display.
 */
class ORG3DDeviceModel {

    /**
     * Constructor
     * @param threeObj - A THREE.Group representing the Device.
     */
    constructor(scene, threeObj) {
        this.threeObj = threeObj; // It is a THREE.Group. Don't have geometry to compute bbox.
        this.threeScene = scene;
    }

    destroy() {
        this.removeFromScene();
        this.threeObj = null;
    }

    get THREEObject() {
        return this.threeObj;
    }


    get boundingBox() {
        return new THREE.Box3().setFromObject(this.threeObj);
    }

    removeFromScene() {
        if (this.threeScene && this.threeObj) {
            this.threeScene.remove(this.threeObj);
        }
    }

    setOrientation(orientation) {
        if (!this.threeObj) {
            return;
        }

        // reset position
        let bbox = this.boundingBox;
        let currentPosition = new THREE.Vector3();
        bbox.getCenter(currentPosition);
        //this.threeObj.applyMatrix(new THREE.Matrix4().makeTranslation(-currentPosition.x, -currentPosition.y, -currentPosition.z));

        // rotate
        let rotation = this.threeObj.rotation;
        this.threeObj.applyMatrix(new THREE.Matrix4().makeRotationZ(-rotation.z));

        switch (orientation) {
            case ORGDevice.ORIENTATION_PORTRAIT: {
            } break;
            case ORGDevice.ORIENTATION_PORTRAIT_UPSIDE_DOWN: {
                this.threeObj.applyMatrix(new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(180)));
            } break;
            case ORGDevice.ORIENTATION_LANDSCAPE_RIGHT: {
                this.threeObj.applyMatrix(new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(-90)));
            } break;
            case ORGDevice.ORIENTATION_LANDSCAPE_LEFT:
                this.threeObj.applyMatrix(new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(90)));
                break;
        }
        // return to position
        //this.threeObj.applyMatrix(new THREE.Matrix4().makeTranslation(currentPosition.x, currentPosition.y, currentPosition.z));
    }
}