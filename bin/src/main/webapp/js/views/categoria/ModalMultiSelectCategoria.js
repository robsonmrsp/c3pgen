/* generated: 18/08/2015 15:38:44 */
define(function(require) {
	// Start "Import´s Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Backgrid = require('adapters/backgrid-adapter');
	var Marionette = require('marionette');

	var util = require('utilities/utils');
	var CategoriaPageCollection = require('collections/CategoriaPageCollection');
	var ModalMultiSelectCategoriaTemplate = require('text!views/categoria/tpl/ModalMultiSelectCategoriaTemplate.html');
	// End of "Import´s" definition

	var ModalCategorias = Marionette.LayoutView.extend({
		template : _.template(ModalMultiSelectCategoriaTemplate),

		regions : {
			gridRegion : '#grid-categorias-modal',
			paginatorRegion : '#paginator-categorias-modal',
		},
		events : {
			'click .btnOk' : 'close'
		},
		ui : {
			btnOk : ".btnOk",
		},

		initialize : function(opt) {
			var that = this;

			this.projetoCategorias = this.collection;
			
			this.categorias = new CategoriaPageCollection();
			this.categorias.on('fetched', this.endFetch, this);
			this.categorias.on('backgrid:selected', this.selectModel, this);

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Nenhum registro para escolha",
				collection : this.categorias,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.categorias,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.categorias.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid categoria');
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
				this.projetoCategorias.add(model)
			else
				this.projetoCategorias.remove(model)
		},

		endFetch : function(_collection) {
			var that = this;
			this.categorias.each(function(model) {
				if (that.projetoCategorias.findWhere({
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
				label 	 : "Nome",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return ModalCategorias;
});
