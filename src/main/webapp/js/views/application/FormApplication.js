/* generated: 30/08/2015 20:23:11 */
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

	var TemplateFormApplications = require('text!views/application/tpl/FormApplicationTemplate.html');
	var ApplicationModel = require('models/ApplicationModel');
	var ApplicationCollection = require('collections/ApplicationCollection');
	var TheEntityCollection = require('collections/TheEntityCollection');
	var MultiSelectTheEntity = require('views/theEntity/MultiSelectTheEntity');			
	
	// End of "Import´s" definition

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨MAIN BODY¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var FormApplications = Marionette.LayoutView.extend({
		template : _.template(TemplateFormApplications),

		regions : {
			entitiesRegion : ".entities-container",
		},

		events : {
			'click 	.save' : 'save',
			'click 	.saveAndContinue' : 'saveAndContinue',
			'change  #inputSkin' : 'changeSkin',	
			'change  #inputRootPackage' : 'changeRootPackage',	
		},
		
		ui : {
			inputId : '#inputId',
			inputName : '#inputName',
			inputSkin : '#inputSkin',
			inputRootPackage : '#inputRootPackage',
		
			form : '#formApplication',
		},

		initialize : function() {
			var that = this;
			that.entities = new TheEntityCollection();
			that.entities.add(this.model.get('entities'));
			this.multiSelectTheEntity = new MultiSelectTheEntity({
				collection : that.entities,
			});
			this.on('show', function() {
				this.entitiesRegion.show(this.multiSelectTheEntity);
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
			var application = that._getModel();

			if (this._isValid()) {
				application.save({}, {
					success : function(_model, _resp, _options) {
						util.showMessage('success', 'Application salvo com sucesso!');
						that.clearForm();

						if (continua != true) {
							util.goPage('app/applications');
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
			util.clear('inputSkin'); 
			util.clear('inputRootPackage'); 
			this.entities.reset();
			this.multiSelectTheEntity.clear();
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
			var application = that.model; 
			application.set({
				id: util.escapeById('inputId') || null,
		    	name : util.escapeById('inputName'), 
				
		    	skin : util.escapeById('inputSkin'), 
				
		    	rootPackage : util.escapeById('inputRootPackage'), 
				
					entities : that.entities.toJSON(),
			});
			return application;
		},
		 
		
				
		changeSkin : function() {
			var that = this;
			util.validateUnique({
				element : that.ui.inputSkin,
				fieldName : 'skin',
				fieldDisplayName : 'Template',
				//onlyNumber : true,     //caso queira que as mascaras sejam removidas e somente NUMEROS sejam enviados na consulta.
				view : that,
				collection : ApplicationCollection,
			})
		},				
		changeRootPackage : function() {
			var that = this;
			util.validateUnique({
				element : that.ui.inputRootPackage,
				fieldName : 'rootPackage',
				fieldDisplayName : 'Pacote raiz',
				//onlyNumber : true,     //caso queira que as mascaras sejam removidas e somente NUMEROS sejam enviados na consulta.
				view : that,
				collection : ApplicationCollection,
			})
		},				
		
	});

	return FormApplications;
});