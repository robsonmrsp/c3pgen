/* generated: 03/09/2016 22:18:31 */
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
	var ClientePageCollection = require('collections/ClientePageCollection');
	var ModalMultiSelectClienteTemplate = require('text!views/cliente/tpl/ModalMultiSelectClienteTemplate.html');
	// End of "Import´s" definition

	var ModalClientes = Marionette.LayoutView.extend({
		template : _.template(ModalMultiSelectClienteTemplate),

		regions : {
			gridRegion : '#grid-clientes-modal',
			paginatorRegion : '#paginator-clientes-modal',
		},
		events : {
			'click .btnOk' : 'close'
		},
		ui : {
			btnOk : ".btnOk",
		},

		initialize : function(opt) {
			var that = this;

			this.projetoClientes = this.collection;
			
			this.clientes = new ClientePageCollection();
			this.clientes.on('fetched', this.endFetch, this);
			this.clientes.on('backgrid:selected', this.selectModel, this);

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this.getColumns(),
				emptyText : "Nenhum registro para escolha",
				collection : this.clientes,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this.getColumns(),
				collection : this.clientes,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.clientes.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid cliente');
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
				this.projetoClientes.add(model)
			else
				this.projetoClientes.remove(model)
		},

		endFetch : function(_collection) {
			var that = this;
			this.clientes.each(function(model) {
				if (that.projetoClientes.findWhere({
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
				name : "nomeFantasia",
				editable : false,
				sortable : false,
				label 	 : "Nome Fantasia",
				cell 	 : "string",
			}, 
			{
				name : "nomeContato",
				editable : false,
				sortable : false,
				label 	 : "Nome do Contato",
				cell 	 : "string",
			}, 
			{
				name : "telefoneContato",
				editable : false,
				sortable : false,
				label 	 : "Telefone do  Contato",
				cell 	 : "string",
			}, 
			{
				name : "razaoSocial",
				editable : false,
				sortable : false,
				label 	 : "Razão Social",
				cell 	 : "string",
			}, 
			{
				name : "observacao",
				editable : false,
				sortable : false,
				label 	 : "Observação",
				cell 	 : "string",
			}, 
			{
				name : "cpf",
				editable : false,
				sortable : false,
				label 	 : "CPF",
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
				name : "email",
				editable : false,
				sortable : false,
				label 	 : "E-mail",
				cell 	 : "string",
			}, 
			{
				name : "email2",
				editable : false,
				sortable : false,
				label 	 : "E-mail 2",
				cell 	 : "string",
			}, 
			{
				name : "pessoaFisica",
				editable : false,
				sortable : false,
				label 	 : "E-mail 2",
				cell 	 : "string",
			}, 
			{
				name : "dataNascimento",
				editable : false,
				sortable : false,
				label 	 : "Data Nascimento",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return ModalClientes;
});