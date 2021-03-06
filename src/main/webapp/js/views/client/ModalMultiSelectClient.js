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
				columns : this._getColumns(),
				emptyText : "Nenhum registro para escolha",
				collection : this.clients,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
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
		_getColumns : function() {
			var columns = [{
				name : "",
				cell : "select-row",
				headerCell : "select-all"
			}, 
			 
			{
				name : "logo",
				editable : false,
				sortable : false,
				label 	 : "Logotipo",
				cell 	 : "string",
			}, 
			{
				name : "name",
				editable : false,
				sortable : false,
				label 	 : "Nome",
				cell 	 : "string",
			}, 
			{
				name : "cnpj",
				editable : false,
				sortable : false,
				label 	 : "CNPJ",
				cell 	 : "string",
			}, 
			{
				name : "phoneNumber",
				editable : false,
				sortable : false,
				label 	 : "Telefone",
				cell 	 : "string",
			}, 
			{
				name : "corporateName",
				editable : false,
				sortable : false,
				label 	 : "Razão Social",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return ModalClients;
});
