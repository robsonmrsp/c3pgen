/* generated: 30/08/2015 20:23:12 */
define(function(require) {
	// Start "Import´s" Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Backgrid = require('adapters/backgrid-adapter');
	var util = require('utilities/utils');
	var Combobox = require('views/components/Combobox');

	var TemplateFormViewApproachs = require('text!views/viewApproach/tpl/FormViewApproachTemplate.html');
	var ViewApproachModel = require('models/ViewApproachModel');
	var ViewApproachCollection = require('collections/ViewApproachCollection');
	
	// End of "Import´s" definition

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨MAIN BODY¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var FormViewApproachs = Marionette.LayoutView.extend({
		template : _.template(TemplateFormViewApproachs),

		regions : {
		},

		events : {
			'click 	.save' : 'save',
			'click 	.saveAndContinue' : 'saveAndContinue',
		},
		
		ui : {
			inputId : '#inputId',
			inputType : '#inputType',
			inputComboId : '#inputComboId',
			inputComboName : '#inputComboName',
			inputComboVal : '#inputComboVal',
			inputTextField : '#inputTextField',
			inputHiddenField : '#inputHiddenField',
		
			form : '#formViewApproach',
		},

		initialize : function() {
			var that = this;
			this.on('show', function() {
				this.ui.form.validationEngine('attach', {
					promptPosition : "topLeft",
					isOverflown : false,
					validationEventTrigger : "change"
				});
			});
		},

		saveAndContinue : function() {
			this.save(true)
		},

		save : function(continua) {
			var that = this;
			var viewApproach = that._getModel();

			if (this._isValid()) {
				viewApproach.save({}, {
					success : function(_model, _resp, _options) {
						util.showMessage('success', 'ViewApproach salvo com sucesso!');
						that.clearForm();

						if (continua != true) {
							util.goPage('app/viewApproachs');
						}
					},

					error : function(_model, _resp, _options) {
						util.showMessage('error', 'Problema ao salvar registro: ' + util.getJson(_resp.responseText).legalMessage || '');
						console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
					}
				});
			} else {
				util.showMessage('error', 'Verifique campos em destaque!');
			}
		},

		
		clearForm : function() {
			util.clear('inputId');
			util.clear('inputType'); 
			util.clear('inputComboId'); 
			util.clear('inputComboName'); 
			util.clear('inputComboVal'); 
			util.clear('inputTextField'); 
			util.clear('inputHiddenField'); 
		},

		possuiCamposInvalidos : function() {
			return util.hasInvalidFields(this.validateFields);
		},

		_isValid : function() {
			return this.ui.form.validationEngine('validate', {
				promptPosition : "topLeft",
				isOverflown : false,
				validationEventTrigger : "change"
			});
		},

		_getModel : function() {
			var that = this;
			var viewApproach = that.model; 
			viewApproach.set({
				id: util.escapeById('inputId') || null,
		    	type : util.escapeById('inputType'), 
				
		    	comboId : util.escapeById('inputComboId'), 
				
		    	comboName : util.escapeById('inputComboName'), 
				
		    	comboVal : util.escapeById('inputComboVal'), 
				
		    	textField : util.escapeById('inputTextField'), 
				
		    	hiddenField : util.escapeById('inputHiddenField'), 
				
			});
			return viewApproach;
		},
		 
		
				
		
	});

	return FormViewApproachs;
});