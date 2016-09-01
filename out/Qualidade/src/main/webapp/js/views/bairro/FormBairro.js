/* generated: 01/09/2016 17:25:05 */
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
	var SearchCidadeModal = require('views/modalComponents/CidadeModal');
	var SearchEstadoModal = require('views/modalComponents/EstadoModal');
	
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
			'click #searchCidadeModal' : '_showSearchCidadeModal',
			'click #searchEstadoModal' : '_showSearchEstadoModal',
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
			this.searchCidadeModal = new SearchCidadeModal({
				onSelectModel : function(model) {
					that._selectCidade(model);
				},
			});
			this.searchEstadoModal = new SearchEstadoModal({
				onSelectModel : function(model) {
					that._selectEstado(model);
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
			var bairro = that._getModel();

			if (this._isValid()) {
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

		_isValid : function() {
			return this.ui.form.validationEngine('validate', {
				promptPosition : "topLeft",
				isOverflown : false,
				validationEventTrigger : "change"
			});
		},

		_getModel : function() {
			var that = this;
			var bairro = that.model; 
			bairro.set({
				id: util.escapeById('inputId') || null,
		    	nome : util.escapeById('inputNome'), 
				
					cidade : that._getCidade(),
					estado : that._getEstado(),
			});
			return bairro;
		},
		 
		_getCidade : function() {			
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
		
		_showSearchCidadeModal : function() {
			this.searchCidadeModal.showPage();
		},
			
		_selectCidade : function(cidade) {
			this.searchCidadeModal.hidePage();	
			this.ui.inputCidadeId.val(cidade.get('id'));
			this.ui.inputCidadeNome.val(cidade.get('nome'));		
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

	return FormBairros;
});