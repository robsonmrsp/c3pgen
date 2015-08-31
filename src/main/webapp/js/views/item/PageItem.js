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

	var TemplateFormItems = require('text!views/item/tpl/FormItemTemplate.html');
	var ItemModel = require('models/ItemModel');
	var ItemCollection = require('collections/ItemCollection');
	var ItemPageCollection = require('collections/ItemPageCollection');
	var PageItemTemplate = require('text!views/item/tpl/PageItemTemplate.html');
	
	//Filter import
	var SearchTypeModal = require('views/modalComponents/ItemTypeModal');
	
	// End of "Import´s" definition

	var PageItem = Marionette.LayoutView.extend({
		template : _.template(PageItemTemplate),

		regions : {
			gridRegion : '#grid',
			counterRegion : '#counter',
			paginatorRegion : '#paginator',
			searchTypeModalRegion : '#typeModal',
		},
		
		events : {
			'click 	#query' : '_queryItem',			
			'click 	#reset' : '_resetItem',			
			'click #searchTypeModal' : '_showSearchTypeModal',
			'keypress' : 'treatKeypress',
		},
		
		
		ui : {
			inputName : '#inputName',
			inputDescription : '#inputDescription',
		
			inputTypeId : '#inputTypeId',
			inputTypeName : '#inputTypeName',
			form : '#formItemFilter',
		},
		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this._queryItem();
	    	}
		},

		initialize : function() {
			var that = this;

			this.items = new ItemPageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.items
			});

			this.counter = new Counter({
				collection : this.items,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.items,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.items.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid item');
				},
				error : function(_col, _resp, _opts) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')) );
				}
			});
			this.searchTypeModal = new SearchTypeModal({
				onSelectModel : function(model) {
					that._selectType(model);
				},
			});
			this.on('show', function() {
				that.gridRegion.show(that.grid);
				that.counterRegion.show(that.counter);
				that.paginatorRegion.show(that.paginator);
				this.searchTypeModalRegion.show(this.searchTypeModal);		
			});
		},
		 
		_queryItem : function(){
			var that = this;

			this.items.filterQueryParams = {
	    		name : util.escapeById('inputName'), 
	    		description : util.escapeById('inputDescription'), 
			    type : util.escapeById('inputTypeId'), 
			}
			this.items.fetch({
				success : function(_coll, _resp, _opt) {
					console.info('Consulta para o grid item');
				},
				error : function(_coll, _resp, _opt) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				},
				complete : function() {
					
				},
			})		
		},
		_resetItem : function(){
			this.ui.form.get(0).reset();
			this.items.reset();
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
				name : "description",
				editable : false,
				sortable : true,
				label 	 : "Descrição",
				cell 	 : "string",
			}, 
			{
				name : "type.name",
				editable : false,
				sortable : true,  //já é possivel ordenar por esses atributos compostos.
				label : "Tipo",
				cell : CustomStringCell.extend({
					fieldName : 'type.name',
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
			return "app/editItem/" + model.get('id');
		},

		_editModel : function(model) {

		},
		_showSearchTypeModal : function() {
			this.searchTypeModal.showPage();
		},
			
		_selectType : function(type) {
			this.searchTypeModal.hidePage();	
			this.ui.inputTypeId.val(type.get('id'));
			this.ui.inputTypeName.val(type.get('name'));		
		},
		

	});

	return PageItem;
});
