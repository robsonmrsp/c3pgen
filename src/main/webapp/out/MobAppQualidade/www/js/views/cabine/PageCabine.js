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
	var CabineCollection = require('collections/CabineCollection');
	var CabineModel = require('models/CabineModel');
	var PageCabineTemplate = require('text!views/cabine/tpl/PageCabineTemplate.html');

	var PageCabine = Marionette.LayoutView.extend({
		template : _.template(PageCabineTemplate),

		regions : {
			floatButtonRegion : '#floatButton',
			containerCabinesRegion : '#containerCabines',
		},

		ui : {

		},

		initialize : function() {
			this.cabines = new CabineCollection();
			this.cabines.fetch()
			this.cardCollectionView = new CardCollectionView({
				collection : this.cabines,
				renderConfig : this._getBasicRenderConfig(),
			});
			this.floatButtom = new FloatButton({
				onClick : function() {
					Util.goPage('app/newCabine', true);
				}
			});

			this.on('show', function() {
				this.floatButtonRegion.show(this.floatButtom);
				this.containerCabinesRegion.show(this.cardCollectionView);
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
					Util.goPage('app/editCabine/' + model.get('id'), true);
				}
			}
		}
	});
	return PageCabine;
});
