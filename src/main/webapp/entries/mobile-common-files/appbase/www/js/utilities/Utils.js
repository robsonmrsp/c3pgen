define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var moment = require('moment');

	window.Utils = {
		moment : moment,
		goPage : function(hash, noWait) {
			window.setTimeout(function() {
				window.location.hash = hash;
			}, noWait ? 0 : 1000);
		},
		escapeById : function(id, numeric) {
			var returnValue = null;
			var object = $('#' + id) || $("input:radio[name ='" + id + "']");

			if (object) {
				if (object.prop('tagName') && object.prop('tagName')) {
					var tagName = object.prop('tagName').toUpperCase();
					if (tagName === 'SELECT') {
						returnValue = object.children(":selected").attr("value") || null;
					}
				}
				var type = object.attr('type');
				if (type === 'checkbox' || type === 'radio') {
					returnValue = object.is(':checked');
				} else {
					var text = object.val();
					if (text) {
						returnValue = text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;').replace("'", '&#x27;');
					}
				}
			}
			if (returnValue && numeric) {
				return returnValue.replace(/\./g, '').replace(/\,/g, '.')
			}
			return returnValue;
		},
		escapeByName : function(name) {
			var object = $("input:radio[name ='" + name + "']:checked");
			if (object) {
				return object.val();
			}
			return '';
		},

		clear : function(element) {
			var inputElemento = $('#' + element);
			inputElemento.val('');
			inputElemento.prop('checked', false);
		},
		encodeCredenciais : function(username, password) {
			return btoa(unescape(encodeURIComponent([ username, password ].join(':'))));

		},
		markActiveItem : function(opts) {

		},
		confirmDelete : function(calback) {
			var toast = new $.nd2Toast({
				message : "Deseja realmente remover o registro? ",
				action : {
					title : "SIM",
					fn : calback,
					color : "red"
				},
				ttl : 8000
			});
		},

		simpleAlert : function(nome, titulo, iconType, calback) {
			console.log(nome);
			$.simpleAlert(nome, titulo, iconType, calback);
		},

		clearAllAlerts : function() {
			$.clearAllAlerts();
		},

		simplePrompt : function(nome, titulo, iconType, calback, element) {
			$.simplePrompt(nome, titulo, iconType, calback, element);
		},

		simpleConfirm : function(nome, titulo, iconType, calback) {
			$.simpleConfirm(nome, titulo, iconType, calback);
		},

		isLandscape : function() {
			var orientacao = window.screen.orientation.type || screen.orientation || '';

			if (orientacao.indexOf('landscape') != -1) {
				return true;
			}
			return false;
		},
		createQRcode : function(qrcodeContainer, info) {
			if (_.isNull(qrcodeContainer) || _.isUndefined(qrcodeContainer)) {
				throw new TypeError('qrcodeContainer must not be null or empty!');
			}
			var text = info || 'no data';
			if (_.isObject(info)) {
				text = JSON.stringify(info);
			}
			qrcodeContainer.qrcode({
				text : text,
				ecLevel : "H",
				fill : "#333333",
				fontcolor : "#ff9818",
				// fontname : "Roboto",
				// label : "HS",
				mPosX : 0.5,
				mPosY : 0.5,
				mSize : 0.2,
				minVersion : 4,
				// mode : 2,
				quiet : 1,
				radius : 0.1,
				render : "image",
				size : 250,
			})

			// "{"render":"image","ecLevel":"H","minVersion":4,"fill":"#333333","background":"#ffffff","text":"chico
			// das
			// pretinha.","size":250,"radius":0.1,"quiet":1,"mode":2,"mSize":0.2,"mPosX":0.5,"mPosY":0.5,"label":"HS
			// ","fontname":"","fontcolor":"#ff9818","image":{}}"

		},

		notificationAlert : function(message, titulo, buttonName, callback) {
			var that = this
			if (navigator.notification) {
				navigator.notification.alert(message, callback, titulo, buttonName);
			} else {
				that.simpleAlert(message, titulo, "info", function(sim) {
					callback(sim ? 1 : 2);
				});

			}

		},

		notificationConfirm : function(message, titulo, buttonLabels, confirmCallback) {
			var that = this
			if (navigator.notification) {
				navigator.notification.confirm(message, confirmCallback, titulo, buttonLabels)
			} else {
				that.simpleConfirm(message, titulo, "info", function(sim) {
					confirmCallback(sim ? 1 : 2);
				});

			}
		},
		logError : function(_resp) {
			var entry = 'no-message';
			try {
				if (_resp.responseText) {

					var _en = this.getJson(_resp.responseText);
					entry = _en.errorMessage + ' \n\n [ Parametros da requisição: ]-> ' + JSON.stringify(_en.parameters);
				} else {
					console.log(JSON.stringify(_resp));
					entry = _resp.getResponseHeader && _resp.getResponseHeader('exception')
				}
				console.log(entry);
			} catch (e) {
				console.log(e);
				console.log(entry);
			}
		},
		handleError : function(xhr, resp, opt) {
			if (opt.xhr.status === 0 && opt.xhr.readyState === 0) {
				var toast = new $.nd2Toast({
					message : "Aparentemente está sem conexão! ",
					action : {
						title : "Ok",
						color : "red"
					},
					ttl : 8000
				});
			} else {
				// console.error(resp.responseText || (resp.getResponseHeader &&
				// resp.getResponseHeader('exception')));
			}
		},
		scrollTop : function() {
			$("body,html").animate({
				scrollTop : 0
			})
		},

	}
	return Utils;
});
