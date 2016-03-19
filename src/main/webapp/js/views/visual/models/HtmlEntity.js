/* generated: 30/08/2015 20:23:12 */
define(function(require) {
	var Joint = require('joint');
	var AttributeModel = require('models/AttributeModel');
	var EntityModel = require('models/EntityModel');
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

		// template : [ '<div class="html-element">', '<button
		// class="delete">x</button>', '<label></label>', '<span></span>',
		// '<br/>',
		// '<select><option>--</option><option>one</option><option>two</option></select>',
		// '<input type="text" value="I\'m HTML input" />', '</div>' ]
		// .join(''),

		template : [ '	<div class="html-element hpanel" >',//
		'       <div class="panel-body">',//
		'           <div class="text-center">',//
		'               <h2 class="m-b-xs">Box title</h2>',//
		'               <p class="font-bold text-success">Lorem ipsum</p>',//
		'               <div class="m">',//
		'                   <i class="pe-7s-science fa-5x"></i>',//
		'               </div>',//
		'               <p class="small">',//
		'                   Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',//
		'               </p>',//
		'               <button class="btn btn-success btn-sm">Action button</button>',//
		'           </div>',//
		'       </div>',//
		'   </div>',//
		'</div>' ]//
		.join(''),

		initialize : function() {
			_.bindAll(this, 'updateBox');
			Joint.dia.ElementView.prototype.initialize.apply(this, arguments);

			this.$box = $(_.template(this.template)());
			// Prevent paper from handling pointerdown.
			this.$box.find('input,select').on('mousedown click', function(evt) {
				evt.stopPropagation();
			});
			// This is an example of reacting on the input change and storing
			// the input data in the cell model.
			this.$box.find('input').on('change', _.bind(function(evt) {
				this.model.set('input', $(evt.target).val());
			}, this));
			this.$box.find('select').on('change', _.bind(function(evt) {
				this.model.set('select', $(evt.target).val());
			}, this));
			this.$box.find('select').val(this.model.get('select'));
			this.$box.find('.delete').on('click', _.bind(this.model.remove, this.model));
			// Update the box position whenever the underlying model changes.
			this.model.on('change', this.updateBox, this);
			// Remove the box when the model gets removed from the graph.
			this.model.on('remove', this.removeBox, this);

			this.model.set('size', {
				width : 170,
				height : 50,
			});

			this.updateBox();
		},
		render : function() {
			Joint.dia.ElementView.prototype.render.apply(this, arguments);
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