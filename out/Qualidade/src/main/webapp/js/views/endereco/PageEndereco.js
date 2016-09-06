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

	var TemplateFormEnderecos = require('text!views/endereco/tpl/FormEnderecoTemplate.html');
	var EnderecoModel = require('models/EnderecoModel');
	var EnderecoCollection = require('collections/EnderecoCollection');
	var EnderecoPageCollection = require('collections/EnderecoPageCollection');
	var PageEnderecoTemplate = require('text!views/endereco/tpl/PageEnderecoTemplate.html');
	
	//Filter import
	var SearchCepModal = require('views/modalComponents/CepModal');
	
	// End of "Import´s" definition

	var PageEndereco = Marionette.LayoutView.extend({
		template : _.template(PageEnderecoTemplate),

		regions : {
			gridRegion : '#grid',
			counterRegion : '#counter',
			paginatorRegion : '#paginator',
			searchCepModalRegion : '#cepModal',
		},
		
		events : {
			'click 	#reset' : 'resetEndereco',			
			'click #searchCepModal' : 'showSearchCepModal',
			'keypress' : 'treatKeypress',
			
			'click 	.search-button' : 'searchEndereco',
			'click .show-advanced-search-button' : 'toggleAdvancedForm',
		},
		
		
		ui : {
			inputComplemento : '#inputComplemento',
			inputNumero : '#inputNumero',
		
			inputCepId : '#inputCepId',
			inputCepCep : '#inputCepCep',
			form : '#formEnderecoFilter',
			advancedSearchForm : '.advanced-search-form',
		},
		
		toggleAdvancedForm : function() {
			this.ui.advancedSearchForm.slideToggle("slow");
		},

		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this.searchEndereco();
	    	}
		},

		initialize : function() {
			var that = this;

			this.enderecos = new EnderecoPageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this.getColumns(),
				emptyText : "Sem registros",
				collection : this.enderecos
			});

			this.counter = new Counter({
				collection : this.enderecos,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this.getColumns(),
				collection : this.enderecos,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.enderecos.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid endereco');
				},
				error : function(_col, _resp, _opts) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')) );
				}
			});
			this.searchCepModal = new SearchCepModal({
				onSelectModel : function(model) {
					that.selectCep(model);
				},
			});
			this.on('show', function() {
				that.gridRegion.show(that.grid);
				that.counterRegion.show(that.counter);
				that.paginatorRegion.show(that.paginator);
				this.searchCepModalRegion.show(this.searchCepModal);		
		
			});
		},
		 
		searchEndereco : function(){
			var that = this;

			this.enderecos.filterQueryParams = {
	    		complemento : util.escapeById('inputComplemento'),
	    		numero : util.escapeById('inputNumero'),
			    cep : util.escapeById('inputCepId'), 
			}
			this.enderecos.fetch({
				success : function(_coll, _resp, _opt) {
					console.info('Consulta para o grid endereco');
				},
				error : function(_coll, _resp, _opt) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				},
				complete : function() {
					
				},
			})		
		},
		resetEndereco : function(){
			this.ui.form.get(0).reset();
			this.enderecos.reset();
			util.clear('inputCepId');
		},
				
		getColumns : function() {
			var that = this;
			var columns = [
			{
				name : "complemento",
				editable : false,
				sortable : true,
				label 	 : "Complemento",
				cell 	 : "string",
			}, 
			{
				name : "numero",
				editable : false,
				sortable : true,
				label 	 : "Número",
				cell 	 : "string",
			}, 
			{
				name : "cep.cep",
				editable : false,
				sortable : true,  
				label : "Cep",
				cell : CustomStringCell.extend({
					fieldName : 'cep.cep',
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
				hint : 'Editar Endereco',
				onClick : that.editModel,
			}, {
				id : 'delete_button',
				type : 'danger',
				icon : 'icon-trash fa-trash',
				hint : 'Remover Endereco',
				onClick : that.deleteModel,
			});

			return buttons;
		},

		deleteModel : function(model) {
			var that = this;
			
			var modelTipo = new EnderecoModel({
				id : model.id,
			});
			
			util.Bootbox.confirm("Tem certeza que deseja remover o registro [ " + model.get('id') + " ] ?", function(yes) {
				if (yes) {
					modelTipo.destroy({
						success : function() {
							that.enderecos.remove(model);
							util.showSuccessMessage('Endereco removido com sucesso!');
						},
						error : function(_model, _resp) {
							util.showErrorMessage('Problema ao remover o registro',_resp);
						}
					});
				}
			});
		},

		editModel : function(model) {
			util.goPage("app/editEndereco/" + model.get('id'));
		},

		showSearchCepModal : function() {
			this.searchCepModal.showPage();
		},
			
		selectCep : function(cep) {
			this.searchCepModal.hidePage();	
			this.ui.inputCepId.val(cep.get('id'));
			this.ui.inputCepCep.val(cep.get('cep'));		
		},
		

	});

	return PageEndereco;
});
