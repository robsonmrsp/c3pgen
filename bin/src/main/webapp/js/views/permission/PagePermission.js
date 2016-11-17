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

	var TemplateFormPermissions = require('text!views/permission/tpl/FormPermissionTemplate.html');
	var PermissionModel = require('models/PermissionModel');
	var PermissionCollection = require('collections/PermissionCollection');
	var PermissionPageCollection = require('collections/PermissionPageCollection');
	var PagePermissionTemplate = require('text!views/permission/tpl/PagePermissionTemplate.html');
	
	//Filter import
	var SearchOperationModal = require('views/modalComponents/OperationModal');
	var SearchItemModal = require('views/modalComponents/ItemModal');
	
	// End of "Import´s" definition

	var PagePermission = Marionette.LayoutView.extend({
		template : _.template(PagePermissionTemplate),

		regions : {
			gridRegion : '#grid',
			counterRegion : '#counter',
			paginatorRegion : '#paginator',
			searchOperationModalRegion : '#operationModal',
			searchItemModalRegion : '#itemModal',
		},
		
		events : {
			'click 	#query' : '_queryPermission',			
			'click 	#reset' : '_resetPermission',			
			'click #searchOperationModal' : '_showSearchOperationModal',
			'click #searchItemModal' : '_showSearchItemModal',
			'keypress' : 'treatKeypress',
		},
		
		
		ui : {
			inputName : '#inputName',
		
			inputOperationId : '#inputOperationId',
			inputOperationName : '#inputOperationName',
			inputItemId : '#inputItemId',
			inputItemName : '#inputItemName',
			form : '#formPermissionFilter',
		},
		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this._queryPermission();
	    	}
		},

		initialize : function() {
			var that = this;

			this.permissions = new PermissionPageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.permissions
			});

			this.counter = new Counter({
				collection : this.permissions,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.permissions,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.permissions.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid permission');
				},
				error : function(_col, _resp, _opts) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')) );
				}
			});
			this.searchOperationModal = new SearchOperationModal({
				onSelectModel : function(model) {
					that._selectOperation(model);
				},
			});
			this.searchItemModal = new SearchItemModal({
				onSelectModel : function(model) {
					that._selectItem(model);
				},
			});
			this.on('show', function() {
				that.gridRegion.show(that.grid);
				that.counterRegion.show(that.counter);
				that.paginatorRegion.show(that.paginator);
				this.searchOperationModalRegion.show(this.searchOperationModal);		
				this.searchItemModalRegion.show(this.searchItemModal);		
			});
		},
		 
		_queryPermission : function(){
			var that = this;

			this.permissions.filterQueryParams = {
	    		name : util.escapeById('inputName'), 
			    operation : util.escapeById('inputOperationId'), 
			    item : util.escapeById('inputItemId'), 
			}
			this.permissions.fetch({
				success : function(_coll, _resp, _opt) {
					console.info('Consulta para o grid permission');
				},
				error : function(_coll, _resp, _opt) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				},
				complete : function() {
					
				},
			})		
		},
		_resetPermission : function(){
			this.ui.form.get(0).reset();
			this.permissions.reset();
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
				name : "operation.name",
				editable : false,
				sortable : true,  //já é possivel ordenar por esses atributos compostos.
				label : "Operação",
				cell : CustomStringCell.extend({
					fieldName : 'operation.name',
				}),
			},	
			{
				name : "item.name",
				editable : false,
				sortable : true,  //já é possivel ordenar por esses atributos compostos.
				label : "Item",
				cell : CustomStringCell.extend({
					fieldName : 'item.name',
				}),
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
			return "app/editPermission/" + model.get('id');
		},

		_editModel : function(model) {

		},
		_showSearchOperationModal : function() {
			this.searchOperationModal.showPage();
		},
			
		_selectOperation : function(operation) {
			this.searchOperationModal.hidePage();	
			this.ui.inputOperationId.val(operation.get('id'));
			this.ui.inputOperationName.val(operation.get('name'));		
		},
		_showSearchItemModal : function() {
			this.searchItemModal.showPage();
		},
			
		_selectItem : function(item) {
			this.searchItemModal.hidePage();	
			this.ui.inputItemId.val(item.get('id'));
			this.ui.inputItemName.val(item.get('name'));		
		},
		

	});

	return PagePermission;
});
