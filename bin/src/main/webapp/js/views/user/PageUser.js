/* generated: 30/08/2015 20:23:12 */
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
			'click 	#query' : '_queryUser',			
			'click 	#reset' : '_resetUser',			
			'keypress' : 'treatKeypress',
		},
		
		
		ui : {
			inputName : '#inputName',
			inputUsername : '#inputUsername',
			inputPassword : '#inputPassword',
			inputEnable : '#inputEnable',
			inputImage : '#inputImage',
		
			form : '#formUserFilter',
		},
		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this._queryUser();
	    	}
		},

		initialize : function() {
			var that = this;

			this.users = new UserPageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.users
			});

			this.counter = new Counter({
				collection : this.users,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.users,
				className : 'dataTables_paginate paging_simple_numbers',
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
		 
		_queryUser : function(){
			var that = this;

			this.users.filterQueryParams = {
	    		name : util.escapeById('inputName'), 
	    		username : util.escapeById('inputUsername'), 
	    		password : util.escapeById('inputPassword'), 
	    		enable : util.escapeById('inputEnable'), 
	    		image : util.escapeById('inputImage'), 
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
		_resetUser : function(){
			this.ui.form.get(0).reset();
			this.users.reset();
		},
				
		_getColumns : function() {
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
				name : "image",
				editable : false,
				sortable : true,
				label 	 : "Imagem",
				cell 	 : "string",
			}, 
			{
				name : "acoes",
				label : "Ações(Editar, Deletar)",
				sortable : false,
				cell : ActionsCell.extend({
					editPath : this._getEditPath,
					deletePath : this._getDeletePath,
					editModel : this._editModel,
					deleteModel : this._deleteModel
				})
			} ];
			return columns;
		},

		_deleteModel : function(model) {
			util.Bootbox.confirm("Tem certeza que deseja remover o registro [ " + model.get('id') + "] ?", function(yes) {
				if (yes) {
					model.destroy({
						success : function() {
							util.showMessage('success', 'Registro removido com sucesso!');
						},
						error : function() {
							util.showMessage('error', 'Problemas ao remover registro!');
							console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
						}
					});
				}
			});
		},

		_getDeletePath : function(model) {
			// alert('Delete,,, ' + JSON.stringify(model));
		},

		_getEditPath : function(model) {
			return "app/editUser/" + model.get('id');
		},

		_editModel : function(model) {

		},
		

	});

	return PageUser;
});
