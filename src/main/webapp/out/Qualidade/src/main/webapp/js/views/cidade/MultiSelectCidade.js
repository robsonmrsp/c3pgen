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

	var ModalMultiSelectCidade = require('views/cidade/ModalMultiSelectCidade');
	var MultiSelectCidadeTemplate = require('text!views/cidade/tpl/MultiSelectCidadeTemplate.html');

	var MultiSelectCidade = Marionette.LayoutView.extend({
		template : _.template(MultiSelectCidadeTemplate),

		regions : {
			modalMultiSelectCidadeRegion : '#modalMultiSelectCidades',
			gridCidadesModalRegion : '#gridMultiselectCidades',
		},

		initialize : function() {
			var that = this;

			this.cidades = this.collection;

			this.gridCidades = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.cidades,
			});

			this.modalMultiSelectCidade = new ModalMultiSelectCidade({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectCidadeRegion.show(that.modalMultiSelectCidade);
				that.gridCidadesModalRegion.show(that.gridCidades);
			});
		},
		clear : function(){
			this.modalMultiSelectCidade.clear();
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
			{
				name : "cep",
				editable : false,
				sortable : false,
				label 	 : "Cep",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return MultiSelectCidade
});
