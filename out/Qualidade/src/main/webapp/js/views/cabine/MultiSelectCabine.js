/* generated: 03/09/2016 22:18:31 */
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

	var ModalMultiSelectCabine = require('views/cabine/ModalMultiSelectCabine');
	var MultiSelectCabineTemplate = require('text!views/cabine/tpl/MultiSelectCabineTemplate.html');

	var MultiSelectCabine = Marionette.LayoutView.extend({
		template : _.template(MultiSelectCabineTemplate),

		regions : {
			modalMultiSelectCabineRegion : '#modalMultiSelectCabines',
			gridCabinesModalRegion : '#gridMultiselectCabines',
		},

		initialize : function() {
			var that = this;

			this.cabines = this.collection;

			this.gridCabines = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.cabines,
			});

			this.modalMultiSelectCabine = new ModalMultiSelectCabine({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectCabineRegion.show(that.modalMultiSelectCabine);
				that.gridCabinesModalRegion.show(that.gridCabines);
			});
		},
		clear : function(){
			this.modalMultiSelectCabine.clear();
		},
		
		_getColumns : function() {
			var columns = [

			{
				name : "nome",
				editable : false,
				sortable : false,
				label 	 : "Nome",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return MultiSelectCabine
});
