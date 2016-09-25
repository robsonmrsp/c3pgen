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
	var PageGenerador = require('views/generador/PageGenerador');
	var FormGenerador = require('views/generador/FormGenerador');
	var GeneradorModel = require('models/GeneradorModel');
	var GeneradorCollection = require('collections/GeneradorCollection');

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
			// hashs de Generador
			'app/generadors' : 'generadors',
			'app/newGenerador' : 'newGenerador',
			'app/editGenerador/:id' : 'editGenerador',
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
		
		config : function() {
			this.headerView.setTitle('Configurações');
			this.pageConfig = new PageConfig();
			this.app.mainRegion.show(this.pageConfig);
		},
	});
	return Router;
});
