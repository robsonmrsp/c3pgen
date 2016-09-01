/* generated: 01/09/2016 17:25:06 */
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

	var TemplateFormRoles = require('text!views/role/tpl/FormRoleTemplate.html');
	var RoleModel = require('models/RoleModel');
	var RoleCollection = require('collections/RoleCollection');
	var PermissionCollection = require('collections/PermissionCollection');
	var MultiSelectPermission = require('views/permission/MultiSelectPermission');			
	
	// End of "Import´s" definition

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨MAIN BODY¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var FormRoles = Marionette.LayoutView.extend({
		template : _.template(TemplateFormRoles),

		regions : {
			permissionsRegion : ".permissions-container",
		},

		events : {
			'click 	.save' : 'save',
			'click 	.saveAndContinue' : 'saveAndContinue',
		},
		
		ui : {
			inputId : '#inputId',
			inputAuthority : '#inputAuthority',
			inputDescription : '#inputDescription',
		
			form : '#formRole',
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
			var role = that._getModel();

			if (this._isValid()) {
				role.save({}, {
					success : function(_model, _resp, _options) {
						util.showSuccessMessage('Papel salvo com sucesso!');
						that.clearForm();

						if (continua != true) {
							util.goPage('app/roles');
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
			util.clear('inputAuthority'); 
			util.clear('inputDescription'); 
			this.permissions.reset();
			this.multiSelectPermission.clear();
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
			var role = that.model; 
			role.set({
				id: util.escapeById('inputId') || null,
		    	authority : util.escapeById('inputAuthority'), 
				
		    	description : util.escapeById('inputDescription'), 
				
					permissions : that.permissions.toJSON(),
			});
			return role;
		},
		 
		
				
		
	});

	return FormRoles;
});