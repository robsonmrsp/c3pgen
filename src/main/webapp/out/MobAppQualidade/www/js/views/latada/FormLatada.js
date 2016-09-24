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

	var TemplateFormLatadas = require('text!views/latada/tpl/FormLatadaTemplate.html');
	var LatadaModel = require('models/LatadaModel');
	var LatadaCollection = require('collections/LatadaCollection');

	
	// End of "Import´s" definition
	var FormLatadas = Marionette.LayoutView.extend({
		template : _.template(TemplateFormLatadas),

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
				var latada = that._getModel();
				latada.save();
				console.info('latada  Salvo com sucesso');
				Util.goPage('app/latadas', true);
			});
			
			this.floatButtonSave.setOnClickCancel(function() {
				Util.goPage('app/latada', true);
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
			var latada = that.model; 
			latada.set({
				id: Util.escapeById('inputId') || null,
		    	nome : Util.escapeById('inputNome'), 

			});
			return latada;
		},
	});

	return FormLatadas;
});