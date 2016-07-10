/* generated: 18/08/2015 15:38:44 */
define(function(require) {
	// Start "Import´s Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');

	var util = require('utilities/utils');
	var C3P = require('utilities/C3pUtil');
	var BaseCollection = require('collections/BaseCollection');
	var BaseModel = require('models/BaseModel');
	var AttributeModel = require('models/AttributeModel');

	var DiagramAttributeItemViewTemplate = require('text!views/visual/componentes/tpl/DiagramAttributeItemViewTemplate.html');

	var DiagramAttributeItemView = Marionette.ItemView.extend({
		template : _.template(DiagramAttributeItemViewTemplate),

		events : {},

		ui : {},

		initialize : function() {
			var that = this;

			this.on('show', function() {
				console.log(this.model);
			});
		},
	});

	return DiagramAttributeItemView;
});
