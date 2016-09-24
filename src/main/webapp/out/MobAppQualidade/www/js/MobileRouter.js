define(function(require) {
	'use strict';
	var _ = require('adapters/underscore-adapter');
	var $ = require('jquery');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var LeftPanelView = require('views/leftPanel/LeftPanelView');
	var HeaderView = require('views/header/HeaderView');
	var PageConfig = require('views/config/PageConfig');
	var Waves = require('waves');
	var util = require('utilities/Utils');
	var DataBaseHelper = require('utilities/DataBaseHelper');
	var Global = require('models/Global');

		var PageApontamentoQualidadePacking = require('views/apontamentoQualidadePacking/PageApontamentoQualidadePacking');
	var FormApontamentoQualidadePacking = require('views/apontamentoQualidadePacking/FormApontamentoQualidadePacking');
	var ApontamentoQualidadePackingModel = require('models/ApontamentoQualidadePackingModel');
	var ApontamentoQualidadePackingCollection = require('collections/ApontamentoQualidadePackingCollection');
	var PageBolsao = require('views/bolsao/PageBolsao');
	var FormBolsao = require('views/bolsao/FormBolsao');
	var BolsaoModel = require('models/BolsaoModel');
	var BolsaoCollection = require('collections/BolsaoCollection');
	var PageCabine = require('views/cabine/PageCabine');
	var FormCabine = require('views/cabine/FormCabine');
	var CabineModel = require('models/CabineModel');
	var CabineCollection = require('collections/CabineCollection');
	var PageCargo = require('views/cargo/PageCargo');
	var FormCargo = require('views/cargo/FormCargo');
	var CargoModel = require('models/CargoModel');
	var CargoCollection = require('collections/CargoCollection');
	var PageCliente = require('views/cliente/PageCliente');
	var FormCliente = require('views/cliente/FormCliente');
	var ClienteModel = require('models/ClienteModel');
	var ClienteCollection = require('collections/ClienteCollection');
	var PageCor = require('views/cor/PageCor');
	var FormCor = require('views/cor/FormCor');
	var CorModel = require('models/CorModel');
	var CorCollection = require('collections/CorCollection');
	var PageEmbalagem = require('views/embalagem/PageEmbalagem');
	var FormEmbalagem = require('views/embalagem/FormEmbalagem');
	var EmbalagemModel = require('models/EmbalagemModel');
	var EmbalagemCollection = require('collections/EmbalagemCollection');
	var PageGenerador = require('views/generador/PageGenerador');
	var FormGenerador = require('views/generador/FormGenerador');
	var GeneradorModel = require('models/GeneradorModel');
	var GeneradorCollection = require('collections/GeneradorCollection');
	var PageLatada = require('views/latada/PageLatada');
	var FormLatada = require('views/latada/FormLatada');
	var LatadaModel = require('models/LatadaModel');
	var LatadaCollection = require('collections/LatadaCollection');
	var PagePacking = require('views/packing/PagePacking');
	var FormPacking = require('views/packing/FormPacking');
	var PackingModel = require('models/PackingModel');
	var PackingCollection = require('collections/PackingCollection');
	var PageSacola = require('views/sacola/PageSacola');
	var FormSacola = require('views/sacola/FormSacola');
	var SacolaModel = require('models/SacolaModel');
	var SacolaCollection = require('collections/SacolaCollection');
	var PageVariedade = require('views/variedade/PageVariedade');
	var FormVariedade = require('views/variedade/FormVariedade');
	var VariedadeModel = require('models/VariedadeModel');
	var VariedadeCollection = require('collections/VariedadeCollection');

	setTimeout(function() {

		Waves.attach('#showLeft', [ 'waves-cicle' ]);
		Waves.attach('#showBottom', [ 'waves-cicle' ]);
		Waves.init();
		var blockerPanel = $('#loadInitialPanel');
		blockerPanel.on('transitionend', function() {});
		blockerPanel.effect("fade", null, 1000, function() {
			console.log("carregando a aplicação");
		});
	}, 1000);
	var CustomRegion = Marionette.Region.extend({
		el : ".main-content",
		attachHtml : function(view) {
			this.$el.hide();
			this.$el.html(view.el);
			this.$el.show("slide", { direction: "right" }, 300);

			view.on('show', function() {
				view.$el.enhanceWithin();
			})

		},
		initialize : function(options) {
			this.on('show', function() {
				this.$el.enhanceWithin();
			})
		},
	});
	// VARIAVEL QUE GUARDARÁ AS INFORMAÇOES GLOBAIS DO SITEMA.
	// Nota: Deve ser o unico local onde veremos o new GLOBAL
	window.GLOBAL = new Global();

	var Router = Backbone.Router.extend({
		// The Router constructor
		initialize : function() {
			this.app = new Marionette.Application();
			this.app.addRegions({
				mainRegion : CustomRegion,

				headerRegion : CustomRegion.extend({
					el : '#headerRegion',
				}),
			});

			this.headerView = new HeaderView({
				headerTitle : 'MOB APP',
			});
			this.app.headerRegion.show(this.headerView);
			Backbone.history.start();
		},

		routes : {
			"app/config" : "config",
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
			// hashs de Cliente
			'app/clientes' : 'clientes',
			'app/newCliente' : 'newCliente',
			'app/editCliente/:id' : 'editCliente',
			// hashs de Cor
			'app/cors' : 'cors',
			'app/newCor' : 'newCor',
			'app/editCor/:id' : 'editCor',
			// hashs de Embalagem
			'app/embalagems' : 'embalagems',
			'app/newEmbalagem' : 'newEmbalagem',
			'app/editEmbalagem/:id' : 'editEmbalagem',
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
		},
		
		//configuração das rotas de ApontamentoQualidadePacking
		apontamentoQualidadePackings: function() {
			this.headerView.setTitle('Apontamento qualidade packings');
			this.pageApontamentoQualidadePacking = new PageApontamentoQualidadePacking();
			this.app.mainRegion.show(this.pageApontamentoQualidadePacking);
			util.markActiveItem('itemMenuApontamento qualidade packings');
		},

		newApontamentoQualidadePacking: function() {
			util.markActiveItem('itemMenuApontamento qualidade packings');
			this.headerView.setTitle('Novo Apontamento qualidade packing');
			this.formApontamentoQualidadePacking = new FormApontamentoQualidadePacking({
				model : new ApontamentoQualidadePackingModel(),
			});
			this.app.mainRegion.show(this.formApontamentoQualidadePacking);
		},
		
		editApontamentoQualidadePacking : function(idApontamentoQualidadePacking) {
			var that = this;
			this.headerView.setTitle('Alterar Apontamento qualidade packing');
			var formApontamentoQualidadePacking = null;
			if (this.pageApontamentoQualidadePacking) {
				formApontamentoQualidadePacking = new FormApontamentoQualidadePacking({
					model : this.pageApontamentoQualidadePacking.apontamentoQualidadePackings.get(idApontamentoQualidadePacking),
				});
				this.app.mainRegion.show(formApontamentoQualidadePacking);
			} else {
				var model = new ApontamentoQualidadePackingModel({
					id : idApontamentoQualidadePacking,
				})
				model.fetch({
					success : function(model) {
						formApontamentoQualidadePacking = new FormApontamentoQualidadePacking({
							model : model,
						});
						that.app.mainRegion.show(formApontamentoQualidadePacking);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
			}
		},
		
		//configuração das rotas de Bolsao
		bolsaos: function() {
			this.headerView.setTitle('Bolsaos');
			this.pageBolsao = new PageBolsao();
			this.app.mainRegion.show(this.pageBolsao);
			util.markActiveItem('itemMenuBolsaos');
		},

		newBolsao: function() {
			util.markActiveItem('itemMenuBolsaos');
			this.headerView.setTitle('Novo Bolsao');
			this.formBolsao = new FormBolsao({
				model : new BolsaoModel(),
			});
			this.app.mainRegion.show(this.formBolsao);
		},
		
		editBolsao : function(idBolsao) {
			var that = this;
			this.headerView.setTitle('Alterar Bolsao');
			var formBolsao = null;
			if (this.pageBolsao) {
				formBolsao = new FormBolsao({
					model : this.pageBolsao.bolsaos.get(idBolsao),
				});
				this.app.mainRegion.show(formBolsao);
			} else {
				var model = new BolsaoModel({
					id : idBolsao,
				})
				model.fetch({
					success : function(model) {
						formBolsao = new FormBolsao({
							model : model,
						});
						that.app.mainRegion.show(formBolsao);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
			}
		},
		
		//configuração das rotas de Cabine
		cabines: function() {
			this.headerView.setTitle('Cabines');
			this.pageCabine = new PageCabine();
			this.app.mainRegion.show(this.pageCabine);
			util.markActiveItem('itemMenuCabines');
		},

		newCabine: function() {
			util.markActiveItem('itemMenuCabines');
			this.headerView.setTitle('Novo Cabine');
			this.formCabine = new FormCabine({
				model : new CabineModel(),
			});
			this.app.mainRegion.show(this.formCabine);
		},
		
		editCabine : function(idCabine) {
			var that = this;
			this.headerView.setTitle('Alterar Cabine');
			var formCabine = null;
			if (this.pageCabine) {
				formCabine = new FormCabine({
					model : this.pageCabine.cabines.get(idCabine),
				});
				this.app.mainRegion.show(formCabine);
			} else {
				var model = new CabineModel({
					id : idCabine,
				})
				model.fetch({
					success : function(model) {
						formCabine = new FormCabine({
							model : model,
						});
						that.app.mainRegion.show(formCabine);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
			}
		},
		
		//configuração das rotas de Cargo
		cargos: function() {
			this.headerView.setTitle('Cargos');
			this.pageCargo = new PageCargo();
			this.app.mainRegion.show(this.pageCargo);
			util.markActiveItem('itemMenuCargos');
		},

		newCargo: function() {
			util.markActiveItem('itemMenuCargos');
			this.headerView.setTitle('Novo Cargo');
			this.formCargo = new FormCargo({
				model : new CargoModel(),
			});
			this.app.mainRegion.show(this.formCargo);
		},
		
		editCargo : function(idCargo) {
			var that = this;
			this.headerView.setTitle('Alterar Cargo');
			var formCargo = null;
			if (this.pageCargo) {
				formCargo = new FormCargo({
					model : this.pageCargo.cargos.get(idCargo),
				});
				this.app.mainRegion.show(formCargo);
			} else {
				var model = new CargoModel({
					id : idCargo,
				})
				model.fetch({
					success : function(model) {
						formCargo = new FormCargo({
							model : model,
						});
						that.app.mainRegion.show(formCargo);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
			}
		},
		
		//configuração das rotas de Cliente
		clientes: function() {
			this.headerView.setTitle('Clientes');
			this.pageCliente = new PageCliente();
			this.app.mainRegion.show(this.pageCliente);
			util.markActiveItem('itemMenuClientes');
		},

		newCliente: function() {
			util.markActiveItem('itemMenuClientes');
			this.headerView.setTitle('Novo Cliente');
			this.formCliente = new FormCliente({
				model : new ClienteModel(),
			});
			this.app.mainRegion.show(this.formCliente);
		},
		
		editCliente : function(idCliente) {
			var that = this;
			this.headerView.setTitle('Alterar Cliente');
			var formCliente = null;
			if (this.pageCliente) {
				formCliente = new FormCliente({
					model : this.pageCliente.clientes.get(idCliente),
				});
				this.app.mainRegion.show(formCliente);
			} else {
				var model = new ClienteModel({
					id : idCliente,
				})
				model.fetch({
					success : function(model) {
						formCliente = new FormCliente({
							model : model,
						});
						that.app.mainRegion.show(formCliente);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
			}
		},
		
		//configuração das rotas de Cor
		cors: function() {
			this.headerView.setTitle('Cors');
			this.pageCor = new PageCor();
			this.app.mainRegion.show(this.pageCor);
			util.markActiveItem('itemMenuCors');
		},

		newCor: function() {
			util.markActiveItem('itemMenuCors');
			this.headerView.setTitle('Novo Cor');
			this.formCor = new FormCor({
				model : new CorModel(),
			});
			this.app.mainRegion.show(this.formCor);
		},
		
		editCor : function(idCor) {
			var that = this;
			this.headerView.setTitle('Alterar Cor');
			var formCor = null;
			if (this.pageCor) {
				formCor = new FormCor({
					model : this.pageCor.cors.get(idCor),
				});
				this.app.mainRegion.show(formCor);
			} else {
				var model = new CorModel({
					id : idCor,
				})
				model.fetch({
					success : function(model) {
						formCor = new FormCor({
							model : model,
						});
						that.app.mainRegion.show(formCor);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
			}
		},
		
		//configuração das rotas de Embalagem
		embalagems: function() {
			this.headerView.setTitle('Embalagems');
			this.pageEmbalagem = new PageEmbalagem();
			this.app.mainRegion.show(this.pageEmbalagem);
			util.markActiveItem('itemMenuEmbalagems');
		},

		newEmbalagem: function() {
			util.markActiveItem('itemMenuEmbalagems');
			this.headerView.setTitle('Novo Embalagem');
			this.formEmbalagem = new FormEmbalagem({
				model : new EmbalagemModel(),
			});
			this.app.mainRegion.show(this.formEmbalagem);
		},
		
		editEmbalagem : function(idEmbalagem) {
			var that = this;
			this.headerView.setTitle('Alterar Embalagem');
			var formEmbalagem = null;
			if (this.pageEmbalagem) {
				formEmbalagem = new FormEmbalagem({
					model : this.pageEmbalagem.embalagems.get(idEmbalagem),
				});
				this.app.mainRegion.show(formEmbalagem);
			} else {
				var model = new EmbalagemModel({
					id : idEmbalagem,
				})
				model.fetch({
					success : function(model) {
						formEmbalagem = new FormEmbalagem({
							model : model,
						});
						that.app.mainRegion.show(formEmbalagem);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
			}
		},
		
		//configuração das rotas de Generador
		generadors: function() {
			this.headerView.setTitle('Generadors');
			this.pageGenerador = new PageGenerador();
			this.app.mainRegion.show(this.pageGenerador);
			util.markActiveItem('itemMenuGeneradors');
		},

		newGenerador: function() {
			util.markActiveItem('itemMenuGeneradors');
			this.headerView.setTitle('Novo Generador');
			this.formGenerador = new FormGenerador({
				model : new GeneradorModel(),
			});
			this.app.mainRegion.show(this.formGenerador);
		},
		
		editGenerador : function(idGenerador) {
			var that = this;
			this.headerView.setTitle('Alterar Generador');
			var formGenerador = null;
			if (this.pageGenerador) {
				formGenerador = new FormGenerador({
					model : this.pageGenerador.generadors.get(idGenerador),
				});
				this.app.mainRegion.show(formGenerador);
			} else {
				var model = new GeneradorModel({
					id : idGenerador,
				})
				model.fetch({
					success : function(model) {
						formGenerador = new FormGenerador({
							model : model,
						});
						that.app.mainRegion.show(formGenerador);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
			}
		},
		
		//configuração das rotas de Latada
		latadas: function() {
			this.headerView.setTitle('Latadas');
			this.pageLatada = new PageLatada();
			this.app.mainRegion.show(this.pageLatada);
			util.markActiveItem('itemMenuLatadas');
		},

		newLatada: function() {
			util.markActiveItem('itemMenuLatadas');
			this.headerView.setTitle('Novo Latada');
			this.formLatada = new FormLatada({
				model : new LatadaModel(),
			});
			this.app.mainRegion.show(this.formLatada);
		},
		
		editLatada : function(idLatada) {
			var that = this;
			this.headerView.setTitle('Alterar Latada');
			var formLatada = null;
			if (this.pageLatada) {
				formLatada = new FormLatada({
					model : this.pageLatada.latadas.get(idLatada),
				});
				this.app.mainRegion.show(formLatada);
			} else {
				var model = new LatadaModel({
					id : idLatada,
				})
				model.fetch({
					success : function(model) {
						formLatada = new FormLatada({
							model : model,
						});
						that.app.mainRegion.show(formLatada);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
			}
		},
		
		//configuração das rotas de Packing
		packings: function() {
			this.headerView.setTitle('Packings');
			this.pagePacking = new PagePacking();
			this.app.mainRegion.show(this.pagePacking);
			util.markActiveItem('itemMenuPackings');
		},

		newPacking: function() {
			util.markActiveItem('itemMenuPackings');
			this.headerView.setTitle('Novo Packing');
			this.formPacking = new FormPacking({
				model : new PackingModel(),
			});
			this.app.mainRegion.show(this.formPacking);
		},
		
		editPacking : function(idPacking) {
			var that = this;
			this.headerView.setTitle('Alterar Packing');
			var formPacking = null;
			if (this.pagePacking) {
				formPacking = new FormPacking({
					model : this.pagePacking.packings.get(idPacking),
				});
				this.app.mainRegion.show(formPacking);
			} else {
				var model = new PackingModel({
					id : idPacking,
				})
				model.fetch({
					success : function(model) {
						formPacking = new FormPacking({
							model : model,
						});
						that.app.mainRegion.show(formPacking);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
			}
		},
		
		//configuração das rotas de Sacola
		sacolas: function() {
			this.headerView.setTitle('Sacolas');
			this.pageSacola = new PageSacola();
			this.app.mainRegion.show(this.pageSacola);
			util.markActiveItem('itemMenuSacolas');
		},

		newSacola: function() {
			util.markActiveItem('itemMenuSacolas');
			this.headerView.setTitle('Novo Sacola');
			this.formSacola = new FormSacola({
				model : new SacolaModel(),
			});
			this.app.mainRegion.show(this.formSacola);
		},
		
		editSacola : function(idSacola) {
			var that = this;
			this.headerView.setTitle('Alterar Sacola');
			var formSacola = null;
			if (this.pageSacola) {
				formSacola = new FormSacola({
					model : this.pageSacola.sacolas.get(idSacola),
				});
				this.app.mainRegion.show(formSacola);
			} else {
				var model = new SacolaModel({
					id : idSacola,
				})
				model.fetch({
					success : function(model) {
						formSacola = new FormSacola({
							model : model,
						});
						that.app.mainRegion.show(formSacola);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
			}
		},
		
		//configuração das rotas de Variedade
		variedades: function() {
			this.headerView.setTitle('Variedades');
			this.pageVariedade = new PageVariedade();
			this.app.mainRegion.show(this.pageVariedade);
			util.markActiveItem('itemMenuVariedades');
		},

		newVariedade: function() {
			util.markActiveItem('itemMenuVariedades');
			this.headerView.setTitle('Novo Variedade');
			this.formVariedade = new FormVariedade({
				model : new VariedadeModel(),
			});
			this.app.mainRegion.show(this.formVariedade);
		},
		
		editVariedade : function(idVariedade) {
			var that = this;
			this.headerView.setTitle('Alterar Variedade');
			var formVariedade = null;
			if (this.pageVariedade) {
				formVariedade = new FormVariedade({
					model : this.pageVariedade.variedades.get(idVariedade),
				});
				this.app.mainRegion.show(formVariedade);
			} else {
				var model = new VariedadeModel({
					id : idVariedade,
				})
				model.fetch({
					success : function(model) {
						formVariedade = new FormVariedade({
							model : model,
						});
						that.app.mainRegion.show(formVariedade);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
			}
		},
		
		config : function() {
			this.headerView.setTitle('Configurações');
			this.pageConfig = new PageConfig();
			this.app.mainRegion.show(this.pageConfig);
		},
	});
	return Router;
});
