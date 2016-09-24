/* generated: 24/09/2016 11:56:37 */
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
	var ItemTypePageCollection = require('collections/ItemTypePageCollection');
	var ModalMultiSelectItemTypeTemplate = require('text!views/itemType/tpl/ModalMultiSelectItemTypeTemplate.html');
	// End of "Import´s" definition

	var ModalItemTypes = Marionette.LayoutView.extend({
		template : _.template(ModalMultiSelectItemTypeTemplate),

		regions : {
			gridRegion : '#grid-itemTypes-modal',
			paginatorRegion : '#paginator-itemTypes-modal',
		},
		events : {
			'click .btnOk' : 'close'
		},
		ui : {
			btnOk : ".btnOk",
		},

		initialize : function(opt) {
			var that = this;

			this.projetoItemTypes = this.collection;
			
			this.itemTypes = new ItemTypePageCollection();
			this.itemTypes.on('fetched', this.endFetch, this);
			this.itemTypes.on('backgrid:selected', this.selectModel, this);

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this.getColumns(),
				emptyText : "Nenhum registro para escolha",
				collection : this.itemTypes,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this.getColumns(),
				collection : this.itemTypes,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.itemTypes.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid itemType');
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
				this.projetoItemTypes.add(model)
			else
				this.projetoItemTypes.remove(model)
		},

		endFetch : function(_collection) {
			var that = this;
			this.itemTypes.each(function(model) {
				if (that.projetoItemTypes.findWhere({
					id : model.get('id')
				})) {
					model.trigger("backgrid:select", model, true);
				}
			});
		},
		clear : function(){
			this.grid.$el.find('input[type=checkbox]').prop('checked', false);
		},
		getColumns : function() {
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

	return ModalItemTypes;
});
