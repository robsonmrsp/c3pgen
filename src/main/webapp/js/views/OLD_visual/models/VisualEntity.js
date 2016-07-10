/* generated: 30/08/2015 20:23:12 */
define(function(require) {
	var Joint = require('joint');
	var AttributeModel = require('models/AttributeModel');
	var EntityModel = require('models/EntityModel');
	var Col = require('adapters/col-adapter');

	var VisualEntity = Joint.shapes.basic.Generic.extend({

		markup : [ '<g class="rotatable">',//
		           '<g class="scalable">',// 
		           			'<rect class="uml-class-name-rect"/> ',//
		           			'<rect class="uml-class-attrs-rect"/>',//
		           			'<rect class="uml-class-relationships-rect"/>',// 
		           		'</g>',//
		           		'<text class="uml-class-name-text"/>',//
		           		'<text class="uml-class-attrs-text"/>',//
		           		'<text class="uml-class-relationships-text"/>',// 
		           	'</g>',
		           	'<div class="uml-class-point-relation-css"> </div>'//
		           		].join(''),

		defaults : Joint.util.deepSupplement({

			type : 'uml.Class',

			attrs : {
				rect : {
					'width' : 200
				},

				
				'.uml-class-name-rect' : {
					fill : '#ff8450',
					'max-height' : '45px',
					stroke : '#fff',
					'stroke-width' : 0.5
				},
				'.uml-class-attrs-rect' : {
					fill : '#fe976a',
					stroke : '#fff',
					'stroke-width' : 0.5,
				},

				'.uml-class-relationships-rect' : {
					fill : '#fe976a',
					stroke : '#fff',
					'stroke-width' : 0.5,
				},
				'.uml-class-attrs-text' : {
					'ref-y' : 0.5,
					'fill' : 'black',
					'y-alignment' : 'middle',
					'ref' : '.uml-class-attrs-rect',
					'ref-x' : 5,
					'fill' : 'black',
					'font-size' : 12,
					'font-family' : 'Times New Roman'

				},

				'.uml-class-name-text' : {
					'ref' : '.uml-class-name-rect',
					'ref-y' : .5,
					'ref-x' : .5,
					'text-anchor' : 'middle',
					'y-alignment' : 'middle',
					'font-weight' : 'bold',
					'fill' : 'black',
					'font-size' : 12,
					'font-family' : 'Times New Roman'
				},

				'.uml-class-relationships-text' : {
					'ref' : '.uml-class-relationships-rect',
					'ref-y' : 5,
					'ref-x' : 5,
					'fill' : 'black',
					'font-size' : 12,
					'font-family' : 'Times New Roman'
				},

			},

			name : 'NO_NAME_ON_VISUAL',
			attributes : [ 'id: Integer (+)' ],
			relationships : []

		}, Joint.shapes.basic.Generic.prototype.defaults),

		getAttributes : function() {
			return this.mapAtributes.values();
		},

		getRelationships : function() {
			return this.mapRelationships.values();
		},
		addAttribute : function(modelAttribute) {

			this.set('attributes', this._mergeAttributes(modelAttribute));

			this.updateRectangles();
			this.trigger('uml-update');
		},

		update : function(modelEntity) {
			this.mapAtributes.clear();
			this.mapRelationships.clear();
			this.updateViewWithEntity(modelEntity);

			this.updateRectangles();
			this.trigger('uml-update');
		},

		updateViewWithEntity : function(entity) {
			var that = this;
			this.set('name', entity.get('name'));

			this.set('attributes', this._mergeAttributes());

			if (entity.get('attributes')) {
				entity.get('attributes').each(function(attr) {
					that.addAttribute(attr);
				});
			}
			// Depois de atualizar a view, atualizamos o core
			this.entity.set(entity.attributes);
		},

		_mergeAttributes : function(modelAttribute) {

			var returnArrayAtributes = [ 'id: Integer (+)' ];

			if (modelAttribute) {
				this.mapAtributes.put(modelAttribute.get('name'), modelAttribute);
				_.each(this.mapAtributes.values(), function(attrModel) {
					returnArrayAtributes.push(attrModel.get('name') + ':' + attrModel.get('type').className);
				})
			}
			return returnArrayAtributes;
		},

		initialize : function(opt) {
			this.entity = new EntityModel();
			this.mapAtributes = new Col.Map();
			this.mapRelationships = new Col.Map();

			this.entity.set(opt.entity.attributes);
			
			this.entity
			

			this.on('cell:pointerclick', function(a, b, c) {

			});

			this.updateViewWithEntity(this.entity);

			this.on('change:name change:attributes change:relationships', function() {
				this.updateRectangles();
				this.trigger('uml-update');

			}, this);

			this.updateRectangles();

			Joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
		},

		setOnSelect : function(_onSel) {
			this.onSelect = _onSel;
		},

		getClassName : function() {
			return this.get('name');
		},

		updateRectangles : function() {

			var that = this;
			var attrs = this.get('attrs');

			var rects = [ {
				type : 'name',
				text : this.getClassName()
			}, {
				type : 'attrs',
				text : this.get('attributes')
			}, {
				type : 'relationships',
				text : this.get('relationships') 
			} ];

			var offsetY = 0;

			_.each(rects, function(rect) {
				var lines = _.isArray(rect.text) ? rect.text : [ rect.text ];
				var rectHeight = lines.length * 20 + 20;

				attrs['.uml-class-' + rect.type + '-text'].text = lines.join('\n');
				attrs['.uml-class-' + rect.type + '-rect'].height = rectHeight;
				attrs['.uml-class-' + rect.type + '-rect'].transform = 'translate(0,' + offsetY + ')';

				offsetY += rectHeight;
			});
			var newH = that.get('size').height;

			that.set('size', {
				width : 160,
				height : newH + 0.7,
			});

			this.updateEntityPosition();
		},
		updateEntityPosition : function() {
			var position = this.get('position');
			this.entity.set('posX', position.x);
			this.entity.set('posY', position.y);
		}
	});
	return VisualEntity;

});