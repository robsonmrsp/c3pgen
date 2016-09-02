/* generated: 02/09/2016 16:23:48 */
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

	var ModalMultiSelectPacking = require('views/packing/ModalMultiSelectPacking');
	var MultiSelectPackingTemplate = require('text!views/packing/tpl/MultiSelectPackingTemplate.html');

	var MultiSelectPacking = Marionette.LayoutView.extend({
		template : _.template(MultiSelectPackingTemplate),

		regions : {
			modalMultiSelectPackingRegion : '#modalMultiSelectPackings',
			gridPackingsModalRegion : '#gridMultiselectPackings',
		},

		initialize : function() {
			var that = this;

			this.packings = this.collection;

			this.gridPackings = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.packings,
			});

			this.modalMultiSelectPacking = new ModalMultiSelectPacking({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectPackingRegion.show(that.modalMultiSelectPacking);
				that.gridPackingsModalRegion.show(that.gridPackings);
			});
		},
		clear : function(){
			this.modalMultiSelectPacking.clear();
		},
		
		_getColumns : function() {
			var columns = [

			];
			return columns;
		},
	});

	return MultiSelectPacking
});
