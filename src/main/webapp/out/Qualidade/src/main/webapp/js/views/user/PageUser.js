/* generated: 24/09/2016 11:56:38 */
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

	var TemplateFormUsers = require('text!views/user/tpl/FormUserTemplate.html');
	var UserModel = require('models/UserModel');
	var UserCollection = require('collections/UserCollection');
	var UserPageCollection = require('collections/UserPageCollection');
	var PageUserTemplate = require('text!views/user/tpl/PageUserTemplate.html');
	
	//Filter import
	
	// End of "Import´s" definition

	var PageUser = Marionette.LayoutView.extend({
		template : _.template(PageUserTemplate),

		regions : {
			gridRegion : '#grid',
			counterRegion : '#counter',
			paginatorRegion : '#paginator',
		},
		
		events : {
			'click 	#reset' : 'resetUser',			
			'keypress' : 'treatKeypress',
			
			'click 	.search-button' : 'searchUser',
			'click .show-advanced-search-button' : 'toggleAdvancedForm',
		},
		
		
		ui : {
			inputName : '#inputName',
			inputUsername : '#inputUsername',
			inputPassword : '#inputPassword',
			inputEnable : '#inputEnable',
		
			form : '#formUserFilter',
			advancedSearchForm : '.advanced-search-form',
		},
		
		toggleAdvancedForm : function() {
			this.ui.advancedSearchForm.slideToggle("slow");
		},

		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this.searchUser();
	    	}
		},

		initialize : function() {
			var that = this;

			this.users = new UserPageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this.getColumns(),
				emptyText : "Sem registros",
				collection : this.users
			});

			this.counter = new Counter({
				collection : this.users,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this.getColumns(),
				collection : this.users,
				className : ' paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.users.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid user');
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
		 
		searchUser : function(){
			var that = this;

			this.users.filterQueryParams = {
	    		name : util.escapeById('inputName'),
	    		username : util.escapeById('inputUsername'),
	    		password : util.escapeById('inputPassword'),
	    		enable : util.escapeById('inputEnable'),
			}
			this.users.fetch({
				success : function(_coll, _resp, _opt) {
					console.info('Consulta para o grid user');
				},
				error : function(_coll, _resp, _opt) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				},
				complete : function() {
					
				},
			})		
		},
		resetUser : function(){
			this.ui.form.get(0).reset();
			this.users.reset();
		},
				
		getColumns : function() {
			var that = this;
			var columns = [
			{
				name : "name",
				editable : false,
				sortable : true,
				label 	 : "Nome",
				cell 	 : "string",
			}, 
			{
				name : "username",
				editable : false,
				sortable : true,
				label 	 : "Username",
				cell 	 : "string",
			}, 
			{
				name : "password",
				editable : false,
				sortable : true,
				label 	 : "Password",
				cell 	 : "string",
			}, 
			{
				name : "enable",
				editable : false,
				sortable : true,
				label 	 : "Ativo",
				cell 	 : "string",
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
				hint : 'Editar Usuário',
				onClick : that.editModel,
			}, {
				id : 'delete_button',
				type : 'danger',
				icon : 'icon-trash fa-trash',
				hint : 'Remover Usuário',
				onClick : that.deleteModel,
			});

			return buttons;
		},

		deleteModel : function(model) {
			var that = this;
			
			var modelTipo = new UserModel({
				id : model.id,
			});
			
			util.Bootbox.confirm("Tem certeza que deseja remover o registro [ " + model.get('id') + " ] ?", function(yes) {
				if (yes) {
					modelTipo.destroy({
						success : function() {
							that.users.remove(model);
							util.showSuccessMessage('Usuário removido com sucesso!');
						},
						error : function(_model, _resp) {
							util.showErrorMessage('Problema ao remover o registro',_resp);
						}
					});
				}
			});
		},

		editModel : function(model) {
			util.goPage("app/editUser/" + model.get('id'));
		},

		

	});

	return PageUser;
});
