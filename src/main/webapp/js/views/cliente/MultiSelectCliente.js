/* generated: 30/08/2015 20:23:12 */
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
				name : "email",
				editable : false,
				sortable : false,
				label 	 : "Email",
				cell 	 : "string",
			}, 
			{
				name : "cpf",
				editable : false,
				sortable : false,
				label 	 : "Cpf",
				cell 	 : "string",
			}, 
			{
				name : "telefone",
				editable : false,
				sortable : false,
				label 	 : "Outro Telefone",
				cell 	 : "string",
			}, 
			{
				name : "outroTelefone",
				editable : false,
				sortable : false,
				label 	 : "Outro Telefone",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return MultiSelectCliente
});
