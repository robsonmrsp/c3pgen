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
	var ClienteCollection = require('collections/ClienteCollection');
	var ClienteModel = require('models/ClienteModel');
	var PageClienteTemplate = require('text!views/cliente/tpl/PageClienteTemplate.html');

	var PageCliente = Marionette.LayoutView.extend({
		template : _.template(PageClienteTemplate),

		regions : {
			floatButtonRegion : '#floatButton',
			containerClientesRegion : '#containerClientes',
		},

		ui : {

		},

		initialize : function() {
			this.clientes = new ClienteCollection();
			this.clientes.fetch()
			this.cardCollectionView = new CardCollectionView({
				collection : this.clientes,
				renderConfig : this._getBasicRenderConfig(),
			});
			this.floatButtom = new FloatButton({
				onClick : function() {
					Util.goPage('app/newCliente', true);
				}
			});

			this.on('show', function() {
				this.floatButtonRegion.show(this.floatButtom);
				this.containerClientesRegion.show(this.cardCollectionView);
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
				secondaryInfo : {
					name : 'nomeFantasia',
				},
				tertiaryInfo : {
					name : 'nomeContato',
					//formatter : function(dataLancamento) {
					//	return 'Lancado em : ' + Util.moment(dataLancamento, 'YYYY-MM-DD').format('DD/MM/YYYY');
					//}
				},

				onCancel : function(model) {
					console.log(model);
					Util.confirmDelete(function() {
						model.destroy();
					});
				},

				onSave : function(model) {
					Util.goPage('app/editCliente/' + model.get('id'), true);
				}
			}
		}
	});
	return PageCliente;
});
