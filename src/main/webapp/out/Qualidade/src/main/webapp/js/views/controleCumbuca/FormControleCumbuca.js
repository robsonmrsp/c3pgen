/* generated: 24/09/2016 11:56:33 */
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

	var TemplateFormControleCumbucas = require('text!views/controleCumbuca/tpl/FormControleCumbucaTemplate.html');
	var ControleCumbucaModel = require('models/ControleCumbucaModel');
	var ControleCumbucaCollection = require('collections/ControleCumbucaCollection');
	var CabineCollection = require('collections/CabineCollection');			
	
	// End of "Import´s" definition

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨MAIN BODY¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var FormControleCumbucas = Marionette.LayoutView.extend({
		template : _.template(TemplateFormControleCumbucas),

		regions : {
		},

		events : {
			'click 	.save' : 'save',
			'click 	.saveAndContinue' : 'saveAndContinue',
		},
		
		ui : {
			inputId : '#inputId',
			inputDataRegistro : '#inputDataRegistro',
			groupInputDataRegistro : '#groupInputDataRegistro',
			inputPeso : '#inputPeso',
			inputTipo : '#inputTipo',
			inputQuantidadeCachos : '#inputQuantidadeCachos',
		
			inputCabine : '#inputCabine', 
			form : '#formControleCumbuca',
		},

		initialize : function() {
			var that = this;
			this.on('show', function() {
				this.ui.groupInputDataRegistro.datetimepicker({
					pickTime : false,
					language : 'pt_BR',
				});
				this.ui.inputDataRegistro.datetimepicker({
					pickTime : false,
					language : 'pt_BR',
				});
				this.ui.inputDataRegistro.mask('99/99/9999');
				this.ui.inputPeso.formatNumber(2);
				this.ui.inputTipo.formatNumber(2);
				this.ui.inputQuantidadeCachos.formatNumber(2);
				this.comboCabine = new Combobox({
					el : this.ui.inputCabine,
					comboId : 'id',
					comboVal : 'nome',
					collectionEntity : CabineCollection, 
				});
				this.comboCabine.setValue(this.model.get('cabine'));					
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
			var controleCumbuca = that.getModel();

			if (this.isValid()) {
				controleCumbuca.save({}, {
					success : function(_model, _resp, _options) {
						util.showSuccessMessage('Controle Cumbuca salvo com sucesso!');
						that.clearForm();

						if (continua != true) {
							util.goPage('app/controleCumbucas');
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
			util.clear('inputDataRegistro'); 
			util.clear('inputPeso'); 
			util.clear('inputTipo'); 
			util.clear('inputQuantidadeCachos'); 
			util.clear('inputCabine'); 					 	
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
			var controleCumbuca = that.model; 
			controleCumbuca.set({
				id: util.escapeById('inputId') || null,
		    	dataRegistro : util.escapeById('inputDataRegistro'), 
				
		    	peso : util.escapeById('inputPeso', true), 
				
		    	tipo : util.escapeById('inputTipo', true), 
				
		    	quantidadeCachos : util.escapeById('inputQuantidadeCachos', true), 
				
					cabine :  that.comboCabine.getJsonValue(),
			});
			return controleCumbuca;
		},
		 
		getCabine : function() {
			var id =  this.comboCabine.getRawValue();			
			
			if(id){
				return {
					id: id,
				}
			}
			return null;
		},				
		
				
		
	});

	return FormControleCumbucas;
});