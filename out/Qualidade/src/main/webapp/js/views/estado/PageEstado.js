/* generated: 01/09/2016 17:25:05 */
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

	var TemplateFormEstados = require('text!views/estado/tpl/FormEstadoTemplate.html');
	var EstadoModel = require('models/EstadoModel');
	var EstadoCollection = require('collections/EstadoCollection');
	var EstadoPageCollection = require('collections/EstadoPageCollection');
	var PageEstadoTemplate = require('text!views/estado/tpl/PageEstadoTemplate.html');
	
	//Filter import
	
	// End of "Import´s" definition

	var PageEstado = Marionette.LayoutView.extend({
		template : _.template(PageEstadoTemplate),

		regions : {
			gridRegion : '#grid',
			counterRegion : '#counter',
			paginatorRegion : '#paginator',
		},
		
		events : {
			'click 	#query' : '_queryEstado',			
			'click 	#reset' : '_resetEstado',			
			'keypress' : 'treatKeypress',
		},
		
		
		ui : {
			inputNome : '#inputNome',
			inputFaixaCep1Ini : '#inputFaixaCep1Ini',
			inputFaixaCep1Fim : '#inputFaixaCep1Fim',
			inputFaixaCep2Ini : '#inputFaixaCep2Ini',
			inputFaixaCep2Fim : '#inputFaixaCep2Fim',
		
			form : '#formEstadoFilter',
		},
		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this._queryEstado();
	    	}
		},

		initialize : function() {
			var that = this;

			this.estados = new EstadoPageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.estados
			});

			this.counter = new Counter({
				collection : this.estados,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.estados,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.estados.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid estado');
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
		 
		_queryEstado : function(){
			var that = this;

			this.estados.filterQueryParams = {
	    		nome : util.escapeById('inputNome'),
	    		faixaCep1Ini : util.escapeById('inputFaixaCep1Ini'),
	    		faixaCep1Fim : util.escapeById('inputFaixaCep1Fim'),
	    		faixaCep2Ini : util.escapeById('inputFaixaCep2Ini'),
	    		faixaCep2Fim : util.escapeById('inputFaixaCep2Fim'),
			}
			this.estados.fetch({
				success : function(_coll, _resp, _opt) {
					console.info('Consulta para o grid estado');
				},
				error : function(_coll, _resp, _opt) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				},
				complete : function() {
					
				},
			})		
		},
		_resetEstado : function(){
			this.ui.form.get(0).reset();
			this.estados.reset();
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
				name : "faixaCep1Ini",
				editable : false,
				sortable : true,
				label 	 : "Faixa_cep1_ini",
				cell 	 : "string",
			}, 
			{
				name : "faixaCep1Fim",
				editable : false,
				sortable : true,
				label 	 : "Faixa_cep1_fim",
				cell 	 : "string",
			}, 
			{
				name : "faixaCep2Ini",
				editable : false,
				sortable : true,
				label 	 : "Faixa_cep2_ini",
				cell 	 : "string",
			}, 
			{
				name : "faixaCep2Fim",
				editable : false,
				sortable : true,
				label 	 : "Faixa_cep2_fim",
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
				hint : 'Editar Estado',
				onClick : that.editModel,
			}, {
				id : 'delete_button',
				type : 'danger',
				icon : 'icon-trash',
				hint : 'Delete Estado',
				onClick : that.deleteModel,
			});

			return buttons;
		},

		deleteModel : function(model) {
			var that = this;
			
			var modelTipo = new EstadoModel({
				id : model.id,
			});
			
			util.Bootbox.confirm("Tem certeza que deseja remover o registro [ " + model.get('id') + " ] ?", function(yes) {
				if (yes) {
					modelTipo.destroy({
						success : function() {
							that.estados.remove(model);
							util.showSuccessMessage('Estado removido com sucesso!');
						},
						error : function(_model, _resp) {
							util.showErrorMessage('Problema ao remover o registro',_resp);
						}
					});
				}
			});
		},

		editModel : function(model) {
			util.goPage("app/editEstado/" + model.get('id'));
		},

		

	});

	return PageEstado;
});
