/**
 * Created by jongabilondo on 23/01/2018.
 */


/***
 * Functions to adapt an Organismo UI tree to a patternfly-bootstrap-treeview.
 */
class ORGUIJSONOrganismoTreeAdaptor {

    static adaptTree(jsonTree) {
        var newTree = [];
        if (!jsonTree) {
            return null;
        }
        for (let node of jsonTree) {
            var newNode = { representedNode:node};
            newTree.push(newNode);
            newNode.nodes = node.subviews;

            // Compose text for node
            newNode.text = node.class;
            if (node.accessibilityLabel) {
                newNode.text += " - " + node.accessibilityLabel;
            } else if (node.currentTitle) {
                newNode.text += " - " + node.currentTitle;
            } else if (node.text) {
                newNode.text += " - " + node.text;
            }

            // hidden icon
            if (node.hidden) {
                newNode.icon = 'glyphicon glyphicon-eye-close';
            }

            // subnodes
            var subTree = this.adaptTree(node.subviews);
            if (subTree) {
                newNode.nodes = subTree;
            }
        }
        return newTree;
    }

    static nodeToHTML(node) {
        var description = "";

        const className = node.class;
        if (className) {
            description += "<h4><b>" + className + "</b></h4>";
        }

        for (let key in node) {
            if (this.ignoreNodeKey(key)) {
                continue;
            }
            if (key == "bounds") {
                description += "<b>" + key + "</b>:&nbsp" + JSON.stringify(node.bounds) + "<br>";
            } else {
                description += "<b>" + key + "</b>:&nbsp" + node[key] + "<br>";
            }
        }
        description += "<br>";

        return description;
    }

    static ignoreNodeKey(key) {
        return (key == "text" || key == "state" || key == "subviews" || key == "nodes" || key == "$el" || key == "screenshot" || key == "nodeId" || key == "parentId");
    }

}