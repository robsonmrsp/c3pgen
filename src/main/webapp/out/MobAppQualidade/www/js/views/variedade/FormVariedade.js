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

	var TemplateFormVariedades = require('text!views/variedade/tpl/FormVariedadeTemplate.html');
	var VariedadeModel = require('models/VariedadeModel');
	var VariedadeCollection = require('collections/VariedadeCollection');

	
	// End of "Import´s" definition
	var FormVariedades = Marionette.LayoutView.extend({
		template : _.template(TemplateFormVariedades),

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
				var variedade = that._getModel();
				variedade.save();
				console.info('variedade  Salvo com sucesso');
				Util.goPage('app/variedades', true);
			});
			
			this.floatButtonSave.setOnClickCancel(function() {
				Util.goPage('app/variedade', true);
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
			var variedade = that.model; 
			variedade.set({
				id: Util.escapeById('inputId') || null,
		    	nome : Util.escapeById('inputNome'), 

			});
			return variedade;
		},
	});

	return FormVariedades;
});