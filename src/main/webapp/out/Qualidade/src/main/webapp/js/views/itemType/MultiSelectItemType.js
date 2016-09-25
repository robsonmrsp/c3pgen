/* generated: 24/09/2016 12:52:17 */
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

	var ModalMultiSelectItemType = require('views/itemType/ModalMultiSelectItemType');
	var MultiSelectItemTypeTemplate = require('text!views/itemType/tpl/MultiSelectItemTypeTemplate.html');

	var MultiSelectItemType = Marionette.LayoutView.extend({
		template : _.template(MultiSelectItemTypeTemplate),

		regions : {
			modalMultiSelectItemTypeRegion : '#modalMultiSelectItemTypes',
			gridItemTypesModalRegion : '#gridMultiselectItemTypes',
		},

		initialize : function() {
			var that = this;

			this.itemTypes = this.collection;

			this.gridItemTypes = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.itemTypes,
			});

			this.modalMultiSelectItemType = new ModalMultiSelectItemType({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectItemTypeRegion.show(that.modalMultiSelectItemType);
				that.gridItemTypesModalRegion.show(that.gridItemTypes);
			});
		},
		clear : function(){
			this.modalMultiSelectItemType.clear();
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

	return MultiSelectItemType
});
