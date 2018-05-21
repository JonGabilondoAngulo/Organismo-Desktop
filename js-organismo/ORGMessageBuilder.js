/**
 * Created by jongabilondo on 01/07/2016.
 */

/**
 * ORGMessageBuilder. Utilities class to create JSON requests to Organismo driver.
 */
class ORGMessageBuilder {

    static deviceInfo() {
        const msg = {
            type: ORGMessage.REQUEST,
            data: {
                request: ORGRequest.DEVICE_INFO
            }
        };
        return JSON.stringify(msg);
    }

    static systemInfo() {
        const msg = {
            type: ORGMessage.REQUEST,
            data: {
                request: ORGRequest.SYSTEM_INFO
            }
        };
        return JSON.stringify(msg);
    }

    static appInfo() {
        const msg = {
            type: ORGMessage.REQUEST,
            data: {
                request: ORGRequest.APP_INFO
            }
        };
        return JSON.stringify(msg);
    }

    static takeScreenshot() {
        const msg = {
            type: ORGMessage.REQUEST,
            data: {
                request: ORGRequest.SCREENSHOT
            }
        };
        return JSON.stringify(msg);
    }

    static requestOrientationUpdates(enable) {
        const msg = {
            type: ORGMessage.REQUEST,
            data: {
                request: ORGRequest.ORIENTATION_UPDATES,
                parameters: {'enable': enable}
            }
        };
        return JSON.stringify(msg);
    }

    static requestLocationUpdates(enable) {
        const msg = {
            type: ORGMessage.REQUEST,
            data: {
                request: ORGRequest.LOCATION_UPDATES,
                parameters: {'enable': enable}
            }
        };
        return JSON.stringify(msg);
    }

    static elementTree(parameters) {
        const msg = {
            type: ORGMessage.REQUEST,
            data: {
                request: ORGRequest.ELEMENT_TREE,
                parameters: parameters
            }
        };
        return JSON.stringify(msg);
    }

    static gesture(gesture, parameters) {
        const msg = {
            type: ORGMessage.REQUEST,
            data: {
                request: gesture,
                parameters:parameters
            }
        };
        return JSON.stringify(msg);
    }

    static locationUpdate(location, elevation) {
        let msg = {
            type: ORGMessage.UPDATE,
            data: {
            }
        };
        if (location) {
            msg.data.location = { lat: location.lat(), lng : location.lng() };
        }
        if (elevation) {
            msg.data.altimeter = { altitude: elevation, pressure: 1000.0 }; // 100 kilopascal is 1 bar
        }
        return JSON.stringify(msg);
    }

    static attitudeUpdate(quaternion) {
        let msg = {
            type: ORGMessage.UPDATE,
            data: {
            }
        };
        if (quaternion) {
            msg.data.deviceAttitude = { qx:quaternion.x, qy:quaternion.z, qz:quaternion.y, qw:quaternion.w };
        }
        return JSON.stringify(msg);
    }

    static classHierarchy(className) {
        const msg = {
            type: ORGMessage.REQUEST,
            data: {
                request: ORGRequest.CLASS_HIERARCHY,
                parameters:{className: className}
            }
        };
        return JSON.stringify(msg);
    }
}