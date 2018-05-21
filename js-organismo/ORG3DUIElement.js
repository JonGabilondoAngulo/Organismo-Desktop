/**
 * Created by jongabilondo on 19/01/2018.
 */


/***
 * A wrapper base class to a UI tree element. Gives a 3D context functionalities to a UI tree element node.
 * Do not instance this class, use subclasses.
 */
class ORG3DUIElement {

    /***
     *
     * @param elementNode. The JSON object describing the UI element, the one in the UI tree. Could be WDA/Org...
     */
    constructor(elementNode) {
        this._element = elementNode;
    }

    get elementJSON() {
        return this._element;
    }

    get bounds() {
        throw new Error("Subclasses must override this method.");
    }

    get hasSize() {
        throw new Error("Subclasses must override this method.");
    }

    /***
     * Calculates the Box2 of the element in the given device screen.
     * @param device. The ORGDevice of the connected device.
     * @param deviceScreen. ORG3DDeviceScreen.
     * @return THREE.Box2 with the bounds of the element in the screen.
     */
    getBoundsInDeviceScreen(device, deviceScreen) {
        const deviceDisplaySize = device.displaySizeWithOrientation;
        const deviceDisplayScale = device.displayScale;
        const deviceScreenSize = device.screenSizeWithOrientation; // In points
        const screenPlanePosition = deviceScreen.screenWorldPosition; // in world coordinates
        const elementBounds = this.bounds; // In points

        // Attention. In iOS the 0,0 is at top left of screen

        var elementBox2 = new THREE.Box2(
            new THREE.Vector2( elementBounds.left * deviceDisplayScale.x, (deviceScreenSize.height - elementBounds.bottom) * deviceDisplayScale.y),
            new THREE.Vector2( elementBounds.right * deviceDisplayScale.x, (deviceScreenSize.height - elementBounds.top) * deviceDisplayScale.y));
        elementBox2.translate( new THREE.Vector2( - ( deviceDisplaySize.width / 2.0 ), - ( deviceDisplaySize.height / 2.0 ))); // translate relative to center 0,0
        elementBox2.translate( new THREE.Vector2( screenPlanePosition.x , screenPlanePosition.y )); // translate to device location

        return elementBox2;
    }

}