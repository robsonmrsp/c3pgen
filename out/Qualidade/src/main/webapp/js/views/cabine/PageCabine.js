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
			'click 	#query' : '_queryCabine',			
			'click 	#reset' : '_resetCabine',			
			'click #searchPackingModal' : '_showSearchPackingModal',
			'keypress' : 'treatKeypress',
		},
		
		
		ui : {
			inputNome : '#inputNome',
		
			inputPackingId : '#inputPackingId',
			inputPackingNome : '#inputPackingNome',
			form : '#formCabineFilter',
		},
		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this._queryCabine();
	    	}
		},

		initialize : function() {
			var that = this;

			this.cabines = new CabinePageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.cabines
			});

			this.counter = new Counter({
				collection : this.cabines,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.cabines,
				className : 'dataTables_paginate paging_simple_numbers',
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
					that._selectPacking(model);
				},
			});
			this.on('show', function() {
				that.gridRegion.show(that.grid);
				that.counterRegion.show(that.counter);
				that.paginatorRegion.show(that.paginator);
				this.searchPackingModalRegion.show(this.searchPackingModal);		
		
			});
		},
		 
		_queryCabine : function(){
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
		_resetCabine : function(){
			this.ui.form.get(0).reset();
			this.cabines.reset();
			util.clear('inputPackingId');
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
				hint : 'Editar Cabine',
				onClick : that.editModel,
			}, {
				id : 'delete_button',
				type : 'danger',
				icon : 'icon-trash',
				hint : 'Delete Cabine',
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

		_showSearchPackingModal : function() {
			this.searchPackingModal.showPage();
		},
			
		_selectPacking : function(packing) {
			this.searchPackingModal.hidePage();	
			this.ui.inputPackingId.val(packing.get('id'));
			this.ui.inputPackingNome.val(packing.get('nome'));		
		},
		

	});

	return PageCabine;
});
