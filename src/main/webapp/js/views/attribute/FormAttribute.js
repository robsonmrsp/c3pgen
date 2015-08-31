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

	var TemplateFormAttributes = require('text!views/attribute/tpl/FormAttributeTemplate.html');
	var AttributeModel = require('models/AttributeModel');
	var AttributeCollection = require('collections/AttributeCollection');
	var SearchEntityModal = require('views/modalComponents/TheEntityModal');
	
	// End of "Import´s" definition

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨MAIN BODY¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var FormAttributes = Marionette.LayoutView.extend({
		template : _.template(TemplateFormAttributes),

		regions : {
			searchEntityModalRegion : '#entityModal',
		},

		events : {
			'click 	.save' : 'save',
			'click 	.saveAndContinue' : 'saveAndContinue',
			'click #searchEntityModal' : '_showSearchEntityModal',
		},
		
		ui : {
			inputId : '#inputId',
			inputName : '#inputName',
			inputDisplayName : '#inputDisplayName',
			inputMaxLen : '#inputMaxLen',
			inputTableFieldName : '#inputTableFieldName',
			inputMasc : '#inputMasc',
			inputDefaultValue : '#inputDefaultValue',
			inputPlaceholder : '#inputPlaceholder',
			inputRequired : '#inputRequired',
			inputUnique : '#inputUnique',
		
			inputEntityId : '#inputEntityId',
			inputEntityName : '#inputEntityName',
			form : '#formAttribute',
		},

		initialize : function() {
			var that = this;
			this.searchEntityModal = new SearchEntityModal({
				onSelectModel : function(model) {
					that._selectEntity(model);
				},
			});
			this.on('show', function() {
				this.searchEntityModalRegion.show(this.searchEntityModal);		
				this.ui.inputMaxLen.formatNumber(2);
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
			var attribute = that._getModel();

			if (this._isValid()) {
				attribute.save({}, {
					success : function(_model, _resp, _options) {
						util.showMessage('success', 'Attribute salvo com sucesso!');
						that.clearForm();

						if (continua != true) {
							util.goPage('app/attributes');
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
			util.clear('inputDisplayName'); 
			util.clear('inputMaxLen'); 
			util.clear('inputTableFieldName'); 
			util.clear('inputMasc'); 
			util.clear('inputDefaultValue'); 
			util.clear('inputPlaceholder'); 
			util.clear('inputRequired'); 
			util.clear('inputUnique'); 
			util.clear('inputEntityId');
			util.clear('inputEntityName');
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
			var attribute = that.model; 
			attribute.set({
				id: util.escapeById('inputId') || null,
		    	name : util.escapeById('inputName'), 
				
		    	displayName : util.escapeById('inputDisplayName'), 
				
		    	maxLen : util.escapeById('inputMaxLen', true), 
				
		    	tableFieldName : util.escapeById('inputTableFieldName'), 
				
		    	masc : util.escapeById('inputMasc'), 
				
		    	defaultValue : util.escapeById('inputDefaultValue'), 
				
		    	placeholder : util.escapeById('inputPlaceholder'), 
				
		    	required : util.escapeById('inputRequired'), 
				
		    	unique : util.escapeById('inputUnique'), 
				
					entity : that._getEntity(),
			});
			return attribute;
		},
		 
		_getEntity : function() {			
			var id = util.escapeById('inputEntityId');
			var name = util.escapeById('inputEntityName');
			var entity = null;
			
			if (id && name) {
				entity = {
					id : id,
					name : name,
				}
			}
			return entity;
		},	
		
		_showSearchEntityModal : function() {
			this.searchEntityModal.showPage();
		},
			
		_selectEntity : function(entity) {
			this.searchEntityModal.hidePage();	
			this.ui.inputEntityId.val(entity.get('id'));
			this.ui.inputEntityName.val(entity.get('name'));		
		},
				
		
	});

	return FormAttributes;
});