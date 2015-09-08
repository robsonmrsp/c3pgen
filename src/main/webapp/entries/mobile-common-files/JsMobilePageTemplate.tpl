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
	var ${firstUpper(entity.name)}Collection = require('collections/${firstUpper(entity.name)}Collection');
	var ${firstUpper(entity.name)}Model = require('models/${firstUpper(entity.name)}Model');
	var Page${firstUpper(entity.name)}Template = require('text!views/${firstLower(entity.name)}/tpl/Page${firstUpper(entity.name)}Template.html');

	var Page${firstUpper(entity.name)} = Marionette.LayoutView.extend({
		template : _.template(Page${firstUpper(entity.name)}Template),

		regions : {
			floatButtonRegion : '#floatButton',
			container${firstUpper(entity.name)}sRegion : '#container${firstUpper(entity.name)}s',
		},

		ui : {

		},

		initialize : function() {
			this.${firstLower(entity.name)}s = new ${firstUpper(entity.name)}Collection();
			this.${firstLower(entity.name)}s.fetch()
			this.cardCollectionView = new CardCollectionView({
				collection : this.${firstLower(entity.name)}s,
				renderConfig : this._getBasicRenderConfig(),
			});
			this.floatButtom = new FloatButton({
				onClick : function() {
					Util.goPage('app/new${firstUpper(entity.name)}', true);
				}
			});

			this.on('show', function() {
				this.floatButtonRegion.show(this.floatButtom);
				this.container${firstUpper(entity.name)}sRegion.show(this.cardCollectionView);
			})
		},
		
		_getBasicRenderConfig : function() {
			return {
				// Na hora de escrever os arquivos de configuração, fazer por
				// onde os primeiros elementos serem os mais importantes. pra
				// poder gerar essa linha abaixo.
				<#if entity.primaryAttribute??>
				primaryInfo : {
					name : '${entity.primaryAttribute.name}',
				},
				</#if>
				<#if entity.secondaryAttribute??>
				secondaryInfo : {
					name : '${entity.secondaryAttribute.name}',
				},
				</#if>
				<#if entity.tertiaryAttribute??>
				tertiaryInfo : {
					name : '${entity.tertiaryAttribute.name}',
					//formatter : function(dataLancamento) {
					//	return 'Lancado em : ' + Util.moment(dataLancamento, 'YYYY-MM-DD').format('DD/MM/YYYY');
					//}
				},
				</#if>

				onCancel : function(model) {
					console.log(model);
					Util.confirmDelete(function() {
						model.destroy();
					});
				},

				onSave : function(model) {
					Util.goPage('app/edit${firstUpper(entity.name)}/' + model.get('id'), true);
				}
			}
		}
	});
	return Page${firstUpper(entity.name)};
});
