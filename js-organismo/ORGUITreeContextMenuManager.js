/**
 * Created by jongabilondo on 13/02/2018.
 */

/***
 * Class to wrapp the functionality of the UITree context menu
 */
class ORGUITreeContextMenuManager {

    /**
     *
     * @param contextElement the element where the context menu shows up.
     */
    constructor(contextElement) {
        this._node = null; // the tree component node
        this._contextElement = contextElement;

        // Instantiate the context menu
        $.contextMenu({
            selector: this._contextElement,
            trigger: 'none',
            build: ($trigger, e) => {
                return {items: this._menuItemsForNode()}
            },
            callback: (key, options) => {
                this._processMenuSelection(key);
            }
        })
    }


    /**
     * Shows the context menu at the point of event.
     * @param event
     */
    onContextMenu(event, node) {
        if (!ORG.deviceController || ORG.deviceController.isConnected === false) {
            return;
        }
        this._node = node;
        $(this._contextElement).contextMenu({x:node.clientX, y:node.clientY});
    }

    /**
     * The user has selected a menu option. This function will respond to the selection.
     * @param menuOptionKey The string that represents the selected menu option.
     */
    _processMenuSelection(menuOptionKey) {

        switch (menuOptionKey) {
            case ORGActions.TAP:
            case ORGActions.LONG_PRESS:
            case ORGActions.SWIPE_LEFT:
            case ORGActions.SWIPE_RIGHT:
            case ORGActions.SWIPE_UP:
            case ORGActions.SWIPE_DOWN:
            {
                ORGActionsCenter.playGesture(menuOptionKey, this._getElementXPath(this._node));
            } break;
            case ORGActions.LOOK_AT : {
                alert('Not implemented.');
            } break;
            case ORGActions.LOOK_FRONT_AT: {
                alert('Not implemented.');
            } break;
            case ORGActions.SHOW_CLASS_HIERARCHY: {
                if (this._node && this._node.representedNode && (typeof this._node.representedNode.class !== undefined)) {
                    ORGActionsCenter.getElementClassHierarchy(this._node.representedNode.class);
                }
            } break;
        }
    }

    _menuItemsForNode() {
        let controller = ORG.deviceController;
        var items = {};

        if (controller.type === "WDA") {
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

        if (controller.type === "ORG") {
            items[ORGActions.SHOW_CLASS_HIERARCHY] = {name: "Class Hierarchy"}
            items["separator-look"] = { "type": "cm_separator" };
            items[ORGActions.LOOK_AT] = {name: "Look at"}
            items[ORGActions.LOOK_FRONT_AT] = {name: "Look Front at"}
        }
        return items;
    }

    _getElementXPath(node) {
        if (!node) {
            return '//XCUIElementTypeApplication[1]'
        }
        let parent = ORG.UIJSONTreeManager.nodeParent(node)
        let idx = 0;
        if (parent) {
            for (let child of parent.nodes) {
                if (child.representedNode.type === node.representedNode.type) {
                    idx++;
                }
                if (child.nodeId === node.nodeId) {
                    break;
                }
            }
        } else {
            let nodes = ORG.UIJSONTreeManager.rootNodes()
            for (let treeNode of nodes) {
                if (treeNode.representedNode.type === node.representedNode.type) {
                    idx++;
                }
                if (treeNode.nodeId === node.nodeId) {
                    break;
                }
            }
        }
        return this._getElementXPath(parent) +  '/' + 'XCUIElementType' + node.representedNode.type + '[' + idx + ']'
    }
}