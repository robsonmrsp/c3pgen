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

	var ModalMultiSelectFuncionario = require('views/funcionario/ModalMultiSelectFuncionario');
	var MultiSelectFuncionarioTemplate = require('text!views/funcionario/tpl/MultiSelectFuncionarioTemplate.html');

	var MultiSelectFuncionario = Marionette.LayoutView.extend({
		template : _.template(MultiSelectFuncionarioTemplate),

		regions : {
			modalMultiSelectFuncionarioRegion : '#modalMultiSelectFuncionarios',
			gridFuncionariosModalRegion : '#gridMultiselectFuncionarios',
		},

		initialize : function() {
			var that = this;

			this.funcionarios = this.collection;

			this.gridFuncionarios = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.funcionarios,
			});

			this.modalMultiSelectFuncionario = new ModalMultiSelectFuncionario({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectFuncionarioRegion.show(that.modalMultiSelectFuncionario);
				that.gridFuncionariosModalRegion.show(that.gridFuncionarios);
			});
		},
		clear : function(){
			this.modalMultiSelectFuncionario.clear();
		},
		
		_getColumns : function() {
			var columns = [

			{
				name : "matricula",
				editable : false,
				sortable : false,
				label 	 : "Matricula",
				cell 	 : "string",
			}, 
			{
				name : "foto",
				editable : false,
				sortable : false,
				label 	 : "Foto",
				cell 	 : "string",
			}, 
			{
				name : "nome",
				editable : false,
				sortable : false,
				label 	 : "Nome",
				cell 	 : "string",
			}, 
			{
				name : "telefone",
				editable : false,
				sortable : false,
				label 	 : "Telefone",
				cell 	 : "string",
			}, 
			{
				name : "telefone2",
				editable : false,
				sortable : false,
				label 	 : "Telefone 2",
				cell 	 : "string",
			}, 
			{
				name : "sexo",
				editable : false,
				sortable : false,
				label 	 : "Sexo",
				cell 	 : "string",
			}, 
			{
				name : "dataNascimento",
				editable : false,
				sortable : false,
				label 	 : "Data de Nascimento",
				cell 	 : "string",
			}, 
			{
				name : "salario",
				editable : false,
				sortable : false,
				label 	 : "Salário",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "escolaridade",
				editable : false,
				sortable : false,
				label 	 : "Escolaridade",
				cell 	 : "string",
			}, 
			{
				name : "dataAdmissao",
				editable : false,
				sortable : false,
				label 	 : "Data  de Admissão",
				cell 	 : "string",
			}, 
			{
				name : "dataDemissao",
				editable : false,
				sortable : false,
				label 	 : "DataDemissao",
				cell 	 : "string",
			}, 
			{
				name : "valorHoraExtra",
				editable : false,
				sortable : false,
				label 	 : "ValorHoraExtra",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "carteiraTrabalho",
				editable : false,
				sortable : false,
				label 	 : "CarteiraTrabalho",
				cell 	 : "string",
			}, 
			{
				name : "rg",
				editable : false,
				sortable : false,
				label 	 : "Rg",
				cell 	 : "string",
			}, 
			{
				name : "rgOrgaoEmissor",
				editable : false,
				sortable : false,
				label 	 : "RgOrgaoEmissor",
				cell 	 : "string",
			}, 
			{
				name : "nomeBanco",
				editable : false,
				sortable : false,
				label 	 : "Banco",
				cell 	 : "string",
			}, 
			{
				name : "bancoNumeroAgencia",
				editable : false,
				sortable : false,
				label 	 : "Agência",
				cell 	 : "string",
			}, 
			{
				name : "bancoNumeroConta",
				editable : false,
				sortable : false,
				label 	 : "Conta",
				cell 	 : "string",
			}, 
			{
				name : "pis",
				editable : false,
				sortable : false,
				label 	 : "Pis",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return MultiSelectFuncionario
});
