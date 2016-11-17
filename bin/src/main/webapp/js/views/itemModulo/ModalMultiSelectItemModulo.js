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
	var ItemModuloPageCollection = require('collections/ItemModuloPageCollection');
	var ModalMultiSelectItemModuloTemplate = require('text!views/itemModulo/tpl/ModalMultiSelectItemModuloTemplate.html');
	// End of "Import´s" definition

	var ModalItemModulos = Marionette.LayoutView.extend({
		template : _.template(ModalMultiSelectItemModuloTemplate),

		regions : {
			gridRegion : '#grid-itemModulos-modal',
			paginatorRegion : '#paginator-itemModulos-modal',
		},
		events : {
			'click .btnOk' : 'close'
		},
		ui : {
			btnOk : ".btnOk",
		},

		initialize : function(opt) {
			var that = this;

			this.projetoItemModulos = this.collection;
			
			this.itemModulos = new ItemModuloPageCollection();
			this.itemModulos.on('fetched', this.endFetch, this);
			this.itemModulos.on('backgrid:selected', this.selectModel, this);

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Nenhum registro para escolha",
				collection : this.itemModulos,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.itemModulos,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.itemModulos.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid itemModulo');
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
				this.projetoItemModulos.add(model)
			else
				this.projetoItemModulos.remove(model)
		},

		endFetch : function(_collection) {
			var that = this;
			this.itemModulos.each(function(model) {
				if (that.projetoItemModulos.findWhere({
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
				name : "name",
				editable : false,
				sortable : false,
				label 	 : "Nome do item de módulo",
				cell 	 : "string",
			}, 
			{
				name : "yamlContent",
				editable : false,
				sortable : false,
				label 	 : "Conteudo do arquivo yaml",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return ModalItemModulos;
});
