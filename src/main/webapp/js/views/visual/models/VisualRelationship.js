/* generated: 30/08/2015 20:23:12 */
define(function(require) {
	var Joint = require('joint');

	var AttributeModel = require('models/AttributeModel');
	var RelationshipModel = require('models/RelationshipModel');
	var EntityModel = require('models/EntityModel');

	Joint.shapes.html = Joint.shapes.html || {};

	Joint.shapes.html.VisualRelationship = Joint.dia.Link
			.extend({
				_nomeClasse : 'VisualRelationship',
				defaults : {
					type : 'html.Relation',
					router : {
						name : 'metro'
					},
					connector : {
						name : 'rounded'
					},
					attrs : {

						'.marker-source' : {
							fill : '#4b4a67',
							stroke : '#4b4a67',
							d : 'M 10 0 L 0 5 L 10 10 z'
						},

						'.marker-target' : {
							fill : '#4b4a67',
							stroke : '#4b4a67',
							d : 'M 10 0 L 0 5 L 10 10 z'
						},
						'.marker-arrowhead' : {
							fill : '#aaaaaa',
							stroke : '#aaaaaa',
							d : 'M 10 0 L 0 5 L 10 10 z'
						},

					},
					labels : [ {

						position : 25,
						attrs : {
							text : {
								'font-size' : '10px',
								text : '...'
							},

						},
					}, {
						position : -25,
						attrs : {
							text : {
								'font-size' : '10px',
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
					toolMarkup : [
							'<g class="link-tool">',
							'<g class="tool-remove" event="tool:remove">',
							'<circle r="11" />',
							'<path transform="scale(.8) translate(-16, -16)" d="M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z"/>',
							'<title>Remove link.</title>',
							'</g>',
							'**<g event="link:options">**',
							'<circle r="11" transform="translate(25)"/>',
							'<path fill="white" transform="scale(.55) translate(29, -16)" d="M31.229,17.736c0.064-0.571,0.104-1.148,0.104-1.736s-0.04-1.166-0.104-1.737l-4.377-1.557c-0.218-0.716-0.504-1.401-0.851-2.05l1.993-4.192c-0.725-0.91-1.549-1.734-2.458-2.459l-4.193,1.994c-0.647-0.347-1.334-0.632-2.049-0.849l-1.558-4.378C17.165,0.708,16.588,0.667,16,0.667s-1.166,0.041-1.737,0.105L12.707,5.15c-0.716,0.217-1.401,0.502-2.05,0.849L6.464,4.005C5.554,4.73,4.73,5.554,4.005,6.464l1.994,4.192c-0.347,0.648-0.632,1.334-0.849,2.05l-4.378,1.557C0.708,14.834,0.667,15.412,0.667,16s0.041,1.165,0.105,1.736l4.378,1.558c0.217,0.715,0.502,1.401,0.849,2.049l-1.994,4.193c0.725,0.909,1.549,1.733,2.459,2.458l4.192-1.993c0.648,0.347,1.334,0.633,2.05,0.851l1.557,4.377c0.571,0.064,1.148,0.104,1.737,0.104c0.588,0,1.165-0.04,1.736-0.104l1.558-4.377c0.715-0.218,1.399-0.504,2.049-0.851l4.193,1.993c0.909-0.725,1.733-1.549,2.458-2.458l-1.993-4.193c0.347-0.647,0.633-1.334,0.851-2.049L31.229,17.736zM16,20.871c-2.69,0-4.872-2.182-4.872-4.871c0-2.69,2.182-4.872,4.872-4.872c2.689,0,4.871,2.182,4.871,4.872C20.871,18.689,18.689,20.871,16,20.871z"/>',
							'<title>Link options.</title>', '</g>', '</g>' ].join('')
				},

				refresh : function(newSourceModel, newTargetModel) {

					this.get('sourceRelationModel').set(newSourceModel);

					this.get('targetRelationModel').set(newTargetModel);

					this.get('applicationRelationshipModel').set('source',newSourceModel);
					this.get('applicationRelationshipModel').set('target',newTargetModel);

					this._updateLabels();
				},

				initialize : function(options) {

					// Talvez não precise desse bloco
					// applicationRelationshipModel
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
						// this.set('source', _target);// TODO resolver deppois
						// essa
						// consusao
					}

					if (this.get('applicationRelationshipModel').get('target')) {
						_targetRelationModel = new RelationshipModel(this.get('applicationRelationshipModel').get('target'));
						// this.set('target', _source);// TODO resolver deppois
						// essa
						// consusao
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
					if (options.postConstructor) {
						options.postConstructor();
					}

				},
				_updateLabels : function() {
					this.label(0, {
						position : -25,
						attrs : {
							text : {
								text : this.get('targetRelationModel').get('name'),
							}
						}
					});
					this.label(1, {
						position : 25,
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
