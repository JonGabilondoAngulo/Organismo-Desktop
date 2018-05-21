/**
 * Created by jongabilondo on 01/08/2016.
 */

/**
 * A helper class to highlight the edges of the 3d UI elements when the UI is expanded.
 * When attached to a Raycaster as a delegate it will start to receive the "mouseOverElement" call and it will produce the highlight visual effect.
 * It implements the ORGRayscaster delegate method "mouseOverElement".
 * It is based in the usage of the THREE.BoxHelper object that is grouped with the 3D UI object.
 */
class ORG3DUIElementHighlight {

    constructor() {
        this._hilitedObj = null;
    }

    /**
     * Implementation of the Raycaster method to receive the UI element the mouse in on.
     * This method will manage the show and hide the highlights of the 3d objects.
     * @param THREEElement
     */
    mouseOverElement( THREEElement ) {
        if ( !!THREEElement ) {
            // Mouse is over some UI element

            let mustHilite = false;
            if ( !this._hilitedObj) {
                mustHilite = true;
            } else if ( this._hilitedObj.id !== THREEElement.id ) {
                this._highlightUIElement( this._hilitedObj, false);
                mustHilite = true;
            }

            if ( mustHilite ) {
                this._highlightUIElement( THREEElement, true);
            }

        } else  {
            // Mouse is NOT over any UI element
            if (this._hilitedObj) {
                this._highlightUIElement( this._hilitedObj, false);
            }
        }
    }


    /**
     * Private function to highlight a 3D object.
     * The highlight is performed using the THREE.BoxHelper which is the sibling of the 3D UI object. To access the BoxHelper we need to go the parent (which is a Group) and descend.
     * @param THREEElement
     * @param hilite
     */
    _highlightUIElement( THREEElement, hilite) {
        if ( !!THREEElement ) {
            let boxHelper = null;
            if (THREEElement.type === "Group") {
                boxHelper = THREEElement.children[0];
            } else if ( THREEElement.geometry.type === "PlaneBufferGeometry" || THREEElement.geometry.type === "BoxGeometry" ) {
                const parent = THREEElement.parent; // parent must be a group, holds edgesHelper and the uiobject plane
                if ( parent ) {
                    boxHelper = parent.children[0];
                }
            }
            if ( boxHelper instanceof THREE.BoxHelper ) {
                boxHelper.material.color.set( (hilite ?0xff0000 :0xffffff) );
                boxHelper.material.linewidth = (hilite ?10 :1);
                boxHelper.material.needsUpdate = true;
                this._hilitedObj = (hilite ?THREEElement :null); // keep the hilited obj
            }
        }
    }
}