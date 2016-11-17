/* generated: 30/08/2015 14:17:03 */
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

	var ModalMultiSelectEntity = require('views/entity/ModalMultiSelectEntity');
	var MultiSelectEntityTemplate = require('text!views/entity/tpl/MultiSelectEntityTemplate.html');

	var MultiSelectEntity = Marionette.LayoutView.extend({
		template : _.template(MultiSelectEntityTemplate),

		regions : {
			modalMultiSelectEntityRegion : '#modalMultiSelectEntitys',
			gridEntitysModalRegion : '#gridMultiselectEntitys',
		},

		initialize : function() {
			var that = this;

			this.entitys = this.collection;

			this.gridEntitys = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.entitys,
			});

			this.modalMultiSelectEntity = new ModalMultiSelectEntity({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectEntityRegion.show(that.modalMultiSelectEntity);
				that.gridEntitysModalRegion.show(that.gridEntitys);
			});
		},
		clear : function(){
			this.modalMultiSelectEntity.clear();
		},
		
		_getColumns : function() {
			var columns = [

			{
				name : "name",
				editable : false,
				sortable : false,
				label 	 : "Name",
				cell 	 : "string",
			}, 
			{
				name : "displayName",
				editable : false,
				sortable : false,
				label 	 : "DisplayName",
				cell 	 : "string",
			}, 
			{
				name : "tableName",
				editable : false,
				sortable : false,
				label 	 : "TableName",
				cell 	 : "string",
			}, 
			{
				name : "hasOwner",
				editable : false,
				sortable : false,
				label 	 : "HasOwner",
				cell 	 : "string",
			}, 
			{
				name : "hasMobile",
				editable : false,
				sortable : false,
				label 	 : "HasMobile",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return MultiSelectEntity
});
