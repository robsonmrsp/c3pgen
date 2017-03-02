define(function(require) {
	var $ = require('adapters/jquery-adapter');
	var _ = require('adapters/underscore-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var util = require('utilities/utils');
	var BaseModel = require('models/BaseModel');

	var PageAnexo = require('views/anexo/PageAnexo');
	var FormAnexo = require('views/anexo/FormAnexo');
	var AnexoModel = require('models/AnexoModel');

	var PageApontamentoQualidadePacking = require('views/apontamentoQualidadePacking/PageApontamentoQualidadePacking');
	var FormApontamentoQualidadePacking = require('views/apontamentoQualidadePacking/FormApontamentoQualidadePacking');
	var ApontamentoQualidadePackingModel = require('models/ApontamentoQualidadePackingModel');

	var PageBolsao = require('views/bolsao/PageBolsao');
	var FormBolsao = require('views/bolsao/FormBolsao');
	var BolsaoModel = require('models/BolsaoModel');

	var PageCabine = require('views/cabine/PageCabine');
	var FormCabine = require('views/cabine/FormCabine');
	var CabineModel = require('models/CabineModel');

	var PageCargo = require('views/cargo/PageCargo');
	var FormCargo = require('views/cargo/FormCargo');
	var CargoModel = require('models/CargoModel');

	var PageCbo = require('views/cbo/PageCbo');
	var FormCbo = require('views/cbo/FormCbo');
	var CboModel = require('models/CboModel');

	var PageClient = require('views/client/PageClient');
	var FormClient = require('views/client/FormClient');
	var ClientModel = require('models/ClientModel');

	var PageCliente = require('views/cliente/PageCliente');
	var FormCliente = require('views/cliente/FormCliente');
	var ClienteModel = require('models/ClienteModel');

	var PageCor = require('views/cor/PageCor');
	var FormCor = require('views/cor/FormCor');
	var CorModel = require('models/CorModel');

	var PageDepartamento = require('views/departamento/PageDepartamento');
	var FormDepartamento = require('views/departamento/FormDepartamento');
	var DepartamentoModel = require('models/DepartamentoModel');

	var PageEmbalagem = require('views/embalagem/PageEmbalagem');
	var FormEmbalagem = require('views/embalagem/FormEmbalagem');
	var EmbalagemModel = require('models/EmbalagemModel');

	var PageFuncao = require('views/funcao/PageFuncao');
	var FormFuncao = require('views/funcao/FormFuncao');
	var FuncaoModel = require('models/FuncaoModel');

	var PageFuncionario = require('views/funcionario/PageFuncionario');
	var FormFuncionario = require('views/funcionario/FormFuncionario');
	var FuncionarioModel = require('models/FuncionarioModel');

	var PageGenerador = require('views/generador/PageGenerador');
	var FormGenerador = require('views/generador/FormGenerador');
	var GeneradorModel = require('models/GeneradorModel');

	var PageLatada = require('views/latada/PageLatada');
	var FormLatada = require('views/latada/FormLatada');
	var LatadaModel = require('models/LatadaModel');

	var PagePacking = require('views/packing/PagePacking');
	var FormPacking = require('views/packing/FormPacking');
	var PackingModel = require('models/PackingModel');

	var PageSacola = require('views/sacola/PageSacola');
	var FormSacola = require('views/sacola/FormSacola');
	var SacolaModel = require('models/SacolaModel');

	var PageVariedade = require('views/variedade/PageVariedade');
	var FormVariedade = require('views/variedade/FormVariedade');
	var VariedadeModel = require('models/VariedadeModel');

	var PageBairro = require('views/bairro/PageBairro');
	var FormBairro = require('views/bairro/FormBairro');
	var BairroModel = require('models/BairroModel');

	var PageCep = require('views/cep/PageCep');
	var FormCep = require('views/cep/FormCep');
	var CepModel = require('models/CepModel');

	var PageCidade = require('views/cidade/PageCidade');
	var FormCidade = require('views/cidade/FormCidade');
	var CidadeModel = require('models/CidadeModel');

	var PageEndereco = require('views/endereco/PageEndereco');
	var FormEndereco = require('views/endereco/FormEndereco');
	var EnderecoModel = require('models/EnderecoModel');

	var PageEstado = require('views/estado/PageEstado');
	var FormEstado = require('views/estado/FormEstado');
	var EstadoModel = require('models/EstadoModel');

	var PagePais = require('views/pais/PagePais');
	var FormPais = require('views/pais/FormPais');
	var PaisModel = require('models/PaisModel');

	var PageItem = require('views/item/PageItem');
	var FormItem = require('views/item/FormItem');
	var ItemModel = require('models/ItemModel');

	var PageItemType = require('views/itemType/PageItemType');
	var FormItemType = require('views/itemType/FormItemType');
	var ItemTypeModel = require('models/ItemTypeModel');

	var PageOperation = require('views/operation/PageOperation');
	var FormOperation = require('views/operation/FormOperation');
	var OperationModel = require('models/OperationModel');

	var PagePermission = require('views/permission/PagePermission');
	var FormPermission = require('views/permission/FormPermission');
	var PermissionModel = require('models/PermissionModel');

	var PageRole = require('views/role/PageRole');
	var FormRole = require('views/role/FormRole');
	var RoleModel = require('models/RoleModel');

	var PageSession = require('views/session/PageSession');
	var FormSession = require('views/session/FormSession');
	var SessionModel = require('models/SessionModel');

	var PageUser = require('views/user/PageUser');
	var FormUser = require('views/user/FormUser');
	var UserModel = require('models/UserModel');

	var i18next = require('i18next');
	var i18next = require('i18next');
	var i18nextJquery = require('i18nextJquery');
	var lng = navigator.language || navigator.userLanguage;
	var resources = null;
	localeModel = new BaseModel();
	localeModel.url = 'locales/' + lng + '/i18n.json';
//	localeModel.fetch({
//		success : function(a, b, c) {
//			init(b);
//			console.log(b.responseJson);
//			// console.log(a, b, c);
//		},
//		error : function(a, b, c) {
//			console.error(a, b, c);
//		}
//	})

	i18next.init({
		lng : lng,
		resources : {
			en : {
				translation : {
					input : {
						placeholder : "a placeholder"
					},
					nav : {
						home : 'Home',
						page1 : 'Page One',
						page2 : 'Page Two'
					},
					label : {
						form_latada : {
							nome : 'Nombre *'
						},
						page1 : 'Page One',
						page2 : 'Page Two'
					}
				}
			},
			'pt-BR' : {
				translation : {
					input : {
						placeholder : "a placeholder"
					},
					nav : {
						home : 'Home',
						page1 : 'Page One',
						page2 : 'Page Two pt br'
					},
					label : {
						form_latada : {
							nome : 'Nombre *'
						},
						page1 : 'Page One',
						page2 : 'Filtros de pesquisa dessa bagaça'
					}
				}
			}
		}
	}, function(err, t) {
		// for options see
		// https://github.com/i18next/jquery-i18next#initialize-the-plugin
		i18nextJquery.init(i18next, $);

		// start localizing, details:
		// https://github.com/i18next/jquery-i18next#usage-of-selector-function
		// $('[data-i18n]').localize();
	})

	util.NProgress.setBlockerPanel('block_panel');

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
				// $('[data-i18n]').localize();
				view.$el.localize();
				setTimeout(function() {
					// ver tambem backbone-adapter
					util.NProgress.done(false, true);
					// uma pequena espera para garantir que o componente foi
					// renderizado antes de mandar remove-lo.
				}, 100);
			});
		},
	});

	var AppRouter = Backbone.Router.extend({
		routes : {
			'' : 'index',
			// hashs de Anexo
			'app/anexos' : 'anexos',
			'app/newAnexo' : 'newAnexo',
			'app/editAnexo/:id' : 'editAnexo',
			// hashs de ApontamentoQualidadePacking
			'app/apontamentoQualidadePackings' : 'apontamentoQualidadePackings',
			'app/newApontamentoQualidadePacking' : 'newApontamentoQualidadePacking',
			'app/editApontamentoQualidadePacking/:id' : 'editApontamentoQualidadePacking',
			// hashs de Bolsao
			'app/bolsaos' : 'bolsaos',
			'app/newBolsao' : 'newBolsao',
			'app/editBolsao/:id' : 'editBolsao',
			// hashs de Cabine
			'app/cabines' : 'cabines',
			'app/newCabine' : 'newCabine',
			'app/editCabine/:id' : 'editCabine',
			// hashs de Cargo
			'app/cargos' : 'cargos',
			'app/newCargo' : 'newCargo',
			'app/editCargo/:id' : 'editCargo',
			// hashs de Cbo
			'app/cbos' : 'cbos',
			'app/newCbo' : 'newCbo',
			'app/editCbo/:id' : 'editCbo',
			// hashs de Client
			'app/clients' : 'clients',
			'app/newClient' : 'newClient',
			'app/editClient/:id' : 'editClient',
			// hashs de Cliente
			'app/clientes' : 'clientes',
			'app/newCliente' : 'newCliente',
			'app/editCliente/:id' : 'editCliente',
			// hashs de Cor
			'app/cors' : 'cors',
			'app/newCor' : 'newCor',
			'app/editCor/:id' : 'editCor',
			// hashs de Departamento
			'app/departamentos' : 'departamentos',
			'app/newDepartamento' : 'newDepartamento',
			'app/editDepartamento/:id' : 'editDepartamento',
			// hashs de Embalagem
			'app/embalagems' : 'embalagems',
			'app/newEmbalagem' : 'newEmbalagem',
			'app/editEmbalagem/:id' : 'editEmbalagem',
			// hashs de Funcao
			'app/funcaos' : 'funcaos',
			'app/newFuncao' : 'newFuncao',
			'app/editFuncao/:id' : 'editFuncao',
			// hashs de Funcionario
			'app/funcionarios' : 'funcionarios',
			'app/newFuncionario' : 'newFuncionario',
			'app/editFuncionario/:id' : 'editFuncionario',
			// hashs de Generador
			'app/generadors' : 'generadors',
			'app/newGenerador' : 'newGenerador',
			'app/editGenerador/:id' : 'editGenerador',
			// hashs de Latada
			'app/latadas' : 'latadas',
			'app/newLatada' : 'newLatada',
			'app/editLatada/:id' : 'editLatada',
			// hashs de Packing
			'app/packings' : 'packings',
			'app/newPacking' : 'newPacking',
			'app/editPacking/:id' : 'editPacking',
			// hashs de Sacola
			'app/sacolas' : 'sacolas',
			'app/newSacola' : 'newSacola',
			'app/editSacola/:id' : 'editSacola',
			// hashs de Variedade
			'app/variedades' : 'variedades',
			'app/newVariedade' : 'newVariedade',
			'app/editVariedade/:id' : 'editVariedade',
			// hashs de Bairro
			'app/bairros' : 'bairros',
			'app/newBairro' : 'newBairro',
			'app/editBairro/:id' : 'editBairro',
			// hashs de Cep
			'app/ceps' : 'ceps',
			'app/newCep' : 'newCep',
			'app/editCep/:id' : 'editCep',
			// hashs de Cidade
			'app/cidades' : 'cidades',
			'app/newCidade' : 'newCidade',
			'app/editCidade/:id' : 'editCidade',
			// hashs de Endereco
			'app/enderecos' : 'enderecos',
			'app/newEndereco' : 'newEndereco',
			'app/editEndereco/:id' : 'editEndereco',
			// hashs de Estado
			'app/estados' : 'estados',
			'app/newEstado' : 'newEstado',
			'app/editEstado/:id' : 'editEstado',
			// hashs de Pais
			'app/paiss' : 'paiss',
			'app/newPais' : 'newPais',
			'app/editPais/:id' : 'editPais',
			// hashs de Item
			'app/items' : 'items',
			'app/newItem' : 'newItem',
			'app/editItem/:id' : 'editItem',
			// hashs de ItemType
			'app/itemTypes' : 'itemTypes',
			'app/newItemType' : 'newItemType',
			'app/editItemType/:id' : 'editItemType',
			// hashs de Operation
			'app/operations' : 'operations',
			'app/newOperation' : 'newOperation',
			'app/editOperation/:id' : 'editOperation',
			// hashs de Permission
			'app/permissions' : 'permissions',
			'app/newPermission' : 'newPermission',
			'app/editPermission/:id' : 'editPermission',
			// hashs de Role
			'app/roles' : 'roles',
			'app/newRole' : 'newRole',
			'app/editRole/:id' : 'editRole',
			// hashs de Session
			'app/sessions' : 'sessions',
			'app/newSession' : 'newSession',
			'app/editSession/:id' : 'editSession',
			// hashs de User
			'app/users' : 'users',
			'app/newUser' : 'newUser',
			'app/editUser/:id' : 'editUser',
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

		index : function(path) {
			util.markActiveItem('dashboard');
			setTimeout(function() {
				util.NProgress.done(false, true);
			}, 500);
		},

		// configuração das rotas de Anexo
		anexos : function() {
			util.markActiveItem('anexos');
			this.pageAnexo = new PageAnexo();
			this.App.mainRegion.show(this.pageAnexo);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Anexo',
				itemSubFolderName : 'Listagem',
				url : 'app/anexos'
			});
		},

		newAnexo : function() {
			util.markActiveItem('anexos');
			var formAnexo = new FormAnexo({
				model : new AnexoModel(),
			});
			this.App.mainRegion.show(formAnexo);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Anexo',
				itemSubFolderName : 'Formulário de cadastro de Anexo',
				url : 'app/anexos'
			});
		},

		editAnexo : function(idAnexo) {
			var that = this;
			util.markActiveItem('anexos');
			var formAnexo = null;
			if (this.pageAnexo) {
				formAnexo = new FormAnexo({
					model : this.pageAnexo.anexos.get(idAnexo),
				});
				that.App.mainRegion.show(formAnexo);
			} else {
				var model = new AnexoModel({
					id : idAnexo,
				})
				model.fetch({
					success : function(model) {
						formAnexo = new FormAnexo({
							model : model,
						});
						that.App.mainRegion.show(formAnexo);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Anexos',
					itemSubFolderName : 'Formulário de atualização de Anexo',
					url : 'app/anexos'
				});
			}
		},

		// configuração das rotas de ApontamentoQualidadePacking
		apontamentoQualidadePackings : function() {
			util.markActiveItem('apontamentoQualidadePackings');
			this.pageApontamentoQualidadePacking = new PageApontamentoQualidadePacking();
			this.App.mainRegion.show(this.pageApontamentoQualidadePacking);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Apontamento qualidade packing',
				itemSubFolderName : 'Listagem',
				url : 'app/apontamentoQualidadePackings'
			});
		},

		newApontamentoQualidadePacking : function() {
			util.markActiveItem('apontamentoQualidadePackings');
			var formApontamentoQualidadePacking = new FormApontamentoQualidadePacking({
				model : new ApontamentoQualidadePackingModel(),
			});
			this.App.mainRegion.show(formApontamentoQualidadePacking);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Apontamento qualidade packing',
				itemSubFolderName : 'Formulário de cadastro de Apontamento qualidade packing',
				url : 'app/apontamentoQualidadePackings'
			});
		},

		editApontamentoQualidadePacking : function(idApontamentoQualidadePacking) {
			var that = this;
			util.markActiveItem('apontamentoQualidadePackings');
			var formApontamentoQualidadePacking = null;
			if (this.pageApontamentoQualidadePacking) {
				formApontamentoQualidadePacking = new FormApontamentoQualidadePacking({
					model : this.pageApontamentoQualidadePacking.apontamentoQualidadePackings.get(idApontamentoQualidadePacking),
				});
				that.App.mainRegion.show(formApontamentoQualidadePacking);
			} else {
				var model = new ApontamentoQualidadePackingModel({
					id : idApontamentoQualidadePacking,
				})
				model.fetch({
					success : function(model) {
						formApontamentoQualidadePacking = new FormApontamentoQualidadePacking({
							model : model,
						});
						that.App.mainRegion.show(formApontamentoQualidadePacking);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'ApontamentoQualidadePackings',
					itemSubFolderName : 'Formulário de atualização de Apontamento qualidade packing',
					url : 'app/apontamentoQualidadePackings'
				});
			}
		},

		// configuração das rotas de Bolsao
		bolsaos : function() {
			util.markActiveItem('bolsaos');
			this.pageBolsao = new PageBolsao();
			this.App.mainRegion.show(this.pageBolsao);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Bolsao',
				itemSubFolderName : 'Listagem',
				url : 'app/bolsaos'
			});
		},

		newBolsao : function() {
			util.markActiveItem('bolsaos');
			var formBolsao = new FormBolsao({
				model : new BolsaoModel(),
			});
			this.App.mainRegion.show(formBolsao);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Bolsao',
				itemSubFolderName : 'Formulário de cadastro de Bolsao',
				url : 'app/bolsaos'
			});
		},

		editBolsao : function(idBolsao) {
			var that = this;
			util.markActiveItem('bolsaos');
			var formBolsao = null;
			if (this.pageBolsao) {
				formBolsao = new FormBolsao({
					model : this.pageBolsao.bolsaos.get(idBolsao),
				});
				that.App.mainRegion.show(formBolsao);
			} else {
				var model = new BolsaoModel({
					id : idBolsao,
				})
				model.fetch({
					success : function(model) {
						formBolsao = new FormBolsao({
							model : model,
						});
						that.App.mainRegion.show(formBolsao);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Bolsaos',
					itemSubFolderName : 'Formulário de atualização de Bolsao',
					url : 'app/bolsaos'
				});
			}
		},

		// configuração das rotas de Cabine
		cabines : function() {
			util.markActiveItem('cabines');
			this.pageCabine = new PageCabine();
			this.App.mainRegion.show(this.pageCabine);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Cabine',
				itemSubFolderName : 'Listagem',
				url : 'app/cabines'
			});
		},

		newCabine : function() {
			util.markActiveItem('cabines');
			var formCabine = new FormCabine({
				model : new CabineModel(),
			});
			this.App.mainRegion.show(formCabine);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Cabine',
				itemSubFolderName : 'Formulário de cadastro de Cabine',
				url : 'app/cabines'
			});
		},

		editCabine : function(idCabine) {
			var that = this;
			util.markActiveItem('cabines');
			var formCabine = null;
			if (this.pageCabine) {
				formCabine = new FormCabine({
					model : this.pageCabine.cabines.get(idCabine),
				});
				that.App.mainRegion.show(formCabine);
			} else {
				var model = new CabineModel({
					id : idCabine,
				})
				model.fetch({
					success : function(model) {
						formCabine = new FormCabine({
							model : model,
						});
						that.App.mainRegion.show(formCabine);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Cabines',
					itemSubFolderName : 'Formulário de atualização de Cabine',
					url : 'app/cabines'
				});
			}
		},

		// configuração das rotas de Cargo
		cargos : function() {
			util.markActiveItem('cargos');
			this.pageCargo = new PageCargo();
			this.App.mainRegion.show(this.pageCargo);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Cargo',
				itemSubFolderName : 'Listagem',
				url : 'app/cargos'
			});
		},

		newCargo : function() {
			util.markActiveItem('cargos');
			var formCargo = new FormCargo({
				model : new CargoModel(),
			});
			this.App.mainRegion.show(formCargo);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Cargo',
				itemSubFolderName : 'Formulário de cadastro de Cargo',
				url : 'app/cargos'
			});
		},

		editCargo : function(idCargo) {
			var that = this;
			util.markActiveItem('cargos');
			var formCargo = null;
			if (this.pageCargo) {
				formCargo = new FormCargo({
					model : this.pageCargo.cargos.get(idCargo),
				});
				that.App.mainRegion.show(formCargo);
			} else {
				var model = new CargoModel({
					id : idCargo,
				})
				model.fetch({
					success : function(model) {
						formCargo = new FormCargo({
							model : model,
						});
						that.App.mainRegion.show(formCargo);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Cargos',
					itemSubFolderName : 'Formulário de atualização de Cargo',
					url : 'app/cargos'
				});
			}
		},

		// configuração das rotas de Cbo
		cbos : function() {
			util.markActiveItem('cbos');
			this.pageCbo = new PageCbo();
			this.App.mainRegion.show(this.pageCbo);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Cbo',
				itemSubFolderName : 'Listagem',
				url : 'app/cbos'
			});
		},

		newCbo : function() {
			util.markActiveItem('cbos');
			var formCbo = new FormCbo({
				model : new CboModel(),
			});
			this.App.mainRegion.show(formCbo);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Cbo',
				itemSubFolderName : 'Formulário de cadastro de Cbo',
				url : 'app/cbos'
			});
		},

		editCbo : function(idCbo) {
			var that = this;
			util.markActiveItem('cbos');
			var formCbo = null;
			if (this.pageCbo) {
				formCbo = new FormCbo({
					model : this.pageCbo.cbos.get(idCbo),
				});
				that.App.mainRegion.show(formCbo);
			} else {
				var model = new CboModel({
					id : idCbo,
				})
				model.fetch({
					success : function(model) {
						formCbo = new FormCbo({
							model : model,
						});
						that.App.mainRegion.show(formCbo);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Cbos',
					itemSubFolderName : 'Formulário de atualização de Cbo',
					url : 'app/cbos'
				});
			}
		},

		// configuração das rotas de Client
		clients : function() {
			util.markActiveItem('clients');
			this.pageClient = new PageClient();
			this.App.mainRegion.show(this.pageClient);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Empresa',
				itemSubFolderName : 'Listagem',
				url : 'app/clients'
			});
		},

		newClient : function() {
			util.markActiveItem('clients');
			var formClient = new FormClient({
				model : new ClientModel(),
			});
			this.App.mainRegion.show(formClient);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Empresa',
				itemSubFolderName : 'Formulário de cadastro de Empresa',
				url : 'app/clients'
			});
		},

		editClient : function(idClient) {
			var that = this;
			util.markActiveItem('clients');
			var formClient = null;
			if (this.pageClient) {
				formClient = new FormClient({
					model : this.pageClient.clients.get(idClient),
				});
				that.App.mainRegion.show(formClient);
			} else {
				var model = new ClientModel({
					id : idClient,
				})
				model.fetch({
					success : function(model) {
						formClient = new FormClient({
							model : model,
						});
						that.App.mainRegion.show(formClient);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Clients',
					itemSubFolderName : 'Formulário de atualização de Empresa',
					url : 'app/clients'
				});
			}
		},

		// configuração das rotas de Cliente
		clientes : function() {
			util.markActiveItem('clientes');
			this.pageCliente = new PageCliente();
			this.App.mainRegion.show(this.pageCliente);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Cliente',
				itemSubFolderName : 'Listagem',
				url : 'app/clientes'
			});
		},

		newCliente : function() {
			util.markActiveItem('clientes');
			var formCliente = new FormCliente({
				model : new ClienteModel(),
			});
			this.App.mainRegion.show(formCliente);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Cliente',
				itemSubFolderName : 'Formulário de cadastro de Cliente',
				url : 'app/clientes'
			});
		},

		editCliente : function(idCliente) {
			var that = this;
			util.markActiveItem('clientes');
			var formCliente = null;
			if (this.pageCliente) {
				formCliente = new FormCliente({
					model : this.pageCliente.clientes.get(idCliente),
				});
				that.App.mainRegion.show(formCliente);
			} else {
				var model = new ClienteModel({
					id : idCliente,
				})
				model.fetch({
					success : function(model) {
						formCliente = new FormCliente({
							model : model,
						});
						that.App.mainRegion.show(formCliente);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Clientes',
					itemSubFolderName : 'Formulário de atualização de Cliente',
					url : 'app/clientes'
				});
			}
		},

		// configuração das rotas de Cor
		cors : function() {
			util.markActiveItem('cors');
			this.pageCor = new PageCor();
			this.App.mainRegion.show(this.pageCor);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Cor',
				itemSubFolderName : 'Listagem',
				url : 'app/cors'
			});
		},

		newCor : function() {
			util.markActiveItem('cors');
			var formCor = new FormCor({
				model : new CorModel(),
			});
			this.App.mainRegion.show(formCor);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Cor',
				itemSubFolderName : 'Formulário de cadastro de Cor',
				url : 'app/cors'
			});
		},

		editCor : function(idCor) {
			var that = this;
			util.markActiveItem('cors');
			var formCor = null;
			if (this.pageCor) {
				formCor = new FormCor({
					model : this.pageCor.cors.get(idCor),
				});
				that.App.mainRegion.show(formCor);
			} else {
				var model = new CorModel({
					id : idCor,
				})
				model.fetch({
					success : function(model) {
						formCor = new FormCor({
							model : model,
						});
						that.App.mainRegion.show(formCor);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Cors',
					itemSubFolderName : 'Formulário de atualização de Cor',
					url : 'app/cors'
				});
			}
		},

		// configuração das rotas de Departamento
		departamentos : function() {
			util.markActiveItem('departamentos');
			this.pageDepartamento = new PageDepartamento();
			this.App.mainRegion.show(this.pageDepartamento);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Departamento',
				itemSubFolderName : 'Listagem',
				url : 'app/departamentos'
			});
		},

		newDepartamento : function() {
			util.markActiveItem('departamentos');
			var formDepartamento = new FormDepartamento({
				model : new DepartamentoModel(),
			});
			this.App.mainRegion.show(formDepartamento);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Departamento',
				itemSubFolderName : 'Formulário de cadastro de Departamento',
				url : 'app/departamentos'
			});
		},

		editDepartamento : function(idDepartamento) {
			var that = this;
			util.markActiveItem('departamentos');
			var formDepartamento = null;
			if (this.pageDepartamento) {
				formDepartamento = new FormDepartamento({
					model : this.pageDepartamento.departamentos.get(idDepartamento),
				});
				that.App.mainRegion.show(formDepartamento);
			} else {
				var model = new DepartamentoModel({
					id : idDepartamento,
				})
				model.fetch({
					success : function(model) {
						formDepartamento = new FormDepartamento({
							model : model,
						});
						that.App.mainRegion.show(formDepartamento);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Departamentos',
					itemSubFolderName : 'Formulário de atualização de Departamento',
					url : 'app/departamentos'
				});
			}
		},

		// configuração das rotas de Embalagem
		embalagems : function() {
			util.markActiveItem('embalagems');
			this.pageEmbalagem = new PageEmbalagem();
			this.App.mainRegion.show(this.pageEmbalagem);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Embalagem',
				itemSubFolderName : 'Listagem',
				url : 'app/embalagems'
			});
		},

		newEmbalagem : function() {
			util.markActiveItem('embalagems');
			var formEmbalagem = new FormEmbalagem({
				model : new EmbalagemModel(),
			});
			this.App.mainRegion.show(formEmbalagem);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Embalagem',
				itemSubFolderName : 'Formulário de cadastro de Embalagem',
				url : 'app/embalagems'
			});
		},

		editEmbalagem : function(idEmbalagem) {
			var that = this;
			util.markActiveItem('embalagems');
			var formEmbalagem = null;
			if (this.pageEmbalagem) {
				formEmbalagem = new FormEmbalagem({
					model : this.pageEmbalagem.embalagems.get(idEmbalagem),
				});
				that.App.mainRegion.show(formEmbalagem);
			} else {
				var model = new EmbalagemModel({
					id : idEmbalagem,
				})
				model.fetch({
					success : function(model) {
						formEmbalagem = new FormEmbalagem({
							model : model,
						});
						that.App.mainRegion.show(formEmbalagem);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Embalagems',
					itemSubFolderName : 'Formulário de atualização de Embalagem',
					url : 'app/embalagems'
				});
			}
		},

		// configuração das rotas de Funcao
		funcaos : function() {
			util.markActiveItem('funcaos');
			this.pageFuncao = new PageFuncao();
			this.App.mainRegion.show(this.pageFuncao);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Funcao',
				itemSubFolderName : 'Listagem',
				url : 'app/funcaos'
			});
		},

		newFuncao : function() {
			util.markActiveItem('funcaos');
			var formFuncao = new FormFuncao({
				model : new FuncaoModel(),
			});
			this.App.mainRegion.show(formFuncao);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Funcao',
				itemSubFolderName : 'Formulário de cadastro de Funcao',
				url : 'app/funcaos'
			});
		},

		editFuncao : function(idFuncao) {
			var that = this;
			util.markActiveItem('funcaos');
			var formFuncao = null;
			if (this.pageFuncao) {
				formFuncao = new FormFuncao({
					model : this.pageFuncao.funcaos.get(idFuncao),
				});
				that.App.mainRegion.show(formFuncao);
			} else {
				var model = new FuncaoModel({
					id : idFuncao,
				})
				model.fetch({
					success : function(model) {
						formFuncao = new FormFuncao({
							model : model,
						});
						that.App.mainRegion.show(formFuncao);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Funcaos',
					itemSubFolderName : 'Formulário de atualização de Funcao',
					url : 'app/funcaos'
				});
			}
		},

		// configuração das rotas de Funcionario
		funcionarios : function() {
			util.markActiveItem('funcionarios');
			this.pageFuncionario = new PageFuncionario();
			this.App.mainRegion.show(this.pageFuncionario);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Funcionario',
				itemSubFolderName : 'Listagem',
				url : 'app/funcionarios'
			});
		},

		newFuncionario : function() {
			util.markActiveItem('funcionarios');
			var formFuncionario = new FormFuncionario({
				model : new FuncionarioModel(),
			});
			this.App.mainRegion.show(formFuncionario);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Funcionario',
				itemSubFolderName : 'Formulário de cadastro de Funcionario',
				url : 'app/funcionarios'
			});
		},

		editFuncionario : function(idFuncionario) {
			var that = this;
			util.markActiveItem('funcionarios');
			var formFuncionario = null;
			if (this.pageFuncionario) {
				formFuncionario = new FormFuncionario({
					model : this.pageFuncionario.funcionarios.get(idFuncionario),
				});
				that.App.mainRegion.show(formFuncionario);
			} else {
				var model = new FuncionarioModel({
					id : idFuncionario,
				})
				model.fetch({
					success : function(model) {
						formFuncionario = new FormFuncionario({
							model : model,
						});
						that.App.mainRegion.show(formFuncionario);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Funcionarios',
					itemSubFolderName : 'Formulário de atualização de Funcionario',
					url : 'app/funcionarios'
				});
			}
		},

		// configuração das rotas de Generador
		generadors : function() {
			util.markActiveItem('generadors');
			this.pageGenerador = new PageGenerador();
			this.App.mainRegion.show(this.pageGenerador);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Generador',
				itemSubFolderName : 'Listagem',
				url : 'app/generadors'
			});
		},

		newGenerador : function() {
			util.markActiveItem('generadors');
			var formGenerador = new FormGenerador({
				model : new GeneradorModel(),
			});
			this.App.mainRegion.show(formGenerador);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Generador',
				itemSubFolderName : 'Formulário de cadastro de Generador',
				url : 'app/generadors'
			});
		},

		editGenerador : function(idGenerador) {
			var that = this;
			util.markActiveItem('generadors');
			var formGenerador = null;
			if (this.pageGenerador) {
				formGenerador = new FormGenerador({
					model : this.pageGenerador.generadors.get(idGenerador),
				});
				that.App.mainRegion.show(formGenerador);
			} else {
				var model = new GeneradorModel({
					id : idGenerador,
				})
				model.fetch({
					success : function(model) {
						formGenerador = new FormGenerador({
							model : model,
						});
						that.App.mainRegion.show(formGenerador);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Generadors',
					itemSubFolderName : 'Formulário de atualização de Generador',
					url : 'app/generadors'
				});
			}
		},

		// configuração das rotas de Latada
		latadas : function() {
			util.markActiveItem('latadas');
			this.pageLatada = new PageLatada();
			this.App.mainRegion.show(this.pageLatada);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Latada',
				itemSubFolderName : 'Listagem',
				url : 'app/latadas'
			});
		},

		newLatada : function() {
			util.markActiveItem('latadas');
			var formLatada = new FormLatada({
				model : new LatadaModel(),
			});
			this.App.mainRegion.show(formLatada);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Latada',
				itemSubFolderName : 'Formulário de cadastro de Latada',
				url : 'app/latadas'
			});
		},

		editLatada : function(idLatada) {
			var that = this;
			util.markActiveItem('latadas');
			var formLatada = null;
			if (this.pageLatada) {
				formLatada = new FormLatada({
					model : this.pageLatada.latadas.get(idLatada),
				});
				that.App.mainRegion.show(formLatada);
			} else {
				var model = new LatadaModel({
					id : idLatada,
				})
				model.fetch({
					success : function(model) {
						formLatada = new FormLatada({
							model : model,
						});
						that.App.mainRegion.show(formLatada);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Latadas',
					itemSubFolderName : 'Formulário de atualização de Latada',
					url : 'app/latadas'
				});
			}
		},

		// configuração das rotas de Packing
		packings : function() {
			util.markActiveItem('packings');
			this.pagePacking = new PagePacking();
			this.App.mainRegion.show(this.pagePacking);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Packing',
				itemSubFolderName : 'Listagem',
				url : 'app/packings'
			});
		},

		newPacking : function() {
			util.markActiveItem('packings');
			var formPacking = new FormPacking({
				model : new PackingModel(),
			});
			this.App.mainRegion.show(formPacking);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Packing',
				itemSubFolderName : 'Formulário de cadastro de Packing',
				url : 'app/packings'
			});
		},

		editPacking : function(idPacking) {
			var that = this;
			util.markActiveItem('packings');
			var formPacking = null;
			if (this.pagePacking) {
				formPacking = new FormPacking({
					model : this.pagePacking.packings.get(idPacking),
				});
				that.App.mainRegion.show(formPacking);
			} else {
				var model = new PackingModel({
					id : idPacking,
				})
				model.fetch({
					success : function(model) {
						formPacking = new FormPacking({
							model : model,
						});
						that.App.mainRegion.show(formPacking);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Packings',
					itemSubFolderName : 'Formulário de atualização de Packing',
					url : 'app/packings'
				});
			}
		},

		// configuração das rotas de Sacola
		sacolas : function() {
			util.markActiveItem('sacolas');
			this.pageSacola = new PageSacola();
			this.App.mainRegion.show(this.pageSacola);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Sacola',
				itemSubFolderName : 'Listagem',
				url : 'app/sacolas'
			});
		},

		newSacola : function() {
			util.markActiveItem('sacolas');
			var formSacola = new FormSacola({
				model : new SacolaModel(),
			});
			this.App.mainRegion.show(formSacola);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Sacola',
				itemSubFolderName : 'Formulário de cadastro de Sacola',
				url : 'app/sacolas'
			});
		},

		editSacola : function(idSacola) {
			var that = this;
			util.markActiveItem('sacolas');
			var formSacola = null;
			if (this.pageSacola) {
				formSacola = new FormSacola({
					model : this.pageSacola.sacolas.get(idSacola),
				});
				that.App.mainRegion.show(formSacola);
			} else {
				var model = new SacolaModel({
					id : idSacola,
				})
				model.fetch({
					success : function(model) {
						formSacola = new FormSacola({
							model : model,
						});
						that.App.mainRegion.show(formSacola);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Sacolas',
					itemSubFolderName : 'Formulário de atualização de Sacola',
					url : 'app/sacolas'
				});
			}
		},

		// configuração das rotas de Variedade
		variedades : function() {
			util.markActiveItem('variedades');
			this.pageVariedade = new PageVariedade();
			this.App.mainRegion.show(this.pageVariedade);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Variedade',
				itemSubFolderName : 'Listagem',
				url : 'app/variedades'
			});
		},

		newVariedade : function() {
			util.markActiveItem('variedades');
			var formVariedade = new FormVariedade({
				model : new VariedadeModel(),
			});
			this.App.mainRegion.show(formVariedade);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Variedade',
				itemSubFolderName : 'Formulário de cadastro de Variedade',
				url : 'app/variedades'
			});
		},

		editVariedade : function(idVariedade) {
			var that = this;
			util.markActiveItem('variedades');
			var formVariedade = null;
			if (this.pageVariedade) {
				formVariedade = new FormVariedade({
					model : this.pageVariedade.variedades.get(idVariedade),
				});
				that.App.mainRegion.show(formVariedade);
			} else {
				var model = new VariedadeModel({
					id : idVariedade,
				})
				model.fetch({
					success : function(model) {
						formVariedade = new FormVariedade({
							model : model,
						});
						that.App.mainRegion.show(formVariedade);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Variedades',
					itemSubFolderName : 'Formulário de atualização de Variedade',
					url : 'app/variedades'
				});
			}
		},

		// configuração das rotas de Bairro
		bairros : function() {
			util.markActiveItem('bairros');
			this.pageBairro = new PageBairro();
			this.App.mainRegion.show(this.pageBairro);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Bairro',
				itemSubFolderName : 'Listagem',
				url : 'app/bairros'
			});
		},

		newBairro : function() {
			util.markActiveItem('bairros');
			var formBairro = new FormBairro({
				model : new BairroModel(),
			});
			this.App.mainRegion.show(formBairro);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Bairro',
				itemSubFolderName : 'Formulário de cadastro de Bairro',
				url : 'app/bairros'
			});
		},

		editBairro : function(idBairro) {
			var that = this;
			util.markActiveItem('bairros');
			var formBairro = null;
			if (this.pageBairro) {
				formBairro = new FormBairro({
					model : this.pageBairro.bairros.get(idBairro),
				});
				that.App.mainRegion.show(formBairro);
			} else {
				var model = new BairroModel({
					id : idBairro,
				})
				model.fetch({
					success : function(model) {
						formBairro = new FormBairro({
							model : model,
						});
						that.App.mainRegion.show(formBairro);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Bairros',
					itemSubFolderName : 'Formulário de atualização de Bairro',
					url : 'app/bairros'
				});
			}
		},

		// configuração das rotas de Cep
		ceps : function() {
			util.markActiveItem('ceps');
			this.pageCep = new PageCep();
			this.App.mainRegion.show(this.pageCep);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Cep',
				itemSubFolderName : 'Listagem',
				url : 'app/ceps'
			});
		},

		newCep : function() {
			util.markActiveItem('ceps');
			var formCep = new FormCep({
				model : new CepModel(),
			});
			this.App.mainRegion.show(formCep);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Cep',
				itemSubFolderName : 'Formulário de cadastro de Cep',
				url : 'app/ceps'
			});
		},

		editCep : function(idCep) {
			var that = this;
			util.markActiveItem('ceps');
			var formCep = null;
			if (this.pageCep) {
				formCep = new FormCep({
					model : this.pageCep.ceps.get(idCep),
				});
				that.App.mainRegion.show(formCep);
			} else {
				var model = new CepModel({
					id : idCep,
				})
				model.fetch({
					success : function(model) {
						formCep = new FormCep({
							model : model,
						});
						that.App.mainRegion.show(formCep);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Ceps',
					itemSubFolderName : 'Formulário de atualização de Cep',
					url : 'app/ceps'
				});
			}
		},

		// configuração das rotas de Cidade
		cidades : function() {
			util.markActiveItem('cidades');
			this.pageCidade = new PageCidade();
			this.App.mainRegion.show(this.pageCidade);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Cidade',
				itemSubFolderName : 'Listagem',
				url : 'app/cidades'
			});
		},

		newCidade : function() {
			util.markActiveItem('cidades');
			var formCidade = new FormCidade({
				model : new CidadeModel(),
			});
			this.App.mainRegion.show(formCidade);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Cidade',
				itemSubFolderName : 'Formulário de cadastro de Cidade',
				url : 'app/cidades'
			});
		},

		editCidade : function(idCidade) {
			var that = this;
			util.markActiveItem('cidades');
			var formCidade = null;
			if (this.pageCidade) {
				formCidade = new FormCidade({
					model : this.pageCidade.cidades.get(idCidade),
				});
				that.App.mainRegion.show(formCidade);
			} else {
				var model = new CidadeModel({
					id : idCidade,
				})
				model.fetch({
					success : function(model) {
						formCidade = new FormCidade({
							model : model,
						});
						that.App.mainRegion.show(formCidade);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Cidades',
					itemSubFolderName : 'Formulário de atualização de Cidade',
					url : 'app/cidades'
				});
			}
		},

		// configuração das rotas de Endereco
		enderecos : function() {
			util.markActiveItem('enderecos');
			this.pageEndereco = new PageEndereco();
			this.App.mainRegion.show(this.pageEndereco);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Endereco',
				itemSubFolderName : 'Listagem',
				url : 'app/enderecos'
			});
		},

		newEndereco : function() {
			util.markActiveItem('enderecos');
			var formEndereco = new FormEndereco({
				model : new EnderecoModel(),
			});
			this.App.mainRegion.show(formEndereco);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Endereco',
				itemSubFolderName : 'Formulário de cadastro de Endereco',
				url : 'app/enderecos'
			});
		},

		editEndereco : function(idEndereco) {
			var that = this;
			util.markActiveItem('enderecos');
			var formEndereco = null;
			if (this.pageEndereco) {
				formEndereco = new FormEndereco({
					model : this.pageEndereco.enderecos.get(idEndereco),
				});
				that.App.mainRegion.show(formEndereco);
			} else {
				var model = new EnderecoModel({
					id : idEndereco,
				})
				model.fetch({
					success : function(model) {
						formEndereco = new FormEndereco({
							model : model,
						});
						that.App.mainRegion.show(formEndereco);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Enderecos',
					itemSubFolderName : 'Formulário de atualização de Endereco',
					url : 'app/enderecos'
				});
			}
		},

		// configuração das rotas de Estado
		estados : function() {
			util.markActiveItem('estados');
			this.pageEstado = new PageEstado();
			this.App.mainRegion.show(this.pageEstado);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Estado',
				itemSubFolderName : 'Listagem',
				url : 'app/estados'
			});
		},

		newEstado : function() {
			util.markActiveItem('estados');
			var formEstado = new FormEstado({
				model : new EstadoModel(),
			});
			this.App.mainRegion.show(formEstado);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Estado',
				itemSubFolderName : 'Formulário de cadastro de Estado',
				url : 'app/estados'
			});
		},

		editEstado : function(idEstado) {
			var that = this;
			util.markActiveItem('estados');
			var formEstado = null;
			if (this.pageEstado) {
				formEstado = new FormEstado({
					model : this.pageEstado.estados.get(idEstado),
				});
				that.App.mainRegion.show(formEstado);
			} else {
				var model = new EstadoModel({
					id : idEstado,
				})
				model.fetch({
					success : function(model) {
						formEstado = new FormEstado({
							model : model,
						});
						that.App.mainRegion.show(formEstado);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Estados',
					itemSubFolderName : 'Formulário de atualização de Estado',
					url : 'app/estados'
				});
			}
		},

		// configuração das rotas de Pais
		paiss : function() {
			util.markActiveItem('paiss');
			this.pagePais = new PagePais();
			this.App.mainRegion.show(this.pagePais);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Pais',
				itemSubFolderName : 'Listagem',
				url : 'app/paiss'
			});
		},

		newPais : function() {
			util.markActiveItem('paiss');
			var formPais = new FormPais({
				model : new PaisModel(),
			});
			this.App.mainRegion.show(formPais);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Pais',
				itemSubFolderName : 'Formulário de cadastro de Pais',
				url : 'app/paiss'
			});
		},

		editPais : function(idPais) {
			var that = this;
			util.markActiveItem('paiss');
			var formPais = null;
			if (this.pagePais) {
				formPais = new FormPais({
					model : this.pagePais.paiss.get(idPais),
				});
				that.App.mainRegion.show(formPais);
			} else {
				var model = new PaisModel({
					id : idPais,
				})
				model.fetch({
					success : function(model) {
						formPais = new FormPais({
							model : model,
						});
						that.App.mainRegion.show(formPais);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Paiss',
					itemSubFolderName : 'Formulário de atualização de Pais',
					url : 'app/paiss'
				});
			}
		},

		// configuração das rotas de Item
		items : function() {
			util.markActiveItem('items');
			this.pageItem = new PageItem();
			this.App.mainRegion.show(this.pageItem);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Item',
				itemSubFolderName : 'Listagem',
				url : 'app/items'
			});
		},

		newItem : function() {
			util.markActiveItem('items');
			var formItem = new FormItem({
				model : new ItemModel(),
			});
			this.App.mainRegion.show(formItem);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Item',
				itemSubFolderName : 'Formulário de cadastro de Item',
				url : 'app/items'
			});
		},

		editItem : function(idItem) {
			var that = this;
			util.markActiveItem('items');
			var formItem = null;
			if (this.pageItem) {
				formItem = new FormItem({
					model : this.pageItem.items.get(idItem),
				});
				that.App.mainRegion.show(formItem);
			} else {
				var model = new ItemModel({
					id : idItem,
				})
				model.fetch({
					success : function(model) {
						formItem = new FormItem({
							model : model,
						});
						that.App.mainRegion.show(formItem);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Items',
					itemSubFolderName : 'Formulário de atualização de Item',
					url : 'app/items'
				});
			}
		},

		// configuração das rotas de ItemType
		itemTypes : function() {
			util.markActiveItem('itemTypes');
			this.pageItemType = new PageItemType();
			this.App.mainRegion.show(this.pageItemType);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Tipo de Item',
				itemSubFolderName : 'Listagem',
				url : 'app/itemTypes'
			});
		},

		newItemType : function() {
			util.markActiveItem('itemTypes');
			var formItemType = new FormItemType({
				model : new ItemTypeModel(),
			});
			this.App.mainRegion.show(formItemType);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Tipo de Item',
				itemSubFolderName : 'Formulário de cadastro de Tipo de Item',
				url : 'app/itemTypes'
			});
		},

		editItemType : function(idItemType) {
			var that = this;
			util.markActiveItem('itemTypes');
			var formItemType = null;
			if (this.pageItemType) {
				formItemType = new FormItemType({
					model : this.pageItemType.itemTypes.get(idItemType),
				});
				that.App.mainRegion.show(formItemType);
			} else {
				var model = new ItemTypeModel({
					id : idItemType,
				})
				model.fetch({
					success : function(model) {
						formItemType = new FormItemType({
							model : model,
						});
						that.App.mainRegion.show(formItemType);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'ItemTypes',
					itemSubFolderName : 'Formulário de atualização de Tipo de Item',
					url : 'app/itemTypes'
				});
			}
		},

		// configuração das rotas de Operation
		operations : function() {
			util.markActiveItem('operations');
			this.pageOperation = new PageOperation();
			this.App.mainRegion.show(this.pageOperation);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Operação',
				itemSubFolderName : 'Listagem',
				url : 'app/operations'
			});
		},

		newOperation : function() {
			util.markActiveItem('operations');
			var formOperation = new FormOperation({
				model : new OperationModel(),
			});
			this.App.mainRegion.show(formOperation);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Operação',
				itemSubFolderName : 'Formulário de cadastro de Operação',
				url : 'app/operations'
			});
		},

		editOperation : function(idOperation) {
			var that = this;
			util.markActiveItem('operations');
			var formOperation = null;
			if (this.pageOperation) {
				formOperation = new FormOperation({
					model : this.pageOperation.operations.get(idOperation),
				});
				that.App.mainRegion.show(formOperation);
			} else {
				var model = new OperationModel({
					id : idOperation,
				})
				model.fetch({
					success : function(model) {
						formOperation = new FormOperation({
							model : model,
						});
						that.App.mainRegion.show(formOperation);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Operations',
					itemSubFolderName : 'Formulário de atualização de Operação',
					url : 'app/operations'
				});
			}
		},

		// configuração das rotas de Permission
		permissions : function() {
			util.markActiveItem('permissions');
			this.pagePermission = new PagePermission();
			this.App.mainRegion.show(this.pagePermission);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Permissão',
				itemSubFolderName : 'Listagem',
				url : 'app/permissions'
			});
		},

		newPermission : function() {
			util.markActiveItem('permissions');
			var formPermission = new FormPermission({
				model : new PermissionModel(),
			});
			this.App.mainRegion.show(formPermission);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Permissão',
				itemSubFolderName : 'Formulário de cadastro de Permissão',
				url : 'app/permissions'
			});
		},

		editPermission : function(idPermission) {
			var that = this;
			util.markActiveItem('permissions');
			var formPermission = null;
			if (this.pagePermission) {
				formPermission = new FormPermission({
					model : this.pagePermission.permissions.get(idPermission),
				});
				that.App.mainRegion.show(formPermission);
			} else {
				var model = new PermissionModel({
					id : idPermission,
				})
				model.fetch({
					success : function(model) {
						formPermission = new FormPermission({
							model : model,
						});
						that.App.mainRegion.show(formPermission);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Permissions',
					itemSubFolderName : 'Formulário de atualização de Permissão',
					url : 'app/permissions'
				});
			}
		},

		// configuração das rotas de Role
		roles : function() {
			util.markActiveItem('roles');
			this.pageRole = new PageRole();
			this.App.mainRegion.show(this.pageRole);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Papel',
				itemSubFolderName : 'Listagem',
				url : 'app/roles'
			});
		},

		newRole : function() {
			util.markActiveItem('roles');
			var formRole = new FormRole({
				model : new RoleModel(),
			});
			this.App.mainRegion.show(formRole);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Papel',
				itemSubFolderName : 'Formulário de cadastro de Papel',
				url : 'app/roles'
			});
		},

		editRole : function(idRole) {
			var that = this;
			util.markActiveItem('roles');
			var formRole = null;
			if (this.pageRole) {
				formRole = new FormRole({
					model : this.pageRole.roles.get(idRole),
				});
				that.App.mainRegion.show(formRole);
			} else {
				var model = new RoleModel({
					id : idRole,
				})
				model.fetch({
					success : function(model) {
						formRole = new FormRole({
							model : model,
						});
						that.App.mainRegion.show(formRole);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Roles',
					itemSubFolderName : 'Formulário de atualização de Papel',
					url : 'app/roles'
				});
			}
		},

		// configuração das rotas de Session
		sessions : function() {
			util.markActiveItem('sessions');
			this.pageSession = new PageSession();
			this.App.mainRegion.show(this.pageSession);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Sessão',
				itemSubFolderName : 'Listagem',
				url : 'app/sessions'
			});
		},

		newSession : function() {
			util.markActiveItem('sessions');
			var formSession = new FormSession({
				model : new SessionModel(),
			});
			this.App.mainRegion.show(formSession);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Sessão',
				itemSubFolderName : 'Formulário de cadastro de Sessão',
				url : 'app/sessions'
			});
		},

		editSession : function(idSession) {
			var that = this;
			util.markActiveItem('sessions');
			var formSession = null;
			if (this.pageSession) {
				formSession = new FormSession({
					model : this.pageSession.sessions.get(idSession),
				});
				that.App.mainRegion.show(formSession);
			} else {
				var model = new SessionModel({
					id : idSession,
				})
				model.fetch({
					success : function(model) {
						formSession = new FormSession({
							model : model,
						});
						that.App.mainRegion.show(formSession);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Sessions',
					itemSubFolderName : 'Formulário de atualização de Sessão',
					url : 'app/sessions'
				});
			}
		},

		// configuração das rotas de User
		users : function() {
			util.markActiveItem('users');
			this.pageUser = new PageUser();
			this.App.mainRegion.show(this.pageUser);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Usuário',
				itemSubFolderName : 'Listagem',
				url : 'app/users'
			});
		},

		newUser : function() {
			util.markActiveItem('users');
			var formUser = new FormUser({
				model : new UserModel(),
			});
			this.App.mainRegion.show(formUser);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Usuário',
				itemSubFolderName : 'Formulário de cadastro de Usuário',
				url : 'app/users'
			});
		},

		editUser : function(idUser) {
			var that = this;
			util.markActiveItem('users');
			var formUser = null;
			if (this.pageUser) {
				formUser = new FormUser({
					model : this.pageUser.users.get(idUser),
				});
				that.App.mainRegion.show(formUser);
			} else {
				var model = new UserModel({
					id : idUser,
				})
				model.fetch({
					success : function(model) {
						formUser = new FormUser({
							model : model,
						});
						that.App.mainRegion.show(formUser);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Users',
					itemSubFolderName : 'Formulário de atualização de Usuário',
					url : 'app/users'
				});
			}
		},

		start : function() {
			Backbone.history.start();
		}
	});
	return AppRouter;
});