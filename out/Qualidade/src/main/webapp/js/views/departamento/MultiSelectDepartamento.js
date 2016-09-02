/* generated: 02/09/2016 16:23:48 */
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

	var ModalMultiSelectDepartamento = require('views/departamento/ModalMultiSelectDepartamento');
	var MultiSelectDepartamentoTemplate = require('text!views/departamento/tpl/MultiSelectDepartamentoTemplate.html');

	var MultiSelectDepartamento = Marionette.LayoutView.extend({
		template : _.template(MultiSelectDepartamentoTemplate),

		regions : {
			modalMultiSelectDepartamentoRegion : '#modalMultiSelectDepartamentos',
			gridDepartamentosModalRegion : '#gridMultiselectDepartamentos',
		},

		initialize : function() {
			var that = this;

			this.departamentos = this.collection;

			this.gridDepartamentos = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.departamentos,
			});

			this.modalMultiSelectDepartamento = new ModalMultiSelectDepartamento({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectDepartamentoRegion.show(that.modalMultiSelectDepartamento);
				that.gridDepartamentosModalRegion.show(that.gridDepartamentos);
			});
		},
		clear : function(){
			this.modalMultiSelectDepartamento.clear();
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

	return MultiSelectDepartamento
});
