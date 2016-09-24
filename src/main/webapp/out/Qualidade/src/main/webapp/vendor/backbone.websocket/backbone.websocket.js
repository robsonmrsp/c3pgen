(function(_, Backbone) {

	Backbone.WebSocket = function(url, onReceiveData) {
		this.onReceiveData = onReceiveData;
		this.url = url;
	};

	_.extend(Backbone.WebSocket.prototype, {
		// talvez seja necessário usar
		// JSON.parse(e.data) no tratamento de message, mas vamos ver como chega
		connect : function() {
			var host = window.location.host;
			var pathname = window.location.pathname.split('/')[1];
			var url = 'ws://' + host + '/' + pathname + '/' + this.url;
			if ('WebSocket' in window) {
				this.socket = new WebSocket(url);
			} else if ('MozWebSocket' in window) {
				this.socket = new MozWebSocket(url);
			} else {
				console.log('Error: WebSocket is not supported by this browser.');
				return;
			}
			this.socket.onopen = this._onOpen(this);
			this.socket.onclose = this._onClose;
			this.socket.onmessage = this.onReceiveData;

		},

		_onOpen : function(context) {
			return function() {
				console.log('[ Info ]: WebSocket connection opened.');
			}
		},

		_onClose : function() {
			console.log('[ Info ]: WebSocket connection closed.');
		},

		_send : function(data) {
			var serializableModel = JSON.stringify(data);
			console.log("[Info] Sending message ", serializableModel);
			this.socket.send(serializableModel);
		},
		close : function() {
			this.socket.close();
		}
	});
})(_, Backbone);
