/* generated: 30/08/2015 20:23:12 */
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

	var ModalMultiSelectTheEntity = require('views/theEntity/ModalMultiSelectTheEntity');
	var MultiSelectTheEntityTemplate = require('text!views/theEntity/tpl/MultiSelectTheEntityTemplate.html');

	var MultiSelectTheEntity = Marionette.LayoutView.extend({
		template : _.template(MultiSelectTheEntityTemplate),

		regions : {
			modalMultiSelectTheEntityRegion : '#modalMultiSelectTheEntitys',
			gridTheEntitysModalRegion : '#gridMultiselectTheEntitys',
		},

		initialize : function() {
			var that = this;

			this.theEntitys = this.collection;

			this.gridTheEntitys = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.theEntitys,
			});

			this.modalMultiSelectTheEntity = new ModalMultiSelectTheEntity({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectTheEntityRegion.show(that.modalMultiSelectTheEntity);
				that.gridTheEntitysModalRegion.show(that.gridTheEntitys);
			});
		},
		clear : function(){
			this.modalMultiSelectTheEntity.clear();
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

	return MultiSelectTheEntity
});
