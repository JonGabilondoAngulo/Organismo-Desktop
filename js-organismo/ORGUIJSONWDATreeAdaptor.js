/**
 * Created by jongabilondo on 23/01/2018.
 */


/***
 * Functions to adapt a WDA JSON tree to a patternfly-bootstrap-treeview.
 */
class ORGUIJSONWDATreeAdaptor {

    static adaptTree(jsonTree) {
        var newTree = [];
        if (!jsonTree) {
            return null;
        }
        for (let node of jsonTree) {
            var newNode = { representedNode:node};
            newTree.push(newNode);
            newNode.nodes = node.children;

            // Compose text for node
            newNode.text = node.type;
            if (node.label) {
                newNode.text += " - " + node.label;
            } else if (node.name) {
                newNode.text += " - " + node.name;
            } else if (node.value) {
                newNode.value += " - " + node.value;
            }

            // hidden icon
            if (node.isVisible == "0") {
                newNode.icon = 'glyphicon glyphicon-eye-close';
            }

            // subnodes
            var subTree = this.adaptTree(node.children);
            if (subTree) {
                newNode.nodes = subTree;
            }
        }
        return newTree;
    }

    static nodeToHTML(node) {
        var description = "";

        const className = node.type;
        if (className) {
            description += "<h4><b>" + className + "</b></h4>";
        }

        for (let key in node) {
            if (this.ignoreNodeKey(key)) {
                continue;
            }
            if (key == "rect") {
                description += "<b>" + key + "</b>:&nbsp" + JSON.stringify(node.rect) + "<br>";
            } else {
                description += "<b>" + key + "</b>:&nbsp" + node[key] + "<br>";
            }
        }
        description += "<br>";

        return description;
    }

    static ignoreNodeKey(key) {
        return (key == "text" || key == "state" || key == "children" || key == "nodes" || key == "$el" || key == "screenshot" || key == "nodeId" || key == "parentId");
    }
}