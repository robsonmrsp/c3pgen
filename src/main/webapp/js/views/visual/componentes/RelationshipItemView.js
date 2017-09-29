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
	var RelationshipCollection = require('collections/RelationshipCollection');
	var RelationshipItemViewTemplate = require('text!views/visual/componentes/tpl/RelationshipItemViewTemplate.html');

	var RelationshipItem = Marionette.ItemView.extend({
		template : _.template(RelationshipItemViewTemplate),
		regions : {

		},

		events : {
			'click .showhide-rel' : 'hideShow',
			'click .icon-expand-relationhip' : 'expandRelationhip',
			'click .delete-relationship' : 'deleteRelationship',
		},
		expandRelationhip : function() {
			var that = this;
			this.ui.widgetMain.slideToggle("fast", function() {
				if (that.ui.widgetMain.is(':visible')) {
					that.ui.iconExpandRelationhip.removeClass('fa-plus-square-o');
					that.ui.iconExpandRelationhip.addClass('fa-minus-square-o');

				} else {
					that.ui.iconExpandRelationhip.removeClass('fa-minus-square-o');
					that.ui.iconExpandRelationhip.addClass('fa-plus-square-o');
				}
			});

		},

		ui : {
			inputId : '.inputId',
			inputRelationshipName : '.inputRelationshipName',
			iconExpandRelationhip : '.icon-expand-relationhip',
			inputDisplayName : '.inputDisplayName',
			inputModel : '.inputModel',
			inputType : '.inputType',
			inputOwnerName : '.inputOwnerName',
			inputUniDirecional : '.inputUniDirecional',
			inputViewApproach : '.inputViewApproach',
			inputViewApproachContainer : '.inputViewApproachContainer',
			inputViewApproachId : '.inputViewApproachId',

			inputComboId : '.inputComboId',
			inputComboVal : '.inputComboVal',

			inputTextField : '.inputTextField',
			inputHiddenField : '.inputHiddenField',

			modalFields : '.modal-fields',
			comboFields : '.combo-fields',

			widgetMain : '.widget-main',
			showhide : '.showhide-rel',
			editableFields : '.editable-click'
		},
		changeRelationship : function() {
			if (this.onSave) {
				this.onSave()
			}
			// if (this.validateRelation()) {
			var attr = this.getModel();
			if (attr.name && attr.model)
				this.model.set(attr);
			// }
		},

		validateRelation : function() {
			var mensagens = [];
			if (!this.ui.inputUniDirecional.is(':checked')) {

				if (mensagens.length > 0) {
					util.notificationError({
						title : 'Erro',
						text : mensagens.join(',')
					});
					return false;
				}
			}

			return true;
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
				// ownerName : C3P.notEmptyVal(this.ui.inputOwnerName),
				uniDirecional : this.ui.inputUniDirecional.is(':checked'),
				viewApproach : {
					id : this.ui.inputViewApproachId.val(),
					comboId : 'id',
					hiddenField : 'id',
					type : C3P.notEmptyVal(this.ui.inputViewApproach),
					comboVal : C3P.notEmptyVal(this.ui.inputComboVal),
					comboName : C3P.notEmptyVal(this.ui.inputComboVal),
					textField : C3P.notEmptyVal(this.ui.inputTextField) || C3P.notEmptyVal(this.ui.inputComboVal)
				},
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
		refreshComboViewApproach : function() {
			var that = this;

			this.getViewApproachByType();

			if (that.ui.inputType.text() === "none") {
				that.ui.inputViewApproachContainer.hide();
			} else {
				that.ui.inputViewApproachContainer.show();
			}
		},

		initialize : function(opt) {

			var that = this;
			this.onSave = opt.onSave;
			this.on('show', function() {
				this.ui.inputRelationshipName.editable();
				this.ui.inputDisplayName.editable();

				this.ui.inputType.editable({
					source : [ {
						value : 'none',
						text : 'none'
					}, {
						value : 'OneToMany',
						text : 'OneToMany'
					}, {
						value : 'ManyToOne',
						text : 'ManyToOne'
					}, {
						value : 'ManyToMany',
						text : 'ManyToMany'
					}, ]
				});

				this.ui.inputType.on('hidden', function() {
					that.refreshComboViewApproach();
					that.treatViewApproach();
				});

				if (that.ui.inputType.text() === "none") {
					that.ui.inputViewApproachContainer.hide();
				} else {
					that.ui.inputViewApproachContainer.show();
				}

				this.ui.inputComboId.editable();
				this.ui.inputComboVal.editable({
					source : that.getAtributesByModelName(),
				});
				this.ui.inputTextField.editable({
					source : that.getAtributesByModelName(),
				});
				this.ui.inputHiddenField.editable();

				this.ui.inputOwnerName.editable();

				this.ui.inputRelationshipName.on('hidden', function() {
					util.refreshEditable(that.ui.inputDisplayName, util.toFrase(that.ui.inputRelationshipName.text()));
				});

				this.ui.inputTextField.on('hidden', function(evt) {
					var modelName = that.ui.inputModel.val();
					var attributeName = that.ui.inputTextField.text();
					var existeAttributo = util.attributeExists(modelName, attributeName);
				});

				this.ui.inputViewApproach.on('hidden', function(e, editable) {
					that.treatViewApproach();
				});
				this.initViewApproachByType();

				this.ui.editableFields.on('hidden', function() {
					that.changeRelationship();
				})
				this.treatViewApproach();
				this.hideShow();
			});
		},
		initViewApproachByType : function() {
			var source = [ {
				value : 'none',
				text : 'none'
			} ];
			if (this.ui.inputType.text() === "ManyToOne") {
				source.push({
					value : 'modal',
					text : 'modal'
				})
				source.push({
					value : 'combo',
					text : 'combo'
				})
			} else if (this.ui.inputType.text() === "OneToMany" || this.ui.inputType.text() === "ManyToMany") {
				source.push({
					value : 'multiselect',
					text : 'multiselect'
				})
				source.push({
					value : 'multiselectmodal',
					text : 'multiselectmodal'
				})
			}
			this.ui.inputViewApproach.editable('option', 'source', source);
		},

		getViewApproachByType : function() {
			var source = [ {
				value : 'none',
				text : 'none'
			} ];
			if (this.ui.inputType.text() === "ManyToOne") {
				source.push({
					value : 'modal',
					text : 'modal'
				})
				source.push({
					value : 'combo',
					text : 'combo'
				})
			} else if (this.ui.inputType.text() === "OneToMany" || this.ui.inputType.text() === "ManyToMany") {
				source.push({
					value : 'multiselect',
					text : 'multiselect'
				})
				source.push({
					value : 'multiselectmodal',
					text : 'multiselectmodal'
				})
			}
			this.ui.inputViewApproach.editable('option', 'source', source);
			this.ui.inputViewApproach.editable('setValue', null);

			return source;
		},

		treatViewApproach : function() {
			var val = this.ui.inputViewApproach.text();
			if (val == 'modal') {
				this.ui.modalFields.show();
				this.ui.comboFields.hide();
			} else if (val == 'combo' || val == 'multiselect') {
				this.ui.modalFields.hide();
				this.ui.comboFields.show();
			} else {
				this.ui.modalFields.hide();
				this.ui.comboFields.hide();
			}
		},

		_getModels : function() {
			var arrayModels = [];
			var allBEntities = util.getBEntities();
			_.each(allBEntities, function(entity) {
				// if(entity.get('name') != )
				arrayModels.push({
					value : entity.get('name'),
					text : entity.get('name')
				})
			});

			return arrayModels;
		},
		getAtributesByModelName : function() {
			var arrayModels = [];

			var view = util.getBackViewByNameEntity(this.ui.inputModel.val());
			_.each(view.model.attributes.attributes, function(attr) {
				arrayModels.push({
					value : attr.name,
					text : attr.name,
				})
			})
			return arrayModels;
		},
	});

	return RelationshipItem;
});