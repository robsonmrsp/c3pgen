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

	var TemplateFormPermissions = require('text!views/permission/tpl/FormPermissionTemplate.html');
	var PermissionModel = require('models/PermissionModel');
	var PermissionCollection = require('collections/PermissionCollection');
	var ModalOperation = require('views/modalComponents/OperationModal');
	var ModalItem = require('views/modalComponents/ItemModal');
	var RoleCollection = require('collections/RoleCollection');
	var MultiSelectRole = require('views/role/MultiSelectRole');			
	
	// End of "Import´s" definition

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨MAIN BODY¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var FormPermissions = Marionette.LayoutView.extend({
		template : _.template(TemplateFormPermissions),

		regions : {
			rolesRegion : ".roles-container",
			searchOperationModalRegion : '#operationModal',
			searchItemModalRegion : '#itemModal',
		},

		events : {
			'click 	.save' : 'save',
			'click 	.saveAndContinue' : 'saveAndContinue',
			'click #searchOperationModal' : 'showModalOperation',
			'click #searchItemModal' : 'showModalItem',
		},
		
		ui : {
			inputId : '#inputId',
			inputName : '#inputName',
		
			inputOperationId : '#inputOperationId',
			inputOperationName : '#inputOperationName',
			inputItemId : '#inputItemId',
			inputItemName : '#inputItemName',
			form : '#formPermission',
		},

		initialize : function() {
			var that = this;
			that.roles = new RoleCollection();
			that.roles.add(this.model.get('roles'));
			this.multiSelectRole = new MultiSelectRole({
				collection : that.roles,
			});
			this.modalOperation = new ModalOperation({
				onSelectModel : function(model) {
					that.selectOperation(model);
				},
			});
			this.modalItem = new ModalItem({
				onSelectModel : function(model) {
					that.selectItem(model);
				},
			});
			this.on('show', function() {
				this.searchOperationModalRegion.show(this.searchOperationModal);		
				this.searchItemModalRegion.show(this.searchItemModal);		
				this.rolesRegion.show(this.multiSelectRole);
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
			var permission = that.getModel();

			if (this.isValid()) {
				permission.save({}, {
					success : function(_model, _resp, _options) {
						util.showSuccessMessage('Permissão salvo com sucesso!');
						that.clearForm();

						if (continua != true) {
							util.goPage('app/permissions');
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
			this.roles.reset();
			this.multiSelectRole.clear();
			util.clear('inputOperationId');
			util.clear('inputOperationName');
			util.clear('inputItemId');
			util.clear('inputItemName');
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
			var permission = that.model; 
			permission.set({
				id: util.escapeById('inputId') || null,
		    	name : util.escapeById('inputName'), 
				
					roles : that.roles.toJSON(),
					operation : that.modalOperation.getJsonValue(),
					item : that.modalItem.getJsonValue(),
			});
			return permission;
		},
		 		
		showModalOperation : function() {
			// add more before the modal is open
			this.modalOperation.showPage();
		},
		showModalItem : function() {
			// add more before the modal is open
			this.modalItem.showPage();
		},

		selectOperation : function(operation) {
			this.searchOperationModal.hidePage();	
			this.ui.inputOperationId.val(operation.get('id'));
			this.ui.inputOperationName.val(operation.get('name'));		
		},
		selectItem : function(item) {
			this.searchItemModal.hidePage();	
			this.ui.inputItemId.val(item.get('id'));
			this.ui.inputItemName.val(item.get('name'));		
		},
				
		
	});

	return FormPermissions;
});