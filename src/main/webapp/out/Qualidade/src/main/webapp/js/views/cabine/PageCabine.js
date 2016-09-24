/* generated: 24/09/2016 11:56:32 */
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

	var TemplateFormCabines = require('text!views/cabine/tpl/FormCabineTemplate.html');
	var CabineModel = require('models/CabineModel');
	var CabineCollection = require('collections/CabineCollection');
	var CabinePageCollection = require('collections/CabinePageCollection');
	var PageCabineTemplate = require('text!views/cabine/tpl/PageCabineTemplate.html');
	
	//Filter import
	var SearchPackingModal = require('views/modalComponents/PackingModal');
	
	// End of "Import´s" definition

	var PageCabine = Marionette.LayoutView.extend({
		template : _.template(PageCabineTemplate),

		regions : {
			gridRegion : '#grid',
			counterRegion : '#counter',
			paginatorRegion : '#paginator',
			searchPackingModalRegion : '#packingModal',
		},
		
		events : {
			'click 	#reset' : 'resetCabine',			
			'click #searchPackingModal' : 'showSearchPackingModal',
			'keypress' : 'treatKeypress',
			
			'click 	.search-button' : 'searchCabine',
			'click .show-advanced-search-button' : 'toggleAdvancedForm',
		},
		
		
		ui : {
			inputNome : '#inputNome',
		
			inputPackingId : '#inputPackingId',
			inputPackingNome : '#inputPackingNome',
			form : '#formCabineFilter',
			advancedSearchForm : '.advanced-search-form',
		},
		
		toggleAdvancedForm : function() {
			this.ui.advancedSearchForm.slideToggle("slow");
		},

		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this.searchCabine();
	    	}
		},

		initialize : function() {
			var that = this;

			this.cabines = new CabinePageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this.getColumns(),
				emptyText : "Sem registros",
				collection : this.cabines
			});

			this.counter = new Counter({
				collection : this.cabines,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this.getColumns(),
				collection : this.cabines,
				className : ' paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.cabines.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid cabine');
				},
				error : function(_col, _resp, _opts) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')) );
				}
			});
			this.searchPackingModal = new SearchPackingModal({
				onSelectModel : function(model) {
					that.selectPacking(model);
				},
			});
			this.on('show', function() {
				that.gridRegion.show(that.grid);
				that.counterRegion.show(that.counter);
				that.paginatorRegion.show(that.paginator);
				this.searchPackingModalRegion.show(this.searchPackingModal);		
		
			});
		},
		 
		searchCabine : function(){
			var that = this;

			this.cabines.filterQueryParams = {
	    		nome : util.escapeById('inputNome'),
			    packing : util.escapeById('inputPackingId'), 
			}
			this.cabines.fetch({
				success : function(_coll, _resp, _opt) {
					console.info('Consulta para o grid cabine');
				},
				error : function(_coll, _resp, _opt) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				},
				complete : function() {
					
				},
			})		
		},
		resetCabine : function(){
			this.ui.form.get(0).reset();
			this.cabines.reset();
			util.clear('inputPackingId');
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
				name : "packing.nome",
				editable : false,
				sortable : true,  
				label : "Packing",
				cell : CustomStringCell.extend({
					fieldName : 'packing.nome',
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
				hint : 'Editar Cabine',
				onClick : that.editModel,
			}, {
				id : 'delete_button',
				type : 'danger',
				icon : 'icon-trash fa-trash',
				hint : 'Remover Cabine',
				onClick : that.deleteModel,
			});

			return buttons;
		},

		deleteModel : function(model) {
			var that = this;
			
			var modelTipo = new CabineModel({
				id : model.id,
			});
			
			util.Bootbox.confirm("Tem certeza que deseja remover o registro [ " + model.get('id') + " ] ?", function(yes) {
				if (yes) {
					modelTipo.destroy({
						success : function() {
							that.cabines.remove(model);
							util.showSuccessMessage('Cabine removido com sucesso!');
						},
						error : function(_model, _resp) {
							util.showErrorMessage('Problema ao remover o registro',_resp);
						}
					});
				}
			});
		},

		editModel : function(model) {
			util.goPage("app/editCabine/" + model.get('id'));
		},

		showSearchPackingModal : function() {
			this.searchPackingModal.showPage();
		},
			
		selectPacking : function(packing) {
			this.searchPackingModal.hidePage();	
			this.ui.inputPackingId.val(packing.get('id'));
			this.ui.inputPackingNome.val(packing.get('nome'));		
		},
		

	});

	return PageCabine;
});
