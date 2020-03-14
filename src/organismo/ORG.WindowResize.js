// This helper makes it easy to handle window resize.
// It will update renderer and camera when window is resized.

module.exports	= function(renderer, camera, canvas, contentPanel, leftPanel, rightPanel) {

	let onResizeCallback	= function() {

		// Canvas
		//const rect = canvas.getBoundingClientRect();
		let rect = leftPanel.getBoundingClientRect();

		//console.log("canvas rect:" + JSON.stringify(rect))
		//console.log("Left rect:" + JSON.stringify(ORG.leftSection.getBoundingClientRect()))

		const canvasTopOffset = rect.top;
		const canvasBottomOffset = 0;
		const canvasHeight = window.innerHeight - canvasTopOffset - canvasBottomOffset;
		//const gutterWidth = 10;

		leftPanel.style.height = canvasHeight  + 'px';

		rect = leftPanel.getBoundingClientRect();

		// Right Panel
        //const contentRect = contentPanel.getBoundingClientRect();
        //const leftPanelRect = leftPanel.getBoundingClientRect();
        //const rightPanelWidth = contentRect.width - leftPanelRect.width - gutterWidth;
        //rightPanel.style.width = rightPanelWidth + 'px';

        // Renderer & Camera
        //console.log("canvas.offsetWidth:" + canvas.offsetWidth)
        renderer.setSize( rect.width, rect.height);
        camera.aspect = rect.width / rect.height;
		camera.updateProjectionMatrix();

		// UI Tree
        document.getElementById('ui-json-tree').style.height = canvasHeight-115 + 'px';
        document.getElementById('ui-json-tree-node').style.height = canvasHeight-60 + 'px';
	}

	// bind the resize event
	window.addEventListener('resize', onResizeCallback, false);

	return {
        resize	: function(){
			onResizeCallback();
        },
        stop	: function(){
            window.removeEventListener('resize', onResizeCallback);
        }
	}
}
