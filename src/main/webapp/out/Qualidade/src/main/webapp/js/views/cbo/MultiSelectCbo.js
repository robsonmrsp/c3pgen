/* generated: 24/09/2016 11:56:33 */
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

	var ModalMultiSelectCbo = require('views/cbo/ModalMultiSelectCbo');
	var MultiSelectCboTemplate = require('text!views/cbo/tpl/MultiSelectCboTemplate.html');

	var MultiSelectCbo = Marionette.LayoutView.extend({
		template : _.template(MultiSelectCboTemplate),

		regions : {
			modalMultiSelectCboRegion : '#modalMultiSelectCbos',
			gridCbosModalRegion : '#gridMultiselectCbos',
		},

		initialize : function() {
			var that = this;

			this.cbos = this.collection;

			this.gridCbos = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.cbos,
			});

			this.modalMultiSelectCbo = new ModalMultiSelectCbo({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectCboRegion.show(that.modalMultiSelectCbo);
				that.gridCbosModalRegion.show(that.gridCbos);
			});
		},
		clear : function(){
			this.modalMultiSelectCbo.clear();
		},
		
		_getColumns : function() {
			var columns = [

			{
				name : "codigo",
				editable : false,
				sortable : false,
				label 	 : "Código",
				cell 	 : "string",
			}, 
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

	return MultiSelectCbo
});
