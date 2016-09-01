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

	var TemplateFormAnexos = require('text!views/anexo/tpl/FormAnexoTemplate.html');
	var AnexoModel = require('models/AnexoModel');
	var AnexoCollection = require('collections/AnexoCollection');
	var SearchApontamentoQualidadePackingModal = require('views/modalComponents/ApontamentoQualidadePackingModal');
	
	// End of "Import´s" definition

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨MAIN BODY¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var FormAnexos = Marionette.LayoutView.extend({
		template : _.template(TemplateFormAnexos),

		regions : {
			searchApontamentoQualidadePackingModalRegion : '#apontamentoQualidadePackingModal',
		},

		events : {
			'click 	.save' : 'save',
			'click 	.saveAndContinue' : 'saveAndContinue',
			'click #searchApontamentoQualidadePackingModal' : '_showSearchApontamentoQualidadePackingModal',
		},
		
		ui : {
			inputId : '#inputId',
			inputNome : '#inputNome',
			inputConteudo : '#inputConteudo',
		
			inputApontamentoQualidadePackingId : '#inputApontamentoQualidadePackingId',
			inputApontamentoQualidadePackingNome : '#inputApontamentoQualidadePackingNome',
			form : '#formAnexo',
		},

		initialize : function() {
			var that = this;
			this.searchApontamentoQualidadePackingModal = new SearchApontamentoQualidadePackingModal({
				onSelectModel : function(model) {
					that._selectApontamentoQualidadePacking(model);
				},
			});
			this.on('show', function() {
				this.searchApontamentoQualidadePackingModalRegion.show(this.searchApontamentoQualidadePackingModal);		
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
			var anexo = that._getModel();

			if (this._isValid()) {
				anexo.save({}, {
					success : function(_model, _resp, _options) {
						util.showSuccessMessage('Anexo salvo com sucesso!');
						that.clearForm();

						if (continua != true) {
							util.goPage('app/anexos');
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
			util.clear('inputConteudo'); 
			util.clear('inputApontamentoQualidadePackingId');
			util.clear('inputApontamentoQualidadePackingNome');
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
			var anexo = that.model; 
			anexo.set({
				id: util.escapeById('inputId') || null,
		    	nome : util.escapeById('inputNome'), 
				
		    	conteudo : util.escapeById('inputConteudo'), 
				
					apontamentoQualidadePacking : that._getApontamentoQualidadePacking(),
			});
			return anexo;
		},
		 
		_getApontamentoQualidadePacking : function() {			
			var id = util.escapeById('inputApontamentoQualidadePackingId');
			var nome = util.escapeById('inputApontamentoQualidadePackingNome');
			var apontamentoQualidadePacking = null;
			
			if (id && nome) {
				apontamentoQualidadePacking = {
					id : id,
					nome : nome,
				}
			}
			return apontamentoQualidadePacking;
		},	
		
		_showSearchApontamentoQualidadePackingModal : function() {
			this.searchApontamentoQualidadePackingModal.showPage();
		},
			
		_selectApontamentoQualidadePacking : function(apontamentoQualidadePacking) {
			this.searchApontamentoQualidadePackingModal.hidePage();	
			this.ui.inputApontamentoQualidadePackingId.val(apontamentoQualidadePacking.get('id'));
			this.ui.inputApontamentoQualidadePackingNome.val(apontamentoQualidadePacking.get('nome'));		
		},
				
		
	});

	return FormAnexos;
});