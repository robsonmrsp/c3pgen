/* generated: 30/08/2015 20:23:12 */
define(function(require) {
	var Joint = require('joint');

	var AttributeModel = require('models/AttributeModel');
	var RelationshipModel = require('models/RelationshipModel');
	var EntityModel = require('models/EntityModel');

	Joint.shapes.html = Joint.shapes.html || {};

	Joint.shapes.html.VisualRelationship = Joint.dia.Link.extend({
		_nomeClasse : 'VisualRelationship',
		defaults : {
			type : 'html.Relation',
			router : {
				name : 'manhattan'
			},
			connector : {
				name : 'rounded'
			},
			attrs : {
				'.connection' : {
					stroke : '#333333',
					'stroke-width' : 3
				},
				'.marker-target' : {
					fill : '#333333',
					d : 'M 10 0 L 0 5 L 10 10 z'
				}
			},
			labels : [ {
				position : 35,
				attrs : {
					text : {
						text : '...'
					}
				}
			}, {
				position : -35,
				attrs : {
					text : {
						text : '...'
					}
				}
			} ],

			source : {
				x : 10,
				y : 280
			},
			target : {
				x : 740,
				y : 280
			},

			// construido inicialmente
			sourceRelationModel : null,
			targetRelationModel : null,

			sourceEntityModel : null,
			targetEntityModel : null,

			smooth : false,
		},

		refresh : function(newSourceModel, newTargetModel) {

			this.get('sourceRelationModel').set(newSourceModel);
			this.get('targetRelationModel').set(newTargetModel);

			this._updateLabels();
		},

		initialize : function(options) {

			// Talvez não precise desse bloco applicationRelationshipModel
			var _source = this.get('applicationRelationshipModel').get('sourceEntityView');
			var _target = this.get('applicationRelationshipModel').get('targetEntityView');

			var _sourceEntity = null;// _source.get('entity');
			var _targetEntity = null;// _target.get('entity');
			var _sourceRelationModel = null;
			var _targetRelationModel = null;
			if (_source && _target) {
				var _sourceEntity = _source.get('entity');
				var _targetEntity = _target.get('entity');

				this.set('source', _source);
				this.set('target', _target);

				_sourceRelationModel = new RelationshipModel({
					name : '_' + _targetEntity.get('name'),
					type : 'OneToMany',
					displayName : _targetEntity.get('name') + 's',
					ownerName : '',
					model : _targetEntity.get('name'),
					entity : _sourceEntity,
					uniDirecional : '',
				});

				_targetRelationModel = new RelationshipModel({
					name : '_' + _sourceEntity.get('name'),
					type : 'ManyToOne',
					displayName : _sourceEntity.get('name') + 's',
					ownerName : '',
					model : _sourceEntity.get('name'),
					entity : _targetEntity,
					uniDirecional : '',
				});
			}
			if (this.get('applicationRelationshipModel').get('source')) {
				_sourceRelationModel = new RelationshipModel(this.get('applicationRelationshipModel').get('source'));
			}

			if (this.get('applicationRelationshipModel').get('target')) {
				_targetRelationModel = new RelationshipModel(this.get('applicationRelationshipModel').get('target'));
			}
			this.set('sourceRelationModel', _sourceRelationModel);
			this.set('targetRelationModel', _targetRelationModel);

			if (!options || !options.id) {
				this.set('id', Joint.util.uuid(), {
					silent : true
				});
			}

			this._transitionIds = {};
			var that = this;
			this.processPorts();
			this.on('change:attrs', this.processPorts, this);
			this._updateLabels();

		},
		_updateLabels : function() {
			this.label(0, {
				position : 35,
				attrs : {
					text : {
						text : this.get('targetRelationModel').get('name'),
					}
				}
			});
			this.label(1, {
				position : -35,
				attrs : {
					text : {
						text : this.get('sourceRelationModel').get('name'),
					}
				}
			});
			// this.update();
		},
	});

	Joint.shapes.html.VisualRelationshipView = Joint.dia.LinkView.extend({
		_nomeClasse : 'VisualRelationshipView',
		options : {
			shortLinkLength : 100,
			doubleLinkTools : true,
			longLinkLength : 160,
			linkToolsOffset : 40,
			doubleLinkToolsOffset : 60,
			sampleInterval : 50
		},

		initialize : function(options) {
			console.log(this.options);
			Joint.dia.LinkView.prototype.initialize.apply(this, arguments);
			this.nomeDaClasse = 'VisualRelationshipView';
		}
	});

	return Joint.shapes.html.VisualRelationship;

});
