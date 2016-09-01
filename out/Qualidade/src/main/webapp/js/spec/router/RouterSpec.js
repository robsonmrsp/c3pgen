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
				it("Rota de \"Anexos\"", function() {
			spyOn(Router.prototype, "Anexos")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Anexos', true);
			expect(Router.prototype.Anexos).toHaveBeenCalled();
		});

		it("Rota de \"newanexo\"", function() {
			spyOn(Router.prototype, "newanexo")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newanexo', true);
			expect(Router.prototype.newanexo).toHaveBeenCalled();
		});
		
		it("Rota de \"editanexo\"", function() {
			spyOn(Router.prototype, "editanexo")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editanexo/1', true);
			expect(Router.prototype.editanexo).toHaveBeenCalled();
		});
		it("Rota de \"ApontamentoQualidadePackings\"", function() {
			spyOn(Router.prototype, "ApontamentoQualidadePackings")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/ApontamentoQualidadePackings', true);
			expect(Router.prototype.ApontamentoQualidadePackings).toHaveBeenCalled();
		});

		it("Rota de \"newapontamentoQualidadePacking\"", function() {
			spyOn(Router.prototype, "newapontamentoQualidadePacking")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newapontamentoQualidadePacking', true);
			expect(Router.prototype.newapontamentoQualidadePacking).toHaveBeenCalled();
		});
		
		it("Rota de \"editapontamentoQualidadePacking\"", function() {
			spyOn(Router.prototype, "editapontamentoQualidadePacking")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editapontamentoQualidadePacking/1', true);
			expect(Router.prototype.editapontamentoQualidadePacking).toHaveBeenCalled();
		});
		it("Rota de \"Bolsaos\"", function() {
			spyOn(Router.prototype, "Bolsaos")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Bolsaos', true);
			expect(Router.prototype.Bolsaos).toHaveBeenCalled();
		});

		it("Rota de \"newbolsao\"", function() {
			spyOn(Router.prototype, "newbolsao")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newbolsao', true);
			expect(Router.prototype.newbolsao).toHaveBeenCalled();
		});
		
		it("Rota de \"editbolsao\"", function() {
			spyOn(Router.prototype, "editbolsao")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editbolsao/1', true);
			expect(Router.prototype.editbolsao).toHaveBeenCalled();
		});
		it("Rota de \"Cabines\"", function() {
			spyOn(Router.prototype, "Cabines")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Cabines', true);
			expect(Router.prototype.Cabines).toHaveBeenCalled();
		});

		it("Rota de \"newcabine\"", function() {
			spyOn(Router.prototype, "newcabine")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newcabine', true);
			expect(Router.prototype.newcabine).toHaveBeenCalled();
		});
		
		it("Rota de \"editcabine\"", function() {
			spyOn(Router.prototype, "editcabine")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editcabine/1', true);
			expect(Router.prototype.editcabine).toHaveBeenCalled();
		});
		it("Rota de \"Cargos\"", function() {
			spyOn(Router.prototype, "Cargos")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Cargos', true);
			expect(Router.prototype.Cargos).toHaveBeenCalled();
		});

		it("Rota de \"newcargo\"", function() {
			spyOn(Router.prototype, "newcargo")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newcargo', true);
			expect(Router.prototype.newcargo).toHaveBeenCalled();
		});
		
		it("Rota de \"editcargo\"", function() {
			spyOn(Router.prototype, "editcargo")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editcargo/1', true);
			expect(Router.prototype.editcargo).toHaveBeenCalled();
		});
		it("Rota de \"Cbos\"", function() {
			spyOn(Router.prototype, "Cbos")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Cbos', true);
			expect(Router.prototype.Cbos).toHaveBeenCalled();
		});

		it("Rota de \"newcbo\"", function() {
			spyOn(Router.prototype, "newcbo")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newcbo', true);
			expect(Router.prototype.newcbo).toHaveBeenCalled();
		});
		
		it("Rota de \"editcbo\"", function() {
			spyOn(Router.prototype, "editcbo")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editcbo/1', true);
			expect(Router.prototype.editcbo).toHaveBeenCalled();
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
		it("Rota de \"Cors\"", function() {
			spyOn(Router.prototype, "Cors")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Cors', true);
			expect(Router.prototype.Cors).toHaveBeenCalled();
		});

		it("Rota de \"newcor\"", function() {
			spyOn(Router.prototype, "newcor")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newcor', true);
			expect(Router.prototype.newcor).toHaveBeenCalled();
		});
		
		it("Rota de \"editcor\"", function() {
			spyOn(Router.prototype, "editcor")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editcor/1', true);
			expect(Router.prototype.editcor).toHaveBeenCalled();
		});
		it("Rota de \"Departamentos\"", function() {
			spyOn(Router.prototype, "Departamentos")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Departamentos', true);
			expect(Router.prototype.Departamentos).toHaveBeenCalled();
		});

		it("Rota de \"newdepartamento\"", function() {
			spyOn(Router.prototype, "newdepartamento")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newdepartamento', true);
			expect(Router.prototype.newdepartamento).toHaveBeenCalled();
		});
		
		it("Rota de \"editdepartamento\"", function() {
			spyOn(Router.prototype, "editdepartamento")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editdepartamento/1', true);
			expect(Router.prototype.editdepartamento).toHaveBeenCalled();
		});
		it("Rota de \"Embalagems\"", function() {
			spyOn(Router.prototype, "Embalagems")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Embalagems', true);
			expect(Router.prototype.Embalagems).toHaveBeenCalled();
		});

		it("Rota de \"newembalagem\"", function() {
			spyOn(Router.prototype, "newembalagem")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newembalagem', true);
			expect(Router.prototype.newembalagem).toHaveBeenCalled();
		});
		
		it("Rota de \"editembalagem\"", function() {
			spyOn(Router.prototype, "editembalagem")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editembalagem/1', true);
			expect(Router.prototype.editembalagem).toHaveBeenCalled();
		});
		it("Rota de \"Funcaos\"", function() {
			spyOn(Router.prototype, "Funcaos")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Funcaos', true);
			expect(Router.prototype.Funcaos).toHaveBeenCalled();
		});

		it("Rota de \"newfuncao\"", function() {
			spyOn(Router.prototype, "newfuncao")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newfuncao', true);
			expect(Router.prototype.newfuncao).toHaveBeenCalled();
		});
		
		it("Rota de \"editfuncao\"", function() {
			spyOn(Router.prototype, "editfuncao")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editfuncao/1', true);
			expect(Router.prototype.editfuncao).toHaveBeenCalled();
		});
		it("Rota de \"Funcionarios\"", function() {
			spyOn(Router.prototype, "Funcionarios")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Funcionarios', true);
			expect(Router.prototype.Funcionarios).toHaveBeenCalled();
		});

		it("Rota de \"newfuncionario\"", function() {
			spyOn(Router.prototype, "newfuncionario")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newfuncionario', true);
			expect(Router.prototype.newfuncionario).toHaveBeenCalled();
		});
		
		it("Rota de \"editfuncionario\"", function() {
			spyOn(Router.prototype, "editfuncionario")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editfuncionario/1', true);
			expect(Router.prototype.editfuncionario).toHaveBeenCalled();
		});
		it("Rota de \"Generadors\"", function() {
			spyOn(Router.prototype, "Generadors")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Generadors', true);
			expect(Router.prototype.Generadors).toHaveBeenCalled();
		});

		it("Rota de \"newgenerador\"", function() {
			spyOn(Router.prototype, "newgenerador")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newgenerador', true);
			expect(Router.prototype.newgenerador).toHaveBeenCalled();
		});
		
		it("Rota de \"editgenerador\"", function() {
			spyOn(Router.prototype, "editgenerador")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editgenerador/1', true);
			expect(Router.prototype.editgenerador).toHaveBeenCalled();
		});
		it("Rota de \"Latadas\"", function() {
			spyOn(Router.prototype, "Latadas")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Latadas', true);
			expect(Router.prototype.Latadas).toHaveBeenCalled();
		});

		it("Rota de \"newlatada\"", function() {
			spyOn(Router.prototype, "newlatada")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newlatada', true);
			expect(Router.prototype.newlatada).toHaveBeenCalled();
		});
		
		it("Rota de \"editlatada\"", function() {
			spyOn(Router.prototype, "editlatada")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editlatada/1', true);
			expect(Router.prototype.editlatada).toHaveBeenCalled();
		});
		it("Rota de \"Packings\"", function() {
			spyOn(Router.prototype, "Packings")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Packings', true);
			expect(Router.prototype.Packings).toHaveBeenCalled();
		});

		it("Rota de \"newpacking\"", function() {
			spyOn(Router.prototype, "newpacking")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newpacking', true);
			expect(Router.prototype.newpacking).toHaveBeenCalled();
		});
		
		it("Rota de \"editpacking\"", function() {
			spyOn(Router.prototype, "editpacking")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editpacking/1', true);
			expect(Router.prototype.editpacking).toHaveBeenCalled();
		});
		it("Rota de \"Sacolas\"", function() {
			spyOn(Router.prototype, "Sacolas")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Sacolas', true);
			expect(Router.prototype.Sacolas).toHaveBeenCalled();
		});

		it("Rota de \"newsacola\"", function() {
			spyOn(Router.prototype, "newsacola")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newsacola', true);
			expect(Router.prototype.newsacola).toHaveBeenCalled();
		});
		
		it("Rota de \"editsacola\"", function() {
			spyOn(Router.prototype, "editsacola")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editsacola/1', true);
			expect(Router.prototype.editsacola).toHaveBeenCalled();
		});
		it("Rota de \"Variedades\"", function() {
			spyOn(Router.prototype, "Variedades")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Variedades', true);
			expect(Router.prototype.Variedades).toHaveBeenCalled();
		});

		it("Rota de \"newvariedade\"", function() {
			spyOn(Router.prototype, "newvariedade")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newvariedade', true);
			expect(Router.prototype.newvariedade).toHaveBeenCalled();
		});
		
		it("Rota de \"editvariedade\"", function() {
			spyOn(Router.prototype, "editvariedade")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editvariedade/1', true);
			expect(Router.prototype.editvariedade).toHaveBeenCalled();
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
