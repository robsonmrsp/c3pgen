/* generated: 24/09/2016 11:56:38 */
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

	var ModalMultiSelectOperation = require('views/operation/ModalMultiSelectOperation');
	var MultiSelectOperationTemplate = require('text!views/operation/tpl/MultiSelectOperationTemplate.html');

	var MultiSelectOperation = Marionette.LayoutView.extend({
		template : _.template(MultiSelectOperationTemplate),

		regions : {
			modalMultiSelectOperationRegion : '#modalMultiSelectOperations',
			gridOperationsModalRegion : '#gridMultiselectOperations',
		},

		initialize : function() {
			var that = this;

			this.operations = this.collection;

			this.gridOperations = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.operations,
			});

			this.modalMultiSelectOperation = new ModalMultiSelectOperation({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectOperationRegion.show(that.modalMultiSelectOperation);
				that.gridOperationsModalRegion.show(that.gridOperations);
			});
		},
		clear : function(){
			this.modalMultiSelectOperation.clear();
		},
		
		_getColumns : function() {
			var columns = [

			{
				name : "name",
				editable : false,
				sortable : false,
				label 	 : "Nome",
				cell 	 : "string",
			}, 
			{
				name : "canEdit",
				editable : false,
				sortable : false,
				label 	 : "Pode Editar",
				cell 	 : "string",
			}, 
			{
				name : "canRead",
				editable : false,
				sortable : false,
				label 	 : "Pode Ler",
				cell 	 : "string",
			}, 
			{
				name : "canUpdate",
				editable : false,
				sortable : false,
				label 	 : "Pode atualizar",
				cell 	 : "string",
			}, 
			{
				name : "canDelete",
				editable : false,
				sortable : false,
				label 	 : "Pode Deletar",
				cell 	 : "string",
			}, 
			{
				name : "canExecute",
				editable : false,
				sortable : false,
				label 	 : "Pode executar",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return MultiSelectOperation
});
