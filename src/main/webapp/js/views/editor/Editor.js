/* generated: 05/08/2016 15:59:17 */
define(function(require) {
	// Start "Import´s" Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Backgrid = require('adapters/backgrid-adapter');
	var util = require('utilities/utils');
	var MenuClasses = require('views/editor/MenuClasses');
	var ItemModuloCollection = require('collections/ItemModuloCollection');

	var ItemModulo = require('models/ItemModuloModel');
	var ModuloModel = require('models/ModuloModel');

	var Yaml = require('Yaml');

	var TemplateEditor = require('text!views/editor/tpl/EditorTemplate.html');

	var download = require('download');
	var CodeMirror = require('codemirror');
	
	var ModalError = require('views/components/ModalError');

	var FormModulos = Marionette.LayoutView.extend({
		template : _.template(TemplateEditor),

		regions : {
			menuRegion : '.classes-list',
		},

		events : {
			'click .save-modulo' : 'saveModulo',
			'click .generate-modulo' : 'generateModulo',
			'click .add-item-modulo' : 'addItemModulo',

		},

		ui : {
			consoleError : '.consoleError',
			tooltips : '.tip',
			modalError : '#modalError',
			codeEditorName : '#codeEditorName'
		},
		initialize : function(opt) {

			var that = this;
			that.currentModelItem = null;


			this.itemsModelo = new ItemModuloCollection(that.model.get('items'));
			this.menuClasses = new MenuClasses({
				collection : that.itemsModelo,
				onSelectItem : function(model) {
					that.currentModelItem = model;
					that.ui.codeEditorName.text(model.get('name'))
					that.editor.setValue(model.get('yamlContent'));
				},
			});

			this.modalError = new ModalError();
			this.on('show', function() {
				this.modalError.initIn(this);
				
				this.ui.tooltips.tooltip();
				this.menuRegion.show(this.menuClasses);
				this.editor = CodeMirror.fromTextArea(document.getElementById("codeEditor"), {
					mode : 'text/x-yaml',
					lineNumbers : true,
					selectionPointer : true
				});

				this.editor.on('change', function(cMirror) {
					try {
						that.ui.consoleError.text('');

						that.currentModelItem.set('yamlContent', cMirror.getValue())

						var doc = Yaml.load(cMirror.getValue());

					} catch (e) {

						that.ui.consoleError.text(e);
					}
				});
			});
		},

		addItemModulo : function() {
			this.itemsModelo.add(new ItemModulo({
				name : 'novaClasse',
				yamlContent : '- name: novaClasse'
			}));
		},

		generateModulo : function() {
			var that = this;
			var modulo = new ModuloModel();
			modulo.url = 'rs/crud/applications/moduleGenerator/' + this.model.get('id');
			modulo.fetch({
				success : function(_model, _resp, _options) {
					download(_resp.resp);
				},
				error : function(_model, _resp, _options) {

					that.modalError.showMessage(_resp.responseJSON.returnObjectError.messages);
					util.showMessage('error', util.getJson(_resp.responseText).legalMessage || '');
				}
			});
		},

		saveModulo : function() {
			console.info('Salvando modulo');
			this.model.set('items', this.itemsModelo.toJSON());
			this.model.save({}, {
				success : function(_model, _resp, _xhr) {
					console.info('Módulo Salvo!', _model);
				},
				error : function(_model, _resp, _xhr) {
					console.error(_model);
				}

			})
		},

	});

	return FormModulos;
});