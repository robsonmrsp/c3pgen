define(function(require) {
	var Router = require('Router');
	describe("Rotas", function() {

		beforeEach(function() {
			try {
				Backbone.history.stop();
			} catch (e) {
				console.error(e);
			}
		});
		
		afterEach(function() {
			// Reset URL
			var router = new Router();
			router.navigate("");
		});
		<#list application.entities as entity>
		it("Rota de \"${entity.name}s\"", function() {
			spyOn(Router.prototype, "${entity.name}s")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/${entity.name}s', true);
			expect(Router.prototype.${entity.name}s).toHaveBeenCalled();
		});

		it("Rota de \"new${firstLower(entity.name)}\"", function() {
			spyOn(Router.prototype, "new${firstLower(entity.name)}")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/new${firstLower(entity.name)}', true);
			expect(Router.prototype.new${firstLower(entity.name)}).toHaveBeenCalled();
		});
		
		it("Rota de \"edit${firstLower(entity.name)}\"", function() {
			spyOn(Router.prototype, "edit${firstLower(entity.name)}")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/edit${firstLower(entity.name)}/1', true);
			expect(Router.prototype.edit${firstLower(entity.name)}).toHaveBeenCalled();
		});
		</#list>
	});
})
