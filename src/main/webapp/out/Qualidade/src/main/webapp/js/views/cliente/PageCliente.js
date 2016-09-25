/* generated: 24/09/2016 12:52:13 */
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
	var GeneralActionsCell = require('views/components/GeneralActionsCell');

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
			'click 	#reset' : 'resetCliente',			
			'keypress' : 'treatKeypress',
			
			'click 	.search-button' : 'searchCliente',
			'click .show-advanced-search-button' : 'toggleAdvancedForm',
		},
		
		
		ui : {
			inputNome : '#inputNome',
			inputNomeFantasia : '#inputNomeFantasia',
			inputNomeContato : '#inputNomeContato',
			inputTelefoneContato : '#inputTelefoneContato',
			inputRazaoSocial : '#inputRazaoSocial',
			inputCpf : '#inputCpf',
			inputCnpj : '#inputCnpj',
		
			form : '#formClienteFilter',
			advancedSearchForm : '.advanced-search-form',
		},
		
		toggleAdvancedForm : function() {
			this.ui.advancedSearchForm.slideToggle("slow");
		},

		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this.searchCliente();
	    	}
		},

		initialize : function() {
			var that = this;

			this.clientes = new ClientePageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this.getColumns(),
				emptyText : "Sem registros",
				collection : this.clientes
			});

			this.counter = new Counter({
				collection : this.clientes,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this.getColumns(),
				collection : this.clientes,
				className : ' paging_simple_numbers',
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
				this.ui.inputCnpj.mask('99.999.999/9999-99');
		
			});
		},
		 
		searchCliente : function(){
			var that = this;

			this.clientes.filterQueryParams = {
	    		nome : util.escapeById('inputNome'),
	    		nomeFantasia : util.escapeById('inputNomeFantasia'),
	    		nomeContato : util.escapeById('inputNomeContato'),
	    		telefoneContato : util.escapeById('inputTelefoneContato'),
	    		razaoSocial : util.escapeById('inputRazaoSocial'),
	    		cpf : util.escapeById('inputCpf'),
	    		cnpj : util.escapeById('inputCnpj'),
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
		resetCliente : function(){
			this.ui.form.get(0).reset();
			this.clientes.reset();
		},
				
		getColumns : function() {
			var that = this;
			var columns = [
			{
				name : "nome",
				editable : false,
				sortable : true,
				label 	 : "Nome",
				cell 	 : "string",
			}, 
			{
				name : "nomeFantasia",
				editable : false,
				sortable : true,
				label 	 : "Nome Fantasia",
				cell 	 : "string",
			}, 
			{
				name : "nomeContato",
				editable : false,
				sortable : true,
				label 	 : "Nome do Contato",
				cell 	 : "string",
			}, 
			{
				name : "telefoneContato",
				editable : false,
				sortable : true,
				label 	 : "Telefone do  Contato",
				cell 	 : "string",
			}, 
			{
				name : "razaoSocial",
				editable : false,
				sortable : true,
				label 	 : "Razão Social",
				cell 	 : "string",
			}, 
			{
				name : "cpf",
				editable : false,
				sortable : true,
				label 	 : "CPF",
				cell 	 : "string",
			}, 
			{
				name : "cnpj",
				editable : false,
				sortable : true,
				label 	 : "CNPJ",
				cell 	 : "string",
			}, 
			{
				name : "acoes",
				label : "Ações(Editar, Deletar)",
				sortable : false,
				cell : GeneralActionsCell.extend({
					buttons : that.getCellButtons(),
					context : that,
				})
			} ];
			return columns;
		},
		
		getCellButtons : function() {
			var that = this;
			var buttons = [];

			buttons.push({
				id : 'edita_ficha_button',
				type : 'primary',
				icon : 'icon-pencil fa-pencil',
				hint : 'Editar Cliente',
				onClick : that.editModel,
			}, {
				id : 'delete_button',
				type : 'danger',
				icon : 'icon-trash fa-trash',
				hint : 'Remover Cliente',
				onClick : that.deleteModel,
			});

			return buttons;
		},

		deleteModel : function(model) {
			var that = this;
			
			var modelTipo = new ClienteModel({
				id : model.id,
			});
			
			util.Bootbox.confirm("Tem certeza que deseja remover o registro [ " + model.get('id') + " ] ?", function(yes) {
				if (yes) {
					modelTipo.destroy({
						success : function() {
							that.clientes.remove(model);
							util.showSuccessMessage('Cliente removido com sucesso!');
						},
						error : function(_model, _resp) {
							util.showErrorMessage('Problema ao remover o registro',_resp);
						}
					});
				}
			});
		},

		editModel : function(model) {
			util.goPage("app/editCliente/" + model.get('id'));
		},

		

	});

	return PageCliente;
});
