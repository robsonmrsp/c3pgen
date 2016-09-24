/* generated: 24/09/2016 11:56:33 */
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

	var TemplateFormCbos = require('text!views/cbo/tpl/FormCboTemplate.html');
	var CboModel = require('models/CboModel');
	var CboCollection = require('collections/CboCollection');
	var CboPageCollection = require('collections/CboPageCollection');
	var PageCboTemplate = require('text!views/cbo/tpl/PageCboTemplate.html');
	
	//Filter import
	
	// End of "Import´s" definition

	var PageCbo = Marionette.LayoutView.extend({
		template : _.template(PageCboTemplate),

		regions : {
			gridRegion : '#grid',
			counterRegion : '#counter',
			paginatorRegion : '#paginator',
		},
		
		events : {
			'click 	#reset' : 'resetCbo',			
			'keypress' : 'treatKeypress',
			
			'click 	.search-button' : 'searchCbo',
			'click .show-advanced-search-button' : 'toggleAdvancedForm',
		},
		
		
		ui : {
			inputCodigo : '#inputCodigo',
			inputNome : '#inputNome',
		
			form : '#formCboFilter',
			advancedSearchForm : '.advanced-search-form',
		},
		
		toggleAdvancedForm : function() {
			this.ui.advancedSearchForm.slideToggle("slow");
		},

		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this.searchCbo();
	    	}
		},

		initialize : function() {
			var that = this;

			this.cbos = new CboPageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this.getColumns(),
				emptyText : "Sem registros",
				collection : this.cbos
			});

			this.counter = new Counter({
				collection : this.cbos,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this.getColumns(),
				collection : this.cbos,
				className : ' paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.cbos.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid cbo');
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
		 
		searchCbo : function(){
			var that = this;

			this.cbos.filterQueryParams = {
	    		codigo : util.escapeById('inputCodigo'),
	    		nome : util.escapeById('inputNome'),
			}
			this.cbos.fetch({
				success : function(_coll, _resp, _opt) {
					console.info('Consulta para o grid cbo');
				},
				error : function(_coll, _resp, _opt) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				},
				complete : function() {
					
				},
			})		
		},
		resetCbo : function(){
			this.ui.form.get(0).reset();
			this.cbos.reset();
		},
				
		getColumns : function() {
			var that = this;
			var columns = [
			{
				name : "codigo",
				editable : false,
				sortable : true,
				label 	 : "Código",
				cell 	 : "string",
			}, 
			{
				name : "nome",
				editable : false,
				sortable : true,
				label 	 : "Nome",
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
				hint : 'Editar Cbo',
				onClick : that.editModel,
			}, {
				id : 'delete_button',
				type : 'danger',
				icon : 'icon-trash fa-trash',
				hint : 'Remover Cbo',
				onClick : that.deleteModel,
			});

			return buttons;
		},

		deleteModel : function(model) {
			var that = this;
			
			var modelTipo = new CboModel({
				id : model.id,
			});
			
			util.Bootbox.confirm("Tem certeza que deseja remover o registro [ " + model.get('id') + " ] ?", function(yes) {
				if (yes) {
					modelTipo.destroy({
						success : function() {
							that.cbos.remove(model);
							util.showSuccessMessage('Cbo removido com sucesso!');
						},
						error : function(_model, _resp) {
							util.showErrorMessage('Problema ao remover o registro',_resp);
						}
					});
				}
			});
		},

		editModel : function(model) {
			util.goPage("app/editCbo/" + model.get('id'));
		},

		

	});

	return PageCbo;
});
