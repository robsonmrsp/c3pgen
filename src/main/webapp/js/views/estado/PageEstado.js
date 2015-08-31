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
			return "app/editEstado/" + model.get('id');
		},

		_editModel : function(model) {

		},
		

	});

	return PageEstado;
});
