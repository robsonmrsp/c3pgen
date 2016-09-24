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

	var TemplateFormEmbalagems = require('text!views/embalagem/tpl/FormEmbalagemTemplate.html');
	var EmbalagemModel = require('models/EmbalagemModel');
	var EmbalagemCollection = require('collections/EmbalagemCollection');

	
	// End of "Import´s" definition
	var FormEmbalagems = Marionette.LayoutView.extend({
		template : _.template(TemplateFormEmbalagems),

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
				var embalagem = that._getModel();
				embalagem.save();
				console.info('embalagem  Salvo com sucesso');
				Util.goPage('app/embalagems', true);
			});
			
			this.floatButtonSave.setOnClickCancel(function() {
				Util.goPage('app/embalagem', true);
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
			var embalagem = that.model; 
			embalagem.set({
				id: Util.escapeById('inputId') || null,
		    	nome : Util.escapeById('inputNome'), 

			});
			return embalagem;
		},
	});

	return FormEmbalagems;
});