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
	var AttributePageCollection = require('collections/AttributePageCollection');
	var ModalMultiSelectAttributeTemplate = require('text!views/attribute/tpl/ModalMultiSelectAttributeTemplate.html');
	// End of "Import´s" definition

	var ModalAttributes = Marionette.LayoutView.extend({
		template : _.template(ModalMultiSelectAttributeTemplate),

		regions : {
			gridRegion : '#grid-attributes-modal',
			paginatorRegion : '#paginator-attributes-modal',
		},
		events : {
			'click .btnOk' : 'close'
		},
		ui : {
			btnOk : ".btnOk",
		},

		initialize : function(opt) {
			var that = this;

			this.projetoAttributes = this.collection;
			
			this.attributes = new AttributePageCollection();
			this.attributes.on('fetched', this.endFetch, this);
			this.attributes.on('backgrid:selected', this.selectModel, this);

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Nenhum registro para escolha",
				collection : this.attributes,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.attributes,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.attributes.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid attribute');
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
				this.projetoAttributes.add(model)
			else
				this.projetoAttributes.remove(model)
		},

		endFetch : function(_collection) {
			var that = this;
			this.attributes.each(function(model) {
				if (that.projetoAttributes.findWhere({
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
				name : "displayName",
				editable : false,
				sortable : false,
				label 	 : "Nome apresentado na tela",
				cell 	 : "string",
			}, 
			{
				name : "maxLen",
				editable : false,
				sortable : false,
				label 	 : "Tamanho máximo",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "tableFieldName",
				editable : false,
				sortable : false,
				label 	 : "Nome da coluna na tabela",
				cell 	 : "string",
			}, 
			{
				name : "masc",
				editable : false,
				sortable : false,
				label 	 : "Formato de Máscara",
				cell 	 : "string",
			}, 
			{
				name : "defaultValue",
				editable : false,
				sortable : false,
				label 	 : "Valor padrão",
				cell 	 : "string",
			}, 
			{
				name : "placeholder",
				editable : false,
				sortable : false,
				label 	 : "Placeholder",
				cell 	 : "string",
			}, 
			{
				name : "required",
				editable : false,
				sortable : false,
				label 	 : "Obrigatório",
				cell 	 : "string",
			}, 
			{
				name : "unique",
				editable : false,
				sortable : false,
				label 	 : "Único",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return ModalAttributes;
});
