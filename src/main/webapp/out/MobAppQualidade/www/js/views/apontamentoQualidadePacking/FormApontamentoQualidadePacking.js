/* generated: 24/09/2016 11:56:51 */
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
	var FormApontamentoQualidadePackings = Marionette.LayoutView.extend({
		template : _.template(TemplateFormApontamentoQualidadePackings),

		regions : {
			floatButtonSaveRegion : '#floatButtonSave',
		},

		events : {
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
			inputDataColheita : '#inputDataColheita',
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
				
				
			this.comboBolsao = new Combobox({
				el : this.ui.inputBolsao,
				comboId : 'id',
				comboVal : 'nome',
				collectionEntity : BolsaoCollection, 
			});
			this.comboBolsao.setValue(this.model.get('bolsao'));					
			this.comboGenerador = new Combobox({
				el : this.ui.inputGenerador,
				comboId : 'id',
				comboVal : 'nome',
				collectionEntity : GeneradorCollection, 
			});
			this.comboGenerador.setValue(this.model.get('generador'));					
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
			this.comboLatada.setValue(this.model.get('latada'));					
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
			this.comboCabine.setValue(this.model.get('cabine'));					
			this.comboSacola = new Combobox({
				el : this.ui.inputSacola,
				comboId : 'id',
				comboVal : 'nome',
				collectionEntity : SacolaCollection, 
			});
			this.comboSacola.setValue(this.model.get('sacola'));					
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
			this.comboPacking.setValue(this.model.get('packing'));					
				
			})
		},
		

		saveAndContinue : function() {
			this.save(true)
		},

		clearForm : function() {
			Util.clear('inputId');
			Util.clear('inputTipoControle'); 
			Util.clear('inputCor'); 
			Util.clear('inputClassificacao'); 
			Util.clear('inputQualidade'); 
			Util.clear('inputCondicao'); 
			Util.clear('inputPallet'); 
			Util.clear('inputDataAnalise'); 
			Util.clear('inputDataColheita'); 
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
		    	tipoControle : Util.escapeById('inputTipoControle'), 
		    	cor : Util.escapeById('inputCor'), 
		    	classificacao : Util.escapeById('inputClassificacao'), 
		    	qualidade : Util.escapeById('inputQualidade'), 
		    	condicao : Util.escapeById('inputCondicao'), 
		    	pallet : Util.escapeById('inputPallet'), 
		    	dataAnalise : Util.escapeById('inputDataAnalise'), 
		    	dataColheita : Util.escapeById('inputDataColheita'), 
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
	});

	return FormApontamentoQualidadePackings;
});