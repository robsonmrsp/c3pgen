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
	var RelationshipCollection = require('collections/RelationshipCollection');

	var RelationshipModel = require('models/RelationshipModel');

	var ApplicationRelationshipModel = require('models/ApplicationRelationshipModel');

	var AttributeCollection = require('collections/AttributeCollection');

	var InspetorEntidadesViewTemplate = require('text!views/visual/tpl/InspetorRelacionamentosViewTemplate.html');

	var RelationshipItemView = require('views/visual/componentes/RelationshipItemView');

	var EntidadeItem = Marionette.LayoutView.extend({
		template : _.template(InspetorEntidadesViewTemplate),
		className : ' drag-item hpanel',

		regions : {
			sourceRegion : '.source-container',
			targetRegion : '.target-container',
		},

		events : {
			// 'click .btn-pronto' : 'saveRelation',
			'click .check-dono-origem' : 'changeOwner',
			'click .showhide' : 'showHide',
			'click .check-dono-destino' : 'changeOwner',
		},

		ui : {
			sourceClassName : '.origem-class-name',
			targetClassName : '.target-class-name',
			checkOwnerSource : '.check-dono-origem',
			checkOwnerTarget : '.check-dono-destino',
			origemHeader : '.origem-header'

		},

		setOwner : function(source, target) {
			this.ui.checkOwnerTarget.prop('checked', false);
			this.ui.checkOwnerSource.prop('checked', false);
			if (source.get('ownerName')) {
				this.ui.checkOwnerSource.prop('checked', true);
			} else if (target.get('ownerName')) {
				this.ui.checkOwnerTarget.prop('checked', true);
			}
		},

		changeOwner : function(evt) {
			var $select = $(evt.currentTarget);
			this.ui.checkOwnerTarget.prop('checked', false);
			this.ui.checkOwnerSource.prop('checked', false);
			$select.prop('checked', true);

			this.saveRelation(this)();
		},

		saveRelation : function(that) {
			// deve finalizar a preparação dos models de origem e destino

			// validate relation
			// validar se o
			return function() {
				if (!that.sourceView || !that.targetView)
					return;
				var sourceJson = that.sourceView.getModel();
				var targetJson = that.targetView.getModel();

				that.validate(sourceJson);
				that.validate(targetJson);

				// TODO Validar quando necessário, se deve ser escolhido um dono
				// para o relacionamento. (descobrir que combinação de tipo
				// obriga a escolha de um dono, tipo ManyToMany e ManyToMany
				// obriga a escolha de um dono.)

				if (that.ui.checkOwnerSource.is(':checked')) {
					sourceJson.ownerName = targetJson.name;
					targetJson.ownerName = '';
				} else if (that.ui.checkOwnerTarget.is(':checked')) {
					targetJson.ownerName = sourceJson.name;
					sourceJson.ownerName = '';
				}
				that.visualRelationship.refresh(sourceJson, targetJson);
			}
		},
		validate : function(objectJson) {

			// somente para o source
			// validação da escolha do textfield quando escolher o modal
			if (objectJson.viewApproach && objectJson.viewApproach.type == 'combo') {
				var targetModel = util.getBEntityByName(objectJson.model);
				var modalTextFieldName = objectJson.viewApproach.comboVal;

				if (!modalTextFieldName) {
					util.showMessage('error', 'Deve escolher um atributo de ' + objectJson.model + ' para exibir no combobox', 'message-relation-inspector');
				} else if (!util.BEntityContainsAttribute(objectJson.model, modalTextFieldName)) {
					util.showMessage('error', 'Deve escolher um atributo de ' + objectJson.model + ' para exibir no combobox. "' + modalTextFieldName + '" não é atributo de ' + objectJson.model, 'message-relation-inspector');
				}

			}
			// validação da escolha do textfield quando escolher o modal
			if (objectJson.viewApproach && objectJson.viewApproach.type == 'modal') {
				var targetModel = util.getBEntityByName(objectJson.model);
				var modalTextFieldName = objectJson.viewApproach.textField;

				if (!modalTextFieldName) {
					util.showMessage('error', 'Deve escolher um atributo de ' + objectJson.model + ' para exibir no modal', 'message-relation-inspector');
				} else if (!util.BEntityContainsAttribute(objectJson.model, modalTextFieldName)) {
					util.showMessage('error', 'Deve escolher um atributo de ' + objectJson.model + ' para exibir no modal. "' + modalTextFieldName + '" não é atributo de ' + objectJson.model, 'message-relation-inspector');
				}
			}

		},

		setVisual : function(visualRelationship) {
			var that = this;

			this.visualRelationship = visualRelationship;

			this.applicationRelationshipModel = visualRelationship.get('applicationRelationshipModel');

			this.sourceRelationModel = visualRelationship.get('sourceRelationModel')

			var sourceName = (this.sourceRelationModel.get('entity').get && this.sourceRelationModel.get('entity').get('name')) || this.sourceRelationModel.get('entity').name

			this.targetRelationModel = visualRelationship.get('targetRelationModel')

			var targetName = (this.targetRelationModel.get('entity') && this.targetRelationModel.get('entity').get && this.targetRelationModel.get('entity').get('name')) || ( this.targetRelationModel.get &&  this.targetRelationModel.get('entity') && this.targetRelationModel.get('entity').name ||  this.targetRelationModel.get('model'))

			this.sourceView = new RelationshipItemView({
				model : that.sourceRelationModel,
				onSave : that.saveRelation(that),
			});

			this.targetView = new RelationshipItemView({
				model : that.targetRelationModel,
				onSave : that.saveRelation(that),
			});

			this.sourceRegion.show(this.sourceView);
			this.targetRegion.show(this.targetView);

			this.ui.sourceClassName.text(sourceName);
			this.ui.targetClassName.text(targetName);

			this.ui.origemHeader.css('display', 'block');

			this.setOwner(this.sourceRelationModel, this.targetRelationModel);

		},

		initialize : function() {

			var that = this;
			this.$el.draggable({
				handle : 'h5',
				containment : ".drag-entities",
				scroll : false,
				stop : function() {

				}
			});
			this.sourceView = new RelationshipItemView({
				model : new RelationshipModel()
			});
			this.targetView = new RelationshipItemView({
				model : new RelationshipModel()
			});

			this.on('show', function() {
				this.sourceRegion.show(this.sourceView);
				this.targetRegion.show(this.targetView);
//				this.showHide();
			});
		},
		showHide : function() {
			util.showHidePanel(this.$el);
		}
	});

	return EntidadeItem;
});
// categoria/RelationshipItemView.js
