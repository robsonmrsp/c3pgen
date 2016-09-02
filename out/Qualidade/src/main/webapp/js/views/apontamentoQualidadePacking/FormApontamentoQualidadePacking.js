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

	var TemplateFormApontamentoQualidadePackings = require('text!views/apontamentoQualidadePacking/tpl/FormApontamentoQualidadePackingTemplate.html');
	var ApontamentoQualidadePackingModel = require('models/ApontamentoQualidadePackingModel');
	var ApontamentoQualidadePackingCollection = require('collections/ApontamentoQualidadePackingCollection');
	var SearchBolsaoModal = require('views/modalComponents/BolsaoModal');
	var SearchGeneradorModal = require('views/modalComponents/GeneradorModal');
	var SearchCorModal = require('views/modalComponents/CorModal');
	var SearchCargoModal = require('views/modalComponents/CargoModal');
	var SearchVariedadeModal = require('views/modalComponents/VariedadeModal');
	var SearchLatadaModal = require('views/modalComponents/LatadaModal');
	var SearchEmbalagemModal = require('views/modalComponents/EmbalagemModal');
	var SearchCabineModal = require('views/modalComponents/CabineModal');
	var SearchSacolaModal = require('views/modalComponents/SacolaModal');
	var SearchClienteModal = require('views/modalComponents/ClienteModal');
	var SearchPackingModal = require('views/modalComponents/PackingModal');
	
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
			searchVariedadeModalRegion : '#variedadeModal',
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
			'click #searchBolsaoModal' : '_showSearchBolsaoModal',
			'click #searchGeneradorModal' : '_showSearchGeneradorModal',
			'click #searchCorModal' : '_showSearchCorModal',
			'click #searchCargoModal' : '_showSearchCargoModal',
			'click #searchVariedadeModal' : '_showSearchVariedadeModal',
			'click #searchLatadaModal' : '_showSearchLatadaModal',
			'click #searchEmbalagemModal' : '_showSearchEmbalagemModal',
			'click #searchCabineModal' : '_showSearchCabineModal',
			'click #searchSacolaModal' : '_showSearchSacolaModal',
			'click #searchClienteModal' : '_showSearchClienteModal',
			'click #searchPackingModal' : '_showSearchPackingModal',
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
			inputVariedadeId : '#inputVariedadeId',
			inputVariedadeNome : '#inputVariedadeNome',
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
			this.searchBolsaoModal = new SearchBolsaoModal({
				onSelectModel : function(model) {
					that._selectBolsao(model);
				},
			});
			this.searchGeneradorModal = new SearchGeneradorModal({
				onSelectModel : function(model) {
					that._selectGenerador(model);
				},
			});
			this.searchCorModal = new SearchCorModal({
				onSelectModel : function(model) {
					that._selectCor(model);
				},
			});
			this.searchCargoModal = new SearchCargoModal({
				onSelectModel : function(model) {
					that._selectCargo(model);
				},
			});
			this.searchVariedadeModal = new SearchVariedadeModal({
				onSelectModel : function(model) {
					that._selectVariedade(model);
				},
			});
			this.searchLatadaModal = new SearchLatadaModal({
				onSelectModel : function(model) {
					that._selectLatada(model);
				},
			});
			this.searchEmbalagemModal = new SearchEmbalagemModal({
				onSelectModel : function(model) {
					that._selectEmbalagem(model);
				},
			});
			this.searchCabineModal = new SearchCabineModal({
				onSelectModel : function(model) {
					that._selectCabine(model);
				},
			});
			this.searchSacolaModal = new SearchSacolaModal({
				onSelectModel : function(model) {
					that._selectSacola(model);
				},
			});
			this.searchClienteModal = new SearchClienteModal({
				onSelectModel : function(model) {
					that._selectCliente(model);
				},
			});
			this.searchPackingModal = new SearchPackingModal({
				onSelectModel : function(model) {
					that._selectPacking(model);
				},
			});
			this.on('show', function() {
				this.searchBolsaoModalRegion.show(this.searchBolsaoModal);		
				this.searchGeneradorModalRegion.show(this.searchGeneradorModal);		
				this.searchCorModalRegion.show(this.searchCorModal);		
				this.searchCargoModalRegion.show(this.searchCargoModal);		
				this.searchVariedadeModalRegion.show(this.searchVariedadeModal);		
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
			var apontamentoQualidadePacking = that._getModel();

			if (this._isValid()) {
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
			util.clear('inputVariedadeId');
			util.clear('inputVariedadeNome');
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

		_isValid : function() {
			return this.ui.form.validationEngine('validate', {
				promptPosition : "topLeft",
				isOverflown : false,
				validationEventTrigger : "change"
			});
		},

		_getModel : function() {
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
				
					bolsao : that._getBolsao(),
					generador : that._getGenerador(),
					cor : that._getCor(),
					cargo : that._getCargo(),
					variedade : that._getVariedade(),
					latada : that._getLatada(),
					embalagem : that._getEmbalagem(),
					cabine : that._getCabine(),
					sacola : that._getSacola(),
					cliente : that._getCliente(),
					packing : that._getPacking(),
			});
			return apontamentoQualidadePacking;
		},
		 
		_getBolsao : function() {			
			var id = util.escapeById('inputBolsaoId');
			var nome = util.escapeById('inputBolsaoNome');
			var bolsao = null;
			
			if (id && nome) {
				bolsao = {
					id : id,
					nome : nome,
				}
			}
			return bolsao;
		},	
		_getGenerador : function() {			
			var id = util.escapeById('inputGeneradorId');
			var nome = util.escapeById('inputGeneradorNome');
			var generador = null;
			
			if (id && nome) {
				generador = {
					id : id,
					nome : nome,
				}
			}
			return generador;
		},	
		_getCor : function() {			
			var id = util.escapeById('inputCorId');
			var nome = util.escapeById('inputCorNome');
			var cor = null;
			
			if (id && nome) {
				cor = {
					id : id,
					nome : nome,
				}
			}
			return cor;
		},	
		_getCargo : function() {			
			var id = util.escapeById('inputCargoId');
			var nome = util.escapeById('inputCargoNome');
			var cargo = null;
			
			if (id && nome) {
				cargo = {
					id : id,
					nome : nome,
				}
			}
			return cargo;
		},	
		_getVariedade : function() {			
			var id = util.escapeById('inputVariedadeId');
			var nome = util.escapeById('inputVariedadeNome');
			var variedade = null;
			
			if (id && nome) {
				variedade = {
					id : id,
					nome : nome,
				}
			}
			return variedade;
		},	
		_getLatada : function() {			
			var id = util.escapeById('inputLatadaId');
			var nome = util.escapeById('inputLatadaNome');
			var latada = null;
			
			if (id && nome) {
				latada = {
					id : id,
					nome : nome,
				}
			}
			return latada;
		},	
		_getEmbalagem : function() {			
			var id = util.escapeById('inputEmbalagemId');
			var nome = util.escapeById('inputEmbalagemNome');
			var embalagem = null;
			
			if (id && nome) {
				embalagem = {
					id : id,
					nome : nome,
				}
			}
			return embalagem;
		},	
		_getCabine : function() {			
			var id = util.escapeById('inputCabineId');
			var nome = util.escapeById('inputCabineNome');
			var cabine = null;
			
			if (id && nome) {
				cabine = {
					id : id,
					nome : nome,
				}
			}
			return cabine;
		},	
		_getSacola : function() {			
			var id = util.escapeById('inputSacolaId');
			var nome = util.escapeById('inputSacolaNome');
			var sacola = null;
			
			if (id && nome) {
				sacola = {
					id : id,
					nome : nome,
				}
			}
			return sacola;
		},	
		_getCliente : function() {			
			var id = util.escapeById('inputClienteId');
			var nome = util.escapeById('inputClienteNome');
			var cliente = null;
			
			if (id && nome) {
				cliente = {
					id : id,
					nome : nome,
				}
			}
			return cliente;
		},	
		_getPacking : function() {			
			var id = util.escapeById('inputPackingId');
			var nome = util.escapeById('inputPackingNome');
			var packing = null;
			
			if (id && nome) {
				packing = {
					id : id,
					nome : nome,
				}
			}
			return packing;
		},	
		
		_showSearchBolsaoModal : function() {
			this.searchBolsaoModal.showPage();
		},
			
		_selectBolsao : function(bolsao) {
			this.searchBolsaoModal.hidePage();	
			this.ui.inputBolsaoId.val(bolsao.get('id'));
			this.ui.inputBolsaoNome.val(bolsao.get('nome'));		
		},
		_showSearchGeneradorModal : function() {
			this.searchGeneradorModal.showPage();
		},
			
		_selectGenerador : function(generador) {
			this.searchGeneradorModal.hidePage();	
			this.ui.inputGeneradorId.val(generador.get('id'));
			this.ui.inputGeneradorNome.val(generador.get('nome'));		
		},
		_showSearchCorModal : function() {
			this.searchCorModal.showPage();
		},
			
		_selectCor : function(cor) {
			this.searchCorModal.hidePage();	
			this.ui.inputCorId.val(cor.get('id'));
			this.ui.inputCorNome.val(cor.get('nome'));		
		},
		_showSearchCargoModal : function() {
			this.searchCargoModal.showPage();
		},
			
		_selectCargo : function(cargo) {
			this.searchCargoModal.hidePage();	
			this.ui.inputCargoId.val(cargo.get('id'));
			this.ui.inputCargoNome.val(cargo.get('nome'));		
		},
		_showSearchVariedadeModal : function() {
			this.searchVariedadeModal.showPage();
		},
			
		_selectVariedade : function(variedade) {
			this.searchVariedadeModal.hidePage();	
			this.ui.inputVariedadeId.val(variedade.get('id'));
			this.ui.inputVariedadeNome.val(variedade.get('nome'));		
		},
		_showSearchLatadaModal : function() {
			this.searchLatadaModal.showPage();
		},
			
		_selectLatada : function(latada) {
			this.searchLatadaModal.hidePage();	
			this.ui.inputLatadaId.val(latada.get('id'));
			this.ui.inputLatadaNome.val(latada.get('nome'));		
		},
		_showSearchEmbalagemModal : function() {
			this.searchEmbalagemModal.showPage();
		},
			
		_selectEmbalagem : function(embalagem) {
			this.searchEmbalagemModal.hidePage();	
			this.ui.inputEmbalagemId.val(embalagem.get('id'));
			this.ui.inputEmbalagemNome.val(embalagem.get('nome'));		
		},
		_showSearchCabineModal : function() {
			this.searchCabineModal.showPage();
		},
			
		_selectCabine : function(cabine) {
			this.searchCabineModal.hidePage();	
			this.ui.inputCabineId.val(cabine.get('id'));
			this.ui.inputCabineNome.val(cabine.get('nome'));		
		},
		_showSearchSacolaModal : function() {
			this.searchSacolaModal.showPage();
		},
			
		_selectSacola : function(sacola) {
			this.searchSacolaModal.hidePage();	
			this.ui.inputSacolaId.val(sacola.get('id'));
			this.ui.inputSacolaNome.val(sacola.get('nome'));		
		},
		_showSearchClienteModal : function() {
			this.searchClienteModal.showPage();
		},
			
		_selectCliente : function(cliente) {
			this.searchClienteModal.hidePage();	
			this.ui.inputClienteId.val(cliente.get('id'));
			this.ui.inputClienteNome.val(cliente.get('nome'));		
		},
		_showSearchPackingModal : function() {
			this.searchPackingModal.showPage();
		},
			
		_selectPacking : function(packing) {
			this.searchPackingModal.hidePage();	
			this.ui.inputPackingId.val(packing.get('id'));
			this.ui.inputPackingNome.val(packing.get('nome'));		
		},
				
		
	});

	return FormApontamentoQualidadePackings;
});