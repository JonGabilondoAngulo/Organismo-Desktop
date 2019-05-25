/**
 * Created by jongabilondo on 02/07/2016.
 */

const { ORG3DUITreeModel, ORGTreeVisualizationMask } = require('./ORG3DUITreeModel')
const ORG3DSceneFloor = require('./ORG3DSceneFloor')
const ORG3DDevice = require('./ORG3DDevice')
const ORG3DUITreeRaycaster = require('./ORG3DUITreeRaycaster')
const ORG3DSceneRaycaster = require('./ORG3DSceneRaycaster')
const ORGMouseListener = require('./ORGMouseListener')
const ORGTooltip = require('./ORGTooltip')
const ORG3DBeaconTransformControl = require('./ORG3DBeaconTransformControl')
const ORG3DUIElementHighlight = require('./ORG3DUIElementHighlight')
const ORGBeacon = require('./ORGBeacon')
const ORG3DBeacon = require('./ORG3DBeacon')
const ORGContextMenuManager = require('./ORGContextMenuManager')
const ORG3DLocationMarker = require('./ORG3DLocationMarker')
const { CSS3DObject, CSS3DSprite, CSS3DRenderer } = require('three-css3drenderer')

const ORGSceneVisualizationMask = {
    ShowFloor : 0x1,
    ShowDevice : 0x2,
    ShowTooltips : 0x4,
    ShowLocation : 0x8,
    ContinuousUpdate : 0x10
}
const kORGCameraTWEENDuration = 2000.0; // ms
const kORGFloorPositionY = 0.0; // m
const kORGDevicePositionY = 1.5; // m
const kORGCameraPositionZ = 0.2; // m

module.exports =

/**
 * The class that holds the THREE.Scene with the GLRenderer.
 * It provides all the methods to handle the operations on the Scene.
 *
 * @param domContainer The dom element where to create the 3D scene.
 * @param screenSize An initial size for the 3D scene. It will be updated to the real size of the container once the scene has been created.
 * @constructor
 */
class ORG3DScene {

    constructor(domContainer, screenSize) {

        this._sceneFloor = null; // a ORG3DSceneFloor
        this._device = null; // a ORG3DDevice
        this._uiTreeModelRaycaster = null; // a ORG3DUITreeRaycaster
        this._sceneRaycaster = null; // a ORG3DSceneRaycaster
        this._screenRaycaster = null; // a ORG3DUITreeRaycaster
        this._mouseListener = null; // a ORGMouseListener
        this._tooltiper = null; // a ORGTooltip
        this._beaconTransformControl = null; // ORG3DBeaconTransformControl
        this._THREEScene = null;
        this._THREECSSScene = null;
        this._THREECamera = null;
        this._THREERenderer = null;
        this._THREECSSRenderer = null;
        this._THREEOrbitControls = null;
        this._keyboardState = null;
        this._threeClock = null;
        this._uiExpanded = false;
        this._showingActors = false;
        this._canvasDomElement = null; // the table cell where the renderer will be created, it contains _rendererDOMElement
        this._rendererDOMElement = null; // threejs scene is displayed in this DOM element
        this._contextMenuManager = null;
        this._locationMarker = null;
        this._lastLocationName = "?";
        this._sceneVisualFlags = ORGSceneVisualizationMask.ShowFloor |
            ORGSceneVisualizationMask.ShowDevice |
            ORGSceneVisualizationMask.ShowLocation |
            ORGSceneVisualizationMask.ContinuousUpdate;
        this._treeVisualizationFlags = ORGTreeVisualizationMask.ShowNormalWindow |
            ORGTreeVisualizationMask.ShowAlertWindow |
            ORGTreeVisualizationMask.ShowKeyboardWindow |
            ORGTreeVisualizationMask.ShowOutOfScreen |
            ORGTreeVisualizationMask.ShowInteractiveViews |
            ORGTreeVisualizationMask.ShowNonInteractiveViews |
            ORGTreeVisualizationMask.ShowPrivate |
            ORGTreeVisualizationMask.ShowScreenshots;

        this._uiTreeModel = new ORG3DUITreeModel(this._treeVisualizationFlags);
        //this.expanding = false;
        this._initialize(domContainer, this.flagShowFloor);
    }

    //------------------------------------------------------------------------------------------------------------------
    // GET/SET
    //------------------------------------------------------------------------------------------------------------------
    get sceneSize() {
        return this._THREERenderer.getSize();
    }

    get THREEScene() {
        return this._THREEScene;
    }

    get THREERenderer() {
        return this._THREERenderer;
    }

    get THREECSSRenderer() {
        return this._THREECSSRenderer;
    }


    get deviceScreen() {
        //return this._deviceScreen;
        return this._device.deviceScreen;
    }

    get device3DModel() {
        //return this._device3DModel;
        return this._device.deviceBody;
    }

    get deviceScreenBoundingBox() {
        return this._device.deviceScreen.boundingBox;
    }

    get THREECamera() {
        return this._THREECamera;
    }

    get THREEDeviceAndScreenGroup() {
        //return this._THREEDeviceAndScreenGroup;
        return this._device.bodyAndScreenGroup;
    }

    get rendererDOMElement() {
        return this._rendererDOMElement;
    }

    get isExpanded() {
        return this._uiExpanded;
    }

    set isExpanded(expanded) {
        this._uiExpanded = expanded;
    }

    get expanding() {
        return this._expanding;
    }

    set expanding(expanding) {
        this._expanding = expanding;
    }

    get isShowingActors() {
        return this._showingActors;
    }

    set isShowingActors(showing) {
        this._showingActors = showing;
    }

    get contextMenuManager() {
        return this._contextMenuManager;
    }
    /**
     * Scene flags
     */
    get flagContinuousScreenshot() {
        return this._sceneVisualFlags & ORGSceneVisualizationMask.ContinuousUpdate;
    }

    set flagContinuousScreenshot(flag) {
        if (flag) {
            this._sceneVisualFlags |= ORGSceneVisualizationMask.ContinuousUpdate;
        } else {
            this._sceneVisualFlags &= ~ORGSceneVisualizationMask.ContinuousUpdate;
        }
    }

    get flagShowTooltips() {
        return this._sceneVisualFlags & ORGSceneVisualizationMask.ShowTooltips;
    }

    set flagShowTooltips(show) {
        if (show) {
            this._sceneVisualFlags |= ORGSceneVisualizationMask.ShowTooltips;
        } else {
            this._sceneVisualFlags &= ~ORGSceneVisualizationMask.ShowTooltips;
        }
    }

    get flagShowDevice3DModel() {
        return this._sceneVisualFlags & ORGSceneVisualizationMask.ShowDevice;
    }

    set flagShowDevice3DModel(show) {
        if (show) {
            this._sceneVisualFlags |= ORGSceneVisualizationMask.ShowDevice;
        } else {
            this._sceneVisualFlags &= ~ORGSceneVisualizationMask.ShowDevice;
        }    }

    get flagShowFloor() {
        return this._sceneVisualFlags & ORGSceneVisualizationMask.ShowFloor;
    }

    set flagShowFloor(show) {
        if (show) {
            this._sceneVisualFlags |= ORGSceneVisualizationMask.ShowFloor;
        } else {
            this._sceneVisualFlags &= ~ORGSceneVisualizationMask.ShowFloor;
        }
    }

    get flagShowLocation() {
        return this._sceneVisualFlags & ORGSceneVisualizationMask.ShowLocation;
    }

    set flagShowLocation(show) {
        if (show) {
            this._sceneVisualFlags |= ORGSceneVisualizationMask.ShowLocation;
        } else {
            this._sceneVisualFlags &= ~ORGSceneVisualizationMask.ShowLocation;
        }
    }

    /**
     * Tree flags
     */
    get flagShowPrivateClasses() {
        return (this._treeVisualizationFlags & ORGTreeVisualizationMask.ShowPrivate);
    }

    set flagShowPrivateClasses(flag) {
        if (flag) {
            this._treeVisualizationFlags |= ORGTreeVisualizationMask.ShowPrivate;
        } else {
            this._treeVisualizationFlags &= ~ORGTreeVisualizationMask.ShowPrivate;
        }
    }

    set flagShowKeyboardWindow(flag) {
        if (flag) {
            this._treeVisualizationFlags |= ORGTreeVisualizationMask.ShowKeyboardWindow;
        } else {
            this._treeVisualizationFlags &= ~ORGTreeVisualizationMask.ShowKeyboardWindow;
        }
    }

    set flagShowHiddenViews(flag) {
        if (flag) {
            this._treeVisualizationFlags |= ORGTreeVisualizationMask.ShowHiddenViews;
        } else {
            this._treeVisualizationFlags &= ~ORGTreeVisualizationMask.ShowHiddenViews;
        }
    }

    set flagShowNonInteractiveViews(flag) {
        if (flag) {
            this._treeVisualizationFlags |= ORGTreeVisualizationMask.ShowNonInteractiveViews;
        } else {
            this._treeVisualizationFlags &= ~ORGTreeVisualizationMask.ShowNonInteractiveViews;
        }
    }

    set flagShowInteractiveViews(flag) {
        if (flag) {
            this._treeVisualizationFlags |= ORGTreeVisualizationMask.ShowInteractiveViews;
        } else {
            this._treeVisualizationFlags &= ~ORGTreeVisualizationMask.ShowInteractiveViews;
        }
    }

    set flagShowScreenshots(flag) {
        if (flag) {
            this._treeVisualizationFlags |= ORGTreeVisualizationMask.ShowScreenshots;
        } else {
            this._treeVisualizationFlags &= ~ORGTreeVisualizationMask.ShowScreenshots;
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // PUBLIC
    //------------------------------------------------------------------------------------------------------------------

    /**
     * Remove the Device from the scene. After device disconnection all models and data of device must be removed.
     */
    handleDeviceDisconnection() {
        this.removeDeviceScreen();
        this.removeUITreeModel();
        this.hideDevice3DModel();
        this._removeDeviceAndScreenGroup();
    }

    /**
     * Sets the Image that will be used to create the texture to set it to the device screen.
     * It sets the image in a variable to be used in the next render cycle.
     * @param image.
     */
    setScreenshotImage(image) {
       /* if (this._deviceScreen) {
            this._deviceScreen.nextScreenshotImage = image;
        }*/
       this._device.deviceScreen.nextScreenshotImage = image;
    }

    updateUITreeModel(treeJson) {

        // First destroy the raycaster for the screen
        this.removeRaycasterForDeviceScreen();
        this.hideDeviceScreen();

        if (this.flagShowTooltips) {
            this.disableTooltips();
        }

        this.destroyRaycasterFor3DTreeModel(); // Destroy Raycaster for the 3D UI Model object

        // Create the 3D UI model
        this.isExpanded = true;
        //this.expanding = false;
        this._uiTreeModel.visualizationFlags = this._treeVisualizationFlags; // update the flags
        this._uiTreeModel.updateUITreeModel(treeJson, this._THREEScene, ORG.device.screenSize, ORG.device.displaySize, ORG.device.displayScale, this.THREEDeviceAndScreenGroup.position);

        this.createRaycasterFor3DTreeModel(); // Create Raycaster for the 3D UI Model object

        if (this.flagShowTooltips) {
            this.enableTooltips();
        }
    }

    removeUITreeModel() {
        this._uiTreeModel.removeUITreeModel(this._THREEScene);
    }

    //--
    //  DEVICE
    //--

    addDeviceToScene(screenSize, deviceBodyModel, orientation) {
        this._device.createDeviceScreen(screenSize, new THREE.Vector3(0, 0, 0), this._THREEScene);
        if (deviceBodyModel) {
            this._device.addDeviceBody(deviceBodyModel);
        }
        this._device.resetDevicePosition(new THREE.Vector3(0, kORGDevicePositionY, 0)); // translate to default Y
        //this._device.bodyAndScreenGroup.translateY(kORGDevicePositionY); // translate to default Y
        this.setDeviceOrientation(orientation);
        this._device.addToScene(this._THREEScene);
        this.devicePositionHasChanged();
        this.createRaycasterForDeviceScreen();
    }

    removeDeviceScreen() {
        this._device.removeDeviceScreen();
    }

    hideDeviceScreen() {
        this._device.hideDeviceScreen();
    }

    showDeviceScreen() {
        this._device.showDeviceScreen();
    }

    addDevice3DModel(device3DModel) {
        this._device.addDeviceBody(device3DModel);
        this.devicePositionHasChanged();
    }

/*    showDevice3DModel() {
        return new Promise((resolve, reject) => {
            this.hideDevice3DModel();

            if (!this.flagShowDevice3DModel) {
                reject();
            }

            ORG3DDeviceModelLoader.loadDevice3DModel(ORG.device, this, kORGDevicePositionY).then(
                (result) => {
                    resolve(result);
                },
                (error) => {
                    reject(error);
                })
        })
    }*/

    hideDevice3DModel() {
        this._device.removeDeviceBody();
        this.devicePositionHasChanged();
    }

    setDeviceOrientation(orientation) {
        this._device.setDeviceOrientation(orientation);
    }

    createRaycasterFor3DTreeModel() {
        this._uiTreeModelRaycaster = new ORG3DUITreeRaycaster(this._rendererDOMElement, this._THREECamera, this._uiTreeModel.treeGroup);
        this._uiTreeModelRaycaster.addDelegate(new ORG3DUIElementHighlight()); // attach a hiliter
        this._uiTreeModelRaycaster.addDelegate(this._contextMenuManager); // attach a context menu manager, needs to know what three obj is the mouse on

        // Activate mouse listener to feed the raycaster
        if (this._mouseListener) {
            this._mouseListener.addDelegate(this._uiTreeModelRaycaster); // send the mouse events to the Raycaster
            this._mouseListener.enable();
        }
    }

    destroyRaycasterFor3DTreeModel() {
        if (this._uiTreeModelRaycaster) {
            if (this._tooltiper) {
                this._uiTreeModelRaycaster.removeDelegate(this._tooltiper); // Detach tooltiper from the raycaster
            }
            if (this._mouseListener) {
                this._mouseListener.removeDelegate(this._uiTreeModelRaycaster); // send the mouse events to the Raycaster
            }
            this._uiTreeModelRaycaster = null;
        }
    }

    createRaycasterForScene() {
        this._sceneRaycaster = new ORG3DSceneRaycaster(this._rendererDOMElement, this._THREECamera, this._THREEScene);

        // Activate mouse listener
        this._mouseListener.addDelegate(this._sceneRaycaster); // send the mouse events to the Raycaster
        this._mouseListener.enable();
    }

    createRaycasterForDeviceScreen() {
        this._screenRaycaster = new ORG3DUITreeRaycaster(this._rendererDOMElement, this._THREECamera, this._device.deviceScreen.screenPlane);
        this._screenRaycaster.addDelegate(this._contextMenuManager); // attach a context menu manager

        // Activate mouse listener
        this._mouseListener.addDelegate(this._screenRaycaster); // send the mouse events to the Raycaster
        this._mouseListener.enable();
    }

    removeRaycasterForDeviceScreen() {
        if (this._screenRaycaster) {
            this._mouseListener.removeDelegate(this._screenRaycaster);
            this._screenRaycaster = null;
        }
    }

    setLiveScreen(live) {
        this.flagContinuousScreenshot = live;
        if (this._device.deviceScreen && ORG.deviceController.hasContinuousUpdate) {
            if ((this._sceneVisualFlags & ORGSceneVisualizationMask.ContinuousUpdate) && !this._uiExpanded) {
                ORG.deviceController.requestScreenshot();
                //ORGActionsCenter.refreshScreen();
            }
        }
    }

    showTooltips(show) {
        this.flagShowTooltips = show;
        if (show) {
            this.enableTooltips();
        } else {
            this.disableTooltips();
        }
    }

    enableTooltips() {
        if (!this._tooltiper) {
            this._tooltiper = new ORGTooltip(this._rendererDOMElement);
            if (this._uiTreeModelRaycaster) {
                this._uiTreeModelRaycaster.addDelegate(this._tooltiper); // Attach it to the raycaster
            }
        }
    }

    disableTooltips() {
        if (this._tooltiper) {
            if (this._uiTreeModelRaycaster) {
                this._uiTreeModelRaycaster.removeDelegate(this._tooltiper); // Detach it from the raycaster
            }
            this._tooltiper.destroy();
            this._tooltiper = null;
        }
    }

    createFloor() {
        if (!this._sceneFloor) {
            this._sceneFloor = this._createFloor(this._THREEScene);
            this.devicePositionHasChanged();
        }
    };

    removeFloor() {
        if (this._sceneFloor) {
            this._removeFloor();
        }
    };

    collapse(completionCallback) {
        if (!this.isExpanded) {
            return;
        }
        // we dont need the mouse listener and the raycaster anymore
        //this._mouseListener.disable();

        this.disableTooltips();

        const _this = this;
        const requestScreenshot = this.flagContinuousScreenshot;

        this._uiTreeModel.collapseWithCompletion(() => {
            /*if (_this._deviceScreen) {
                _this._deviceScreen.show();
            }*/
            this._device.showDeviceScreen();
            if (requestScreenshot) {
                ORG.deviceController.requestScreenshot(); // keep updating screenshot
            }
            _this.createRaycasterForDeviceScreen();
            _this._uiExpanded = false;

            if (!!completionCallback) {
                completionCallback();
            }
        })
    }

    // function for drawing rounded rectangles
    _roundRect(ctx, x, y, w, h, r)
    {
        ctx.beginPath();
        ctx.moveTo(x+r, y);
        ctx.lineTo(x+w-r, y);
        ctx.quadraticCurveTo(x+w, y, x+w, y+r);
        ctx.lineTo(x+w, y+h-r);
        ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
        ctx.lineTo(x+r, y+h);
        ctx.quadraticCurveTo(x, y+h, x, y+h-r);
        ctx.lineTo(x, y+r);
        ctx.quadraticCurveTo(x, y, x+r, y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    _makeTextSprite( message, parameters )
    {
        if ( parameters === undefined ) parameters = {};

        var fontface = parameters.hasOwnProperty("fontface") ?
            parameters["fontface"] : "Arial";

        var fontsize = parameters.hasOwnProperty("fontsize") ?
            parameters["fontsize"] : 18;

        var borderThickness = parameters.hasOwnProperty("borderThickness") ?
            parameters["borderThickness"] : 1;

        var borderColor = parameters.hasOwnProperty("borderColor") ?
            parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };

        var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
            parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };

        //var spriteAlignment = THREE.SpriteAlignment.topLeft;

        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        context.font = "Bold " + fontsize + "px " + fontface;

        // get size data (height depends only on font size)
        var metrics = context.measureText( message );
        var textWidth = metrics.width;

        // background color
        context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
            + backgroundColor.b + "," + backgroundColor.a + ")";
        // border color
        context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
            + borderColor.b + "," + borderColor.a + ")";

        context.lineWidth = borderThickness;
        this._roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);
        // 1.4 is extra height factor for text below baseline: g,j,p,q.

        // text color
        context.fillStyle = "rgba(0, 0, 0, 1.0)";

        context.fillText( message, borderThickness, fontsize + borderThickness);

        // canvas contents will be used for a texture
        var texture = new THREE.CanvasTexture(canvas)
        //texture.needsUpdate = true;

        var spriteMaterial = new THREE.SpriteMaterial(
            { map: texture});//, useScreenCoordinates: false});//, alignment: spriteAlignment } );
        var sprite = new THREE.Sprite( spriteMaterial );

        return sprite;
    }


    hideUIActors() {
        this._showingActors = false;
    }

    showUIActors() {
        this._showingActors = true;

        var spritey = this._makeTextSprite( " Tap and More Text ",
            { fontsize: 16, borderColor: {r:255, g:0, b:0, a:1.0}, backgroundColor: {r:255, g:100, b:100, a:0.8} } );
        spritey.position.set(0.05,1.5,0.0);
        //spritey.position.normalize();
        spritey.scale.set(0.2,0.1,1.0);
        spritey.center.set( 0.0, 0.5 );
        this._THREEScene.add( spritey );

        //var spritey = this._makeTextSprite( " LongPress ",
        //    { fontsize: 12,  borderColor: {r:0, g:0, b:255, a:1.0} , backgroundColor: {r:255, g:255, b:255, a:0.8}} );
        //spritey.position.set(0.0, 0.0, 0.0);
        ////spritey.position.normalize();
        //spritey.center.set( 0.0, 0.5 );
        //spritey.scale.set(1,1,1.0);
        //this._THREEScene.add( spritey );


        var curve = new THREE.QuadraticBezierCurve3(
            new THREE.Vector3( 0, 1.5, 0 ),
            new THREE.Vector3( 0.08, 1.52, 0 ),
            new THREE.Vector3( 0.05,1.55,0 ));
        var points = curve.getPoints( 50 );
        var geometry = new THREE.BufferGeometry().setFromPoints( points );
        var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

        // Create the final object to add to the scene
        var curveObject = new THREE.Line( geometry, material );
        this._THREEScene.add( curveObject );


    }

    showHideDeviceTransformControls(mode) {
        this._device.showHideDeviceTransformControls(this, mode);
/*
        if (this._transformControl) {
            this._transformControl.destroy();
            this._transformControl = null;
        } else {
            this._transformControl = new ORG3DDeviceTransformControl(this, mode);
        }
*/
    }

    showHideBeaconTransformControls(THREEBeacon) {
        if (this._beaconTransformControl) {
            this._beaconTransformControl.destroy();
            this._beaconTransformControl = null;
        } else {
            this._beaconTransformControl = new ORG3DBeaconTransformControl(this, "translate", THREEBeacon);
        }
    }

    addBeacon() {
        const range = 50;
        let newBeacon = new ORGBeacon("name", range, {x:0,y:0,z:0});
        let new3DBeacon = new ORG3DBeacon(newBeacon);
        ORG.scenario.addBeacon(newBeacon);

        this._THREEScene.add(new3DBeacon.model);
        new3DBeacon.animateCore();
    }

    /**
     * Locate the camera at default position and looking a t 0,0,0.
     */
    resetCameraPosition() {
        // Avoid flickering by stopping screen updates
        const liveScreen = this.flagContinuousScreenshot;
        if (liveScreen) {
            this.setLiveScreen(false);
        }

        const _this = this;
        new TWEEN.Tween(this._THREECamera.position).to({
            x: 0,
            y: kORGDevicePositionY,
            z: kORGCameraPositionZ}, kORGCameraTWEENDuration)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onComplete(() => {
                if (liveScreen) {
                    _this.setLiveScreen(true);
                }
            }).start();

        // TWEEN camera lookAt. But we can't do it setting camera.lookAt ! Due to collision with OrbitControls !
        // We must use the OrbitControl.target instead.
        new TWEEN.Tween(_this._THREEOrbitControls.target).to({
            x: 0,
            y: kORGDevicePositionY,
            z: 0}, kORGCameraTWEENDuration)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .start();
    }

    /**
     * Function to reset the rotation and position of the Device to the default values.
     */
    resetDevicePosition() {
        this._device.resetDevicePosition(new THREE.Vector3(0, kORGDevicePositionY, 0));
        this.devicePositionHasChanged();
    }


    /***
     * Move the camera to the position that the device screen will fit on the scene.
     */
    deviceScreenCloseup() {
        if (!this._device.deviceScreen) {
            return;
        }

        const maxDim = Math.max(this._device.deviceScreen.screenSize.width, this._device.deviceScreen.screenSize.height);
        const fov = this._THREECamera.fov * (Math.PI / 180);
        const distance = Math.abs(maxDim/2 / Math.tan(fov / 2)) * 1.01;

        // Avoid flickering by stopping screen updates
        const liveScreen = this.flagContinuousScreenshot;
        if (liveScreen) {
            this.setLiveScreen(false);
        }

        const devicePosition = this._device.deviceScreen.screenWorldPosition;

        // Camera Look At
        new TWEEN.Tween(this._THREEOrbitControls.target).to({
            x: devicePosition.x,
            y: devicePosition.y,
            z: devicePosition.z}, kORGCameraTWEENDuration/2)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .start();

        // Camera position
        const _this = this;
        new TWEEN.Tween(this._THREECamera.position).to({
            x: devicePosition.x,
            y: devicePosition.y,
            z: devicePosition.z + distance}, kORGCameraTWEENDuration)
            .easing(TWEEN.Easing.Quintic.InOut)
            .onComplete(() => {
                if (liveScreen) {
                    _this.setLiveScreen(true);
                }
            }).start();
    }

    /**
     * Set the camera looking at the given THREE object.
     * @param threeObject
     */
    lookAtObject(threeObject) {
        // We can't do it setting camera.lookAt ! Due to collision with OrbitControls !
        // We must use the OrbitControl.target instead.
        new TWEEN.Tween(this._THREEOrbitControls.target).to({
            x: threeObject.position.x,
            y: threeObject.position.y,
            z: threeObject.position.z}, kORGCameraTWEENDuration)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .start();

    }

    lookFrontAtObject(threeObject) {
        // We can't do it setting camera.lookAt ! Due to collision with OrbitControls !
        // We must use the OrbitControl.target instead.

        new TWEEN.Tween(this._THREECamera.position).to({
            x: threeObject.position.x,
            y: threeObject.position.y,
            z: 900}, kORGCameraTWEENDuration)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .start();

        new TWEEN.Tween(this._THREEOrbitControls.target).to({
            x: threeObject.position.x,
            y: threeObject.position.y,
            z: threeObject.position.z}, kORGCameraTWEENDuration)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .start();

    }

    lookAtDevice() {
        if (!this._device.deviceScreen) {
            return;
        }
        // We can't do it setting camera.lookAt ! Due to collision with OrbitControls !
        // We must use the OrbitControl.target instead.
        const devicePosition = this._device.deviceScreen.screenWorldPosition;
        new TWEEN.Tween(this._THREEOrbitControls.target).to({
            x: devicePosition.x,
            y: devicePosition.y,
            z: devicePosition.z}, kORGCameraTWEENDuration)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .start();
    }

    enableShowLocation() {
        this.flagShowLocation = true;

        if (!this._locationMarker) {
            const position = this._calculateLocationMarkerPosition();
            this._locationMarker = new ORG3DLocationMarker(position, this._lastLocationName, this._THREEScene);
        }
    }

    disableShowLocation() {
        this.flagShowLocation = false;
        if (this._locationMarker) {
            this._locationMarker.destructor();
            this._locationMarker = null;
        }
    }

    setShowNormalWindow(flag) {
    }

    setShowAlertWindow(flag) {
    }

    devicePositionHasChanged() {
        this._adjustLocationMarkerPosition();
    }

    resize(newSize) {
        if (this._THREERenderer) {
            this._THREERenderer.setSize(newSize.width, this._THREERenderer.getSize().height);
            this._THREECamera.aspect = newSize.width / this._THREERenderer.getSize().height;
        }
        if (this._THREECSSRenderer) {
            this._THREECSSRenderer.setSize(newSize.width, this._THREECSSRenderer.getSize().height);
            this._THREECamera.aspect = newSize.width / this._THREECSSRenderer.getSize().height;
        }
        this._THREECamera.updateProjectionMatrix();
    }

    setExpandedTreeLayersDistance(distanceUnits) {
        if (this._uiTreeModel) {
            this._uiTreeModel.setExpandedTreeLayersDistance(distanceUnits);
        }
    }

    setExpandedTreeLayersVisibleRange(maxVisibleLayer) {
        if (this._uiTreeModel) {
            this._uiTreeModel.setExpandedTreeLayersVisibleRange(maxVisibleLayer);
        }
    }

    /***
     * Call the 3D tree or the Sreen to highlight the given UI elment
     * @param element ORG3DUIElement, can be WDA, Org ...
     */
    highlightUIElement(element) {
        if (this._uiTreeModel.isExpanded) {
            this._uiTreeModel.highlightUIElement(element.elementJSON);
        } else if (this._device.deviceScreen) {
            this._device.deviceScreen.highlightUIElement(element);
        }
    }


    //------------------------------------------------------------------------------------------------------------------
    //  DELEGATES
    //------------------------------------------------------------------------------------------------------------------

    locationUpdate(location, locationName, elevation) {
        if (locationName) {
            this._lastLocationName = locationName;
        } else {
            this._lastLocationName = location.lat() + "  " + location.lng();
        }

        if (this.flagShowLocation) {
            if (!this._locationMarker) {
                const floorPosition = this._calculateLocationMarkerPosition();
                this._locationMarker = new ORG3DLocationMarker(floorPosition, this._lastLocationName, this._THREEScene);
            } else {
                this._locationMarker.updateDescriptor(this._lastLocationName);
            }
        }
     }


    //------------------------------------------------------------------------------------------------------------------
    // PRIVATE
    //------------------------------------------------------------------------------------------------------------------

    _initialize(domContainer, showFloor) {

        this._canvasDomElement = domContainer;
        const rendererCanvasWidth = this._canvasDomElement.clientWidth;
        const rendererCanvasHeight = this._canvasDomElement.clientHeight;

        this._THREEScene = new THREE.Scene();
        this._THREECSSScene = new THREE.Scene();
        this._THREECamera = new THREE.PerspectiveCamera(65, (rendererCanvasWidth / rendererCanvasHeight), 0.001, 10000);

        this._THREERenderer = this._createWebGLRenderer(rendererCanvasWidth, rendererCanvasHeight);
        this._THREECSSRenderer = this._createCSSRenderer(rendererCanvasWidth, rendererCanvasHeight);

        this._THREEOrbitControls = new THREE.OrbitControls(this._THREECamera, (this._THREECSSRenderer ?this._THREECSSRenderer.domElement :this._THREERenderer.domElement));

        this._keyboardState = new KeyboardState();

        if (showFloor) {
            this._sceneFloor = this._createFloor(this._THREEScene);
        }

        this._createLights();

        this._THREECamera.position.set(0, kORGDevicePositionY, kORGCameraPositionZ);
        this._THREEOrbitControls.target.set(0, kORGDevicePositionY, 0);
        //this._THREECamera.lookAt(new THREE.Vector3(0, kORGDevicePositionY, 0)); // not working, must use this._THREEOrbitControls.target

        this._threeClock = new THREE.Clock();

        // Create the rightMouse click manager
        this._contextMenuManager = new ORGContextMenuManager(this, '#threejs-canvas');

        // Create a mouse event listener and associate delegates
        this._mouseListener = new ORGMouseListener(this._rendererDOMElement);
        this._mouseListener.addDelegate(this._contextMenuManager);
        this._mouseListener.enable();

        this._lab();

        this._render();
        //ORG.WindowResize(this._THREERenderer, this._THREECamera, this._canvasDomElement);

        this.createRaycasterForScene();

        this._device = new ORG3DDevice();
    }

    _createWebGLRenderer(rendererCanvasWidth, rendererCanvasHeight) {
        var renderer = new THREE.WebGLRenderer({antialias: true /*, alpha:true (if transparency wanted)*/});
        renderer.domElement.style.position = 'absolute';
        //renderer.domElement.style.top = 0;
        renderer.domElement.style.zIndex = 0;
        renderer.setSize(rendererCanvasWidth, rendererCanvasHeight);
        this._canvasDomElement.appendChild(renderer.domElement);
        this._rendererDOMElement = renderer.domElement; // the DOM element for the renderer

        return renderer;
    }

    _createCSSRenderer(rendererCanvasWidth, rendererCanvasHeight) {
        var renderer = null;
        if (CSS3DRenderer !== undefined) {
            renderer = new CSS3DRenderer();
            renderer.setSize( rendererCanvasWidth, rendererCanvasHeight );
            renderer.domElement.style.position = 'absolute';
            //renderer.domElement.style.top = 0;
            renderer.domElement.style.zIndex = 1;
            this._canvasDomElement.appendChild( renderer.domElement );

            //let element = document.createElement( 'div' );
            //element.style.width =  '120px';
            //element.style.height = '160px';
            //element.style.boxShadow = '0px 0px 12px rgba(0,255,255,0.5)';
            //element.style.border = '1px solid rgba(127,255,255,0.25)';
            //element.style.textAlign = 'center';
            //element.style.cursor = 'default';
            ////element.className = 'element';
            //element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';
            //
            //let symbol = document.createElement( 'div' );
            ////symbol.className = 'symbol';
            ////symbol.className = 'screenshot3';
            //symbol.textContent = "TEXT CONTENT";
            //symbol.style.fontSize = '20px';
            //symbol.style.color = 'color: rgba(255,255,255,0.75)';
            //
            //element.appendChild( symbol );
            //
            //let object = new CSS3DObject( element );
            //object.position.set( 0, 0, 0);
            //this._THREECSSScene.add( object );
        }
        return renderer;
    }

    _calculateFloorPosition() {
        if (this._sceneFloor) {
            return this._sceneFloor.position;
        } else {
            return new THREE.Vector3(0, kORGFloorPositionY, 0);
        }
    }

    _createFloor(threeScene) {
        const floorSize = 1000;
        const tileSize = 100;
        return new ORG3DSceneFloor(floorSize, tileSize, true, threeScene, kORGFloorPositionY);
    }

    _removeFloor() {
        if (this._sceneFloor) {
            this._sceneFloor.remove();
        }
        this._sceneFloor = null;
    }

    _createLights() {
        let light;

        light = new THREE.SpotLight(0xaaaaaa);
        light.position.set(500,-500,500);
        this._THREEScene.add(light);

        light = new THREE.SpotLight(0xaaaaaa);
        light.position.set(500,500,500);
        this._THREEScene.add(light);

        light = new THREE.SpotLight(0xaaaaaa);
        light.position.set(-500,-500,-500);
        this._THREEScene.add(light);

        light = new THREE.SpotLight(0xaaaaaa);
        light.position.set(-500,500,-500);
        this._THREEScene.add(light);

        //light = new THREE.DirectionalLight(0xaaaaaa, 0.5 );
        //light.position.copy( new THREE.Vector3(0.0, 1.0, -1.0));
        //this._THREEScene.add(light);
        //
        //light = new THREE.DirectionalLight(0xaaaaaa, 0.5 );
        //light.position.copy( new THREE.Vector3(1.0, 1.0, 1.0));
        //this._THREEScene.add(light);

        //light = new THREE.HemisphereLight( );
        //this._THREEScene.add(light);
        //
        //light = new THREE.AmbientLight(0xffffff, 0.9);
        //this._THREEScene.add(light);
    }

    _adjustLocationMarkerPosition() {
        if (this._locationMarker) {
            this._locationMarker.setPosition(this._calculateLocationMarkerPosition());
        }
    }

    _calculateLocationMarkerPosition() {
        const kOffsetFromDeviceBottom = 0.02;
        let position = (this._sceneFloor ?this._sceneFloor.position :new THREE.Vector3(0, 0, 0));
        if (this._device) {
            let deviceBoundingBox = this._device.deviceBoundingBox;
            if (deviceBoundingBox) {
                let center = new THREE.Vector3();
                deviceBoundingBox.getCenter(center);
                let size = deviceBoundingBox.getSize();
                position = new THREE.Vector3(center.x, center.y - size.y/2 - kOffsetFromDeviceBottom, center.z);
            }
        }
        return position;
    }

    _removeDeviceAndScreenGroup() {
        this._device.removeFromScene(this._THREEScene);
    }

    _render() {
        const _this = this;

        requestAnimationFrame(() => {
            if (_this._THREERenderer) {
                _this._THREERenderer.render(_this._THREEScene, _this._THREECamera);
            }

            if (_this._THREECSSRenderer) {
                _this._THREECSSRenderer.render(_this._THREECSSScene, _this._THREECamera);
            }

            _this._THREEOrbitControls.update();
            _this._updateScene();
            TWEEN.update();
            _this._render();
        })
    }

    _updateScene() {
         this._device.renderUpdate();

        /*if (this._transformControl) {
            this._transformControl.update();
        }*/

        if (this._beaconTransformControl) {
            this._beaconTransformControl.update();
        }

        if (ORG.systemInfoManager) {
            ORG.systemInfoManager.update();
        }
    }

    _lab() {

        var objects = [];
        var targets = { table: [], sphere: [], helix: [], grid: [] };

        var table = [
            "H", "Hydrogen", "1.00794", 1, 1,
            "He", "Helium", "4.002602", 18, 1,
            "Li", "Lithium", "6.941", 1, 2,
            "Be", "Beryllium", "9.012182", 2, 2,
            "B", "Boron", "10.811", 13, 2,
            "C", "Carbon", "12.0107", 14, 2,
            "N", "Nitrogen", "14.0067", 15, 2,
            "O", "Oxygen", "15.9994", 16, 2,
            "F", "Fluorine", "18.9984032", 17, 2,
            "Ne", "Neon", "20.1797", 18, 2,
            "Na", "Sodium", "22.98976...", 1, 3,
            "Mg", "Magnesium", "24.305", 2, 3,
            "Al", "Aluminium", "26.9815386", 13, 3,
            "Si", "Silicon", "28.0855", 14, 3,
            "P", "Phosphorus", "30.973762", 15, 3,
            "S", "Sulfur", "32.065", 16, 3,
            "Cl", "Chlorine", "35.453", 17, 3,
            "Ar", "Argon", "39.948", 18, 3,
            "K", "Potassium", "39.948", 1, 4,
            "Ca", "Calcium", "40.078", 2, 4,
            "Sc", "Scandium", "44.955912", 3, 4,
            "Ti", "Titanium", "47.867", 4, 4,
            "V", "Vanadium", "50.9415", 5, 4,
            "Cr", "Chromium", "51.9961", 6, 4,
            "Mn", "Manganese", "54.938045", 7, 4,
            "Fe", "Iron", "55.845", 8, 4,
            "Co", "Cobalt", "58.933195", 9, 4,
            "Ni", "Nickel", "58.6934", 10, 4,
            "Cu", "Copper", "63.546", 11, 4,
            "Zn", "Zinc", "65.38", 12, 4,
            "Ga", "Gallium", "69.723", 13, 4,
            "Ge", "Germanium", "72.63", 14, 4,
            "As", "Arsenic", "74.9216", 15, 4,
            "Se", "Selenium", "78.96", 16, 4,
            "Br", "Bromine", "79.904", 17, 4,
            "Kr", "Krypton", "83.798", 18, 4,
            "Rb", "Rubidium", "85.4678", 1, 5,
            "Sr", "Strontium", "87.62", 2, 5,
            "Y", "Yttrium", "88.90585", 3, 5,
            "Zr", "Zirconium", "91.224", 4, 5,
            "Nb", "Niobium", "92.90628", 5, 5,
            "Mo", "Molybdenum", "95.96", 6, 5,
            "Tc", "Technetium", "(98)", 7, 5,
            "Ru", "Ruthenium", "101.07", 8, 5,
            "Rh", "Rhodium", "102.9055", 9, 5,
            "Pd", "Palladium", "106.42", 10, 5,
            "Ag", "Silver", "107.8682", 11, 5,
            "Cd", "Cadmium", "112.411", 12, 5,
            "In", "Indium", "114.818", 13, 5,
            "Sn", "Tin", "118.71", 14, 5,
            "Sb", "Antimony", "121.76", 15, 5,
            "Te", "Tellurium", "127.6", 16, 5,
            "I", "Iodine", "126.90447", 17, 5,
            "Xe", "Xenon", "131.293", 18, 5,
            "Cs", "Caesium", "132.9054", 1, 6,
            "Ba", "Barium", "132.9054", 2, 6,
            "La", "Lanthanum", "138.90547", 4, 9,
            "Ce", "Cerium", "140.116", 5, 9,
            "Pr", "Praseodymium", "140.90765", 6, 9,
            "Nd", "Neodymium", "144.242", 7, 9,
            "Pm", "Promethium", "(145)", 8, 9,
            "Sm", "Samarium", "150.36", 9, 9,
            "Eu", "Europium", "151.964", 10, 9,
            "Gd", "Gadolinium", "157.25", 11, 9,
            "Tb", "Terbium", "158.92535", 12, 9,
            "Dy", "Dysprosium", "162.5", 13, 9,
            "Ho", "Holmium", "164.93032", 14, 9,
            "Er", "Erbium", "167.259", 15, 9,
            "Tm", "Thulium", "168.93421", 16, 9,
            "Yb", "Ytterbium", "173.054", 17, 9,
            "Lu", "Lutetium", "174.9668", 18, 9,
            "Hf", "Hafnium", "178.49", 4, 6,
            "Ta", "Tantalum", "180.94788", 5, 6,
            "W", "Tungsten", "183.84", 6, 6,
            "Re", "Rhenium", "186.207", 7, 6,
            "Os", "Osmium", "190.23", 8, 6,
            "Ir", "Iridium", "192.217", 9, 6,
            "Pt", "Platinum", "195.084", 10, 6,
            "Au", "Gold", "196.966569", 11, 6,
            "Hg", "Mercury", "200.59", 12, 6,
            "Tl", "Thallium", "204.3833", 13, 6,
            "Pb", "Lead", "207.2", 14, 6,
            "Bi", "Bismuth", "208.9804", 15, 6,
            "Po", "Polonium", "(209)", 16, 6,
            "At", "Astatine", "(210)", 17, 6,
            "Rn", "Radon", "(222)", 18, 6,
            "Fr", "Francium", "(223)", 1, 7,
            "Ra", "Radium", "(226)", 2, 7,
            "Ac", "Actinium", "(227)", 4, 10,
            "Th", "Thorium", "232.03806", 5, 10,
            "Pa", "Protactinium", "231.0588", 6, 10,
            "U", "Uranium", "238.02891", 7, 10,
            "Np", "Neptunium", "(237)", 8, 10,
            "Pu", "Plutonium", "(244)", 9, 10,
            "Am", "Americium", "(243)", 10, 10,
            "Cm", "Curium", "(247)", 11, 10,
            "Bk", "Berkelium", "(247)", 12, 10,
            "Cf", "Californium", "(251)", 13, 10,
            "Es", "Einstenium", "(252)", 14, 10,
            "Fm", "Fermium", "(257)", 15, 10,
            "Md", "Mendelevium", "(258)", 16, 10,
            "No", "Nobelium", "(259)", 17, 10,
            "Lr", "Lawrencium", "(262)", 18, 10,
            "Rf", "Rutherfordium", "(267)", 4, 7,
            "Db", "Dubnium", "(268)", 5, 7,
            "Sg", "Seaborgium", "(271)", 6, 7,
            "Bh", "Bohrium", "(272)", 7, 7,
            "Hs", "Hassium", "(270)", 8, 7,
            "Mt", "Meitnerium", "(276)", 9, 7,
            "Ds", "Darmstadium", "(281)", 10, 7,
            "Rg", "Roentgenium", "(280)", 11, 7,
            "Cn", "Copernicium", "(285)", 12, 7,
            "Uut", "Unutrium", "(284)", 13, 7,
            "Fl", "Flerovium", "(289)", 14, 7,
            "Uup", "Ununpentium", "(288)", 15, 7,
            "Lv", "Livermorium", "(293)", 16, 7,
            "Uus", "Ununseptium", "(294)", 17, 7,
            "Uuo", "Ununoctium", "(294)", 18, 7
        ];

        for ( var i = 0; i < table.length; i += 5 ) {

            var element = document.createElement( 'div' );
            element.className = 'element';
            element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';

            var number = document.createElement( 'div' );
            number.className = 'xnumber';
            number.textContent = (i/5) + 1;
            element.appendChild( number );

            var symbol = document.createElement( 'div' );
            //symbol.className = 'symbol';
            symbol.className = 'screenshot3';
            symbol.textContent = table[ i ];
            element.appendChild( symbol );

            // var screenshot = document.createElement( 'div' );
            // screenshot.className = 'screenshot2';
            // element.appendChild( screenshot );

            var details = document.createElement( 'div' );
            details.className = 'details';
            details.innerHTML = table[ i + 1 ] + '<br>' + table[ i + 2 ];
            element.appendChild( details );

            var object = new CSS3DObject( element );
            object.position.x = Math.random() * 4000 - 2000;
            object.position.y = Math.random() * 4000 - 2000;
            object.position.z = Math.random() * 4000 - 2000;
            this._THREECSSScene.add( object );

            objects.push( object );

            //

            var object = new THREE.Object3D();
            var w = 222; // 140
            var h = 480; // 180
            object.position.x = ( table[ i + 3 ] * w ) - 1330;
            object.position.y = - ( table[ i + 4 ] * h ) + 990;

            targets.table.push( object );

        }

        // sphere

        var vector = new THREE.Vector3();

        for ( var i = 0, l = objects.length; i < l; i ++ ) {

            var phi = Math.acos( -1 + ( 2 * i ) / l );
            var theta = Math.sqrt( l * Math.PI ) * phi;

            var object = new THREE.Object3D();

            object.position.x = 800 * Math.cos( theta ) * Math.sin( phi );
            object.position.y = 800 * Math.sin( theta ) * Math.sin( phi );
            object.position.z = 800 * Math.cos( phi );

            vector.copy( object.position ).multiplyScalar( 2 );

            object.lookAt( vector );

            targets.sphere.push( object );

        }

        // helix

        var vector = new THREE.Vector3();

        for ( var i = 0, l = objects.length; i < l; i ++ ) {

            var phi = i * 0.175 + Math.PI;

            var object = new THREE.Object3D();

            object.position.x = 900 * Math.sin( phi );
            object.position.y = - ( i * 8 ) + 450;
            object.position.z = 900 * Math.cos( phi );

            vector.x = object.position.x * 2;
            vector.y = object.position.y;
            vector.z = object.position.z * 2;

            object.lookAt( vector );

            targets.helix.push( object );

        }

        // grid

        for ( var i = 0; i < objects.length; i ++ ) {

            var object = new THREE.Object3D();

            object.position.x = ( ( i % 5 ) * 400 ) - 800;
            object.position.y = ( - ( Math.floor( i / 5 ) % 5 ) * 400 ) + 800;
            object.position.z = ( Math.floor( i / 25 ) ) * 1000 - 2000;

            targets.grid.push( object );

        }

        //this._transform( objects, targets.table, 2000 );


    }

    _transform( objects, targets, duration ) {

        const _this = this;
        TWEEN.removeAll();

        for ( var i = 0; i < objects.length; i ++ ) {

            var object = objects[ i ];
            var target = targets[ i ];

            new TWEEN.Tween( object.position )
                .to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
                .easing( TWEEN.Easing.Exponential.InOut )
                .start();

            new TWEEN.Tween( object.rotation )
                .to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
                .easing( TWEEN.Easing.Exponential.InOut )
                .start();

        }

        new TWEEN.Tween( this )
            .to( {}, duration * 2 )
            .onUpdate( _this._render() )
            .start();

    }
}