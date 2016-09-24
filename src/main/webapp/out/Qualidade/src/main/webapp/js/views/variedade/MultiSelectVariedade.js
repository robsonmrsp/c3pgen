/* generated: 24/09/2016 11:56:36 */
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

	var ModalMultiSelectVariedade = require('views/variedade/ModalMultiSelectVariedade');
	var MultiSelectVariedadeTemplate = require('text!views/variedade/tpl/MultiSelectVariedadeTemplate.html');

	var MultiSelectVariedade = Marionette.LayoutView.extend({
		template : _.template(MultiSelectVariedadeTemplate),

		regions : {
			modalMultiSelectVariedadeRegion : '#modalMultiSelectVariedades',
			gridVariedadesModalRegion : '#gridMultiselectVariedades',
		},

		initialize : function() {
			var that = this;

			this.variedades = this.collection;

			this.gridVariedades = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.variedades,
			});

			this.modalMultiSelectVariedade = new ModalMultiSelectVariedade({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectVariedadeRegion.show(that.modalMultiSelectVariedade);
				that.gridVariedadesModalRegion.show(that.gridVariedades);
			});
		},
		clear : function(){
			this.modalMultiSelectVariedade.clear();
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

	return MultiSelectVariedade
});
