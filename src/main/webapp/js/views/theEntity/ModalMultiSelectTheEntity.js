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
	var TheEntityPageCollection = require('collections/TheEntityPageCollection');
	var ModalMultiSelectTheEntityTemplate = require('text!views/theEntity/tpl/ModalMultiSelectTheEntityTemplate.html');
	// End of "Import´s" definition

	var ModalTheEntitys = Marionette.LayoutView.extend({
		template : _.template(ModalMultiSelectTheEntityTemplate),

		regions : {
			gridRegion : '#grid-theEntitys-modal',
			paginatorRegion : '#paginator-theEntitys-modal',
		},
		events : {
			'click .btnOk' : 'close'
		},
		ui : {
			btnOk : ".btnOk",
		},

		initialize : function(opt) {
			var that = this;

			this.projetoTheEntitys = this.collection;
			
			this.theEntitys = new TheEntityPageCollection();
			this.theEntitys.on('fetched', this.endFetch, this);
			this.theEntitys.on('backgrid:selected', this.selectModel, this);

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Nenhum registro para escolha",
				collection : this.theEntitys,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.theEntitys,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.theEntitys.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid theEntity');
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
				this.projetoTheEntitys.add(model)
			else
				this.projetoTheEntitys.remove(model)
		},

		endFetch : function(_collection) {
			var that = this;
			this.theEntitys.each(function(model) {
				if (that.projetoTheEntitys.findWhere({
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
				label 	 : "Name",
				cell 	 : "string",
			}, 
			{
				name : "displayName",
				editable : false,
				sortable : false,
				label 	 : "DisplayName",
				cell 	 : "string",
			}, 
			{
				name : "tableName",
				editable : false,
				sortable : false,
				label 	 : "TableName",
				cell 	 : "string",
			}, 
			{
				name : "hasOwner",
				editable : false,
				sortable : false,
				label 	 : "HasOwner",
				cell 	 : "string",
			}, 
			{
				name : "hasMobile",
				editable : false,
				sortable : false,
				label 	 : "HasMobile",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return ModalTheEntitys;
});
