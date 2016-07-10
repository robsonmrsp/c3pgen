/* generated: 30/08/2015 20:23:12 */
define(function(require) {
	var Joint = require('joint');

	var AttributeModel = require('models/AttributeModel');
	var EntityModel = require('models/EntityModel');

	Joint.shapes.html = Joint.shapes.html || {};

	Joint.shapes.html.VisualRelationship = Joint.dia.Link.extend({

		defaults : {
			type : 'html.Relation',
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
				}

			},
			labels : [ {
				position : 25,
				attrs : {
					text : {
						text : '...'
					}
				}
			}, {
				position : -25,
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
			applicationRelationshipModel : {},
			smooth : false,
		},

		initialize : function(options) {
			if (!options || !options.id) {
				this.set('id', Joint.util.uuid(), {
					silent : true
				});
			}

			this._transitionIds = {};
			var that = this;
			this.processPorts();
			this.on('change:attrs', this.processPorts, this);
			this.label(0, {
				position : 25,
				attrs : {
					text : {
						text : this.get('applicationRelationshipModel').get('source').get('name'),
					}
				}
			});
			this.label(1, {
				position : -25,
				attrs : {
					text : {
						text : this.get('applicationRelationshipModel').get('target').get('name'),
					}
				}
			});
		},

		getKey : function() {
			return {
				sourceName : this.get('applicationRelationshipModel').get('source').get('name'),
				targetName : this.get('applicationRelationshipModel').get('target').get('name')
			}
		}
	});

	Joint.shapes.html.VisualRelationshipView = Joint.dia.LinkView.extend({
		nomeDaClasse : 'VisualRelationshipView',
		initialize : function(options) {
			Joint.dia.LinkView.prototype.initialize.apply(this, arguments);
			this.nomeDaClasse = 'VisualRelationshipView';
		}
	});

	return Joint.shapes.html.VisualRelationship;

});
