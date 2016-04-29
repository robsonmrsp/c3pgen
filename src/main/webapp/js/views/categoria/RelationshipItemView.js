/* generated: 18/08/2015 15:38:44 */
define(function(require) {
	// Start "Import´s Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var C3P = require('utilities/C3pUtil');
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
			inputType : '.inputType',
			inputOwnerName : '.inputOwnerName',
			inputUniDirecional : '.inputUniDirecional',
			inputViewApproach : '.inputViewApproach',
			inputViewApproachId : '.inputViewApproachId',

			inputComboId : '.inputComboId',
			inputComboName : '.inputComboName',
			inputTextField : '.inputTextField',
			inputHiddenField : '.inputHiddenField',

			modalFields : '.modal-fields',
			comboFields : '.combo-fields',

			widgetMain : '.widget-main-rel',
			showhide : '.showhide-rel',
			editableFields : '.editable-click'
		},
		changeRelationship : function() {
			var attr = this.getModel();
			if (attr.name && attr.model && attr.viewApproach && attr.ownerName && attr.name)
				this.model.set(attr);
		},
		deleteRelationship : function() {
			this.model.destroy();
		},

		getModel : function() {
			return {
				id : this.ui.inputId.val(),
				name : C3P.notEmptyVal(this.ui.inputRelationshipName),
				type : C3P.notEmptyVal(this.ui.inputType),
				displayName : C3P.notEmptyVal(this.ui.inputDisplayName),
				model : C3P.notEmptyVal(this.ui.inputModel),
				ownerName : C3P.notEmptyVal(this.ui.inputOwnerName),
				uniDirecional : this.ui.inputUniDirecional.is(':checked'),
				viewApproach : {
					id : this.ui.inputViewApproachId.val(),
					type : C3P.notEmptyVal(this.ui.inputViewApproach),
				}

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
				this.ui.inputRelationshipName.editable();
				this.ui.inputDisplayName.editable();
				this.ui.inputModel.editable({
					value : '',
					source : that._getModels(),
				});

				this.ui.inputComboId.editable();
				this.ui.inputComboName.editable();
				this.ui.inputTextField.editable();
				this.ui.inputHiddenField.editable();

				// das entidades já cadastradas
				// ou deixar em branco para o
				// autocomplete ser feito via
				// lista de já cadastrados.
				this.ui.inputOwnerName.editable();// candidato a ser uma lista
				// populada a partir da
				// escolha do model

				this.ui.inputRelationshipName.on('hidden', function() {
					util.refreshEditable(that.ui.inputDisplayName, util.toFrase(that.ui.inputRelationshipName.text()));
				});

				this.ui.editableFields.on('hidden', function() {
					that.changeRelationship();
				})
				this.ui.inputViewApproach.editable({
					value : '',
					source : [ {
						value : 'modal',
						text : 'modal'
					}, {
						value : 'combo',
						text : 'combo'
					}, {
						value : 'multiselect',
						text : 'multiselect'
					}, ]
				});
				this.ui.inputViewApproach.on('hidden', function(e, editable) {
					var val = that.ui.inputViewApproach.text();
					if (val == 'modal') {
						console.log('Escolheu modal');
						that.ui.modalFields.show();
						that.ui.comboFields.hide();
					} else if (val == 'combo') {
						that.ui.comboFields.show();
						that.ui.modalFields.hide();

						console.log('Escolheu combo');
					} else if (val == 'multiselect') {
						that.ui.modalFields.hide();
						that.ui.comboFields.hide();

						console.log('Escolheu mulsiselect');
					}
				});
				this.ui.inputType.editable({
					value : 'OneToMany',
					source : [ {
						value : 'OneToMany',
						text : 'OneToMany'
					}, {
						value : 'ManyToOne',
						text : 'ManyToOne'
					}, {
						value : 'OneToOne',
						text : 'OneToOne'
					}, {
						value : 'ManyToMany',
						text : 'ManyToMany'
					}, ]
				});
				// this.hideShow();
			});
		},

		_getModels : function() {
			var arrayModels = [];
			var allBEntities = util.getBEntities();
			_.each(allBEntities, function(entity) {
				arrayModels.push({
					value : entity.get('name'),
					text : entity.get('name')
				})
			});

			return arrayModels;
		}
	});

	return RelationshipItem;
});
