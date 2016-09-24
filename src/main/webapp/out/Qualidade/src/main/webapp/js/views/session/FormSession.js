/* generated: 24/09/2016 11:56:38 */
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

	var TemplateFormSessions = require('text!views/session/tpl/FormSessionTemplate.html');
	var SessionModel = require('models/SessionModel');
	var SessionCollection = require('collections/SessionCollection');
	var RoleCollection = require('collections/RoleCollection');
	var MultiSelectRole = require('views/role/MultiSelectRole');			
	var UserCollection = require('collections/UserCollection');			
	
	// End of "Import´s" definition

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨MAIN BODY¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var FormSessions = Marionette.LayoutView.extend({
		template : _.template(TemplateFormSessions),

		regions : {
			rolesRegion : ".roles-container",
		},

		events : {
			'click 	.save' : 'save',
			'click 	.saveAndContinue' : 'saveAndContinue',
		},
		
		ui : {
			inputId : '#inputId',
			inputName : '#inputName',
			inputCreationDate : '#inputCreationDate',
			groupInputCreationDate : '#groupInputCreationDate',
		
			inputUser : '#inputUser', 
			form : '#formSession',
		},

		initialize : function() {
			var that = this;
			that.roles = new RoleCollection();
			that.roles.add(this.model.get('roles'));
			this.multiSelectRole = new MultiSelectRole({
				collection : that.roles,
			});
			this.on('show', function() {
				this.ui.groupInputCreationDate.datetimepicker({
					pickTime : true,
					language : 'pt_BR',
				});
				this.ui.inputCreationDate.datetimepicker({
					pickTime : true,
					language : 'pt_BR',
				});
				this.ui.inputCreationDate.mask('99/99/9999');
				this.rolesRegion.show(this.multiSelectRole);
				this.comboUser = new Combobox({
					el : this.ui.inputUser,
					comboId : 'id',
					comboVal : 'name',
					collectionEntity : UserCollection, 
				});
				this.comboUser.setValue(this.model.get('user'));					
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
			var session = that.getModel();

			if (this.isValid()) {
				session.save({}, {
					success : function(_model, _resp, _options) {
						util.showSuccessMessage('Sessão salvo com sucesso!');
						that.clearForm();

						if (continua != true) {
							util.goPage('app/sessions');
						}
					},

					error : function(_model, _resp, _options) {
						util.showErrorMessage('Problema ao salvar registro',_resp);
					}
				});
			} else {
				util.showMessage('error', 'Verifique campos em destaque!');
			}
		},

		
		clearForm : function() {
			util.clear('inputId');
			util.clear('inputName'); 
			util.clear('inputCreationDate'); 
			this.roles.reset();
			this.multiSelectRole.clear();
			util.clear('inputUser'); 					 	
		},

		possuiCamposInvalidos : function() {
			return util.hasInvalidFields(this.validateFields);
		},

		isValid : function() {
			return this.ui.form.validationEngine('validate', {
				promptPosition : "topLeft",
				isOverflown : false,
				validationEventTrigger : "change"
			});
		},

		getModel : function() {
			var that = this;
			var session = that.model; 
			session.set({
				id: util.escapeById('inputId') || null,
		    	name : util.escapeById('inputName'), 
				
		    	creationDate : util.escapeById('inputCreationDate'), 
				
					roles : that.roles.toJSON(),
					user :  that.comboUser.getJsonValue(),
			});
			return session;
		},
		 
		getUser : function() {
			var id =  this.comboUser.getRawValue();			
			
			if(id){
				return {
					id: id,
				}
			}
			return null;
		},				
		
				
		
	});

	return FormSessions;
});