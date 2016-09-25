/* generated: 24/09/2016 12:52:11 */
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

	var TemplateFormAnexos = require('text!views/anexo/tpl/FormAnexoTemplate.html');
	var AnexoModel = require('models/AnexoModel');
	var AnexoCollection = require('collections/AnexoCollection');
	var AnexoPageCollection = require('collections/AnexoPageCollection');
	var PageAnexoTemplate = require('text!views/anexo/tpl/PageAnexoTemplate.html');
	
	//Filter import
	var SearchApontamentoQualidadePackingModal = require('views/modalComponents/ApontamentoQualidadePackingModal');
	
	// End of "Import´s" definition

	var PageAnexo = Marionette.LayoutView.extend({
		template : _.template(PageAnexoTemplate),

		regions : {
			gridRegion : '#grid',
			counterRegion : '#counter',
			paginatorRegion : '#paginator',
			searchApontamentoQualidadePackingModalRegion : '#apontamentoQualidadePackingModal',
		},
		
		events : {
			'click 	#reset' : 'resetAnexo',			
			'click #searchApontamentoQualidadePackingModal' : 'showSearchApontamentoQualidadePackingModal',
			'keypress' : 'treatKeypress',
			
			'click 	.search-button' : 'searchAnexo',
			'click .show-advanced-search-button' : 'toggleAdvancedForm',
		},
		
		
		ui : {
			inputNome : '#inputNome',
			inputConteudo : '#inputConteudo',
		
			inputApontamentoQualidadePackingId : '#inputApontamentoQualidadePackingId',
			inputApontamentoQualidadePackingNome : '#inputApontamentoQualidadePackingNome',
			form : '#formAnexoFilter',
			advancedSearchForm : '.advanced-search-form',
		},
		
		toggleAdvancedForm : function() {
			this.ui.advancedSearchForm.slideToggle("slow");
		},

		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this.searchAnexo();
	    	}
		},

		initialize : function() {
			var that = this;

			this.anexos = new AnexoPageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this.getColumns(),
				emptyText : "Sem registros",
				collection : this.anexos
			});

			this.counter = new Counter({
				collection : this.anexos,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this.getColumns(),
				collection : this.anexos,
				className : ' paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.anexos.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid anexo');
				},
				error : function(_col, _resp, _opts) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')) );
				}
			});
			this.searchApontamentoQualidadePackingModal = new SearchApontamentoQualidadePackingModal({
				onSelectModel : function(model) {
					that.selectApontamentoQualidadePacking(model);
				},
			});
			this.on('show', function() {
				that.gridRegion.show(that.grid);
				that.counterRegion.show(that.counter);
				that.paginatorRegion.show(that.paginator);
				this.searchApontamentoQualidadePackingModalRegion.show(this.searchApontamentoQualidadePackingModal);		
		
			});
		},
		 
		searchAnexo : function(){
			var that = this;

			this.anexos.filterQueryParams = {
	    		nome : util.escapeById('inputNome'),
	    		conteudo : util.escapeById('inputConteudo'),
			    apontamentoQualidadePacking : util.escapeById('inputApontamentoQualidadePackingId'), 
			}
			this.anexos.fetch({
				success : function(_coll, _resp, _opt) {
					console.info('Consulta para o grid anexo');
				},
				error : function(_coll, _resp, _opt) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				},
				complete : function() {
					
				},
			})		
		},
		resetAnexo : function(){
			this.ui.form.get(0).reset();
			this.anexos.reset();
			util.clear('inputApontamentoQualidadePackingId');
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
				name : "conteudo",
				editable : false,
				sortable : true,
				label 	 : "Conteudo",
				cell 	 : "string",
			}, 
			{
				name : "apontamentoQualidadePacking.nome",
				editable : false,
				sortable : true,  
				label : "Apontamento qualidade packing",
				cell : CustomStringCell.extend({
					fieldName : 'apontamentoQualidadePacking.nome',
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
				hint : 'Editar Anexo',
				onClick : that.editModel,
			}, {
				id : 'delete_button',
				type : 'danger',
				icon : 'icon-trash fa-trash',
				hint : 'Remover Anexo',
				onClick : that.deleteModel,
			});

			return buttons;
		},

		deleteModel : function(model) {
			var that = this;
			
			var modelTipo = new AnexoModel({
				id : model.id,
			});
			
			util.Bootbox.confirm("Tem certeza que deseja remover o registro [ " + model.get('id') + " ] ?", function(yes) {
				if (yes) {
					modelTipo.destroy({
						success : function() {
							that.anexos.remove(model);
							util.showSuccessMessage('Anexo removido com sucesso!');
						},
						error : function(_model, _resp) {
							util.showErrorMessage('Problema ao remover o registro',_resp);
						}
					});
				}
			});
		},

		editModel : function(model) {
			util.goPage("app/editAnexo/" + model.get('id'));
		},

		showSearchApontamentoQualidadePackingModal : function() {
			this.searchApontamentoQualidadePackingModal.showPage();
		},
			
		selectApontamentoQualidadePacking : function(apontamentoQualidadePacking) {
			this.searchApontamentoQualidadePackingModal.hidePage();	
			this.ui.inputApontamentoQualidadePackingId.val(apontamentoQualidadePacking.get('id'));
			this.ui.inputApontamentoQualidadePackingNome.val(apontamentoQualidadePacking.get('nome'));		
		},
		

	});

	return PageAnexo;
});
