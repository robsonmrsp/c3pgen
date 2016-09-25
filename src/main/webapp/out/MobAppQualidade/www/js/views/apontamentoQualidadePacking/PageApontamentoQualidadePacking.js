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
	var ApontamentoQualidadePackingCollection = require('collections/ApontamentoQualidadePackingCollection');
	var ApontamentoQualidadePackingModel = require('models/ApontamentoQualidadePackingModel');
	var PageApontamentoQualidadePackingTemplate = require('text!views/apontamentoQualidadePacking/tpl/PageApontamentoQualidadePackingTemplate.html');

	var PageApontamentoQualidadePacking = Marionette.LayoutView.extend({
		template : _.template(PageApontamentoQualidadePackingTemplate),

		regions : {
			floatButtonRegion : '#floatButton',
			containerApontamentoQualidadePackingsRegion : '#containerApontamentoQualidadePackings',
		},

		ui : {

		},

		initialize : function() {
			this.apontamentoQualidadePackings = new ApontamentoQualidadePackingCollection();
			this.apontamentoQualidadePackings.fetch()
			this.cardCollectionView = new CardCollectionView({
				collection : this.apontamentoQualidadePackings,
				renderConfig : this._getBasicRenderConfig(),
			});
			this.floatButtom = new FloatButton({
				onClick : function() {
					Util.goPage('app/newApontamentoQualidadePacking', true);
				}
			});

			this.on('show', function() {
				this.floatButtonRegion.show(this.floatButtom);
				this.containerApontamentoQualidadePackingsRegion.show(this.cardCollectionView);
			})
		},
		
		_getBasicRenderConfig : function() {
			return {
				// Na hora de escrever os arquivos de configuração, fazer por
				// onde os primeiros elementos serem os mais importantes. pra
				// poder gerar essa linha abaixo.
				primaryInfo : {
					name : 'aparencia',
				},
				secondaryInfo : {
					name : 'diametroMinimo',
				},
				tertiaryInfo : {
					name : 'diametroMaximo',
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
					Util.goPage('app/editApontamentoQualidadePacking/' + model.get('id'), true);
				}
			}
		}
	});
	return PageApontamentoQualidadePacking;
});
