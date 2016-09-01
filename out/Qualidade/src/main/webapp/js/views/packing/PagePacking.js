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

	var TemplateFormPackings = require('text!views/packing/tpl/FormPackingTemplate.html');
	var PackingModel = require('models/PackingModel');
	var PackingCollection = require('collections/PackingCollection');
	var PackingPageCollection = require('collections/PackingPageCollection');
	var PagePackingTemplate = require('text!views/packing/tpl/PagePackingTemplate.html');
	
	//Filter import
	var SearchClientModal = require('views/modalComponents/ClientModal');
	
	// End of "Import´s" definition

	var PagePacking = Marionette.LayoutView.extend({
		template : _.template(PagePackingTemplate),

		regions : {
			gridRegion : '#grid',
			counterRegion : '#counter',
			paginatorRegion : '#paginator',
			searchClientModalRegion : '#clientModal',
		},
		
		events : {
			'click 	#query' : '_queryPacking',			
			'click 	#reset' : '_resetPacking',			
			'click #searchClientModal' : '_showSearchClientModal',
			'keypress' : 'treatKeypress',
		},
		
		
		ui : {
		
			inputClientId : '#inputClientId',
			inputClientNome : '#inputClientNome',
			form : '#formPackingFilter',
		},
		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this._queryPacking();
	    	}
		},

		initialize : function() {
			var that = this;

			this.packings = new PackingPageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.packings
			});

			this.counter = new Counter({
				collection : this.packings,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.packings,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.packings.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid packing');
				},
				error : function(_col, _resp, _opts) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')) );
				}
			});
			this.searchClientModal = new SearchClientModal({
				onSelectModel : function(model) {
					that._selectClient(model);
				},
			});
			this.on('show', function() {
				that.gridRegion.show(that.grid);
				that.counterRegion.show(that.counter);
				that.paginatorRegion.show(that.paginator);
				this.searchClientModalRegion.show(this.searchClientModal);		
		
			});
		},
		 
		_queryPacking : function(){
			var that = this;

			this.packings.filterQueryParams = {
			    client : util.escapeById('inputClientId'), 
			}
			this.packings.fetch({
				success : function(_coll, _resp, _opt) {
					console.info('Consulta para o grid packing');
				},
				error : function(_coll, _resp, _opt) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				},
				complete : function() {
					
				},
			})		
		},
		_resetPacking : function(){
			this.ui.form.get(0).reset();
			this.packings.reset();
			util.clear('inputClientId');
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
				name : "client.nome",
				editable : false,
				sortable : true,  
				label : "Client",
				cell : CustomStringCell.extend({
					fieldName : 'client.nome',
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
				hint : 'Editar Packing',
				onClick : that.editModel,
			}, {
				id : 'delete_button',
				type : 'danger',
				icon : 'icon-trash',
				hint : 'Delete Packing',
				onClick : that.deleteModel,
			});

			return buttons;
		},

		deleteModel : function(model) {
			var that = this;
			
			var modelTipo = new PackingModel({
				id : model.id,
			});
			
			util.Bootbox.confirm("Tem certeza que deseja remover o registro [ " + model.get('id') + " ] ?", function(yes) {
				if (yes) {
					modelTipo.destroy({
						success : function() {
							that.packings.remove(model);
							util.showSuccessMessage('Packing removido com sucesso!');
						},
						error : function(_model, _resp) {
							util.showErrorMessage('Problema ao remover o registro',_resp);
						}
					});
				}
			});
		},

		editModel : function(model) {
			util.goPage("app/editPacking/" + model.get('id'));
		},

		_showSearchClientModal : function() {
			this.searchClientModal.showPage();
		},
			
		_selectClient : function(client) {
			this.searchClientModal.hidePage();	
			this.ui.inputClientId.val(client.get('id'));
			this.ui.inputClientNome.val(client.get('nome'));		
		},
		

	});

	return PagePacking;
});
