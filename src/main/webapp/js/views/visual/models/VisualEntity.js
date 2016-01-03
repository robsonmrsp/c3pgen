/* generated: 30/08/2015 20:23:12 */
define(function(require) {
	var Joint = require('joint');

	var VisualEntity = Joint.shapes.basic.Generic.extend({

		markup : [ '<g class="rotatable">', '<g class="scalable">', '<rect class="uml-class-name-rect"/><rect class="uml-class-attrs-rect"/><rect class="uml-class-relationships-rect"/>', '</g>',
				'<text class="uml-class-name-text"/><text class="uml-class-attrs-text"/><text class="uml-class-relationships-text"/>', '</g>' ].join(''),

		defaults : Joint.util.deepSupplement({

			type : 'uml.Class',

			attrs : {
				rect : {
					'width' : 200
				},

				'.uml-class-name-rect' : {
					fill : '#ff8450',
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
				}
			},

			name : [],
			attributes : [ 'id: Integer (+)' ],
			relationships : []

		}, Joint.shapes.basic.Generic.prototype.defaults),

		addAttribute : function(attrModel) {

			this.attributeModels.push(attrModel);

			var attrs = this.get('attributes');
			attrs.push(attrModel.get('name') + ':' + attrModel.get('type').className);
			this.set('attributes', attrs);

			this.updateRectangles();
			this.trigger('uml-update');
		},

		initialize : function() {
			this.attributeModels = [];
			this.on('cell:pointerclick', function(a, b, c) {
				console.log(a, b, c)
			});

			this.on('change:name change:attributes change:relationships', function() {
				this.updateRectangles();
				this.trigger('uml-update');
			}, this);

			this.updateRectangles();

			Joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
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
				height : newH + 12,
			});

		}

	});
	return VisualEntity;

});