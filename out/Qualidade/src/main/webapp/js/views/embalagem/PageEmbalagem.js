/* generated: 02/09/2016 16:23:48 */
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

	var TemplateFormEmbalagems = require('text!views/embalagem/tpl/FormEmbalagemTemplate.html');
	var EmbalagemModel = require('models/EmbalagemModel');
	var EmbalagemCollection = require('collections/EmbalagemCollection');
	var EmbalagemPageCollection = require('collections/EmbalagemPageCollection');
	var PageEmbalagemTemplate = require('text!views/embalagem/tpl/PageEmbalagemTemplate.html');
	
	//Filter import
	
	// End of "Import´s" definition

	var PageEmbalagem = Marionette.LayoutView.extend({
		template : _.template(PageEmbalagemTemplate),

		regions : {
			gridRegion : '#grid',
			counterRegion : '#counter',
			paginatorRegion : '#paginator',
		},
		
		events : {
			'click 	#reset' : '_resetEmbalagem',			
			'keypress' : 'treatKeypress',
			
			'click 	.search-button' : 'searchEmbalagem',
			'click .show-advanced-search-button' : 'toggleAdvancedForm',
		},
		
		
		ui : {
			inputNome : '#inputNome',
		
			form : '#formEmbalagemFilter',
			advancedSearchForm : '.advanced-search-form',
		},
		
		toggleAdvancedForm : function() {
			this.ui.advancedSearchForm.slideToggle("slow");
		},

		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this.searchEmbalagem();
	    	}
		},

		initialize : function() {
			var that = this;

			this.embalagems = new EmbalagemPageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.embalagems
			});

			this.counter = new Counter({
				collection : this.embalagems,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.embalagems,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.embalagems.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid embalagem');
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
		 
		searchEmbalagem : function(){
			var that = this;

			this.embalagems.filterQueryParams = {
	    		nome : util.escapeById('inputNome'),
			}
			this.embalagems.fetch({
				success : function(_coll, _resp, _opt) {
					console.info('Consulta para o grid embalagem');
				},
				error : function(_coll, _resp, _opt) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				},
				complete : function() {
					
				},
			})		
		},
		_resetEmbalagem : function(){
			this.ui.form.get(0).reset();
			this.embalagems.reset();
		},
				
		_getColumns : function() {
			var that = this;
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
				name : "acoes",
				label : "Ações(Editar, Deletar)",
				sortable : false,
				cell : GeneralActionsCell.extend({
					buttons : that._getCellButtons(),
					context : that,
				})
			} ];
			return columns;
		},
		
		_getCellButtons : function() {
			var that = this;
			var buttons = [];

			buttons.push({
				id : 'edita_ficha_button',
				type : 'primary',
				icon : 'icon-pencil',
				hint : 'Editar Embalagem',
				onClick : that.editModel,
			}, {
				id : 'delete_button',
				type : 'danger',
				icon : 'icon-trash',
				hint : 'Delete Embalagem',
				onClick : that.deleteModel,
			});

			return buttons;
		},

		deleteModel : function(model) {
			var that = this;
			
			var modelTipo = new EmbalagemModel({
				id : model.id,
			});
			
			util.Bootbox.confirm("Tem certeza que deseja remover o registro [ " + model.get('id') + " ] ?", function(yes) {
				if (yes) {
					modelTipo.destroy({
						success : function() {
							that.embalagems.remove(model);
							util.showSuccessMessage('Embalagem removido com sucesso!');
						},
						error : function(_model, _resp) {
							util.showErrorMessage('Problema ao remover o registro',_resp);
						}
					});
				}
			});
		},

		editModel : function(model) {
			util.goPage("app/editEmbalagem/" + model.get('id'));
		},

		

	});

	return PageEmbalagem;
});
