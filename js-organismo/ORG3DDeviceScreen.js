/**
 * Created by jongabilondo on 25/03/2017.
 */


/**
 * Class to create and handle the THREE object of the device screen.
 */
class ORG3DDeviceScreen {

    constructor(size, position, threeScene) {
        this._removeHighlight = false;
        this._nextHighlightPlane = null;
        this._currentHighlightPlane = null;
        this._threeScreenPlane = null;
        this._nextScreenshotImage = null;

        this._deviceScreenSize = size;
        this._THREEScene = threeScene;

        this.create(this._deviceScreenSize, position)
    }

    get screenPlane() {
        return this._threeScreenPlane;
    }

    get boundingBox() {
        return this._threeScreenPlane.geometry.boundingBox;
    }

    get screenSize() {
        return this._deviceScreenSize;
    }

    get screenPosition() {
        return this._threeScreenPlane.position; // The screen is created at 0,0 then applied a transformation matrix. This position is not the world position.
    }

    get screenWorldPosition() {
        let position = this.screenPosition.clone();
        position.setFromMatrixPosition(this._threeScreenPlane.matrixWorld);
        return position;
    }

    set nextScreenshotImage(image) {
        this._nextScreenshotImage = image;
    }

   /* set rotationZ(degrees) {
        this._threeScreenPlane.rotation.set(0,0,degrees);
    }*/

    destroy() {
        if (!this._THREEScene) {
            return;
        }
        if (this._threeScreenPlane) {
            this._THREEScene.remove(this._threeScreenPlane);
        }
        if (this._currentHighlightPlane) {
            this._THREEScene.remove(this._currentHighlightPlane);
        }
        this._threeScreenPlane = null;
        this._nextHighlightPlane = null;
        this._currentHighlightPlane = null;
    }

    create(size, position) {
        this._threeScreenPlane = this._createScreenPlane(size, position);
        this._THREEScene.add(this._threeScreenPlane);
    }

    hide() {
        if (this._threeScreenPlane) {
            this._threeScreenPlane.visible = false;
        }
    }

    show() {
        if (this._threeScreenPlane) {
            this._threeScreenPlane.visible = true;
        }
    }

    setScreenshot(image) {
        let screenshotTexture = new THREE.Texture(image);
        screenshotTexture.minFilter = THREE.NearestFilter;

        // the image should be loaded by now
        screenshotTexture.needsUpdate = true;
        this._threeScreenPlane.material.map = screenshotTexture;
        this._threeScreenPlane.material.needsUpdate = true;
        this._threeScreenPlane.needsUpdate = true;
    }

    setOrientation(orientation) {
        if (!this._threeScreenPlane) {
            return;
        }

        // There are different experiences with the screenshot when rotating, sometimes they come portrait sometimes landscape.
        // When portrait better use the  lower rotation code.
        // Lately are coming landscape so we have to recreate the plane not to ratate.

        // Recreate the screen with new size
        if (true) {
            const backupPosition = this.screenPosition;
            const newScreenSize = this._displaySizeWithOrientation(orientation);
            if (this._deviceScreenSize.width != newScreenSize.width) {
                this._deviceScreenSize = newScreenSize;
                // changing geometry on the fly is not straight forward
                this._threeScreenPlane.geometry.dispose();
                this._threeScreenPlane.geometry = new THREE.PlaneBufferGeometry(this._deviceScreenSize.width, this._deviceScreenSize.height, 1, 1);
                this._threeScreenPlane.geometry.dynamic = true;
                this._threeScreenPlane.geometry.computeBoundingBox();
                this._threeScreenPlane.needsUpdate = true;
            }
        } else {
            let rotation = this._threeScreenPlane.rotation;
            this._threeScreenPlane.applyMatrix(new THREE.Matrix4().makeRotationZ(-rotation.z));

            switch (orientation) {
                case ORGDevice.ORIENTATION_PORTRAIT: {
                } break;
                case ORGDevice.ORIENTATION_PORTRAIT_UPSIDE_DOWN: {
                    this._threeScreenPlane.applyMatrix(new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(180)));
                } break;
                case ORGDevice.ORIENTATION_LANDSCAPE_RIGHT: {
                    this._threeScreenPlane.applyMatrix(new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(-90)));
                } break;
                case ORGDevice.ORIENTATION_LANDSCAPE_LEFT: {
                    this._threeScreenPlane.applyMatrix(new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(90)));
                } break;
            }
        }
    }

    _displaySizeWithOrientation(orientation) {
        const portraitSize = {width: Math.min(this._deviceScreenSize.width, this._deviceScreenSize.height), height:Math.max(this._deviceScreenSize.width, this._deviceScreenSize.height)};
        let orientedSize = portraitSize;
        switch (orientation) {
            case ORGDevice.ORIENTATION_PORTRAIT:
            case ORGDevice.ORIENTATION_PORTRAIT_UPSIDE_DOWN: {
            } break;
            case ORGDevice.ORIENTATION_LANDSCAPE_RIGHT:
            case ORGDevice.ORIENTATION_LANDSCAPE_LEFT: {
                orientedSize = {width: portraitSize.height, height: portraitSize.width};
            } break;
        }
        return orientedSize;
    }

    /***
     * Create a highlight plane covering the area of the given element. It will be shown in the next renderUpdate.
     * @param element3D - A ORG3DUIElement that can be WDA/Org ...
     */
    highlightUIElement(element3D) {
        if (element3D && element3D.hasSize) {
            // Calculate element bounds in device screen in 3D world
            const kZOffsetFromScreen = 0.0005;
            const elementBox2InScreen = element3D.getBoundsInDeviceScreen(ORG.device, this);
            const elementSize = elementBox2InScreen.getSize();
            const elementBox2Center = new THREE.Vector2();
            elementBox2InScreen.getCenter(elementBox2Center);
            const position = new THREE.Vector3(elementBox2Center.x, elementBox2Center.y, this.screenPosition.z + kZOffsetFromScreen);

            // Create the plane
            this._nextHighlightPlane = this._createHighlightPlane(elementSize, position);
            this._removeHighlight = false;
        } else {
            this._removeHighlight = true;
        }
    }

    /***
     * Time to update the 3D model. Called by the render loop.
     */
    renderUpdate() {
        // update screenshot
        if (this._nextScreenshotImage) {
            this.setScreenshot(this._nextScreenshotImage);
            this._nextScreenshotImage = null;
        }

        // update highlight
        if (this._removeHighlight) {
            if (this._currentHighlightPlane) {
                this._THREEScene.remove(this._currentHighlightPlane);
            }
            this._currentHighlightPlane = null;
            this._nextHighlightPlane = null;
            this._removeHighlight = false;
        }

        if (this._nextHighlightPlane) {
            if (this._currentHighlightPlane) {
                this._THREEScene.remove(this._currentHighlightPlane);
            }
            this._THREEScene.add(this._nextHighlightPlane);
            this._currentHighlightPlane = this._nextHighlightPlane
            this._nextHighlightPlane = null;
        }
    }

    _createScreenPlane(size, position) {
        let geometry = new THREE.PlaneBufferGeometry(size.width, size.height, 1, 1);
        geometry.dynamic = true;
        let material = new THREE.MeshBasicMaterial({ map : null , color: 0xffffff, side: THREE.DoubleSide});
        let screenPlane = new THREE.Mesh(geometry, material);
        screenPlane.position.copy(position);
        screenPlane.name = "screen";
        screenPlane.geometry.computeBoundingBox();
        return screenPlane;
    }

    /***
     * Create a THREE plane that will be used as a highlight on top of the screen.
     * @param size. Vector2
     * @param position. Vector3
     * @returns {THREE.Mesh of plane}
     * @private
     */
    _createHighlightPlane(size, position) {
        const kOpacity = 0.5;
        const kColor = 0xee82ee; // FFC0CB FFE4E1 FB6C1 FF69B4

        let geometry = new THREE.PlaneBufferGeometry(size.width, size.height, 1, 1);
        let material = new THREE.MeshBasicMaterial({ map : null , color: kColor, side: THREE.DoubleSide, transparent: true, opacity: kOpacity});
        let highlightPlane = new THREE.Mesh(geometry, material);
        highlightPlane.position.copy(position);

        return highlightPlane;
    }

}