define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Backgrid = require('adapters/backgrid-adapter');
	var util = require('utilities/utils');
	var Combobox = require('views/components/Combobox');

	var CardApplicationItemTemplate = require('text!views/application/tpl/CardApplicationItemTemplate.html');

	var CardItem = Marionette.ItemView.extend({
		template : _.template(CardApplicationItemTemplate),
		className : "col-lg-3 animated-panel zoomIn",
		ui : {
			descEntities : 'desc-entities',
		},
		initialize : function(options) {
			var that = this;
			this.on('show', function() {
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
		className : 'nd2-card',
		template : "<div > <p class='text-center'> Sem registros para exibir</p> </div>"
	});
	var CardCollection = Marionette.CollectionView.extend({
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