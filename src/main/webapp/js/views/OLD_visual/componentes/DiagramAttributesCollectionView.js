/* generated: 18/08/2015 15:38:44 */
define(function(require) {
	// Start "Import´s Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var util = require('utilities/utils');

	var DiagramAttributeItemView = require('views/visual/componentes/DiagramAttributeItemView');

	var EntidadeCollection = Marionette.CollectionView.extend({
		childView : DiagramAttributeItemView,

		childViewOptions : function() {

		},

		initialize : function(opt) {

		},
	})

	return EntidadeCollection;
});
