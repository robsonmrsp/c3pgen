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

	var TemplateFormItems = require('text!views/item/tpl/FormItemTemplate.html');
	var ItemModel = require('models/ItemModel');
	var ItemCollection = require('collections/ItemCollection');
	var ModalType = require('views/modalComponents/ItemTypeModal');
	var PermissionCollection = require('collections/PermissionCollection');
	var MultiSelectPermission = require('views/permission/MultiSelectPermission');			
	
	// End of "Import´s" definition

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨MAIN BODY¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var FormItems = Marionette.LayoutView.extend({
		template : _.template(TemplateFormItems),

		regions : {
			searchTypeModalRegion : '#typeModal',
			permissionsRegion : ".permissions-container",
		},

		events : {
			'click 	.save' : 'save',
			'click 	.saveAndContinue' : 'saveAndContinue',
			'click #searchTypeModal' : 'showModalType',
		},
		
		ui : {
			inputId : '#inputId',
			inputName : '#inputName',
			inputDescription : '#inputDescription',
		
			inputTypeId : '#inputTypeId',
			inputTypeName : '#inputTypeName',
			form : '#formItem',
		},

		initialize : function() {
			var that = this;
			this.modalType = new ModalType({
				onSelectModel : function(model) {
					that.selectType(model);
				},
			});
			that.permissions = new PermissionCollection();
			that.permissions.add(this.model.get('permissions'));
			this.multiSelectPermission = new MultiSelectPermission({
				collection : that.permissions,
			});
			this.on('show', function() {
				this.searchTypeModalRegion.show(this.searchTypeModal);		
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
			var item = that.getModel();

			if (this.isValid()) {
				item.save({}, {
					success : function(_model, _resp, _options) {
						util.showSuccessMessage('Item salvo com sucesso!');
						that.clearForm();

						if (continua != true) {
							util.goPage('app/items');
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
			util.clear('inputDescription'); 
			util.clear('inputTypeId');
			util.clear('inputTypeName');
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
			var item = that.model; 
			item.set({
				id: util.escapeById('inputId') || null,
		    	name : util.escapeById('inputName'), 
				
		    	description : util.escapeById('inputDescription'), 
				
					type : that.modalType.getJsonValue(),
					permissions : that.permissions.toJSON(),
			});
			return item;
		},
		 		
		showModalType : function() {
			// add more before the modal is open
			this.modalType.showPage();
		},

		selectType : function(type) {
			this.searchTypeModal.hidePage();	
			this.ui.inputTypeId.val(type.get('id'));
			this.ui.inputTypeName.val(type.get('name'));		
		},
				
		
	});

	return FormItems;
});