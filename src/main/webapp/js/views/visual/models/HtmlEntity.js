/* generated: 30/08/2015 20:23:12 */
define(function(require) {
	var Joint = require('joint');
	var _ = require('adapters/underscore-adapter');
	var util = require('utilities/utils');

	var AttributeModel = require('models/AttributeModel');

	var EntityModel = require('models/EntityModel');

	var HtmlEntityTemplate = require('text!views/visual/models/tpl/HtmlEntityTemplate.html');
	var Col = require('adapters/col-adapter');

	Joint.shapes.html = Joint.shapes.html || {};

	Joint.shapes.html.Element = Joint.shapes.basic.Rect.extend({
		nomeClasse : 'HtmlEntity:Element',

		initialize : function(opt) {
			Joint.shapes.html.Element.__super__.initialize.apply(this, arguments);
			this.htmlView = opt.htmlView;
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
			// Joint.dia.ElementView.prototype.initialize.apply(this, arguments);
			Joint.shapes.html.ElementView.__super__.initialize.apply(this, arguments);
			var that = this;
			this.htmlView = opt.htmlView;

			_.bindAll(this, 'updateBox');

			// this.entity = this.model.get('entity');

			this.$box = $(_.template(this.template)());

			this.model.on('change', this.updateBox, this);
			this.model.on('destroy', this.removeBox, this);

			this.model.set('size', {
				width : 200,
				height : 160,
			});

			this.updateBox();

			// this.entity.on('change', this._changeEntity, this);
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
			var that = this;
			Joint.dia.ElementView.prototype.render.apply(this, arguments);

			util.appendView(this.$box, this.htmlView);

			this.paper.$el.prepend(this.$box);
			this.updateBox();

			window.setTimeout(function() {
				that.resizeView({
					width : that.htmlView.$el.width(),
					height : that.htmlView.$el.height()
				})
			}, 10);

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
	// _changeEntity : function(_ent) {
	// this.entity.set(_ent.attributes);
	//
	// if (this.model.onChangeEntity) {
	// this.model.onChangeEntity(_ent);
	// }
	// this.htmlView.refresh(this.entity);
	// },
	});

	return Joint.shapes.html.Element;

});
ç