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
	var AttributeModel = require('models/AttributeModel');
	var AttributeCollection = require('collections/AttributeCollection');

	var EntidadeTemplate = require('text!views/categoria/tpl/EntidadeTemplate.html');

	var AtributeTemplate = require('text!views/categoria/tpl/AttributeTemplate.html');

	var AttributesItem = Marionette.ItemView.extend({
		template : _.template(AtributeTemplate),
		regions : {

		},

		events : {
			'click .showhide' : 'hideShow',
			'click .delete-attribute' : 'deleteAtribute',
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
			showhide : '.showhide',

			ediableFields : '.editable-click'
		},
		changeAttribute : function() {
			this.model.set(this.getModel());
		},
		deleteAtribute : function() {
			this.model.destroy();
		},

		getModel : function() {
			return {
				id : this.ui.inputId.text(),
				name : this.ui.inputName.text(),
				displayName : this.ui.inputDisplayName.text(),
				maxLen : this.ui.inputMaxLen.text(),
				tableFieldName : this.ui.inputTableFieldName.text(),
				masc : this.ui.inputMasc.text(),
				defaultValue : this.ui.inputDefaultValue.text(),
				placeholder : this.ui.inputPlaceholder.text(),
				required : this.ui.inputRequired.text(),
				unique : this.ui.inputUnique.text(),
			};

		},
		hideShow : function() {
			this.ui.widgetMain.toggle();
			if (this.ui.widgetMain.is(':visible')) {
				this.ui.showhide.find('i').removeClass('fa-chevron-down').addClass('fa-chevron-up')
			} else {
				this.ui.showhide.find('i').removeClass('fa-chevron-up').addClass('fa-chevron-down')
			}
		},

		initialize : function() {
			var that = this;

			this.on('show', function() {
				this.ui.ediableFields.editable();

				this.ui.ediableFields.on('hidden', function() {
					that.changeAttribute();
				})
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
		className : 'col-xs-12 col-sm-3 ',

		regions : {
			attributesRegion : '.attributes',
			relationshipsRegion : '.relationships',
		},
		events : {
			'click .add-attr' : 'addAttribute',
			'click .rem-entity' : 'deleteEntidade',
			'click .show-hide-ent' : 'hideShowEnt',
		},

		deleteEntidade : function() {
			this.model.destroy();
			this.$el.remove();
		},

		addAttribute : function() {
			this.attributesCollection.add(new AttributeModel());
		},

		ui : {
			inputEntityName : '.entity-name',
			widgetEntMain : '.widget-entidade',
			showhide : '.show-hide-ent',
			editable : '.editable-click',
			addRelation : '.add-relation',
			addAttribute : '.add-attribute',
			remEntity : '.rem-entity',
			showHideEntity : '.show-hide-ent',
		},

		initialize : function() {
			var that = this;

			this.attributesCollection = new AttributeCollection(this.model.get('attributes'));
			this.model.set('attributes', this.attributesCollection);

			this.attributes = new Attributes({
				collection : this.attributesCollection,
			});

			this.on('show', function() {
				this.ui.editable.editable();
				this.$el.tooltip()
				this.ui.addRelation.tooltip();
				this.ui.addAttribute.tooltip();
				this.ui.remEntity.tooltip();
				this.ui.showHideEntity.tooltip();

				this.attributesRegion.show(this.attributes);
			});
		},

		hideShowEnt : function() {
			this.ui.widgetEntMain.toggle();
			if (this.ui.widgetEntMain.is(':visible')) {
				this.ui.showhide.find('i').removeClass('fa-chevron-down').addClass('fa-chevron-up')
			} else {
				this.ui.showhide.find('i').removeClass('fa-chevron-up').addClass('fa-chevron-down')
			}
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
