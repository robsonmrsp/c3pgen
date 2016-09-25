/* generated: 24/09/2016 12:52:17 */
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
	var OperationPageCollection = require('collections/OperationPageCollection');
	var ModalMultiSelectOperationTemplate = require('text!views/operation/tpl/ModalMultiSelectOperationTemplate.html');
	// End of "Import´s" definition

	var ModalOperations = Marionette.LayoutView.extend({
		template : _.template(ModalMultiSelectOperationTemplate),

		regions : {
			gridRegion : '#grid-operations-modal',
			paginatorRegion : '#paginator-operations-modal',
		},
		events : {
			'click .btnOk' : 'close'
		},
		ui : {
			btnOk : ".btnOk",
		},

		initialize : function(opt) {
			var that = this;

			this.projetoOperations = this.collection;
			
			this.operations = new OperationPageCollection();
			this.operations.on('fetched', this.endFetch, this);
			this.operations.on('backgrid:selected', this.selectModel, this);

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this.getColumns(),
				emptyText : "Nenhum registro para escolha",
				collection : this.operations,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this.getColumns(),
				collection : this.operations,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.operations.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid operation');
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
				this.projetoOperations.add(model)
			else
				this.projetoOperations.remove(model)
		},

		endFetch : function(_collection) {
			var that = this;
			this.operations.each(function(model) {
				if (that.projetoOperations.findWhere({
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
				name : "canEdit",
				editable : false,
				sortable : false,
				label 	 : "Pode Editar",
				cell 	 : "string",
			}, 
			{
				name : "canRead",
				editable : false,
				sortable : false,
				label 	 : "Pode Ler",
				cell 	 : "string",
			}, 
			{
				name : "canUpdate",
				editable : false,
				sortable : false,
				label 	 : "Pode atualizar",
				cell 	 : "string",
			}, 
			{
				name : "canDelete",
				editable : false,
				sortable : false,
				label 	 : "Pode Deletar",
				cell 	 : "string",
			}, 
			{
				name : "canExecute",
				editable : false,
				sortable : false,
				label 	 : "Pode executar",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return ModalOperations;
});
