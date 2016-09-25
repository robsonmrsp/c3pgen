/* generated: 24/09/2016 12:52:16 */
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

	var TemplateFormCeps = require('text!views/cep/tpl/FormCepTemplate.html');
	var CepModel = require('models/CepModel');
	var CepCollection = require('collections/CepCollection');
	var ModalBairro = require('views/modalComponents/BairroModal');
	var ModalCidade = require('views/modalComponents/CidadeModal');
	var ModalEstado = require('views/modalComponents/EstadoModal');
	
	// End of "Import´s" definition

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨MAIN BODY¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var FormCeps = Marionette.LayoutView.extend({
		template : _.template(TemplateFormCeps),

		regions : {
			searchBairroModalRegion : '#bairroModal',
			searchCidadeModalRegion : '#cidadeModal',
			searchEstadoModalRegion : '#estadoModal',
		},

		events : {
			'click 	.save' : 'save',
			'click 	.saveAndContinue' : 'saveAndContinue',
			'click #searchBairroModal' : 'showModalBairro',
			'click #searchCidadeModal' : 'showModalCidade',
			'click #searchEstadoModal' : 'showModalEstado',
		},
		
		ui : {
			inputId : '#inputId',
			inputLogradouro : '#inputLogradouro',
			inputNumero : '#inputNumero',
		
			inputBairroId : '#inputBairroId',
			inputBairroNome : '#inputBairroNome',
			inputCidadeId : '#inputCidadeId',
			inputCidadeNome : '#inputCidadeNome',
			inputEstadoId : '#inputEstadoId',
			inputEstadoNome : '#inputEstadoNome',
			form : '#formCep',
		},

		initialize : function() {
			var that = this;
			this.modalBairro = new ModalBairro({
				onSelectModel : function(model) {
					that.selectBairro(model);
				},
			});
			this.modalCidade = new ModalCidade({
				onSelectModel : function(model) {
					that.selectCidade(model);
				},
			});
			this.modalEstado = new ModalEstado({
				onSelectModel : function(model) {
					that.selectEstado(model);
				},
			});
			this.on('show', function() {
				this.searchBairroModalRegion.show(this.searchBairroModal);		
				this.searchCidadeModalRegion.show(this.searchCidadeModal);		
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
			var cep = that.getModel();

			if (this.isValid()) {
				cep.save({}, {
					success : function(_model, _resp, _options) {
						util.showSuccessMessage('Cep salvo com sucesso!');
						that.clearForm();

						if (continua != true) {
							util.goPage('app/ceps');
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
			util.clear('inputLogradouro'); 
			util.clear('inputNumero'); 
			util.clear('inputBairroId');
			util.clear('inputBairroNome');
			util.clear('inputCidadeId');
			util.clear('inputCidadeNome');
			util.clear('inputEstadoId');
			util.clear('inputEstadoNome');
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
			var cep = that.model; 
			cep.set({
				id: util.escapeById('inputId') || null,
		    	logradouro : util.escapeById('inputLogradouro'), 
				
		    	numero : util.escapeById('inputNumero'), 
				
					bairro : that.modalBairro.getJsonValue(),
					cidade : that.modalCidade.getJsonValue(),
					estado : that.modalEstado.getJsonValue(),
			});
			return cep;
		},
		 		
		showModalBairro : function() {
			// add more before the modal is open
			this.modalBairro.showPage();
		},
		showModalCidade : function() {
			// add more before the modal is open
			this.modalCidade.showPage();
		},
		showModalEstado : function() {
			// add more before the modal is open
			this.modalEstado.showPage();
		},

		selectBairro : function(bairro) {
			this.searchBairroModal.hidePage();	
			this.ui.inputBairroId.val(bairro.get('id'));
			this.ui.inputBairroNome.val(bairro.get('nome'));		
		},
		selectCidade : function(cidade) {
			this.searchCidadeModal.hidePage();	
			this.ui.inputCidadeId.val(cidade.get('id'));
			this.ui.inputCidadeNome.val(cidade.get('nome'));		
		},
		selectEstado : function(estado) {
			this.searchEstadoModal.hidePage();	
			this.ui.inputEstadoId.val(estado.get('id'));
			this.ui.inputEstadoNome.val(estado.get('nome'));		
		},
				
		
	});

	return FormCeps;
});