/* generated: 02/09/2016 16:23:48 */
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
	var FuncaoPageCollection = require('collections/FuncaoPageCollection');
	var ModalMultiSelectFuncaoTemplate = require('text!views/funcao/tpl/ModalMultiSelectFuncaoTemplate.html');
	// End of "Import´s" definition

	var ModalFuncaos = Marionette.LayoutView.extend({
		template : _.template(ModalMultiSelectFuncaoTemplate),

		regions : {
			gridRegion : '#grid-funcaos-modal',
			paginatorRegion : '#paginator-funcaos-modal',
		},
		events : {
			'click .btnOk' : 'close'
		},
		ui : {
			btnOk : ".btnOk",
		},

		initialize : function(opt) {
			var that = this;

			this.projetoFuncaos = this.collection;
			
			this.funcaos = new FuncaoPageCollection();
			this.funcaos.on('fetched', this.endFetch, this);
			this.funcaos.on('backgrid:selected', this.selectModel, this);

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Nenhum registro para escolha",
				collection : this.funcaos,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.funcaos,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.funcaos.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid funcao');
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
				this.projetoFuncaos.add(model)
			else
				this.projetoFuncaos.remove(model)
		},

		endFetch : function(_collection) {
			var that = this;
			this.funcaos.each(function(model) {
				if (that.projetoFuncaos.findWhere({
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
			{
				name : "descricao",
				editable : false,
				sortable : false,
				label 	 : "Descrição",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return ModalFuncaos;
});
