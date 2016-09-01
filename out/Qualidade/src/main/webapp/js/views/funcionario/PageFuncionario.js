/* generated: 01/09/2016 17:25:05 */
define(function(require) {
	// Start "Import´s Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Backgrid = require('adapters/backgrid-adapter');
	var util = require('utilities/utils');
	var Combobox = require('views/components/Combobox');
	var CustomStringCell = require('views/components/CustomStringCell');
	var Counter = require('views/components/Counter');
	var ActionsCell = require('views/components/ActionsCell');
	var GeneralActionsCell = require('views/components/GeneralActionsCell');

	var CustomNumberCell = require('views/components/CustomNumberCell');

	var TemplateFormFuncionarios = require('text!views/funcionario/tpl/FormFuncionarioTemplate.html');
	var FuncionarioModel = require('models/FuncionarioModel');
	var FuncionarioCollection = require('collections/FuncionarioCollection');
	var FuncionarioPageCollection = require('collections/FuncionarioPageCollection');
	var PageFuncionarioTemplate = require('text!views/funcionario/tpl/PageFuncionarioTemplate.html');
	
	//Filter import
	var CargoCollection = require('collections/CargoCollection');			
	var CboCollection = require('collections/CboCollection');			
	var DepartamentoCollection = require('collections/DepartamentoCollection');			
	var FuncaoCollection = require('collections/FuncaoCollection');			
	
	// End of "Import´s" definition

	var PageFuncionario = Marionette.LayoutView.extend({
		template : _.template(PageFuncionarioTemplate),

		regions : {
			gridRegion : '#grid',
			counterRegion : '#counter',
			paginatorRegion : '#paginator',
		},
		
		events : {
			'click 	#query' : '_queryFuncionario',			
			'click 	#reset' : '_resetFuncionario',			
			'keypress' : 'treatKeypress',
		},
		
		
		ui : {
			inputMatricula : '#inputMatricula',
			inputNome : '#inputNome',
			inputTelefone : '#inputTelefone',
			inputTelefone2 : '#inputTelefone2',
			inputSexo : '#inputSexo',
			inputSalario : '#inputSalario',
			inputEscolaridade : '#inputEscolaridade',
			inputDataAdmissao : '#inputDataAdmissao',
			inputDataDemissao : '#inputDataDemissao',
			inputValorHoraExtra : '#inputValorHoraExtra',
			inputCarteiraTrabalho : '#inputCarteiraTrabalho',
			inputRg : '#inputRg',
			inputRgOrgaoEmissor : '#inputRgOrgaoEmissor',
			inputNomeBanco : '#inputNomeBanco',
			inputBancoNumeroAgencia : '#inputBancoNumeroAgencia',
			inputBancoNumeroConta : '#inputBancoNumeroConta',
			inputPis : '#inputPis',
		
			inputCargo : '#inputCargo', 
			inputCbo : '#inputCbo', 
			inputDepartamento : '#inputDepartamento', 
			inputFuncao : '#inputFuncao', 
			form : '#formFuncionarioFilter',
		},
		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this._queryFuncionario();
	    	}
		},

		initialize : function() {
			var that = this;

			this.funcionarios = new FuncionarioPageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.funcionarios
			});

			this.counter = new Counter({
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
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')) );
				}
			});
			this.on('show', function() {
				that.gridRegion.show(that.grid);
				that.counterRegion.show(that.counter);
				that.paginatorRegion.show(that.paginator);
				this.ui.inputSalario.formatNumber(2);
				this.ui.inputValorHoraExtra.formatNumber(2);
		
				var comboCargo = new Combobox({
					el : this.ui.inputCargo,
					comboId : 'id',
					comboVal : 'nome',
					collectionEntity : CargoCollection,
				});
				var comboCbo = new Combobox({
					el : this.ui.inputCbo,
					comboId : 'id',
					comboVal : 'nome',
					collectionEntity : CboCollection,
				});
				var comboDepartamento = new Combobox({
					el : this.ui.inputDepartamento,
					comboId : 'id',
					comboVal : 'nome',
					collectionEntity : DepartamentoCollection,
				});
				var comboFuncao = new Combobox({
					el : this.ui.inputFuncao,
					comboId : 'id',
					comboVal : 'nome',
					collectionEntity : FuncaoCollection,
				});
			});
		},
		 
		_queryFuncionario : function(){
			var that = this;

			this.funcionarios.filterQueryParams = {
	    		matricula : util.escapeById('inputMatricula'),
	    		nome : util.escapeById('inputNome'),
	    		telefone : util.escapeById('inputTelefone'),
	    		telefone2 : util.escapeById('inputTelefone2'),
	    		sexo : util.escapeById('inputSexo'),
	    		salario : util.escapeById('inputSalario'),
	    		escolaridade : util.escapeById('inputEscolaridade'),
	    		dataAdmissao : util.escapeById('inputDataAdmissao'),
	    		dataDemissao : util.escapeById('inputDataDemissao'),
	    		valorHoraExtra : util.escapeById('inputValorHoraExtra'),
	    		carteiraTrabalho : util.escapeById('inputCarteiraTrabalho'),
	    		rg : util.escapeById('inputRg'),
	    		rgOrgaoEmissor : util.escapeById('inputRgOrgaoEmissor'),
	    		nomeBanco : util.escapeById('inputNomeBanco'),
	    		bancoNumeroAgencia : util.escapeById('inputBancoNumeroAgencia'),
	    		bancoNumeroConta : util.escapeById('inputBancoNumeroConta'),
	    		pis : util.escapeById('inputPis'),
			    cargo : util.escapeById('inputCargo'), 
			    cbo : util.escapeById('inputCbo'), 
			    departamento : util.escapeById('inputDepartamento'), 
			    funcao : util.escapeById('inputFuncao'), 
			}
			this.funcionarios.fetch({
				success : function(_coll, _resp, _opt) {
					console.info('Consulta para o grid funcionario');
				},
				error : function(_coll, _resp, _opt) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				},
				complete : function() {
					
				},
			})		
		},
		_resetFuncionario : function(){
			this.ui.form.get(0).reset();
			this.funcionarios.reset();
		},
				
		_getColumns : function() {
			var that = this;
			var columns = [
			//{
			//	name : "id",
			//	label : "id",
			//	editable : false,
			//	cell : Backgrid.IntegerCell.extend({
			//		orderSeparator : ''
			//	})
			//}, 
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
			{
				name : "acoes",
				label : "Ações(Editar, Deletar)",
				sortable : false,
				cell : GeneralActionsCell.extend({
					buttons : that._getCellButtons(),
					context : that,
				})
			} ];
			return columns;
		},
		
		_getCellButtons : function() {
			var that = this;
			var buttons = [];

			buttons.push({
				id : 'edita_ficha_button',
				type : 'primary',
				icon : 'icon-pencil',
				hint : 'Editar Funcionario',
				onClick : that.editModel,
			}, {
				id : 'delete_button',
				type : 'danger',
				icon : 'icon-trash',
				hint : 'Delete Funcionario',
				onClick : that.deleteModel,
			});

			return buttons;
		},

		deleteModel : function(model) {
			var that = this;
			
			var modelTipo = new FuncionarioModel({
				id : model.id,
			});
			
			util.Bootbox.confirm("Tem certeza que deseja remover o registro [ " + model.get('id') + " ] ?", function(yes) {
				if (yes) {
					modelTipo.destroy({
						success : function() {
							that.funcionarios.remove(model);
							util.showSuccessMessage('Funcionario removido com sucesso!');
						},
						error : function(_model, _resp) {
							util.showErrorMessage('Problema ao remover o registro',_resp);
						}
					});
				}
			});
		},

		editModel : function(model) {
			util.goPage("app/editFuncionario/" + model.get('id'));
		},

		

	});

	return PageFuncionario;
});
