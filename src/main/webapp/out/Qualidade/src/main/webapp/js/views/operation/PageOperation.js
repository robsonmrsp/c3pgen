/* generated: 24/09/2016 11:56:38 */
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
			'click 	#reset' : 'resetOperation',			
			'keypress' : 'treatKeypress',
			
			'click 	.search-button' : 'searchOperation',
			'click .show-advanced-search-button' : 'toggleAdvancedForm',
		},
		
		
		ui : {
			inputName : '#inputName',
			inputCanEdit : '#inputCanEdit',
			inputCanRead : '#inputCanRead',
			inputCanUpdate : '#inputCanUpdate',
			inputCanDelete : '#inputCanDelete',
			inputCanExecute : '#inputCanExecute',
		
			form : '#formOperationFilter',
			advancedSearchForm : '.advanced-search-form',
		},
		
		toggleAdvancedForm : function() {
			this.ui.advancedSearchForm.slideToggle("slow");
		},

		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this.searchOperation();
	    	}
		},

		initialize : function() {
			var that = this;

			this.operations = new OperationPageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this.getColumns(),
				emptyText : "Sem registros",
				collection : this.operations
			});

			this.counter = new Counter({
				collection : this.operations,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this.getColumns(),
				collection : this.operations,
				className : ' paging_simple_numbers',
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
		 
		searchOperation : function(){
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
		resetOperation : function(){
			this.ui.form.get(0).reset();
			this.operations.reset();
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
				hint : 'Editar Operação',
				onClick : that.editModel,
			}, {
				id : 'delete_button',
				type : 'danger',
				icon : 'icon-trash fa-trash',
				hint : 'Remover Operação',
				onClick : that.deleteModel,
			});

			return buttons;
		},

		deleteModel : function(model) {
			var that = this;
			
			var modelTipo = new OperationModel({
				id : model.id,
			});
			
			util.Bootbox.confirm("Tem certeza que deseja remover o registro [ " + model.get('id') + " ] ?", function(yes) {
				if (yes) {
					modelTipo.destroy({
						success : function() {
							that.operations.remove(model);
							util.showSuccessMessage('Operação removido com sucesso!');
						},
						error : function(_model, _resp) {
							util.showErrorMessage('Problema ao remover o registro',_resp);
						}
					});
				}
			});
		},

		editModel : function(model) {
			util.goPage("app/editOperation/" + model.get('id'));
		},

		

	});

	return PageOperation;
});
