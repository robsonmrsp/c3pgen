/* generated: 24/09/2016 12:52:18 */
define(function(require) {
	// Start "Import´s Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Backgrid = require('adapters/backgrid-adapter');
	var Marionette = require('marionette');
	var CustomNumberCell = require('views/components/CustomNumberCell');

	var util = require('utilities/utils');
	var UserPageCollection = require('collections/UserPageCollection');
	var ModalMultiSelectUserTemplate = require('text!views/user/tpl/ModalMultiSelectUserTemplate.html');
	// End of "Import´s" definition

	var ModalUsers = Marionette.LayoutView.extend({
		template : _.template(ModalMultiSelectUserTemplate),

		regions : {
			gridRegion : '#grid-users-modal',
			paginatorRegion : '#paginator-users-modal',
		},
		events : {
			'click .btnOk' : 'close'
		},
		ui : {
			btnOk : ".btnOk",
		},

		initialize : function(opt) {
			var that = this;

			this.projetoUsers = this.collection;
			
			this.users = new UserPageCollection();
			this.users.on('fetched', this.endFetch, this);
			this.users.on('backgrid:selected', this.selectModel, this);

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this.getColumns(),
				emptyText : "Nenhum registro para escolha",
				collection : this.users,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this.getColumns(),
				collection : this.users,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.users.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid user');
				},
				error : function(_col, _resp, _opts) {
					console.error(_resp.responseText || _resp.getResponseHeader('exception'));
				}
			});


			this.on('show', function() {
				that.gridRegion.show(that.grid);
				that.paginatorRegion.show(that.paginator);
			});
		},

		selectModel : function(model, checked) {
			if (checked)
				this.projetoUsers.add(model)
			else
				this.projetoUsers.remove(model)
		},

		endFetch : function(_collection) {
			var that = this;
			this.users.each(function(model) {
				if (that.projetoUsers.findWhere({
					id : model.get('id')
				})) {
					model.trigger("backgrid:select", model, true);
				}
			});
		},
		clear : function(){
			this.grid.$el.find('input[type=checkbox]').prop('checked', false);
		},
		getColumns : function() {
			var columns = [{
				name : "",
				cell : "select-row",
				headerCell : "select-all"
			}, 
			 
			{
				name : "name",
				editable : false,
				sortable : false,
				label 	 : "Nome",
				cell 	 : "string",
			}, 
			{
				name : "username",
				editable : false,
				sortable : false,
				label 	 : "Username",
				cell 	 : "string",
			}, 
			{
				name : "password",
				editable : false,
				sortable : false,
				label 	 : "Password",
				cell 	 : "string",
			}, 
			{
				name : "enable",
				editable : false,
				sortable : false,
				label 	 : "Ativo",
				cell 	 : "string",
			}, 
			{
				name : "image",
				editable : false,
				sortable : false,
				label 	 : "Imagem",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return ModalUsers;
});
