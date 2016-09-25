/* generated: 24/09/2016 12:52:11 */
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

	var ModalMultiSelectApontamentoQualidadePacking = require('views/apontamentoQualidadePacking/ModalMultiSelectApontamentoQualidadePacking');
	var MultiSelectApontamentoQualidadePackingTemplate = require('text!views/apontamentoQualidadePacking/tpl/MultiSelectApontamentoQualidadePackingTemplate.html');

	var MultiSelectApontamentoQualidadePacking = Marionette.LayoutView.extend({
		template : _.template(MultiSelectApontamentoQualidadePackingTemplate),

		regions : {
			modalMultiSelectApontamentoQualidadePackingRegion : '#modalMultiSelectApontamentoQualidadePackings',
			gridApontamentoQualidadePackingsModalRegion : '#gridMultiselectApontamentoQualidadePackings',
		},

		initialize : function() {
			var that = this;

			this.apontamentoQualidadePackings = this.collection;

			this.gridApontamentoQualidadePackings = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.apontamentoQualidadePackings,
			});

			this.modalMultiSelectApontamentoQualidadePacking = new ModalMultiSelectApontamentoQualidadePacking({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectApontamentoQualidadePackingRegion.show(that.modalMultiSelectApontamentoQualidadePacking);
				that.gridApontamentoQualidadePackingsModalRegion.show(that.gridApontamentoQualidadePackings);
			});
		},
		clear : function(){
			this.modalMultiSelectApontamentoQualidadePacking.clear();
		},
		
		_getColumns : function() {
			var columns = [

			{
				name : "aparencia",
				editable : false,
				sortable : false,
				label 	 : "Aparência",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "diametroMinimo",
				editable : false,
				sortable : false,
				label 	 : "Diametro mínimo",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "diametroMaximo",
				editable : false,
				sortable : false,
				label 	 : "Diametro máximo",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "diametroMedio",
				editable : false,
				sortable : false,
				label 	 : "Diametro médio",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "brixMinimo",
				editable : false,
				sortable : false,
				label 	 : "Brix mínimo",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "brixMaximo",
				editable : false,
				sortable : false,
				label 	 : "Brix máximo",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "brixMedio",
				editable : false,
				sortable : false,
				label 	 : "Brix médio",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "pesoCachoMinimo",
				editable : false,
				sortable : false,
				label 	 : "Peso cacho mínimo",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "pesoCachoMaximo",
				editable : false,
				sortable : false,
				label 	 : "Peso cacho máximo",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "pesoSacolaMinimo",
				editable : false,
				sortable : false,
				label 	 : "Peso sacola mínimo",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "pesoSacolaMaximo",
				editable : false,
				sortable : false,
				label 	 : "Peso sacola máximo",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "numeroCachoSacola",
				editable : false,
				sortable : false,
				label 	 : "Número cacho sacola",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "numeroSacola",
				editable : false,
				sortable : false,
				label 	 : "Número sacola",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "pesoCumbucaMinimo",
				editable : false,
				sortable : false,
				label 	 : "Peso cumbuca mínimo",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "pesoCumbucaMaximo",
				editable : false,
				sortable : false,
				label 	 : "Peso cumbuca máximo",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "numeroCachosCumbuca",
				editable : false,
				sortable : false,
				label 	 : "Número cachos cumbuca",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "numeroCumbucas",
				editable : false,
				sortable : false,
				label 	 : "Número cumbucas",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "pesoBruto",
				editable : false,
				sortable : false,
				label 	 : "Peso bruto",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "pesoLiquido",
				editable : false,
				sortable : false,
				label 	 : "Peso líquido",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "corposEstranhos",
				editable : false,
				sortable : false,
				label 	 : "Corpos estranhos",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "bagasAquosas",
				editable : false,
				sortable : false,
				label 	 : "Bagas aquosas",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "bagasCristalinas",
				editable : false,
				sortable : false,
				label 	 : "Bagas cristalinas",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "firmeza",
				editable : false,
				sortable : false,
				label 	 : "Firmeza",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "danos",
				editable : false,
				sortable : false,
				label 	 : "Danos",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "pragas",
				editable : false,
				sortable : false,
				label 	 : "Pragas",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "doencas",
				editable : false,
				sortable : false,
				label 	 : "Doencas",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "aparenciaEngaco",
				editable : false,
				sortable : false,
				label 	 : "Aparência engaco",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "desgrana",
				editable : false,
				sortable : false,
				label 	 : "Desgrana",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "podridao",
				editable : false,
				sortable : false,
				label 	 : "Podridão",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "cicatrizes",
				editable : false,
				sortable : false,
				label 	 : "Cicatrizes",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "rachaduras",
				editable : false,
				sortable : false,
				label 	 : "Rachaduras",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "rachadurasCampo",
				editable : false,
				sortable : false,
				label 	 : "Rachaduras campo",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "amolecimento",
				editable : false,
				sortable : false,
				label 	 : "Amolecimento",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "observacao",
				editable : false,
				sortable : false,
				label 	 : "Observação",
				cell 	 : "string",
			}, 
			{
				name : "dataHora",
				editable : false,
				sortable : false,
				label 	 : "Data hora",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return MultiSelectApontamentoQualidadePacking
});
