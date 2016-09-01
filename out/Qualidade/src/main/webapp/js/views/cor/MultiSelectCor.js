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

	var ModalMultiSelectCor = require('views/cor/ModalMultiSelectCor');
	var MultiSelectCorTemplate = require('text!views/cor/tpl/MultiSelectCorTemplate.html');

	var MultiSelectCor = Marionette.LayoutView.extend({
		template : _.template(MultiSelectCorTemplate),

		regions : {
			modalMultiSelectCorRegion : '#modalMultiSelectCors',
			gridCorsModalRegion : '#gridMultiselectCors',
		},

		initialize : function() {
			var that = this;

			this.cors = this.collection;

			this.gridCors = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.cors,
			});

			this.modalMultiSelectCor = new ModalMultiSelectCor({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectCorRegion.show(that.modalMultiSelectCor);
				that.gridCorsModalRegion.show(that.gridCors);
			});
		},
		clear : function(){
			this.modalMultiSelectCor.clear();
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

	return MultiSelectCor
});
