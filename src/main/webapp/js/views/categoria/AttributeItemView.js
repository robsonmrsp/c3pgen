/* generated: 18/08/2015 15:38:44 */
define(function(require) {
	// Start "Import´s Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');

	var util = require('utilities/utils');
	var BaseCollection = require('collections/BaseCollection');
	var BaseModel = require('models/BaseModel');
	var AttributeModel = require('models/AttributeModel');

	var AtributeItemViewTemplate = require('text!views/categoria/tpl/AttributeItemViewTemplate.html');

	var AttributesItemView = Marionette.ItemView.extend({
		template : _.template(AtributeItemViewTemplate),

		events : {
			'click .showhide' : 'hideShow',
			'click .delete-attribute' : 'deleteAtribute',
			'click checkbox' : 'changeAttribute'
		},

		ui : {
			inputAtributeName : '.inputAtributeName',
			inputDisplayName : '.displayName',

			inputId : '.inputId',
			inputName : '.inputName',
			inputDisplayName : '.inputDisplayName',
			inputMaxLen : '.inputMaxLen',
			inputTableFieldName : '.inputTableFieldName',
			inputMasc : '.inputMasc',
			inputDefaultValue : '.inputDefaultValue',
			inputPlaceholder : '.inputPlaceholder',
			inputRequired : '.inputRequired',
			inputUnique : '.inputUnique',

			widgetMain : '.widget-main',
			showhide : '.showhide',

			editableFields : '.editable-click'
		},

		changeAttribute : function() {
			this.model.set(this.getModel());
		},

		deleteAtribute : function() {
			this.model.destroy();
		},

		getModel : function() {
			return {
				id : this.ui.inputId.text(),
				name : this.ui.inputAtributeName.text(),
				displayName : this.ui.inputDisplayName.text(),
				maxLen : this.ui.inputMaxLen.text(),
				tableFieldName : this.ui.inputTableFieldName.text(),
				masc : this.ui.inputMasc.text(),
				defaultValue : this.ui.inputDefaultValue.text(),
				placeholder : this.ui.inputPlaceholder.text(),
				required : this.ui.inputRequired.is(':checked'),
				unique : this.ui.inputUnique.is(':checked'),
			};

		},
		hideShow : function() {
			this.ui.widgetMain.toggle();
			if (this.ui.widgetMain.is(':visible')) {
				this.ui.showhide.find('i').removeClass('fa-chevron-down').addClass('fa-chevron-up')
			} else {
				this.ui.showhide.find('i').removeClass('fa-chevron-up').addClass('fa-chevron-down')
			}
		},

		initialize : function() {
			var that = this;

			this.on('show', function() {
				this.ui.editableFields.editable();

				this.ui.editableFields.on('hidden', function() {
					that.changeAttribute();
				})
			});
		},
	});

	return AttributesItemView;
});
///views/categoria/EntityItemView