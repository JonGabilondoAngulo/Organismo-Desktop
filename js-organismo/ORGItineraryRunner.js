/**
 * Created by jongabilondo on 20/07/2017.
 */

ORG.RunnerState = {
    IDLE : "idle",
    RUNNING : "running",
    PAUSED : "paused"};

class ORGItineraryRunner extends ORGLocationProvider {

    constructor(itinerary) {
        super();

        this._itinerary = itinerary;
        this._state = ORG.RunnerState.IDLE;
        this._stepDelta = 5; // m
        this._nextStepDistance = 0;
        this._itineraryLocation = new ORGItineraryLocation(this._itinerary.polyline, this._itinerary.elevations, this._itinerary._length);
    }

    //------------------------------------------------------------------------------------------------------------------
    // PUBLIC
    //------------------------------------------------------------------------------------------------------------------

    start() {
        const distance = 0;
        const startDelay = 2*1000;
        this._nextStepDistance = 0;
        this._state = ORG.RunnerState.RUNNING;
        this._executeRunSimulationWithDelay(distance, this._stepDelta, startDelay);
    }

    stop() {
        this._state = ORG.RunnerState.IDLE;

    }

    pause() {
        this._state = ORG.RunnerState.PAUSED;

    }

    resume() {
        this._state = ORG.RunnerState.RUNNING;
        this._executeRunSimulationWithDelay(this._nextStepDistance, this._stepDelta, 50);
    }

    //------------------------------------------------------------------------------------------------------------------
    // PRIVATE
    //------------------------------------------------------------------------------------------------------------------

    _executeRunSimulationWithDelay(distance, stepDelta, delay) {
        const self = this;
        var runSimulationFunction = function() {
            self._runSimulation(distance, stepDelta);
        }
        setTimeout( runSimulationFunction, delay);
    }

    _runSimulation(distance, stepDelta) {

        if (distance > this._itinerary.length) {
            return;
        }
        if (this._state == ORG.RunnerState.IDLE) {
            return;
        }
        if (this._state == ORG.RunnerState.PAUSED) {
            return;
        }

        this._itineraryLocation.distance = distance;
        const location = this._itineraryLocation.location;
        const elevation = this._itineraryLocation.elevation;

        this._broadcastLocation(location, null, elevation); // inform whoever is interested

        // dispatch to update UI
        ORG.dispatcher.dispatch({
            actionType: 'itinerary-location-update',
            lat: location.lat(),
            lng: location.lng(),
            elevation: elevation
        });


        // continue to next step unless reached the end
        this._nextStepDistance = distance + stepDelta;
        if (this._nextStepDistance <= this._itinerary.length) {
            this._executeRunSimulationWithDelay(this._nextStepDistance, stepDelta, 100);
        }
    }


}