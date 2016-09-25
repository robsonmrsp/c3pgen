/* generated: 24/09/2016 12:52:33 */
define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Util = require('utilities/Utils');
	var Waves = require('waves');

	var FloatButtonSave = require('views/components/FloatButtonSave');
	var Combobox = require('views/components/Combobox');

	var TemplateFormGeneradors = require('text!views/generador/tpl/FormGeneradorTemplate.html');
	var GeneradorModel = require('models/GeneradorModel');
	var GeneradorCollection = require('collections/GeneradorCollection');

	
	// End of "Import´s" definition
	var FormGeneradors = Marionette.LayoutView.extend({
		template : _.template(TemplateFormGeneradors),

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
				var generador = that._getModel();
				generador.save();
				console.info('generador  Salvo com sucesso');
				Util.goPage('app/generadors', true);
			});
			
			this.floatButtonSave.setOnClickCancel(function() {
				Util.goPage('app/generador', true);
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
			var generador = that.model; 
			generador.set({
				id: Util.escapeById('inputId') || null,
		    	nome : Util.escapeById('inputNome'), 

			});
			return generador;
		},
	});

	return FormGeneradors;
});