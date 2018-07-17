/**
 * Created by jongabilondo on 13/12/2016.
 */

module.exports =

class ORGTestApp {

    constructor( appInfo ) {
        this.version = null;
        this.bundleIdentifier = null;
        this.name = null;

        if ( appInfo ) {
            this.name = appInfo.name;
            this.version = appInfo.version;
            this.bundleIdentifier = appInfo.bundleIdentifier;
        }
    }

}
