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

				this.ui.inputType.editable({
					value : 'string',
					source : [ {
						value : 'string',
						text : 'String'
					}, {
						value : 'long',
						text : 'Long'
					}, {
						value : 'boolean',
						text : 'Boolean'
					}, {
						value : 'integer',
						text : 'Integer'
					}, {
						value : 'double',
						text : 'Double'
					}, {
						value : 'date',
						text : 'Date'
					}, {
						value : 'datetime',
						text : 'Datetime'
					}, ]
				})
				this.ui.inputType.on('hidden', function() {
					if (that.ui.inputType.text() == 'Boolean') {
						that.ui.inputViewApproach.text('Check')
					}
					if (that.ui.inputType.text() == 'String') {
						that.ui.inputViewApproach.text('Textfield')
					}
				})
				this.ui.inputViewApproach.on('hidden', function() {
					if ((that.ui.inputViewApproach.text() == 'Check') || (that.ui.inputViewApproach.text() == 'Radio')) {
						that.ui.inputType.text('Boolean')
					}
					if ((that.ui.inputViewApproach.text() == 'Textfield')) {
						that.ui.inputType.text('String')
					}
				})

				this.ui.inputViewApproach.editable({
					value : 'textfield',
					source : [ {
						value : 'check',
						text : 'Check'
					}, {
						value : 'radio',
						text : 'Radio'
					}, {
						value : 'textfield',
						text : 'Textfield'
					}, {
						value : 'datepicker',
						text : 'Datepicker'
					} ]
				});

				this.ui.inputViewApproach.on('hidden', function() {

				});

				this.ui.editableFields.on('hidden', function() {
					that.changeAttribute();
					alert('teste');
				})
			});
		},
	});

	return AttributesItemView;
});
// /views/categoria/EntityItemView
