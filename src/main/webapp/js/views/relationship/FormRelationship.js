/* generated: 30/08/2015 20:23:12 */
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

	var TemplateFormRelationships = require('text!views/relationship/tpl/FormRelationshipTemplate.html');
	var RelationshipModel = require('models/RelationshipModel');
	var RelationshipCollection = require('collections/RelationshipCollection');
	var SearchEntityModal = require('views/modalComponents/EntityModal');
	var SearchViewApproachModal = require('views/modalComponents/ViewApproachModal');
	
	// End of "Import´s" definition

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨MAIN BODY¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var FormRelationships = Marionette.LayoutView.extend({
		template : _.template(TemplateFormRelationships),

		regions : {
			searchEntityModalRegion : '#entityModal',
			searchViewApproachModalRegion : '#viewApproachModal',
		},

		events : {
			'click 	.save' : 'save',
			'click 	.saveAndContinue' : 'saveAndContinue',
			'click #searchEntityModal' : '_showSearchEntityModal',
			'click #searchViewApproachModal' : '_showSearchViewApproachModal',
		},
		
		ui : {
			inputId : '#inputId',
			inputName : '#inputName',
			inputDisplayName : '#inputDisplayName',
			inputOwnerName : '#inputOwnerName',
			inputModel : '#inputModel',
			inputUniDirecional : '#inputUniDirecional',
		
			inputEntityId : '#inputEntityId',
			inputEntityName : '#inputEntityName',
			inputViewApproachId : '#inputViewApproachId',
			inputViewApproachName : '#inputViewApproachName',
			form : '#formRelationship',
		},

		initialize : function() {
			var that = this;
			this.searchEntityModal = new SearchEntityModal({
				onSelectModel : function(model) {
					that._selectEntity(model);
				},
			});
			this.searchViewApproachModal = new SearchViewApproachModal({
				onSelectModel : function(model) {
					that._selectViewApproach(model);
				},
			});
			this.on('show', function() {
				this.searchEntityModalRegion.show(this.searchEntityModal);		
				this.searchViewApproachModalRegion.show(this.searchViewApproachModal);		
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
			var relationship = that._getModel();

			if (this._isValid()) {
				relationship.save({}, {
					success : function(_model, _resp, _options) {
						util.showMessage('success', 'Relationship salvo com sucesso!');
						that.clearForm();

						if (continua != true) {
							util.goPage('app/relationships');
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
			util.clear('inputOwnerName'); 
			util.clear('inputModel'); 
			util.clear('inputUniDirecional'); 
			util.clear('inputEntityId');
			util.clear('inputEntityName');
			util.clear('inputViewApproachId');
			util.clear('inputViewApproachName');
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
			var relationship = that.model; 
			relationship.set({
				id: util.escapeById('inputId') || null,
		    	name : util.escapeById('inputName'), 
				
		    	displayName : util.escapeById('inputDisplayName'), 
				
		    	ownerName : util.escapeById('inputOwnerName'), 
				
		    	model : util.escapeById('inputModel'), 
				
		    	uniDirecional : util.escapeById('inputUniDirecional'), 
				
					entity : that._getEntity(),
					viewApproach : that._getViewApproach(),
			});
			return relationship;
		},
		 
		_getEntity : function() {			
			var id = util.escapeById('inputEntityId');
			var name = util.escapeById('inputEntityName');
			var entity = null;
			
			if (id && name) {
				entity = {
					id : id,
					name : name,
				}
			}
			return entity;
		},	
		_getViewApproach : function() {			
			var id = util.escapeById('inputViewApproachId');
			var name = util.escapeById('inputViewApproachName');
			var viewApproach = null;
			
			if (id && name) {
				viewApproach = {
					id : id,
					name : name,
				}
			}
			return viewApproach;
		},	
		
		_showSearchEntityModal : function() {
			this.searchEntityModal.showPage();
		},
			
		_selectEntity : function(entity) {
			this.searchEntityModal.hidePage();	
			this.ui.inputEntityId.val(entity.get('id'));
			this.ui.inputEntityName.val(entity.get('name'));		
		},
		_showSearchViewApproachModal : function() {
			this.searchViewApproachModal.showPage();
		},
			
		_selectViewApproach : function(viewApproach) {
			this.searchViewApproachModal.hidePage();	
			this.ui.inputViewApproachId.val(viewApproach.get('id'));
			this.ui.inputViewApproachName.val(viewApproach.get('name'));		
		},
				
		
	});

	return FormRelationships;
});