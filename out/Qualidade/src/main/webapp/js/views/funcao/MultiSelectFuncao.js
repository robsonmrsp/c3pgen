/* generated: 01/09/2016 17:25:05 */
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

	var ModalMultiSelectFuncao = require('views/funcao/ModalMultiSelectFuncao');
	var MultiSelectFuncaoTemplate = require('text!views/funcao/tpl/MultiSelectFuncaoTemplate.html');

	var MultiSelectFuncao = Marionette.LayoutView.extend({
		template : _.template(MultiSelectFuncaoTemplate),

		regions : {
			modalMultiSelectFuncaoRegion : '#modalMultiSelectFuncaos',
			gridFuncaosModalRegion : '#gridMultiselectFuncaos',
		},

		initialize : function() {
			var that = this;

			this.funcaos = this.collection;

			this.gridFuncaos = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.funcaos,
			});

			this.modalMultiSelectFuncao = new ModalMultiSelectFuncao({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectFuncaoRegion.show(that.modalMultiSelectFuncao);
				that.gridFuncaosModalRegion.show(that.gridFuncaos);
			});
		},
		clear : function(){
			this.modalMultiSelectFuncao.clear();
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
				name : "descricao",
				editable : false,
				sortable : false,
				label 	 : "Descrição",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return MultiSelectFuncao
});
