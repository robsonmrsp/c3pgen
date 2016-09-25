/* generated: 24/09/2016 12:52:17 */
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

	var TemplateFormOperations = require('text!views/operation/tpl/FormOperationTemplate.html');
	var OperationModel = require('models/OperationModel');
	var OperationCollection = require('collections/OperationCollection');
	var PermissionCollection = require('collections/PermissionCollection');
	var MultiSelectPermission = require('views/permission/MultiSelectPermission');			
	
	// End of "Import´s" definition

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨MAIN BODY¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var FormOperations = Marionette.LayoutView.extend({
		template : _.template(TemplateFormOperations),

		regions : {
			permissionsRegion : ".permissions-container",
		},

		events : {
			'click 	.save' : 'save',
			'click 	.saveAndContinue' : 'saveAndContinue',
		},
		
		ui : {
			inputId : '#inputId',
			inputName : '#inputName',
			inputCanEdit : '#inputCanEdit',
			inputCanRead : '#inputCanRead',
			inputCanUpdate : '#inputCanUpdate',
			inputCanDelete : '#inputCanDelete',
			inputCanExecute : '#inputCanExecute',
		
			form : '#formOperation',
		},

		initialize : function() {
			var that = this;
			that.permissions = new PermissionCollection();
			that.permissions.add(this.model.get('permissions'));
			this.multiSelectPermission = new MultiSelectPermission({
				collection : that.permissions,
			});
			this.on('show', function() {
				this.permissionsRegion.show(this.multiSelectPermission);
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
			var operation = that.getModel();

			if (this.isValid()) {
				operation.save({}, {
					success : function(_model, _resp, _options) {
						util.showSuccessMessage('Operação salvo com sucesso!');
						that.clearForm();

						if (continua != true) {
							util.goPage('app/operations');
						}
					},

					error : function(_model, _resp, _options) {
						util.showErrorMessage('Problema ao salvar registro',_resp);
					}
				});
			} else {
				util.showMessage('error', 'Verifique campos em destaque!');
			}
		},

		
		clearForm : function() {
			util.clear('inputId');
			util.clear('inputName'); 
			util.clear('inputCanEdit'); 
			util.clear('inputCanRead'); 
			util.clear('inputCanUpdate'); 
			util.clear('inputCanDelete'); 
			util.clear('inputCanExecute'); 
			this.permissions.reset();
			this.multiSelectPermission.clear();
		},

		possuiCamposInvalidos : function() {
			return util.hasInvalidFields(this.validateFields);
		},

		isValid : function() {
			return this.ui.form.validationEngine('validate', {
				promptPosition : "topLeft",
				isOverflown : false,
				validationEventTrigger : "change"
			});
		},

		getModel : function() {
			var that = this;
			var operation = that.model; 
			operation.set({
				id: util.escapeById('inputId') || null,
		    	name : util.escapeById('inputName'), 
				
		    	canEdit : util.escapeById('inputCanEdit'), 
				
		    	canRead : util.escapeById('inputCanRead'), 
				
		    	canUpdate : util.escapeById('inputCanUpdate'), 
				
		    	canDelete : util.escapeById('inputCanDelete'), 
				
		    	canExecute : util.escapeById('inputCanExecute'), 
				
					permissions : that.permissions.toJSON(),
			});
			return operation;
		},
		 		

				
		
	});

	return FormOperations;
});