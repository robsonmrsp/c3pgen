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

	<#list application.entities as entity>
		<#if entity.hasMobile == true>
	var Page${entity.name} = require('views/${firstLower(entity.name)}/Page${entity.name}');
	var Form${entity.name} = require('views/${firstLower(entity.name)}/Form${entity.name}');
	var ${entity.name}Model = require('models/${entity.name}Model');
	var ${entity.name}Collection = require('collections/${entity.name}Collection');
		</#if>
	</#list>

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
		},
		initialize : function(options) {
			this.on('show', function() {
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
			"app/config" : "config",
			<#list application.entities as entity>
			<#if entity.hasMobile == true>
			// hashs de ${entity.name}
			'app/${firstLower(entity.name)}s' : '${firstLower(entity.name)}s',
			'app/new${entity.name}' : 'new${entity.name}',
			'app/edit${entity.name}/:id' : 'edit${entity.name}',
			</#if>			
			</#list>			
		},
		
		<#list application.entities as entity>
		<#if entity.hasMobile == true>
		//configuração das rotas de ${entity.name}
		${firstLower(entity.name)}s: function() {
			this.headerView.setTitle('${entity.displayName}s');
			this.page${entity.name} = new Page${entity.name}();
			this.app.mainRegion.show(this.page${entity.name});
			util.markActiveItem('itemMenu${entity.displayName}s');
		},

		new${entity.name}: function() {
			util.markActiveItem('itemMenu${entity.displayName}s');
			this.headerView.setTitle('Novo ${entity.displayName}');
			this.form${entity.name} = new Form${entity.name}({
				model : new ${entity.name}Model(),
			});
			this.app.mainRegion.show(this.form${entity.name});
		},
		
		edit${entity.name} : function(id${entity.name}) {
			var that = this;
			this.headerView.setTitle('Alterar ${entity.displayName}');
			var form${entity.name} = null;
			if (this.page${entity.name}) {
				form${entity.name} = new Form${entity.name}({
					model : this.page${entity.name}.${firstLower(entity.name)}s.get(id${entity.name}),
				});
				this.app.mainRegion.show(form${entity.name});
			} else {
				var model = new ${entity.name}Model({
					id : id${entity.name},
				})
				model.fetch({
					success : function(model) {
						form${entity.name} = new Form${entity.name}({
							model : model,
						});
						that.app.mainRegion.show(form${entity.name});
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
			}
		},
		
		</#if>
		</#list>
		config : function() {
			this.headerView.setTitle('Configurações');
			this.pageConfig = new PageConfig();
			this.app.mainRegion.show(this.pageConfig);
		},
	});
	return Router;
});
