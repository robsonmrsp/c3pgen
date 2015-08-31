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

	var TemplateFormPermissions = require('text!views/permission/tpl/FormPermissionTemplate.html');
	var PermissionModel = require('models/PermissionModel');
	var PermissionCollection = require('collections/PermissionCollection');
	var SearchOperationModal = require('views/modalComponents/OperationModal');
	var SearchItemModal = require('views/modalComponents/ItemModal');
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
			'click #searchOperationModal' : '_showSearchOperationModal',
			'click #searchItemModal' : '_showSearchItemModal',
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
			this.searchOperationModal = new SearchOperationModal({
				onSelectModel : function(model) {
					that._selectOperation(model);
				},
			});
			this.searchItemModal = new SearchItemModal({
				onSelectModel : function(model) {
					that._selectItem(model);
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
			var permission = that._getModel();

			if (this._isValid()) {
				permission.save({}, {
					success : function(_model, _resp, _options) {
						util.showMessage('success', 'Permission salvo com sucesso!');
						that.clearForm();

						if (continua != true) {
							util.goPage('app/permissions');
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

		_isValid : function() {
			return this.ui.form.validationEngine('validate', {
				promptPosition : "topLeft",
				isOverflown : false,
				validationEventTrigger : "change"
			});
		},

		_getModel : function() {
			var that = this;
			var permission = that.model; 
			permission.set({
				id: util.escapeById('inputId') || null,
		    	name : util.escapeById('inputName'), 
				
					roles : that.roles.toJSON(),
					operation : that._getOperation(),
					item : that._getItem(),
			});
			return permission;
		},
		 
		_getOperation : function() {			
			var id = util.escapeById('inputOperationId');
			var name = util.escapeById('inputOperationName');
			var operation = null;
			
			if (id && name) {
				operation = {
					id : id,
					name : name,
				}
			}
			return operation;
		},	
		_getItem : function() {			
			var id = util.escapeById('inputItemId');
			var name = util.escapeById('inputItemName');
			var item = null;
			
			if (id && name) {
				item = {
					id : id,
					name : name,
				}
			}
			return item;
		},	
		
		_showSearchOperationModal : function() {
			this.searchOperationModal.showPage();
		},
			
		_selectOperation : function(operation) {
			this.searchOperationModal.hidePage();	
			this.ui.inputOperationId.val(operation.get('id'));
			this.ui.inputOperationName.val(operation.get('name'));		
		},
		_showSearchItemModal : function() {
			this.searchItemModal.showPage();
		},
			
		_selectItem : function(item) {
			this.searchItemModal.hidePage();	
			this.ui.inputItemId.val(item.get('id'));
			this.ui.inputItemName.val(item.get('name'));		
		},
				
		
	});

	return FormPermissions;
});