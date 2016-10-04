/* generated: 05/08/2016 15:59:17 */
define(function(require) {
	// Start "Import´s Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Backgrid = require('adapters/backgrid-adapter');
	var Marionette = require('marionette');
	var CustomNumberCell = require('views/components/CustomNumberCell');

	var util = require('utilities/utils');
	var ModuloPageCollection = require('collections/ModuloPageCollection');
	var ModalMultiSelectModuloTemplate = require('text!views/modulo/tpl/ModalMultiSelectModuloTemplate.html');
	// End of "Import´s" definition

	var ModalModulos = Marionette.LayoutView.extend({
		template : _.template(ModalMultiSelectModuloTemplate),

		regions : {
			gridRegion : '#grid-modulos-modal',
			paginatorRegion : '#paginator-modulos-modal',
		},
		events : {
			'click .btnOk' : 'close'
		},
		ui : {
			btnOk : ".btnOk",
		},

		initialize : function(opt) {
			var that = this;

			this.projetoModulos = this.collection;
			
			this.modulos = new ModuloPageCollection();
			this.modulos.on('fetched', this.endFetch, this);
			this.modulos.on('backgrid:selected', this.selectModel, this);

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Nenhum registro para escolha",
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
					console.error(_resp.responseText || _resp.getResponseHeader('exception'));
				}
			});


			this.on('show', function() {
				that.gridRegion.show(that.grid);
				that.paginatorRegion.show(that.paginator);
			});
		},

		selectModel : function(model, checked) {
			if (checked)
				this.projetoModulos.add(model)
			else
				this.projetoModulos.remove(model)
		},

		endFetch : function(_collection) {
			var that = this;
			this.modulos.each(function(model) {
				if (that.projetoModulos.findWhere({
					id : model.get('id')
				})) {
					model.trigger("backgrid:select", model, true);
				}
			});
		},
		clear : function(){
			this.grid.$el.find('input[type=checkbox]').prop('checked', false);
		},
		_getColumns : function() {
			var columns = [{
				name : "",
				cell : "select-row",
				headerCell : "select-all"
			}, 
			 
			{
				name : "nome",
				editable : false,
				sortable : false,
				label 	 : "Nome do Módulo",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return ModalModulos;
});
