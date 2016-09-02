/* generated: 02/09/2016 16:23:49 */
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

	var ModalMultiSelectPermission = require('views/permission/ModalMultiSelectPermission');
	var MultiSelectPermissionTemplate = require('text!views/permission/tpl/MultiSelectPermissionTemplate.html');

	var MultiSelectPermission = Marionette.LayoutView.extend({
		template : _.template(MultiSelectPermissionTemplate),

		regions : {
			modalMultiSelectPermissionRegion : '#modalMultiSelectPermissions',
			gridPermissionsModalRegion : '#gridMultiselectPermissions',
		},

		initialize : function() {
			var that = this;

			this.permissions = this.collection;

			this.gridPermissions = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.permissions,
			});

			this.modalMultiSelectPermission = new ModalMultiSelectPermission({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectPermissionRegion.show(that.modalMultiSelectPermission);
				that.gridPermissionsModalRegion.show(that.gridPermissions);
			});
		},
		clear : function(){
			this.modalMultiSelectPermission.clear();
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
			];
			return columns;
		},
	});

	return MultiSelectPermission
});
