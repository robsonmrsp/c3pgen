/* generated: 30/08/2015 14:17:03 */
define(function(require) {
	// Start "Import´s" Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Backgrid = require('adapters/backgrid-adapter');
	var util = require('utilities/utils');
	var Combobox = require('views/components/Combobox');

	var TemplateFormEntitys = require('text!views/entity/tpl/FormEntityTemplate.html');
	var EntityModel = require('models/EntityModel');
	var EntityCollection = require('collections/EntityCollection');
	var SearchApplicationModal = require('views/modalComponents/ApplicationModal');
	var AttributeCollection = require('collections/AttributeCollection');
	var MultiSelectAttribute = require('views/attribute/MultiSelectAttribute');
	var RelationshipCollection = require('collections/RelationshipCollection');
	var MultiSelectRelationship = require('views/relationship/MultiSelectRelationship');

	// End of "Import´s" definition

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨MAIN
	// BODY¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var FormEntitys = Marionette.LayoutView.extend({
		template : _.template(TemplateFormEntitys),

		regions : {
			searchApplicationModalRegion : '#applicationModal',
			attributesRegion : ".attributes-container",
			relationshipsRegion : ".relationships-container",
		},

		events : {
			'click 	.save' : 'save',
			'click 	.saveAndContinue' : 'saveAndContinue',
			'click #searchApplicationModal' : '_showSearchApplicationModal',
		},

		ui : {
			inputId : '#inputId',
			inputName : '#inputName',
			inputDisplayName : '#inputDisplayName',
			inputTableName : '#inputTableName',
			inputHasOwner : '#inputHasOwner',
			inputHasMobile : '#inputHasMobile',

			inputApplicationId : '#inputApplicationId',
			inputApplicationName : '#inputApplicationName',
			form : '#formEntity',
		},

		initialize : function() {
			var that = this;
			this.searchApplicationModal = new SearchApplicationModal({
				onSelectModel : function(model) {
					that._selectApplication(model);
				},
			});
			that.attributes = new AttributeCollection();
			that.attributes.add(this.model.get('attributes'));
			this.multiSelectAttribute = new MultiSelectAttribute({
				collection : that.attributes,
			});
			that.relationships = new RelationshipCollection();
			that.relationships.add(this.model.get('relationships'));
			this.multiSelectRelationship = new MultiSelectRelationship({
				collection : that.relationships,
			});
			this.on('show', function() {
				this.searchApplicationModalRegion.show(this.searchApplicationModal);
				this.attributesRegion.show(this.multiSelectAttribute);
				this.relationshipsRegion.show(this.multiSelectRelationship);
				this.ui.form.validationEngine('attach', {
					promptPosition : "topLeft",
					isOverflown : false,
					validationEventTrigger : "change"
				});
			});
		},

		saveAndContinue : function() {
			this.save(true)
		},

		save : function(continua) {
			var that = this;
			var entity = that._getModel();

			if (this._isValid()) {
				entity.save({}, {
					success : function(_model, _resp, _options) {
						util.showMessage('success', 'Entity salvo com sucesso!');
						that.clearForm();

						if (continua != true) {
							util.goPage('app/entitys', true);
						}
					},

					error : function(_model, _resp, _options) {
						util.showMessage('error', 'Problema ao salvar registro: ' + util.getJson(_resp.responseText).legalMessage || '');
						console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
					}
				});
			} else {
				util.showMessage('error', 'Verifique campos em destaque!');
			}
		},

		clearForm : function() {
			util.clear('inputId');
			util.clear('inputName');
			util.clear('inputDisplayName');
			util.clear('inputTableName');
			util.clear('inputHasOwner');
			util.clear('inputHasMobile');
			util.clear('inputApplicationId');
			util.clear('inputApplicationName');
			this.attributes.reset();
			this.multiSelectAttribute.clear();
			this.relationships.reset();
			this.multiSelectRelationship.clear();
		},

		possuiCamposInvalidos : function() {
			return util.hasInvalidFields(this.validateFields);
		},

		_isValid : function() {
			return this.ui.form.validationEngine('validate', {
				promptPosition : "topLeft",
				isOverflown : false,
				validationEventTrigger : "change"
			});
		},

		_getModel : function() {
			var that = this;
			var entity = that.model;
			entity.set({
				id : util.escapeById('inputId') || null,
				name : util.escapeById('inputName'),

				displayName : util.escapeById('inputDisplayName'),

				tableName : util.escapeById('inputTableName'),

				hasOwner : util.escapeById('inputHasOwner'),

				hasMobile : util.escapeById('inputHasMobile'),

				application : that._getApplication(),
				attributes : that.attributes.toJSON(),
				relationships : that.relationships.toJSON(),
			});
			return entity;
		},

		_getApplication : function() {
			var id = util.escapeById('inputApplicationId');
			var name = util.escapeById('inputApplicationName');
			var application = null;

			if (id && name) {
				application = {
					id : id,
					name : name,
				}
			}
			return application;
		},

		_showSearchApplicationModal : function() {
			this.searchApplicationModal.showPage();
		},

		_selectApplication : function(application) {
			this.searchApplicationModal.hidePage();
			this.ui.inputApplicationId.val(application.get('id'));
			this.ui.inputApplicationName.val(application.get('name'));
		},

	});

	return FormEntitys;
});