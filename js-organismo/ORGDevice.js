/**
 * Created by jongabilondo on 11/12/2016.
 */


/**
 * Class that represents a connected device. Holds device's basic information.
 */
class ORGDevice {

    constructor( deviceInfo ) {
        this.name = deviceInfo.name;
        this.model = deviceInfo.model;
        this.systemVersion = deviceInfo.systemVersion;
        this.productName = deviceInfo.productName;
        this.screenSize = deviceInfo.screenSize;
        this._orientation = deviceInfo.orientation;
        this._bodySize = this._bodySizeOfModel();
        this._displaySize = this._displaySizeOfModel();
    }

    static screenSizeInPortrait(size) {
        if (size.width > size.height) {
            return {width: size.height, height: size.width};
        } else {
            return size;
        }
    }

    set orientation(orientation) {
        this._orientation = orientation;
    }
    get orientation() {
        return this._orientation;
    }
    get isLikeiPhone5() {
        return this.productName.startsWith('iPhone 5');
    }
    get isLikeiPhone6() {
        return this.productName == 'iPhone 6' || this.productName == 'iPhone 7' || this.productName == 'iPhone 8';
    }
    get isLikeiPhone6Plus() {
        return this.productName == 'iPhone 6+' || this.productName == 'iPhone 7+' || this.productName == 'iPhone 8+';
    }
    get isLikeiPhoneX() {
        return this.productName == 'iPhone X';
    }

    /**
     * Get device physical size. Gets the values from ORG.DeviceMetrics global.
     * @returns {{width: *, height: *}} in meters.
     */
    get bodySize() {
        return Object.assign({}, this._bodySize);
    }

    /***
     * Returns the size considering the orientation. If landascape, it will swap the portrait mode width and height.
     * @returns {size}
     */
    get screenSizeWithOrientation() {
        var screenSize = Object.assign({}, this.screenSize);
        switch (this._orientation) {
            case ORGDevice.ORIENTATION_LANDSCAPE_LEFT:
            case ORGDevice.ORIENTATION_LANDSCAPE_RIGHT: {
                screenSize = { width: screenSize.height, height: screenSize.width};
            } break;
        }
        return screenSize;
    }

    /***
     * Return the rotation in Z axis for the current orientation.
     * @returns {number}
     */
    get orientationRotation() {
        var rotation = 0;
        switch (this._orientation) {
            case ORGDevice.ORIENTATION_PORTRAIT: {
            } break;
            case ORGDevice.ORIENTATION_PORTRAIT_UPSIDE_DOWN: {
                rotation = THREE.Math.degToRad(180);
            } break;
            case ORGDevice.ORIENTATION_LANDSCAPE_RIGHT: {
                rotation = THREE.Math.degToRad(-90);
            } break;
            case ORGDevice.ORIENTATION_LANDSCAPE_LEFT:
                rotation = THREE.Math.degToRad(90);
            break;
        }
        return rotation;
    }


    /**
     * Get displays' physical size. Gets the values from ORG.DeviceMetrics global.
     * @returns {{width, height}|*} in meters.
     */
    get displaySize() {
        return Object.assign({}, this._displaySize);
    }

    /***
     * Returns the size considering the orientation. If landascape, it will swap the portrait mode width and height.
     * @returns {size}
     */
    get displaySizeWithOrientation() {
        var displaySize = Object.assign({}, this._displaySize);
        switch (this._orientation) {
            case ORGDevice.ORIENTATION_LANDSCAPE_LEFT:
            case ORGDevice.ORIENTATION_LANDSCAPE_RIGHT: {
                displaySize = { width: displaySize.height, height: displaySize.width};
            } break;
        }
        return displaySize;
    }

    /**
     * Scale from screen points to real device units. Considers orientation.
     * @returns {{x: number, y: number}}
     */
    get displayScale() {
        const displaySize = this.displaySizeWithOrientation;
        const screenSize = this.screenSizeWithOrientation;
        return {x:displaySize.width/screenSize.width, y:displaySize.height/screenSize.height};
    }

    // PRIVATE

    _bodySizeOfModel() {
        var body = null;
        if (this.isLikeiPhone5) {
            body = ORG.DeviceMetrics.iPhone5.Body;
        } else if (this.isLikeiPhone6) {
            body = ORG.DeviceMetrics.iPhone6.Body;
        } else if (this.isLikeiPhone6Plus) {
            body = ORG.DeviceMetrics.iPhone6Plus.Body;
        } else if (this.isLikeiPhoneX) {
            body = ORG.DeviceMetrics.iPhoneX.Body;
        } else {
            body = ORG.DeviceMetrics.iPhone6.Body;
        }
        return {"width": math.unit( body.W ).toNumber('m'), "height": math.unit( body.H ).toNumber('m')};
    }

    _displaySizeOfModel() {
        var display = null;
        if (this.isLikeiPhone5) {
            display = ORG.DeviceMetrics.iPhone5.Display;
        } else if (this.isLikeiPhone6) {
            display = ORG.DeviceMetrics.iPhone6.Display;
        } else if (this.isLikeiPhone6Plus) {
            display = ORG.DeviceMetrics.iPhone6Plus.Display;
        } else if (this.isLikeiPhoneX) {
            display = ORG.DeviceMetrics.iPhoneX.Display;
        } else {
            display = ORG.DeviceMetrics.iPhone6.Display;
        }
        return this._calculateDisplaySize( math.unit( display.Diagonal).toNumber('m'), display.Ratio );
    }

    _calculateDisplaySize( diagonal, ratio ) {
        const w = Math.sqrt( Math.pow( diagonal, 2) / (1.0 +  Math.pow( ratio, 2)));
        const h = w * ratio;
        return { width:w, height:h };
    }
}

ORGDevice.ORIENTATION_PORTRAIT = "portrait";
ORGDevice.ORIENTATION_LANDSCAPE_LEFT = "landscape-left";
ORGDevice.ORIENTATION_LANDSCAPE_RIGHT = "landscape-right";
ORGDevice.ORIENTATION_PORTRAIT_UPSIDE_DOWN = "upside-down";
ORGDevice.ORIENTATION_FACE_UP = "face-up";
ORGDevice.ORIENTATION_FACE_DOWN = "face-down";
