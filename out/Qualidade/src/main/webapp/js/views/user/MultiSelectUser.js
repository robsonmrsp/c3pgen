/* generated: 03/09/2016 22:18:34 */
define(function(require) {
	// Start "Import´s" Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Backgrid = require('adapters/backgrid-adapter');
	var Marionette = require('marionette');
	var util = require('utilities/utils');
	var BaseModel = require('models/BaseModel');
	var CustomNumberCell = require('views/components/CustomNumberCell');

	var ModalMultiSelectUser = require('views/user/ModalMultiSelectUser');
	var MultiSelectUserTemplate = require('text!views/user/tpl/MultiSelectUserTemplate.html');

	var MultiSelectUser = Marionette.LayoutView.extend({
		template : _.template(MultiSelectUserTemplate),

		regions : {
			modalMultiSelectUserRegion : '#modalMultiSelectUsers',
			gridUsersModalRegion : '#gridMultiselectUsers',
		},

		initialize : function() {
			var that = this;

			this.users = this.collection;

			this.gridUsers = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.users,
			});

			this.modalMultiSelectUser = new ModalMultiSelectUser({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectUserRegion.show(that.modalMultiSelectUser);
				that.gridUsersModalRegion.show(that.gridUsers);
			});
		},
		clear : function(){
			this.modalMultiSelectUser.clear();
		},
		
		_getColumns : function() {
			var columns = [

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

	return MultiSelectUser
});
