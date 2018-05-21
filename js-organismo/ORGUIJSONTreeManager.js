/**
 * Created by jongabilondo on 02/12/2017.
 */

class ORGUIJSONTreeManager {

    constructor(placeholder, nodePlaceholder) {
        this._treePlaceholder = placeholder;
        this._nodePlaceholder = nodePlaceholder;
        this._treeAdaptor = null;
        this._treeType = null;
    }

    update(jsonTree, treeType) {
        if (treeType === undefined) {
            console.debug('Tree update requested but type undefined.');
            return;
        }

        this._treeType = treeType;
        switch (treeType) {
            case ORGUIJSONTreeManager.TREE_TYPE_WDA : {
                this._treeAdaptor =  ORGUIJSONWDATreeAdaptor;
            } break;
            case ORGUIJSONTreeManager.TREE_TYPE_ORGANISMO : {
                this._treeAdaptor = ORGUIJSONOrganismoTreeAdaptor;
            } break;
            default : {
                return;
            }
        }

        if (jsonTree == null) {
            this.remove();
            return;
        }

        let adaptedTree = this._treeAdaptor.adaptTree(jsonTree);
        let _this = this;
        $(this._treePlaceholder).treeview({
            data: adaptedTree,
            levels: 15,
            showBorder:false,
            expandIcon:'glyphicon glyphicon-triangle-right',
            collapseIcon:'glyphicon glyphicon-triangle-bottom',
            onNodeSelected: (event, node) => { _this._nodeSelected(event, node);},
            onNodeEnter: (event, node) => { _this._nodeEnter(event, node);},
            onNodeLeave: (event, node) => { _this._nodeLeave(event, node);},
            onNodeContextMenu: (event, node) => { _this._nodeContextMenu(event, node);}
        } );
    }

    remove() {
        $(this._treePlaceholder).treeview('remove');
        $(this._nodePlaceholder).html("");
    }

    nodeParent(node) {
        let parents = $(this._treePlaceholder).treeview('getParents', [node]);
        return (parents.length ?parents[0] :null);
    }

    nodeSiblings(node) {
        let siblings = $(this._treePlaceholder).treeview('getSiblings', node);
        return siblings;
    }

    tree() {
        return $(this._treePlaceholder).treeview('getTree');
    }

    rootNodes() {
        return $(this._treePlaceholder).treeview('getRootNodes');
    }

    showClassHierarchy(classHierarchy) {
        var html = "<h4><b>" + "Hierarchy" + "</b></h4>";

        for (let className of classHierarchy) {
            html += '<div style="text-align: center;"><h4><span class="label label-primary text-center">' + className + '</span></h4></div>';
        }
        $(this._nodePlaceholder).html(html);
    }

    _nodeSelected(event, node) {
        const nodeHTMLData = this._treeAdaptor.nodeToHTML(node.representedNode);
        ORG.dispatcher.dispatch({
            actionType: 'uitree-node-selected',
            node:node.representedNode,
            html:nodeHTMLData
        });
    }

    _nodeEnter(event, node) {
        var node3DElement = null;

        if (node  && !node.representedNode) {
            console.debug("The mouseover tree node has no data !");
            return;
        }

        switch (this._treeType) {
            case ORGUIJSONTreeManager.TREE_TYPE_WDA : {
                node3DElement = new ORG3DWDAUIElement(node.representedNode);
            } break;
            case ORGUIJSONTreeManager.TREE_TYPE_ORGANISMO : {
                node3DElement = new ORG3DORGUIElement(node.representedNode);
            } break;
            default : {
                return;
            }
        }

        ORG.dispatcher.dispatch({
            actionType: 'uitree-node-enter',
            node:node3DElement
        });
    }

    _nodeLeave(event, node) {
        ORG.dispatcher.dispatch({
            actionType: 'uitree-node-leave'
        });
    }

    _nodeContextMenu(event, node) {
        //event.clientX = node.clientX;
        //event.clientY = node.clientY;
        ORG.UIJSONTreeContextMenuManager.onContextMenu(event, node);
        //$('#content-wrapper').contextMenu({x:event.clientX, y:event.clientY});
    }
}

ORGUIJSONTreeManager.TREE_TYPE_WDA = 0;
ORGUIJSONTreeManager.TREE_TYPE_ORGANISMO = 1;
