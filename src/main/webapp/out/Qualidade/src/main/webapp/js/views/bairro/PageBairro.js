/* generated: 24/09/2016 11:56:36 */
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

	var TemplateFormBairros = require('text!views/bairro/tpl/FormBairroTemplate.html');
	var BairroModel = require('models/BairroModel');
	var BairroCollection = require('collections/BairroCollection');
	var BairroPageCollection = require('collections/BairroPageCollection');
	var PageBairroTemplate = require('text!views/bairro/tpl/PageBairroTemplate.html');
	
	//Filter import
	var SearchCidadeModal = require('views/modalComponents/CidadeModal');
	var SearchEstadoModal = require('views/modalComponents/EstadoModal');
	
	// End of "Import´s" definition

	var PageBairro = Marionette.LayoutView.extend({
		template : _.template(PageBairroTemplate),

		regions : {
			gridRegion : '#grid',
			counterRegion : '#counter',
			paginatorRegion : '#paginator',
			searchCidadeModalRegion : '#cidadeModal',
			searchEstadoModalRegion : '#estadoModal',
		},
		
		events : {
			'click 	#reset' : 'resetBairro',			
			'click #searchCidadeModal' : 'showSearchCidadeModal',
			'click #searchEstadoModal' : 'showSearchEstadoModal',
			'keypress' : 'treatKeypress',
			
			'click 	.search-button' : 'searchBairro',
			'click .show-advanced-search-button' : 'toggleAdvancedForm',
		},
		
		
		ui : {
			inputNome : '#inputNome',
		
			inputCidadeId : '#inputCidadeId',
			inputCidadeNome : '#inputCidadeNome',
			inputEstadoId : '#inputEstadoId',
			inputEstadoNome : '#inputEstadoNome',
			form : '#formBairroFilter',
			advancedSearchForm : '.advanced-search-form',
		},
		
		toggleAdvancedForm : function() {
			this.ui.advancedSearchForm.slideToggle("slow");
		},

		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this.searchBairro();
	    	}
		},

		initialize : function() {
			var that = this;

			this.bairros = new BairroPageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this.getColumns(),
				emptyText : "Sem registros",
				collection : this.bairros
			});

			this.counter = new Counter({
				collection : this.bairros,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this.getColumns(),
				collection : this.bairros,
				className : ' paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.bairros.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid bairro');
				},
				error : function(_col, _resp, _opts) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')) );
				}
			});
			this.searchCidadeModal = new SearchCidadeModal({
				onSelectModel : function(model) {
					that.selectCidade(model);
				},
			});
			this.searchEstadoModal = new SearchEstadoModal({
				onSelectModel : function(model) {
					that.selectEstado(model);
				},
			});
			this.on('show', function() {
				that.gridRegion.show(that.grid);
				that.counterRegion.show(that.counter);
				that.paginatorRegion.show(that.paginator);
				this.searchCidadeModalRegion.show(this.searchCidadeModal);		
				this.searchEstadoModalRegion.show(this.searchEstadoModal);		
		
			});
		},
		 
		searchBairro : function(){
			var that = this;

			this.bairros.filterQueryParams = {
	    		nome : util.escapeById('inputNome'),
			    cidade : util.escapeById('inputCidadeId'), 
			    estado : util.escapeById('inputEstadoId'), 
			}
			this.bairros.fetch({
				success : function(_coll, _resp, _opt) {
					console.info('Consulta para o grid bairro');
				},
				error : function(_coll, _resp, _opt) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				},
				complete : function() {
					
				},
			})		
		},
		resetBairro : function(){
			this.ui.form.get(0).reset();
			this.bairros.reset();
			util.clear('inputCidadeId');
			util.clear('inputEstadoId');
		},
				
		getColumns : function() {
			var that = this;
			var columns = [
			{
				name : "nome",
				editable : false,
				sortable : true,
				label 	 : "Nome",
				cell 	 : "string",
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
				hint : 'Editar Bairro',
				onClick : that.editModel,
			}, {
				id : 'delete_button',
				type : 'danger',
				icon : 'icon-trash fa-trash',
				hint : 'Remover Bairro',
				onClick : that.deleteModel,
			});

			return buttons;
		},

		deleteModel : function(model) {
			var that = this;
			
			var modelTipo = new BairroModel({
				id : model.id,
			});
			
			util.Bootbox.confirm("Tem certeza que deseja remover o registro [ " + model.get('id') + " ] ?", function(yes) {
				if (yes) {
					modelTipo.destroy({
						success : function() {
							that.bairros.remove(model);
							util.showSuccessMessage('Bairro removido com sucesso!');
						},
						error : function(_model, _resp) {
							util.showErrorMessage('Problema ao remover o registro',_resp);
						}
					});
				}
			});
		},

		editModel : function(model) {
			util.goPage("app/editBairro/" + model.get('id'));
		},

		showSearchCidadeModal : function() {
			this.searchCidadeModal.showPage();
		},
			
		selectCidade : function(cidade) {
			this.searchCidadeModal.hidePage();	
			this.ui.inputCidadeId.val(cidade.get('id'));
			this.ui.inputCidadeNome.val(cidade.get('nome'));		
		},
		showSearchEstadoModal : function() {
			this.searchEstadoModal.showPage();
		},
			
		selectEstado : function(estado) {
			this.searchEstadoModal.hidePage();	
			this.ui.inputEstadoId.val(estado.get('id'));
			this.ui.inputEstadoNome.val(estado.get('nome'));		
		},
		

	});

	return PageBairro;
});
