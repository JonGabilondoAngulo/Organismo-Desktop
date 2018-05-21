/**
 * Created by jongabilondo on 02/07/2016.
 */

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
        this._THREECamera = null;
        this._THREERenderer = null;
        this._THREEOrbitControls = null;
        this._keyboardState = null;
        this._threeClock = null;
        this._uiExpanded = false;
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

    /*expand() {
        if (!this._uiExpanded) {
            bootbox.dialog({ message: '<div class="text-center"><h4><i class="fa fa-spin fa-spinner"></i>&nbsp;Expanding UI elements...</h4></div>' }); // Progress alert

            ORG.deviceController.getElementTree({
                "status-bar": true,
                "keyboard": true,
                "alert": true,
                "normal": true
            });
            //this.expanding = true;
        }
    }

    collapseAndExpandAnimated() {
        const _this = this;
        this.collapse(() => {
            _this.expand();
        })
    }*/

    collapse(completionCallback) {
        if (this.isExpanded) {
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
        this._THREERenderer.setSize(newSize.width, this._THREERenderer.getSize().height);
        this._THREECamera.aspect	= newSize.width / this._THREERenderer.getSize().height;
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
        //this._THREEScene.add(this._THREEDeviceAndScreenGroup);

        this._THREECamera = new THREE.PerspectiveCamera(65, (rendererCanvasWidth / rendererCanvasHeight), 0.001, 10000);
        this._THREERenderer = new THREE.WebGLRenderer({antialias: true /*, alpha:true (if transparency wanted)*/});
        this._THREERenderer.domElement.style.position = 'absolute';
        this._THREERenderer.domElement.style.top = 0;
        //_THREERenderer.domElement.style.zIndex = 0;
        //_THREERenderer.setClearColor(0x000000);

        this._THREERenderer.setSize(rendererCanvasWidth, rendererCanvasHeight);
        this._canvasDomElement.appendChild(this._THREERenderer.domElement);
        this._rendererDOMElement = this._THREERenderer.domElement; // the DOM element for the renderer

        this._THREEOrbitControls = new THREE.OrbitControls(this._THREECamera, this._THREERenderer.domElement);//this._canvasDomElement);
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
            _this._THREERenderer.render(_this._THREEScene, _this._THREECamera);
            _this._THREEOrbitControls.update();
            _this._updateScene();
            TWEEN.update();
            _this._render();
        })
    }

    _updateScene()
    {
       /* if (this._deviceScreen) {
            this._deviceScreen.renderUpdate();
        }*/
        this._device.renderUpdate();

        /*if (this._transformControl) {
            this._transformControl.update(); // important to update the controls size while changing POV
        }*/
        if (this._beaconTransformControl) {
            this._beaconTransformControl.update(); // important to update the controls size while changing POV
        }
        if (ORG.systemInfoManager) {
            ORG.systemInfoManager.update();
        }
/*
        _keyboardState.update();

        // Expand/Collapse UI
        if (_keyboardState.down("E")) {
            ORG.scene.expandCollapse();
        }
        else if (_keyboardState.down("F")) {
            checkButtonShowFloor.click();
            ORG.scene.setShowFloor(checkButtonShowFloor.is(':checked'));
        }
        else if (_keyboardState.down("P")) {
            checkButtonShowPrivate.click();
            ORG.scene.setShowPrivate(checkButtonShowPrivate.is(':checked'));
        }
        else if (_keyboardState.down("L")) {
            checkButtonLiveScreen.click();
            ORG.scene.setLiveScreen(checkButtonLiveScreen.is(':checked'));
         }
        else if (_keyboardState.down("T")) {
            checkButtonShowTooltips.click();
            ORG.scene.setShowTooltips(checkButtonShowTooltips.is(':checked'));
         }
*/
        // rotate left/right/up/down

        //if (keyboard.down("left")) {
        //    //iPhone5Object.translateX(-50);
        //    threeScreenPlane.translateX(-50);
        //}
        //if (keyboard.down("right")) {
        //    //iPhone5Object.translateX( 50);
        //    threeScreenPlane.translateX(50);
        //}
        //if (keyboard.pressed("up")) {
        //    //iPhone5Object.translateZ(-50);
        //    threeScreenPlane.translateZ(-50);
        //}
        //if (keyboard.pressed("down")) {
        //    //iPhone5Object.translateZ( 50);
        //    threeScreenPlane.translateZ(50);
        //}

        //var rotation_matrix = new THREE.Matrix4().identity();
        /*
        if (_keyboardState.pressed("A")) {
            //iPhone5Object.rotateOnAxis(new THREE.Vector3(0,1,0), rotateAngle);
            if (!!threeScreenPlane) {
                threeScreenPlane.rotateOnAxis(new THREE.Vector3(0,1,0), rotateAngle);
            }
            deviceMotionChanged = true;
        }
        if (keyboard.pressed("D")) {
            //iPhone5Object.rotateOnAxis(new THREE.Vector3(0,1,0), -rotateAngle);
            threeScreenPlane.rotateOnAxis(new THREE.Vector3(0,1,0), -rotateAngle);
            deviceMotionChanged = true;
        }
        if (keyboard.pressed("R")) {
            //iPhone5Object.rotateOnAxis(new THREE.Vector3(1,0,0), rotateAngle);
            threeScreenPlane.rotateOnAxis(new THREE.Vector3(1,0,0), rotateAngle);
            deviceMotionChanged = true;
        }
        if (keyboard.pressed("F")) {
            //iPhone5Object.rotateOnAxis(new THREE.Vector3(1,0,0), -rotateAngle);
            threeScreenPlane.rotateOnAxis(new THREE.Vector3(1,0,0), -rotateAngle);
            deviceMotionChanged = true;
        }
        if (keyboard.pressed("Q")) {
            //iPhone5Object.rotateOnAxis(new THREE.Vector3(0,0,1), rotateAngle);
            threeScreenPlane.rotateOnAxis(new THREE.Vector3(0,0,1), rotateAngle);
            deviceMotionChanged = true;
        }
        if (keyboard.pressed("W")) {
            //iPhone5Object.rotateOnAxis(new THREE.Vector3(0,0,1), -rotateAngle);
            threeScreenPlane.rotateOnAxis(new THREE.Vector3(0,0,1), -rotateAngle);
            deviceMotionChanged = true;
        }
        if (keyboard.pressed("Z")) {
            //iPhone5Object.position.set(0,0,0);
            //iPhone5Object.rotation.set(0,0,0);
            threeScreenPlane.position.set(0,0,0);
            threeScreenPlane.rotation.set(0,0,0);
            deviceMotionChanged = true;
        }*/

        //if (motionActive==true && deviceMotionChanged==true) {
        //    //alert("1");
        //    if (motionMode == "send") {
        //        //alert("2");
        //        // send motion data to device
        //        var rotation = iPhone5Object.rotation;
        //        var quaternion = iPhone5Object.quaternion;
        //
        //        var message = {
        //            "command" : "SimulatorMotionUpdate",
        //            "content" : {"q" : { "x" : quaternion.x, "y":quaternion.z, "z":quaternion.y, "w":quaternion.w}}
        //        };
        //
        //        sendSimulatorMotionUpdate(message);
        //    }
        //}

        //var timeOffset = uniforms.time.value + attributes.customOffset.value[ v ];
        //particleGeometry.vertices[v] = position(timeOffset);
        //iPhone5Object.setPosition(position(timeOffset));
    }

}