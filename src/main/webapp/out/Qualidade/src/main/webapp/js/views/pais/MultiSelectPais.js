/* generated: 24/09/2016 11:56:37 */
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

	var ModalMultiSelectPais = require('views/pais/ModalMultiSelectPais');
	var MultiSelectPaisTemplate = require('text!views/pais/tpl/MultiSelectPaisTemplate.html');

	var MultiSelectPais = Marionette.LayoutView.extend({
		template : _.template(MultiSelectPaisTemplate),

		regions : {
			modalMultiSelectPaisRegion : '#modalMultiSelectPaiss',
			gridPaissModalRegion : '#gridMultiselectPaiss',
		},

		initialize : function() {
			var that = this;

			this.paiss = this.collection;

			this.gridPaiss = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.paiss,
			});

			this.modalMultiSelectPais = new ModalMultiSelectPais({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectPaisRegion.show(that.modalMultiSelectPais);
				that.gridPaissModalRegion.show(that.gridPaiss);
			});
		},
		clear : function(){
			this.modalMultiSelectPais.clear();
		},
		
		_getColumns : function() {
			var columns = [

			{
				name : "codigo",
				editable : false,
				sortable : false,
				label 	 : "Código",
				cell : CustomNumberCell.extend({}),
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

	return MultiSelectPais
});
