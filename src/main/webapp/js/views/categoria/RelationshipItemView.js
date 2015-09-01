/* generated: 18/08/2015 15:38:44 */
define(function(require) {
	// Start "Import´s Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');

	var util = require('utilities/utils');

	var RelationshipModel = require('models/RelationshipModel');
	var RelationshipItemViewTemplate = require('text!views/categoria/tpl/RelationshipItemViewTemplate.html');

	var RelationshipItem = Marionette.ItemView.extend({
		template : _.template(RelationshipItemViewTemplate),
		regions : {

		},

		events : {
			'click .showhide-rel' : 'hideShow',
			'click .delete-relationship' : 'deleteRelationship',
		},

		ui : {
			inputId : '.inputId',
			inputRelationshipName : '.inputRelationshipName',
			inputDisplayName : '.inputDisplayName',
			inputModel : '.inputModel',
			inputOwnerName : '.inputOwnerName',
			inputUniDirecional : '.inputUniDirecional',

			widgetMain : '.widget-main-rel',
			showhide : '.showhide-rel',
			editableFields : '.editable-click'
		},
		changeRelationship : function() {
			this.model.set(this.getModel());
		},
		deleteRelationship : function() {
			this.model.destroy();
		},

		getModel : function() {
			return {
				id : this.ui.inputId.val(),
				name : this.ui.inputRelationshipName.text(),
				displayName : this.ui.inputDisplayName.text(),
				model : this.ui.inputModel.text(),
				ownerName : this.ui.inputOwnerName.text(),
				uniDirecional : this.ui.inputUniDirecional.is(':checked')
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
				this.ui.editableFields.editable({	emptytext : '[[ -- ]]'});

				this.ui.editableFields.on('hidden', function() {
					that.changeRelationship();
				})
			});
		},
	});

	return RelationshipItem;
});
