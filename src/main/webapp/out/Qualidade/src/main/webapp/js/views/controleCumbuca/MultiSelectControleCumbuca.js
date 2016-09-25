/* generated: 24/09/2016 12:52:13 */
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

	var ModalMultiSelectControleCumbuca = require('views/controleCumbuca/ModalMultiSelectControleCumbuca');
	var MultiSelectControleCumbucaTemplate = require('text!views/controleCumbuca/tpl/MultiSelectControleCumbucaTemplate.html');

	var MultiSelectControleCumbuca = Marionette.LayoutView.extend({
		template : _.template(MultiSelectControleCumbucaTemplate),

		regions : {
			modalMultiSelectControleCumbucaRegion : '#modalMultiSelectControleCumbucas',
			gridControleCumbucasModalRegion : '#gridMultiselectControleCumbucas',
		},

		initialize : function() {
			var that = this;

			this.controleCumbucas = this.collection;

			this.gridControleCumbucas = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.controleCumbucas,
			});

			this.modalMultiSelectControleCumbuca = new ModalMultiSelectControleCumbuca({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectControleCumbucaRegion.show(that.modalMultiSelectControleCumbuca);
				that.gridControleCumbucasModalRegion.show(that.gridControleCumbucas);
			});
		},
		clear : function(){
			this.modalMultiSelectControleCumbuca.clear();
		},
		
		_getColumns : function() {
			var columns = [

			{
				name : "dataRegistro",
				editable : false,
				sortable : false,
				label 	 : "Data de Registro",
				cell 	 : "string",
			}, 
			{
				name : "peso",
				editable : false,
				sortable : false,
				label 	 : "Nome",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "tipo",
				editable : false,
				sortable : false,
				label 	 : "Tipo de Máquina",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "quantidadeCachos",
				editable : false,
				sortable : false,
				label 	 : "N. de Cachos",
				cell : CustomNumberCell.extend({}),
			}, 
			];
			return columns;
		},
	});

	return MultiSelectControleCumbuca
});
