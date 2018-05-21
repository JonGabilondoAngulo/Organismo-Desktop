/**
 * Created by jongabilondo on 6/21/15.
 */

/**
 * Class to detect the THREE object of the expanded UI tree the mouse is on.
 * It calls its delegates to inform the THREE obj the mouse is onto.
 * If the mouse is not over any obj it passes a null.
 * The Delegate must implement mouseOverElement.
 *
 * This class itself it's a delegate for ORGMouseListener.
 * It implements onMouseDown, onMouseUp, onMouseMove to receive the mouse events from ORGMouseListener.
 * @constructor
 */
class ORG3DUITreeRaycaster {

    constructor( rendererDomElement, THREECamera, THREETargetObject ) {
        this._raycaster = new THREE.Raycaster();
        this._raycaster.linePrecision = 0.0001;
        this._rcmouse = new THREE.Vector2();
        this._THREETargetObject = THREETargetObject; // The threejs object to raycast on.
        this._THREECamera = THREECamera;
        this._rendererDomElement = rendererDomElement;
        this._listeners = [];
        this._hilitedObj = null;
        this._isMouseDown = false; // It will help us to ignore the mouse moves while mouse down.
        this._enabled = true;
    }

    addDelegate( delegate ) {
        this._listeners.push( delegate );
    }

    removeDelegate( delegate ) {
        for (let i=0; i<this._listeners.length; i++) {
            if ( this._listeners[i] === delegate) {
                this._listeners.splice( i, 1);
                break;
            }
        }
    }

    // ORGMouseListener DELEGATE METHODS

    /**
     * ORGMouseListener informs of event
     * @param event
     */
    onMouseDown(event) {
        this._isMouseDown = true;
    }

    /**
     * ORGMouseListener informs of event
     * @param event
     */
    onMouseUp( event ) {
        this._isMouseDown = false;
    }

    /**
     * ORGMouseListener informs of event
     * @param event
     */
    onMouseMove( event ) {

        if ( this._isMouseDown ) {
            return;
        }
        if ( !this._THREETargetObject ) {
            return;
        }
        const canvasW = $(this._rendererDomElement).width();
        const canvasH = $(this._rendererDomElement).height();
        const canvasOffset = $(this._rendererDomElement).offset();

        // calculate mouse position in normalized device coordinates. (-1 to +1) for both components
        this._rcmouse.x = ( (event.clientX - canvasOffset.left) / canvasW ) * 2 - 1;
        this._rcmouse.y = - ( (event.clientY - canvasOffset.top) / canvasH ) * 2 + 1;

        this._raycaster.setFromCamera( this._rcmouse, this._THREECamera );
        var intersects = this._raycaster.intersectObject( this._THREETargetObject, true /*recursive*/ ); // returns always an array. The first one is the closest object.

        var elementToHilite = null;
        var intersectionPoint = null;
        if ( intersects && intersects.length ) {
            elementToHilite = intersects[0].object;
            intersectionPoint = intersects[0].point;

            // Make sure the object is the uiobj plane and not the edges helper
            if ( elementToHilite.type === "LineSegments" /*BoxHelper*/) {
                const parent = elementToHilite.parent; // parent must be a group, holds edgesHelper and the uiobject plane
                elementToHilite = null;
                if ( parent ) {
                    for ( let child of parent.children ) {
                        if ( child.type === "Mesh" ) {
                            elementToHilite = child;
                            break;
                        }
                    }
                }
            }
        }

        // Inform delegates about the intersected element, null is sent as well.
        for ( let i=0; i<this._listeners.length; i++ ) {
            if (this._listeners[i].mouseOverElement) {
                this._listeners[i].mouseOverElement( elementToHilite, intersectionPoint );
            }
        }
    }
}
