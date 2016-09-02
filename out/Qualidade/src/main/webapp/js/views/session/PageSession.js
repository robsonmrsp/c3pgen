/* generated: 02/09/2016 16:23:49 */
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

	var TemplateFormSessions = require('text!views/session/tpl/FormSessionTemplate.html');
	var SessionModel = require('models/SessionModel');
	var SessionCollection = require('collections/SessionCollection');
	var SessionPageCollection = require('collections/SessionPageCollection');
	var PageSessionTemplate = require('text!views/session/tpl/PageSessionTemplate.html');
	
	//Filter import
	var UserCollection = require('collections/UserCollection');			
	
	// End of "Import´s" definition

	var PageSession = Marionette.LayoutView.extend({
		template : _.template(PageSessionTemplate),

		regions : {
			gridRegion : '#grid',
			counterRegion : '#counter',
			paginatorRegion : '#paginator',
		},
		
		events : {
			'click 	#reset' : '_resetSession',			
			'keypress' : 'treatKeypress',
			
			'click 	.search-button' : 'searchSession',
			'click .show-advanced-search-button' : 'toggleAdvancedForm',
		},
		
		
		ui : {
			inputName : '#inputName',
			inputCreationDate : '#inputCreationDate',
			groupInputCreationDate : '#groupInputCreationDate',
		
			inputUser : '#inputUser', 
			form : '#formSessionFilter',
			advancedSearchForm : '.advanced-search-form',
		},
		
		toggleAdvancedForm : function() {
			this.ui.advancedSearchForm.slideToggle("slow");
		},

		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this.searchSession();
	    	}
		},

		initialize : function() {
			var that = this;

			this.sessions = new SessionPageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.sessions
			});

			this.counter = new Counter({
				collection : this.sessions,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.sessions,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.sessions.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid session');
				},
				error : function(_col, _resp, _opts) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')) );
				}
			});
			this.on('show', function() {
				that.gridRegion.show(that.grid);
				that.counterRegion.show(that.counter);
				that.paginatorRegion.show(that.paginator);
				this.ui.groupInputCreationDate.datetimepicker({
					language : 'pt_BR',
				});
				this.ui.inputCreationDate.datetimepicker({
					language : 'pt_BR',
				});
				this.ui.inputCreationDate.mask('99/99/9999');
		
				var comboUser = new Combobox({
					el : this.ui.inputUser,
					comboId : 'id',
					comboVal : 'name',
					collectionEntity : UserCollection,
				});
			});
		},
		 
		searchSession : function(){
			var that = this;

			this.sessions.filterQueryParams = {
	    		name : util.escapeById('inputName'),
	    		creationDate : util.escapeById('inputCreationDate'),
			    user : util.escapeById('inputUser'), 
			}
			this.sessions.fetch({
				success : function(_coll, _resp, _opt) {
					console.info('Consulta para o grid session');
				},
				error : function(_coll, _resp, _opt) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				},
				complete : function() {
					
				},
			})		
		},
		_resetSession : function(){
			this.ui.form.get(0).reset();
			this.sessions.reset();
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
				name : "name",
				editable : false,
				sortable : true,
				label 	 : "Nome",
				cell 	 : "string",
			}, 
			{
				name : "creationDate",
				editable : false,
				sortable : true,
				label 	 : "Data da criação",
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
				hint : 'Editar Sessão',
				onClick : that.editModel,
			}, {
				id : 'delete_button',
				type : 'danger',
				icon : 'icon-trash',
				hint : 'Delete Sessão',
				onClick : that.deleteModel,
			});

			return buttons;
		},

		deleteModel : function(model) {
			var that = this;
			
			var modelTipo = new SessionModel({
				id : model.id,
			});
			
			util.Bootbox.confirm("Tem certeza que deseja remover o registro [ " + model.get('id') + " ] ?", function(yes) {
				if (yes) {
					modelTipo.destroy({
						success : function() {
							that.sessions.remove(model);
							util.showSuccessMessage('Sessão removido com sucesso!');
						},
						error : function(_model, _resp) {
							util.showErrorMessage('Problema ao remover o registro',_resp);
						}
					});
				}
			});
		},

		editModel : function(model) {
			util.goPage("app/editSession/" + model.get('id'));
		},

		

	});

	return PageSession;
});
