/* generated: 02/09/2016 16:23:48 */
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

	var TemplateFormCidades = require('text!views/cidade/tpl/FormCidadeTemplate.html');
	var CidadeModel = require('models/CidadeModel');
	var CidadeCollection = require('collections/CidadeCollection');
	var SearchEstadoModal = require('views/modalComponents/EstadoModal');
	
	// End of "Import´s" definition

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨MAIN BODY¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var FormCidades = Marionette.LayoutView.extend({
		template : _.template(TemplateFormCidades),

		regions : {
			searchEstadoModalRegion : '#estadoModal',
		},

		events : {
			'click 	.save' : 'save',
			'click 	.saveAndContinue' : 'saveAndContinue',
			'click #searchEstadoModal' : '_showSearchEstadoModal',
		},
		
		ui : {
			inputId : '#inputId',
			inputNome : '#inputNome',
			inputCep : '#inputCep',
		
			inputEstadoId : '#inputEstadoId',
			inputEstadoNome : '#inputEstadoNome',
			form : '#formCidade',
		},

		initialize : function() {
			var that = this;
			this.searchEstadoModal = new SearchEstadoModal({
				onSelectModel : function(model) {
					that._selectEstado(model);
				},
			});
			this.on('show', function() {
				this.searchEstadoModalRegion.show(this.searchEstadoModal);		
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
			var cidade = that._getModel();

			if (this._isValid()) {
				cidade.save({}, {
					success : function(_model, _resp, _options) {
						util.showSuccessMessage('Cidade salvo com sucesso!');
						that.clearForm();

						if (continua != true) {
							util.goPage('app/cidades');
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
			util.clear('inputNome'); 
			util.clear('inputCep'); 
			util.clear('inputEstadoId');
			util.clear('inputEstadoNome');
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
			var cidade = that.model; 
			cidade.set({
				id: util.escapeById('inputId') || null,
		    	nome : util.escapeById('inputNome'), 
				
		    	cep : util.escapeById('inputCep'), 
				
					estado : that._getEstado(),
			});
			return cidade;
		},
		 
		_getEstado : function() {			
			var id = util.escapeById('inputEstadoId');
			var nome = util.escapeById('inputEstadoNome');
			var estado = null;
			
			if (id && nome) {
				estado = {
					id : id,
					nome : nome,
				}
			}
			return estado;
		},	
		
		_showSearchEstadoModal : function() {
			this.searchEstadoModal.showPage();
		},
			
		_selectEstado : function(estado) {
			this.searchEstadoModal.hidePage();	
			this.ui.inputEstadoId.val(estado.get('id'));
			this.ui.inputEstadoNome.val(estado.get('nome'));		
		},
				
		
	});

	return FormCidades;
});