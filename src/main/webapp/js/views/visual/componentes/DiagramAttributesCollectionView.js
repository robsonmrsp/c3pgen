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
	var DiagramAttributeCollectionViewTemplate = require('text!views/visual/componentes/tpl/DiagramAttributeCollectionViewTemplate.html');

	var EntidadeCollection = Marionette.CompositeView.extend({
		template : _.template(DiagramAttributeCollectionViewTemplate),
		childViewContainer : '.lista-atributos',

		childView : DiagramAttributeItemView,

		childViewOptions : function() {

		},

		initialize : function(opt) {

		},
	})

	return EntidadeCollection;
});
// js/views/visual/components/tpl/DiagramAttributeCollectionViewTemplate.html
