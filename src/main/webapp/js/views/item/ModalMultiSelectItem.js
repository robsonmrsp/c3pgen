/* generated: 30/08/2015 20:23:12 */
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
	var ItemPageCollection = require('collections/ItemPageCollection');
	var ModalMultiSelectItemTemplate = require('text!views/item/tpl/ModalMultiSelectItemTemplate.html');
	// End of "Import´s" definition

	var ModalItems = Marionette.LayoutView.extend({
		template : _.template(ModalMultiSelectItemTemplate),

		regions : {
			gridRegion : '#grid-items-modal',
			paginatorRegion : '#paginator-items-modal',
		},
		events : {
			'click .btnOk' : 'close'
		},
		ui : {
			btnOk : ".btnOk",
		},

		initialize : function(opt) {
			var that = this;

			this.projetoItems = this.collection;
			
			this.items = new ItemPageCollection();
			this.items.on('fetched', this.endFetch, this);
			this.items.on('backgrid:selected', this.selectModel, this);

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Nenhum registro para escolha",
				collection : this.items,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.items,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.items.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid item');
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
				this.projetoItems.add(model)
			else
				this.projetoItems.remove(model)
		},

		endFetch : function(_collection) {
			var that = this;
			this.items.each(function(model) {
				if (that.projetoItems.findWhere({
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
				label 	 : "Nome",
				cell 	 : "string",
			}, 
			{
				name : "description",
				editable : false,
				sortable : false,
				label 	 : "Descrição",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return ModalItems;
});
