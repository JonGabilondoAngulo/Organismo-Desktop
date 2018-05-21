/**
 * Created by jongabilondo on 14/08/2017.
 */


class ORGiControlProxyWSDelegate extends ORGWebSocketDelegate {

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
    };


    /**
     * Callback for when the websocket has received a message from the Device.
     * Here the message is processed.
     * @param event
     * @param ws
     */
    onMessage(event, ws) {

        var resultStr = event.data.replace(/\n/g , "\\r"); // mac sends LF in responses

        var messageJSON = JSON.parse(resultStr);
        if (messageJSON) {
            //console.log("onMessage. parse OK");
        } else {
            console.log("onMessage. parse NOT OK");
            return;
        }

        if (messageJSON.status == 'success') {
            this._processResponse(messageJSON);
        } else {
            console.log("onMessage. cmd response failure. cmd:" + messageJSON.cmd);
        }
    };

    /**
     * Method to process a response to a cmd, arrived from the Device.
     * @param messageJSON
     */
    _processResponse(messageJSON) {
        switch (messageJSON.cmd) {
            case "ideviceinfo": {
                const deviceInfo = this._deviceInfoFromResponse(messageJSON.response);//{"name" : "name", "model":"model", "systemVersion" : "sv", "productName" : "iPhone 5", "screenSize" : {"height":568, "width":320}};
                this._processResponseDeviceInfo(deviceInfo); // super
            } break;
            case "idevicescreenshot" : {
                this._processReportScreenshot({"data":{"screenshot":messageJSON.response}});

            }
        }
    }

    _deviceInfoFromResponse(reponse) {

        var name;
        var version;
        var matches = /DeviceName: (.*)(\r)(.*)/.exec(reponse);
        if (matches && matches.length >= 2) {
            name = matches[1];
        }
        matches = /ProductVersion: (.*)(\r)(.*)/.exec(reponse);
        if (matches && matches.length >= 2) {
            version = matches[1];
        }

        return {"name" : name, "model":"model", "systemVersion" : version, "productName" : "iPhone 5", "screenSize" : {"height":568, "width":320}};

    }
}