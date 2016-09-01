/* generated: 01/09/2016 17:25:06 */
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

	var TemplateFormRoles = require('text!views/role/tpl/FormRoleTemplate.html');
	var RoleModel = require('models/RoleModel');
	var RoleCollection = require('collections/RoleCollection');
	var RolePageCollection = require('collections/RolePageCollection');
	var PageRoleTemplate = require('text!views/role/tpl/PageRoleTemplate.html');
	
	//Filter import
	
	// End of "Import´s" definition

	var PageRole = Marionette.LayoutView.extend({
		template : _.template(PageRoleTemplate),

		regions : {
			gridRegion : '#grid',
			counterRegion : '#counter',
			paginatorRegion : '#paginator',
		},
		
		events : {
			'click 	#query' : '_queryRole',			
			'click 	#reset' : '_resetRole',			
			'keypress' : 'treatKeypress',
		},
		
		
		ui : {
			inputAuthority : '#inputAuthority',
			inputDescription : '#inputDescription',
		
			form : '#formRoleFilter',
		},
		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this._queryRole();
	    	}
		},

		initialize : function() {
			var that = this;

			this.roles = new RolePageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.roles
			});

			this.counter = new Counter({
				collection : this.roles,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.roles,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.roles.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid role');
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
		 
		_queryRole : function(){
			var that = this;

			this.roles.filterQueryParams = {
	    		authority : util.escapeById('inputAuthority'),
	    		description : util.escapeById('inputDescription'),
			}
			this.roles.fetch({
				success : function(_coll, _resp, _opt) {
					console.info('Consulta para o grid role');
				},
				error : function(_coll, _resp, _opt) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				},
				complete : function() {
					
				},
			})		
		},
		_resetRole : function(){
			this.ui.form.get(0).reset();
			this.roles.reset();
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
				name : "authority",
				editable : false,
				sortable : true,
				label 	 : "Autoridade",
				cell 	 : "string",
			}, 
			{
				name : "description",
				editable : false,
				sortable : true,
				label 	 : "Descrição",
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
				hint : 'Editar Papel',
				onClick : that.editModel,
			}, {
				id : 'delete_button',
				type : 'danger',
				icon : 'icon-trash',
				hint : 'Delete Papel',
				onClick : that.deleteModel,
			});

			return buttons;
		},

		deleteModel : function(model) {
			var that = this;
			
			var modelTipo = new RoleModel({
				id : model.id,
			});
			
			util.Bootbox.confirm("Tem certeza que deseja remover o registro [ " + model.get('id') + " ] ?", function(yes) {
				if (yes) {
					modelTipo.destroy({
						success : function() {
							that.roles.remove(model);
							util.showSuccessMessage('Papel removido com sucesso!');
						},
						error : function(_model, _resp) {
							util.showErrorMessage('Problema ao remover o registro',_resp);
						}
					});
				}
			});
		},

		editModel : function(model) {
			util.goPage("app/editRole/" + model.get('id'));
		},

		

	});

	return PageRole;
});
