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
	var EmbalagemCollection = require('collections/EmbalagemCollection');
	var EmbalagemModel = require('models/EmbalagemModel');
	var PageEmbalagemTemplate = require('text!views/embalagem/tpl/PageEmbalagemTemplate.html');

	var PageEmbalagem = Marionette.LayoutView.extend({
		template : _.template(PageEmbalagemTemplate),

		regions : {
			floatButtonRegion : '#floatButton',
			containerEmbalagemsRegion : '#containerEmbalagems',
		},

		ui : {

		},

		initialize : function() {
			this.embalagems = new EmbalagemCollection();
			this.embalagems.fetch()
			this.cardCollectionView = new CardCollectionView({
				collection : this.embalagems,
				renderConfig : this._getBasicRenderConfig(),
			});
			this.floatButtom = new FloatButton({
				onClick : function() {
					Util.goPage('app/newEmbalagem', true);
				}
			});

			this.on('show', function() {
				this.floatButtonRegion.show(this.floatButtom);
				this.containerEmbalagemsRegion.show(this.cardCollectionView);
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
					Util.goPage('app/editEmbalagem/' + model.get('id'), true);
				}
			}
		}
	});
	return PageEmbalagem;
});
