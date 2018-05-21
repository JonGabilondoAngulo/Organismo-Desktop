/**
 * Created by jongabilondo on 26/02/2017.
 */

/**
 * Base class to communicate with mobile devices via web sockets.
 */
class ORGWebSocketDeviceController extends ORGDeviceBaseController {

    /**
     * Constructor
     * @param ip
     * @param port
     * @param webSocket delegate
     */
    constructor(ip, port, delegate) {
        super(ip,port);
        this._webSocketDelegate = delegate;
    }

    get webSocketDelegate() {
        return this._webSocketDelegate;
    }

}