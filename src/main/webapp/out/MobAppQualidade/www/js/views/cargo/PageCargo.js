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
	var CargoCollection = require('collections/CargoCollection');
	var CargoModel = require('models/CargoModel');
	var PageCargoTemplate = require('text!views/cargo/tpl/PageCargoTemplate.html');

	var PageCargo = Marionette.LayoutView.extend({
		template : _.template(PageCargoTemplate),

		regions : {
			floatButtonRegion : '#floatButton',
			containerCargosRegion : '#containerCargos',
		},

		ui : {

		},

		initialize : function() {
			this.cargos = new CargoCollection();
			this.cargos.fetch()
			this.cardCollectionView = new CardCollectionView({
				collection : this.cargos,
				renderConfig : this._getBasicRenderConfig(),
			});
			this.floatButtom = new FloatButton({
				onClick : function() {
					Util.goPage('app/newCargo', true);
				}
			});

			this.on('show', function() {
				this.floatButtonRegion.show(this.floatButtom);
				this.containerCargosRegion.show(this.cardCollectionView);
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
					Util.goPage('app/editCargo/' + model.get('id'), true);
				}
			}
		}
	});
	return PageCargo;
});
