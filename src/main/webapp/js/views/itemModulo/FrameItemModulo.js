/* generated: 30/08/2015 20:23:12 */
define(function(require) {
	// Start "Import´s Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Backgrid = require('adapters/backgrid-adapter');
	var util = require('utilities/utils');
	var Combobox = require('views/components/Combobox');
	var CustomStringCell = require('views/components/CustomStringCell');
	var Counter = require('views/components/Counter');
	var ActionsCell = require('views/components/ActionsCell');
	var CustomNumberCell = require('views/components/CustomNumberCell');

	var TemplateFormItems = require('text!views/item/tpl/FormItemTemplate.html');
	var ItemModuloModel = require('models/ItemModuloModel');
	var ItemModuloCollection = require('collections/ItemModuloCollection');
	var FrameItemModuloTemplate = require('text!views/itemModulo/tpl/FrameItemModuloTemplate.html');

	var GeneralActionsCell = require('views/components/GeneralActionsCell');

	var CodeMirror = require('codemirror');

	var PageItem = Marionette.LayoutView.extend({
		template : _.template(FrameItemModuloTemplate),

		regions : {
			gridRegion : '#grid',
			counterRegion : '#counter',
			paginatorRegion : '#paginator',
		},

		events : {
			'click 	#query' : '_queryItem',
			'click 	.salvar-modal' : 'salvaItemModal',
			'click 	.cancelar-modal' : 'cancelaItemModal',
			'click 	#reset' : '_resetItem',
			'keypress' : 'treatKeypress',
		},

		ui : {
			modalScreen : '.item-editor',
			yamlName : '.yaml-name',
			modalCodeYaml : '#modalCodeYaml',
		},

		initialize : function(opt) {
			var that = this;

			this.items = (opt && opt.collection) || new ItemModuloCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-condensed ',
				columns : this._getColumns(),
				emptyText : "Sem ítens",
				collection : this.items
			});

			this.on('show', function() {
				that.gridRegion.show(that.grid);
				this.editor = CodeMirror.fromTextArea(document.getElementById("modalCodeYaml"), {
					mode : 'text/x-yaml',
					lineNumbers : true,
					selectionPointer : true
				});

				// this.ui.modalScreen.on('hide.bs.modal', function() {
				// that.cancelaItemModal();
				// })
			});
		},

		_resetItem : function() {
			this.ui.form.get(0).reset();
			this.items.reset();
		},

		_getColumns : function() {
			var that = this;
			var columns = [

			{
				name : "name",
				editable : true,
				sortable : true,
				label : "Nome",
				cell : "string",
			}, {
				name : "description",
				editable : true,
				sortable : true,
				label : "Descrição",
				cell : "string",
			}, {
				name : "acoes",
				label : "Ações(Editar, Deletar)",
				sortable : false,
				cell : GeneralActionsCell.extend({
					buttons : that.getCellButtons(),
					context : that,
				})
			} ];
			return columns;
		},

		getCellButtons : function() {
			var that = this;
			var buttons = [];
			buttons.push({
				id : 'edit_button',
				type : 'primary',
				icon : 'fa-pencil',
				hint : 'Editar Item',
				onClick : that.editarItem,

			});

			buttons.push({
				id : 'printer_button',
				type : 'danger',
				hint : 'Remove',
				icon : 'fa-times',
				onClick : that.deleteModel,
			});

			return buttons;
		},

		clearModal : function(model) {

		},

		salvaItemModal : function(model) {
			this.editModel.set('name', this.ui.yamlName.text());
			this.editModel.set('yamlContent', this.editor.getValue());
			this.ui.modalScreen.modal('hide');
		},
		cancelaItemModal : function(model) {

			this.ui.modalScreen.modal('hide');
		},

		editarItem : function(model) {
			this.clearModal();
			this.editModel = model;

			this.editor.setValue(model.get('yamlContent'))
			this.ui.yamlName.text(model.get('name'));

			this.ui.modalScreen.modal({
				backdrop : 'static'
			})
		},

		deleteModel : function(model) {
			util.Bootbox.confirm("Tem certeza que deseja remover o registro [ " + model.get('id') + "] ?", function(yes) {
				if (yes) {
					model.destroy({
						success : function() {
							util.showMessage('success', 'Registro removido com sucesso!');
						},
						error : function() {
							util.showMessage('error', 'Problemas ao remover registro!');
							console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
						}
					});
				}
			});
		},
	});

	return PageItem;
});
