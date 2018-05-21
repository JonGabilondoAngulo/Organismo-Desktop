/**
 * Created by jongabilondo on 09/02/2018.
 */


const ORGERR = {
    ERR_GENERAL: 100,
    ERR_CONNECTION_REFUSED: 1000,
    ERR_WS_CONNECTION_REFUSED: 1001,
    ERR_CONNECTION_NOT_FOUND: 1002,
    ERR_WS_CONNECTION_NOT_FOUND: 1003
}

class ORGError extends Error {

    constructor(id, message) {
        super(message);
        this.name = "ORG Error";
        this.id = id;
    }

    static generalError(message) {
        return new ORGError(ORGERR.ERR_GENERAL, message);
    }

}