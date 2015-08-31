/* generated: 30/08/2015 20:23:12 */
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

	var ModalMultiSelectCep = require('views/cep/ModalMultiSelectCep');
	var MultiSelectCepTemplate = require('text!views/cep/tpl/MultiSelectCepTemplate.html');

	var MultiSelectCep = Marionette.LayoutView.extend({
		template : _.template(MultiSelectCepTemplate),

		regions : {
			modalMultiSelectCepRegion : '#modalMultiSelectCeps',
			gridCepsModalRegion : '#gridMultiselectCeps',
		},

		initialize : function() {
			var that = this;

			this.ceps = this.collection;

			this.gridCeps = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.ceps,
			});

			this.modalMultiSelectCep = new ModalMultiSelectCep({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectCepRegion.show(that.modalMultiSelectCep);
				that.gridCepsModalRegion.show(that.gridCeps);
			});
		},
		clear : function(){
			this.modalMultiSelectCep.clear();
		},
		
		_getColumns : function() {
			var columns = [

			{
				name : "logradouro",
				editable : false,
				sortable : false,
				label 	 : "Logadouro",
				cell 	 : "string",
			}, 
			{
				name : "numero",
				editable : false,
				sortable : false,
				label 	 : "Numero",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return MultiSelectCep
});
