/* generated: 18/08/2015 15:38:44 */
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

	var TemplateFormCategorias = require('text!views/categoria/tpl/FormCategoriaTemplate.html');
	var CategoriaModel = require('models/CategoriaModel');
	var CategoriaCollection = require('collections/CategoriaCollection');
	
	// End of "Import´s" definition

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨MAIN BODY¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var FormCategorias = Marionette.LayoutView.extend({
		template : _.template(TemplateFormCategorias),

		regions : {
		},

		events : {
			'click 	.save' : 'save',
			'click 	.saveAndContinue' : 'saveAndContinue',
			'change  #inputNome' : 'changeNome',	
		},
		
		ui : {
			inputId : '#inputId',
			inputNome : '#inputNome',
		
			form : '#formCategoria',
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
			var categoria = that._getModel();

			if (this._isValid()) {
				categoria.save({}, {
					success : function(_model, _resp, _options) {
						util.showMessage('success', 'Categoria salvo com sucesso!');
						that.clearForm();

						if (continua != true) {
							util.goPage('app/categorias');
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
			util.clear('inputNome'); 
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
			var categoria = that.model; 
			categoria.set({
				id: util.escapeById('inputId') || null,
		    	nome : util.escapeById('inputNome'), 
			});
			return categoria;
		},
		 
		
				
		changeNome : function() {
			var that = this;
			util.validateUnique({
				element : that.ui.inputNome,
				fieldName : 'nome',
				fieldDisplayName : 'Nome',
				//onlyNumber : true,     //caso queira que as mascaras sejam removidas e somente NUMEROS sejam enviados na consulta.
				view : that,
				collection : CategoriaCollection,
			})
		},				
		
	});

	return FormCategorias;
});