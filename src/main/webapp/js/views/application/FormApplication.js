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
	var EntityCollection = require('collections/EntityCollection');
	var MultiSelectEntity = require('views/entity/MultiSelectEntity');

	// End of "Import´s" definition

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨MAIN
	// BODY¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var FormApplications = Marionette.LayoutView.extend({
		template : _.template(TemplateFormApplications),

		regions : {
		// entitiesRegion : ".entities-container",

		},

		events : {
			'click 	.save' : 'save',
			'click 	#saveAndVisual' : 'saveAndVisual',
//			'change  #inputSkin' : 'changeSkin',
//			'change  #inputRootPackage' : 'changeRootPackage',
		},

		ui : {
			inputId : '#inputId',
			inputName : '#inputName',
			inputSkin : '#inputSkin',
			skinCarousel : '#skinCarousel',
			inputRootPackage : '#inputRootPackage',
			form : '#formApplication',
		},

		initialize : function() {
			var that = this;
			that.entities = new EntityCollection();
			that.entities.add(this.model.get('entities'));
			this.on('show', function() {

				this.ui.form.validationEngine('attach', {
					promptPosition : "topLeft",
					isOverflown : false,
					validationEventTrigger : "change"
				});

				this.ui.skinCarousel.on('slide.bs.carousel', function(elem) {
					that.ui.inputSkin.val($(elem.relatedTarget).attr('skin'));
				});
			});
		},

		saveAndVisual : function() {
			this.save(true)
		},

		save : function(continua) {
			var that = this;
			var application = that._getModel();

			if (this._isValid()) {
				application.updateOnlyApplication({}, {
					success : function(_model, _resp, _options) {
						util.showMessage('success', 'Application salvo com sucesso!');
						that.clearForm();

						if (continua != true) {
							util.goPage('app/applications', true);
						} else {
							util.goPage('app/visual/' + _model.get('id'), true);
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
			// this.multiSelectEntity.clear();
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
				id : util.escapeById('inputId') || null,
				name : util.escapeById('inputName') ,
				skin : util.escapeById('inputSkin') || 'ace',
				description : util.escapeById('inputDescription'),
				rootPackage : util.escapeById('inputRootPackage'),
				corePackage : util.escapeById('inputCorePackage'),
				multitenancy : util.escapeById('inputMultitenancy'),
				useAudit : util.escapeById('inputUseAudit'),
//				entities : that.entities.toJSON(),
			});
			return application;
		},

		changeSkin : function() {
			var that = this;
			util.validateUnique({
				element : that.ui.inputSkin,
				fieldName : 'skin',
				fieldDisplayName : 'Template',
				// onlyNumber : true, //caso queira que as mascaras sejam
				// removidas e somente NUMEROS sejam enviados na consulta.
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
				// onlyNumber : true, //caso queira que as mascaras sejam
				// removidas e somente NUMEROS sejam enviados na consulta.
				view : that,
				collection : ApplicationCollection,
			})
		},

	});

	return FormApplications;
});