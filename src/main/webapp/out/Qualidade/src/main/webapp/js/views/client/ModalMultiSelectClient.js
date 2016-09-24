/* generated: 24/09/2016 11:56:33 */
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
	var ClientPageCollection = require('collections/ClientPageCollection');
	var ModalMultiSelectClientTemplate = require('text!views/client/tpl/ModalMultiSelectClientTemplate.html');
	// End of "Import´s" definition

	var ModalClients = Marionette.LayoutView.extend({
		template : _.template(ModalMultiSelectClientTemplate),

		regions : {
			gridRegion : '#grid-clients-modal',
			paginatorRegion : '#paginator-clients-modal',
		},
		events : {
			'click .btnOk' : 'close'
		},
		ui : {
			btnOk : ".btnOk",
		},

		initialize : function(opt) {
			var that = this;

			this.projetoClients = this.collection;
			
			this.clients = new ClientPageCollection();
			this.clients.on('fetched', this.endFetch, this);
			this.clients.on('backgrid:selected', this.selectModel, this);

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this.getColumns(),
				emptyText : "Nenhum registro para escolha",
				collection : this.clients,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this.getColumns(),
				collection : this.clients,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.clients.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid client');
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
				this.projetoClients.add(model)
			else
				this.projetoClients.remove(model)
		},

		endFetch : function(_collection) {
			var that = this;
			this.clients.each(function(model) {
				if (that.projetoClients.findWhere({
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
			];
			return columns;
		},
	});

	return ModalClients;
});
