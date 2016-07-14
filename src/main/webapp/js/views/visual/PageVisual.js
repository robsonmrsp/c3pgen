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

	var PageVisualTemplate = require('text!views/visual/tpl/PageVisualTemplate.html');
	var VisualEntity = require('views/visual/models/HtmlEntity');
	var VisualRelationship = require('views/visual/models/VisualRelationship');
	var InspetorEntidadesView = require('views/visual/InspetorEntidadesView');
	var InspetorRelacionamentosView = require('views/visual/InspetorRelacionamentosView');
	var EntityCollection = require('collections/EntityCollection');
	var AttributeCollection = require('collections/AttributeCollection');

	var RelationshipCollection = require('collections/RelationshipCollection');
	var ApplicationRelationshipCollection = require('collections/ApplicationRelationshipCollection');

	var RelationshipModel = require('models/RelationshipModel');
	var ApplicationRelationshipModel = require('models/ApplicationRelationshipModel');

	var lastPositionX = 0;

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
			inspetorRegion : '.inspetor',
			inspetorRelacionamentosRegion : '.inspetor-relacionamentos'
		},
		events : {
			'click #addEntity' : 'addEntity',
			'click #addRelation' : 'addRelation',
			'click #saveApp' : 'saveApplication',
		},

		ui : {},

		saveApplication : function() {
			var that = this;
			this.application = this.model;
			var entidadesCollection = new EntityCollection();
			var applicationRelationshipCollection = new ApplicationRelationshipCollection();

			_.each(globalVisualEntities.values(), function(visual) {
				entidadesCollection.add(visual.get('entity'));
			});

			_.each(globalVisualRelations.values(), function(relation) {
				applicationRelationshipCollection.add(new ApplicationRelationshipModel({
					source : relation.get('sourceRelationModel'),
					target : relation.get('targetRelationModel'),
					application : {
						id : that.application.get('id'),
						name : that.application.get('name'),
					},
				}));
			});

			this.application.set('entities', entidadesCollection.toJSON());

			this.application.set('applicationRelationships', applicationRelationshipCollection.toJSON());

			this.application.save({}, {
				success : function(_coll, _resp, _opt) {
					console.log('salvou os seguintes refistros.', _coll.toJSON());
				},
				error : function(_coll, _resp, _opt) {
					console.error('erro ao salvar: ', _coll.toJSON());
				},
			});
			console.log(entidadesCollection.toJSON());
			console.log(applicationRelationshipCollection.toJSON());
		},

		initialize : function() {
			var that = this;

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

			this.on('show', function() {
				this.inspetorRegion.show(this.inspetorView);
				this.inspetorRelacionamentosRegion.show(this.inspetorRelacionamentosView);

				this.graph = new Joint.dia.Graph();

				window.paper = new Joint.dia.Paper({
					el : $('#paper'),
					height : window.innerHeight,
					width : window.innerWidth,
					gridSize : 1,
					model : that.graph
				});

				window.paper.on('link:options', function(_evento, _link, x, y) {
					that.inspetorRelacionamentosView.setVisual(_link.model);
				});

				window.paper.on('cell:pointerdown', function(cellView, evt, x, y) {
					var toolRemove = $(evt.target).parents('.tool-remove')[0];
					if (toolRemove) {
						if (!confirm('Deseja remover o relacionamento')) {
							cellView.options.interactive = false;
							_.defer(function() {
								cellView.options.interactive = true;
							});
						}
					}
				});
				window.paper.on('cell:pointerup', function(_cellView, evt, x, y) {
					if (_cellView.model.get('type') == 'html.Element') {
						that.inspetorView.setVisualEntity(_cellView.model);
					}
				});

				window.paper.on('cell:pointerclick', function(_cellView, evt, x, y) {
					if (_cellView.model.get('type') == 'html.Element') {
						if (that.activeAddRelation == true) {
							if (that.sourceTempRelation == null) {
								that.sourceTempRelation = _cellView;
								that.sourceTempRelation.highlight();
							} else {
								that.targetTempRelation = _cellView;
								that.targetTempRelation.highlight();

								var relation = new VisualRelationship({
									applicationRelationshipModel : new ApplicationRelationshipModel({
										sourceEntityView : that.sourceTempRelation.model,
										targetEntityView : that.targetTempRelation.model,
									})
								});

								setTimeout(function() {
									that.sourceTempRelation.unhighlight();
									that.targetTempRelation.unhighlight();
									that.sourceTempRelation = null;
									that.targetTempRelation = null;
								}, 1000);

								$('#paper').removeClass('cursor-relacao-1-n');
								$('#paper').removeClass('cursor-tabela');
								that.activeAddRelation = false;
								that.graph.addCell(relation);

								window.globalVisualRelations.put(relation.id, relation);
							}
						}
					}
				})
				window.paper.on('blank:pointerclick', function(_cellView, evt, x, y) {
					if (that.activeAddEntity == true) {
						that.addEntity();
						var visualEntity = new VisualEntity({
							entity : that._getEntityModel({
								x : MOUSE_X,
								y : MOUSE_Y - 62
							}),
							position : {
								x : MOUSE_X,
								y : MOUSE_Y - 62
							},
							size : {
								width : 120,
								height : 100
							},
						});
						globalVisualEntities.put(visualEntity.id, visualEntity)

						that.graph.addCell(visualEntity);
						that.inspetorView.setVisualEntity(visualEntity);

						that.activeAddEntity = false
						$('#paper').removeClass('cursor-tabela');

					}
				});

				// //////////////////////////////////////////////
				this.applicationModel = new ApplicationModel();
				this.applicationModel.url = 'rs/crud/applications/generate';
				this.applicationModel.fetch({
					success : function() {
						_.each(that.applicationModel.get('entities'), function(entity) {
							console.log(entity);
							that.addVisualEntity(new EntityModel(entity));
						});

						_.each(that.applicationModel.get('applicationRelationships'), function(appRelation) {
							console.log(appRelation);
							that.addVisualRelation(appRelation);
						});
					},
					error : function() {

					},

				})

			});
		},

		addVisualEntity : function(entity) {
			var visualEntity = new VisualEntity({
				entity : entity,
				position : {
					x : entity.posX || entity.get('posX') || (nextX++ * 60),
					y : entity.posY || entity.get('posY') || (nextY++ % 5) * 140,

				},
				size : {
					width : 120,
					height : 100
				},
			});

			globalVisualEntities.put(visualEntity.id, visualEntity)

			this.graph.addCell(visualEntity);
			this.inspetorView.setVisualEntity(visualEntity);
		},

		addVisualRelation : function(applicationRelationshipModel) {
			var that = this;
			var relation = new VisualRelationship({
				applicationRelationshipModel : new ApplicationRelationshipModel({
					source : applicationRelationshipModel.source,
					target : applicationRelationshipModel.target,

					sourceEntityView : that._getEntityView(applicationRelationshipModel.source),
					targetEntityView : that._getEntityView(applicationRelationshipModel.target),
				})
			});

			that.graph.addCell(relation);

			window.globalVisualRelations.put(relation.id, relation);
		},
		_getEntityView : function(relation) {
			var visualModel = null
			_.each(globalVisualEntities.values(), function(visual) {
				if (visual.get('entity') && visual.get('entity').get('name') == relation.model) {
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

	});

	return PageVisual;

});
