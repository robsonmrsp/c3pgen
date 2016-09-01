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

	var TemplateFormCidades = require('text!views/cidade/tpl/FormCidadeTemplate.html');
	var CidadeModel = require('models/CidadeModel');
	var CidadeCollection = require('collections/CidadeCollection');
	var CidadePageCollection = require('collections/CidadePageCollection');
	var PageCidadeTemplate = require('text!views/cidade/tpl/PageCidadeTemplate.html');
	
	//Filter import
	var SearchEstadoModal = require('views/modalComponents/EstadoModal');
	
	// End of "Import´s" definition

	var PageCidade = Marionette.LayoutView.extend({
		template : _.template(PageCidadeTemplate),

		regions : {
			gridRegion : '#grid',
			counterRegion : '#counter',
			paginatorRegion : '#paginator',
			searchEstadoModalRegion : '#estadoModal',
		},
		
		events : {
			'click 	#query' : '_queryCidade',			
			'click 	#reset' : '_resetCidade',			
			'click #searchEstadoModal' : '_showSearchEstadoModal',
			'keypress' : 'treatKeypress',
		},
		
		
		ui : {
			inputNome : '#inputNome',
			inputCep : '#inputCep',
		
			inputEstadoId : '#inputEstadoId',
			inputEstadoNome : '#inputEstadoNome',
			form : '#formCidadeFilter',
		},
		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this._queryCidade();
	    	}
		},

		initialize : function() {
			var that = this;

			this.cidades = new CidadePageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.cidades
			});

			this.counter = new Counter({
				collection : this.cidades,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.cidades,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.cidades.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid cidade');
				},
				error : function(_col, _resp, _opts) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')) );
				}
			});
			this.searchEstadoModal = new SearchEstadoModal({
				onSelectModel : function(model) {
					that._selectEstado(model);
				},
			});
			this.on('show', function() {
				that.gridRegion.show(that.grid);
				that.counterRegion.show(that.counter);
				that.paginatorRegion.show(that.paginator);
				this.searchEstadoModalRegion.show(this.searchEstadoModal);		
		
			});
		},
		 
		_queryCidade : function(){
			var that = this;

			this.cidades.filterQueryParams = {
	    		nome : util.escapeById('inputNome'),
	    		cep : util.escapeById('inputCep'),
			    estado : util.escapeById('inputEstadoId'), 
			}
			this.cidades.fetch({
				success : function(_coll, _resp, _opt) {
					console.info('Consulta para o grid cidade');
				},
				error : function(_coll, _resp, _opt) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				},
				complete : function() {
					
				},
			})		
		},
		_resetCidade : function(){
			this.ui.form.get(0).reset();
			this.cidades.reset();
			util.clear('inputEstadoId');
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
				name : "cep",
				editable : false,
				sortable : true,
				label 	 : "Cep",
				cell 	 : "string",
			}, 
			{
				name : "estado.nome",
				editable : false,
				sortable : true,  
				label : "Cidade",
				cell : CustomStringCell.extend({
					fieldName : 'estado.nome',
				}),
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
				hint : 'Editar Cidade',
				onClick : that.editModel,
			}, {
				id : 'delete_button',
				type : 'danger',
				icon : 'icon-trash',
				hint : 'Delete Cidade',
				onClick : that.deleteModel,
			});

			return buttons;
		},

		deleteModel : function(model) {
			var that = this;
			
			var modelTipo = new CidadeModel({
				id : model.id,
			});
			
			util.Bootbox.confirm("Tem certeza que deseja remover o registro [ " + model.get('id') + " ] ?", function(yes) {
				if (yes) {
					modelTipo.destroy({
						success : function() {
							that.cidades.remove(model);
							util.showSuccessMessage('Cidade removido com sucesso!');
						},
						error : function(_model, _resp) {
							util.showErrorMessage('Problema ao remover o registro',_resp);
						}
					});
				}
			});
		},

		editModel : function(model) {
			util.goPage("app/editCidade/" + model.get('id'));
		},

		_showSearchEstadoModal : function() {
			this.searchEstadoModal.showPage();
		},
			
		_selectEstado : function(estado) {
			this.searchEstadoModal.hidePage();	
			this.ui.inputEstadoId.val(estado.get('id'));
			this.ui.inputEstadoNome.val(estado.get('nome'));		
		},
		

	});

	return PageCidade;
});
