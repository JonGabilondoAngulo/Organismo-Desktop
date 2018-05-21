// This helper makes it easy to handle window resize.
// It will update renderer and camera when window is resized.
//

ORG.WindowResize	= function(renderer, camera, canvas, contentPanel, leftPanel, rightPanel) {

	let callback	= function() {

		// Canvas
        const rect = canvas.getBoundingClientRect();
		const canvasTopOffset = rect.top;
		const canvasBottomOffset = 6;
		const canvasHeight = window.innerHeight - canvasTopOffset - canvasBottomOffset;
        canvas.style.height = canvasHeight  + 'px'; //otherwise the canvas is not adapting to the renderer area

		// Right Panel
        const contentRect = contentPanel.getBoundingClientRect();
        const leftPanelRect = leftPanel.getBoundingClientRect();
        const rightPanelWidth = contentRect.width - leftPanelRect.width - 20;
        rightPanel.style.width = rightPanelWidth + 'px';

        //// Renderer & Camera
        renderer.setSize( canvas.offsetWidth, canvasHeight);
        camera.aspect = canvas.offsetWidth / canvasHeight;
		camera.updateProjectionMatrix();

		// UI Tree
        document.getElementById('ui-json-tree').style.height = canvasHeight-115 + 'px';
        document.getElementById('ui-json-tree-node').style.height = canvasHeight-60 + 'px';
	}

	//callback(); // ugly to provoke resize now

	// bind the resize event
	window.addEventListener('resize', callback, false);

	// return .stop() the function to stop watching window resize
	return {
        resize	: function(){
            callback();
        }
        //stop	: function(){
        //    window.removeEventListener('resize', callback);
        //}
	};
}
