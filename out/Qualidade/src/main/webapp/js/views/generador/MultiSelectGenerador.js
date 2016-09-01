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

	var ModalMultiSelectGenerador = require('views/generador/ModalMultiSelectGenerador');
	var MultiSelectGeneradorTemplate = require('text!views/generador/tpl/MultiSelectGeneradorTemplate.html');

	var MultiSelectGenerador = Marionette.LayoutView.extend({
		template : _.template(MultiSelectGeneradorTemplate),

		regions : {
			modalMultiSelectGeneradorRegion : '#modalMultiSelectGeneradors',
			gridGeneradorsModalRegion : '#gridMultiselectGeneradors',
		},

		initialize : function() {
			var that = this;

			this.generadors = this.collection;

			this.gridGeneradors = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.generadors,
			});

			this.modalMultiSelectGenerador = new ModalMultiSelectGenerador({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectGeneradorRegion.show(that.modalMultiSelectGenerador);
				that.gridGeneradorsModalRegion.show(that.gridGeneradors);
			});
		},
		clear : function(){
			this.modalMultiSelectGenerador.clear();
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

	return MultiSelectGenerador
});
