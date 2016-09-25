/* generated: 24/09/2016 12:52:15 */
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

	var ModalMultiSelectBairro = require('views/bairro/ModalMultiSelectBairro');
	var MultiSelectBairroTemplate = require('text!views/bairro/tpl/MultiSelectBairroTemplate.html');

	var MultiSelectBairro = Marionette.LayoutView.extend({
		template : _.template(MultiSelectBairroTemplate),

		regions : {
			modalMultiSelectBairroRegion : '#modalMultiSelectBairros',
			gridBairrosModalRegion : '#gridMultiselectBairros',
		},

		initialize : function() {
			var that = this;

			this.bairros = this.collection;

			this.gridBairros = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.bairros,
			});

			this.modalMultiSelectBairro = new ModalMultiSelectBairro({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectBairroRegion.show(that.modalMultiSelectBairro);
				that.gridBairrosModalRegion.show(that.gridBairros);
			});
		},
		clear : function(){
			this.modalMultiSelectBairro.clear();
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

	return MultiSelectBairro
});
