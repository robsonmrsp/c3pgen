/* generated: 18/08/2015 15:38:44 */
define(function(require) {
	// Start "Import´s Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');

	var util = require('utilities/utils');
	var BaseCollection = require('collections/BaseCollection');
	var BaseModel = require('models/BaseModel');

	var EntidadeTemplate = require('text!views/categoria/tpl/EntidadeTemplate.html');

	var AtributeTemplate = require('text!views/categoria/tpl/AttributeTemplate.html');

	var AttributesItem = Marionette.ItemView.extend({
		template : _.template(AtributeTemplate),
		regions : {

		},

		events : {
			'click .hide-panel' : 'hideShow'
		},

		ui : {
			inputEtityName : '.entity-name',
			inputDisplayName : '.displayName',

			inputId : '.inputId',
			inputName : '.inputName',
			inputDisplayName : '.inputDisplayName',
			inputMaxLen : '.inputMaxLen',
			inputTableFieldName : '.inputTableFieldName',
			inputMasc : '.inputMasc',
			inputDefaultValue : '.inputDefaultValue',
			inputPlaceholder : '.inputPlaceholder',
			inputRequired : '.inputRequired',
			inputUnique : '.inputUnique',

			widgetMain : '.widget-main',

			ediableFields : '.editable-click'
		},

		hideShow : function() {
			this.ui.widgetMain.toggle();
		},
		initialize : function() {
			var that = this;

			this.on('show', function() {
				this.ui.ediableFields.editable();
			});
		},
	});
	var Attributes = Marionette.CollectionView.extend({
		childView : AttributesItem,

		childViewOptions : function() {

		},

		initialize : function(opt) {
			this.renderConfig = opt.renderConfig;
		},
	})
	var EntidadeItem = Marionette.LayoutView.extend({
		template : _.template(EntidadeTemplate),
		className : 'col-xs-12 col-sm-3 widget-container-col ui-sortable',

		regions : {
			attributesRegion : '.attributes',
			relationshipsRegion : '.relationships',
		},
		events : {
			'click .add-attr' : 'addAttribute'
		},
		addAttribute : function() {
			this.attributesCollection.add(new BaseModel());
		},

		ui : {
			inputEtityName : '.entity-name',
		},
		initialize : function() {
			var that = this;
			this.attributesCollection = new BaseCollection();

			this.attributes = new Attributes({
				collection : this.attributesCollection,
			});

			this.on('show', function() {
				this.ui.inputEtityName.editable();
				this.attributesRegion.show(this.attributes);
			});
		},
	});

	var EntidadeCollection = Marionette.CollectionView.extend({
		childView : EntidadeItem,

		childViewOptions : function() {

		},

		initialize : function(opt) {
			this.renderConfig = opt.renderConfig;
		},
	})

	return EntidadeCollection;
});
