/* generated: 18/08/2015 15:38:44 */
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

	var ModalMultiSelectCategoria = require('views/categoria/ModalMultiSelectCategoria');
	var MultiSelectCategoriaTemplate = require('text!views/categoria/tpl/MultiSelectCategoriaTemplate.html');

	var MultiSelectCategoria = Marionette.LayoutView.extend({
		template : _.template(MultiSelectCategoriaTemplate),

		regions : {
			modalMultiSelectCategoriaRegion : '#modalMultiSelectCategorias',
			gridCategoriasModalRegion : '#gridMultiselectCategorias',
		},

		initialize : function() {
			var that = this;

			this.categorias = this.collection;

			this.gridCategorias = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.categorias,
			});

			this.modalMultiSelectCategoria = new ModalMultiSelectCategoria({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectCategoriaRegion.show(that.modalMultiSelectCategoria);
				that.gridCategoriasModalRegion.show(that.gridCategorias);
			});
		},
		clear : function(){
			this.modalMultiSelectCategoria.clear();
		},
		
		_getColumns : function() {
			var columns = [
			{
				name : "id",
				label : "id",
				sortable : false,
				editable : false,
				cell : Backgrid.IntegerCell.extend({
					orderSeparator : ''
				})
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

	return MultiSelectCategoria
});
