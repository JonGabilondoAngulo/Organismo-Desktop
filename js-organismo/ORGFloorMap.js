/**
 * Created by jongabilondo on 04/10/2016.
 */

/**
 * This was a tryout to display a google map in the floor of the 3D scene.
 * The combination of CSS3DRenderer with a WebGLRenderer is not fully integrated.
 * They both work separately, WebGLRenderer has to be marked as transparent to be able to see the CSS3DRenderer scene.
 * The original attempt was to set the map as a texture into the floor mesh, but it's not possible to get the map image from an 'offscreen' buffer.
 * A google map can't be displayed on a canvas in order to create a texture from it. Therefore the tryout here is to use the CSS3DRenderer which can
 * display a iframe, in which the map has been created.
 * There is a good thing about CSS3DRenderer and an iFrame, it's possible to create a google map in a 3D scene and even to control it, zoom, pan.
 * But it is not useful for Organismo. It needs a better integration into a WebGLRenderer renderer.
 * There is some interesting code in https://www.npmjs.com/package/iframe2image which it might create an image from an iframe (?). Could it generate an
 * image from the google map and use it as a texture into the WebGLRenderer ?.
 * @param floorMesh
 * @param rendererGL
 * @param camera
 * @param canvasDomElement
 * @constructor
 */
function ORGFloorMap(floorMesh, rendererGL, camera, canvasDomElement) {

    var _threeCamera = camera;
    var _cssScene = null;

    _cssScene = new THREE.Scene();

    // create the iframe to contain webpage
    var element	= document.createElement('iframe')
    element.src	= "simple-map.html";
    var elementWidth = 2000; // pixels
    var aspectRatio = 1.0;//planeHeight / planeWidth;
    var elementHeight = elementWidth * aspectRatio;
    element.style.width  = elementWidth + "px";
    element.style.height = elementHeight + "px";

    // create a CSS3DObject to display element
    var cssObject = new THREE.CSS3DObject( element );
    // synchronize cssObject position/rotation with planeMesh position/rotation
    cssObject.position.x = floorMesh.position.x;
    cssObject.position.y = floorMesh.position.y;
    cssObject.position.z = floorMesh.position.z;
    cssObject.rotation.x = -Math.PI / 2;
    cssObject.rotation.y = floorMesh.rotation.y;
    cssObject.rotation.z = floorMesh.rotation.z;
    // resize cssObject to same size as floorMesh
    cssObject.scale.x = 2;//= (1 + percentBorder) * (elementWidth / 2000);
    cssObject.scale.y = 2;//= (1 + percentBorder) * (elementWidth / 2000);
    _cssScene.add(cssObject);

    // create a renderer for CSS
    var rendererCSS	= new THREE.CSS3DRenderer();
    rendererCSS.setSize( rendererGL.getSize().width, rendererGL.getSize().height);
    rendererCSS.domElement.style.position = 'absolute';
    rendererCSS.domElement.style.top = 0;
    rendererCSS.domElement.style.margin = 0;
    rendererCSS.domElement.style.padding = 0;
    rendererCSS.domElement.style.zIndex = 0;

    canvasDomElement.appendChild(rendererCSS.domElement);
    rendererCSS.domElement.appendChild(rendererGL.domElement);
    //renderer.domElement.appendChild(rendererCSS.domElement);

    // when window resizes, also resize this renderer
    THREEx.WindowResize(rendererCSS, _threeCamera, canvasDomElement);

    //renderer.domElement.style.position = 'absolute';
    //renderer.domElement.style.top      = 0;
    // make sure original renderer appears on top of CSS renderer
    //renderer.domElement.style.zIndex   = 1;
    //rendererCSS.domElement.appendChild( renderer.domElement );

    this.render = function() {
        rendererCSS.render(_cssScene, _threeCamera);
    }

}
