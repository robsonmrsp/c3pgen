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
	var CorCollection = require('collections/CorCollection');
	var CorModel = require('models/CorModel');
	var PageCorTemplate = require('text!views/cor/tpl/PageCorTemplate.html');

	var PageCor = Marionette.LayoutView.extend({
		template : _.template(PageCorTemplate),

		regions : {
			floatButtonRegion : '#floatButton',
			containerCorsRegion : '#containerCors',
		},

		ui : {

		},

		initialize : function() {
			this.cors = new CorCollection();
			this.cors.fetch()
			this.cardCollectionView = new CardCollectionView({
				collection : this.cors,
				renderConfig : this._getBasicRenderConfig(),
			});
			this.floatButtom = new FloatButton({
				onClick : function() {
					Util.goPage('app/newCor', true);
				}
			});

			this.on('show', function() {
				this.floatButtonRegion.show(this.floatButtom);
				this.containerCorsRegion.show(this.cardCollectionView);
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
					Util.goPage('app/editCor/' + model.get('id'), true);
				}
			}
		}
	});
	return PageCor;
});
