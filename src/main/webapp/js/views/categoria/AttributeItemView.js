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
			inputId : '.inputId',

			inputAtributeName : '.inputAtributeName',
			inputDisplayName : '.inputDisplayName',
			inputMaxLen : '.inputMaxLen',
			inputType : '.inputType',
			inputTableFieldName : '.inputTableFieldName',
			inputMask : '.inputMask',
			inputDefaultValue : '.inputDefaultValue',
			inputPlaceholder : '.inputPlaceholder',
			inputRequired : '.inputRequired',
			inputUnique : '.inputUnique',

			inputViewApproach : '.inputViewApproach',

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
				masc : this.ui.inputMask.text(),
				defaultValue : this.ui.inputDefaultValue.text(),
				placeholder : this.ui.inputPlaceholder.text(),
				required : this.ui.inputRequired.is(':checked'),
				unique : this.ui.inputUnique.is(':checked'),
				viewApproach : {
					type : this.ui.inputViewApproach.text(),
				}
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

				this.ui.inputAtributeName.editable();
				this.ui.inputDisplayName.editable();
				this.ui.inputMaxLen.editable();
				this.ui.inputTableFieldName.editable();
				this.ui.inputMask.editable();

				this.ui.inputAtributeName.on('hidden', function() {
					util.refreshEditable(that.ui.inputDisplayName, util.toFrase(that.ui.inputAtributeName.text()));
					util.refreshEditable(that.ui.inputTableFieldName, util.toUnderscore(that.ui.inputAtributeName.text(), true));
				});
				this.ui.inputType.on('hidden', function() {
					if (that.ui.inputType.text() == 'Boolean') {
						that.ui.inputViewApproach.text('Check')
						util.refreshEditable(that.ui.inputMask, '');
					}
					if (that.ui.inputType.text() == 'Integer' || that.ui.inputType.text() == 'Long' || that.ui.inputType.text() == 'Double') {

						util.refreshEditable(that.ui.inputMaxLen, 10)
						util.refreshEditable(that.ui.inputMask, '');
					}
					if (that.ui.inputType.text() == 'String') {
						that.ui.inputViewApproach.text('Textfield')
						util.refreshEditable(that.ui.inputMask, '');
						util.refreshEditable(that.ui.inputMaxLen, 255)
					}
					if (that.ui.inputType.text() == 'Date') {
						that.ui.inputViewApproach.text('Datepicker')
						util.refreshEditable(that.ui.inputMask, '99/99/9999');
						util.refreshEditable(that.ui.inputMaxLen, 10)
					}
					if (that.ui.inputType.text() == 'Datetime') {
						that.ui.inputViewApproach.text('DateTimepicker')
						util.refreshEditable(that.ui.inputMask, '99/99/9999 99:99');

						util.refreshEditable(that.ui.inputMaxLen, 16)
					}
				})
				this.ui.inputViewApproach.on('hidden', function() {
					if ((that.ui.inputViewApproach.text() == 'Check') || (that.ui.inputViewApproach.text() == 'Radio')) {
						that.ui.inputType.text('Boolean')
					}
					if ((that.ui.inputViewApproach.text() == 'Textfield')) {
						that.ui.inputType.text('String')
						util.refreshEditable(that.ui.inputMask, '');
						util.refreshEditable(that.ui.inputMaxLen, 255)
					}

					if ((that.ui.inputViewApproach.text() == 'Datepicker')) {
						util.refreshEditable(that.ui.inputType, 'Date');
						util.refreshEditable(that.ui.inputMask, '99/99/9999');
						util.refreshEditable(that.ui.inputMaxLen, 10)

					}
					if ((that.ui.inputViewApproach.text() == 'DateTimepicker')) {
						util.refreshEditable(that.ui.inputType, 'Datetime');
						util.refreshEditable(that.ui.inputMask, '99/99/9999 99:99');
						util.refreshEditable(that.ui.inputMaxLen, 16)
					}
				})

				this.ui.inputViewApproach.editable({
					value : 'Textfield',
					source : [ {
						value : 'Check',
						text : 'Check'
					}, {
						value : 'Radio',
						text : 'Radio'
					}, {
						value : 'Textfield',
						text : 'Textfield'
					}, {
						value : 'Datepicker',
						text : 'Datepicker'
					}, {
						value : 'DateTimepicker',
						text : 'DateTimepicker'
					} ]
				});
				this.ui.inputType.editable({
					value : 'String',
					source : [ {
						value : 'String',
						text : 'String'
					}, {
						value : 'Long',
						text : 'Long'
					}, {
						value : 'Boolean',
						text : 'Boolean'
					}, {
						value : 'Integer',
						text : 'Integer'
					}, {
						value : 'Double',
						text : 'Double'
					}, {
						value : 'Date',
						text : 'Date'
					}, {
						value : 'Datetime',
						text : 'Datetime'
					}, ]
				})

				this.ui.editableFields.on('hidden', function() {
					that.changeAttribute();
				})

				// Quando clicar num campo que foi populado via util... deve
				// carregar a informação no imput
				this.ui.editableFields.on('shown', function(evt, editable) {
					var value = $(evt.target).text();
					if (value != editable.options.emptytext) {
						editable.input.$input.val($(evt.target).text() || $(evt.target).val());
					}
				});
			});
		},
	});

	return AttributesItemView;
});
// /views/categoria/EntityItemView