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

	var TemplateFormTheEntitys = require('text!views/theEntity/tpl/FormTheEntityTemplate.html');
	var TheEntityModel = require('models/TheEntityModel');
	var TheEntityCollection = require('collections/TheEntityCollection');
	var TheEntityPageCollection = require('collections/TheEntityPageCollection');
	var PageTheEntityTemplate = require('text!views/theEntity/tpl/PageTheEntityTemplate.html');
	
	//Filter import
	var SearchApplicationModal = require('views/modalComponents/ApplicationModal');
	
	// End of "Import´s" definition

	var PageTheEntity = Marionette.LayoutView.extend({
		template : _.template(PageTheEntityTemplate),

		regions : {
			gridRegion : '#grid',
			counterRegion : '#counter',
			paginatorRegion : '#paginator',
			searchApplicationModalRegion : '#applicationModal',
		},
		
		events : {
			'click 	#query' : '_queryTheEntity',			
			'click 	#reset' : '_resetTheEntity',			
			'click #searchApplicationModal' : '_showSearchApplicationModal',
			'keypress' : 'treatKeypress',
		},
		
		
		ui : {
			inputName : '#inputName',
			inputDisplayName : '#inputDisplayName',
			inputTableName : '#inputTableName',
			inputHasOwner : '#inputHasOwner',
			inputHasMobile : '#inputHasMobile',
		
			inputApplicationId : '#inputApplicationId',
			inputApplicationName : '#inputApplicationName',
			form : '#formTheEntityFilter',
		},
		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this._queryTheEntity();
	    	}
		},

		initialize : function() {
			var that = this;

			this.theEntitys = new TheEntityPageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.theEntitys
			});

			this.counter = new Counter({
				collection : this.theEntitys,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.theEntitys,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.theEntitys.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid theEntity');
				},
				error : function(_col, _resp, _opts) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')) );
				}
			});
			this.searchApplicationModal = new SearchApplicationModal({
				onSelectModel : function(model) {
					that._selectApplication(model);
				},
			});
			this.on('show', function() {
				that.gridRegion.show(that.grid);
				that.counterRegion.show(that.counter);
				that.paginatorRegion.show(that.paginator);
				this.searchApplicationModalRegion.show(this.searchApplicationModal);		
			});
		},
		 
		_queryTheEntity : function(){
			var that = this;

			this.theEntitys.filterQueryParams = {
	    		name : util.escapeById('inputName'), 
	    		displayName : util.escapeById('inputDisplayName'), 
	    		tableName : util.escapeById('inputTableName'), 
	    		hasOwner : util.escapeById('inputHasOwner'), 
	    		hasMobile : util.escapeById('inputHasMobile'), 
			    application : util.escapeById('inputApplicationId'), 
			}
			this.theEntitys.fetch({
				success : function(_coll, _resp, _opt) {
					console.info('Consulta para o grid theEntity');
				},
				error : function(_coll, _resp, _opt) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				},
				complete : function() {
					
				},
			})		
		},
		_resetTheEntity : function(){
			this.ui.form.get(0).reset();
			this.theEntitys.reset();
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
				label 	 : "Name",
				cell 	 : "string",
			}, 
			{
				name : "displayName",
				editable : false,
				sortable : true,
				label 	 : "DisplayName",
				cell 	 : "string",
			}, 
			{
				name : "tableName",
				editable : false,
				sortable : true,
				label 	 : "TableName",
				cell 	 : "string",
			}, 
			{
				name : "hasOwner",
				editable : false,
				sortable : true,
				label 	 : "HasOwner",
				cell 	 : "string",
			}, 
			{
				name : "hasMobile",
				editable : false,
				sortable : true,
				label 	 : "HasMobile",
				cell 	 : "string",
			}, 
			{
				name : "application.name",
				editable : false,
				sortable : true,  //já é possivel ordenar por esses atributos compostos.
				label : "Aplicação",
				cell : CustomStringCell.extend({
					fieldName : 'application.name',
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
			return "app/editTheEntity/" + model.get('id');
		},

		_editModel : function(model) {

		},
		_showSearchApplicationModal : function() {
			this.searchApplicationModal.showPage();
		},
			
		_selectApplication : function(application) {
			this.searchApplicationModal.hidePage();	
			this.ui.inputApplicationId.val(application.get('id'));
			this.ui.inputApplicationName.val(application.get('name'));		
		},
		

	});

	return PageTheEntity;
});
