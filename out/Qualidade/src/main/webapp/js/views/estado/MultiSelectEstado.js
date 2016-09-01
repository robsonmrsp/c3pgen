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

	var ModalMultiSelectEstado = require('views/estado/ModalMultiSelectEstado');
	var MultiSelectEstadoTemplate = require('text!views/estado/tpl/MultiSelectEstadoTemplate.html');

	var MultiSelectEstado = Marionette.LayoutView.extend({
		template : _.template(MultiSelectEstadoTemplate),

		regions : {
			modalMultiSelectEstadoRegion : '#modalMultiSelectEstados',
			gridEstadosModalRegion : '#gridMultiselectEstados',
		},

		initialize : function() {
			var that = this;

			this.estados = this.collection;

			this.gridEstados = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.estados,
			});

			this.modalMultiSelectEstado = new ModalMultiSelectEstado({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectEstadoRegion.show(that.modalMultiSelectEstado);
				that.gridEstadosModalRegion.show(that.gridEstados);
			});
		},
		clear : function(){
			this.modalMultiSelectEstado.clear();
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
				name : "faixaCep1Ini",
				editable : false,
				sortable : false,
				label 	 : "Faixa_cep1_ini",
				cell 	 : "string",
			}, 
			{
				name : "faixaCep1Fim",
				editable : false,
				sortable : false,
				label 	 : "Faixa_cep1_fim",
				cell 	 : "string",
			}, 
			{
				name : "faixaCep2Ini",
				editable : false,
				sortable : false,
				label 	 : "Faixa_cep2_ini",
				cell 	 : "string",
			}, 
			{
				name : "faixaCep2Fim",
				editable : false,
				sortable : false,
				label 	 : "Faixa_cep2_fim",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return MultiSelectEstado
});
