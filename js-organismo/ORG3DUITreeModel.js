/**
 * Created by jongabilondo on 02/07/2016.
 */


const ORGTreeVisualizationMask = {
    ShowNormalWindow : 0x1,
    ShowAlertWindow : 0x2,
    ShowKeyboardWindow : 0x4,
    ShowStatusWindow : 0x8,
    ShowScreenshots : 0x10,
    ShowPrivate : 0x20,
    ShowPublic : 0x40,
    ShowHiddenViews : 0x80,
    ShowHiddenViewsOnly : 0x100,
    ShowInteractiveViews : 0x0200,
    ShowNonInteractiveViews : 0x0400,
    ShowOutOfScreen : 0x0800
};

const kORGMinimalPlaneDistance = 0.001; // m
const kORGMaxPlaneDistance = 0.02; // m
const kORGExtrudeDuration = 500.0; // ms

/**
 * This class builds and manages the expanded 3D UI model. Given a JSON UI model it creates an expanded model of THREE objects.
 * @constructor
 */
class ORG3DUITreeModel {

    constructor(visualizationFlag) {
        this._treeData = null; // json of ui elements tree as arrived from device
        this._THREEElementTreeGroup = null; // threejs group with all the ui elements.
        this._THREEScene = null;
        this._collapseTweenCount = 0; // collapse animation counter
        this._visualizationFlags = visualizationFlag;
        this._planeDistance = kORGMinimalPlaneDistance;
        this._layerCount = 0;
        this._nodeHighlighter = new ORG3DUIElementHighlight();
    }

    get treeGroup() {
        return this._THREEElementTreeGroup;
    }

    get isExpanded() {
        return this.treeGroup !== null;
    }

    set visualizationFlags(flags) {
        this._visualizationFlags = flags;
    }

    get layerCount() {
        return this._layerCount;
    }
    get _flagShowKeyboard() {
        return (this._visualizationFlags & ORGTreeVisualizationMask.ShowKeyboardWindow);
    }
    get _flagShowPrivate() {
        return (this._visualizationFlags & ORGTreeVisualizationMask.ShowPrivate);
    }
    get _flagShowHiddenViews() {
        return (this._visualizationFlags & ORGTreeVisualizationMask.ShowHiddenViews);
    }
    get _flagShowHiddenViewsOnly() {
        return (this._visualizationFlags & ORGTreeVisualizationMask.ShowHiddenViewsOnly);
    }
    get _flagShowOutOfScreen() {
        return (this._visualizationFlags & ORGTreeVisualizationMask.ShowOutOfScreen);
    }
    get _flagShowInteractiveViews() {
        return (this._visualizationFlags & ORGTreeVisualizationMask.ShowInteractiveViews);
    }
    get _flagShowNonInteractiveViews() {
        return (this._visualizationFlags & ORGTreeVisualizationMask.ShowNonInteractiveViews);
    }
    get _flagShowScreenshots() {
        return (this._visualizationFlags & ORGTreeVisualizationMask.ShowScreenshots);
    }

    createUITreeModel(treeTopLevelNodes, threeScene, screenSize, displaySize, displayScale, displayPosition) {
        this._layerCount = 0;
        this._collapseTweenCount = 0;
        this._treeData = treeTopLevelNodes;
        this._THREEScene = threeScene;

        this._createUITreeModel(this._treeData, this._THREEScene, screenSize, displaySize, displayScale, displayPosition);
    }

    updateUITreeModel(treeTopLevelNodes, threeScene, screenSize, displaySize, displayScale, displayPosition) {
        if (this._treeData) {
            this.removeUITreeModel(threeScene); // remove existing first
        }
        this.createUITreeModel(treeTopLevelNodes, threeScene, screenSize, displaySize, displayScale, displayPosition);
    }

    collapseWithCompletion(completion) {
        for (let i=0; i < this._treeData.length; i++) {
            const treeNode = this._treeData[i];
            this._collapseNodeAnimatedWithCompletion(treeNode, completion)
        }
    }

    removeUITreeModel(threeScene) {
        if (this._THREEElementTreeGroup) {
            threeScene.remove(this._THREEElementTreeGroup);
            this._THREEElementTreeGroup = null;
        }
    }

    hideTextures(hide) {
        if (this._THREEElementTreeGroup) {
            this._THREEElementTreeGroup.traverse(function (child) {
                if (child.type === "Mesh") {
                    if (hide) {
                        child.material.map = null;
                        child.material.color = new THREE.Color(0x000000);
                        //child.material.opacity = 1.0;
                        //child.material.transparent = false;
                    } else {
                        child.material.map = child.ORGData.threeScreenshotTexture;
                        child.material.color = new THREE.Color(0xffffff);
                        //child.material.opacity = 0;
                    }
                    child.material.needsUpdate = true;
                    //child.material.visible = !hide;
                }
            })
        }
    }

    hideNonInteractiveViews(hide) {
        if (this._THREEElementTreeGroup) {
            this._THREEElementTreeGroup.traverse(function (child) {
                if (child.type === "Group") {
                    if (hide) {
                        const nodeData = child.userData;
                        if (nodeData) {
                            if (!_nodeIsInteractive(nodeData)) {
                                _hideNodeGroup(child, true);
                            }
                        }
                    } else {
                        _hideNodeGroup(child, false);
                    }
                }
            })
        }
    }

    showConnections(show , threeScene) {
        if (this._THREEElementTreeGroup) {
            this._THREEElementTreeGroup.traverse(function (child) {
                if (child.type === "Group") {
                    const nodeData = child.userData;
                    if (_nodeIsInteractive(nodeData)) {
                        const mesh = child.children[0];
                        if (mesh) {
                            const arrowHelper = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), mesh.position, 400, 0x0000ff, 50, 25);
                            const cone = arrowHelper.cone;
                            threeScene.add(arrowHelper);
                        }
                    }
                }
            })
        }
    }

    setExpandedTreeLayersDistance(distanceUnits) {
        this._planeDistance = kORGMinimalPlaneDistance + (distanceUnits/100.0 * kORGMaxPlaneDistance); // new plane distance

        if (this._THREEElementTreeGroup) {
            const allElements = this._THREEElementTreeGroup.children;
            let firstPosition = 0;
            for (let i=0; i<allElements.length; i++) {
                let currentElementGroup = allElements[i];
                if (i === 0) {
                    firstPosition = currentElementGroup.position;
                    continue;
                }

                if (currentElementGroup.type === "Group") {
                    const layerNum = (currentElementGroup.userData.originalWorldZPosition - firstPosition.z) / kORGMinimalPlaneDistance; // layer of the element
                    currentElementGroup.position.z = firstPosition.z + (layerNum * this._planeDistance);
                } else {
                    // all should be groups !
                }
            }
        }
    }

    setExpandedTreeLayersVisibleRange(maxVisibleLayer) {
        // Traverse all Tree elements and set their visibility
        // Every element is a Group with 2 children, a Mesh and a BoxHelper.
        if (this._THREEElementTreeGroup) {
            const allElements = this._THREEElementTreeGroup.children;
            for (let currentElementGroup of allElements) {
                if (currentElementGroup.type === "Group") {
                    const nodeData = currentElementGroup.userData;
                    if (!!nodeData) {
                        currentElementGroup.visible = (nodeData.expandedTreeLayer < maxVisibleLayer);
                    }
                }
            }
        }
    }

    /***
     * Highlight the given node, unhighlight previous.
     * @param elementNode - A JSON description of the UI node. It is not a THREE object. The tree has some THREE node that represents the passed element node.
     */
    highlightUIElement(elementNode) {
        if (!this._THREEElementTreeGroup) {
            return;
        }
        if (elementNode) {
            const allElements = this._THREEElementTreeGroup.children;
            for (let currentElementGroup of allElements) {
                if (currentElementGroup.type === "Group") {
                    const nodeData = currentElementGroup.userData;
                    if (!!nodeData && !!nodeData.pointer && (nodeData.pointer === elementNode.pointer)) {
                        this._nodeHighlighter.mouseOverElement(currentElementGroup);
                        break;
                    }
                }
            }
        } else {
            this._nodeHighlighter.mouseOverElement(null);
        }
    }

    // PRIVATE

    /***
     * Creates a 3D representation of a UI tree.
     * @param treeRootNodes - The top level nodes. Usually the Windows.
     * @param threeScene - The THREE scene to add the tree to.
     * @param screenSize - Screen size in pixels.
     * @param displaySize - Display real world size (m)
     * @param displayScale -  Scale to convert screen pixels to world coordinates.
     * @param displayPosition - Position of the display in real world. (m)
     * @private
     */
    _createUITreeModel(treeRootNodes, threeScene, screenSize, displaySize, displayScale, displayPosition) {
        this.removeUITreeModel(threeScene); // remove existing first

        this._THREEElementTreeGroup = new THREE.Group();
        threeScene.add(this._THREEElementTreeGroup);

        let nextZPos = 0;
        if (!!treeRootNodes) {
            let treeNode;
            for (let i = 0; i < treeRootNodes.length; i++) {
                treeNode = treeRootNodes[i];

                // Some full branches might be ignored
                if (!this._mustCreateTreeBranch(treeNode)) {
                    console.log("ignoring tree branch.");
                    continue;
                }

                // create the element and its subelements (full branch)
                if (this._mustCreateTreeObject(treeNode)) {
                    nextZPos = this._createTreeNode3DModel(treeNode, null, screenSize, displaySize, displayScale, displayPosition, nextZPos, nextZPos);
                }
            }
        }

        ORG.dispatcher.dispatch({
            actionType: 'uitree-expanded',
            ui_tree: this
        })
    }

    /***
     * Creates a 3D representation of a UI tree.
     * @param treeRootNodes - The top level nodes. Usually the Windows.
     * @param screenSize - Screen size in pixels.
     * @param displaySize - Display real world size (m)
     * @param displayScale -  Scale to convert screen pixels to world coordinates.
     * @param displayPosition - Position of the display in real world. (m)
     * @param startingZPos - The Z pos for the first node.
     * @private
     */
    //_createTree3DModel(treeRootNodes, screenSize, displaySize, displayScale, displayPosition, startingZPos) {
    //    let nextZPos = startingZPos;
    //    if (!!treeRootNodes) {
    //        let treeNode;
    //        for (let i = 0; i < treeRootNodes.length; i++) {
    //            treeNode = treeRootNodes[i];
    //
    //            // Some full branches might be ignored
    //            if (!this._mustCreateTreeBranch(treeNode)) {
    //                console.log("ignoring tree branch.");
    //                continue;
    //            }
    //
    //            // create the element
    //            if (this._mustCreateTreeObject(treeNode)) {
    //                nextZPos = this._createTreeNode3DModel(treeNode, null, screenSize, displaySize, displayScale, displayPosition, nextZPos, nextZPos);
    //            }
    //        }
    //    }
    //}

    /***
     * Create the 3D tree starting from a given tree node. Recursive.
     * @param treeNode -  The root node.
     * @param treeNodeParent - The last parent node taht was created in 3D. Not necessarily the parent in the UI tree, some nodes are not represented.
     * @param screenSize - Screen size in pixels.
     * @param displaySize - Display real world size (m)
     * @param displayScale -  Scale to convert screen pixels to world coordinates.
     * @param displayPosition - Position of the display in real world. (m)
     * @param zStartingPos - Z position of the node.
     * @param highestZPosition - THe highest Z so far.
     * @returns {highestZPosition}
     * @private
     */
    _createTreeNode3DModel(treeNode, treeNodeParent, screenSize, displaySize, displayScale, displayPosition, zStartingPos, highestZPosition) {
        let lastCreatedParentNode = treeNodeParent;
        let newElemZPosition = zStartingPos;

        if (typeof(treeNode) !== "object") {
            console.log("what is this ? Tree node that is not an object ?");
            return highestZPosition;
        }

        if (this._mustCreateTreeObject(treeNode)) {
            let screenshotTexture = null;
            let elementBase64Image = treeNode.screenshot;
            if (elementBase64Image) {
                let img = new Image();
                img.src = "data:image/png;base64," + elementBase64Image;
                screenshotTexture = new THREE.Texture(img);
                screenshotTexture.minFilter = THREE.NearestFilter;
                screenshotTexture.needsUpdate = true;
            }

            const elementWorldBounds = this._elementWorldBounds(treeNode, screenSize, displaySize, displayScale, displayPosition, true); // calculate bounds of the ui element in real world (x,y), at 0,0.
            newElemZPosition = this._calculateElementZPosition(treeNode, treeNodeParent, elementWorldBounds, zStartingPos, displayPosition);

            let elementGroup = this._createUIElementObject(treeNode, elementWorldBounds, screenshotTexture, newElemZPosition);
            if (elementGroup) {
                this._THREEElementTreeGroup.add(elementGroup);
                treeNode.threeObj = elementGroup;
                elementGroup.userData = treeNode;

                if (this._mustHideTreeObject(treeNode)) {
                    elementGroup.visible = false;
                } else {
                    // Now we will animate the element to its final position.
                    // The final zPosition is in treeNode, not in the mesh object which is at 0.
                    const finalMeshPosition = {x: elementGroup.position.x, y: elementGroup.position.y, z: newElemZPosition};
                    const tween = new TWEEN.Tween(elementGroup.position)
                        .to(finalMeshPosition, kORGExtrudeDuration)
                        .start();
                }
            }

            if (newElemZPosition > highestZPosition) {
                highestZPosition = newElemZPosition;
            }
            lastCreatedParentNode = treeNode; // this is the parent of the subviews to be created bellow
        }

        // create subelements
        if (!!treeNode.subviews) {
            for (let i = 0; i < treeNode.subviews.length; i++) {
                highestZPosition = this._createTreeNode3DModel(treeNode.subviews[i], lastCreatedParentNode, screenSize, displaySize, displayScale, displayPosition, newElemZPosition, highestZPosition);
            }
        }
        return highestZPosition;
    }

    /**
     * Convert the pixel 2D coordinates of an element to world coordinates.
     * @param uiElement
     * @param screenSize - in pixels
     * @param displaySize - real world
     * @param displayScale
     * @param displayPosition - real world
     * @returns {defs.THREE.Box2|*|Box2}
     * @private
     */
    _elementWorldBounds(uiElement, screenSize, displaySize, displayScale, displayPosition, translateToDevice) {

        // device coordinates are 0,0 for top-left corner !

        let elementBox2 = new THREE.Box2(
            new THREE.Vector2(uiElement.bounds.left * displayScale.x, (screenSize.height - uiElement.bounds.bottom) * displayScale.y),
            new THREE.Vector2(uiElement.bounds.right * displayScale.x, (screenSize.height - uiElement.bounds.top) * displayScale.y));
        elementBox2.translate(new THREE.Vector2(- (displaySize.width / 2.0), - (displaySize.height / 2.0)));

        if (translateToDevice) {
            elementBox2.translate(new THREE.Vector2(displayPosition.x , displayPosition.y));
        }
        return elementBox2;
    }

    /**
     * Creates and returns THREE.Group for an UI element with a plane plus a box helper for highlight. It assigns a texture.
     * @param uiElementDescription
     * @param elementWorldBoundsBox2
     * @param THREEScreenshotTexture
     * @param zPosition - z axis position for the 3d object
     * @returns THREE.Group
     * @private
     */
    _createUIElementObject(uiElementDescription, elementWorldBoundsBox2, THREEScreenshotTexture, zPosition) {
        let THREEMaterial, THREEMesh, THREEGeometry, THREEUIElementGroup;

        if (!uiElementDescription.bounds) {
            //console.log("Object has no boundsInScreen !", uiObjectDescription, JSON.stringify(uiObjectDescription));
            return null;
        }

        // create obj at Z = 0. We will animate it to its real position later.

        let center2D = new THREE.Vector2();
        elementWorldBoundsBox2.getCenter(center2D);
        const center3D = new THREE.Vector3(center2D.x, center2D.y, 0.0);

        THREEGeometry = new THREE.PlaneBufferGeometry(elementWorldBoundsBox2.getSize().x, elementWorldBoundsBox2.getSize().y, 1, 1);
        uiElementDescription.originalWorldZPosition = zPosition; // keep it here for later use
        uiElementDescription.expandedTreeLayer = zPosition / this._planeDistance; // keep it here for later use
        if (uiElementDescription.expandedTreeLayer > this._layerCount) {
            this._layerCount = uiElementDescription.expandedTreeLayer;
        }

        if (this._flagShowScreenshots && THREEScreenshotTexture) {
            THREEMaterial = new THREE.MeshBasicMaterial({map: THREEScreenshotTexture, transparent: false, side: THREE.DoubleSide});
        } else {
            THREEMaterial = new THREE.MeshBasicMaterial({color: 0x000000, side: THREE.DoubleSide, transparent:false });
        }
        THREEMesh = new THREE.Mesh(THREEGeometry, THREEMaterial);
        THREEMesh.position.copy(center3D);

        THREEMesh.ORGData = { threeScreenshotTexture : THREEScreenshotTexture }; // keep a reference to make the show/hide of textures

        // Create a group with the plane a boxhelper for highlights. First add the BoxHelper and then the plane, otherwise RayCaster will not give us proper collisions on the plane !!
        THREEUIElementGroup = new THREE.Group();
        THREEUIElementGroup.add(new THREE.BoxHelper(THREEMesh, 0xffffff));
        THREEUIElementGroup.add(THREEMesh);

        return THREEUIElementGroup;
    }

    /**
     * Calculates the Z position for a given UI tree element. This element has nbot been created yet, does not have a THREE object yet.
     * @param uiTreeElement - The element to calculate the Z for.
     * @param uiTreeStartElement - The element from which to start to calculate the Z. In the first iteration would be the parent.
     * @param uiElementWorldBox2 - Box2 of the element in world coordinates (m).
     * @param currentZPosition - Current zPosition in the tree traversal.
     * @param displayPosition - The translation of the display in the 3D scene, usually it's above the floor.
     * @returns {zPosition}
     * @private
     */
    _calculateElementZPosition(uiTreeElement, uiTreeStartElement, uiElementWorldBox2, currentZPosition, displayPosition) {
        if (!uiTreeElement || !uiTreeStartElement) {
            return currentZPosition;
        }

        if (uiTreeElement === uiTreeStartElement) {
            return currentZPosition; // we have arrived to the element itself, no more to search
        }

        let zPosition = currentZPosition;
        const threeObj = uiTreeStartElement.threeObj; // THREE obj of the ui element

        if (threeObj) {
            // This element has been visualized in 3D, because it has threeObj.
            // we have to check if the new element must be in front of this one.

            const objMesh = threeObj.children[0];
            objMesh.geometry.computeBoundingBox();
            let runningElementWorldBox3 = objMesh.geometry.boundingBox; // box at 0,0,0 !
            runningElementWorldBox3.translate(objMesh.position);
            let runningElementWorldBox2 = new THREE.Box2(
                new THREE.Vector2(runningElementWorldBox3.min.x, runningElementWorldBox3.min.y),
                new THREE.Vector2(runningElementWorldBox3.max.x, runningElementWorldBox3.max.y));

            //if (uiElementWorldBox2.intersectsBox(runningElementWorldBox2)) {
            if (this._boxesIntersect(uiElementWorldBox2, runningElementWorldBox2)) {
                const meshZPos = uiTreeStartElement.originalWorldZPosition; // The real position is in the treenode.originalWorldZPosition, not in the threejs mesh, there they are all at z=0 waiting to be animated.
                if (meshZPos >= zPosition) {
                    zPosition = meshZPos + this._planeDistance;
                }
            }
        }

        // Run subviews
        const subElements = uiTreeStartElement.subviews;
        if (subElements) {
            for (let i = 0; i < subElements.length; i++) {
                if (uiTreeElement === subElements[i]) {
                    break; // we have arrived to the element itself, no more to search
                }
                zPosition = this._calculateElementZPosition(uiTreeElement, subElements[i], uiElementWorldBox2, zPosition, displayPosition); // calculate against next level in tree
            }
        }
        return zPosition;
    }

    _collapseNodeAnimatedWithCompletion(node, completionFunction) {
        let threeObj = node.threeObj; // the obj is a THREE.Group
        if (threeObj) {
            const _this = this;
            const tween = new TWEEN.Tween(threeObj.position)
                .to({x: threeObj.position.x, y: threeObj.position.y, z: 0}, kORGExtrudeDuration)
                .onStart(function() {
                    _this._collapseTweenCount++;
                })
                .onComplete(function() {
                    _this._hideNodeGroup(threeObj, true);
                    node.zPosition = 0;

                    if (--_this._collapseTweenCount <= 0) {
                        _this._collapseTweenCount = 0;

                        if (_this._THREEElementTreeGroup) {
                            _this._THREEScene.remove(_this._THREEElementTreeGroup);
                            _this._THREEElementTreeGroup = null;
                        }

                        if (completionFunction) {
                            completionFunction();
                        }
                    }
                })
                .start();
        }

        if (!!node.subviews) {
            const subNodes = node.subviews;
            for (let i = 0; i < subNodes.length; i++) {
                const treeNode = subNodes[i];
                this._collapseNodeAnimatedWithCompletion(treeNode, completionFunction);
            }
        }
    }

    _modelVisualizationChanged() {
        if (this._THREEElementTreeGroup) {
            const _this = this;
            this._THREEElementTreeGroup.traverse(function (child) {
                if (child.type === "Group") {
                    let nodeData = child.userData;
                    if (nodeData) {
                        this._hideNodeGroup(child, _this._mustHideTreeObject(nodeData));
                    }
                }
            });
        }
    }

    //function modelChangeShowHidden(treeJson, showHidden) {
    //
    //    // Show/Hide Hidden objects
    //    for (var i in treeJson) {
    //        if (typeof(treeJson[i])=="object") {
    //            if (treeJson[i].hidden) {
    //                console.log("UI Element hidden: ", treeJson[i]);
    //                var threeObj = treeJson[i].threeObj;
    //                if (threeObj) {
    //                    if (showHidden) {
    //                        threeObj.visible = true;
    //                    } else {
    //                        threeObj.visible = false;
    //                    }
    //                    threeObj.needsUpdate = true;
    //                } else {
    //                    console.log("UI Hidden Element has no THREE OBJ !!");
    //                }
    //            }
    //            modelChangeShowHidden(treeJson[i].subviews, showHidden);
    //        }
    //    }
    //}
    //
    //function modelChangeShowHiddenOnly(treeJson, showHidden, showHiddenOnly) {
    //
    //    // Show/Hide Hidden objects
    //    for (var i in treeJson) {
    //        if (!!treeJson[i]==true && typeof(treeJson[i])=="object") {
    //            var mesh = treeJson[i].threeObj;
    //            if (mesh) {
    //                if (treeJson[i].hidden) {
    //                    if (showHidden || showHiddenOnly) {
    //                        mesh.visible = true;
    //                    } else {
    //                        mesh.visible = false;
    //                    }
    //                    mesh.needsUpdate = true;
    //                } else {
    //                    // Not hidden ui obj
    //                    if (showHiddenOnly) {
    //                        mesh.visible = false;
    //                    } else {
    //                        mesh.visible = true;
    //                    }
    //                    mesh.needsUpdate = true;
    //                }
    //            }
    //            modelChangeShowHiddenOnly(treeJson[i].subviews, showHidden, showHidden);
    //        }
    //    }
    //}

    _changeOpacity(treeJson, opacity) {
        if (!!treeJson) {
            for (let i = 0; i < treeJson.length; i++) {
                const treeNode = treeJson[i];
                if (!!treeNode && typeof(treeNode)==="object") {
                    let mesh = treeNode.threeObj;
                    if (mesh) {
                        //console.log("FOUND OBJECT:",mesh, i);

                        if (treeNode.class == "UITextEffectsWindow") {
                            continue;
                        } else if (treeNode.private === true) {
                            continue;
                        } else {
                            mesh.material.opacity = opacity;
                            mesh.needsUpdate = true;
                        }
                    } else {
                        //console.log("OBJECT nas no three obj !!!!!!!!", treeJson[i], JSON.stringify(treeJson[i]));
                    }
                    this._changeOpacity(treeJson[i].subviews, opacity);
                }
            }
        }
    }

    _mustDrawTreeObjectAsCube(treeJson, inParentTreeObj) {
        // if parent has texture and the object is smaller than parent
        if (inParentTreeObj &&
            (treeJson.bounds.left > inParentTreeObj.bounds.left ||
            treeJson.bounds.top > inParentTreeObj.bounds.top ||
            treeJson.bounds.right < inParentTreeObj.bounds.right ||
            treeJson.bounds.bottom < inParentTreeObj.bounds.bottom)) {
            return true;
        }
        return false;
        //return (treeJson.nativeClass != "UIWindow" &&
        //treeJson.nativeClass != "UILayoutContainerView" &&
        //treeJson.nativeClass != "UITransitionView");
    }


    /**
     * Returns true if the given UI element must be hidden, not displayed in Expanded UI.
     * @param nodeData The UI element info as sent by the device.
     * @returns {boolean}
     */
    _mustHideTreeObject(nodeData) {
        let mustBeHidden = false;
        if (nodeData.hidden && !this._flagShowHiddenViews) {
            mustBeHidden = true;
        } else if (nodeData.hidden===false && this.flagShowHiddenViewsOnly) {
            mustBeHidden = true;
        } else if (this._nodeIsInteractive(nodeData)) {
            mustBeHidden = !this._flagShowInteractiveViews;
        } else {
            mustBeHidden = !this._flagShowNonInteractiveViews;
        }
        return mustBeHidden;
    }

    _mustCreateTreeBranch(nodeData) {
        return !(this._isKeyboardWindow(nodeData) && !this._flagShowKeyboard);
    }


    /**
     * Returns true if the ui element must be created as a 3D object.
     * This is different than '_mustHideTreeObject'. An object can be created but might be set hidden.
     * e.g the visualization flags may require not to visualize the non interactive views, but they still have to be created and shown ans invisible.
     * @param nodeData
     */
    _mustCreateTreeObject (nodeData) {
        if (!this._flagShowPrivate) {
            if (nodeData.private && nodeData.private === true) {
                return false;
            }
        }
        if (!this._flagShowOutOfScreen) {
            if (this._treeObjectIsOutOfScreen(nodeData, deviceScreenSize)) {
                return false;
            }
        }
        if (this._isStatusBarWindow(nodeData)) {
            return false;
        }
        if (this._isNoSizeElement(nodeData)) {
            return false;
        }
        return true;
    }

    _removeScreenshotFromScreen() {
        screenPlane.material.color = 0x000000;
        //screenPlane.material = new THREE.MeshBasicMaterial({color: 0x000000, side: THREE.DoubleSide});
    }

    _rectsIntersect(a, b) {
        return (a.left < b.right && b.left < a.right && a.top > b.bottom && b.top > a.bottom);
    }

    _boxesIntersect(a, b) {
        const precision = 0.0001;
        //return (a.min.x < b.max.x && b.min.x < a.max.x && a.max.y > b.min.y && b.max.y > a.min.y);
        return (((b.max.x - a.min.x) > precision) &&  ((a.max.x - b.min.x) > precision) && ((a.max.y - b.min.y) > precision) && ((b.max.y - a.min.y) > precision));
    }

    _treeObjectIsOutOfScreen(treeJson, deviceScreenSize) {
        return (treeJson.bounds.top > deviceScreenSize.height);
    }

    _nodeIsInteractive(treeNode) {
        if (treeNode.gestures) {
            return true;
        }
        if (treeNode.controlEvents) {
            return true;
        }
        if (treeNode.class === "UITextField" && treeNode.userInteractionEnabled) {
            return true;
        }
        if (treeNode.class === "MKMapView" && treeNode.userInteractionEnabled) {
            return true;
        }
        if (treeNode.class === "_MKUserTrackingButton" && treeNode.userInteractionEnabled) {
            return true;
        }
    }

    _hideNodeGroup(threeNodeGroup, hide) {
        let mesh = threeNodeGroup.children[0]; // the first is the mesh, second is the BoxHelper
        if (mesh) {
            mesh.visible = !hide;
        }
        let boxHelper = threeNodeGroup.children[1];
        if (boxHelper) {
            boxHelper.visible = !hide;
        }
    }

    _isStatusBarWindow(inUIElement) {
        if (inUIElement.nativeClass === "UIAWindow") {
            const child = inUIElement.subviews[0];
            if (child.nativeClass === "UIAStatusBar") {
                return true;
            }
        }
        return false;
    }

    _isKeyboardWindow(nodeData) {
        return (nodeData.class === "UITextEffectsWindow");
    }

    _isNoSizeElement(element) {
        return (element.bounds.right - element.bounds.left === 0) || (element.bounds.bottom - element.bounds.top === 0);
    }

}