/**
 * Created by jongabilondo on 18/05/2017.
 */

/**
 * Class to simulate a location+altitude sensor. It does not generate the data by itself, other services like Map (LocationProvider) feed this class with the location data.
 * This class is in charge of passing the location data to the connected devices.
 */
class ORGLocationManager extends ORGLocationProvider {

    constructor() {
        super();

        this._location = null;
        this._address = null;
        this._elevation = null;
    }

    get location() {
        return this._location;
    }
    get address() {
        return this._address;
    }
    get elevation() {
        return this._elevation;
    }

    /**
     * Delegate function to be called to inform the manager of his new location data.
     * It backs up the data and passes the information the connected device.
     * @param location
     * @param address
     * @param elevation
     */
    locationUpdate(location, address, elevation) {
        this._location = location;
        this._address = address;
        this._elevation = elevation;

        if (ORG.deviceController) {
            ORG.deviceController.sendLocationUpdate( location.lat(), location.lng());

            //const msg = ORGMessageBuilder.locationUpdate( location, elevation );
            //ORG.deviceController.sendMessage(msg);
        }

        this._broadcastLocation(location, address, elevation);
    }
}