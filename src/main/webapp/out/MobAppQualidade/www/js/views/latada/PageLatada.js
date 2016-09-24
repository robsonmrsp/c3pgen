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
	var LatadaCollection = require('collections/LatadaCollection');
	var LatadaModel = require('models/LatadaModel');
	var PageLatadaTemplate = require('text!views/latada/tpl/PageLatadaTemplate.html');

	var PageLatada = Marionette.LayoutView.extend({
		template : _.template(PageLatadaTemplate),

		regions : {
			floatButtonRegion : '#floatButton',
			containerLatadasRegion : '#containerLatadas',
		},

		ui : {

		},

		initialize : function() {
			this.latadas = new LatadaCollection();
			this.latadas.fetch()
			this.cardCollectionView = new CardCollectionView({
				collection : this.latadas,
				renderConfig : this._getBasicRenderConfig(),
			});
			this.floatButtom = new FloatButton({
				onClick : function() {
					Util.goPage('app/newLatada', true);
				}
			});

			this.on('show', function() {
				this.floatButtonRegion.show(this.floatButtom);
				this.containerLatadasRegion.show(this.cardCollectionView);
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
					Util.goPage('app/editLatada/' + model.get('id'), true);
				}
			}
		}
	});
	return PageLatada;
});
