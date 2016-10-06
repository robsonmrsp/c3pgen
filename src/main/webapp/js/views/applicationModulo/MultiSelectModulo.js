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

	var ModalMultiSelectModulo = require('views/modulo/ModalMultiSelectModulo');
	var MultiSelectModuloTemplate = require('text!views/modulo/tpl/MultiSelectModuloTemplate.html');

	var MultiSelectModulo = Marionette.LayoutView.extend({
		template : _.template(MultiSelectModuloTemplate),

		regions : {
			modalMultiSelectModuloRegion : '#modalMultiSelectModulos',
			gridModulosModalRegion : '#gridMultiselectModulos',
		},

		initialize : function() {
			var that = this;

			this.modulos = this.collection;

			this.gridModulos = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.modulos,
			});

			this.modalMultiSelectModulo = new ModalMultiSelectModulo({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectModuloRegion.show(that.modalMultiSelectModulo);
				that.gridModulosModalRegion.show(that.gridModulos);
			});
		},
		clear : function(){
			this.modalMultiSelectModulo.clear();
		},
		
		_getColumns : function() {
			var columns = [

			{
				name : "nome",
				editable : false,
				sortable : false,
				label 	 : "Nome do Módulo",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return MultiSelectModulo
});
