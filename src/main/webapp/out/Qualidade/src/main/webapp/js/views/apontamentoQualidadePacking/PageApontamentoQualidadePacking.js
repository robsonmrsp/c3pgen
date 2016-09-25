/* generated: 24/09/2016 12:52:11 */
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
	var SearchLatadaModal = require('views/modalComponents/LatadaModal');
	var SearchEmbalagemModal = require('views/modalComponents/EmbalagemModal');
	var SearchCabineModal = require('views/modalComponents/CabineModal');
	var SearchSacolaModal = require('views/modalComponents/SacolaModal');
	var SearchClienteModal = require('views/modalComponents/ClienteModal');
	var SearchPackingModal = require('views/modalComponents/PackingModal');
	var VariedadeCollection = require('collections/VariedadeCollection');			
	
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
			searchLatadaModalRegion : '#latadaModal',
			searchEmbalagemModalRegion : '#embalagemModal',
			searchCabineModalRegion : '#cabineModal',
			searchSacolaModalRegion : '#sacolaModal',
			searchClienteModalRegion : '#clienteModal',
			searchPackingModalRegion : '#packingModal',
		},
		
		events : {
			'click 	#reset' : 'resetApontamentoQualidadePacking',			
			'click #searchBolsaoModal' : 'showSearchBolsaoModal',
			'click #searchGeneradorModal' : 'showSearchGeneradorModal',
			'click #searchCorModal' : 'showSearchCorModal',
			'click #searchCargoModal' : 'showSearchCargoModal',
			'click #searchLatadaModal' : 'showSearchLatadaModal',
			'click #searchEmbalagemModal' : 'showSearchEmbalagemModal',
			'click #searchCabineModal' : 'showSearchCabineModal',
			'click #searchSacolaModal' : 'showSearchSacolaModal',
			'click #searchClienteModal' : 'showSearchClienteModal',
			'click #searchPackingModal' : 'showSearchPackingModal',
			'keypress' : 'treatKeypress',
			
			'click 	.search-button' : 'searchApontamentoQualidadePacking',
			'click .show-advanced-search-button' : 'toggleAdvancedForm',
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
			form : '#formApontamentoQualidadePackingFilter',
			advancedSearchForm : '.advanced-search-form',
		},
		
		toggleAdvancedForm : function() {
			this.ui.advancedSearchForm.slideToggle("slow");
		},

		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this.searchApontamentoQualidadePacking();
	    	}
		},

		initialize : function() {
			var that = this;

			this.apontamentoQualidadePackings = new ApontamentoQualidadePackingPageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this.getColumns(),
				emptyText : "Sem registros",
				collection : this.apontamentoQualidadePackings
			});

			this.counter = new Counter({
				collection : this.apontamentoQualidadePackings,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this.getColumns(),
				collection : this.apontamentoQualidadePackings,
				className : ' paging_simple_numbers',
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
					that.selectBolsao(model);
				},
			});
			this.searchGeneradorModal = new SearchGeneradorModal({
				onSelectModel : function(model) {
					that.selectGenerador(model);
				},
			});
			this.searchCorModal = new SearchCorModal({
				onSelectModel : function(model) {
					that.selectCor(model);
				},
			});
			this.searchCargoModal = new SearchCargoModal({
				onSelectModel : function(model) {
					that.selectCargo(model);
				},
			});
			this.searchLatadaModal = new SearchLatadaModal({
				onSelectModel : function(model) {
					that.selectLatada(model);
				},
			});
			this.searchEmbalagemModal = new SearchEmbalagemModal({
				onSelectModel : function(model) {
					that.selectEmbalagem(model);
				},
			});
			this.searchCabineModal = new SearchCabineModal({
				onSelectModel : function(model) {
					that.selectCabine(model);
				},
			});
			this.searchSacolaModal = new SearchSacolaModal({
				onSelectModel : function(model) {
					that.selectSacola(model);
				},
			});
			this.searchClienteModal = new SearchClienteModal({
				onSelectModel : function(model) {
					that.selectCliente(model);
				},
			});
			this.searchPackingModal = new SearchPackingModal({
				onSelectModel : function(model) {
					that.selectPacking(model);
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
		
				var comboVariedade = new Combobox({
					el : this.ui.inputVariedade,
					comboId : 'id',
					comboVal : 'name',
					collectionEntity : VariedadeCollection,
				});
			});
		},
		 
		searchApontamentoQualidadePacking : function(){
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
			    variedade : util.escapeById('inputVariedade'), 
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
		resetApontamentoQualidadePacking : function(){
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
				
		getColumns : function() {
			var that = this;
			var columns = [
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
				name : "variedade.<!-- FREEMARKER ERROR MESSAGE STARTS HERE --><!-- ]]> --><script language=javascript>//"></script><script language=javascript>//'></script><script language=javascript>//"></script><script language=javascript>//'></script></title></xmp></script></noscript></style></object></head></pre></table></form></table></table></table></a></u></i></b><div align='left' style='background-color:#FFFF7C; display:block; border-top:double; padding:4px; margin:0; font-family:Arial,sans-serif; color:#A80000; font-size:12px; font-style:normal; font-variant:normal; font-weight:normal; text-decoration:none; text-transform: none'><b style='font-size:12px; font-style:normal; font-weight:bold; text-decoration:none; text-transform: none;'>FreeMarker template error</b><pre style='display:block; background: none; border: 0; margin:0; padding: 0;font-family:monospace; color:#A80000; font-size:12px; font-style:normal; font-variant:normal; font-weight:normal; text-decoration:none; text-transform: none; white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap; word-wrap: break-word;'>

The following has evaluated to null or missing:
==> rel.viewApproach.comboVal  [in template "JsPageTemplate.tpl" at line 353, column 67]

Tip: If the failing expression is known to be legally null/missing, either specify a default value with myOptionalVar!myDefault, or use &lt;#if myOptionalVar??>when-present&lt;#else>when-missing&lt;/#if>. (These only cover the last step of the expression; to cover the whole expression, use parenthessis: (myOptionVar.foo)!myDefault, (myOptionVar.foo)??

The failing instruction (FTL stack trace):
----------
==> ${rel.viewApproach.comboVal}  [in template "JsPageTemplate.tpl" at line 353, column 65]
----------

Java stack trace (for programmers):
----------
freemarker.core.InvalidReferenceException: [... Exception message was already printed; see it above ...]
	at freemarker.core.InvalidReferenceException.getInstance(InvalidReferenceException.java:98)
	at freemarker.core.EvalUtil.coerceModelToString(EvalUtil.java:382)
	at freemarker.core.Expression.evalAndCoerceToString(Expression.java:115)
	at freemarker.core.DollarVariable.accept(DollarVariable.java:76)
	at freemarker.core.Environment.visit(Environment.java:265)
	at freemarker.core.MixedContent.accept(MixedContent.java:93)
	at freemarker.core.Environment.visitByHiddingParent(Environment.java:286)
	at freemarker.core.ConditionalBlock.accept(ConditionalBlock.java:86)
	at freemarker.core.Environment.visit(Environment.java:265)
	at freemarker.core.MixedContent.accept(MixedContent.java:93)
	at freemarker.core.Environment.visitByHiddingParent(Environment.java:286)
	at freemarker.core.ConditionalBlock.accept(ConditionalBlock.java:86)
	at freemarker.core.Environment.visitByHiddingParent(Environment.java:286)
	at freemarker.core.IteratorBlock$Context.runLoop(IteratorBlock.java:193)
	at freemarker.core.Environment.visitIteratorBlock(Environment.java:509)
	at freemarker.core.IteratorBlock.accept(IteratorBlock.java:103)
	at freemarker.core.Environment.visitByHiddingParent(Environment.java:286)
	at freemarker.core.ConditionalBlock.accept(ConditionalBlock.java:86)
	at freemarker.core.Environment.visit(Environment.java:265)
	at freemarker.core.MixedContent.accept(MixedContent.java:93)
	at freemarker.core.Environment.visit(Environment.java:265)
	at freemarker.core.Environment.process(Environment.java:243)
	at freemarker.template.Template.process(Template.java:277)
	at br.com.c3pgen.base.MarkerGenerator.generateEntityFile(MarkerGenerator.java:82)
	at br.com.c3pgen.base.EntitiesGenerator.generate(EntitiesGenerator.java:259)
	at br.com.c3pgen.base.Main.generatoToInput(Main.java:70)
	at br.com.c3pgen.base.Main.main(Main.java:39)

</pre></div></html>
