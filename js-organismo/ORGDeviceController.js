/**
 * Created by jongabilondo on 26/02/2017.
 */

/**
 * Class to perform the communication with an external device using the Organismo protocol.
 * It performs the Organismo commands on a mobile device.
 * It uses websockets (ORGWebSocket).
 */
class ORGDeviceController extends ORGWebSocketDeviceController {

    constructor(ip, port, delegate) {
        super(ip, port, delegate);
        this._webSocket = null; // For async await calls
        this._secondWebSocket = null; // For async non await calls. Delegate processes responses.
    }

    get type() {
        return "ORG";
    }

    get hasContinuousUpdate() {
        return true;
    }

    get hasOrientationUpdate() {
        return true;
    }

    get hasLocationUpdate() {
        return true;
    }

    get hasSystemInfo() {
        return true;
    }

    get isConnected() {
        if (!this._webSocket || !this._webSocket.isConnected) {
            return false
        }
        if (!this._secondWebSocket || !this._secondWebSocket.isConnected) {
            return false
        }
        return true
    }

    openSession() {
        return new Promise( async (resolve, reject) => {
            try {
                this._webSocket = await this._openMainSocket()
                this._secondWebSocket = await this._openSecondSocket()
                resolve()
            } catch (err) {
                reject(err)
            }
        })
    }

    closeSession() {
        if (this._webSocket) {
            this._webSocket.close()
        }
        if (this._secondWebSocket) {
            this._secondWebSocket.close()
        }
    }

    // SECOND SOCKET MESSAGES
    requestScreenshot() {
        this._secondWebSocket.send(ORGMessageBuilder.takeScreenshot())
    }

    requestOrientationUpdates(enable) {
        this._secondWebSocket.send(ORGMessageBuilder.requestOrientationUpdates(enable))
    }

    requestLocationUpdates(enable) {
        this._secondWebSocket.send(ORGMessageBuilder.requestLocationUpdates(enable))
    }

    requestSystemInfo() {
        this._secondWebSocket.send(ORGMessageBuilder.systemInfo( ))
    }

    sendLocationUpdate(lat, lng) {
        this._secondWebSocket.send(ORGMessageBuilder.locationUpdate( new google.maps.LatLng(lat, lng), null))
    }

    sendDeviceAttitudeUpdate(msg) {
        this._secondWebSocket.send(msg)
    }

    // ASYNC MAIN SOCKET CALLS
    getDeviceOrientation() {
        return new Promise(async (resolve, reject) => {
            resolve(ORG.device.orientation)
        })
    }

    getDeviceInformation() {
        return new Promise( async (resolve, reject) => {
            try {
                let response = await this._webSocket.sendAsync(ORGMessageBuilder.deviceInfo());
                const device = new ORGDevice(this._convertDeviceInfo(response.data));
                resolve(device);
            } catch (err) {
                reject(err)
            }
        })
    }

    getAppInformation() {
        return new Promise( async (resolve, reject) => {
            try {
                let response = await this._webSocket.sendAsync(ORGMessageBuilder.appInfo());
                const appInfo = new ORGTestApp(response.data);
                resolve(appInfo);
            } catch (err) {
                reject(err)
            }
        })
    }

    getScreenshot() {
        return new Promise( async (resolve, reject) => {
            try {
                let response = await this._webSocket.sendAsync(ORGMessageBuilder.takeScreenshot());
                let base64Img = response.data.screenshot;
                if (base64Img) {
                    let img = new Image();
                    img.src = "data:image/jpg;base64," + base64Img;
                    img.onload = () => {
                        resolve(img);
                    }
                } else {
                    reject("Missing image in screenshot.");
                }
            } catch (err) {
                reject(err)
            }
        })
    }

    getElementTree(parameters) {
        return new Promise(async (resolve, reject) => {
            try {
                let response = await this._webSocket.sendAsync(ORGMessageBuilder.elementTree(parameters))
                resolve(response.data)
            } catch (err) {
                reject(err)
            }
        })
    }

    getClassHierarchy(className) {
        return new Promise(async (resolve, reject) => {
            try {
                let response = await this._webSocket.sendAsync(ORGMessageBuilder.classHierarchy(className))
                resolve(response)
            } catch (err) {
                reject(err)
            }
        })
    }

    send(message) {
        this._webSocket.send(message);
    }

    convertInterfaceOrientation(iOSOrientation) {
        let orientation
        switch(iOSOrientation) {
            case "UIInterfaceOrientationPortrait": orientation = ORGDevice.ORIENTATION_PORTRAIT; break;
            case "UIInterfaceOrientationPortraitUpsideDown": orientation = ORGDevice.ORIENTATION_PORTRAIT_UPSIDE_DOWN; break;
            case "UIInterfaceOrientationLandscapeRight": orientation = ORGDevice.ORIENTATION_LANDSCAPE_RIGHT; break;
            case "UIInterfaceOrientationLandscapeLeft": orientation = ORGDevice.ORIENTATION_LANDSCAPE_LEFT; break;
            case "UIInterfaceOrientationFaceUp": orientation = ORGDevice.ORIENTATION_FACE_UP; break;
            case "UIInterfaceOrientationFaceDown": orientation = ORGDevice.ORIENTATION_FACE_DOWN; break;
        }
        return orientation;
    }

    _openMainSocket() {
        return new Promise( async (resolve, reject) => {
            try {
                this._webSocket = new ORGWebSocket();
                const url = "ws://" + this.IPandPort + "/main";
                let openResult = await this._webSocket.open(url);
                if (!!openResult) {
                    resolve(this._webSocket)
                } else {
                    reject()
                }
            } catch (err) {
                reject(err)
            }
        })
    }

    _openSecondSocket() {
        return new Promise( async (resolve, reject) => {
            try {
                this._secondWebSocket = new ORGWebSocket();
                const url = "ws://" + this.IPandPort + "/second";
                let openResult = await this._secondWebSocket.open(url, this.webSocketDelegate); // Process messages in delegate. Do not use async calls with "await". Not used in a REST async style.
                if (!!openResult) {
                    resolve(this._secondWebSocket)
                } else {
                    reject()
                }
            } catch (err) {
                reject(err)
            }
        })
    }

    _convertDeviceInfo(data) {
        let deviceInfo = {}
        deviceInfo.name = data.name;
        deviceInfo.model = data.model;
        deviceInfo.systemVersion = data.systemVersion;
        deviceInfo.productName = data.productName;
        deviceInfo.screenSize = data.screenSize;
        deviceInfo.orientation = this._convertOrientation(data.orientation);
        return deviceInfo;
    }

    _convertOrientation(iOSOrientation) {
        let orientation
        switch(iOSOrientation) {
            case "UIDeviceOrientationPortrait": orientation = ORGDevice.ORIENTATION_PORTRAIT; break;
            case "UIDeviceOrientationPortraitUpsideDown": orientation = ORGDevice.ORIENTATION_PORTRAIT_UPSIDE_DOWN; break;
            case "UIDeviceOrientationLandscapeRight": orientation = ORGDevice.ORIENTATION_LANDSCAPE_RIGHT; break;
            case "UIDeviceOrientationLandscapeLeft": orientation = ORGDevice.ORIENTATION_LANDSCAPE_LEFT; break;
            case "UIDeviceOrientationFaceUp": orientation = ORGDevice.ORIENTATION_FACE_UP; break;
            case "UIDeviceOrientationFaceDown": orientation = ORGDevice.ORIENTATION_FACE_DOWN; break;
        }
        return orientation;
    }
}