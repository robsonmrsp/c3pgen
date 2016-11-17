/* generated: 05/08/2016 15:59:17 */
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

	var TemplateFormItemModulos = require('text!views/itemModulo/tpl/FormItemModuloTemplate.html');
	var ItemModuloModel = require('models/ItemModuloModel');
	var ItemModuloCollection = require('collections/ItemModuloCollection');
	var SearchModuloModal = require('views/modalComponents/ModuloModal');
	
	// End of "Import´s" definition

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨MAIN BODY¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var FormItemModulos = Marionette.LayoutView.extend({
		template : _.template(TemplateFormItemModulos),

		regions : {
			searchModuloModalRegion : '#moduloModal',
		},

		events : {
			'click 	.save' : 'save',
			'click 	.saveAndContinue' : 'saveAndContinue',
			'click #searchModuloModal' : '_showSearchModuloModal',
		},
		
		ui : {
			inputId : '#inputId',
			inputName : '#inputName',
			inputYamlContent : '#inputYamlContent',
		
			inputModuloId : '#inputModuloId',
			inputModuloName : '#inputModuloName',
			form : '#formItemModulo',
		},

		initialize : function() {
			var that = this;
			this.searchModuloModal = new SearchModuloModal({
				onSelectModel : function(model) {
					that._selectModulo(model);
				},
			});
			this.on('show', function() {
				this.searchModuloModalRegion.show(this.searchModuloModal);		
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
			var itemModulo = that._getModel();

			if (this._isValid()) {
				itemModulo.save({}, {
					success : function(_model, _resp, _options) {
						util.showSuccessMessage('ItemModulo salvo com sucesso!');
						that.clearForm();

						if (continua != true) {
							util.goPage('app/itemModulos');
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
			util.clear('inputYamlContent'); 
			util.clear('inputModuloId');
			util.clear('inputModuloName');
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
			var itemModulo = that.model; 
			itemModulo.set({
				id: util.escapeById('inputId') || null,
		    	name : util.escapeById('inputName'), 
				
		    	yamlContent : util.escapeById('inputYamlContent'), 
				
					modulo : that._getModulo(),
			});
			return itemModulo;
		},
		 
		_getModulo : function() {			
			var id = util.escapeById('inputModuloId');
			var name = util.escapeById('inputModuloName');
			var modulo = null;
			
			if (id && name) {
				modulo = {
					id : id,
					name : name,
				}
			}
			return modulo;
		},	
		
		_showSearchModuloModal : function() {
			this.searchModuloModal.showPage();
		},
			
		_selectModulo : function(modulo) {
			this.searchModuloModal.hidePage();	
			this.ui.inputModuloId.val(modulo.get('id'));
			this.ui.inputModuloName.val(modulo.get('name'));		
		},
				
		
	});

	return FormItemModulos;
});