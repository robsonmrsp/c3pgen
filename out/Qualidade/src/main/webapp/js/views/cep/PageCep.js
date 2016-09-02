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

	var TemplateFormCeps = require('text!views/cep/tpl/FormCepTemplate.html');
	var CepModel = require('models/CepModel');
	var CepCollection = require('collections/CepCollection');
	var CepPageCollection = require('collections/CepPageCollection');
	var PageCepTemplate = require('text!views/cep/tpl/PageCepTemplate.html');
	
	//Filter import
	var SearchBairroModal = require('views/modalComponents/BairroModal');
	var SearchCidadeModal = require('views/modalComponents/CidadeModal');
	var SearchEstadoModal = require('views/modalComponents/EstadoModal');
	
	// End of "Import´s" definition

	var PageCep = Marionette.LayoutView.extend({
		template : _.template(PageCepTemplate),

		regions : {
			gridRegion : '#grid',
			counterRegion : '#counter',
			paginatorRegion : '#paginator',
			searchBairroModalRegion : '#bairroModal',
			searchCidadeModalRegion : '#cidadeModal',
			searchEstadoModalRegion : '#estadoModal',
		},
		
		events : {
			'click 	#reset' : '_resetCep',			
			'click #searchBairroModal' : '_showSearchBairroModal',
			'click #searchCidadeModal' : '_showSearchCidadeModal',
			'click #searchEstadoModal' : '_showSearchEstadoModal',
			'keypress' : 'treatKeypress',
			
			'click 	.search-button' : 'searchCep',
			'click .show-advanced-search-button' : 'toggleAdvancedForm',
		},
		
		
		ui : {
			inputLogradouro : '#inputLogradouro',
			inputNumero : '#inputNumero',
		
			inputBairroId : '#inputBairroId',
			inputBairroNome : '#inputBairroNome',
			inputCidadeId : '#inputCidadeId',
			inputCidadeNome : '#inputCidadeNome',
			inputEstadoId : '#inputEstadoId',
			inputEstadoNome : '#inputEstadoNome',
			form : '#formCepFilter',
			advancedSearchForm : '.advanced-search-form',
		},
		
		toggleAdvancedForm : function() {
			this.ui.advancedSearchForm.slideToggle("slow");
		},

		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this.searchCep();
	    	}
		},

		initialize : function() {
			var that = this;

			this.ceps = new CepPageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.ceps
			});

			this.counter = new Counter({
				collection : this.ceps,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.ceps,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.ceps.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid cep');
				},
				error : function(_col, _resp, _opts) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')) );
				}
			});
			this.searchBairroModal = new SearchBairroModal({
				onSelectModel : function(model) {
					that._selectBairro(model);
				},
			});
			this.searchCidadeModal = new SearchCidadeModal({
				onSelectModel : function(model) {
					that._selectCidade(model);
				},
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
				this.searchBairroModalRegion.show(this.searchBairroModal);		
				this.searchCidadeModalRegion.show(this.searchCidadeModal);		
				this.searchEstadoModalRegion.show(this.searchEstadoModal);		
		
			});
		},
		 
		searchCep : function(){
			var that = this;

			this.ceps.filterQueryParams = {
	    		logradouro : util.escapeById('inputLogradouro'),
	    		numero : util.escapeById('inputNumero'),
			    bairro : util.escapeById('inputBairroId'), 
			    cidade : util.escapeById('inputCidadeId'), 
			    estado : util.escapeById('inputEstadoId'), 
			}
			this.ceps.fetch({
				success : function(_coll, _resp, _opt) {
					console.info('Consulta para o grid cep');
				},
				error : function(_coll, _resp, _opt) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				},
				complete : function() {
					
				},
			})		
		},
		_resetCep : function(){
			this.ui.form.get(0).reset();
			this.ceps.reset();
			util.clear('inputBairroId');
			util.clear('inputCidadeId');
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
				name : "logradouro",
				editable : false,
				sortable : true,
				label 	 : "Logadouro",
				cell 	 : "string",
			}, 
			{
				name : "numero",
				editable : false,
				sortable : true,
				label 	 : "Numero",
				cell 	 : "string",
			}, 
			{
				name : "bairro.nome",
				editable : false,
				sortable : true,  
				label : "Bairro",
				cell : CustomStringCell.extend({
					fieldName : 'bairro.nome',
				}),
			},	
			{
				name : "cidade.nome",
				editable : false,
				sortable : true,  
				label : "Cidade",
				cell : CustomStringCell.extend({
					fieldName : 'cidade.nome',
				}),
			},	
			{
				name : "estado.nome",
				editable : false,
				sortable : true,  
				label : "Estado",
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
				hint : 'Editar Cep',
				onClick : that.editModel,
			}, {
				id : 'delete_button',
				type : 'danger',
				icon : 'icon-trash',
				hint : 'Delete Cep',
				onClick : that.deleteModel,
			});

			return buttons;
		},

		deleteModel : function(model) {
			var that = this;
			
			var modelTipo = new CepModel({
				id : model.id,
			});
			
			util.Bootbox.confirm("Tem certeza que deseja remover o registro [ " + model.get('id') + " ] ?", function(yes) {
				if (yes) {
					modelTipo.destroy({
						success : function() {
							that.ceps.remove(model);
							util.showSuccessMessage('Cep removido com sucesso!');
						},
						error : function(_model, _resp) {
							util.showErrorMessage('Problema ao remover o registro',_resp);
						}
					});
				}
			});
		},

		editModel : function(model) {
			util.goPage("app/editCep/" + model.get('id'));
		},

		_showSearchBairroModal : function() {
			this.searchBairroModal.showPage();
		},
			
		_selectBairro : function(bairro) {
			this.searchBairroModal.hidePage();	
			this.ui.inputBairroId.val(bairro.get('id'));
			this.ui.inputBairroNome.val(bairro.get('nome'));		
		},
		_showSearchCidadeModal : function() {
			this.searchCidadeModal.showPage();
		},
			
		_selectCidade : function(cidade) {
			this.searchCidadeModal.hidePage();	
			this.ui.inputCidadeId.val(cidade.get('id'));
			this.ui.inputCidadeNome.val(cidade.get('nome'));		
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

	return PageCep;
});
