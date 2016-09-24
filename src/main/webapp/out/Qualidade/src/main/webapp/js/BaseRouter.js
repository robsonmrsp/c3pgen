define(function(require) {
	var AppRouter = Backbone.Router.extend({
		routes : {
			'' : 'index',
		},
	});
	var initialize = function() {
		App = new Marionette.Application();
		App.addRegions({
			mainRegion : ".main-content"
		});
		var appRouter = new AppRouter;
		var that = appRouter;

		appRouter.on('route:index', function() {
			util.markActiveItem('dashboard');
		});

		Backbone.history.start();
	};
	return {
		initialize : initialize
	};
});
