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
	var BolsaoCollection = require('collections/BolsaoCollection');
	var BolsaoModel = require('models/BolsaoModel');
	var PageBolsaoTemplate = require('text!views/bolsao/tpl/PageBolsaoTemplate.html');

	var PageBolsao = Marionette.LayoutView.extend({
		template : _.template(PageBolsaoTemplate),

		regions : {
			floatButtonRegion : '#floatButton',
			containerBolsaosRegion : '#containerBolsaos',
		},

		ui : {

		},

		initialize : function() {
			this.bolsaos = new BolsaoCollection();
			this.bolsaos.fetch()
			this.cardCollectionView = new CardCollectionView({
				collection : this.bolsaos,
				renderConfig : this._getBasicRenderConfig(),
			});
			this.floatButtom = new FloatButton({
				onClick : function() {
					Util.goPage('app/newBolsao', true);
				}
			});

			this.on('show', function() {
				this.floatButtonRegion.show(this.floatButtom);
				this.containerBolsaosRegion.show(this.cardCollectionView);
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
					Util.goPage('app/editBolsao/' + model.get('id'), true);
				}
			}
		}
	});
	return PageBolsao;
});
