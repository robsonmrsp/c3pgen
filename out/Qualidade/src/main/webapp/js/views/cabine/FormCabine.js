/* generated: 03/09/2016 22:18:31 */
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

	var TemplateFormCabines = require('text!views/cabine/tpl/FormCabineTemplate.html');
	var CabineModel = require('models/CabineModel');
	var CabineCollection = require('collections/CabineCollection');
	var SearchPackingModal = require('views/modalComponents/PackingModal');
	
	// End of "Import´s" definition

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨MAIN BODY¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var FormCabines = Marionette.LayoutView.extend({
		template : _.template(TemplateFormCabines),

		regions : {
			searchPackingModalRegion : '#packingModal',
		},

		events : {
			'click 	.save' : 'save',
			'click 	.saveAndContinue' : 'saveAndContinue',
			'click #searchPackingModal' : 'showSearchPackingModal',
		},
		
		ui : {
			inputId : '#inputId',
			inputNome : '#inputNome',
		
			inputPackingId : '#inputPackingId',
			inputPackingNome : '#inputPackingNome',
			form : '#formCabine',
		},

		initialize : function() {
			var that = this;
			this.searchPackingModal = new SearchPackingModal({
				onSelectModel : function(model) {
					that.selectPacking(model);
				},
			});
			this.on('show', function() {
				this.searchPackingModalRegion.show(this.searchPackingModal);		
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
			var cabine = that.getModel();

			if (this.isValid()) {
				cabine.save({}, {
					success : function(_model, _resp, _options) {
						util.showSuccessMessage('Cabine salvo com sucesso!');
						that.clearForm();

						if (continua != true) {
							util.goPage('app/cabines');
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
			util.clear('inputPackingId');
			util.clear('inputPackingNome');
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
			var cabine = that.model; 
			cabine.set({
				id: util.escapeById('inputId') || null,
		    	nome : util.escapeById('inputNome'), 
				
					packing : that.getPacking(),
			});
			return cabine;
		},
		 
		getPacking : function() {			
			var id = util.escapeById('inputPackingId');
			var nome = util.escapeById('inputPackingNome');
			var packing = null;
			
			if (id && nome) {
				packing = {
					id : id,
					nome : nome,
				}
			}
			return packing;
		},	
		
		showSearchPackingModal : function() {
			this.searchPackingModal.showPage();
		},
			
		selectPacking : function(packing) {
			this.searchPackingModal.hidePage();	
			this.ui.inputPackingId.val(packing.get('id'));
			this.ui.inputPackingNome.val(packing.get('nome'));		
		},
				
		
	});

	return FormCabines;
});