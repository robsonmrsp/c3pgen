/* generated: 01/09/2016 17:25:05 */
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

	var ModalMultiSelectItem = require('views/item/ModalMultiSelectItem');
	var MultiSelectItemTemplate = require('text!views/item/tpl/MultiSelectItemTemplate.html');

	var MultiSelectItem = Marionette.LayoutView.extend({
		template : _.template(MultiSelectItemTemplate),

		regions : {
			modalMultiSelectItemRegion : '#modalMultiSelectItems',
			gridItemsModalRegion : '#gridMultiselectItems',
		},

		initialize : function() {
			var that = this;

			this.items = this.collection;

			this.gridItems = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.items,
			});

			this.modalMultiSelectItem = new ModalMultiSelectItem({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectItemRegion.show(that.modalMultiSelectItem);
				that.gridItemsModalRegion.show(that.gridItems);
			});
		},
		clear : function(){
			this.modalMultiSelectItem.clear();
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

	return MultiSelectItem
});
