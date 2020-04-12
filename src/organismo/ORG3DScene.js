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
const ORG3DLabSimulator = require('./ORG3DLabSimulator')

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
        this._labSimulator = null;

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

    get THREEOrbitControls() {
        return this._THREEOrbitControls;
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

    enterLabMode(actionType) {
        if (!this._labSimulator) {
            this._removeFloor();
            this._labSimulator = new ORG3DLabSimulator(this, this._THREECSSScene, this._THREEScene);
        }
        /*else {
            this._labSimulator.destroy();
            this._labSimulator = null;
        }*/

        if (actionType == 'show-lab-devices') {
            this._labSimulator.showDevices();
        } else if (actionType == 'show-lab-racks') {
            this._labSimulator.showRacks();
        } else if (actionType == 'show-lab-world') {
            this._labSimulator.showWorldView();
        }
    }

    setLabMode(mode) {
        if (this._labSimulator) {
            this._labSimulator.setMode(mode);
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
        this._THREECamera = new THREE.PerspectiveCamera(65, (rendererCanvasWidth / rendererCanvasHeight), 0.001, 100000);

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
        if (THREE.CSS3DRenderer !== undefined) {
            renderer = new THREE.CSS3DRenderer();
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

        light = new THREE.SpotLight(0xaaaaaa, 0.1);
        light.position.set(500,-500,500);
        this._THREEScene.add(light);
        //
        light = new THREE.SpotLight(0xaaaaaa, 0.1);
        light.position.set(500,500,500);
        this._THREEScene.add(light);

        light = new THREE.SpotLight(0xaaaaaa, 0.1);
        light.position.set(-500,-500,-500);
        this._THREEScene.add(light);

        light = new THREE.SpotLight(0xaaaaaa, 0.1);
        light.position.set(-500,500,-500);
        this._THREEScene.add(light);

        //light = new THREE.DirectionalLight(0xaaaaaa, 0.1 );
        //light.position.set(1,1,0.5);
        //this._THREEScene.add(light);
        //
        //light = new THREE.DirectionalLight(0xaaaaaa, 0.5 );
        //light.position.copy( new THREE.Vector3(1.0, 1.0, 1.0));
        //this._THREEScene.add(light);

        light = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.2);
        this._THREEScene.add(light);

        light = new THREE.AmbientLight(0xffffff, 1.0);
        this._THREEScene.add(light);
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

}