
const { ORGError, ORGERR } = require('./ORGError')

module.exports =
/**
 * Class wrapper for a JS WebSocket to communicate with a Device.
 * It implements the methods for creation, open, close, sending and receiving.
 * It accepts a Delegate class that will be called on the following events: onOpen, onCLose, onMessage, onError.
 * @constructor
 */
class ORGWebSocket {

	constructor() {
        this._ws = null;
        this._serverURL = null;
        this._delegate = null;
	}

	get ws() {
		return this._ws;
	}

    get serverURL() {
        return this._serverURL;
    }

    get isConnected() {
        return !!this._ws && (this._ws.readyState !== this._ws.CLOSED);
    }

	/**
	 * Opens a WebSocket to a server given the URL and accepts a Delegate.
	 * @param inServerURL
	 * @param inDelegate. An object that implements the callback methods: onOpen, onClose, onMessage, onError
	 */
	open(inServerURL, inDelegate) {
		return new Promise( (resolve, reject) => {
			const _this = this;
            this._serverURL = inServerURL || null;
            this._delegate = inDelegate || null;

            const url = inServerURL;
            this._ws = new WebSocket(url);
            this._ws.onopen = function(event) {
                if (_this._delegate) {
                    _this.processMessagesWithDelegate(_this._delegate);
                }
                resolve(event)
            }
            this._ws.onclose = function(event) {
				reject(event)
            }
            this._ws.onmessage = function(event) {
				resolve(event)
            }
            this._ws.onerror = function(event)  {
                _this._ws = null;
                reject(new ORGError(ORGERR.ERR_WS_CONNECTION_REFUSED, "Error opening session."));
            }
		})
	}

	/**
	 * Close the WebSocket.
	 */
	close() {
		if (this._ws) {
            this._ws.close();
		} else {
			console.debug('CLOSE requested but there is no ws.')
		}
	}

    /***
	 * Sets the delegate that processes the web sockets callbacks.
	 * Usually to se a non linear async messaging model, where a "send" is not made with "await".
     * @param delegate
     */
	processMessagesWithDelegate(delegate) {
        this._delegate = delegate || null;

        let _this = this;
        this._ws.onopen = function(event) {
            _this._onOpen(event)
        }
        this._ws.onclose = function(event) {
            _this._onClose(event)
        }
        this._ws.onmessage = function(event) {
            _this._onMessage(event)
        }
        this._ws.onerror = function(event)  {
            _this._onError(event)
        }
    }

	/**
	 * Sends data through the websocket.
	 * @param payload. A string with the data to transfer.
	 */
	send(payload) {
		if (this._ws) {
            this._ws.send(payload);
		}
	}

	sendAsync(payload) {
		return new Promise( (resolve, reject) => {
            this._ws.onclose = (event) => {
            	this._onClose(event)
                reject(event)
            }
            this._ws.onmessage = (event) => {
                let messageJSON = null;
                try {
					messageJSON = JSON.parse(event.data);
				} catch (err) {
					console.debug('ERROR parsing response.' + event.data)
				}
                if (messageJSON) {
            		resolve(messageJSON)
				} else {
                    reject(messageJSON)
				}
            }
            this._ws.onerror = (event) => {
                reject(event)
            }
            if (this._ws) {
                this._ws.send(payload);
            }
		})
	}

	// Callbacks

	/**
	 * JS WebSocket callback when the socket has opened.
	 * It will call the Delegate "onOpen".
	 */
    _onOpen() {
		console.debug('OPENED: ' + this._serverURL);
		if (!!this._delegate && !!this._delegate.onOpen) {
            this._delegate.onOpen(this);
		}
	}

	/**
	 * JS WebSocket callback when the socket has closed.
	 * It will call the Delegate "onClose".
	 */
	_onClose(event) {
		console.debug('CLOSED: ' + this._serverURL);
        this._ws = null;
		if (!!this._delegate && !!this._delegate.onClose) {
            this._delegate.onClose(event, this);
		}
	}

	/**
	 * JS WebSocket callback when the socket has received a message.
	 * It will call the Delegate "onMessage".
	 */
	_onMessage(event) {
		if (!!this._delegate && !!this._delegate.onMessage) {
            this._delegate.onMessage(event, this);
		}
	}

	/**
	 * JS WebSocket callback when the socket has detected an error.
	 * It will call the Delegate "onError".
	 */
	_onError(event) {
		console.debug('WS Error: ' + JSON.stringify(event));
		if (!!this._delegate && !!this._delegate.onError) {
            this._delegate.onError(event, this);
		}
	}
}
