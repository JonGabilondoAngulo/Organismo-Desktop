/**
 * Created by jongabilondo on 26/02/2017.
 */

/**
 * Base class to communicate with mobile devices via web sockets/REST.
 * Provides the base virtual functions for subclasses to implement.
 * It's not a class to be used directly, but to inherit from it.
 */
class ORGDeviceBaseController {

    constructor(ip, port) {
        this._ip = ip;
        this._port = port;
    }
    get type() {
        _throwError();
    }
    get isConnected() {
        _throwError();
    }
    get IPandPort() {
        return this._ip + ":" + this._port;
    }
    get hasContinuousUpdate() {
        return false;
    }
    get hasOrientationUpdate() {
        return false;
    }
    get hasLocationUpdate() {
        return false;
    }
    get hasSystemInfo() {
        return false;
    }

    requestSystemInfo() {
        this._throwError();
    }

    openSession() {
        this._throwError();
    }
    closeSession() {
        this._throwError();
    }
    screenshot() {
        this._throwError();
    }
    elementTree() {
        this._throwError();
    }
    refreshUITree() {
        this._throwError();
    }
    _throwError() {
        throw new Error("Executing base class method. Subclass must implement this method.");
    }
}