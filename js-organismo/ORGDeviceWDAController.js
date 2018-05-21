/**
 * Created by jongabilondo on 26/02/2017.
 */

/***
 * Class to communicate with the WebDriverAgent running on the device.
 */
class ORGDeviceWDAController extends ORGDeviceBaseController {

    constructor(ip, port) {
        super(ip,port);
        this.xhr = new XMLHttpRequest();
        this._sessionInfo = null;
    }

    get type() {
        return "WDA";
    }

    get isConnected() {
        return (this._sessionInfo !== null);
    }

    get RESTPrefix() {
        return "http://" + this.IPandPort + "/";
    }

    get RESTPrefixWithSession() {
        return this.RESTPrefix + "session/" + this._sessionInfo.sessionId + "/";
    }

    openSession() {
        return new Promise((resolve, reject) => {
            var endpointURL = this.RESTPrefix + "session";
            this.xhr.open("POST", endpointURL, true);
            this.xhr.onload = () => {
                switch (this.xhr.status) {
                    case 200: {
                        const response = JSON.parse(this.xhr.responseText);
                        if (response.status === 0) {
                            this._sessionInfo = JSON.parse(this.xhr.responseText);
                            resolve(this._sessionInfo);
                        } else {
                            reject(this.xhr.responseText);
                        }
                    } break;
                    case 404: {
                        reject(new ORGError(ORGERR.ERR_CONNECTION_NOT_FOUND, "No connection found at given IP & PORT."));
                    } break;
                    default: {
                        reject(this.xhr.statusText);
                    }
                }
                if (this.xhr.status === 200) {

                } else {
                    reject(this.xhr.statusText);
                }
            }
            this.xhr.onerror = () => {
                reject(this.xhr.statusText);
            }
            this.xhr.onreadystatechange = () => {
                // Solution to get connection errors. Pitty there is no proper way to something so basic.
                if (this.xhr.readyState === 4 && this.xhr.status === 0) {
                    reject(new ORGError(ORGERR.ERR_CONNECTION_REFUSED, "Error opening session."));
                } else if (this.xhr.readyState === 2 && this.xhr.status === 404) {
                    reject(new ORGError(ORGERR.ERR_CONNECTION_NOT_FOUND, "No connection found at given IP & PORT."));
                }
            }
            this.xhr.send(JSON.stringify({desiredCapabilities:{bundleId:'com.apple.mobilephone'}}));
        })
    }

    closeSession() {
        ORG.dispatcher.dispatch({
            actionType: 'wda-session-closed'
        });

        /* DOESNT WORK !
         const endpointURL = this.RESTPrefix + "";
         this.xhr.open("DELETE", endpointURL, true);
         this.xhr.onreadystatechange = () => {
         if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
         this._sessionInfo = null;
         }
         }
         this.xhr.send();*/
    }

    getDeviceInformation() {
        return new Promise((resolve, reject) => {

            // Get orientation
            this.getDeviceOrientation().then(
                (result) => {
                    const orientaton = result;

                    // Get device screen size.
                    this.getWindowSize().then(
                        (result) => {
                            const screenSizePortrait = ORGDevice.screenSizeInPortrait(result);
                            let device = this._deviceInfoFromWindowSize(screenSizePortrait);
                            device.orientation = orientaton;
                            resolve(device);
                        },
                        (err) => {
                            reject(err);
                        }
                    ). catch(
                        (err) => {
                            reject(err);
                        }
                    )
                },
                (err) => {
                    reject(err);
                }
            ).catch(
                (err) => {
                    reject(err);
                }
            )
        })
    }

    getAppInformation() {
        return new Promise((resolve, reject) => {
            resolve(new ORGTestApp( {name: "", version: "", bundleIdentifier: ""} ));
        });
    }

    getDeviceOrientation() {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await this._sendCommand(this.RESTPrefixWithSession + "orientation", "GET");
                let orientation = ORGDevice.ORIENTATION_PORTRAIT;
                switch (result) {
                    case "PORTRAIT": break;
                    case "LANDSCAPE": orientation = ORGDevice.ORIENTATION_LANDSCAPE_LEFT; break;
                    case "UIA_DEVICE_ORIENTATION_LANDSCAPERIGHT": orientation = ORGDevice.ORIENTATION_LANDSCAPE_RIGHT; break;
                    case "UIA_DEVICE_ORIENTATION_PORTRAIT_UPSIDEDOWN": orientation = ORGDevice.ORIENTATION_PORTRAIT_UPSIDE_DOWN; break;
                }
                resolve(orientation);
            } catch (err) {
                reject(err);
            }
        })
    }

    getScreenshot() {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await this._sendCommand(this.RESTPrefix + "screenshot", "GET");
                const base64Img = result;
                if (base64Img && Object.keys(base64Img).length) {
                    let img = new Image();
                    img.src = "data:image/jpg;base64," + base64Img;
                    img.onload = () => {
                        resolve(img);
                    }
                } else {
                    reject(new ORGError(ORGERR.ERR_GENERAL, "Could not get screenshot."));
                }
            } catch (err) {
                reject(err);
            }
        })
    }

    getElementTree() {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await this._sendCommand(this.RESTPrefix + "source?format=json", "GET");
                resolve(result);
            } catch (err) {
                reject(err);
            }
        })
    }

    getWindowSize() {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await this._sendCommand(this.RESTPrefixWithSession + "window/size", "GET");
                resolve(result);
            } catch (err) {
                reject(err);
            }
        })
    }

    sendPressHome() {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await this._sendCommand(this.RESTPrefix + "wda/homescreen", "POST");
                resolve(result);
            } catch (err) {
                reject(err);
            }
        })
    }

    sendLock() {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await this._sendCommand(this.RESTPrefix + "wda/lock", "POST");
                resolve(result);
            } catch (err) {
                reject(err);
            }
        })
    }

    sendUnlock() {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await this._sendCommand(this.RESTPrefix + "wda/unlock", "POST");
                resolve(result);
            } catch (err) {
                reject(err);
            }
        })
    }

    elementUsing(using, value) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await this._sendCommand(this.RESTPrefixWithSession + "element", "POST", JSON.stringify({using: using, value: value}));
                resolve(result);
            } catch (err) {
                reject(err);
            }
        })
    }

    tapElementWithId(elementId) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await this._sendCommand(this.RESTPrefixWithSession + "element/" + elementId + "/click", "POST");
                resolve(result);
            } catch (err) {
                reject(err);
            }
        })
    }

    longPressElementWithId(elementId) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await this._sendCommand(this.RESTPrefixWithSession + "wda/element/" + elementId + "/touchAndHold", "POST", JSON.stringify({duration: 1.0}));
                resolve(result);
            } catch (err) {
                reject(err);
            }
        })
    }

    swipeElementWithId(elementId, direction) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await this._sendCommand(this.RESTPrefixWithSession + "wda/element/" + elementId + "/swipe", "POST", JSON.stringify({direction: direction}));
                resolve(result);
            } catch (err) {
                reject(err);
            }
        })
    }

    setOrientation(orientation) {
        return new Promise(async (resolve, reject) => {
            try {
                let wdaOrientation = "PORTRAIT";
                switch (orientation) {
                    case ORGDevice.ORIENTATION_PORTRAIT_UPSIDE_DOWN: {wdaOrientation = "UIA_DEVICE_ORIENTATION_PORTRAIT_UPSIDEDOWN"} break;
                    case ORGDevice.ORIENTATION_LANDSCAPE_LEFT: {wdaOrientation = "LANDSCAPE"} break;
                    case ORGDevice.ORIENTATION_LANDSCAPE_RIGHT: {wdaOrientation = "UIA_DEVICE_ORIENTATION_LANDSCAPERIGHT"} break;
                }
                let result = await this._sendCommand(this.RESTPrefixWithSession + "orientation" , "POST", JSON.stringify({orientation: wdaOrientation}));
                resolve(result);
            } catch (err) {
                reject(err);
            }
        })
    }

    getSystemInfo() {
        // not implemented
    }

    sendLocationUpdate(lat, lng) {
        // not implemented
    }
    _sendCommand(command, method, parameters) {
        return new Promise((resolve, reject) => {
            this.xhr.open(method, command, true);
            this.xhr.onload = () => {
                let response = JSON.parse(this.xhr.responseText);
                if (response.status === 0) {
                    resolve(response.value);
                } else {
                    reject(response.value);
                }
            }
            this.xhr.onerror = () => {
                reject(this.xhr.statusText);
            }
            this.xhr.onabort = () => {
                reject(this.xhr.statusText);
            }
            this.xhr.onreadystatechange = () => {
                // Solution to get connection errors. Pitty there is no proper way to something so important.
                if (this.xhr.readyState === 4 && this.xhr.status === 0) {
                    reject(new ORGError(ORGERR.ERR_CONNECTION_REFUSED, "Error requesting orientation."));
                }
            }
            this.xhr.send(!!parameters ?parameters :null);
        })
    }

    _deviceInfoFromTree(tree) {
        // Root of tree contains Application info (very poor info)
        const screenPoints = {width: tree.rect.width, height: tree.rect.height};
        const deviceProductName = ORGDeviceMetrics.deviceWithScreenPoints(screenPoints);
        return new ORGDevice( {name:'', systemVersion: "", productName: deviceProductName, screenSize: screenPoints} );
    }

    _deviceInfoFromWindowSize(size) {
        const screenPoints = size;
        const deviceProductName = ORGDeviceMetrics.deviceWithScreenPoints(screenPoints);
        return new ORGDevice( {name:'', systemVersion: "", productName: deviceProductName, screenSize: screenPoints} );
    }
}