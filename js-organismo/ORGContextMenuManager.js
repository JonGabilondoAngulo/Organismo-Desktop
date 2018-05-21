/**
 * Created by jongabilondo on 15/09/2016.
 */


/**
 * Class to create context menus in the 3D scene.
 * It implements the delegate call for ORGMouseListener in order to get the right mouse click.
 * It implements the delegate call for ORG3DRaycaster which informs what is the selected three obj.
 * @param domElement
 * @constructor
 */
class ORGContextMenuManager {

    /**
     *
     * @param scene The ORG scene.
     * @param contextElement the element where the context menu shows up.
     */
    constructor(scene, contextElement) {
        this._selectedThreeObject = null; // the three obj where the mouse is on.
        this._intersectionPoint = null;
        this._scene = scene; // We will need to get information from some objects in the scene
        this._contextElement = contextElement;

        /**
         * Instantiate the context menu
         */
        $.contextMenu({
            selector: this._contextElement,
            trigger: 'none',
            build: ($trigger, e) => {
                if (this._selectedThreeObject) {
                    return {
                        items: this._menuItemsForScreen()
                    }
                } else {
                    return {
                        items: this._menuItemsForOutOfScreen()
                    }
                }
            },
            callback: (key, options) => {
                this._processMenuSelection(key, this._selectedThreeObject, this._scene);
            }
        });
    }


    /**
     * ORGMouseListener calls this method on right click
     * @param event
     */
    onContextMenu(event) {
        if (!ORG.deviceController || ORG.deviceController.isConnected === false) {
            return;
        }
        $(this._contextElement).contextMenu({x:event.clientX, y:event.clientY});
    }

    /**
     * ORG3DRaycaster calls this method to inform of the three obj the mouse is hoovering on.
     * @param threeElement
     */
    mouseOverElement(threeElement, point) {
        this._selectedThreeObject = threeElement;
        this._intersectionPoint = point;
    }


    /**
     * The user has selected a menu option. This function will respond to the selection.
     * @param menuOptionKey The string that represents the selected menu option.
     * @param threeObj The 3D object where the click happened.
     * @param scene The ORG scene.
     */
    _processMenuSelection(menuOptionKey, threeObj, scene) {

        if (!threeObj) {
            this._processMenuSelectionOnVoid(menuOptionKey, scene); // in screen raycaster we get no three obj
            return;
        }

        // Calculate the App coordinates where the mouse was clicked.

        const screenBbox = scene.deviceScreenBoundingBox;
        const appX = this._intersectionPoint.x - screenBbox.min.x;
        const appY = screenBbox.max.y - this._intersectionPoint.y;

        const parameters = {location:{x:appX, y:appY}};

        switch (menuOptionKey) {
            case ORGActions.PRESS_HOME : {
                ORGActionsCenter.pressHome();
            } break;
            case ORGActions.LOCK_DEVICE : {
                ORGActionsCenter.lockDevice();
            } break;
            case ORGActions.UNLOCK_DEVICE : {
                ORGActionsCenter.unlockDevice();
            } break;
            case ORGActions.REFRESH_SCREEN : {
                ORGActionsCenter.refreshScreen();
            } break;
            case ORGActions.TRANSLATE_DEVICE : {
                ORGActionsCenter.translateDevice();
            } break;
            case ORGActions.ROTATE_DEVICE : {
                ORGActionsCenter.rotateDevice();
            } break;
            case ORGDevice.ORIENTATION_PORTRAIT:
            case ORGDevice.ORIENTATION_PORTRAIT_UPSIDE_DOWN:
            case ORGDevice.ORIENTATION_LANDSCAPE_LEFT:
            case ORGDevice.ORIENTATION_LANDSCAPE_RIGHT: {
                ORGActionsCenter.setOrientation(menuOptionKey);
            } break;
            case ORGActions.TAP : {
                ORG.deviceController.send(ORGMessageBuilder.gesture(menuOptionKey, parameters));
            } break;
            case ORGActions.LONG_PRESS : {
                parameters.duration = 0.5;
                ORG.deviceController.send(ORGMessageBuilder.gesture(menuOptionKey, parameters));
            } break;
            case ORGActions.SWIPE_LEFT : {
                parameters.direction = "left";
                ORG.deviceController.send(ORGMessageBuilder.gesture(menuOptionKey, parameters));
            } break;
            case ORGActions.SWIPE_RIGHT : {
                parameters.direction = "right";
                ORG.deviceController.send(ORGMessageBuilder.gesture(menuOptionKey, parameters));
            } break;
            case ORGActions.SWIPE_UP : {
                parameters.direction = "up";
                ORG.deviceController.send(ORGMessageBuilder.gesture(menuOptionKey, parameters));
            } break;
            case ORGActions.SWIPE_DOWN : {
                parameters.direction = "down";
                ORG.deviceController.send(ORGMessageBuilder.gesture(menuOptionKey, parameters));
            } break;
            case ORGActions.LOOK_AT : {
                scene.lookAtObject( threeObj );
            } break;
            case ORGActions.LOOK_FRONT_AT : {
                scene.lookFrontAtObject( threeObj );
            } break;
        }
    }

    /**
     * This function will respond to the selected option of the menu in the scene open area.
     * @param menuOptionKey
     * @param scene
     * @private
     */
    _processMenuSelectionOnVoid(menuOptionKey, scene) {

        switch (menuOptionKey) {
            case ORGActions.RESET_CAMERA_POSITION : {
                scene.resetCameraPosition();
            } break;
            case ORGActions.RESET_DEVICE_POSITION : {
                scene.resetDevicePosition();
            } break;
            case ORGActions.SCREEN_CLOSEUP : {
                scene.deviceScreenCloseup();
            } break;
            case ORGActions.LOOK_AT_DEVICE : {
                ORGActionsCenter.lookAtDevice();
            } break;
        }
    }

    _menuItemsForScreen() {
        let controller = ORG.deviceController;
        var items = {};
        if (controller.type === 'ORG') {
            items[ORGActions.TAP] = {name: "Tap"};
            items[ORGActions.LONG_PRESS] = {name: "Long Press"};
            items[ORGActions.SWIPE] = {
                name: "Swipe",
                items: {
                    [ORGActions.SWIPE_LEFT]: {name: "Left"},
                    [ORGActions.SWIPE_RIGHT]: {name: "Right"},
                    [ORGActions.SWIPE_UP]: {name: "Up"},
                    [ORGActions.SWIPE_DOWN]: {name: "Down"},
                }
            }
        }

        if (controller.type === 'WDA') {
            if (Object.keys(items).length) {
                items["separator-press"] = { "type": "cm_separator" };
            }
            items[ORGActions.PRESS_HOME] = {name: "Press Home"};
            items[ORGActions.LOCK_DEVICE] = {name: "Lock"};
            items[ORGActions.UNLOCK_DEVICE] = {name: "Unlock"};
            items[ORGActions.SET_ORIENTATION] = {
                name: "Set Orientation",
                items: {
                    [ORGDevice.ORIENTATION_PORTRAIT]: {name: "Portrait"},
                    [ORGDevice.ORIENTATION_LANDSCAPE_LEFT]: {name: "Landscape Left"},
                    [ORGDevice.ORIENTATION_LANDSCAPE_RIGHT]: {name: "Landscape Right"},
                    [ORGDevice.ORIENTATION_PORTRAIT_UPSIDE_DOWN]: {name: "Upside Down"}
                }
            }
        }

        if (controller.type === 'ORG') {
            if (Object.keys(items).length) {
                items["separator-look"] = { "type": "cm_separator" };
            }
            items[ORGActions.TRANSLATE_DEVICE] = {name: "Translate Device [ON/OFF]"};
            items[ORGActions.ROTATE_DEVICE] = {name: "Rotate Device [ON/OFF]"};
/*
            items[ORGActions.LOOK_AT] = {name: "Look at"};
            items[ORGActions.LOOK_FRONT_AT] = {name: "Look Front at"};
*/
        }

        if (controller.type === 'WDA') {
            if (Object.keys(items).length) {
                items["separator-refresh"] = { "type": "cm_separator" };
            }
            items[ORGActions.REFRESH_SCREEN] = {name: "Refresh Screen"};
        }

        return items;
    }

    _menuItemsForOutOfScreen() {
        return {
            [ORGActions.RESET_CAMERA_POSITION]: {name: "Reset Camera Position"},
            [ORGActions.RESET_DEVICE_POSITION]: {name: "Reset Device Position"},
            [ORGActions.SCREEN_CLOSEUP]: {name: "Device Screen Closeup"},
            [ORGActions.LOOK_AT_DEVICE]: {name: "Look At Device"}
        }
    }
}