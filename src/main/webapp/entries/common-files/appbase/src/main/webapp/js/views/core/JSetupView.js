define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Backgrid = require('adapters/backgrid-adapter');
	var util = require('utilities/utils');

	var JSetupFormView = Marionette.LayoutView.extend({
		onRender : function() {
			var promptPosition = this.validation && this.validation.promptPosition;
			if (this.ui.form) {
				this.ui.form.validationEngine('attach', {
					promptPosition : promptPosition || "topLeft",
					isOverflown : false,
					validationEventTrigger : "change"
				});
			}
		},

		isValid : function() {
			var promptPosition = this.validation && this.validation.promptPosition;

			if (this.ui.form) {
				return this.ui.form.validationEngine('validate', {
					promptPosition : promptPosition || "topLeft",
					isOverflown : false,
					validationEventTrigger : "change"
				});
			} else
				return true;
		},

		clearForm : function() {
			if (this.customClearForm) {
				this.customClearForm();
			}
			if (this.ui) {
				_.each(this.ui, function(uiItem) {
					//Caso queira que um determinado campo de tela permaneça com valores mesmod epois do clear, marque-o com o attributo persist
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