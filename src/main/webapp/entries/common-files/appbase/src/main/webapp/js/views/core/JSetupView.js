define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Backgrid = require('adapters/backgrid-adapter');
	var util = require('utilities/utils');

	var JSetupFormView = Marionette.LayoutView.extend({
		onShow : function() {
			$.validate({
				modules : 'location, date, security, brazil',
				validateOnEvent : true,
				inputParentClassOnSuccess : '',
				addValidClassOnAll : true,
			});

			this.onShowView && this.onShowView();
		},

		isValid : function() {
			// checar se realmente é necessário
			return this.$el.isValid(null, {
				modules : 'location, date, security, brazil',
				validateOnEvent : true,
				inputParentClassOnSuccess : '',
				addValidClassOnAll : true,
			});
		},

		clearForm : function() {
			if (this.customClearForm) {
				this.customClearForm();
			}
			if (this.ui) {
				_.each(this.ui, function(uiItem) {
					if (!uiItem.attr('persist'))
						util.clear(uiItem.attr('id'));
				});
			}
			// TODO ver uma forma mais elegente de limpar os campos de upload;
			var inputImage = $('.jsetup-upload-image');
			inputImage.attr('src', inputImage.attr('no-image-file'));
		}
	});

	return JSetupFormView;
});