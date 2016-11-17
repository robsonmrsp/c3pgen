/* generated: 30/08/2015 20:23:12 */
define(function(require) {
	// Start "Import´s Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Backgrid = require('adapters/backgrid-adapter');
	var util = require('utilities/utils');
	var Combobox = require('views/components/Combobox');
	var CustomStringCell = require('views/components/CustomStringCell');
	var Counter = require('views/components/Counter');
	var ActionsCell = require('views/components/ActionsCell');
	var CustomNumberCell = require('views/components/CustomNumberCell');

	var TemplateFormClientes = require('text!views/cliente/tpl/FormClienteTemplate.html');
	var ClienteModel = require('models/ClienteModel');
	var ClienteCollection = require('collections/ClienteCollection');
	var ClientePageCollection = require('collections/ClientePageCollection');
	var PageClienteTemplate = require('text!views/cliente/tpl/PageClienteTemplate.html');
	
	//Filter import
	
	// End of "Import´s" definition

	var PageCliente = Marionette.LayoutView.extend({
		template : _.template(PageClienteTemplate),

		regions : {
			gridRegion : '#grid',
			counterRegion : '#counter',
			paginatorRegion : '#paginator',
		},
		
		events : {
			'click 	#query' : '_queryCliente',			
			'click 	#reset' : '_resetCliente',			
			'keypress' : 'treatKeypress',
		},
		
		
		ui : {
			inputNome : '#inputNome',
			inputEmail : '#inputEmail',
			inputCpf : '#inputCpf',
			inputTelefone : '#inputTelefone',
			inputOutroTelefone : '#inputOutroTelefone',
		
			form : '#formClienteFilter',
		},
		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this._queryCliente();
	    	}
		},

		initialize : function() {
			var that = this;

			this.clientes = new ClientePageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.clientes
			});

			this.counter = new Counter({
				collection : this.clientes,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.clientes,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.clientes.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid cliente');
				},
				error : function(_col, _resp, _opts) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')) );
				}
			});
			this.on('show', function() {
				that.gridRegion.show(that.grid);
				that.counterRegion.show(that.counter);
				that.paginatorRegion.show(that.paginator);
				this.ui.inputCpf.mask('999.999.999-99');
			});
		},
		 
		_queryCliente : function(){
			var that = this;

			this.clientes.filterQueryParams = {
	    		nome : util.escapeById('inputNome'), 
	    		email : util.escapeById('inputEmail'), 
	    		cpf : util.escapeById('inputCpf'), 
	    		telefone : util.escapeById('inputTelefone'), 
	    		outroTelefone : util.escapeById('inputOutroTelefone'), 
			}
			this.clientes.fetch({
				success : function(_coll, _resp, _opt) {
					console.info('Consulta para o grid cliente');
				},
				error : function(_coll, _resp, _opt) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				},
				complete : function() {
					
				},
			})		
		},
		_resetCliente : function(){
			this.ui.form.get(0).reset();
			this.clientes.reset();
		},
				
		_getColumns : function() {
			var columns = [
			//{
			//	name : "id",
			//	label : "id",
			//	editable : false,
			//	cell : Backgrid.IntegerCell.extend({
			//		orderSeparator : ''
			//	})
			//}, 
			{
				name : "nome",
				editable : false,
				sortable : true,
				label 	 : "Nome",
				cell 	 : "string",
			}, 
			{
				name : "email",
				editable : false,
				sortable : true,
				label 	 : "Email",
				cell 	 : "string",
			}, 
			{
				name : "cpf",
				editable : false,
				sortable : true,
				label 	 : "Cpf",
				cell 	 : "string",
			}, 
			{
				name : "telefone",
				editable : false,
				sortable : true,
				label 	 : "Outro Telefone",
				cell 	 : "string",
			}, 
			{
				name : "outroTelefone",
				editable : false,
				sortable : true,
				label 	 : "Outro Telefone",
				cell 	 : "string",
			}, 
			{
				name : "acoes",
				label : "Ações(Editar, Deletar)",
				sortable : false,
				cell : ActionsCell.extend({
					editPath : this._getEditPath,
					deletePath : this._getDeletePath,
					editModel : this._editModel,
					deleteModel : this._deleteModel
				})
			} ];
			return columns;
		},

		_deleteModel : function(model) {
			util.Bootbox.confirm("Tem certeza que deseja remover o registro [ " + model.get('id') + "] ?", function(yes) {
				if (yes) {
					model.destroy({
						success : function() {
							util.showMessage('success', 'Registro removido com sucesso!');
						},
						error : function() {
							util.showMessage('error', 'Problemas ao remover registro!');
							console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
						}
					});
				}
			});
		},

		_getDeletePath : function(model) {
			// alert('Delete,,, ' + JSON.stringify(model));
		},

		_getEditPath : function(model) {
			return "app/editCliente/" + model.get('id');
		},

		_editModel : function(model) {

		},
		

	});

	return PageCliente;
});
