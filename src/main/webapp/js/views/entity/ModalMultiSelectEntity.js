/* generated: 30/08/2015 14:17:03 */
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
	var EntityPageCollection = require('collections/EntityPageCollection');
	var ModalMultiSelectEntityTemplate = require('text!views/entity/tpl/ModalMultiSelectEntityTemplate.html');
	// End of "Import´s" definition

	var ModalEntitys = Marionette.LayoutView.extend({
		template : _.template(ModalMultiSelectEntityTemplate),

		regions : {
			gridRegion : '#grid-entitys-modal',
			paginatorRegion : '#paginator-entitys-modal',
		},
		events : {
			'click .btnOk' : 'close'
		},
		ui : {
			btnOk : ".btnOk",
		},

		initialize : function(opt) {
			var that = this;

			this.projetoEntitys = this.collection;
			
			this.entitys = new EntityPageCollection();
			this.entitys.on('fetched', this.endFetch, this);
			this.entitys.on('backgrid:selected', this.selectModel, this);

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Nenhum registro para escolha",
				collection : this.entitys,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.entitys,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.entitys.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid entity');
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
				this.projetoEntitys.add(model)
			else
				this.projetoEntitys.remove(model)
		},

		endFetch : function(_collection) {
			var that = this;
			this.entitys.each(function(model) {
				if (that.projetoEntitys.findWhere({
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

	return ModalEntitys;
});
