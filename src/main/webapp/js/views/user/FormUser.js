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

	var TemplateFormUsers = require('text!views/user/tpl/FormUserTemplate.html');
	var UserModel = require('models/UserModel');
	var UserCollection = require('collections/UserCollection');
	var RoleCollection = require('collections/RoleCollection');
	var MultiSelectRole = require('views/role/MultiSelectRole');			
	
	// End of "Import´s" definition

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨MAIN BODY¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var FormUsers = Marionette.LayoutView.extend({
		template : _.template(TemplateFormUsers),

		regions : {
			rolesRegion : ".roles-container",
		},

		events : {
			'click 	.save' : 'save',
			'click 	.saveAndContinue' : 'saveAndContinue',
			'change  #inputUsername' : 'changeUsername',	
		},
		
		ui : {
			inputId : '#inputId',
			inputName : '#inputName',
			inputUsername : '#inputUsername',
			inputPassword : '#inputPassword',
			inputEnable : '#inputEnable',
			inputImage : '#inputImage',
		
			form : '#formUser',
		},

		initialize : function() {
			var that = this;
			that.roles = new RoleCollection();
			that.roles.add(this.model.get('roles'));
			this.multiSelectRole = new MultiSelectRole({
				collection : that.roles,
			});
			this.on('show', function() {
				this.rolesRegion.show(this.multiSelectRole);
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
			var user = that._getModel();

			if (this._isValid()) {
				user.save({}, {
					success : function(_model, _resp, _options) {
						util.showMessage('success', 'User salvo com sucesso!');
						that.clearForm();

						if (continua != true) {
							util.goPage('app/users');
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
			util.clear('inputUsername'); 
			util.clear('inputPassword'); 
			util.clear('inputEnable'); 
			util.clear('inputImage'); 
			this.roles.reset();
			this.multiSelectRole.clear();
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
			var user = that.model; 
			user.set({
				id: util.escapeById('inputId') || null,
		    	name : util.escapeById('inputName'), 
				
		    	username : util.escapeById('inputUsername'), 
				
		    	password : util.escapeById('inputPassword'), 
				
		    	enable : util.escapeById('inputEnable'), 
				
		    	image : util.escapeById('inputImage'), 
				
					roles : that.roles.toJSON(),
			});
			return user;
		},
		 
		
				
		changeUsername : function() {
			var that = this;
			util.validateUnique({
				element : that.ui.inputUsername,
				fieldName : 'username',
				fieldDisplayName : 'Username',
				//onlyNumber : true,     //caso queira que as mascaras sejam removidas e somente NUMEROS sejam enviados na consulta.
				view : that,
				collection : UserCollection,
			})
		},				
		
	});

	return FormUsers;
});