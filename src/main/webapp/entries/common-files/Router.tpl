define(function(require) {
	var $ = require('adapters/jquery-adapter');
	var _ = require('adapters/underscore-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var util = require('utilities/utils');
	<#list application.entities as entity>
	
	var Page${entity.name} = require('views/${firstLower(entity.name)}/Page${entity.name}');
	var Form${entity.name} = require('views/${firstLower(entity.name)}/Form${entity.name}');
	var ${entity.name}Model = require('models/${entity.name}Model');
	</#list>
	
	util.NProgress.setBlockerPanel('block_panel');
	
	var CustomRegion = Marionette.Region.extend({
		el : ".main-content",

		attachHtml : function(view) {
			this.$el.hide();
			this.$el.html(view.el);
			//this.$el.slideDown(300);
			//this.$el.show("slide", { direction: "up" }, 300);
			util.scrollTop();
			this.$el.fadeIn(300);
			view.listenTo(view, 'show', function() {
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
			<#list application.entities as entity>
			// hashs de ${entity.name}
			'app/${firstLower(entity.name)}s' : '${firstLower(entity.name)}s',
			'app/new${entity.name}' : 'new${entity.name}',
			'app/edit${entity.name}/:id' : 'edit${entity.name}',
			</#list>			
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
		
		<#list application.entities as entity>
		//configuração das rotas de ${entity.name}
		${firstLower(entity.name)}s: function() {
			util.markActiveItem('${firstLower(entity.name)}s');
			this.page${entity.name} = new Page${entity.name}();
			this.App.mainRegion.show(this.page${entity.name});
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : '${entity.displayName}',
				itemSubFolderName : 'Listagem',
				url : 'app/${firstLower(entity.name)}s'
			});
		},

		new${entity.name}: function() {
			util.markActiveItem('${firstLower(entity.name)}s');
			var form${entity.name} = new Form${entity.name}({
				model : new ${entity.name}Model(),
			});
			this.App.mainRegion.show(form${entity.name});
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : '${entity.displayName}',
				itemSubFolderName : 'Formulário de cadastro de ${entity.displayName}',
				url : 'app/${firstLower(entity.name)}s'
			});
		},
		
		edit${entity.name}: function(id${entity.name}) {
			var that = this;
			util.markActiveItem('${firstLower(entity.name)}s');
			var form${entity.name} = null;
			if (this.page${entity.name}) {
				form${entity.name} = new Form${entity.name}({
					model : this.page${entity.name}.${firstLower(entity.name)}s.get(id${entity.name}),
				});
				that.App.mainRegion.show(form${entity.name});
			} else {
				var model = new ${entity.name}Model({
					id : id${entity.name},
				})
				model.fetch({
					success : function(model) {
						form${entity.name} = new Form${entity.name}({
							model : model,
						});
						that.App.mainRegion.show(form${entity.name});
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : '${entity.name}s',
					itemSubFolderName : 'Formulário de atualização de ${entity.displayName}',
					url : 'app/${firstLower(entity.name)}s'
				});
			}
		},
		
	</#list>
		start : function() {
			Backbone.history.start();
		}
	});
	return AppRouter;
});
