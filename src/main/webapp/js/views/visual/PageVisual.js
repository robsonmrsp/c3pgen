/* generated: 30/08/2015 20:23:12 */
define(function(require) {

	// serácriado mas um botão com uma seta e somente será selecionado a
	// entidade ou o relacionamento de esse botão de seleção estiver ligado.

	// Start "Import´s Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Backgrid = require('adapters/backgrid-adapter');
	var util = require('utilities/utils');
	var Joint = require('joint');
	var AttributeModel = require('models/AttributeModel');
	var EntityModel = require('models/EntityModel');
	var ApplicationModel = require('models/ApplicationModel');
	var download = require('download');

	var PageVisualTemplate = require('text!views/visual/tpl/PageVisualTemplate.html');

	// para tentar dar zoom todos os objetos da tela devem ser graficos.
	// var VisualEntity = require('views/visual/models/VisualEntity');

	var DiagramEntityView = require('views/visual/componentes/DiagramEntityView');

	var VisualRelationship = require('views/visual/models/VisualRelationship');
	var InspetorEntidadesView = require('views/visual/InspetorEntidadesView');
	var InspetorRelacionamentosView = require('views/visual/InspetorRelacionamentosView');
	var EntityCollection = require('collections/EntityCollection');
	var AttributeCollection = require('collections/AttributeCollection');

	var RelationshipCollection = require('collections/RelationshipCollection');
	var ApplicationRelationshipCollection = require('collections/ApplicationRelationshipCollection');

	var RelationshipModel = require('models/RelationshipModel');
	var ApplicationRelationshipModel = require('models/ApplicationRelationshipModel');

	var DiagramApplicationTools = require('views/visual/componentes/DiagramApplicationTools');

	var ModalError = require('views/components/ModalError');

	var lastPositionX = 0;
	var contador = 0;
	var linha = 0;
	var coluna = 0;
	var nextX = 0;
	var nextY = 0;

	var globalVisualEntities = new Col.Map();

	var globalVisualRelations = new Col.Map();

	// http://www.sinbadsoft.com/blog/backbone-js-by-example-part-1/
	$('body').mousemove(function(e) {
		MOUSE_X = e.pageX;
		MOUSE_Y = e.pageY;
	});

	window.globalVisualEntities = globalVisualEntities;
	window.globalVisualRelations = globalVisualRelations;

	var PageVisual = Marionette.LayoutView.extend({
		template : _.template(PageVisualTemplate),

		regions : {
			diagramApplicationToolsRegion : '.diagramToolsModal',
			inspetorRegion : '.inspetor',

			inspetorRelacionamentosRegion : '.inspetor-relacionamentos'
		},
		events : {
			'click #addEntity' : 'addEntity',
			'click #addRelation' : 'addRelation',
			'click #saveApp' : 'saveApplication',
			'click #openTools' : 'openTools',
			'keyup .select-entity-notes' : 'saveCurrentEntityNotes',
			'click #generateApplication' : 'generateApplication',
		},
		saveCurrentEntityNotes : function() {
			if (this.currentSelectModel) {
				console.log(this.ui.entityTextareaNotes.val().trim())
				this.currentSelectModel.set('notes', this.ui.entityTextareaNotes.val().trim());
			}
		},
		ui : {
			entityTextareaNotes : '.select-entity-notes',
			'tootips' : '.tooltips',
			entityNotes : '.entity-notes',
		},
		initialize : function() {
			var that = this;
			lastPositionX = 0;
			contador = 0;
			linha = 0;
			coluna = 0;
			nextX = 0;
			nextY = 0;

			globalVisualEntities.clear();
			globalVisualRelations.clear();

			this.diagramApplicationTools = new DiagramApplicationTools({
				context : that,
				onExtract : that.loadApplication,
			});

			this.application = this.model;

			this.inspetorView = new InspetorEntidadesView({
				model : new EntityModel({
					name : '',
				}),
			});

			this.sourceTempRelation = null;
			this.targetTempRelation = null;

			this.inspetorRelacionamentosView = new InspetorRelacionamentosView({
				model : new ApplicationRelationshipModel(),
			});
			this.modalError = new ModalError({});
			this.on('show', function() {

				this.ui.tootips.tooltip();
				this.modalError.initIn(this);
				this.ui.entityNotes.draggable({
					cursor : "crosshair"
				});

				this.inspetorRegion.show(this.inspetorView);
				this.diagramApplicationToolsRegion.show(this.diagramApplicationTools);
				// this.inspetorRelacionamentosRegion.show(this.inspetorRelacionamentosView);

				this.graph = new Joint.dia.Graph();

				window.paper = new Joint.dia.Paper({
					el : $('#paper'),
					height : 5 * window.innerHeight,
					width : 4.5 * window.innerWidth,
					gridSize : 1,
					model : that.graph,
					// ROBSON para impedir que a cada click sobbre a linha do
					// relacionamento seja adicionado um vertice novo
					interactive : function(cellView) {
						if (cellView.model.isLink()) {
							return {
								vertexAdd : false
							};
						}
						return true;
					},
				// linkConnectionPoint :
				// Joint.util.shapePerimeterConnectionPoint
				});

				// $('#paper').css('width', (window.innerWidth - 455) + 'px')

				window.paper.on('link:pointerup', function(_link, _evento, x, y) {

					// console.log(_link)
				});
				window.paper.on('link:options', function(_evento, _link, x, y) {
					// that.inspetorRelacionamentosView.setVisual(_link.model);
				});
				window.paper.on('tool:remove', function(evt, linkView) {

					that.removeRelationship(linkView);

				})
				window.paper.on('cell:pointerdown', function(_cellView, evt, x, y) {
					// var toolRemove =
					// $(evt.target).parents('.tool-remove')[0];
					// if (toolRemove) {
					// evt.preventDefault();
					// cellView.options.interactive = false;
					// _.defer(function() {
					// cellView.options.interactive = true;
					// });
					//
					// }
					if (_cellView.model.get('type') == 'html.Element') {

						// pegar a referencia ao Diagrama associado a esse
						// cellView
						var view = globalVisualEntities.get(_cellView.model.id);

						that.inspetorView.setVisualEntity(view);
						that.currentSelectModel = that.inspetorView.entity;

						that.ui.entityTextareaNotes.val(that.inspetorView.entity.get('notes'));
						that.currentSelectModel = that.inspetorView.entity;
					}
				});
				window.paper.on('cell:pointerup', function(_cellView, evt, x, y) {
					if (_cellView.model.get('type') == 'html.Element') {

						// pegar a referencia ao Diagrama associado a esse
						// cellView
						var view = globalVisualEntities.get(_cellView.model.id);
						// that.inspetorView.setVisualEntity(view);
						if (that.activeAddRelation == true) {
							if (that.sourceTempRelation == null) {
								that.sourceTempRelation = view;
								that.sourceViewTempRelation = _cellView;
								// _cellView.highlight();
							} else {
								that.targetViewTempRelation = _cellView;
								that.targetTempRelation = view;
								var modelTarget = that.targetTempRelation.model;
								var modelSource = that.sourceTempRelation.model;

								modelTarget.set('ownerName', modelSource.get('name'));
								// _cellView.highlight();

								var relation = new VisualRelationship({
									newRelation : true,
									applicationRelationshipModel : new ApplicationRelationshipModel({
										sourceEntityView : that.sourceTempRelation,
										targetEntityView : that.targetTempRelation,
									})
								});

								setTimeout(function() {
									// that.targetViewTempRelation.unhighlight();
									// that.sourceViewTempRelation.unhighlight();

									that.sourceTempRelation = null;
									that.targetTempRelation = null;
									that.sourceViewTempRelation = null;
									that.targetViewTempRelation = null;
								}, 1000);

								that.graph.addCell(relation);
								$('#paper').removeClass('cursor-relacao-1-n');
								$('#paper').removeClass('cursor-tabela');
								that.activeAddRelation = false;

								window.globalVisualRelations.put(relation.id, relation);
							}
						}
						// console.log('terminou o drag', _cellView);
					}
				});

				window.paper.on('cell:pointerclick', function(_cellView, evt, x, y) {
					if (_cellView.model.get('type') == 'html.Element') {
						console.log("cell:pointerclick");
					}
				})
				window.paper.on('blank:pointerclick', function(_cellView, evt, x, y) {
					if (that.activeAddEntity == true) {
						that.addEntity();
						var diagramEntity = that.addVisualEntity(new EntityModel({
							posX : MOUSE_X - 230,
							posY : MOUSE_Y - 62
						}));

						that.inspetorView.setVisualEntity(diagramEntity);

						that.activeAddEntity = false
						$('#paper').removeClass('cursor-tabela');

					}
				});
				that.loadApplication(that.application);
			});
		},
		loadApplication : function(application, clean) {

			globalVisualEntities.clear();
			globalVisualRelations.clear();

			var that = this;
			if (clean) {
				globalVisualEntities.clear();
				globalVisualRelations.clear();
			}
			that.quantidadeEntidades = application.get('entities').length
			contador = 0;
			coluna = 0;
			linha = 0;
			_.each(application.get('entities'), function(entity) {
				try {
					that.addVisualEntity(new EntityModel(entity));
				} catch (e) {
					console.error(e);
				}
			});

			this.drawRelations(application);

			// _.each(application.get('applicationRelationships'),
			// function(appRelation) {
			//
			// // comentando por enquanto
			// // that.addVisualRelation(appRelation);
			// });
		},

		drawRelations : function(application) {
			var that = this;
			_.each(application.get('entities'), function(entity) {

				_.each(entity.relationships, function(relation) {
					if (relation.origin) {
						var relation = new VisualRelationship({
							applicationRelationshipModel : new ApplicationRelationshipModel({
								sourceEntityView : util.getBackViewByNameEntity(entity.name),
								targetEntityView : util.getBackViewByNameEntity(relation.model),
							})
						});
						that.graph.addCell(relation);
						window.globalVisualRelations.put(relation.id, relation);
					}
				});
			});
		},
		openTools : function() {
			this.diagramApplicationTools.showPage();
		},
		// RIDICULA ESSA CONTA, mas como tá desenhando legal as tabelas para
		// muitos registros...
		// fica assim
		addVisualEntity : function(entity) {
			var that = this;
			var _mod = this.quantidadeEntidades > 20 ? 13 : 6

			if (++contador % 9 == 0) {
				coluna = 0;
				contador = 0;
				++linha;
			}
			// var posY = 100 + ((contador++ % 2 - 1) * 260) + linha * 260; //
			// TOP
			// var posX = 120 + ((contador - 1) * 180); // LEFT
			var posY = 50 + (linha * 250);

			var posX = 120 + (250 * coluna++);

			if (!entity.get('posX'))
				entity.set('posX', posX);
			if (!entity.get('posY'))
				entity.set('posY', posY);

			entity.on('change', this.changeEntity, this);
			var diagramEntity = new DiagramEntityView({
				model : entity,
				position : {
					x : entity.posX || entity.get('posX') || posX,
					y : entity.posY || entity.get('posY') || posY,
				},
				size : {
					width : 140,
					height : 100
				},
				onClickRemove : function(visualE) {
					that.removeVisualEntity(visualE);
				},

				onChangeEntity : function(entity) {
					that.changeEntity(entity);
				},
			});
			var visualEntity = diagramEntity.getGraphEntity();
			that.graph.addCell(visualEntity);

			globalVisualEntities.put(visualEntity.id, diagramEntity);
			return diagramEntity;
			// that.inspetorView.setVisualEntity(diagramEntity);
		},
		changeEntity : function(entity) {
			//
			// console.log(JSON.stringify(entity));
		},
		addVisualRelation : function(applicationRelationshipModel) {
			var that = this;

			var _sourceEntityView = that._getEntityView(applicationRelationshipModel.target);
			var _targetEntityView = that._getEntityView(applicationRelationshipModel.source);

			var relation = new VisualRelationship({
				applicationRelationshipModel : new ApplicationRelationshipModel({
					id : applicationRelationshipModel.id,
					source : applicationRelationshipModel.source,
					target : applicationRelationshipModel.target,

					sourceEntityView : _sourceEntityView,
					targetEntityView : _targetEntityView,
				})
			});

			// esse tempo é para que todos os objetos gráficos tenham sido
			// criados antes de serem adicionados ao graph
			that.graph.addCell(relation);

			window.globalVisualRelations.put(relation.id, relation);
			// console.log('Adicionado o seguinte relacionamento: ' +
			// relation.id, relation);
		},

		validateApplication : function() {
			var old = this.model.url;
			var that = this;
			this.model.url = 'rs/crud/applications/validate/' + this.model.get('id');
			this.model.fetch({
				success : function(_model, _resp, _options) {
					that.model.url = old;
					util.showMessage('info', _resp.resp);
					// console.log(download);
					download(_resp.resp);
				},
				error : function(_model, _resp, _options) {
					util.showMessage('error', util.getJson(_resp.responseText).legalMessage || '');
					that.model.url = old;
				}
			});
		},

		validateApplication : function() {
			var that = this;
			var application = new ApplicationModel();
			application.url = 'rs/crud/applications/validate/' + this.model.get('id');
			application.fetch({
				success : function(_model, _resp, _options) {
					console.log(_resp)
					// that.modalError.showMessage(_resp);
				},
				error : function(_model, _resp, _options) {
					util.showMessage('error', util.getJson(_resp.responseText).legalMessage || '');
				}
			});
		},

		saveApplication : function() {
			var that = this;
			this.application = this.model;
			var entidadesCollection = new EntityCollection();
			var applicationRelationshipCollection = new ApplicationRelationshipCollection();

			_.each(globalVisualEntities.values(), function(visual) {
				entidadesCollection.add(visual.model);
			});

			// _.each(globalVisualRelations.values(), function(relation) {
			// applicationRelationshipCollection.add(new
			// ApplicationRelationshipModel({
			// source : relation.get('sourceRelationModel'),
			// target : relation.get('targetRelationModel'),
			// application : {
			// id : that.application.get('id'),
			// name : that.application.get('name'),
			// },
			// }));
			// });

			this.application.set('entities', entidadesCollection.toJSON());

			// this.application.set('applicationRelationships',
			// applicationRelationshipCollection.toJSON());

			this.application.save({}, {
				success : function(generateFileInfo, _resp, _opt) {
					var messages = generateFileInfo.get('applicationValidatorMessages');
					var application = generateFileInfo.get('application');
					that.graph.clear();
					// TODO quando estivermos desenhando TUDO com canvas iremos
					// remover essa linha
					$('.html-element').remove()
					that.loadApplication(new ApplicationModel(application), true);

					if (messages && messages.messages && messages.messages.length > 0) {
						that.modalError.showMessage(messages.messages);
					}
				},
				error : function(_coll, _resp, _opt) {
					console.error('erro ao salvar: ', _coll.toJSON());
				},
			});
			// console.log(entidadesCollection.toJSON());
			// console.log(applicationRelationshipCollection.toJSON());
		},

		_getEntityView : function(relation) {
			var visualModel = null
			_.each(globalVisualEntities.values(), function(visual) {
				if (visual.model.get('name') == relation.model) {
					visualModel = visual;
				}
			});
			return visualModel;
		},
		addRelation : function(_entity) {
			this.activeAddEntity = false;
			this.activeAddRelation = true;
			$('#paper').addClass('cursor-relacao-1-n');
		},

		addEntity : function() {
			var that = this;
			this.activeAddRelation = false;
			this.activeAddEntity = true;
			$('#paper').addClass('cursor-tabela');

		},

		_getEntityModel : function(opts) {
			return new EntityModel({
				name : 'Entity' + (globalVisualEntities.size() + 1),
				posX : opts && opts.x,
				posY : opts && opts.y,
			})
		},

		removeRelationship : function(linkView) {
			var model = linkView.model.get('applicationRelationshipModel');

			var sourceEntityView = model.get('sourceEntityView');
			var sourceEntity = sourceEntityView.model;

			var targetEntityView = model.get('targetEntityView');
			var targetEntity = targetEntityView.model;

			var sourceName = sourceEntity.get('name');
			var targetName = targetEntity.get('name');

			util.Bootbox.confirm("Tem certeza que deseja remover o	 relacionamento ?", function(yes) {
				if (yes) {
					var model = linkView.remove();

					window.globalVisualRelations.remove(linkView.model.get('id'));

					_.each(sourceEntity.get('relationships'), function(relation) {
						if (relation.model === targetName) {
							var relations = sourceEntity.get('relationships');

							var index = _.indexOf(relations, relation);
							relations.splice(index, 1);
							sourceEntity.set('hash', 'rem ' + new Date());
						}
					})

					_.each(targetEntity.get('relationships'), function(relation) {
						if (relation.model === sourceName) {
							var relations = targetEntity.get('relationships');

							var index = _.indexOf(relations, relation);
							relations.splice(index, 1);
							targetEntity.set('hash', 'rem ' + new Date());
						}
					})
				} else {
					// console.log(" Leaving alone link", linkView);
				}
			});
		},

		removeVisualEntity : function(visualE) {
			var that = this;
			var model = new EntityModel({
				id : visualE.model.get('id')
			});

			util.Bootbox.confirm("Tem certeza que deseja remover a entidade ?", function(yes) {
				if (yes) {
					model.destroy({
						success : function(_model, resp, xhr) {
							// Por enquanto forcando funcionar.
							try {
								visualE.remove();

								// $(visualE.$box).remove()
								globalVisualEntities.remove(visualE.getGraphEntity().id);
								// remover os relacionamentos com essa entidade
								// visualmente.

								var relations = [];

								_.each(globalVisualRelations.values(), function(relation) {
									var source = relation.get('applicationRelationshipModel').get('sourceEntityView');
									var target = relation.get('applicationRelationshipModel').get('targetEntityView');

									// console.log(source.get('model'),
									// visualE.entity.get('name'))
									if (source.model.get('name') === visualE.model.get('name')) {
										relations.push(relation)
									}

									if (target.model.get('name') === visualE.model.get('name')) {
										relations.push(relation)
									}
								});

								//
								_.each(relations, function(relation) {
									relation.remove();
									globalVisualRelations.remove(relation.id);
								});

								that.removeOrphansRelationships(visualE);
							} catch (e) {
								console.error(e);
							}
							// CONSOLE.log('Entidade removida com sucesso.');
						},

						error : function(_model, resp, xhr) {
							console.error(' erro')
						}
					})
				} else {
					// console.log(" Leaving alone link", visualE);
				}
			});

		},

		removeOrphansRelationships : function(visualE) {
			_.each(globalVisualEntities.values(), function(visualEntity) {
				var entity = visualEntity.model;

				_.each(entity.get('relationships'), function(relation) {
					if (relation.model === visualE.model.get('name')) {
						var relations = entity.get('relationships');

						var index = _.indexOf(relations, relation);

						relations.splice(index, 1);
						entity.set('notes', 'rem ' + relation);
					}
				})
			});
		},

		generateApplication : function() {
			var old = this.model.url;
			var that = this;

			this.model.url = 'rs/crud/applications/generator/' + this.model.get('id');
			this.model.fetch({
				success : function(_model, _resp, _options) {
					that.model.url = old;
					util.showMessage('info', _resp.resp);
					download(_resp.resp);
				},
				error : function(_model, _resp, _options) {
					util.showMessage('error', util.getJson(_resp.responseText).legalMessage || '');
					that.model.url = old;
				}
			});
		},
	});

	return PageVisual;

});