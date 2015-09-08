define(function(require) {
	'use strict';

	var _ = require('adapters/underscore-adapter');
	var $ = require('jquery');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var TesteView = require('views/teste/TesteView');
	var LeftPanelView = require('views/leftPanel/LeftPanelView');
	var HeaderView = require('views/header/HeaderView');
	var PageConfig = require('views/config/PageConfig');

	var PageFilmes = require('views/filme/PageFilmes');
	var FormFilme = require('views/filme/FormFilme');
	var FilmeModel = require('models/FilmeModel');
	var FilmeCollection = require('collections/FilmeCollection');
	// var FilmePageCollection =
	// require('collections/FilmePageCollection');

	var FormPessoa = require('views/pessoa/FormPessoa');

	var Waves = require('waves');
	var util = require('utilities/Utils');
	var DataBaseHelper = require('utilities/DataBaseHelper');

	setTimeout(function() {

		Waves.attach('#showLeft', [ 'waves-cicle' ]);
		Waves.attach('#showBottom', [ 'waves-cicle' ]);
		Waves.init();
		var blockerPanel = $('#loadInitialPanel');
		blockerPanel.on('transitionend', function() {
		});
		blockerPanel.effect("fade", null, 1000, function() {
			console.log("carregando a aplicação");
			// blockerPanel.remove()
		});
	}, 1000);
	var CustomRegion = Marionette.Region.extend({
		el : ".main-content",
		attachHtml : function(view) {
			this.$el.hide();
			this.$el.html(view.el);
			this.$el.show("slide", { direction: "right" }, 300);
			
//			this.$el.show("slide", {
//				direction : "down"
//			}, 300);
//			className : 'animated fadeInRight',

		},
		initialize : function(options) {
			this.on('show', function() {
				// faz a magia do jquerymobile
				this.$el.enhanceWithin();
			})
		},
	});

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
			"app/filmes" : "filmes",
			"app/newFilme" : "newFilme",
			"app/config" : "configuracao",
			"app/editFilme/:id" : "editFilme"
		},

		editFilme : function(idFilme) {
			var that = this;
			this.headerView.setTitle('Alterar Filme');
			var formFilme = null;
			if (this.pageFilme) {
				formFilme = new FormFilme({
					model : this.pageFilme.filmes.get(idFilme),
				});
				this.app.mainRegion.show(formFilme);
			} else {
				var model = new FilmeModel({
					id : idFilme,
				})
				model.fetch({
					success : function(model) {
						formFilme = new FormFilme({
							model : model,
						});
						that.app.mainRegion.show(formFilme);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
			}
		},

		filmes : function() {
			this.headerView.setTitle('Filmes');
			this.pageFilme = new PageFilmes();
			this.app.mainRegion.show(this.pageFilme);
		},

		configuracao : function() {
			this.headerView.setTitle('Configurações');
			this.pageConfig = new PageConfig();
			this.app.mainRegion.show(this.pageConfig);
		},

		newFilme : function() {
			this.headerView.setTitle('Novo Filme');
			this.formFilme = new FormFilme({
				model : new FilmeModel(),
			});
			this.app.mainRegion.show(this.formFilme);
		},

	});

	return Router;

});