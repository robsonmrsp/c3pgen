/* generated: 24/09/2016 12:52:33 */
define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Util = require('utilities/Utils');
	var Waves = require('waves');

	var FloatButtonSave = require('views/components/FloatButtonSave');
	var Combobox = require('views/components/Combobox');

	var TemplateFormApontamentoQualidadePackings = require('text!views/apontamentoQualidadePacking/tpl/FormApontamentoQualidadePackingTemplate.html');
	var ApontamentoQualidadePackingModel = require('models/ApontamentoQualidadePackingModel');
	var ApontamentoQualidadePackingCollection = require('collections/ApontamentoQualidadePackingCollection');

	var VariedadeCollection = require('collections/VariedadeCollection');			
	
	// End of "Import´s" definition
	var FormApontamentoQualidadePackings = Marionette.LayoutView.extend({
		template : _.template(TemplateFormApontamentoQualidadePackings),

		regions : {
			floatButtonSaveRegion : '#floatButtonSave',
		},

		events : {
		},
		
		ui : {
			inputId : '#inputId',
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
			inputBolsaoId : '#inputBolsaoId',
			inputBolsaoNome : '#inputBolsaoNome',
			inputGeneradorId : '#inputGeneradorId',
			inputGeneradorNome : '#inputGeneradorNome',
			inputCorId : '#inputCorId',
			inputCorNome : '#inputCorNome',
			inputCargoId : '#inputCargoId',
			inputCargoNome : '#inputCargoNome',
			inputVariedade : '#inputVariedade', 
			inputLatadaId : '#inputLatadaId',
			inputLatadaNome : '#inputLatadaNome',
			inputEmbalagemId : '#inputEmbalagemId',
			inputEmbalagemNome : '#inputEmbalagemNome',
			inputCabineId : '#inputCabineId',
			inputCabineNome : '#inputCabineNome',
			inputSacolaId : '#inputSacolaId',
			inputSacolaNome : '#inputSacolaNome',
			inputClienteId : '#inputClienteId',
			inputClienteNome : '#inputClienteNome',
			inputPackingId : '#inputPackingId',
			inputPackingNome : '#inputPackingNome',

		},

		initialize : function() {
			var that = this;

			this.floatButtonSave = new FloatButtonSave({});
			
			this.floatButtonSave.setOnClickSave(function() {
				var apontamentoQualidadePacking = that._getModel();
				apontamentoQualidadePacking.save();
				console.info('apontamentoQualidadePacking  Salvo com sucesso');
				Util.goPage('app/apontamentoQualidadePackings', true);
			});
			
			this.floatButtonSave.setOnClickCancel(function() {
				Util.goPage('app/apontamentoQualidadePacking', true);
			});
			
			this.on('show', function() {
				this.floatButtonSaveRegion.show(this.floatButtonSave);
				
				
			this.comboVariedade = new Combobox({
				el : this.ui.inputVariedade,
				comboId : 'id',
				comboVal : 'name',
				collectionEntity : VariedadeCollection, 
			});
			this.comboVariedade.setValue(this.model.get('variedade'));					
				
			})
		},
		

		saveAndContinue : function() {
			this.save(true)
		},

		clearForm : function() {
			Util.clear('inputId');
			Util.clear('inputAparencia'); 
			Util.clear('inputDiametroMinimo'); 
			Util.clear('inputDiametroMaximo'); 
			Util.clear('inputDiametroMedio'); 
			Util.clear('inputBrixMinimo'); 
			Util.clear('inputBrixMaximo'); 
			Util.clear('inputBrixMedio'); 
			Util.clear('inputPesoCachoMinimo'); 
			Util.clear('inputPesoCachoMaximo'); 
			Util.clear('inputPesoSacolaMinimo'); 
			Util.clear('inputPesoSacolaMaximo'); 
			Util.clear('inputNumeroCachoSacola'); 
			Util.clear('inputNumeroSacola'); 
			Util.clear('inputPesoCumbucaMinimo'); 
			Util.clear('inputPesoCumbucaMaximo'); 
			Util.clear('inputNumeroCachosCumbuca'); 
			Util.clear('inputNumeroCumbucas'); 
			Util.clear('inputPesoBruto'); 
			Util.clear('inputPesoLiquido'); 
			Util.clear('inputCorposEstranhos'); 
			Util.clear('inputBagasAquosas'); 
			Util.clear('inputBagasCristalinas'); 
			Util.clear('inputFirmeza'); 
			Util.clear('inputDanos'); 
			Util.clear('inputPragas'); 
			Util.clear('inputDoencas'); 
			Util.clear('inputAparenciaEngaco'); 
			Util.clear('inputDesgrana'); 
			Util.clear('inputPodridao'); 
			Util.clear('inputCicatrizes'); 
			Util.clear('inputRachaduras'); 
			Util.clear('inputRachadurasCampo'); 
			Util.clear('inputAmolecimento'); 
			Util.clear('inputObservacao'); 
			Util.clear('inputDataHora'); 
		},
		
		_getModel : function() {
			var that = this;
			var apontamentoQualidadePacking = that.model; 
			apontamentoQualidadePacking.set({
				id: Util.escapeById('inputId') || null,
		    	aparencia : Util.escapeById('inputAparencia'), 
		    	diametroMinimo : Util.escapeById('inputDiametroMinimo'), 
		    	diametroMaximo : Util.escapeById('inputDiametroMaximo'), 
		    	diametroMedio : Util.escapeById('inputDiametroMedio'), 
		    	brixMinimo : Util.escapeById('inputBrixMinimo'), 
		    	brixMaximo : Util.escapeById('inputBrixMaximo'), 
		    	brixMedio : Util.escapeById('inputBrixMedio'), 
		    	pesoCachoMinimo : Util.escapeById('inputPesoCachoMinimo'), 
		    	pesoCachoMaximo : Util.escapeById('inputPesoCachoMaximo'), 
		    	pesoSacolaMinimo : Util.escapeById('inputPesoSacolaMinimo'), 
		    	pesoSacolaMaximo : Util.escapeById('inputPesoSacolaMaximo'), 
		    	numeroCachoSacola : Util.escapeById('inputNumeroCachoSacola'), 
		    	numeroSacola : Util.escapeById('inputNumeroSacola'), 
		    	pesoCumbucaMinimo : Util.escapeById('inputPesoCumbucaMinimo'), 
		    	pesoCumbucaMaximo : Util.escapeById('inputPesoCumbucaMaximo'), 
		    	numeroCachosCumbuca : Util.escapeById('inputNumeroCachosCumbuca'), 
		    	numeroCumbucas : Util.escapeById('inputNumeroCumbucas'), 
		    	pesoBruto : Util.escapeById('inputPesoBruto'), 
		    	pesoLiquido : Util.escapeById('inputPesoLiquido'), 
		    	corposEstranhos : Util.escapeById('inputCorposEstranhos'), 
		    	bagasAquosas : Util.escapeById('inputBagasAquosas'), 
		    	bagasCristalinas : Util.escapeById('inputBagasCristalinas'), 
		    	firmeza : Util.escapeById('inputFirmeza'), 
		    	danos : Util.escapeById('inputDanos'), 
		    	pragas : Util.escapeById('inputPragas'), 
		    	doencas : Util.escapeById('inputDoencas'), 
		    	aparenciaEngaco : Util.escapeById('inputAparenciaEngaco'), 
		    	desgrana : Util.escapeById('inputDesgrana'), 
		    	podridao : Util.escapeById('inputPodridao'), 
		    	cicatrizes : Util.escapeById('inputCicatrizes'), 
		    	rachaduras : Util.escapeById('inputRachaduras'), 
		    	rachadurasCampo : Util.escapeById('inputRachadurasCampo'), 
		    	amolecimento : Util.escapeById('inputAmolecimento'), 
		    	observacao : Util.escapeById('inputObservacao'), 
		    	dataHora : Util.escapeById('inputDataHora'), 
				variedade :  that.comboVariedade.getJsonValue(),

			});
			return apontamentoQualidadePacking;
		},
	});

	return FormApontamentoQualidadePackings;
});