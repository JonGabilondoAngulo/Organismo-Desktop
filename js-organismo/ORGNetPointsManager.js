/**
 * Created by jongabilondo on 15/03/2018.
 */

class ORGNetPointsManager {

    constructor() {
        this._requests = [];
    }

    processNetRequest() {

    }

    createNetPoint() {

    }

    removeNetPoint() {

    }
}

class ORG3DNetPointsManager { // visualization

    constructor() {
        this._requests = [];
    }

    processNetRequest() {

        let np = new ORG3DNetPoint();
        let npt = new ORG3DNetPointDescriptor();
        this._THREEScene.add(np.model);
        this._THREEScene.add(npt.model);
    }

    createNetPoint() {

    }

    removeNetPoint() {

    }

    updateNetPoint() {

    }

    _calculatePositionForNetPoint() {

    }

    _updateNetPointPositions() {

    }
}