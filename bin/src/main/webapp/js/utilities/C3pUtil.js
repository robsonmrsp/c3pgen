define(function(require) {
	var $ = require('adapters/jquery-adapter');
	var _ = require('adapters/underscore-adapter');

	return {
		notEmptyVal : function(field) {
			var value = field.val() || field.text();
			if (value == 'Empty' || value == 'Vazio') {
				return null;
			}

			return value.trim();
		},
		isEmpty : function(field) {
			var value = field.val() || field.text();
			if (value.length == 0 || value == 'Empty' || value == 'Vazio') {
				return true;
			}
			return false;
		}
	}
})
