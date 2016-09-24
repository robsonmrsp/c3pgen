define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');

	var Waves = require('waves');
	var Util = require('utilities/Utils');
	var FloatButton = require('views/components/FloatButton');
	var CardCollectionView = require('views/components/CardCollection');
	var Combobox = require('views/components/Combobox');
	var SacolaCollection = require('collections/SacolaCollection');
	var SacolaModel = require('models/SacolaModel');
	var PageSacolaTemplate = require('text!views/sacola/tpl/PageSacolaTemplate.html');

	var PageSacola = Marionette.LayoutView.extend({
		template : _.template(PageSacolaTemplate),

		regions : {
			floatButtonRegion : '#floatButton',
			containerSacolasRegion : '#containerSacolas',
		},

		ui : {

		},

		initialize : function() {
			this.sacolas = new SacolaCollection();
			this.sacolas.fetch()
			this.cardCollectionView = new CardCollectionView({
				collection : this.sacolas,
				renderConfig : this._getBasicRenderConfig(),
			});
			this.floatButtom = new FloatButton({
				onClick : function() {
					Util.goPage('app/newSacola', true);
				}
			});

			this.on('show', function() {
				this.floatButtonRegion.show(this.floatButtom);
				this.containerSacolasRegion.show(this.cardCollectionView);
			})
		},
		
		_getBasicRenderConfig : function() {
			return {
				// Na hora de escrever os arquivos de configuração, fazer por
				// onde os primeiros elementos serem os mais importantes. pra
				// poder gerar essa linha abaixo.
				primaryInfo : {
					name : 'nome',
				},

				onCancel : function(model) {
					console.log(model);
					Util.confirmDelete(function() {
						model.destroy();
					});
				},

				onSave : function(model) {
					Util.goPage('app/editSacola/' + model.get('id'), true);
				}
			}
		}
	});
	return PageSacola;
});
