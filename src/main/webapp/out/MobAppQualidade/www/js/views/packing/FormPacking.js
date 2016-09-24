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

	var TemplateFormPackings = require('text!views/packing/tpl/FormPackingTemplate.html');
	var PackingModel = require('models/PackingModel');
	var PackingCollection = require('collections/PackingCollection');

	
	// End of "Import´s" definition
	var FormPackings = Marionette.LayoutView.extend({
		template : _.template(TemplateFormPackings),

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
				var packing = that._getModel();
				packing.save();
				console.info('packing  Salvo com sucesso');
				Util.goPage('app/packings', true);
			});
			
			this.floatButtonSave.setOnClickCancel(function() {
				Util.goPage('app/packing', true);
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
			var packing = that.model; 
			packing.set({
				id: Util.escapeById('inputId') || null,
		    	nome : Util.escapeById('inputNome'), 

			});
			return packing;
		},
	});

	return FormPackings;
});