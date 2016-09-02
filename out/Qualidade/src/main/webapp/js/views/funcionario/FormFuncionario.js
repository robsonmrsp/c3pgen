/* generated: 02/09/2016 16:23:48 */
define(function(require) {
	// Start "Import´s" Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Backgrid = require('adapters/backgrid-adapter');
	var util = require('utilities/utils');
	var Combobox = require('views/components/Combobox');

	var TemplateFormFuncionarios = require('text!views/funcionario/tpl/FormFuncionarioTemplate.html');
	var FuncionarioModel = require('models/FuncionarioModel');
	var FuncionarioCollection = require('collections/FuncionarioCollection');
	var CargoCollection = require('collections/CargoCollection');			
	var CboCollection = require('collections/CboCollection');			
	var DepartamentoCollection = require('collections/DepartamentoCollection');			
	var FuncaoCollection = require('collections/FuncaoCollection');			
	
	// End of "Import´s" definition

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨MAIN BODY¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var FormFuncionarios = Marionette.LayoutView.extend({
		template : _.template(TemplateFormFuncionarios),

		regions : {
		},

		events : {
			'click 	.save' : 'save',
			'click 	.saveAndContinue' : 'saveAndContinue',
		},
		
		ui : {
			inputId : '#inputId',
			inputMatricula : '#inputMatricula',
			inputFoto : '#inputFoto',
			inputNome : '#inputNome',
			inputTelefone : '#inputTelefone',
			inputTelefone2 : '#inputTelefone2',
			inputSexo : '#inputSexo',
			inputDataNascimento : '#inputDataNascimento',
			groupInputDataNascimento : '#groupInputDataNascimento',
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
			form : '#formFuncionario',
		},

		initialize : function() {
			var that = this;
			this.on('show', function() {
				this.ui.groupInputDataNascimento.datetimepicker({
					pickTime : false,
					language : 'pt_BR',
				});
				this.ui.inputDataNascimento.datetimepicker({
					pickTime : false,
					language : 'pt_BR',
				});
				this.ui.inputDataNascimento.mask('99/99/9999');
				this.ui.inputSalario.formatNumber(2);
				this.ui.inputValorHoraExtra.formatNumber(2);
				this.comboCargo = new Combobox({
					el : this.ui.inputCargo,
					comboId : 'id',
					comboVal : 'nome',
					collectionEntity : CargoCollection, 
				});
				this.comboCargo.setValue(this.model.get('cargo'));					
				this.comboCbo = new Combobox({
					el : this.ui.inputCbo,
					comboId : 'id',
					comboVal : 'nome',
					collectionEntity : CboCollection, 
				});
				this.comboCbo.setValue(this.model.get('cbo'));					
				this.comboDepartamento = new Combobox({
					el : this.ui.inputDepartamento,
					comboId : 'id',
					comboVal : 'nome',
					collectionEntity : DepartamentoCollection, 
				});
				this.comboDepartamento.setValue(this.model.get('departamento'));					
				this.comboFuncao = new Combobox({
					el : this.ui.inputFuncao,
					comboId : 'id',
					comboVal : 'nome',
					collectionEntity : FuncaoCollection, 
				});
				this.comboFuncao.setValue(this.model.get('funcao'));					
				this.ui.form.validationEngine('attach', {
					promptPosition : "topLeft",
					isOverflown : false,
					validationEventTrigger : "change"
				});
			});
		},

		saveAndContinue : function() {
			this.save(true)
		},

		save : function(continua) {
			var that = this;
			var funcionario = that._getModel();

			if (this._isValid()) {
				funcionario.save({}, {
					success : function(_model, _resp, _options) {
						util.showSuccessMessage('Funcionario salvo com sucesso!');
						that.clearForm();

						if (continua != true) {
							util.goPage('app/funcionarios');
						}
					},

					error : function(_model, _resp, _options) {
						util.showErrorMessage('Problema ao salvar registro',_resp);
					}
				});
			} else {
				util.showMessage('error', 'Verifique campos em destaque!');
			}
		},

		
		clearForm : function() {
			util.clear('inputId');
			util.clear('inputMatricula'); 
			util.clear('inputFoto'); 
			util.clear('inputNome'); 
			util.clear('inputTelefone'); 
			util.clear('inputTelefone2'); 
			util.clear('inputSexo'); 
			util.clear('inputDataNascimento'); 
			util.clear('inputSalario'); 
			util.clear('inputEscolaridade'); 
			util.clear('inputDataAdmissao'); 
			util.clear('inputDataDemissao'); 
			util.clear('inputValorHoraExtra'); 
			util.clear('inputCarteiraTrabalho'); 
			util.clear('inputRg'); 
			util.clear('inputRgOrgaoEmissor'); 
			util.clear('inputNomeBanco'); 
			util.clear('inputBancoNumeroAgencia'); 
			util.clear('inputBancoNumeroConta'); 
			util.clear('inputPis'); 
			util.clear('inputCargo'); 					 	
			util.clear('inputCbo'); 					 	
			util.clear('inputDepartamento'); 					 	
			util.clear('inputFuncao'); 					 	
		},

		possuiCamposInvalidos : function() {
			return util.hasInvalidFields(this.validateFields);
		},

		_isValid : function() {
			return this.ui.form.validationEngine('validate', {
				promptPosition : "topLeft",
				isOverflown : false,
				validationEventTrigger : "change"
			});
		},

		_getModel : function() {
			var that = this;
			var funcionario = that.model; 
			funcionario.set({
				id: util.escapeById('inputId') || null,
		    	matricula : util.escapeById('inputMatricula'), 
				
		    	foto : util.escapeById('inputFoto'), 
				
		    	nome : util.escapeById('inputNome'), 
				
		    	telefone : util.escapeById('inputTelefone'), 
				
		    	telefone2 : util.escapeById('inputTelefone2'), 
				
		    	sexo : util.escapeById('inputSexo'), 
				
		    	dataNascimento : util.escapeById('inputDataNascimento'), 
				
		    	salario : util.escapeById('inputSalario', true), 
				
		    	escolaridade : util.escapeById('inputEscolaridade'), 
				
		    	dataAdmissao : util.escapeById('inputDataAdmissao'), 
				
		    	dataDemissao : util.escapeById('inputDataDemissao'), 
				
		    	valorHoraExtra : util.escapeById('inputValorHoraExtra', true), 
				
		    	carteiraTrabalho : util.escapeById('inputCarteiraTrabalho'), 
				
		    	rg : util.escapeById('inputRg'), 
				
		    	rgOrgaoEmissor : util.escapeById('inputRgOrgaoEmissor'), 
				
		    	nomeBanco : util.escapeById('inputNomeBanco'), 
				
		    	bancoNumeroAgencia : util.escapeById('inputBancoNumeroAgencia'), 
				
		    	bancoNumeroConta : util.escapeById('inputBancoNumeroConta'), 
				
		    	pis : util.escapeById('inputPis'), 
				
					cargo :  that.comboCargo.getJsonValue(),
					cbo :  that.comboCbo.getJsonValue(),
					departamento :  that.comboDepartamento.getJsonValue(),
					funcao :  that.comboFuncao.getJsonValue(),
			});
			return funcionario;
		},
		 
		_getCargo : function() {
			var id =  this.comboCargo.getRawValue();			
			
			if(id){
				return {
					id: id,
				}
			}
			return null;
		},				
		_getCbo : function() {
			var id =  this.comboCbo.getRawValue();			
			
			if(id){
				return {
					id: id,
				}
			}
			return null;
		},				
		_getDepartamento : function() {
			var id =  this.comboDepartamento.getRawValue();			
			
			if(id){
				return {
					id: id,
				}
			}
			return null;
		},				
		_getFuncao : function() {
			var id =  this.comboFuncao.getRawValue();			
			
			if(id){
				return {
					id: id,
				}
			}
			return null;
		},				
		
				
		
	});

	return FormFuncionarios;
});