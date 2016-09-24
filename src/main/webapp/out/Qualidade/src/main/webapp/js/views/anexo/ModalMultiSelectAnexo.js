/* generated: 24/09/2016 11:56:31 */
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
	var AnexoPageCollection = require('collections/AnexoPageCollection');
	var ModalMultiSelectAnexoTemplate = require('text!views/anexo/tpl/ModalMultiSelectAnexoTemplate.html');
	// End of "Import´s" definition

	var ModalAnexos = Marionette.LayoutView.extend({
		template : _.template(ModalMultiSelectAnexoTemplate),

		regions : {
			gridRegion : '#grid-anexos-modal',
			paginatorRegion : '#paginator-anexos-modal',
		},
		events : {
			'click .btnOk' : 'close'
		},
		ui : {
			btnOk : ".btnOk",
		},

		initialize : function(opt) {
			var that = this;

			this.projetoAnexos = this.collection;
			
			this.anexos = new AnexoPageCollection();
			this.anexos.on('fetched', this.endFetch, this);
			this.anexos.on('backgrid:selected', this.selectModel, this);

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this.getColumns(),
				emptyText : "Nenhum registro para escolha",
				collection : this.anexos,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this.getColumns(),
				collection : this.anexos,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.anexos.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid anexo');
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
				this.projetoAnexos.add(model)
			else
				this.projetoAnexos.remove(model)
		},

		endFetch : function(_collection) {
			var that = this;
			this.anexos.each(function(model) {
				if (that.projetoAnexos.findWhere({
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
				name : "nome",
				editable : false,
				sortable : false,
				label 	 : "Nome",
				cell 	 : "string",
			}, 
			{
				name : "conteudo",
				editable : false,
				sortable : false,
				label 	 : "Conteudo",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return ModalAnexos;
});
