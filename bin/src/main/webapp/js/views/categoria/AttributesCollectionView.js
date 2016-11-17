/* generated: 18/08/2015 15:38:44 */
define(function(require) {
	// Start "Import´s Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var util = require('utilities/utils');

	var AttributeItemView = require('views/categoria/AttributeItemView');

	var EntidadeCollection = Marionette.CollectionView.extend({
		childView : AttributeItemView,

		childViewOptions : function() {

		},

		initialize : function(opt) {

		},
	})

	return EntidadeCollection;
});
