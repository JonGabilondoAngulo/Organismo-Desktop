/**
 * Created by jongabilondo on 15/08/2017.
 */

const ORGWebSocketDelegate = require('./ORGWebSocketDelegate')

module.exports =
class ORGOrganismoWSDelegate extends ORGWebSocketDelegate {

    constructor() {
        super();
    }

    /**
     * Callback for the websocket opening.
     * @param ws
     */
    onOpen(ws) {
        super.onOpen(ws);
        ORG.deviceController.requestDeviceInfo();
        ORG.deviceController.requestAppInfo();
    };


}