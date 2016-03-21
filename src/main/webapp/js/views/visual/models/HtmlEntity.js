/* generated: 30/08/2015 20:23:12 */
define(function(require) {
	var Joint = require('joint');
	var _ = require('adapters/underscore-adapter');
	var util = require('utilities/utils');

	var AttributeModel = require('models/AttributeModel');

	var EntityModel = require('models/EntityModel');

	var HtmlEntityTemplate = require('text!views/visual/models/tpl/HtmlEntityTemplate.html');
	var DiagramEntityView = require('views/visual/componentes/DiagramEntityView');
	var Col = require('adapters/col-adapter');

	Joint.shapes.html = Joint.shapes.html || {};
	Joint.shapes.html.Element = Joint.shapes.basic.Rect.extend({
		defaults : Joint.util.deepSupplement({
			type : 'html.Element',
			attrs : {
				rect : {
					stroke : 'none',
					'fill-opacity' : 0
				}
			}
		}, Joint.shapes.basic.Rect.prototype.defaults)
	});

	// a view
	Joint.shapes.html.ElementView = Joint.dia.ElementView.extend({

		template : HtmlEntityTemplate,

		initialize : function(opt) {
			_.bindAll(this, 'updateBox');
			Joint.dia.ElementView.prototype.initialize.apply(this, arguments);

			this.entity = this.model.get('entity');

			this.diagramEntityView = new DiagramEntityView({
				model : this.entity,
			});

			this.$box = $(_.template(this.template)());

			this.model.on('change', this.updateBox, this);
			this.model.on('remove', this.removeBox, this);

			this.model.set('size', {
				width : 150,
				height : 160,
			});

			this.updateBox();
		},
		render : function() {
			Joint.dia.ElementView.prototype.render.apply(this, arguments);

			util.appendView(this.$box, this.diagramEntityView);

			this.paper.$el.prepend(this.$box);
			this.updateBox();
			return this;
		},
		updateBox : function() {
			// Set the position and dimension of the box so that it covers the
			// JointJS element.
			var bbox = this.model.getBBox();
			// Example of updating the HTML with a data stored in the cell
			// model.
			this.$box.find('label').text(this.model.get('label'));
			this.$box.find('span').text(this.model.get('select'));
			this.$box.css({
				width : bbox.width,
				height : bbox.height,
				left : bbox.x,
				top : bbox.y,
				transform : 'rotate(' + (this.model.get('angle') || 0) + 'deg)'
			});
		},
		removeBox : function(evt) {
			this.$box.remove();
		}
	});

	return Joint.shapes.html.Element;

});