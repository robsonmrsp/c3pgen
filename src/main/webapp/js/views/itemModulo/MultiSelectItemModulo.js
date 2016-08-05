/* generated: 05/08/2016 15:59:17 */
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

	var ModalMultiSelectItemModulo = require('views/itemModulo/ModalMultiSelectItemModulo');
	var MultiSelectItemModuloTemplate = require('text!views/itemModulo/tpl/MultiSelectItemModuloTemplate.html');

	var MultiSelectItemModulo = Marionette.LayoutView.extend({
		template : _.template(MultiSelectItemModuloTemplate),

		regions : {
			modalMultiSelectItemModuloRegion : '#modalMultiSelectItemModulos',
			gridItemModulosModalRegion : '#gridMultiselectItemModulos',
		},

		initialize : function() {
			var that = this;

			this.itemModulos = this.collection;

			this.gridItemModulos = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.itemModulos,
			});

			this.modalMultiSelectItemModulo = new ModalMultiSelectItemModulo({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectItemModuloRegion.show(that.modalMultiSelectItemModulo);
				that.gridItemModulosModalRegion.show(that.gridItemModulos);
			});
		},
		clear : function(){
			this.modalMultiSelectItemModulo.clear();
		},
		
		_getColumns : function() {
			var columns = [

			{
				name : "name",
				editable : false,
				sortable : false,
				label 	 : "Nome do item de módulo",
				cell 	 : "string",
			}, 
			{
				name : "yamlContent",
				editable : false,
				sortable : false,
				label 	 : "Conteudo do arquivo yaml",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return MultiSelectItemModulo
});
