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

	var TemplateFormCors = require('text!views/cor/tpl/FormCorTemplate.html');
	var CorModel = require('models/CorModel');
	var CorCollection = require('collections/CorCollection');

	
	// End of "Import´s" definition
	var FormCors = Marionette.LayoutView.extend({
		template : _.template(TemplateFormCors),

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
				var cor = that._getModel();
				cor.save();
				console.info('cor  Salvo com sucesso');
				Util.goPage('app/cors', true);
			});
			
			this.floatButtonSave.setOnClickCancel(function() {
				Util.goPage('app/cor', true);
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
			var cor = that.model; 
			cor.set({
				id: Util.escapeById('inputId') || null,
		    	nome : Util.escapeById('inputNome'), 

			});
			return cor;
		},
	});

	return FormCors;
});