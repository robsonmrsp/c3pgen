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
				it("Rota de \"Applications\"", function() {
			spyOn(Router.prototype, "Applications")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Applications', true);
			expect(Router.prototype.Applications).toHaveBeenCalled();
		});

		it("Rota de \"newapplication\"", function() {
			spyOn(Router.prototype, "newapplication")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newapplication', true);
			expect(Router.prototype.newapplication).toHaveBeenCalled();
		});
		
		it("Rota de \"editapplication\"", function() {
			spyOn(Router.prototype, "editapplication")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editapplication/1', true);
			expect(Router.prototype.editapplication).toHaveBeenCalled();
		});
		it("Rota de \"Attributes\"", function() {
			spyOn(Router.prototype, "Attributes")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Attributes', true);
			expect(Router.prototype.Attributes).toHaveBeenCalled();
		});

		it("Rota de \"newattribute\"", function() {
			spyOn(Router.prototype, "newattribute")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newattribute', true);
			expect(Router.prototype.newattribute).toHaveBeenCalled();
		});
		
		it("Rota de \"editattribute\"", function() {
			spyOn(Router.prototype, "editattribute")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editattribute/1', true);
			expect(Router.prototype.editattribute).toHaveBeenCalled();
		});
		it("Rota de \"AttributeTypes\"", function() {
			spyOn(Router.prototype, "AttributeTypes")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/AttributeTypes', true);
			expect(Router.prototype.AttributeTypes).toHaveBeenCalled();
		});

		it("Rota de \"newattributeType\"", function() {
			spyOn(Router.prototype, "newattributeType")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newattributeType', true);
			expect(Router.prototype.newattributeType).toHaveBeenCalled();
		});
		
		it("Rota de \"editattributeType\"", function() {
			spyOn(Router.prototype, "editattributeType")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editattributeType/1', true);
			expect(Router.prototype.editattributeType).toHaveBeenCalled();
		});
		it("Rota de \"TheEntitys\"", function() {
			spyOn(Router.prototype, "TheEntitys")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/TheEntitys', true);
			expect(Router.prototype.TheEntitys).toHaveBeenCalled();
		});

		it("Rota de \"newtheEntity\"", function() {
			spyOn(Router.prototype, "newtheEntity")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newtheEntity', true);
			expect(Router.prototype.newtheEntity).toHaveBeenCalled();
		});
		
		it("Rota de \"edittheEntity\"", function() {
			spyOn(Router.prototype, "edittheEntity")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/edittheEntity/1', true);
			expect(Router.prototype.edittheEntity).toHaveBeenCalled();
		});
		it("Rota de \"Relationships\"", function() {
			spyOn(Router.prototype, "Relationships")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Relationships', true);
			expect(Router.prototype.Relationships).toHaveBeenCalled();
		});

		it("Rota de \"newrelationship\"", function() {
			spyOn(Router.prototype, "newrelationship")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newrelationship', true);
			expect(Router.prototype.newrelationship).toHaveBeenCalled();
		});
		
		it("Rota de \"editrelationship\"", function() {
			spyOn(Router.prototype, "editrelationship")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editrelationship/1', true);
			expect(Router.prototype.editrelationship).toHaveBeenCalled();
		});
		it("Rota de \"ViewApproachs\"", function() {
			spyOn(Router.prototype, "ViewApproachs")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/ViewApproachs', true);
			expect(Router.prototype.ViewApproachs).toHaveBeenCalled();
		});

		it("Rota de \"newviewApproach\"", function() {
			spyOn(Router.prototype, "newviewApproach")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newviewApproach', true);
			expect(Router.prototype.newviewApproach).toHaveBeenCalled();
		});
		
		it("Rota de \"editviewApproach\"", function() {
			spyOn(Router.prototype, "editviewApproach")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editviewApproach/1', true);
			expect(Router.prototype.editviewApproach).toHaveBeenCalled();
		});
		it("Rota de \"Bairros\"", function() {
			spyOn(Router.prototype, "Bairros")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Bairros', true);
			expect(Router.prototype.Bairros).toHaveBeenCalled();
		});

		it("Rota de \"newbairro\"", function() {
			spyOn(Router.prototype, "newbairro")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newbairro', true);
			expect(Router.prototype.newbairro).toHaveBeenCalled();
		});
		
		it("Rota de \"editbairro\"", function() {
			spyOn(Router.prototype, "editbairro")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editbairro/1', true);
			expect(Router.prototype.editbairro).toHaveBeenCalled();
		});
		it("Rota de \"Ceps\"", function() {
			spyOn(Router.prototype, "Ceps")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Ceps', true);
			expect(Router.prototype.Ceps).toHaveBeenCalled();
		});

		it("Rota de \"newcep\"", function() {
			spyOn(Router.prototype, "newcep")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newcep', true);
			expect(Router.prototype.newcep).toHaveBeenCalled();
		});
		
		it("Rota de \"editcep\"", function() {
			spyOn(Router.prototype, "editcep")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editcep/1', true);
			expect(Router.prototype.editcep).toHaveBeenCalled();
		});
		it("Rota de \"Cidades\"", function() {
			spyOn(Router.prototype, "Cidades")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Cidades', true);
			expect(Router.prototype.Cidades).toHaveBeenCalled();
		});

		it("Rota de \"newcidade\"", function() {
			spyOn(Router.prototype, "newcidade")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newcidade', true);
			expect(Router.prototype.newcidade).toHaveBeenCalled();
		});
		
		it("Rota de \"editcidade\"", function() {
			spyOn(Router.prototype, "editcidade")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editcidade/1', true);
			expect(Router.prototype.editcidade).toHaveBeenCalled();
		});
		it("Rota de \"Enderecos\"", function() {
			spyOn(Router.prototype, "Enderecos")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Enderecos', true);
			expect(Router.prototype.Enderecos).toHaveBeenCalled();
		});

		it("Rota de \"newendereco\"", function() {
			spyOn(Router.prototype, "newendereco")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newendereco', true);
			expect(Router.prototype.newendereco).toHaveBeenCalled();
		});
		
		it("Rota de \"editendereco\"", function() {
			spyOn(Router.prototype, "editendereco")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editendereco/1', true);
			expect(Router.prototype.editendereco).toHaveBeenCalled();
		});
		it("Rota de \"Estados\"", function() {
			spyOn(Router.prototype, "Estados")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Estados', true);
			expect(Router.prototype.Estados).toHaveBeenCalled();
		});

		it("Rota de \"newestado\"", function() {
			spyOn(Router.prototype, "newestado")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newestado', true);
			expect(Router.prototype.newestado).toHaveBeenCalled();
		});
		
		it("Rota de \"editestado\"", function() {
			spyOn(Router.prototype, "editestado")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editestado/1', true);
			expect(Router.prototype.editestado).toHaveBeenCalled();
		});
		it("Rota de \"Paiss\"", function() {
			spyOn(Router.prototype, "Paiss")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Paiss', true);
			expect(Router.prototype.Paiss).toHaveBeenCalled();
		});

		it("Rota de \"newpais\"", function() {
			spyOn(Router.prototype, "newpais")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newpais', true);
			expect(Router.prototype.newpais).toHaveBeenCalled();
		});
		
		it("Rota de \"editpais\"", function() {
			spyOn(Router.prototype, "editpais")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editpais/1', true);
			expect(Router.prototype.editpais).toHaveBeenCalled();
		});
		it("Rota de \"Clients\"", function() {
			spyOn(Router.prototype, "Clients")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Clients', true);
			expect(Router.prototype.Clients).toHaveBeenCalled();
		});

		it("Rota de \"newclient\"", function() {
			spyOn(Router.prototype, "newclient")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newclient', true);
			expect(Router.prototype.newclient).toHaveBeenCalled();
		});
		
		it("Rota de \"editclient\"", function() {
			spyOn(Router.prototype, "editclient")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editclient/1', true);
			expect(Router.prototype.editclient).toHaveBeenCalled();
		});
		it("Rota de \"Clientes\"", function() {
			spyOn(Router.prototype, "Clientes")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Clientes', true);
			expect(Router.prototype.Clientes).toHaveBeenCalled();
		});

		it("Rota de \"newcliente\"", function() {
			spyOn(Router.prototype, "newcliente")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newcliente', true);
			expect(Router.prototype.newcliente).toHaveBeenCalled();
		});
		
		it("Rota de \"editcliente\"", function() {
			spyOn(Router.prototype, "editcliente")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editcliente/1', true);
			expect(Router.prototype.editcliente).toHaveBeenCalled();
		});
		it("Rota de \"Items\"", function() {
			spyOn(Router.prototype, "Items")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Items', true);
			expect(Router.prototype.Items).toHaveBeenCalled();
		});

		it("Rota de \"newitem\"", function() {
			spyOn(Router.prototype, "newitem")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newitem', true);
			expect(Router.prototype.newitem).toHaveBeenCalled();
		});
		
		it("Rota de \"edititem\"", function() {
			spyOn(Router.prototype, "edititem")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/edititem/1', true);
			expect(Router.prototype.edititem).toHaveBeenCalled();
		});
		it("Rota de \"ItemTypes\"", function() {
			spyOn(Router.prototype, "ItemTypes")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/ItemTypes', true);
			expect(Router.prototype.ItemTypes).toHaveBeenCalled();
		});

		it("Rota de \"newitemType\"", function() {
			spyOn(Router.prototype, "newitemType")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newitemType', true);
			expect(Router.prototype.newitemType).toHaveBeenCalled();
		});
		
		it("Rota de \"edititemType\"", function() {
			spyOn(Router.prototype, "edititemType")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/edititemType/1', true);
			expect(Router.prototype.edititemType).toHaveBeenCalled();
		});
		it("Rota de \"Operations\"", function() {
			spyOn(Router.prototype, "Operations")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Operations', true);
			expect(Router.prototype.Operations).toHaveBeenCalled();
		});

		it("Rota de \"newoperation\"", function() {
			spyOn(Router.prototype, "newoperation")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newoperation', true);
			expect(Router.prototype.newoperation).toHaveBeenCalled();
		});
		
		it("Rota de \"editoperation\"", function() {
			spyOn(Router.prototype, "editoperation")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editoperation/1', true);
			expect(Router.prototype.editoperation).toHaveBeenCalled();
		});
		it("Rota de \"Permissions\"", function() {
			spyOn(Router.prototype, "Permissions")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Permissions', true);
			expect(Router.prototype.Permissions).toHaveBeenCalled();
		});

		it("Rota de \"newpermission\"", function() {
			spyOn(Router.prototype, "newpermission")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newpermission', true);
			expect(Router.prototype.newpermission).toHaveBeenCalled();
		});
		
		it("Rota de \"editpermission\"", function() {
			spyOn(Router.prototype, "editpermission")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editpermission/1', true);
			expect(Router.prototype.editpermission).toHaveBeenCalled();
		});
		it("Rota de \"Roles\"", function() {
			spyOn(Router.prototype, "Roles")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Roles', true);
			expect(Router.prototype.Roles).toHaveBeenCalled();
		});

		it("Rota de \"newrole\"", function() {
			spyOn(Router.prototype, "newrole")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newrole', true);
			expect(Router.prototype.newrole).toHaveBeenCalled();
		});
		
		it("Rota de \"editrole\"", function() {
			spyOn(Router.prototype, "editrole")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editrole/1', true);
			expect(Router.prototype.editrole).toHaveBeenCalled();
		});
		it("Rota de \"Sessions\"", function() {
			spyOn(Router.prototype, "Sessions")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Sessions', true);
			expect(Router.prototype.Sessions).toHaveBeenCalled();
		});

		it("Rota de \"newsession\"", function() {
			spyOn(Router.prototype, "newsession")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newsession', true);
			expect(Router.prototype.newsession).toHaveBeenCalled();
		});
		
		it("Rota de \"editsession\"", function() {
			spyOn(Router.prototype, "editsession")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editsession/1', true);
			expect(Router.prototype.editsession).toHaveBeenCalled();
		});
		it("Rota de \"Users\"", function() {
			spyOn(Router.prototype, "Users")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Users', true);
			expect(Router.prototype.Users).toHaveBeenCalled();
		});

		it("Rota de \"newuser\"", function() {
			spyOn(Router.prototype, "newuser")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newuser', true);
			expect(Router.prototype.newuser).toHaveBeenCalled();
		});
		
		it("Rota de \"edituser\"", function() {
			spyOn(Router.prototype, "edituser")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/edituser/1', true);
			expect(Router.prototype.edituser).toHaveBeenCalled();
		});
	});
})
