/* generated: 24/09/2016 12:52:15 */
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

	var TemplateFormBairros = require('text!views/bairro/tpl/FormBairroTemplate.html');
	var BairroModel = require('models/BairroModel');
	var BairroCollection = require('collections/BairroCollection');
	var ModalCidade = require('views/modalComponents/CidadeModal');
	var ModalEstado = require('views/modalComponents/EstadoModal');
	
	// End of "Import´s" definition

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨MAIN BODY¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var FormBairros = Marionette.LayoutView.extend({
		template : _.template(TemplateFormBairros),

		regions : {
			searchCidadeModalRegion : '#cidadeModal',
			searchEstadoModalRegion : '#estadoModal',
		},

		events : {
			'click 	.save' : 'save',
			'click 	.saveAndContinue' : 'saveAndContinue',
			'click #searchCidadeModal' : 'showModalCidade',
			'click #searchEstadoModal' : 'showModalEstado',
		},
		
		ui : {
			inputId : '#inputId',
			inputNome : '#inputNome',
		
			inputCidadeId : '#inputCidadeId',
			inputCidadeNome : '#inputCidadeNome',
			inputEstadoId : '#inputEstadoId',
			inputEstadoNome : '#inputEstadoNome',
			form : '#formBairro',
		},

		initialize : function() {
			var that = this;
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
			var bairro = that.getModel();

			if (this.isValid()) {
				bairro.save({}, {
					success : function(_model, _resp, _options) {
						util.showSuccessMessage('Bairro salvo com sucesso!');
						that.clearForm();

						if (continua != true) {
							util.goPage('app/bairros');
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
			var bairro = that.model; 
			bairro.set({
				id: util.escapeById('inputId') || null,
		    	nome : util.escapeById('inputNome'), 
				
					cidade : that.modalCidade.getJsonValue(),
					estado : that.modalEstado.getJsonValue(),
			});
			return bairro;
		},
		 		
		showModalCidade : function() {
			// add more before the modal is open
			this.modalCidade.showPage();
		},
		showModalEstado : function() {
			// add more before the modal is open
			this.modalEstado.showPage();
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

	return FormBairros;
});