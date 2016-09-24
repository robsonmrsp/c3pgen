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

	var ModalMultiSelectSacola = require('views/sacola/ModalMultiSelectSacola');
	var MultiSelectSacolaTemplate = require('text!views/sacola/tpl/MultiSelectSacolaTemplate.html');

	var MultiSelectSacola = Marionette.LayoutView.extend({
		template : _.template(MultiSelectSacolaTemplate),

		regions : {
			modalMultiSelectSacolaRegion : '#modalMultiSelectSacolas',
			gridSacolasModalRegion : '#gridMultiselectSacolas',
		},

		initialize : function() {
			var that = this;

			this.sacolas = this.collection;

			this.gridSacolas = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.sacolas,
			});

			this.modalMultiSelectSacola = new ModalMultiSelectSacola({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectSacolaRegion.show(that.modalMultiSelectSacola);
				that.gridSacolasModalRegion.show(that.gridSacolas);
			});
		},
		clear : function(){
			this.modalMultiSelectSacola.clear();
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

	return MultiSelectSacola
});
