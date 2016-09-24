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
	var GeneradorCollection = require('collections/GeneradorCollection');
	var GeneradorModel = require('models/GeneradorModel');
	var PageGeneradorTemplate = require('text!views/generador/tpl/PageGeneradorTemplate.html');

	var PageGenerador = Marionette.LayoutView.extend({
		template : _.template(PageGeneradorTemplate),

		regions : {
			floatButtonRegion : '#floatButton',
			containerGeneradorsRegion : '#containerGeneradors',
		},

		ui : {

		},

		initialize : function() {
			this.generadors = new GeneradorCollection();
			this.generadors.fetch()
			this.cardCollectionView = new CardCollectionView({
				collection : this.generadors,
				renderConfig : this._getBasicRenderConfig(),
			});
			this.floatButtom = new FloatButton({
				onClick : function() {
					Util.goPage('app/newGenerador', true);
				}
			});

			this.on('show', function() {
				this.floatButtonRegion.show(this.floatButtom);
				this.containerGeneradorsRegion.show(this.cardCollectionView);
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
					Util.goPage('app/editGenerador/' + model.get('id'), true);
				}
			}
		}
	});
	return PageGenerador;
});
