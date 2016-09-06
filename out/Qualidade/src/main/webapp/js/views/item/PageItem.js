/* generated: 03/09/2016 22:18:33 */
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
			'click 	#reset' : 'resetItem',			
			'click #searchTypeModal' : 'showSearchTypeModal',
			'keypress' : 'treatKeypress',
			
			'click 	.search-button' : 'searchItem',
			'click .show-advanced-search-button' : 'toggleAdvancedForm',
		},
		
		
		ui : {
			inputName : '#inputName',
			inputDescription : '#inputDescription',
		
			inputTypeId : '#inputTypeId',
			inputTypeName : '#inputTypeName',
			form : '#formItemFilter',
			advancedSearchForm : '.advanced-search-form',
		},
		
		toggleAdvancedForm : function() {
			this.ui.advancedSearchForm.slideToggle("slow");
		},

		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this.searchItem();
	    	}
		},

		initialize : function() {
			var that = this;

			this.items = new ItemPageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this.getColumns(),
				emptyText : "Sem registros",
				collection : this.items
			});

			this.counter = new Counter({
				collection : this.items,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this.getColumns(),
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
					that.selectType(model);
				},
			});
			this.on('show', function() {
				that.gridRegion.show(that.grid);
				that.counterRegion.show(that.counter);
				that.paginatorRegion.show(that.paginator);
				this.searchTypeModalRegion.show(this.searchTypeModal);		
		
			});
		},
		 
		searchItem : function(){
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
		resetItem : function(){
			this.ui.form.get(0).reset();
			this.items.reset();
			util.clear('inputTypeId');
		},
				
		getColumns : function() {
			var that = this;
			var columns = [
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
				sortable : true,  
				label : "Tipo",
				cell : CustomStringCell.extend({
					fieldName : 'type.name',
				}),
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
				hint : 'Editar Item',
				onClick : that.editModel,
			}, {
				id : 'delete_button',
				type : 'danger',
				icon : 'icon-trash fa-trash',
				hint : 'Remover Item',
				onClick : that.deleteModel,
			});

			return buttons;
		},

		deleteModel : function(model) {
			var that = this;
			
			var modelTipo = new ItemModel({
				id : model.id,
			});
			
			util.Bootbox.confirm("Tem certeza que deseja remover o registro [ " + model.get('id') + " ] ?", function(yes) {
				if (yes) {
					modelTipo.destroy({
						success : function() {
							that.items.remove(model);
							util.showSuccessMessage('Item removido com sucesso!');
						},
						error : function(_model, _resp) {
							util.showErrorMessage('Problema ao remover o registro',_resp);
						}
					});
				}
			});
		},

		editModel : function(model) {
			util.goPage("app/editItem/" + model.get('id'));
		},

		showSearchTypeModal : function() {
			this.searchTypeModal.showPage();
		},
			
		selectType : function(type) {
			this.searchTypeModal.hidePage();	
			this.ui.inputTypeId.val(type.get('id'));
			this.ui.inputTypeName.val(type.get('name'));		
		},
		

	});

	return PageItem;
});
