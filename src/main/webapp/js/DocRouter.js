define(function(require) {
	var $ = require('jquery');
	var _ = require('adapters/underscore-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var util = require('utilities/utils');

	var PageDocDataTable = require('views/documentacao/dataTable/PageDocDataTable');

	util.NProgress.setBlockerPanel('block_panel');

	// REMOVER ESSA GAMBA NO FUTURO
	$('#wrapper').height($(window).height() - 62);
	$(window).resize(function(a, b, c) {
		$('#wrapper').height($(window).height() - 62);
	});

	var CustomRegion = Marionette.Region.extend({
		el : ".main-content",

		attachHtml : function(view) {
			this.$el.hide();
			this.$el.html(view.el);
			// this.$el.slideDown(300);
			// this.$el.show("slide", { direction: "up" }, 300);
			util.scrollTop();
			this.$el.fadeIn(300);
			view.listenTo(view, 'show', function() {
				setTimeout(function() {
					util.NProgress.done(false, true);
				}, 100);
			});
		},
	});

	var AppRouter = Backbone.Router.extend({
		routes : {
			'app/docs/dataTables' : 'dataTables',
		},

		initialize : function() {
			this.App = new Marionette.Application();
			this.App.addRegions({
				mainRegion : CustomRegion
			});

			this.on('route', function(abc) {
				util.NProgress.start(true);
			});
		},

		dataTables : function() {

			this.App.mainRegion.show(new PageDocDataTable());

		},

		start : function() {
			Backbone.history.start();
		}
	});
	return AppRouter;
});
