/**
 * Created by jongabilondo on 19/03/2018.
 */


/***
 * Handles the 3D representation and manipulation of the device in the 3D Scene.
 * The device is composed of a 3D body model and the screen plane.
 * This class handles the 3D translate/rotate transform control as well.
 */
class ORG3DDevice {

    constructor() {
        this._deviceScreen = null; // a ORG3DDeviceScreen
        this._deviceBody = null; // a ORG3DDeviceModel
        this._bodyAndScreenGroup = null; // a THREE.Group to hold the screen and the device model
        this._transformControl = null; // a RG3DDeviceTransformControl
    }

    get deviceScreen() {
        return this._deviceScreen
    }

    get deviceBody() {
        return this._deviceBody
    }

    get bodyAndScreenGroup() {
        if (!this._bodyAndScreenGroup) {
            this._bodyAndScreenGroup = new THREE.Group();
        }
        return this._bodyAndScreenGroup;
    }

    get deviceBoundingBox() {
        let bBox = null;
        if (this._deviceBody) {
            bBox = this._deviceBody.boundingBox;
        }
        if (!bBox && this._deviceScreen) {
            bBox = this._deviceScreen.boundingBox;
        }
        return bBox;
    }

    addToScene(scene) {
        if (scene) {
            scene.add(this.bodyAndScreenGroup);
        }
    }

    removeFromScene(scene) {
        this.removeDeviceBody();
        this.removeDeviceScreen();
        scene.remove(this._bodyAndScreenGroup);
        this._bodyAndScreenGroup = null;
    }

    addDeviceBody(device3DModel) {
        if (device3DModel) {
            this._deviceBody = device3DModel;
            this.bodyAndScreenGroup.add(this._deviceBody.THREEObject);
        }
    }

    removeDeviceBody() {
        if (this._deviceBody) {
            this.bodyAndScreenGroup.remove(this._deviceBody.THREEObject);
            this._deviceBody.destroy();
            this._deviceBody = null;
        }
     }

    hideDeviceBody() {
        if (this._deviceBody) {
            this._deviceBody.hide();
        }
    }

    showDeviceBody() {
        if (this._deviceBody) {
            this._deviceBody.show();
        }
    }

    createDeviceScreen(size, position, scene) {
        this._deviceScreen = new ORG3DDeviceScreen(size, position, scene);
        this.bodyAndScreenGroup.add(this._deviceScreen.screenPlane);
    }

    removeDeviceScreen() {
        if (this._deviceScreen) {
            this.bodyAndScreenGroup.remove(this._deviceScreen.screenPlane);
            this._deviceScreen.destroy();
            this._deviceScreen = null;
        }
    }

    hideDeviceScreen() {
        if (this._deviceScreen) {
            this._deviceScreen.hide();
        }
    }

    showDeviceScreen() {
        if (this._deviceScreen) {
            this._deviceScreen.show();
        }
    }

    setDeviceOrientation(orientation) {
        if (!this._bodyAndScreenGroup) {
            return;
        }

        if (this._deviceScreen) {
            this._deviceScreen.setOrientation(orientation);
        }

        if (this._deviceBody) {
            this._deviceBody.setOrientation(orientation);
        }

        // It would be nicer to just rotate the device group object but we have a problem with the screen plane and the bitmap, but we have to recreate plane again.
        //const position = this.bodyAndScreenGroup.position.clone();
        //
        //// reset position
        //this.bodyAndScreenGroup.rotation.set(0, 0, 0);
        //this.bodyAndScreenGroup.position.set(0, 0, 0);
        //
        //switch (orientation) {
        //    case ORGDevice.ORIENTATION_PORTRAIT: {
        //    } break;
        //    case ORGDevice.ORIENTATION_PORTRAIT_UPSIDE_DOWN: {
        //        this._bodyAndScreenGroup.applyMatrix(new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(180)));
        //    } break;
        //    case ORGDevice.ORIENTATION_LANDSCAPE_RIGHT: {
        //        this._bodyAndScreenGroup.applyMatrix(new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(-90)));
        //    } break;
        //    case ORGDevice.ORIENTATION_LANDSCAPE_LEFT:
        //        this._bodyAndScreenGroup.applyMatrix(new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(90)));
        //        break;
        //}
        //
        //this.bodyAndScreenGroup.position.copy(position);
    }

    showHideDeviceTransformControls(scene, mode) {
        if (this._transformControl) {
            this._transformControl.destroy();
            this._transformControl = null;
        } else {
            this._transformControl = new ORG3DDeviceTransformControl(scene, mode);
        }
    }

    resetDevicePosition(position) {
        this.bodyAndScreenGroup.rotation.set(0, 0, 0);
        this.bodyAndScreenGroup.position.copy(position);

/*
        This is not helping to solve the problem of relocating location after this operation, the bbox of the body is not updated yet
        if (this._deviceScreen) {
            this._deviceScreen.screenPlane.updateMatrix();
            this._deviceScreen.screenPlane.computeBoundingBox();
        }
        if (this._deviceBody) {
            this._deviceBody.THREEObject.updateMatrix();
            this._deviceBody.THREEObject.computeBoundingBox();
        }
        this.bodyAndScreenGroup.updateMatrix();
*/
    }

    renderUpdate() {
        if (this._deviceScreen) {
            this._deviceScreen.renderUpdate();
        }
        if (this._transformControl) {
            this._transformControl.update(); // important to update the controls size while changing POV
        }
    }
}