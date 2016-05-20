/* generated: 30/08/2015 20:23:12 */
define(function(require) {
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

	var lastPositionX = 200;

	var visualEntities = new Col.Map();

	var visualRelations = new Col.Map();

	// http://www.sinbadsoft.com/blog/backbone-js-by-example-part-1/
	$('body').mousemove(function(e) {
		// console.log(e.pageX, e.pageY)
		MOUSE_X = e.pageX;
		MOUSE_Y = e.pageY;
	});

	window.visualEntities = visualEntities;
	window.visualRelations = visualRelations;

	var PageVisual = Marionette.LayoutView.extend({
		template : _.template(PageVisualTemplate),

		regions : {
			inspectorRegion : '.inspector',
			inspectorRelationamentosRegion : '.inspector-relacionamentos'
		},
		events : {
			'click #addEntity' : 'addEntity',
			'click #addRelation' : 'addRelation',
			'click #saveApp' : 'saveApplication',
		},

		ui : {},

		initialize : function() {
			var that = this;
			var entities = new EntityCollection(this.model.get('entities'));

			var applicationRelationships = new ApplicationRelationshipCollection(this.model.get('applicationRelationships'));

			this.inspetorView = new InspetorEntidadesView({
				model : new EntityModel({
					name : '',
				}),
			});
			this.inspectorRelationamentosView = new InspetorRelacionamentosView({
				model : new EntityModel({
					name : '',
				}),
			});

			this.on('show', function() {
				this.inspectorRegion.show(this.inspetorView);
				// this.inspectorRelationamentosRegion.show(this.inspectorRelationamentosView);
				this.graph = new Joint.dia.Graph();

				window.paper = new Joint.dia.Paper({
					el : $('#paper'),
					height : window.innerHeight,
					width : window.innerWidth,
					gridSize : 1,
					model : that.graph
				});

				window.paper.on('cell:pointerup', function(_cellView, evt, x, y) {
					if (_cellView.model.get('type') == 'html.Element') {
						that.inspetorView.setVisualEntity(_cellView);
					}
				});

				// somente para garantir que tudo estará setando antes de
				// adicionar as entidades ao painter
				entities.each(function(ent) {
					that.addEntity(ent);
				});

				// TODO ver se é necessário
				applicationRelationships.each(function(apprel) {
					that.addRelationship(apprel);
				});

				// Provavelmente será jancado o evendo de criação de
				// relacionamento a partir da telinha de inspetor.
				util.VENT.on('entity.add.rel', function(/* HtmlEntity */entityVSourceDiagram, /* HtmlEntity */entityVTargetDiagram, /* ApplicationRelationshipModel */applicationRelationshipModel) {

					that.addRelation(entityVSourceDiagram, entityVTargetDiagram, applicationRelationshipModel);
				})
			});
		},

		saveApplication : function() {
			this.application = this.model;
			var entidadesCollection = new EntityCollection();
			var applicationRelationshipCollection = new ApplicationRelationshipCollection();

			_.each(visualEntities.values(), function(visual) {
				entidadesCollection.add(visual.get('entity'));
			});

			_.each(visualRelations.values(), function(visualRel) {
				applicationRelationshipCollection.add(visualRel.get('applicationRelationshipModel'));
			});

			this.application.set('entities', entidadesCollection);
			this.application.set('applicationRelationships', applicationRelationshipCollection);

			this.application.save({}, {

				success : function(_model, _resp, _options) {
					console.log("Applicação salva com sucesso!");
				},
				error : function(_model, _resp, _options) {
					util.showMessage('error', 'Problema ao salvar registro: ' + util.getJson(_resp.responseText).legalMessage || '');
					util.logError(_resp);
				}
			})

			console.log(JSON.stringify(this.application));
		},

		_lastPosition : function() {

			if (lastPositionX < (window.innerWidth - 160)) {
				lastPositionX += 160;
			} else {
				lastPositionX = 200;
			}
			return lastPositionX
		},

		addRelation : function(/* HtmlEntity */source, /* HtmlEntity */target, /* RelationsipModel */relModel) {

			var that = this;

			if (_.isUndefined(source)) {
				throw new TypeError("source is required");
			}

			if (_.isUndefined(target)) {
				throw new TypeError("target is required");
			}

			var relation = new VisualRelationship({
				source : source,
				target : target,
				applicationRelationshipModel : relModel,
			});

			that.graph.addCell(relation);
			visualRelations.put(relation.getKey(), relation);

		},

		// addRelationship : function(/* applicationRelationshipModel */appRel) {
		// var visualRelation = new VisualRelationship({
		// applicationRelationshipModel : appRel,
		// });
		//
		// visualRelations.put(visualRelation.id, visualRelation)
		//
		// that.graph.addCell(visualRelatio);
		// },

		/**
		 * Deve receber um EntityModel
		 */
		addEntity : function(_entity) {
			var that = this;
			var visualEntity = new VisualEntity({
				entity : that._getEntityModel(_entity),
				position : {
					x : (_entity && _entity.get && _entity.get('posX')) || this._lastPosition(),
					y : (_entity && _entity.get && _entity.get('posY')) || 200
				},

				size : {
					width : 120,
					height : 100
				},

			});
			visualEntities.put(visualEntity.id, visualEntity)

			that.graph.addCell(visualEntity);
		},
		_getEntityModel : function(_entity) {
			if (_entity && _entity.get) {

				return _entity;
			} else {
				return new EntityModel({
					name : 'NO_NAME_' + lastPositionX,
				})
			}
		},

	});

	return PageVisual;

});
