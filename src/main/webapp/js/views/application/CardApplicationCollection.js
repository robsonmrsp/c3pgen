define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Backgrid = require('adapters/backgrid-adapter');
	var util = require('utilities/utils');
	var ApplicationModel = require('models/ApplicationModel');
	var Combobox = require('views/components/Combobox');
	var download = require('download');

	var CardApplicationItemTemplate = require('text!views/application/tpl/CardApplicationItemTemplate.html');
	var EmptyCollectionTemplate = require('text!views/application/tpl/EmptyCollectionTemplate.html');
	var skins = [];
	skins['homer'] = 'https://wrapbootstrap.com/theme/homer-responsive-admin-theme-WB055J451';
	skins['inspinia'] = 'https://wrapbootstrap.com/theme/inspinia-responsive-admin-theme-WB0R5L90S';
	skins['ace'] = 'https://wrapbootstrap.com/theme/ace-responsive-admin-template-WB0B30DGR';
	skins['sprflat'] = 'http://bootstrapbay.com/theme/sprflat-responsive-admin-template-B34CE2F';

	var CardItem = Marionette.ItemView.extend({
		template : _.template(CardApplicationItemTemplate),
		className : "col-lg-6 card-application",
		events : {
			'click .bt-gerar' : 'geraAplicacao'
		},
		ui : {
			descEntities : '.desc-entities',
			skinName : '.skin-name',
			displaySkin : '.pe-7s-display1',
		},
		geraAplicacao : function() {
			var old = this.model.url;
			var that = this;
			this.model.url = 'rs/crud/applications/generator/' + this.model.get('id');
			this.model.fetch({
				success : function(_model, _resp, _options) {
					that.model.url = old;
					util.showMessage('info', _resp.resp);
					download(_resp.resp);
				},
				error : function(_model, _resp, _options) {
					util.showMessage('error', util.getJson(_resp.responseText).legalMessage || '');
					that.model.url = old;
				}
			});
		},
		initialize : function(options) {
			var that = this;
			this.on('show', function() {

				this.ui.skinName.attr('href', skins[this.model.get('skin')]);
				this.ui.displaySkin.tooltip();
				var entities = this.model.get('entities');
				var content = "";
				_.each(entities, function(ent) {
					content += ent.name + ", ";
				})
				that.ui.descEntities.text(content)
			})
		},
	});
	var NoChildsView = Backbone.Marionette.ItemView.extend({
		className : 'row show-grid',
		template : _.template(EmptyCollectionTemplate),
	});
	var CardCollection = Marionette.CollectionView.extend({
		className : 'row-fluid',
		childView : CardItem,
		emptyView : NoChildsView,
		// passa aos filhos essa configuração
		childViewOptions : function() {

		},

		initialize : function(opt) {

		},
	})
	return CardCollection;
})