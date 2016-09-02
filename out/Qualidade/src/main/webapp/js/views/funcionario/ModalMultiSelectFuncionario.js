/* generated: 02/09/2016 16:23:48 */
define(function(require) {
	// Start "Import´s Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Backgrid = require('adapters/backgrid-adapter');
	var Marionette = require('marionette');
	var CustomNumberCell = require('views/components/CustomNumberCell');

	var util = require('utilities/utils');
	var FuncionarioPageCollection = require('collections/FuncionarioPageCollection');
	var ModalMultiSelectFuncionarioTemplate = require('text!views/funcionario/tpl/ModalMultiSelectFuncionarioTemplate.html');
	// End of "Import´s" definition

	var ModalFuncionarios = Marionette.LayoutView.extend({
		template : _.template(ModalMultiSelectFuncionarioTemplate),

		regions : {
			gridRegion : '#grid-funcionarios-modal',
			paginatorRegion : '#paginator-funcionarios-modal',
		},
		events : {
			'click .btnOk' : 'close'
		},
		ui : {
			btnOk : ".btnOk",
		},

		initialize : function(opt) {
			var that = this;

			this.projetoFuncionarios = this.collection;
			
			this.funcionarios = new FuncionarioPageCollection();
			this.funcionarios.on('fetched', this.endFetch, this);
			this.funcionarios.on('backgrid:selected', this.selectModel, this);

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Nenhum registro para escolha",
				collection : this.funcionarios,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.funcionarios,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.funcionarios.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid funcionario');
				},
				error : function(_col, _resp, _opts) {
					console.error(_resp.responseText || _resp.getResponseHeader('exception'));
				}
			});


			this.on('show', function() {
				that.gridRegion.show(that.grid);
				that.paginatorRegion.show(that.paginator);
			});
		},

		selectModel : function(model, checked) {
			if (checked)
				this.projetoFuncionarios.add(model)
			else
				this.projetoFuncionarios.remove(model)
		},

		endFetch : function(_collection) {
			var that = this;
			this.funcionarios.each(function(model) {
				if (that.projetoFuncionarios.findWhere({
					id : model.get('id')
				})) {
					model.trigger("backgrid:select", model, true);
				}
			});
		},
		clear : function(){
			this.grid.$el.find('input[type=checkbox]').prop('checked', false);
		},
		_getColumns : function() {
			var columns = [{
				name : "",
				cell : "select-row",
				headerCell : "select-all"
			}, 
			 
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

	return ModalFuncionarios;
});
