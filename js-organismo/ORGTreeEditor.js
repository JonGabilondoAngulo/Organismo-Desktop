/**
 * Created by jongabilondo on 16/10/2015.
 */

var jse_container = document.getElementById('json-editor');

var jse_options = {
    mode: 'view', sortObjectKeys:true, search:false,
    expandCollapse:false,
    fieldsSorter:sortTreeNodes,
    nodeFormatter:formatNode
};

var jse_json = { screenshot: "1234567890", other:"hello", class:"UIWindow" ,
    "subviews" : [{screenshot: "1234567890", other:"hello2", class:"UIView" }, {screenshot: "1234567890", other:"hello3", class:"UIButton" }]};

ORG.treeEditor = new JSONEditor(jse_container, jse_options, jse_json);

function sortTreeNodes(nodes) {
    let sortedNodes = [];
    for (let i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        var nodeField = node.getField();
        if (nodeField === "class") {
            sortedNodes.unshift(node);
        } else {
            sortedNodes.push(node);
        }
    }
    return sortedNodes;
}

function formatNode( node ) {

    var fieldName = node.getField();
    if (fieldName === "screenshot") {
        return null;
        //var screenshotBytes = node.getValue();
        //if (screenshotBytes) {
        //    node.setValue( screenshotBytes.length + " Bytes" );
        //}
    } else if (fieldName === "ignore") {
        return null;
    } else if (fieldName === undefined) {

    }

    if (node.type === 'object') {
        // show only the class name
        if (node.dom.value && node.dom.field) {
            for (let i=0 ; i < node.childs.length; i++) {
                let child = node.childs[i];
                if (child.field === "class") {
                    node.dom.value.innerHTML = '';
                    node.dom.field.innerHTML = child.value;
                    break;
                }
            }
        }
    } else if (node.type === 'array') {
        if (node.dom.value) {
            node.dom.value.innerHTML = '';
        }
    }
    return node;
}