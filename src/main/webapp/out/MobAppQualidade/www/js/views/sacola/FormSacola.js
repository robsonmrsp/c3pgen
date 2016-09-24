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

	var TemplateFormSacolas = require('text!views/sacola/tpl/FormSacolaTemplate.html');
	var SacolaModel = require('models/SacolaModel');
	var SacolaCollection = require('collections/SacolaCollection');

	
	// End of "Import´s" definition
	var FormSacolas = Marionette.LayoutView.extend({
		template : _.template(TemplateFormSacolas),

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
				var sacola = that._getModel();
				sacola.save();
				console.info('sacola  Salvo com sucesso');
				Util.goPage('app/sacolas', true);
			});
			
			this.floatButtonSave.setOnClickCancel(function() {
				Util.goPage('app/sacola', true);
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
			var sacola = that.model; 
			sacola.set({
				id: Util.escapeById('inputId') || null,
		    	nome : Util.escapeById('inputNome'), 

			});
			return sacola;
		},
	});

	return FormSacolas;
});