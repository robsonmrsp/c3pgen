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

	var ModalMultiSelectCargo = require('views/cargo/ModalMultiSelectCargo');
	var MultiSelectCargoTemplate = require('text!views/cargo/tpl/MultiSelectCargoTemplate.html');

	var MultiSelectCargo = Marionette.LayoutView.extend({
		template : _.template(MultiSelectCargoTemplate),

		regions : {
			modalMultiSelectCargoRegion : '#modalMultiSelectCargos',
			gridCargosModalRegion : '#gridMultiselectCargos',
		},

		initialize : function() {
			var that = this;

			this.cargos = this.collection;

			this.gridCargos = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.cargos,
			});

			this.modalMultiSelectCargo = new ModalMultiSelectCargo({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectCargoRegion.show(that.modalMultiSelectCargo);
				that.gridCargosModalRegion.show(that.gridCargos);
			});
		},
		clear : function(){
			this.modalMultiSelectCargo.clear();
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

	return MultiSelectCargo
});
