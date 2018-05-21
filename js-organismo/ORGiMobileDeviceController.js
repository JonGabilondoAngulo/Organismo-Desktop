/**
 * Created by jongabilondo on 26/02/2017.
 */

/**
 * Class to communicate with mobile devices using idevicecontrolproxy server.
 */
class ORGiMobileDeviceController extends ORGWebSocketDeviceController {

    //constructor(ip, port, delegate) {
    //    super(ip,port,delegate);
    //    //this.webSocketDelegate = new ORGiControlProxyWSDelegate();
    //}

    get type() {
        return "iDeviceControlProxy";
    }

    requestDeviceInfo() {
        this.webSocket.send( "{ \"cmd\" : \"ideviceinfo\" }");
    }

    requestAppInfo() {
    }

    requestScreenshot() {
        this.webSocket.send( "{ \"cmd\" : \"idevicescreenshot\" }");
    }

    requestElementTree( parameters ) {
    }

    sendLocationUpdate( lat, lng) {
        this.webSocket.send( "{ \"cmd\" : \"idevicelocation\" , \"args\" : \"-- " + lat + " " + lng + "\"}");
    }

}