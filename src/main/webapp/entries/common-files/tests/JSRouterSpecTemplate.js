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
		it("Rota de '${entity.name}s'", function() {
			spyOn(Router.prototype, "${firstLower(entity.name)}s")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/${firstLower(entity.name)}s', true);
			expect(Router.prototype.${firstLower(entity.name)}s).toHaveBeenCalled();
		});

		it("Rota de 'new${entity.name}'", function() {
			spyOn(Router.prototype, "new${entity.name}")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/new${entity.name}', true);
			expect(Router.prototype.new${entity.name}).toHaveBeenCalled();
		});
		
		it("Rota de 'edit${entity.name}'", function() {
			spyOn(Router.prototype, "edit${entity.name}")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/edit${entity.name}/1', true);
			expect(Router.prototype.edit${entity.name}).toHaveBeenCalled();
		});
		</#list>
	});
})
