/* generated: 05/08/2016 15:59:17 */
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
	var GeneralActionsCell = require('views/components/GeneralActionsCell');
	var CustomNumberCell = require('views/components/CustomNumberCell');

	var TemplateFormModulos = require('text!views/modulo/tpl/FormModuloTemplate.html');
	var ModuloModel = require('models/ModuloModel');
	var ModuloCollection = require('collections/ModuloCollection');
	var ModuloPageCollection = require('collections/ModuloPageCollection');
	var PageModuloTemplate = require('text!views/modulo/tpl/PageModuloTemplate.html');

	// Filter import

	// End of "Import´s" definition

	var PageModulo = Marionette.LayoutView.extend({
		template : _.template(PageModuloTemplate),

		regions : {
			gridRegion : '#grid',
			counterRegion : '#counter',
			paginatorRegion : '#paginator',
		},

		events : {
			'click 	#query' : '_queryModulo',
			'click 	#reset' : '_resetModulo',
			'keypress' : 'treatKeypress',
		},

		ui : {
			inputNome : '#inputNome',

			form : '#formModuloFilter',
		},

		treatKeypress : function(e) {
			if (util.enterPressed(e)) {
				e.preventDefault();
				this._queryModulo();
			}
		},

		salvaModulo : function(model) {
			console.log(model);
		},
		initialize : function() {
			var that = this;

			this.modulos = new ModuloPageCollection();
			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-condensed ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.modulos
			});

			this.grid.listenTo(this.modulos, 'change', function(model) {
				model.save();
			})
			this.counter = new Counter({
				collection : this.modulos,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.modulos,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.modulos.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid modulo');
				},
				error : function(_col, _resp, _opts) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				}
			});
			this.on('show', function() {
				that.gridRegion.show(that.grid);
				that.counterRegion.show(that.counter);
				that.paginatorRegion.show(that.paginator);

			});
		},

		_queryModulo : function() {
			var that = this;

			this.modulos.filterQueryParams = {
				nome : util.escapeById('inputNome'),
			}
			this.modulos.fetch({
				success : function(_coll, _resp, _opt) {
					console.info('Consulta para o grid modulo');
				},
				error : function(_coll, _resp, _opt) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				},
				complete : function() {

				},
			})
		},
		_resetModulo : function() {
			this.ui.form.get(0).reset();
			this.modulos.reset();
		},

		_getColumns : function() {
			var that = this;
			var columns = [ {
				name : "nome",
				editable : true,
				sortable : true,
				label : "Nome do Módulo",
				cell : "string",
			}, {
				name : "packageName",
				editable : true,
				sortable : true,
				label : "Pacote",
				cell : "string",
			}, {
				name : "acoes",
				label : "Ações(Editar, Excluir)",
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
				type : 'success',
				icon : 'fa-file-code-o',
				hint : 'Abrir Editor yaml',
				onClick : that.abrirVisual,

			});
			buttons.push({
				id : 'printer_button',
				type : 'danger',
				hint : 'Remover módulo',
				icon : 'fa-trash',
				onClick : that.deleteModel,
			});

			return buttons;
		},

		abrirVisual : function(model) {
			util.goPage("app/editor/" + model.get('id'), true);
		},

		deleteModel : function(model) {
			var that = this;

			var modelTipo = new ModuloModel({
				id : model.id,
			});

			util.Bootbox.confirm("Tem certeza que deseja remover o registro [ " + model.get('id') + " ] ?", function(yes) {
				if (yes) {
					modelTipo.destroy({
						success : function() {
							that.modulos.remove(model);
							util.showMessage('info', 'Gestão UTI - Dados Iniciais removido com sucesso!');
						},
						error : function(_model, _resp) {
							util.showMessage('error', 'Problema ao remover o registro', _resp);
						}
					});
				}
			});
		},

	});

	return PageModulo;
});
