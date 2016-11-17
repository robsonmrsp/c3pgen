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

	var TemplateFormClients = require('text!views/client/tpl/FormClientTemplate.html');
	var ClientModel = require('models/ClientModel');
	var ClientCollection = require('collections/ClientCollection');
	var ClientPageCollection = require('collections/ClientPageCollection');
	var PageClientTemplate = require('text!views/client/tpl/PageClientTemplate.html');
	
	//Filter import
	
	// End of "Import´s" definition

	var PageClient = Marionette.LayoutView.extend({
		template : _.template(PageClientTemplate),

		regions : {
			gridRegion : '#grid',
			counterRegion : '#counter',
			paginatorRegion : '#paginator',
		},
		
		events : {
			'click 	#query' : '_queryClient',			
			'click 	#reset' : '_resetClient',			
			'keypress' : 'treatKeypress',
		},
		
		
		ui : {
			inputLogo : '#inputLogo',
			inputName : '#inputName',
			inputCnpj : '#inputCnpj',
			inputPhoneNumber : '#inputPhoneNumber',
			inputCorporateName : '#inputCorporateName',
		
			form : '#formClientFilter',
		},
		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this._queryClient();
	    	}
		},

		initialize : function() {
			var that = this;

			this.clients = new ClientPageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.clients
			});

			this.counter = new Counter({
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
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')) );
				}
			});
			this.on('show', function() {
				that.gridRegion.show(that.grid);
				that.counterRegion.show(that.counter);
				that.paginatorRegion.show(that.paginator);
			});
		},
		 
		_queryClient : function(){
			var that = this;

			this.clients.filterQueryParams = {
	    		logo : util.escapeById('inputLogo'), 
	    		name : util.escapeById('inputName'), 
	    		cnpj : util.escapeById('inputCnpj'), 
	    		phoneNumber : util.escapeById('inputPhoneNumber'), 
	    		corporateName : util.escapeById('inputCorporateName'), 
			}
			this.clients.fetch({
				success : function(_coll, _resp, _opt) {
					console.info('Consulta para o grid client');
				},
				error : function(_coll, _resp, _opt) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				},
				complete : function() {
					
				},
			})		
		},
		_resetClient : function(){
			this.ui.form.get(0).reset();
			this.clients.reset();
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
				name : "logo",
				editable : false,
				sortable : true,
				label 	 : "Logotipo",
				cell 	 : "string",
			}, 
			{
				name : "name",
				editable : false,
				sortable : true,
				label 	 : "Nome",
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
				name : "phoneNumber",
				editable : false,
				sortable : true,
				label 	 : "Telefone",
				cell 	 : "string",
			}, 
			{
				name : "corporateName",
				editable : false,
				sortable : true,
				label 	 : "Razão Social",
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
			return "app/editClient/" + model.get('id');
		},

		_editModel : function(model) {

		},
		

	});

	return PageClient;
});
