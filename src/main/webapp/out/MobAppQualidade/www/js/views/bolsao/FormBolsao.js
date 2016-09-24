/* generated: 24/09/2016 11:56:51 */
define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Util = require('utilities/Utils');
	var Waves = require('waves');

	var FloatButtonSave = require('views/components/FloatButtonSave');
	var Combobox = require('views/components/Combobox');

	var TemplateFormBolsaos = require('text!views/bolsao/tpl/FormBolsaoTemplate.html');
	var BolsaoModel = require('models/BolsaoModel');
	var BolsaoCollection = require('collections/BolsaoCollection');

	
	// End of "Import´s" definition
	var FormBolsaos = Marionette.LayoutView.extend({
		template : _.template(TemplateFormBolsaos),

		regions : {
			floatButtonSaveRegion : '#floatButtonSave',
		},

		events : {
		},
		
		ui : {
			inputId : '#inputId',
			inputNome : '#inputNome',

		},

		initialize : function() {
			var that = this;

			this.floatButtonSave = new FloatButtonSave({});
			
			this.floatButtonSave.setOnClickSave(function() {
				var bolsao = that._getModel();
				bolsao.save();
				console.info('bolsao  Salvo com sucesso');
				Util.goPage('app/bolsaos', true);
			});
			
			this.floatButtonSave.setOnClickCancel(function() {
				Util.goPage('app/bolsao', true);
			});
			
			this.on('show', function() {
				this.floatButtonSaveRegion.show(this.floatButtonSave);
				
				
				
			})
		},
		

		saveAndContinue : function() {
			this.save(true)
		},

		clearForm : function() {
			Util.clear('inputId');
			Util.clear('inputNome'); 
		},
		
		_getModel : function() {
			var that = this;
			var bolsao = that.model; 
			bolsao.set({
				id: Util.escapeById('inputId') || null,
		    	nome : Util.escapeById('inputNome'), 

			});
			return bolsao;
		},
	});

	return FormBolsaos;
});