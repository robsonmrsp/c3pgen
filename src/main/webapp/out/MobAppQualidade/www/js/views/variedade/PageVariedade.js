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
	var VariedadeCollection = require('collections/VariedadeCollection');
	var VariedadeModel = require('models/VariedadeModel');
	var PageVariedadeTemplate = require('text!views/variedade/tpl/PageVariedadeTemplate.html');

	var PageVariedade = Marionette.LayoutView.extend({
		template : _.template(PageVariedadeTemplate),

		regions : {
			floatButtonRegion : '#floatButton',
			containerVariedadesRegion : '#containerVariedades',
		},

		ui : {

		},

		initialize : function() {
			this.variedades = new VariedadeCollection();
			this.variedades.fetch()
			this.cardCollectionView = new CardCollectionView({
				collection : this.variedades,
				renderConfig : this._getBasicRenderConfig(),
			});
			this.floatButtom = new FloatButton({
				onClick : function() {
					Util.goPage('app/newVariedade', true);
				}
			});

			this.on('show', function() {
				this.floatButtonRegion.show(this.floatButtom);
				this.containerVariedadesRegion.show(this.cardCollectionView);
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
					Util.goPage('app/editVariedade/' + model.get('id'), true);
				}
			}
		}
	});
	return PageVariedade;
});
