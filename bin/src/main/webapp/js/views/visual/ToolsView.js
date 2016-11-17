
/*
 * Somente poderá ser usado se mudar o desenho da entidade para um grafico mesmo. 
 */
define(function(require) {
	// Start "Import´s Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');

	var util = require('utilities/utils');
	var ToolsViewTemplate = require('text!views/visual/tpl/ToolsViewTemplate.html');

	var EntidadeItem = Marionette.LayoutView.extend({
		template : _.template(ToolsViewTemplate),

		className : ' drag-item',

		regions : {

		},

		events : {
			'click .zoomMais' : 'zoomMais',
			'click .zoomMenos' : 'zoomMenos',
		},

		paperScale : function(sx, sy) {
			this.paper.scale(sx, sy);
		},

		zoomMais : function() {
			this.graphScale += 0.1;
			this.paperScale(this.graphScale, this.graphScale);
		},

		zoomMenos : function() {
			this.graphScale = 1;
			this.paperScale(this.graphScale, this.graphScale);
		},
		ui : {},

		initialize : function(opt) {
			this.graphScale = 1;
			this.paper = opt.paper;

			this.$el.draggable({
				handle : 'h5',
				containment : ".drag-tools",
				scroll : false,
				stop : function() {
				}
			});

			this.on('show', function() {
				var that = this;
			});
		},

	});

	return EntidadeItem;
});
