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

	var TemplateFormCabines = require('text!views/cabine/tpl/FormCabineTemplate.html');
	var CabineModel = require('models/CabineModel');
	var CabineCollection = require('collections/CabineCollection');

	
	// End of "Import´s" definition
	var FormCabines = Marionette.LayoutView.extend({
		template : _.template(TemplateFormCabines),

		regions : {
			floatButtonSaveRegion : '#floatButtonSave',
		},

		events : {
		},
		
		ui : {
			inputId : '#inputId',
			inputNome : '#inputNome',
			inputPackingId : '#inputPackingId',
			inputPackingNome : '#inputPackingNome',

		},

		initialize : function() {
			var that = this;

			this.floatButtonSave = new FloatButtonSave({});
			
			this.floatButtonSave.setOnClickSave(function() {
				var cabine = that._getModel();
				cabine.save();
				console.info('cabine  Salvo com sucesso');
				Util.goPage('app/cabines', true);
			});
			
			this.floatButtonSave.setOnClickCancel(function() {
				Util.goPage('app/cabine', true);
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
			var cabine = that.model; 
			cabine.set({
				id: Util.escapeById('inputId') || null,
		    	nome : Util.escapeById('inputNome'), 

			});
			return cabine;
		},
	});

	return FormCabines;
});