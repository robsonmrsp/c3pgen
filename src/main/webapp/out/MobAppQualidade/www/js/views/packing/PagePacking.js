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
	var PackingCollection = require('collections/PackingCollection');
	var PackingModel = require('models/PackingModel');
	var PagePackingTemplate = require('text!views/packing/tpl/PagePackingTemplate.html');

	var PagePacking = Marionette.LayoutView.extend({
		template : _.template(PagePackingTemplate),

		regions : {
			floatButtonRegion : '#floatButton',
			containerPackingsRegion : '#containerPackings',
		},

		ui : {

		},

		initialize : function() {
			this.packings = new PackingCollection();
			this.packings.fetch()
			this.cardCollectionView = new CardCollectionView({
				collection : this.packings,
				renderConfig : this._getBasicRenderConfig(),
			});
			this.floatButtom = new FloatButton({
				onClick : function() {
					Util.goPage('app/newPacking', true);
				}
			});

			this.on('show', function() {
				this.floatButtonRegion.show(this.floatButtom);
				this.containerPackingsRegion.show(this.cardCollectionView);
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
					Util.goPage('app/editPacking/' + model.get('id'), true);
				}
			}
		}
	});
	return PagePacking;
});
