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

	var TemplateFormApontamentoQualidadePackings = require('text!views/apontamentoQualidadePacking/tpl/FormApontamentoQualidadePackingTemplate.html');
	var ApontamentoQualidadePackingModel = require('models/ApontamentoQualidadePackingModel');
	var ApontamentoQualidadePackingCollection = require('collections/ApontamentoQualidadePackingCollection');
	var ApontamentoQualidadePackingPageCollection = require('collections/ApontamentoQualidadePackingPageCollection');
	var PageApontamentoQualidadePackingTemplate = require('text!views/apontamentoQualidadePacking/tpl/PageApontamentoQualidadePackingTemplate.html');
	
	//Filter import
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

	var PageApontamentoQualidadePacking = Marionette.LayoutView.extend({
		template : _.template(PageApontamentoQualidadePackingTemplate),

		regions : {
			gridRegion : '#grid',
			counterRegion : '#counter',
			paginatorRegion : '#paginator',
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
			'click 	#query' : '_queryApontamentoQualidadePacking',			
			'click 	#reset' : '_resetApontamentoQualidadePacking',			
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
			'keypress' : 'treatKeypress',
		},
		
		
		ui : {
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
			form : '#formApontamentoQualidadePackingFilter',
		},
		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this._queryApontamentoQualidadePacking();
	    	}
		},

		initialize : function() {
			var that = this;

			this.apontamentoQualidadePackings = new ApontamentoQualidadePackingPageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.apontamentoQualidadePackings
			});

			this.counter = new Counter({
				collection : this.apontamentoQualidadePackings,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.apontamentoQualidadePackings,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.apontamentoQualidadePackings.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid apontamentoQualidadePacking');
				},
				error : function(_col, _resp, _opts) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')) );
				}
			});
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
				that.gridRegion.show(that.grid);
				that.counterRegion.show(that.counter);
				that.paginatorRegion.show(that.paginator);
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
		
			});
		},
		 
		_queryApontamentoQualidadePacking : function(){
			var that = this;

			this.apontamentoQualidadePackings.filterQueryParams = {
	    		aparencia : util.escapeById('inputAparencia'),
	    		diametroMinimo : util.escapeById('inputDiametroMinimo'),
	    		diametroMaximo : util.escapeById('inputDiametroMaximo'),
	    		diametroMedio : util.escapeById('inputDiametroMedio'),
	    		brixMinimo : util.escapeById('inputBrixMinimo'),
	    		brixMaximo : util.escapeById('inputBrixMaximo'),
	    		brixMedio : util.escapeById('inputBrixMedio'),
	    		pesoCachoMinimo : util.escapeById('inputPesoCachoMinimo'),
	    		pesoCachoMaximo : util.escapeById('inputPesoCachoMaximo'),
	    		pesoSacolaMinimo : util.escapeById('inputPesoSacolaMinimo'),
	    		pesoSacolaMaximo : util.escapeById('inputPesoSacolaMaximo'),
	    		numeroCachoSacola : util.escapeById('inputNumeroCachoSacola'),
	    		numeroSacola : util.escapeById('inputNumeroSacola'),
	    		pesoCumbucaMinimo : util.escapeById('inputPesoCumbucaMinimo'),
	    		pesoCumbucaMaximo : util.escapeById('inputPesoCumbucaMaximo'),
	    		numeroCachosCumbuca : util.escapeById('inputNumeroCachosCumbuca'),
	    		numeroCumbucas : util.escapeById('inputNumeroCumbucas'),
	    		pesoBruto : util.escapeById('inputPesoBruto'),
	    		pesoLiquido : util.escapeById('inputPesoLiquido'),
	    		corposEstranhos : util.escapeById('inputCorposEstranhos'),
	    		bagasAquosas : util.escapeById('inputBagasAquosas'),
	    		bagasCristalinas : util.escapeById('inputBagasCristalinas'),
	    		firmeza : util.escapeById('inputFirmeza'),
	    		danos : util.escapeById('inputDanos'),
	    		pragas : util.escapeById('inputPragas'),
	    		doencas : util.escapeById('inputDoencas'),
	    		aparenciaEngaco : util.escapeById('inputAparenciaEngaco'),
	    		desgrana : util.escapeById('inputDesgrana'),
	    		podridao : util.escapeById('inputPodridao'),
	    		cicatrizes : util.escapeById('inputCicatrizes'),
	    		rachaduras : util.escapeById('inputRachaduras'),
	    		rachadurasCampo : util.escapeById('inputRachadurasCampo'),
	    		amolecimento : util.escapeById('inputAmolecimento'),
	    		observacao : util.escapeById('inputObservacao'),
	    		dataHora : util.escapeById('inputDataHora'),
			    bolsao : util.escapeById('inputBolsaoId'), 
			    generador : util.escapeById('inputGeneradorId'), 
			    cor : util.escapeById('inputCorId'), 
			    cargo : util.escapeById('inputCargoId'), 
			    variedade : util.escapeById('inputVariedadeId'), 
			    latada : util.escapeById('inputLatadaId'), 
			    embalagem : util.escapeById('inputEmbalagemId'), 
			    cabine : util.escapeById('inputCabineId'), 
			    sacola : util.escapeById('inputSacolaId'), 
			    cliente : util.escapeById('inputClienteId'), 
			    packing : util.escapeById('inputPackingId'), 
			}
			this.apontamentoQualidadePackings.fetch({
				success : function(_coll, _resp, _opt) {
					console.info('Consulta para o grid apontamentoQualidadePacking');
				},
				error : function(_coll, _resp, _opt) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				},
				complete : function() {
					
				},
			})		
		},
		_resetApontamentoQualidadePacking : function(){
			this.ui.form.get(0).reset();
			this.apontamentoQualidadePackings.reset();
			util.clear('inputBolsaoId');
			util.clear('inputGeneradorId');
			util.clear('inputCorId');
			util.clear('inputCargoId');
			util.clear('inputVariedadeId');
			util.clear('inputLatadaId');
			util.clear('inputEmbalagemId');
			util.clear('inputCabineId');
			util.clear('inputSacolaId');
			util.clear('inputClienteId');
			util.clear('inputPackingId');
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
				name : "aparencia",
				editable : false,
				sortable : true,
				label 	 : "Aparência",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "diametroMinimo",
				editable : false,
				sortable : true,
				label 	 : "Diametro mínimo",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "diametroMaximo",
				editable : false,
				sortable : true,
				label 	 : "Diametro máximo",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "diametroMedio",
				editable : false,
				sortable : true,
				label 	 : "Diametro médio",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "brixMinimo",
				editable : false,
				sortable : true,
				label 	 : "Brix mínimo",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "brixMaximo",
				editable : false,
				sortable : true,
				label 	 : "Brix máximo",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "brixMedio",
				editable : false,
				sortable : true,
				label 	 : "Brix médio",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "pesoCachoMinimo",
				editable : false,
				sortable : true,
				label 	 : "Peso cacho mínimo",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "pesoCachoMaximo",
				editable : false,
				sortable : true,
				label 	 : "Peso cacho máximo",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "pesoSacolaMinimo",
				editable : false,
				sortable : true,
				label 	 : "Peso sacola mínimo",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "pesoSacolaMaximo",
				editable : false,
				sortable : true,
				label 	 : "Peso sacola máximo",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "numeroCachoSacola",
				editable : false,
				sortable : true,
				label 	 : "Número cacho sacola",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "numeroSacola",
				editable : false,
				sortable : true,
				label 	 : "Número sacola",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "pesoCumbucaMinimo",
				editable : false,
				sortable : true,
				label 	 : "Peso cumbuca mínimo",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "pesoCumbucaMaximo",
				editable : false,
				sortable : true,
				label 	 : "Peso cumbuca máximo",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "numeroCachosCumbuca",
				editable : false,
				sortable : true,
				label 	 : "Número cachos cumbuca",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "numeroCumbucas",
				editable : false,
				sortable : true,
				label 	 : "Número cumbucas",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "pesoBruto",
				editable : false,
				sortable : true,
				label 	 : "Peso bruto",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "pesoLiquido",
				editable : false,
				sortable : true,
				label 	 : "Peso líquido",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "corposEstranhos",
				editable : false,
				sortable : true,
				label 	 : "Corpos estranhos",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "bagasAquosas",
				editable : false,
				sortable : true,
				label 	 : "Bagas aquosas",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "bagasCristalinas",
				editable : false,
				sortable : true,
				label 	 : "Bagas cristalinas",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "firmeza",
				editable : false,
				sortable : true,
				label 	 : "Firmeza",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "danos",
				editable : false,
				sortable : true,
				label 	 : "Danos",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "pragas",
				editable : false,
				sortable : true,
				label 	 : "Pragas",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "doencas",
				editable : false,
				sortable : true,
				label 	 : "Doencas",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "aparenciaEngaco",
				editable : false,
				sortable : true,
				label 	 : "Aparência engaco",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "desgrana",
				editable : false,
				sortable : true,
				label 	 : "Desgrana",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "podridao",
				editable : false,
				sortable : true,
				label 	 : "Podridão",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "cicatrizes",
				editable : false,
				sortable : true,
				label 	 : "Cicatrizes",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "rachaduras",
				editable : false,
				sortable : true,
				label 	 : "Rachaduras",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "rachadurasCampo",
				editable : false,
				sortable : true,
				label 	 : "Rachaduras campo",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "amolecimento",
				editable : false,
				sortable : true,
				label 	 : "Amolecimento",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "observacao",
				editable : false,
				sortable : true,
				label 	 : "Observação",
				cell 	 : "string",
			}, 
			{
				name : "dataHora",
				editable : false,
				sortable : true,
				label 	 : "Data hora",
				cell 	 : "string",
			}, 
			{
				name : "bolsao.nome",
				editable : false,
				sortable : true,  
				label : "Bolsao",
				cell : CustomStringCell.extend({
					fieldName : 'bolsao.nome',
				}),
			},	
			{
				name : "generador.nome",
				editable : false,
				sortable : true,  
				label : "Generador",
				cell : CustomStringCell.extend({
					fieldName : 'generador.nome',
				}),
			},	
			{
				name : "cor.nome",
				editable : false,
				sortable : true,  
				label : "Cor",
				cell : CustomStringCell.extend({
					fieldName : 'cor.nome',
				}),
			},	
			{
				name : "cargo.nome",
				editable : false,
				sortable : true,  
				label : "Cargo",
				cell : CustomStringCell.extend({
					fieldName : 'cargo.nome',
				}),
			},	
			{
				name : "variedade.nome",
				editable : false,
				sortable : true,  
				label : "Variedade",
				cell : CustomStringCell.extend({
					fieldName : 'variedade.nome',
				}),
			},	
			{
				name : "latada.nome",
				editable : false,
				sortable : true,  
				label : "Latada",
				cell : CustomStringCell.extend({
					fieldName : 'latada.nome',
				}),
			},	
			{
				name : "embalagem.nome",
				editable : false,
				sortable : true,  
				label : "Embalagem",
				cell : CustomStringCell.extend({
					fieldName : 'embalagem.nome',
				}),
			},	
			{
				name : "cabine.nome",
				editable : false,
				sortable : true,  
				label : "Cabine",
				cell : CustomStringCell.extend({
					fieldName : 'cabine.nome',
				}),
			},	
			{
				name : "sacola.nome",
				editable : false,
				sortable : true,  
				label : "Sacola",
				cell : CustomStringCell.extend({
					fieldName : 'sacola.nome',
				}),
			},	
			{
				name : "cliente.nome",
				editable : false,
				sortable : true,  
				label : "Cliente",
				cell : CustomStringCell.extend({
					fieldName : 'cliente.nome',
				}),
			},	
			{
				name : "packing.nome",
				editable : false,
				sortable : true,  
				label : "Packing",
				cell : CustomStringCell.extend({
					fieldName : 'packing.nome',
				}),
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
				hint : 'Editar Apontamento qualidade packing',
				onClick : that.editModel,
			}, {
				id : 'delete_button',
				type : 'danger',
				icon : 'icon-trash',
				hint : 'Delete Apontamento qualidade packing',
				onClick : that.deleteModel,
			});

			return buttons;
		},

		deleteModel : function(model) {
			var that = this;
			
			var modelTipo = new ApontamentoQualidadePackingModel({
				id : model.id,
			});
			
			util.Bootbox.confirm("Tem certeza que deseja remover o registro [ " + model.get('id') + " ] ?", function(yes) {
				if (yes) {
					modelTipo.destroy({
						success : function() {
							that.apontamentoQualidadePackings.remove(model);
							util.showSuccessMessage('Apontamento qualidade packing removido com sucesso!');
						},
						error : function(_model, _resp) {
							util.showErrorMessage('Problema ao remover o registro',_resp);
						}
					});
				}
			});
		},

		editModel : function(model) {
			util.goPage("app/editApontamentoQualidadePacking/" + model.get('id'));
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

	return PageApontamentoQualidadePacking;
});
