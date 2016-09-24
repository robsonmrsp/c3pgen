/* generated: 24/09/2016 11:56:36 */
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
	var SearchBairroModal = require('views/modalComponents/BairroModal');
	var SearchCidadeModal = require('views/modalComponents/CidadeModal');
	var SearchEstadoModal = require('views/modalComponents/EstadoModal');
	
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
			'click #searchBairroModal' : 'showSearchBairroModal',
			'click #searchCidadeModal' : 'showSearchCidadeModal',
			'click #searchEstadoModal' : 'showSearchEstadoModal',
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
			this.searchBairroModal = new SearchBairroModal({
				onSelectModel : function(model) {
					that.selectBairro(model);
				},
			});
			this.searchCidadeModal = new SearchCidadeModal({
				onSelectModel : function(model) {
					that.selectCidade(model);
				},
			});
			this.searchEstadoModal = new SearchEstadoModal({
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
				
					bairro : that.getBairro(),
					cidade : that.getCidade(),
					estado : that.getEstado(),
			});
			return cep;
		},
		 
		getBairro : function() {			
			var id = util.escapeById('inputBairroId');
			var nome = util.escapeById('inputBairroNome');
			var bairro = null;
			
			if (id && nome) {
				bairro = {
					id : id,
					nome : nome,
				}
			}
			return bairro;
		},	
		getCidade : function() {			
			var id = util.escapeById('inputCidadeId');
			var nome = util.escapeById('inputCidadeNome');
			var cidade = null;
			
			if (id && nome) {
				cidade = {
					id : id,
					nome : nome,
				}
			}
			return cidade;
		},	
		getEstado : function() {			
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
		
		showSearchBairroModal : function() {
			this.searchBairroModal.showPage();
		},
			
		selectBairro : function(bairro) {
			this.searchBairroModal.hidePage();	
			this.ui.inputBairroId.val(bairro.get('id'));
			this.ui.inputBairroNome.val(bairro.get('nome'));		
		},
		showSearchCidadeModal : function() {
			this.searchCidadeModal.showPage();
		},
			
		selectCidade : function(cidade) {
			this.searchCidadeModal.hidePage();	
			this.ui.inputCidadeId.val(cidade.get('id'));
			this.ui.inputCidadeNome.val(cidade.get('nome'));		
		},
		showSearchEstadoModal : function() {
			this.searchEstadoModal.showPage();
		},
			
		selectEstado : function(estado) {
			this.searchEstadoModal.hidePage();	
			this.ui.inputEstadoId.val(estado.get('id'));
			this.ui.inputEstadoNome.val(estado.get('nome'));		
		},
				
		
	});

	return FormCeps;
});