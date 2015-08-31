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

	var ModalMultiSelectAttributeType = require('views/attributeType/ModalMultiSelectAttributeType');
	var MultiSelectAttributeTypeTemplate = require('text!views/attributeType/tpl/MultiSelectAttributeTypeTemplate.html');

	var MultiSelectAttributeType = Marionette.LayoutView.extend({
		template : _.template(MultiSelectAttributeTypeTemplate),

		regions : {
			modalMultiSelectAttributeTypeRegion : '#modalMultiSelectAttributeTypes',
			gridAttributeTypesModalRegion : '#gridMultiselectAttributeTypes',
		},

		initialize : function() {
			var that = this;

			this.attributeTypes = this.collection;

			this.gridAttributeTypes = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.attributeTypes,
			});

			this.modalMultiSelectAttributeType = new ModalMultiSelectAttributeType({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectAttributeTypeRegion.show(that.modalMultiSelectAttributeType);
				that.gridAttributeTypesModalRegion.show(that.gridAttributeTypes);
			});
		},
		clear : function(){
			this.modalMultiSelectAttributeType.clear();
		},
		
		_getColumns : function() {
			var columns = [

			{
				name : "className",
				editable : false,
				sortable : false,
				label 	 : "Nome",
				cell 	 : "string",
			}, 
			{
				name : "format",
				editable : false,
				sortable : false,
				label 	 : "Formato",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return MultiSelectAttributeType
});
