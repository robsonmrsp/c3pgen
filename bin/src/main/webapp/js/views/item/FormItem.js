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

	var TemplateFormItems = require('text!views/item/tpl/FormItemTemplate.html');
	var ItemModel = require('models/ItemModel');
	var ItemCollection = require('collections/ItemCollection');
	var SearchTypeModal = require('views/modalComponents/ItemTypeModal');
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
			'click #searchTypeModal' : '_showSearchTypeModal',
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
			this.searchTypeModal = new SearchTypeModal({
				onSelectModel : function(model) {
					that._selectType(model);
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
			var item = that._getModel();

			if (this._isValid()) {
				item.save({}, {
					success : function(_model, _resp, _options) {
						util.showMessage('success', 'Item salvo com sucesso!');
						that.clearForm();

						if (continua != true) {
							util.goPage('app/items');
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
			util.clear('inputDescription'); 
			util.clear('inputTypeId');
			util.clear('inputTypeName');
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
			var item = that.model; 
			item.set({
				id: util.escapeById('inputId') || null,
		    	name : util.escapeById('inputName'), 
				
		    	description : util.escapeById('inputDescription'), 
				
					type : that._getType(),
					permissions : that.permissions.toJSON(),
			});
			return item;
		},
		 
		_getType : function() {			
			var id = util.escapeById('inputTypeId');
			var name = util.escapeById('inputTypeName');
			var type = null;
			
			if (id && name) {
				type = {
					id : id,
					name : name,
				}
			}
			return type;
		},	
		
		_showSearchTypeModal : function() {
			this.searchTypeModal.showPage();
		},
			
		_selectType : function(type) {
			this.searchTypeModal.hidePage();	
			this.ui.inputTypeId.val(type.get('id'));
			this.ui.inputTypeName.val(type.get('name'));		
		},
				
		
	});

	return FormItems;
});