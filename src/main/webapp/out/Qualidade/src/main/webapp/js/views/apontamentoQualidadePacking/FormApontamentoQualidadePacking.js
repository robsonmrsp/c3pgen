/* generated: 24/09/2016 11:56:32 */
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

	var TemplateFormApontamentoQualidadePackings = require('text!views/apontamentoQualidadePacking/tpl/FormApontamentoQualidadePackingTemplate.html');
	var ApontamentoQualidadePackingModel = require('models/ApontamentoQualidadePackingModel');
	var ApontamentoQualidadePackingCollection = require('collections/ApontamentoQualidadePackingCollection');
	var IntegerCollection = require('collections/IntegerCollection');
	var IntegerCollection = require('collections/IntegerCollection');
	var IntegerCollection = require('collections/IntegerCollection');
	var IntegerCollection = require('collections/IntegerCollection');
	var IntegerCollection = require('collections/IntegerCollection');
	var StringCollection = require('collections/StringCollection');
	var IntegerCollection = require('collections/IntegerCollection');
	var IntegerCollection = require('collections/IntegerCollection');
	var IntegerCollection = require('collections/IntegerCollection');
	var IntegerCollection = require('collections/IntegerCollection');
	var BolsaoCollection = require('collections/BolsaoCollection');			
	var GeneradorCollection = require('collections/GeneradorCollection');			
	var CargoCollection = require('collections/CargoCollection');			
	var VariedadeCollection = require('collections/VariedadeCollection');			
	var LatadaCollection = require('collections/LatadaCollection');			
	var EmbalagemCollection = require('collections/EmbalagemCollection');			
	var CabineCollection = require('collections/CabineCollection');			
	var SacolaCollection = require('collections/SacolaCollection');			
	var ClienteCollection = require('collections/ClienteCollection');			
	var PackingCollection = require('collections/PackingCollection');			
	
	// End of "Import´s" definition

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨MAIN BODY¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var FormApontamentoQualidadePackings = Marionette.LayoutView.extend({
		template : _.template(TemplateFormApontamentoQualidadePackings),

		regions : {
		},

		events : {
			'click 	.save' : 'save',
			'click 	.saveAndContinue' : 'saveAndContinue',
		},
		
		ui : {
			inputId : '#inputId',
			inputTipoControle : '#inputTipoControle',
			inputCor : '#inputCor',
			inputClassificacao : '#inputClassificacao',
			inputQualidade : '#inputQualidade',
			inputCondicao : '#inputCondicao',
			inputPallet : '#inputPallet',
			inputDataAnalise : '#inputDataAnalise',
			groupInputDataAnalise : '#groupInputDataAnalise',
			inputDataColheita : '#inputDataColheita',
			groupInputDataColheita : '#groupInputDataColheita',
			inputAparencia : '#inputAparencia',
			inputDiametroMinimo : '#inputDiametroMinimo',
			inputDiametroMaximo : '#inputDiametroMaximo',
			inputDiametroMedio : '#inputDiametroMedio',
			inputBrixMinimo : '#inputBrixMinimo',
			inputBrixMaximo : '#inputBrixMaximo',
			inputBrixMedio : '#inputBrixMedio',
			inputPesoCachoMinimo : '#inputPesoCachoMinimo',
			inputPesoCachoMaximo : '#inputPesoCachoMaximo',
			inputPesoSacolaMinimo : '#inputPesoSacolaMinimo',
			inputPesoSacolaMaximo : '#inputPesoSacolaMaximo',
			inputNumeroCachoSacola : '#inputNumeroCachoSacola',
			inputNumeroSacola : '#inputNumeroSacola',
			inputPesoCumbucaMinimo : '#inputPesoCumbucaMinimo',
			inputPesoCumbucaMaximo : '#inputPesoCumbucaMaximo',
			inputNumeroCachosCumbuca : '#inputNumeroCachosCumbuca',
			inputNumeroCumbucas : '#inputNumeroCumbucas',
			inputPesoBruto : '#inputPesoBruto',
			inputPesoLiquido : '#inputPesoLiquido',
			inputCorposEstranhos : '#inputCorposEstranhos',
			inputBagasAquosas : '#inputBagasAquosas',
			inputBagasCristalinas : '#inputBagasCristalinas',
			inputFirmeza : '#inputFirmeza',
			inputDanos : '#inputDanos',
			inputPragas : '#inputPragas',
			inputDoencas : '#inputDoencas',
			inputAparenciaEngaco : '#inputAparenciaEngaco',
			inputDesgrana : '#inputDesgrana',
			inputPodridao : '#inputPodridao',
			inputCicatrizes : '#inputCicatrizes',
			inputRachaduras : '#inputRachaduras',
			inputRachadurasCampo : '#inputRachadurasCampo',
			inputAmolecimento : '#inputAmolecimento',
			inputObservacao : '#inputObservacao',
			inputDataHora : '#inputDataHora',
		
			inputBolsao : '#inputBolsao', 
			inputGenerador : '#inputGenerador', 
			inputCargo : '#inputCargo', 
			inputVariedade : '#inputVariedade', 
			inputLatada : '#inputLatada', 
			inputEmbalagem : '#inputEmbalagem', 
			inputCabine : '#inputCabine', 
			inputSacola : '#inputSacola', 
			inputCliente : '#inputCliente', 
			inputPacking : '#inputPacking', 
			form : '#formApontamentoQualidadePacking',
		},

		initialize : function() {
			var that = this;
			this.on('show', function() {
				this.ui.inputTipoControle.formatNumber(2);
				this.comboTipoControle = new Combobox({
					el : this.ui.inputTipoControle,
					comboId : 'id',
					comboVal : 'name',
					collectionEntity : IntegerCollection, 
				});
				this.comboTipoControle.setValue(this.model.get('tipoControle'));//getJsonValue
				this.ui.inputCor.formatNumber(2);
				this.comboCor = new Combobox({
					el : this.ui.inputCor,
					comboId : 'id',
					comboVal : 'name',
					collectionEntity : IntegerCollection, 
				});
				this.comboCor.setValue(this.model.get('cor'));//getJsonValue
				this.ui.inputClassificacao.formatNumber(2);
				this.comboClassificacao = new Combobox({
					el : this.ui.inputClassificacao,
					comboId : 'id',
					comboVal : 'name',
					collectionEntity : IntegerCollection, 
				});
				this.comboClassificacao.setValue(this.model.get('classificacao'));//getJsonValue
				this.ui.inputQualidade.formatNumber(2);
				this.comboQualidade = new Combobox({
					el : this.ui.inputQualidade,
					comboId : 'id',
					comboVal : 'name',
					collectionEntity : IntegerCollection, 
				});
				this.comboQualidade.setValue(this.model.get('qualidade'));//getJsonValue
				this.ui.inputCondicao.formatNumber(2);
				this.comboCondicao = new Combobox({
					el : this.ui.inputCondicao,
					comboId : 'id',
					comboVal : 'name',
					collectionEntity : IntegerCollection, 
				});
				this.comboCondicao.setValue(this.model.get('condicao'));//getJsonValue
				this.comboPallet = new Combobox({
					el : this.ui.inputPallet,
					comboId : 'id',
					comboVal : 'name',
					collectionEntity : StringCollection, 
				});
				this.comboPallet.setValue(this.model.get('pallet'));//getJsonValue
				this.ui.groupInputDataAnalise.datetimepicker({
					pickTime : false,
					language : 'pt_BR',
				});
				this.ui.inputDataAnalise.datetimepicker({
					pickTime : false,
					language : 'pt_BR',
				});
				this.ui.inputDataAnalise.mask('99/99/9999');
				this.ui.groupInputDataColheita.datetimepicker({
					pickTime : false,
					language : 'pt_BR',
				});
				this.ui.inputDataColheita.datetimepicker({
					pickTime : false,
					language : 'pt_BR',
				});
				this.ui.inputDataColheita.mask('99/99/9999');
				this.ui.inputAparencia.formatNumber(2);
				this.comboAparencia = new Combobox({
					el : this.ui.inputAparencia,
					comboId : 'id',
					comboVal : 'name',
					collectionEntity : IntegerCollection, 
				});
				this.comboAparencia.setValue(this.model.get('aparencia'));//getJsonValue
				this.ui.inputDiametroMinimo.formatNumber(2);
				this.ui.inputDiametroMaximo.formatNumber(2);
				this.ui.inputDiametroMedio.formatNumber(2);
				this.ui.inputBrixMinimo.formatNumber(2);
				this.ui.inputBrixMaximo.formatNumber(2);
				this.ui.inputBrixMedio.formatNumber(2);
				this.ui.inputPesoCachoMinimo.formatNumber(2);
				this.ui.inputPesoCachoMaximo.formatNumber(2);
				this.ui.inputPesoSacolaMinimo.formatNumber(2);
				this.ui.inputPesoSacolaMaximo.formatNumber(2);
				this.ui.inputNumeroCachoSacola.formatNumber(2);
				this.ui.inputNumeroSacola.formatNumber(2);
				this.ui.inputPesoCumbucaMinimo.formatNumber(2);
				this.ui.inputPesoCumbucaMaximo.formatNumber(2);
				this.ui.inputNumeroCachosCumbuca.formatNumber(2);
				this.ui.inputNumeroCumbucas.formatNumber(2);
				this.ui.inputPesoBruto.formatNumber(2);
				this.ui.inputPesoLiquido.formatNumber(2);
				this.ui.inputCorposEstranhos.formatNumber(2);
				this.comboCorposEstranhos = new Combobox({
					el : this.ui.inputCorposEstranhos,
					comboId : 'id',
					comboVal : 'name',
					collectionEntity : IntegerCollection, 
				});
				this.comboCorposEstranhos.setValue(this.model.get('corposEstranhos'));//getJsonValue
				this.ui.inputBagasAquosas.formatNumber(2);
				this.ui.inputBagasCristalinas.formatNumber(2);
				this.ui.inputFirmeza.formatNumber(2);
				this.comboFirmeza = new Combobox({
					el : this.ui.inputFirmeza,
					comboId : 'id',
					comboVal : 'name',
					collectionEntity : IntegerCollection, 
				});
				this.comboFirmeza.setValue(this.model.get('firmeza'));//getJsonValue
				this.ui.inputDanos.formatNumber(2);
				this.ui.inputPragas.formatNumber(2);
				this.ui.inputDoencas.formatNumber(2);
				this.ui.inputAparenciaEngaco.formatNumber(2);
				this.comboAparenciaEngaco = new Combobox({
					el : this.ui.inputAparenciaEngaco,
					comboId : 'id',
					comboVal : 'name',
					collectionEntity : IntegerCollection, 
				});
				this.comboAparenciaEngaco.setValue(this.model.get('aparenciaEngaco'));//getJsonValue
				this.ui.inputDesgrana.formatNumber(2);
				this.ui.inputPodridao.formatNumber(2);
				this.ui.inputCicatrizes.formatNumber(2);
				this.ui.inputRachaduras.formatNumber(2);
				this.ui.inputRachadurasCampo.formatNumber(2);
				this.ui.inputAmolecimento.formatNumber(2);
				this.comboBolsao = new Combobox({
					el : this.ui.inputBolsao,
					comboId : 'id',
					comboVal : 'nome',
					collectionEntity : BolsaoCollection, 
				});
					
				this.comboGenerador = new Combobox({
					el : this.ui.inputGenerador,
					comboId : 'id',
					comboVal : 'nome',
					collectionEntity : GeneradorCollection, 
				});
				this.comboCargo = new Combobox({
					el : this.ui.inputCargo,
					comboId : 'id',
					comboVal : 'nome',
					collectionEntity : CargoCollection, 
				});
				this.comboCargo.setValue(this.model.get('cargo'));					
				this.comboVariedade = new Combobox({
					el : this.ui.inputVariedade,
					comboId : 'id',
					comboVal : 'nome',
					collectionEntity : VariedadeCollection, 
				});
				this.comboVariedade.setValue(this.model.get('variedade'));					
				this.comboLatada = new Combobox({
					el : this.ui.inputLatada,
					comboId : 'id',
					comboVal : 'nome',
					collectionEntity : LatadaCollection, 
				});
				this.comboEmbalagem = new Combobox({
					el : this.ui.inputEmbalagem,
					comboId : 'id',
					comboVal : 'nome',
					collectionEntity : EmbalagemCollection, 
				});
				this.comboEmbalagem.setValue(this.model.get('embalagem'));					
				this.comboCabine = new Combobox({
					el : this.ui.inputCabine,
					comboId : 'id',
					comboVal : 'nome',
					collectionEntity : CabineCollection, 
				});
				this.comboSacola = new Combobox({
					el : this.ui.inputSacola,
					comboId : 'id',
					comboVal : 'nome',
					collectionEntity : SacolaCollection, 
				});
				this.comboCliente = new Combobox({
					el : this.ui.inputCliente,
					comboId : 'id',
					comboVal : 'nome',
					collectionEntity : ClienteCollection, 
				});
				this.comboCliente.setValue(this.model.get('cliente'));					
				this.comboPacking = new Combobox({
					el : this.ui.inputPacking,
					comboId : 'id',
					comboVal : 'nome',
					collectionEntity : PackingCollection, 
				});
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
			var apontamentoQualidadePacking = that.getModel();

			if (this.isValid()) {
				apontamentoQualidadePacking.save({}, {
					success : function(_model, _resp, _options) {
						util.showSuccessMessage('Apontamento qualidade packing salvo com sucesso!');
						that.clearForm();

						if (continua != true) {
							util.goPage('app/apontamentoQualidadePackings');
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
			util.clear('inputTipoControle'); 
			util.clear('inputCor'); 
			util.clear('inputClassificacao'); 
			util.clear('inputQualidade'); 
			util.clear('inputCondicao'); 
			util.clear('inputPallet'); 
			util.clear('inputDataAnalise'); 
			util.clear('inputDataColheita'); 
			util.clear('inputAparencia'); 
			util.clear('inputDiametroMinimo'); 
			util.clear('inputDiametroMaximo'); 
			util.clear('inputDiametroMedio'); 
			util.clear('inputBrixMinimo'); 
			util.clear('inputBrixMaximo'); 
			util.clear('inputBrixMedio'); 
			util.clear('inputPesoCachoMinimo'); 
			util.clear('inputPesoCachoMaximo'); 
			util.clear('inputPesoSacolaMinimo'); 
			util.clear('inputPesoSacolaMaximo'); 
			util.clear('inputNumeroCachoSacola'); 
			util.clear('inputNumeroSacola'); 
			util.clear('inputPesoCumbucaMinimo'); 
			util.clear('inputPesoCumbucaMaximo'); 
			util.clear('inputNumeroCachosCumbuca'); 
			util.clear('inputNumeroCumbucas'); 
			util.clear('inputPesoBruto'); 
			util.clear('inputPesoLiquido'); 
			util.clear('inputCorposEstranhos'); 
			util.clear('inputBagasAquosas'); 
			util.clear('inputBagasCristalinas'); 
			util.clear('inputFirmeza'); 
			util.clear('inputDanos'); 
			util.clear('inputPragas'); 
			util.clear('inputDoencas'); 
			util.clear('inputAparenciaEngaco'); 
			util.clear('inputDesgrana'); 
			util.clear('inputPodridao'); 
			util.clear('inputCicatrizes'); 
			util.clear('inputRachaduras'); 
			util.clear('inputRachadurasCampo'); 
			util.clear('inputAmolecimento'); 
			util.clear('inputObservacao'); 
			util.clear('inputDataHora'); 
			util.clear('inputBolsao'); 					 	
			util.clear('inputGenerador'); 					 	
			util.clear('inputCargo'); 					 	
			util.clear('inputVariedade'); 					 	
			util.clear('inputLatada'); 					 	
			util.clear('inputEmbalagem'); 					 	
			util.clear('inputCabine'); 					 	
			util.clear('inputSacola'); 					 	
			util.clear('inputCliente'); 					 	
			util.clear('inputPacking'); 					 	
		},

		possuiCamposInvalidos : function() {
			return util.hasInvalidFields(this.validateFields);
		},

		isValid : function() {
			return this.ui.form.validationEngine('validate', {
				promptPosition : "topLeft",
				isOverflown : false,
				validationEventTrigger : "change"
			});
		},

		getModel : function() {
			var that = this;
			var apontamentoQualidadePacking = that.model; 
			apontamentoQualidadePacking.set({
				id: util.escapeById('inputId') || null,
		    	tipoControle : util.escapeById('inputTipoControle', true), 
				
		    	cor : util.escapeById('inputCor', true), 
				
		    	classificacao : util.escapeById('inputClassificacao', true), 
				
		    	qualidade : util.escapeById('inputQualidade', true), 
				
		    	condicao : util.escapeById('inputCondicao', true), 
				
		    	pallet : util.escapeById('inputPallet'), 
				
		    	dataAnalise : util.escapeById('inputDataAnalise'), 
				
		    	dataColheita : util.escapeById('inputDataColheita'), 
				
		    	aparencia : util.escapeById('inputAparencia', true), 
				
		    	diametroMinimo : util.escapeById('inputDiametroMinimo', true), 
				
		    	diametroMaximo : util.escapeById('inputDiametroMaximo', true), 
				
		    	diametroMedio : util.escapeById('inputDiametroMedio', true), 
				
		    	brixMinimo : util.escapeById('inputBrixMinimo', true), 
				
		    	brixMaximo : util.escapeById('inputBrixMaximo', true), 
				
		    	brixMedio : util.escapeById('inputBrixMedio', true), 
				
		    	pesoCachoMinimo : util.escapeById('inputPesoCachoMinimo', true), 
				
		    	pesoCachoMaximo : util.escapeById('inputPesoCachoMaximo', true), 
				
		    	pesoSacolaMinimo : util.escapeById('inputPesoSacolaMinimo', true), 
				
		    	pesoSacolaMaximo : util.escapeById('inputPesoSacolaMaximo', true), 
				
		    	numeroCachoSacola : util.escapeById('inputNumeroCachoSacola', true), 
				
		    	numeroSacola : util.escapeById('inputNumeroSacola', true), 
				
		    	pesoCumbucaMinimo : util.escapeById('inputPesoCumbucaMinimo', true), 
				
		    	pesoCumbucaMaximo : util.escapeById('inputPesoCumbucaMaximo', true), 
				
		    	numeroCachosCumbuca : util.escapeById('inputNumeroCachosCumbuca', true), 
				
		    	numeroCumbucas : util.escapeById('inputNumeroCumbucas', true), 
				
		    	pesoBruto : util.escapeById('inputPesoBruto', true), 
				
		    	pesoLiquido : util.escapeById('inputPesoLiquido', true), 
				
		    	corposEstranhos : util.escapeById('inputCorposEstranhos', true), 
				
		    	bagasAquosas : util.escapeById('inputBagasAquosas', true), 
				
		    	bagasCristalinas : util.escapeById('inputBagasCristalinas', true), 
				
		    	firmeza : util.escapeById('inputFirmeza', true), 
				
		    	danos : util.escapeById('inputDanos', true), 
				
		    	pragas : util.escapeById('inputPragas', true), 
				
		    	doencas : util.escapeById('inputDoencas', true), 
				
		    	aparenciaEngaco : util.escapeById('inputAparenciaEngaco', true), 
				
		    	desgrana : util.escapeById('inputDesgrana', true), 
				
		    	podridao : util.escapeById('inputPodridao', true), 
				
		    	cicatrizes : util.escapeById('inputCicatrizes', true), 
				
		    	rachaduras : util.escapeById('inputRachaduras', true), 
				
		    	rachadurasCampo : util.escapeById('inputRachadurasCampo', true), 
				
		    	amolecimento : util.escapeById('inputAmolecimento', true), 
				
		    	observacao : util.escapeById('inputObservacao'), 
				
		    	dataHora : util.escapeById('inputDataHora'), 
				
					bolsao :  that.comboBolsao.getJsonValue(),
					generador :  that.comboGenerador.getJsonValue(),
					cargo :  that.comboCargo.getJsonValue(),
					variedade :  that.comboVariedade.getJsonValue(),
					latada :  that.comboLatada.getJsonValue(),
					embalagem :  that.comboEmbalagem.getJsonValue(),
					cabine :  that.comboCabine.getJsonValue(),
					sacola :  that.comboSacola.getJsonValue(),
					cliente :  that.comboCliente.getJsonValue(),
					packing :  that.comboPacking.getJsonValue(),
			});
			return apontamentoQualidadePacking;
		},
		 
		getBolsao : function() {
			var id =  this.comboBolsao.getRawValue();			
			
			if(id){
				return {
					id: id,
				}
			}
			return null;
		},				
		getGenerador : function() {
			var id =  this.comboGenerador.getRawValue();			
			
			if(id){
				return {
					id: id,
				}
			}
			return null;
		},				
		getCargo : function() {
			var id =  this.comboCargo.getRawValue();			
			
			if(id){
				return {
					id: id,
				}
			}
			return null;
		},				
		getVariedade : function() {
			var id =  this.comboVariedade.getRawValue();			
			
			if(id){
				return {
					id: id,
				}
			}
			return null;
		},				
		getLatada : function() {
			var id =  this.comboLatada.getRawValue();			
			
			if(id){
				return {
					id: id,
				}
			}
			return null;
		},				
		getEmbalagem : function() {
			var id =  this.comboEmbalagem.getRawValue();			
			
			if(id){
				return {
					id: id,
				}
			}
			return null;
		},				
		getCabine : function() {
			var id =  this.comboCabine.getRawValue();			
			
			if(id){
				return {
					id: id,
				}
			}
			return null;
		},				
		getSacola : function() {
			var id =  this.comboSacola.getRawValue();			
			
			if(id){
				return {
					id: id,
				}
			}
			return null;
		},				
		getCliente : function() {
			var id =  this.comboCliente.getRawValue();			
			
			if(id){
				return {
					id: id,
				}
			}
			return null;
		},				
		getPacking : function() {
			var id =  this.comboPacking.getRawValue();			
			
			if(id){
				return {
					id: id,
				}
			}
			return null;
		},				
		
				
		
	});

	return FormApontamentoQualidadePackings;
});