define(function(require) {
	var $ = require('adapters/jquery-adapter');
	var _ = require('adapters/underscore-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var util = require('utilities/utils');

	var PageCategoria = require('views/categoria/PageCategoria');

	var PageApplication = require('views/application/PageApplication');
	var FormApplication = require('views/application/FormApplication');
	var ApplicationModel = require('models/ApplicationModel');

	var PageAttribute = require('views/attribute/PageAttribute');
	var FormAttribute = require('views/attribute/FormAttribute');
	var AttributeModel = require('models/AttributeModel');

	var PageAttributeType = require('views/attributeType/PageAttributeType');
	var FormAttributeType = require('views/attributeType/FormAttributeType');
	var AttributeTypeModel = require('models/AttributeTypeModel');

	var PageEntity = require('views/entity/PageEntity');
	var FormEntity = require('views/entity/FormEntity');
	var EntityModel = require('models/EntityModel');

	var PageRelationship = require('views/relationship/PageRelationship');
	var FormRelationship = require('views/relationship/FormRelationship');
	var RelationshipModel = require('models/RelationshipModel');

	var PageViewApproach = require('views/viewApproach/PageViewApproach');
	var FormViewApproach = require('views/viewApproach/FormViewApproach');
	var ViewApproachModel = require('models/ViewApproachModel');

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

	var PageClient = require('views/client/PageClient');
	var FormClient = require('views/client/FormClient');
	var ClientModel = require('models/ClientModel');

	var PageCliente = require('views/cliente/PageCliente');
	var FormCliente = require('views/cliente/FormCliente');
	var ClienteModel = require('models/ClienteModel');

	// var PageItem = require('views/item/PageItem');
	// var FormItem = require('views/item/FormItem');
	// var ItemModel = require('models/ItemModel');

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

	var PageItemModulo = require('views/itemModulo/PageItemModulo');
	var FormItemModulo = require('views/itemModulo/FormItemModulo');
	var ItemModuloModel = require('models/ItemModuloModel');

	var PageModulo = require('views/modulo/PageModulo');
	var FormModulo = require('views/modulo/FormModulo');
	var ModuloModel = require('models/ModuloModel');

	var PageUser = require('views/user/PageUser');
	var FormUser = require('views/user/FormUser');
	var UserModel = require('models/UserModel');

	var PageVisual = require('views/visual/PageVisual');

	var Editor = require('views/editor/Editor');
	var PageHelpGenerateYaml = require('views/helpGenerateYaml/PageHelpGenerateYaml');

	util.NProgress.setBlockerPanel('block_panel');

	// REMOVER ESSA GAMBA NO FUTURO
	$('#wrapper').height($(window).height() - 62);
	$(window).resize(function(a, b, c) {
		$('#wrapper').height($(window).height() - 62);
	});

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
			'app/visual/:id' : 'visual',

			// hashs de Application
			// 'app/visual' : 'visual',
			'' : 'applications',
			'app/applications' : 'applications',
			'app/application/:idApp/entities' : 'entitiesByApplication',
			'app/categoria' : 'categoria',
			'app/newApplication' : 'newApplication',
			'app/editApplication/:id' : 'editApplication',
			// hashs de Attribute
			'app/attributes' : 'attributes',
			'app/newAttribute' : 'newAttribute',
			'app/editAttribute/:id' : 'editAttribute',
			// hashs de AttributeType
			'app/attributeTypes' : 'attributeTypes',
			'app/newAttributeType' : 'newAttributeType',
			'app/editAttributeType/:id' : 'editAttributeType',
			// hashs de Entity
			'app/entitys' : 'entitys',
			'app/newEntity' : 'newEntity',
			'app/editEntity/:id' : 'editEntity',
			// hashs de Relationship
			'app/relationships' : 'relationships',
			'app/newRelationship' : 'newRelationship',
			'app/editRelationship/:id' : 'editRelationship',
			// hashs de ViewApproach
			'app/viewApproachs' : 'viewApproachs',
			'app/newViewApproach' : 'newViewApproach',
			'app/editViewApproach/:id' : 'editViewApproach',
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
			// hashs de Client
			'app/clients' : 'clients',
			'app/newClient' : 'newClient',
			'app/editClient/:id' : 'editClient',
			// hashs de Cliente
			'app/clientes' : 'clientes',
			'app/newCliente' : 'newCliente',
			'app/editCliente/:id' : 'editCliente',
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

			// hashs de ItemModulo
			'app/itemModulos' : 'itemModulos',
			'app/newItemModulo' : 'newItemModulo',
			'app/editItemModulo/:id' : 'editItemModulo',
			// hashs de Modulo
			'app/modulos' : 'modulos',
			'app/newModulo' : 'newModulo',
			'app/editModulo/:id' : 'editModulo',
			// hashs de User
			'app/users' : 'users',
			'app/newUser' : 'newUser',
			'app/editUser/:id' : 'editUser',

			'app/helpGenerateYaml/:appId' : 'helpGenerateYaml',
			'app/editor/:id' : 'editor',
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

		// configuração das rotas de Application
		applications : function() {
			util.markActiveItem('applications');
			this.pageApplication = new PageApplication();
			this.App.mainRegion.show(this.pageApplication);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Application',
				itemSubFolderName : 'Grid',
				url : 'app/applications'
			});
		},
		editor : function(idModulo) {
			var that = this;
			var model = new ModuloModel({
				id : idModulo,
			})

			model.fetch({
				success : function(model) {
					that.editor = new Editor({
						model : model,
					});
					that.App.mainRegion.show(that.editor);
				},
				error : function(x, y, z) {
					console.error(x, y, z);
				}
			});
		},
		visual : function(idApplication) {
			var that = this;
			util.markActiveItem('visual');

			var model = new ApplicationModel({
				id : idApplication,
			})

			model.fetch({
				success : function(model) {
					that.pageVisual = new PageVisual({
						model : model,
					});
					that.App.mainRegion.show(that.pageVisual);
				},
				error : function(x, y, z) {
					console.error(x, y, z);
				}
			});

			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Application',
				itemSubFolderName : 'Grid',
				url : 'app/visual'
			});
		},

		entitiesByApplication : function(idApplication) {
			var that = this;
			var application = new ApplicationModel({
				id : idApplication,
			})
			application.fetch({
				success : function(model) {
					that.pageCategoria = new PageCategoria({
						application : application,
					});
					that.App.mainRegion.show(that.pageCategoria);
				},
				error : function(x, y, z) {
					console.error(x, y, z);
				}
			})
		},
		categoria : function() {
			this.pageCategoria = new PageCategoria({

			});
			this.App.mainRegion.show(this.pageCategoria);
		},

		newApplication : function() {
			util.markActiveItem('applications');
			var formApplication = new FormApplication({
				model : new ApplicationModel(),
			});
			this.App.mainRegion.show(formApplication);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Application',
				itemSubFolderName : 'Formulário de cadastro',
				url : 'app/applications'
			});
		},

		editApplication : function(idApplication) {
			var that = this;
			util.markActiveItem('applications');
			var formApplication = null;
			if (this.pageApplication) {
				formApplication = new FormApplication({
					model : this.pageApplication.applications.get(idApplication),
				});
				that.App.mainRegion.show(formApplication);
			} else {
				var model = new ApplicationModel({
					id : idApplication,
				})
				model.fetch({
					success : function(model) {
						formApplication = new FormApplication({
							model : model,
						});
						that.App.mainRegion.show(formApplication);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Applicationos',
					itemSubFolderName : 'Formulário de atualização',
					url : 'app/applications'
				});
			}
		},

		// configuração das rotas de Attribute
		attributes : function() {
			util.markActiveItem('attributes');
			this.pageAttribute = new PageAttribute();
			this.App.mainRegion.show(this.pageAttribute);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Attribute',
				itemSubFolderName : 'Grid',
				url : 'app/attributes'
			});
		},

		newAttribute : function() {
			util.markActiveItem('attributes');
			var formAttribute = new FormAttribute({
				model : new AttributeModel(),
			});
			this.App.mainRegion.show(formAttribute);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Attribute',
				itemSubFolderName : 'Formulário de cadastro',
				url : 'app/attributes'
			});
		},

		editAttribute : function(idAttribute) {
			var that = this;
			util.markActiveItem('attributes');
			var formAttribute = null;
			if (this.pageAttribute) {
				formAttribute = new FormAttribute({
					model : this.pageAttribute.attributes.get(idAttribute),
				});
				that.App.mainRegion.show(formAttribute);
			} else {
				var model = new AttributeModel({
					id : idAttribute,
				})
				model.fetch({
					success : function(model) {
						formAttribute = new FormAttribute({
							model : model,
						});
						that.App.mainRegion.show(formAttribute);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Attributeos',
					itemSubFolderName : 'Formulário de atualização',
					url : 'app/attributes'
				});
			}
		},

		// configuração das rotas de AttributeType
		attributeTypes : function() {
			util.markActiveItem('attributeTypes');
			this.pageAttributeType = new PageAttributeType();
			this.App.mainRegion.show(this.pageAttributeType);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'AttributeType',
				itemSubFolderName : 'Grid',
				url : 'app/attributeTypes'
			});
		},

		newAttributeType : function() {
			util.markActiveItem('attributeTypes');
			var formAttributeType = new FormAttributeType({
				model : new AttributeTypeModel(),
			});
			this.App.mainRegion.show(formAttributeType);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'AttributeType',
				itemSubFolderName : 'Formulário de cadastro',
				url : 'app/attributeTypes'
			});
		},

		editAttributeType : function(idAttributeType) {
			var that = this;
			util.markActiveItem('attributeTypes');
			var formAttributeType = null;
			if (this.pageAttributeType) {
				formAttributeType = new FormAttributeType({
					model : this.pageAttributeType.attributeTypes.get(idAttributeType),
				});
				that.App.mainRegion.show(formAttributeType);
			} else {
				var model = new AttributeTypeModel({
					id : idAttributeType,
				})
				model.fetch({
					success : function(model) {
						formAttributeType = new FormAttributeType({
							model : model,
						});
						that.App.mainRegion.show(formAttributeType);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'AttributeTypeos',
					itemSubFolderName : 'Formulário de atualização',
					url : 'app/attributeTypes'
				});
			}
		},

		// configuração das rotas de Entity
		entitys : function() {
			util.markActiveItem('entitys');
			this.pageEntity = new PageEntity();
			this.App.mainRegion.show(this.pageEntity);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Entity',
				itemSubFolderName : 'Grid',
				url : 'app/entitys'
			});
		},

		newEntity : function() {
			util.markActiveItem('entitys');
			var formEntity = new FormEntity({
				model : new EntityModel(),
			});
			this.App.mainRegion.show(formEntity);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Entity',
				itemSubFolderName : 'Formulário de cadastro',
				url : 'app/entitys'
			});
		},

		editEntity : function(idEntity) {
			var that = this;
			util.markActiveItem('entitys');
			var formEntity = null;
			if (this.pageEntity) {
				formEntity = new FormEntity({
					model : this.pageEntity.entitys.get(idEntity),
				});
				that.App.mainRegion.show(formEntity);
			} else {
				var model = new EntityModel({
					id : idEntity,
				})
				model.fetch({
					success : function(model) {
						formEntity = new FormEntity({
							model : model,
						});
						that.App.mainRegion.show(formEntity);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Entityos',
					itemSubFolderName : 'Formulário de atualização',
					url : 'app/entitys'
				});
			}
		},

		// configuração das rotas de Relationship
		relationships : function() {
			util.markActiveItem('relationships');
			this.pageRelationship = new PageRelationship();
			this.App.mainRegion.show(this.pageRelationship);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Relationship',
				itemSubFolderName : 'Grid',
				url : 'app/relationships'
			});
		},

		newRelationship : function() {
			util.markActiveItem('relationships');
			var formRelationship = new FormRelationship({
				model : new RelationshipModel(),
			});
			this.App.mainRegion.show(formRelationship);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Relationship',
				itemSubFolderName : 'Formulário de cadastro',
				url : 'app/relationships'
			});
		},

		editRelationship : function(idRelationship) {
			var that = this;
			util.markActiveItem('relationships');
			var formRelationship = null;
			if (this.pageRelationship) {
				formRelationship = new FormRelationship({
					model : this.pageRelationship.relationships.get(idRelationship),
				});
				that.App.mainRegion.show(formRelationship);
			} else {
				var model = new RelationshipModel({
					id : idRelationship,
				})
				model.fetch({
					success : function(model) {
						formRelationship = new FormRelationship({
							model : model,
						});
						that.App.mainRegion.show(formRelationship);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Relationshipos',
					itemSubFolderName : 'Formulário de atualização',
					url : 'app/relationships'
				});
			}
		},

		// configuração das rotas de ViewApproach
		viewApproachs : function() {
			util.markActiveItem('viewApproachs');
			this.pageViewApproach = new PageViewApproach();
			this.App.mainRegion.show(this.pageViewApproach);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'ViewApproach',
				itemSubFolderName : 'Grid',
				url : 'app/viewApproachs'
			});
		},

		newViewApproach : function() {
			util.markActiveItem('viewApproachs');
			var formViewApproach = new FormViewApproach({
				model : new ViewApproachModel(),
			});
			this.App.mainRegion.show(formViewApproach);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'ViewApproach',
				itemSubFolderName : 'Formulário de cadastro',
				url : 'app/viewApproachs'
			});
		},

		editViewApproach : function(idViewApproach) {
			var that = this;
			util.markActiveItem('viewApproachs');
			var formViewApproach = null;
			if (this.pageViewApproach) {
				formViewApproach = new FormViewApproach({
					model : this.pageViewApproach.viewApproachs.get(idViewApproach),
				});
				that.App.mainRegion.show(formViewApproach);
			} else {
				var model = new ViewApproachModel({
					id : idViewApproach,
				})
				model.fetch({
					success : function(model) {
						formViewApproach = new FormViewApproach({
							model : model,
						});
						that.App.mainRegion.show(formViewApproach);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'ViewApproachos',
					itemSubFolderName : 'Formulário de atualização',
					url : 'app/viewApproachs'
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
				itemSubFolderName : 'Grid',
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
				itemSubFolderName : 'Formulário de cadastro',
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
					itemLabel : 'Bairroos',
					itemSubFolderName : 'Formulário de atualização',
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
				itemSubFolderName : 'Grid',
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
				itemSubFolderName : 'Formulário de cadastro',
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
					itemLabel : 'Cepos',
					itemSubFolderName : 'Formulário de atualização',
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
				itemSubFolderName : 'Grid',
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
				itemSubFolderName : 'Formulário de cadastro',
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
					itemLabel : 'Cidadeos',
					itemSubFolderName : 'Formulário de atualização',
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
				itemSubFolderName : 'Grid',
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
				itemSubFolderName : 'Formulário de cadastro',
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
					itemLabel : 'Enderecoos',
					itemSubFolderName : 'Formulário de atualização',
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
				itemSubFolderName : 'Grid',
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
				itemSubFolderName : 'Formulário de cadastro',
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
					itemLabel : 'Estadoos',
					itemSubFolderName : 'Formulário de atualização',
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
				itemSubFolderName : 'Grid',
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
				itemSubFolderName : 'Formulário de cadastro',
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
					itemLabel : 'Paisos',
					itemSubFolderName : 'Formulário de atualização',
					url : 'app/paiss'
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
				itemLabel : 'Cliente',
				itemSubFolderName : 'Grid',
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
				itemLabel : 'Cliente',
				itemSubFolderName : 'Formulário de cadastro',
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
					itemLabel : 'Clientos',
					itemSubFolderName : 'Formulário de atualização',
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
				itemSubFolderName : 'Grid',
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
				itemSubFolderName : 'Formulário de cadastro',
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
					itemLabel : 'Clienteos',
					itemSubFolderName : 'Formulário de atualização',
					url : 'app/clientes'
				});
			}
		},

		// configuração das rotas de Item
		// items : function() {
		// util.markActiveItem('items');
		// this.pageItem = new PageItem();
		// this.App.mainRegion.show(this.pageItem);
		// util.breadcrumb({
		// iconClass : 'fa-desktop',
		// itemLabel : 'Item',
		// itemSubFolderName : 'Grid',
		// url : 'app/items'
		// });
		// },
		//
		// newItem : function() {
		// util.markActiveItem('items');
		// var formItem = new FormItem({
		// model : new ItemModel(),
		// });
		// this.App.mainRegion.show(formItem);
		// util.breadcrumb({
		// iconClass : 'fa-desktop',
		// itemLabel : 'Item',
		// itemSubFolderName : 'Formulário de cadastro',
		// url : 'app/items'
		// });
		// },
		//
		// editItem : function(idItem) {
		// var that = this;
		// util.markActiveItem('items');
		// var formItem = null;
		// if (this.pageItem) {
		// formItem = new FormItem({
		// model : this.pageItem.items.get(idItem),
		// });
		// that.App.mainRegion.show(formItem);
		// } else {
		// var model = new ItemModel({
		// id : idItem,
		// })
		// model.fetch({
		// success : function(model) {
		// formItem = new FormItem({
		// model : model,
		// });
		// that.App.mainRegion.show(formItem);
		// },
		// error : function(x, y, z) {
		// console.error(x, y, z);
		// }
		// })
		// util.breadcrumb({
		// iconClass : 'fa-calendar',
		// itemLabel : 'Itemos',
		// itemSubFolderName : 'Formulário de atualização',
		// url : 'app/items'
		// });
		// }
		// },

		// configuração das rotas de ItemType
		itemTypes : function() {
			util.markActiveItem('itemTypes');
			this.pageItemType = new PageItemType();
			this.App.mainRegion.show(this.pageItemType);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Tipo de Item',
				itemSubFolderName : 'Grid',
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
				itemSubFolderName : 'Formulário de cadastro',
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
					itemLabel : 'ItemTypeos',
					itemSubFolderName : 'Formulário de atualização',
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
				itemSubFolderName : 'Grid',
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
				itemSubFolderName : 'Formulário de cadastro',
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
					itemLabel : 'Operationos',
					itemSubFolderName : 'Formulário de atualização',
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
				itemSubFolderName : 'Grid',
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
				itemSubFolderName : 'Formulário de cadastro',
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
					itemLabel : 'Permissionos',
					itemSubFolderName : 'Formulário de atualização',
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
				itemSubFolderName : 'Grid',
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
				itemSubFolderName : 'Formulário de cadastro',
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
					itemLabel : 'Roleos',
					itemSubFolderName : 'Formulário de atualização',
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
				itemSubFolderName : 'Grid',
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
				itemSubFolderName : 'Formulário de cadastro',
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
					itemLabel : 'Sessionos',
					itemSubFolderName : 'Formulário de atualização',
					url : 'app/sessions'
				});
			}
		},
		// configuração das rotas de ItemModulo
		itemModulos : function() {
			util.markActiveItem('itemModulos');
			this.pageItemModulo = new PageItemModulo();
			this.App.mainRegion.show(this.pageItemModulo);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Item do Módulo',
				itemSubFolderName : 'Grid',
				url : 'app/itemModulos'
			});
		},

		newItemModulo : function() {
			util.markActiveItem('itemModulos');
			var formItemModulo = new FormItemModulo({
				model : new ItemModuloModel(),
			});
			this.App.mainRegion.show(formItemModulo);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Item do Módulo',
				itemSubFolderName : 'Formulário de cadastro',
				url : 'app/itemModulos'
			});
		},

		editItemModulo : function(idItemModulo) {
			var that = this;
			util.markActiveItem('itemModulos');
			var formItemModulo = null;
			if (this.pageItemModulo) {
				formItemModulo = new FormItemModulo({
					model : this.pageItemModulo.itemModulos.get(idItemModulo),
				});
				that.App.mainRegion.show(formItemModulo);
			} else {
				var model = new ItemModuloModel({
					id : idItemModulo,
				})
				model.fetch({
					success : function(model) {
						formItemModulo = new FormItemModulo({
							model : model,
						});
						that.App.mainRegion.show(formItemModulo);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'ItemModuloos',
					itemSubFolderName : 'Formulário de atualização',
					url : 'app/itemModulos'
				});
			}
		},

		// configuração das rotas de Modulo
		modulos : function() {
			util.markActiveItem('modulos');
			this.pageModulo = new PageModulo();
			this.App.mainRegion.show(this.pageModulo);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Módulo',
				itemSubFolderName : 'Grid',
				url : 'app/modulos'
			});
		},

		newModulo : function() {
			util.markActiveItem('modulos');
			var formModulo = new FormModulo({
				model : new ModuloModel(),
			});
			this.App.mainRegion.show(formModulo);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Módulo',
				itemSubFolderName : 'Formulário de cadastro',
				url : 'app/modulos'
			});
		},

		editModulo : function(idModulo) {
			var that = this;
			util.markActiveItem('modulos');
			var formModulo = null;
			if (this.pageModulo) {
				formModulo = new FormModulo({
					model : this.pageModulo.modulos.get(idModulo),
				});
				that.App.mainRegion.show(formModulo);
			} else {
				var model = new ModuloModel({
					id : idModulo,
				})
				model.fetch({
					success : function(model) {
						formModulo = new FormModulo({
							model : model,
						});
						that.App.mainRegion.show(formModulo);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Moduloos',
					itemSubFolderName : 'Formulário de atualização',
					url : 'app/modulos'
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
				itemSubFolderName : 'Grid',
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
				itemSubFolderName : 'Formulário de cadastro',
				url : 'app/users'
			});
		},

		helpGenerateYaml : function(appId) {
			this.pageHelpGenerateYaml = new PageHelpGenerateYaml({
				appId : appId,
			});
			this.App.mainRegion.show(this.pageHelpGenerateYaml);
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
					itemLabel : 'Useros',
					itemSubFolderName : 'Formulário de atualização',
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
