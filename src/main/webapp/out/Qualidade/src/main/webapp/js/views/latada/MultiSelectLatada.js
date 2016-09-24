/* generated: 24/09/2016 11:56:35 */
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

	var ModalMultiSelectLatada = require('views/latada/ModalMultiSelectLatada');
	var MultiSelectLatadaTemplate = require('text!views/latada/tpl/MultiSelectLatadaTemplate.html');

	var MultiSelectLatada = Marionette.LayoutView.extend({
		template : _.template(MultiSelectLatadaTemplate),

		regions : {
			modalMultiSelectLatadaRegion : '#modalMultiSelectLatadas',
			gridLatadasModalRegion : '#gridMultiselectLatadas',
		},

		initialize : function() {
			var that = this;

			this.latadas = this.collection;

			this.gridLatadas = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.latadas,
			});

			this.modalMultiSelectLatada = new ModalMultiSelectLatada({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectLatadaRegion.show(that.modalMultiSelectLatada);
				that.gridLatadasModalRegion.show(that.gridLatadas);
			});
		},
		clear : function(){
			this.modalMultiSelectLatada.clear();
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

	return MultiSelectLatada
});
