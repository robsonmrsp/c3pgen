/* generated: 24/09/2016 12:52:11 */
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
	var ModalBolsao = require('views/modalComponents/BolsaoModal');
	var ModalGenerador = require('views/modalComponents/GeneradorModal');
	var ModalCor = require('views/modalComponents/CorModal');
	var ModalCargo = require('views/modalComponents/CargoModal');
	var ModalLatada = require('views/modalComponents/LatadaModal');
	var ModalEmbalagem = require('views/modalComponents/EmbalagemModal');
	var ModalCabine = require('views/modalComponents/CabineModal');
	var ModalSacola = require('views/modalComponents/SacolaModal');
	var ModalCliente = require('views/modalComponents/ClienteModal');
	var ModalPacking = require('views/modalComponents/PackingModal');
	var VariedadeCollection = require('collections/VariedadeCollection');			
	
	// End of "Import´s" definition

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨MAIN BODY¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var FormApontamentoQualidadePackings = Marionette.LayoutView.extend({
		template : _.template(TemplateFormApontamentoQualidadePackings),

		regions : {
			searchBolsaoModalRegion : '#bolsaoModal',
			searchGeneradorModalRegion : '#generadorModal',
			searchCorModalRegion : '#corModal',
			searchCargoModalRegion : '#cargoModal',
			searchLatadaModalRegion : '#latadaModal',
			searchEmbalagemModalRegion : '#embalagemModal',
			searchCabineModalRegion : '#cabineModal',
			searchSacolaModalRegion : '#sacolaModal',
			searchClienteModalRegion : '#clienteModal',
			searchPackingModalRegion : '#packingModal',
		},

		events : {
			'click 	.save' : 'save',
			'click 	.saveAndContinue' : 'saveAndContinue',
			'click #searchBolsaoModal' : 'showModalBolsao',
			'click #searchGeneradorModal' : 'showModalGenerador',
			'click #searchCorModal' : 'showModalCor',
			'click #searchCargoModal' : 'showModalCargo',
			'click #searchLatadaModal' : 'showModalLatada',
			'click #searchEmbalagemModal' : 'showModalEmbalagem',
			'click #searchCabineModal' : 'showModalCabine',
			'click #searchSacolaModal' : 'showModalSacola',
			'click #searchClienteModal' : 'showModalCliente',
			'click #searchPackingModal' : 'showModalPacking',
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
			form : '#formApontamentoQualidadePacking',
		},

		initialize : function() {
			var that = this;
			this.modalBolsao = new ModalBolsao({
				onSelectModel : function(model) {
					that.selectBolsao(model);
				},
			});
			this.modalGenerador = new ModalGenerador({
				onSelectModel : function(model) {
					that.selectGenerador(model);
				},
			});
			this.modalCor = new ModalCor({
				onSelectModel : function(model) {
					that.selectCor(model);
				},
			});
			this.modalCargo = new ModalCargo({
				onSelectModel : function(model) {
					that.selectCargo(model);
				},
			});
			this.modalLatada = new ModalLatada({
				onSelectModel : function(model) {
					that.selectLatada(model);
				},
			});
			this.modalEmbalagem = new ModalEmbalagem({
				onSelectModel : function(model) {
					that.selectEmbalagem(model);
				},
			});
			this.modalCabine = new ModalCabine({
				onSelectModel : function(model) {
					that.selectCabine(model);
				},
			});
			this.modalSacola = new ModalSacola({
				onSelectModel : function(model) {
					that.selectSacola(model);
				},
			});
			this.modalCliente = new ModalCliente({
				onSelectModel : function(model) {
					that.selectCliente(model);
				},
			});
			this.modalPacking = new ModalPacking({
				onSelectModel : function(model) {
					that.selectPacking(model);
				},
			});
			this.on('show', function() {
				this.searchBolsaoModalRegion.show(this.searchBolsaoModal);		
				this.searchGeneradorModalRegion.show(this.searchGeneradorModal);		
				this.searchCorModalRegion.show(this.searchCorModal);		
				this.searchCargoModalRegion.show(this.searchCargoModal);		
				this.searchLatadaModalRegion.show(this.searchLatadaModal);		
				this.searchEmbalagemModalRegion.show(this.searchEmbalagemModal);		
				this.searchCabineModalRegion.show(this.searchCabineModal);		
				this.searchSacolaModalRegion.show(this.searchSacolaModal);		
				this.searchClienteModalRegion.show(this.searchClienteModal);		
				this.searchPackingModalRegion.show(this.searchPackingModal);		
				this.ui.inputAparencia.formatNumber(2);
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
				this.ui.inputBagasAquosas.formatNumber(2);
				this.ui.inputBagasCristalinas.formatNumber(2);
				this.ui.inputFirmeza.formatNumber(2);
				this.ui.inputDanos.formatNumber(2);
				this.ui.inputPragas.formatNumber(2);
				this.ui.inputDoencas.formatNumber(2);
				this.ui.inputAparenciaEngaco.formatNumber(2);
				this.ui.inputDesgrana.formatNumber(2);
				this.ui.inputPodridao.formatNumber(2);
				this.ui.inputCicatrizes.formatNumber(2);
				this.ui.inputRachaduras.formatNumber(2);
				this.ui.inputRachadurasCampo.formatNumber(2);
				this.ui.inputAmolecimento.formatNumber(2);
				this.comboVariedade = new Combobox({
					el : this.ui.inputVariedade,
					comboId : 'id',
					comboVal : 'name',
					collectionEntity : VariedadeCollection, 
				});
				this.comboVariedade.setValue(this.model.get('variedade'));					
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
			util.clear('inputBolsaoId');
			util.clear('inputBolsaoNome');
			util.clear('inputGeneradorId');
			util.clear('inputGeneradorNome');
			util.clear('inputCorId');
			util.clear('inputCorNome');
			util.clear('inputCargoId');
			util.clear('inputCargoNome');
			util.clear('inputVariedade'); 					 	
			util.clear('inputLatadaId');
			util.clear('inputLatadaNome');
			util.clear('inputEmbalagemId');
			util.clear('inputEmbalagemNome');
			util.clear('inputCabineId');
			util.clear('inputCabineNome');
			util.clear('inputSacolaId');
			util.clear('inputSacolaNome');
			util.clear('inputClienteId');
			util.clear('inputClienteNome');
			util.clear('inputPackingId');
			util.clear('inputPackingNome');
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
				
					bolsao : that.modalBolsao.getJsonValue(),
					generador : that.modalGenerador.getJsonValue(),
					cor : that.modalCor.getJsonValue(),
					cargo : that.modalCargo.getJsonValue(),
					variedade :  that.comboVariedade.getJsonValue(),
					latada : that.modalLatada.getJsonValue(),
					embalagem : that.modalEmbalagem.getJsonValue(),
					cabine : that.modalCabine.getJsonValue(),
					sacola : that.modalSacola.getJsonValue(),
					cliente : that.modalCliente.getJsonValue(),
					packing : that.modalPacking.getJsonValue(),
			});
			return apontamentoQualidadePacking;
		},
		 		
		showModalBolsao : function() {
			// add more before the modal is open
			this.modalBolsao.showPage();
		},
		showModalGenerador : function() {
			// add more before the modal is open
			this.modalGenerador.showPage();
		},
		showModalCor : function() {
			// add more before the modal is open
			this.modalCor.showPage();
		},
		showModalCargo : function() {
			// add more before the modal is open
			this.modalCargo.showPage();
		},
		showModalLatada : function() {
			// add more before the modal is open
			this.modalLatada.showPage();
		},
		showModalEmbalagem : function() {
			// add more before the modal is open
			this.modalEmbalagem.showPage();
		},
		showModalCabine : function() {
			// add more before the modal is open
			this.modalCabine.showPage();
		},
		showModalSacola : function() {
			// add more before the modal is open
			this.modalSacola.showPage();
		},
		showModalCliente : function() {
			// add more before the modal is open
			this.modalCliente.showPage();
		},
		showModalPacking : function() {
			// add more before the modal is open
			this.modalPacking.showPage();
		},

		selectBolsao : function(bolsao) {
			this.searchBolsaoModal.hidePage();	
			this.ui.inputBolsaoId.val(bolsao.get('id'));
			this.ui.inputBolsaoNome.val(bolsao.get('nome'));		
		},
		selectGenerador : function(generador) {
			this.searchGeneradorModal.hidePage();	
			this.ui.inputGeneradorId.val(generador.get('id'));
			this.ui.inputGeneradorNome.val(generador.get('nome'));		
		},
		selectCor : function(cor) {
			this.searchCorModal.hidePage();	
			this.ui.inputCorId.val(cor.get('id'));
			this.ui.inputCorNome.val(cor.get('nome'));		
		},
		selectCargo : function(cargo) {
			this.searchCargoModal.hidePage();	
			this.ui.inputCargoId.val(cargo.get('id'));
			this.ui.inputCargoNome.val(cargo.get('nome'));		
		},
		selectLatada : function(latada) {
			this.searchLatadaModal.hidePage();	
			this.ui.inputLatadaId.val(latada.get('id'));
			this.ui.inputLatadaNome.val(latada.get('nome'));		
		},
		selectEmbalagem : function(embalagem) {
			this.searchEmbalagemModal.hidePage();	
			this.ui.inputEmbalagemId.val(embalagem.get('id'));
			this.ui.inputEmbalagemNome.val(embalagem.get('nome'));		
		},
		selectCabine : function(cabine) {
			this.searchCabineModal.hidePage();	
			this.ui.inputCabineId.val(cabine.get('id'));
			this.ui.inputCabineNome.val(cabine.get('nome'));		
		},
		selectSacola : function(sacola) {
			this.searchSacolaModal.hidePage();	
			this.ui.inputSacolaId.val(sacola.get('id'));
			this.ui.inputSacolaNome.val(sacola.get('nome'));		
		},
		selectCliente : function(cliente) {
			this.searchClienteModal.hidePage();	
			this.ui.inputClienteId.val(cliente.get('id'));
			this.ui.inputClienteNome.val(cliente.get('nome'));		
		},
		selectPacking : function(packing) {
			this.searchPackingModal.hidePage();	
			this.ui.inputPackingId.val(packing.get('id'));
			this.ui.inputPackingNome.val(packing.get('nome'));		
		},
				
		
	});

	return FormApontamentoQualidadePackings;
});