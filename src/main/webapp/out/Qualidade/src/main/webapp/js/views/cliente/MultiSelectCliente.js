/* generated: 24/09/2016 12:52:13 */
define(function(require) {
	// Start "Import´s" Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Backgrid = require('adapters/backgrid-adapter');
	var Marionette = require('marionette');
	var util = require('utilities/utils');
	var BaseModel = require('models/BaseModel');
	var CustomNumberCell = require('views/components/CustomNumberCell');

	var ModalMultiSelectCliente = require('views/cliente/ModalMultiSelectCliente');
	var MultiSelectClienteTemplate = require('text!views/cliente/tpl/MultiSelectClienteTemplate.html');

	var MultiSelectCliente = Marionette.LayoutView.extend({
		template : _.template(MultiSelectClienteTemplate),

		regions : {
			modalMultiSelectClienteRegion : '#modalMultiSelectClientes',
			gridClientesModalRegion : '#gridMultiselectClientes',
		},

		initialize : function() {
			var that = this;

			this.clientes = this.collection;

			this.gridClientes = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.clientes,
			});

			this.modalMultiSelectCliente = new ModalMultiSelectCliente({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectClienteRegion.show(that.modalMultiSelectCliente);
				that.gridClientesModalRegion.show(that.gridClientes);
			});
		},
		clear : function(){
			this.modalMultiSelectCliente.clear();
		},
		
		_getColumns : function() {
			var columns = [

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

	return MultiSelectCliente
});
