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
	var AttributeTypePageCollection = require('collections/AttributeTypePageCollection');
	var ModalMultiSelectAttributeTypeTemplate = require('text!views/attributeType/tpl/ModalMultiSelectAttributeTypeTemplate.html');
	// End of "Import´s" definition

	var ModalAttributeTypes = Marionette.LayoutView.extend({
		template : _.template(ModalMultiSelectAttributeTypeTemplate),

		regions : {
			gridRegion : '#grid-attributeTypes-modal',
			paginatorRegion : '#paginator-attributeTypes-modal',
		},
		events : {
			'click .btnOk' : 'close'
		},
		ui : {
			btnOk : ".btnOk",
		},

		initialize : function(opt) {
			var that = this;

			this.projetoAttributeTypes = this.collection;
			
			this.attributeTypes = new AttributeTypePageCollection();
			this.attributeTypes.on('fetched', this.endFetch, this);
			this.attributeTypes.on('backgrid:selected', this.selectModel, this);

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Nenhum registro para escolha",
				collection : this.attributeTypes,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.attributeTypes,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.attributeTypes.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid attributeType');
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
				this.projetoAttributeTypes.add(model)
			else
				this.projetoAttributeTypes.remove(model)
		},

		endFetch : function(_collection) {
			var that = this;
			this.attributeTypes.each(function(model) {
				if (that.projetoAttributeTypes.findWhere({
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
				name : "className",
				editable : false,
				sortable : false,
				label 	 : "Nome",
				cell 	 : "string",
			}, 
			{
				name : "format",
				editable : false,
				sortable : false,
				label 	 : "Formato",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return ModalAttributeTypes;
});
