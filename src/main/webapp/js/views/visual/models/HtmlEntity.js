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
		nomeClasse : 'HtmlEntity:Element',

		initialize : function(opt) {
			Joint.shapes.html.Element.__super__.initialize.apply(this, arguments);
			this.onClickRemove = opt.onClickRemove;
		},
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
		nomeClasse : 'HtmlEntity:ElementView',
		template : HtmlEntityTemplate,

		initialize : function(opt) {
			var that = this;
			this.onClickRemove = opt.onClickRemove;
			_.bindAll(this, 'updateBox');
			Joint.dia.ElementView.prototype.initialize.apply(this, arguments);

			this.entity = this.model.get('entity');

			this.diagramEntityView = new DiagramEntityView({
				model : this.entity,
				container : this,
				onClickRemove : function(evt) {
					if (that.model.onClickRemove) {
						that.model.onClickRemove(that);
					}
				},
			});

			this.$box = $(_.template(this.template)());

			this.model.on('change', this.updateBox, this);
			this.model.on('destroy', this.removeBox, this);

			this.model.set('size', {
				width : 150,
				height : 160,
			});

			this.updateBox();

			this.entity.on('change', this._changeEntity, this);
		},

		resizeView : function(size) {
			this.model.set('size', {
				width : size.width,
				height : size.height,
			});
			this.updateBox()
			this.$box.css('height', size.height);
		},

		render : function() {
			Joint.dia.ElementView.prototype.render.apply(this, arguments);

			util.appendView(this.$box, this.diagramEntityView);

			this.paper.$el.prepend(this.$box);
			this.updateBox();
			return this;
		},

		updateBox : function() {
			var bbox = this.model.getBBox();
			this.$box.css({
				width : bbox.width,
				height : bbox.height,
				left : bbox.x,
				top : bbox.y,
				transform : 'rotate(' + (this.model.get('angle') || 0) + 'deg)'
			});
		},
		removeBox : function(evt) {
			this.$el.remove();
		},
		_changeEntity : function(_ent) {
			this.entity.set(_ent.attributes);
			this.diagramEntityView.refresh(this.entity);
		},
	});

	return Joint.shapes.html.Element;

});