/*

*/
(function () {
 function WebSocketSprite(wsUrl, ajaxUrl, onOpen, onMessage, onError, onClose) {
        this.webSocket = null;
        this.status = -1;
        if (this._hasWebSocket()) {
            this.webSocket = new WebSocket(wsUrl);
            if (onOpen) this.webSocket.onopen = onOpen;
            if (onMessage) this.webSocket.onmessage = onMessage;
            if (onError) this.webSocket.onerror = onError;
            if (onClose) this.webSocket.onclose = onClose;
        }
    }

    WebSocketSprite.prototype = {
        close: function () {
            if (this.webSocket) {
                this.webSocket.close();
            }
        },
        send: function (message) {
            if (this.webSocket) {
                this.webSocket.send(message);
            }
            else {

            }
        },
        _hasWebSocket: function () {
            if (WebSocket) return true;
            return false;
        }
    };
})();