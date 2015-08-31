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

	var TemplateFormOperations = require('text!views/operation/tpl/FormOperationTemplate.html');
	var OperationModel = require('models/OperationModel');
	var OperationCollection = require('collections/OperationCollection');
	var OperationPageCollection = require('collections/OperationPageCollection');
	var PageOperationTemplate = require('text!views/operation/tpl/PageOperationTemplate.html');
	
	//Filter import
	
	// End of "Import´s" definition

	var PageOperation = Marionette.LayoutView.extend({
		template : _.template(PageOperationTemplate),

		regions : {
			gridRegion : '#grid',
			counterRegion : '#counter',
			paginatorRegion : '#paginator',
		},
		
		events : {
			'click 	#query' : '_queryOperation',			
			'click 	#reset' : '_resetOperation',			
			'keypress' : 'treatKeypress',
		},
		
		
		ui : {
			inputName : '#inputName',
			inputCanEdit : '#inputCanEdit',
			inputCanRead : '#inputCanRead',
			inputCanUpdate : '#inputCanUpdate',
			inputCanDelete : '#inputCanDelete',
			inputCanExecute : '#inputCanExecute',
		
			form : '#formOperationFilter',
		},
		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this._queryOperation();
	    	}
		},

		initialize : function() {
			var that = this;

			this.operations = new OperationPageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.operations
			});

			this.counter = new Counter({
				collection : this.operations,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.operations,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.operations.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid operation');
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
		 
		_queryOperation : function(){
			var that = this;

			this.operations.filterQueryParams = {
	    		name : util.escapeById('inputName'), 
	    		canEdit : util.escapeById('inputCanEdit'), 
	    		canRead : util.escapeById('inputCanRead'), 
	    		canUpdate : util.escapeById('inputCanUpdate'), 
	    		canDelete : util.escapeById('inputCanDelete'), 
	    		canExecute : util.escapeById('inputCanExecute'), 
			}
			this.operations.fetch({
				success : function(_coll, _resp, _opt) {
					console.info('Consulta para o grid operation');
				},
				error : function(_coll, _resp, _opt) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				},
				complete : function() {
					
				},
			})		
		},
		_resetOperation : function(){
			this.ui.form.get(0).reset();
			this.operations.reset();
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
				name : "name",
				editable : false,
				sortable : true,
				label 	 : "Nome",
				cell 	 : "string",
			}, 
			{
				name : "canEdit",
				editable : false,
				sortable : true,
				label 	 : "Pode Editar",
				cell 	 : "string",
			}, 
			{
				name : "canRead",
				editable : false,
				sortable : true,
				label 	 : "Pode Ler",
				cell 	 : "string",
			}, 
			{
				name : "canUpdate",
				editable : false,
				sortable : true,
				label 	 : "Pode atualizar",
				cell 	 : "string",
			}, 
			{
				name : "canDelete",
				editable : false,
				sortable : true,
				label 	 : "Pode Deletar",
				cell 	 : "string",
			}, 
			{
				name : "canExecute",
				editable : false,
				sortable : true,
				label 	 : "Pode executar",
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
			return "app/editOperation/" + model.get('id');
		},

		_editModel : function(model) {

		},
		

	});

	return PageOperation;
});
