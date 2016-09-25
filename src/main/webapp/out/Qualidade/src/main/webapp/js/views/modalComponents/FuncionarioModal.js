/* generated: 24/09/2016 12:52:14 */
define(function(require) {
	// Start "Import´s" Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Backgrid = require('adapters/backgrid-adapter');
	var util = require('utilities/utils');
	var RadioButtonCell = require('views/components/RadioButtonCell');
	var Counter = require('views/components/Counter');
	var RowClick = require('views/components/CustomClickedRow');
	var Combobox = require('views/components/Combobox');
	var CustomNumberCell = require('views/components/CustomNumberCell');

	var FuncionarioModal = require('text!views/modalComponents/tpl/FuncionarioModalTemplate.html');
	var FuncionarioPageCollection = require('collections/FuncionarioPageCollection');
	var CargoCollection = require('collections/CargoCollection');			
	var CboCollection = require('collections/CboCollection');			
	var DepartamentoCollection = require('collections/DepartamentoCollection');			
	var FuncaoCollection = require('collections/FuncaoCollection');			

	// End of "Import´s" definition
	// #####################################################################################################
	// .............................................MAIN-BODY.............................................
	// #####################################################################################################

	var FuncionarioModal = Marionette.LayoutView.extend({
		template : _.template(FuncionarioModal),

		events : {
			'click #btnSearchFuncionario' : 'searchFuncionario',
			'click #btnClearFuncionario' : 'clearModal',
			'click tr' : 'selectRow',
			'keypress' : 'treatKeypress',
		},

		regions : {
			counterRegion : 	'#counter-funcionario',
			gridRegion : 		'#grid-funcionario',
			paginatorRegion : 	'#paginator-funcionario',
		},

		ui : {
    		inputModalMatricula : '#inputModalMatricula',
    		inputModalFoto : '#inputModalFoto',
    		inputModalNome : '#inputModalNome',
    		inputModalTelefone : '#inputModalTelefone',
    		inputModalTelefone2 : '#inputModalTelefone2',
    		inputModalSexo : '#inputModalSexo',
    		inputModalDataNascimento : '#inputModalDataNascimento',
			groupInputModalDataNascimento : '#groupInputModalDataNascimento',
    		inputModalSalario : '#inputModalSalario',
    		inputModalEscolaridade : '#inputModalEscolaridade',
    		inputModalDataAdmissao : '#inputModalDataAdmissao',
    		inputModalDataDemissao : '#inputModalDataDemissao',
    		inputModalValorHoraExtra : '#inputModalValorHoraExtra',
    		inputModalCarteiraTrabalho : '#inputModalCarteiraTrabalho',
    		inputModalRg : '#inputModalRg',
    		inputModalRgOrgaoEmissor : '#inputModalRgOrgaoEmissor',
    		inputModalNomeBanco : '#inputModalNomeBanco',
    		inputModalBancoNumeroAgencia : '#inputModalBancoNumeroAgencia',
    		inputModalBancoNumeroConta : '#inputModalBancoNumeroConta',
    		inputModalPis : '#inputModalPis',
			inputModalCargo : '#inputModalCargo', 
			inputModalCbo : '#inputModalCbo', 
			inputModalDepartamento : '#inputModalDepartamento', 
			inputModalFuncao : '#inputModalFuncao', 
		
			form : '#formSearchFuncionario',
			modalScreen : '.modal',
		},
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this.searchFuncionario();
	    	}
		},

		initialize : function(opt) {
			var that = this;

			this.onSelectModel = opt.onSelectModel;

			this.funcionarioCollection = new FuncionarioPageCollection();
			this.funcionarioCollection.state.pageSize = 5;
			this.funcionarioCollection.on('fetching', this.startFetch, this);
			this.funcionarioCollection.on('fetched', this.stopFetch, this);

			this.grid = new Backgrid.Grid({
				row : RowClick,
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this.getColumns(),
				emptyText : "Sem registros",
				collection : this.funcionarioCollection,
				emptyText : "Sem registros para exibir."

			});
			
			this.counter = new Counter({
				collection : this.funcionarioCollection ,
			});
			

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this.getColumns(),
				collection : this.funcionarioCollection,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.on('show', function() {
				that.gridRegion.show(that.grid);
				that.counterRegion.show(that.counter);
				that.paginatorRegion.show(that.paginator);
				var comboCargo = new Combobox({
					el : this.ui.inputModalCargo,
					comboId : 'id',
					comboVal : 'nome',
					collectionEntity : CargoCollection, //provavelmente vá ocorrer um erro pois CargoCollection não foi declarado
				});
				var comboCbo = new Combobox({
					el : this.ui.inputModalCbo,
					comboId : 'id',
					comboVal : 'nome',
					collectionEntity : CboCollection, //provavelmente vá ocorrer um erro pois CboCollection não foi declarado
				});
				var comboDepartamento = new Combobox({
					el : this.ui.inputModalDepartamento,
					comboId : 'id',
					comboVal : 'nome',
					collectionEntity : DepartamentoCollection, //provavelmente vá ocorrer um erro pois DepartamentoCollection não foi declarado
				});
				var comboFuncao = new Combobox({
					el : this.ui.inputModalFuncao,
					comboId : 'id',
					comboVal : 'nome',
					collectionEntity : FuncaoCollection, //provavelmente vá ocorrer um erro pois FuncaoCollection não foi declarado
				});
			});
		},

		selectRow : function(e) {
			var modelFuncionario = util.getWrappedModel(e);
			if (modelFuncionario){
				this.modelSelect = modelFuncionario; 
				this.onSelectModel(modelFuncionario);
			}
		},
		getJsonValue : function() {
			var ret = {}; 
			if(this.modelSelect){
				return this.modelSelect.toJSON();
			}
			return ret;
		},
		
		getValue : function() {
			return this.modelSelect;
		},
		
		getColumns : function() {
			var columns = [	

			{
				name : "matricula",
				editable : false,
				sortable : true,
				label 	 : "Matricula",
				cell 	 : "string",
			}, 
			{
				name : "nome",
				editable : false,
				sortable : true,
				label 	 : "Nome",
				cell 	 : "string",
			}, 
			{
				name : "telefone",
				editable : false,
				sortable : true,
				label 	 : "Telefone",
				cell 	 : "string",
			}, 
			{
				name : "telefone2",
				editable : false,
				sortable : true,
				label 	 : "Telefone 2",
				cell 	 : "string",
			}, 
			{
				name : "sexo",
				editable : false,
				sortable : true,
				label 	 : "Sexo",
				cell 	 : "string",
			}, 
			{
				name : "salario",
				editable : false,
				sortable : true,
				label 	 : "Salário",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "escolaridade",
				editable : false,
				sortable : true,
				label 	 : "Escolaridade",
				cell 	 : "string",
			}, 
			{
				name : "dataAdmissao",
				editable : false,
				sortable : true,
				label 	 : "Data  de Admissão",
				cell 	 : "string",
			}, 
			{
				name : "dataDemissao",
				editable : false,
				sortable : true,
				label 	 : "DataDemissao",
				cell 	 : "string",
			}, 
			{
				name : "valorHoraExtra",
				editable : false,
				sortable : true,
				label 	 : "ValorHoraExtra",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "carteiraTrabalho",
				editable : false,
				sortable : true,
				label 	 : "CarteiraTrabalho",
				cell 	 : "string",
			}, 
			{
				name : "rg",
				editable : false,
				sortable : true,
				label 	 : "Rg",
				cell 	 : "string",
			}, 
			{
				name : "rgOrgaoEmissor",
				editable : false,
				sortable : true,
				label 	 : "RgOrgaoEmissor",
				cell 	 : "string",
			}, 
			{
				name : "nomeBanco",
				editable : false,
				sortable : true,
				label 	 : "Banco",
				cell 	 : "string",
			}, 
			{
				name : "bancoNumeroAgencia",
				editable : false,
				sortable : true,
				label 	 : "Agência",
				cell 	 : "string",
			}, 
			{
				name : "bancoNumeroConta",
				editable : false,
				sortable : true,
				label 	 : "Conta",
				cell 	 : "string",
			}, 
			{
				name : "pis",
				editable : false,
				sortable : true,
				label 	 : "Pis",
				cell 	 : "string",
			}, 
			];
			return columns;
		},

		clearFields : function() {
			util.clear('inputModalId');
			util.clear('inputModalMatricula'); 
			util.clear('inputModalNome'); 
			util.clear('inputModalTelefone'); 
			util.clear('inputModalTelefone2'); 
			util.clear('inputModalSexo'); 
			util.clear('inputModalSalario'); 
			util.clear('inputModalEscolaridade'); 
			util.clear('inputModalDataAdmissao'); 
			util.clear('inputModalDataDemissao'); 
			util.clear('inputModalValorHoraExtra'); 
			util.clear('inputModalCarteiraTrabalho'); 
			util.clear('inputModalRg'); 
			util.clear('inputModalRgOrgaoEmissor'); 
			util.clear('inputModalNomeBanco'); 
			util.clear('inputModalBancoNumeroAgencia'); 
			util.clear('inputModalBancoNumeroConta'); 
			util.clear('inputModalPis'); 
			util.clear('inputModalCargo'); 					 	
			util.clear('inputModalCbo'); 					 	
			util.clear('inputModalDepartamento'); 					 	
			util.clear('inputModalFuncao'); 					 	
			util.scrollUpModal();
		},

		searchFuncionario : function() {
			this.funcionarioCollection.filterQueryParams = {
	    		matricula : util.escapeById('inputModalMatricula'),
	    		nome : util.escapeById('inputModalNome'),
	    		telefone : util.escapeById('inputModalTelefone'),
	    		telefone2 : util.escapeById('inputModalTelefone2'),
	    		sexo : util.escapeById('inputModalSexo'),
	    		salario : util.escapeById('inputModalSalario'),
	    		escolaridade : util.escapeById('inputModalEscolaridade'),
	    		dataAdmissao : util.escapeById('inputModalDataAdmissao'),
	    		dataDemissao : util.escapeById('inputModalDataDemissao'),
	    		valorHoraExtra : util.escapeById('inputModalValorHoraExtra'),
	    		carteiraTrabalho : util.escapeById('inputModalCarteiraTrabalho'),
	    		rg : util.escapeById('inputModalRg'),
	    		rgOrgaoEmissor : util.escapeById('inputModalRgOrgaoEmissor'),
	    		nomeBanco : util.escapeById('inputModalNomeBanco'),
	    		bancoNumeroAgencia : util.escapeById('inputModalBancoNumeroAgencia'),
	    		bancoNumeroConta : util.escapeById('inputModalBancoNumeroConta'),
	    		pis : util.escapeById('inputModalPis'),
			};

			this.funcionarioCollection.fetch({
				resetState : true,
				success : function(_coll, _resp, _opt) {
					//caso queira algum tratamento de sucesso adicional
				},
				error : function(_coll, _resp, _opt) {
					console.error(_coll, _resp, _opt)
				}
			});
		},

		hidePage : function() {
			this.ui.modalScreen.modal('hide');
		},

		showPage : function() {
			this.clearModal();

			this.ui.modalScreen.modal('show');
			this.funcionarioCollection.getFirstPage({
				success : function(_col, _resp, _opts) {
					//caso queira algum tratamento de sucesso adicional
				},
				error : function(_col, _resp, _opts) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				}
			});
		},

		clearModal : function() {
			this.clearFields();
			this.ui.form.get(0).reset();
			this.funcionarioCollection.reset();
		},
		
		// Executada depois da consulta concluida.
		stopFetch : function() {
			util.stopSpinner();
			util.scrollDownModal();
		},
		
		// Executada Antes da realização da consulta.
		startFetch : function() {
			util.showSpinner('spinFuncionario');
		},
	});

	return FuncionarioModal;
});
