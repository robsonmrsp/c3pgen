/* generated: 18/08/2015 15:38:44 */
define(function(require) {
	// Start "Import´s Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');

	var util = require('utilities/utils');
	var C3P = require('utilities/C3pUtil');
	var BaseCollection = require('collections/BaseCollection');
	var BaseModel = require('models/BaseModel');
	var AttributeModel = require('models/AttributeModel');

	var AtributeItemViewTemplate = require('text!views/categoria/tpl/AttributeItemViewTemplate.html');

	var AttributesItemView = Marionette.ItemView.extend({
		template : _.template(AtributeItemViewTemplate),

		events : {
			'click .showhide' : 'hideShow',
			'click .delete-attribute' : 'deleteAtribute',
			'click .check-box' : 'changeAttribute'
		},

		ui : {
			inputId : '.inputId',

			inputAtributeName : '.inputAtributeName',
			inputDisplayName : '.inputDisplayName',
			inputMaxLen : '.inputMaxLen',
			inputType : '.inputType',
			inputTypeId : '.inputTypeId',
			inputTableFieldName : '.inputTableFieldName',
			inputMask : '.inputMask',
			inputDefaultValue : '.inputDefaultValue',
			inputPlaceholder : '.inputPlaceholder',
			inputRequired : '.inputRequired',
			inputUnique : '.inputUnique',

			inputViewApproach : '.inputViewApproach',
			inputViewApproachId : '.inputViewApproachId',

			widgetMain : '.widget-main',
			showhide : '.showhide',

			editableFields : '.editable-click'
		},

		changeAttribute : function() {
			this.model.set(this.getModel());
		},

		deleteAtribute : function() {
			this.model.destroy({
				success : function(a, b, c) {
					console.log('Removendo atributo ', a, b, c);
				},
				error : function(a, b, c) {
					console.warn('Erro ao detelar atributo ', a, b, c);
				}
			});
		},

		getModel : function() {
			return {
				id : this.ui.inputId.val() || null,
				name : this.ui.inputAtributeName.text(),

				displayName : C3P.notEmptyVal(this.ui.inputDisplayName),
				maxLen : C3P.notEmptyVal(this.ui.inputMaxLen),
				tableFieldName : C3P.notEmptyVal(this.ui.inputTableFieldName),
				mask : C3P.notEmptyVal(this.ui.inputMask),
				defaultValue : C3P.notEmptyVal(this.ui.inputDefaultValue),
				placeholder : C3P.notEmptyVal(this.ui.inputPlaceholder),
				required : this.ui.inputRequired.is(':checked'),
				unique : this.ui.inputUnique.is(':checked'),
				type : {
					id : this.ui.inputTypeId.val(),
					className : C3P.notEmptyVal(this.ui.inputType),
				},

				viewApproach : {
					id : this.ui.inputViewApproachId.val(),
					type : C3P.notEmptyVal(this.ui.inputViewApproach),
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
					util.refreshEditable(that.ui.inputMaxLen, 255)
				});

				this.ui.inputType.on('hidden', function() {
					if (that.ui.inputType.text() == 'Boolean') {
						that.ui.inputViewApproach.text('check')
						util.refreshEditable(that.ui.inputMask, '');
					}
					if (that.ui.inputType.text() == 'Integer' || that.ui.inputType.text() == 'Long' || that.ui.inputType.text() == 'Double') {

						util.refreshEditable(that.ui.inputMaxLen, 10)
						util.refreshEditable(that.ui.inputMask, '');
					}
					if (that.ui.inputType.text() == 'String') {
						that.ui.inputViewApproach.text('textfield')
						util.refreshEditable(that.ui.inputMask, '');
						util.refreshEditable(that.ui.inputMaxLen, 255)
					}
					if (that.ui.inputType.text() == 'Date') {
						that.ui.inputViewApproach.text('datepicker')
						util.refreshEditable(that.ui.inputMask, '99/99/9999');
						util.refreshEditable(that.ui.inputMaxLen, 10)
					}
					if (that.ui.inputType.text() == 'Datetime') {
						that.ui.inputViewApproach.text('datetimepicker')
						util.refreshEditable(that.ui.inputMask, '99/99/9999 99:99');

						util.refreshEditable(that.ui.inputMaxLen, 16)
					}
				})
				this.ui.inputViewApproach.on('hidden', function() {
					if ((that.ui.inputViewApproach.text() == 'Check') || (that.ui.inputViewApproach.text() == 'Radio')) {
						that.ui.inputType.text('Boolean')
					}
					if ( (that.ui.inputViewApproach.text() == 'Textfield') ) {
//						that.ui.inputType.text('String')
						util.refreshEditable(that.ui.inputMask, '');
						util.refreshEditable(that.ui.inputMaxLen, 255)
					}
					if ( (that.ui.inputViewApproach.text() == 'Textarea') ) {
						that.ui.inputType.text('String')
						util.refreshEditable(that.ui.inputMask, '');
						util.refreshEditable(that.ui.inputMaxLen, 2000)
					}

					if ( (that.ui.inputViewApproach.text() == 'Datepicker') ) {
						util.refreshEditable(that.ui.inputType, 'Date');
						util.refreshEditable(that.ui.inputMask, '99/99/9999');
						util.refreshEditable(that.ui.inputMaxLen, 10)

					}
					if ( (that.ui.inputViewApproach.text() == 'DateTimepicker') ) {
						util.refreshEditable(that.ui.inputType, 'Datetime');
						util.refreshEditable(that.ui.inputMask, '99/99/9999 99:99');
						util.refreshEditable(that.ui.inputMaxLen, 16)
					}
				// this.trigger('attribute:change', this.model);
				})

				this.ui.inputViewApproach.editable({
					value : 'Textfield',
					source : [ {
						value : 'check',
						text : 'Check'
					},
						{
							value : 'radio',
							text : 'Radio'
						},
						{
							value : 'upload',
							text : 'Upload'
						},
						{
							value : 'textfield',
							text : 'Textfield'
						}, {
							value : 'textarea',
							text : 'Textarea'
						}, {
							value : 'tatepicker',
							text : 'Datepicker'
						}, {
							value : 'datetimepicker',
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

				this.hideShow();
			});
		},
	});

	return AttributesItemView;
});
// /views/categoria/EntityItemView