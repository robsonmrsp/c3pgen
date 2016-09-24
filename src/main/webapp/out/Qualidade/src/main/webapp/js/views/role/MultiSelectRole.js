/* generated: 24/09/2016 11:56:38 */
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

	var ModalMultiSelectRole = require('views/role/ModalMultiSelectRole');
	var MultiSelectRoleTemplate = require('text!views/role/tpl/MultiSelectRoleTemplate.html');

	var MultiSelectRole = Marionette.LayoutView.extend({
		template : _.template(MultiSelectRoleTemplate),

		regions : {
			modalMultiSelectRoleRegion : '#modalMultiSelectRoles',
			gridRolesModalRegion : '#gridMultiselectRoles',
		},

		initialize : function() {
			var that = this;

			this.roles = this.collection;

			this.gridRoles = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.roles,
			});

			this.modalMultiSelectRole = new ModalMultiSelectRole({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectRoleRegion.show(that.modalMultiSelectRole);
				that.gridRolesModalRegion.show(that.gridRoles);
			});
		},
		clear : function(){
			this.modalMultiSelectRole.clear();
		},
		
		_getColumns : function() {
			var columns = [

			{
				name : "authority",
				editable : false,
				sortable : false,
				label 	 : "Autoridade",
				cell 	 : "string",
			}, 
			{
				name : "description",
				editable : false,
				sortable : false,
				label 	 : "Descrição",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return MultiSelectRole
});
