define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var moment = require('moment');

	var Utils = {
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
		}

	}
	return Utils;
});
