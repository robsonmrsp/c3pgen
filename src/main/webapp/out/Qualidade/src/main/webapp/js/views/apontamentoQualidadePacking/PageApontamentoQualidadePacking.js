/* generated: 24/09/2016 11:56:32 */
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
	
	
	var LatadaCollection = require('collections/LatadaCollection');			
	var CabineCollection = require('collections/CabineCollection');			
	var PackingCollection = require('collections/PackingCollection');			
	var BolsaoCollection = require('collections/BolsaoCollection');			
	var GeneradorCollection = require('collections/GeneradorCollection');			
	var SacolaCollection = require('collections/SacolaCollection');			

	var EmbalagemCollection = require('collections/EmbalagemCollection');			
	var ClienteCollection = require('collections/ClienteCollection');			
	var CargoCollection = require('collections/CargoCollection');			
	var VariedadeCollection = require('collections/VariedadeCollection');			
	
	// End of "Import´s" definition

	var PageApontamentoQualidadePacking = Marionette.LayoutView.extend({
		template : _.template(PageApontamentoQualidadePackingTemplate),

		regions : {
			gridRegion : '#grid',
			counterRegion : '#counter',
			paginatorRegion : '#paginator',
		},
		
		events : {
			'click 	#reset' : 'resetApontamentoQualidadePacking',			
			'keypress' : 'treatKeypress',
			
			'click 	.search-button' : 'searchApontamentoQualidadePacking',
			'click .show-advanced-search-button' : 'toggleAdvancedForm',
		},
		
		
		ui : {
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
			this.on('show', function() {
				that.gridRegion.show(that.grid);
				that.counterRegion.show(that.counter);
				that.paginatorRegion.show(that.paginator);
				this.ui.inputTipoControle.formatNumber(2);
				var comboTipoControle = new Combobox({
					el : this.ui.inputTipoControle,
					comboId : 'id',
					comboVal : 'name',
					collectionEntity : IntegerCollection, 
				});
				this.ui.inputCor.formatNumber(2);
				var comboCor = new Combobox({
					el : this.ui.inputCor,
					comboId : 'id',
					comboVal : 'name',
					collectionEntity : IntegerCollection, 
				});
				this.ui.inputClassificacao.formatNumber(2);
				var comboClassificacao = new Combobox({
					el : this.ui.inputClassificacao,
					comboId : 'id',
					comboVal : 'name',
					collectionEntity : IntegerCollection, 
				});
				this.ui.inputQualidade.formatNumber(2);
				var comboQualidade = new Combobox({
					el : this.ui.inputQualidade,
					comboId : 'id',
					comboVal : 'name',
					collectionEntity : IntegerCollection, 
				});
				this.ui.inputCondicao.formatNumber(2);
				var comboCondicao = new Combobox({
					el : this.ui.inputCondicao,
					comboId : 'id',
					comboVal : 'name',
					collectionEntity : IntegerCollection, 
				});
				var comboPallet = new Combobox({
					el : this.ui.inputPallet,
					comboId : 'id',
					comboVal : 'name',
					collectionEntity : StringCollection, 
				});
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
				var comboAparencia = new Combobox({
					el : this.ui.inputAparencia,
					comboId : 'id',
					comboVal : 'name',
					collectionEntity : IntegerCollection, 
				});
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
				var comboCorposEstranhos = new Combobox({
					el : this.ui.inputCorposEstranhos,
					comboId : 'id',
					comboVal : 'name',
					collectionEntity : IntegerCollection, 
				});
				this.ui.inputBagasAquosas.formatNumber(2);
				this.ui.inputBagasCristalinas.formatNumber(2);
				this.ui.inputFirmeza.formatNumber(2);
				var comboFirmeza = new Combobox({
					el : this.ui.inputFirmeza,
					comboId : 'id',
					comboVal : 'name',
					collectionEntity : IntegerCollection, 
				});
				this.ui.inputDanos.formatNumber(2);
				this.ui.inputPragas.formatNumber(2);
				this.ui.inputDoencas.formatNumber(2);
				this.ui.inputAparenciaEngaco.formatNumber(2);
				var comboAparenciaEngaco = new Combobox({
					el : this.ui.inputAparenciaEngaco,
					comboId : 'id',
					comboVal : 'name',
					collectionEntity : IntegerCollection, 
				});
				this.ui.inputDesgrana.formatNumber(2);
				this.ui.inputPodridao.formatNumber(2);
				this.ui.inputCicatrizes.formatNumber(2);
				this.ui.inputRachaduras.formatNumber(2);
				this.ui.inputRachadurasCampo.formatNumber(2);
				this.ui.inputAmolecimento.formatNumber(2);
		

				var comboCargo = new Combobox({
					el : this.ui.inputCargo,
					comboId : 'id',
					comboVal : 'nome',
					collectionEntity : CargoCollection,
				});
				var comboVariedade = new Combobox({
					el : this.ui.inputVariedade,
					comboId : 'id',
					comboVal : 'nome',
					collectionEntity : VariedadeCollection,
				});
				
				var comboLatada = new Combobox({
					el : this.ui.inputLatada,
					comboId : 'id',
					comboVal : 'nome',
					collectionEntity : LatadaCollection,
				});
				
				var comboCabine = new Combobox({
					el : this.ui.inputCabine,
					comboId : 'id',
					comboVal : 'nome',
					collectionEntity : CabineCollection,
				});

				var comboPacking = new Combobox({
					el : this.ui.inputPacking,
					comboId : 'id',
					comboVal : 'nome',
					collectionEntity : PackingCollection,
				});
				
				var comboBolsao = new Combobox({
					el : this.ui.inputBolsao,
					comboId : 'id',
					comboVal : 'nome',
					collectionEntity : BolsaoCollection,
				});
				var comboGenerador = new Combobox({
					el : this.ui.inputGenerador,
					comboId : 'id',
					comboVal : 'nome',
					collectionEntity : GeneradorCollection,
				});
				
			
				var comboSacola = new Combobox({
					el : this.ui.inputSacola,
					comboId : 'id',
					comboVal : 'nome',
					collectionEntity : SacolaCollection,
				});
				var comboCliente = new Combobox({
					el : this.ui.inputCliente,
					comboId : 'id',
					comboVal : 'nome',
					collectionEntity : ClienteCollection,
				});
				var comboEmbalagem = new Combobox({
					el : this.ui.inputEmbalagem,
					comboId : 'id',
					comboVal : 'nome',
					collectionEntity : EmbalagemCollection,
				});
				
			});
		},
		 
		searchApontamentoQualidadePacking : function(){
			var that = this;

			this.apontamentoQualidadePackings.filterQueryParams = {
	    		tipoControle : util.escapeById('inputTipoControle'),
	    		cor : util.escapeById('inputCor'),
	    		classificacao : util.escapeById('inputClassificacao'),
	    		qualidade : util.escapeById('inputQualidade'),
	    		condicao : util.escapeById('inputCondicao'),
	    		pallet : util.escapeById('inputPallet'),
	    		dataAnalise : util.escapeById('inputDataAnalise'),
	    		dataColheita : util.escapeById('inputDataColheita'),
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
			    bolsao : util.escapeById('inputBolsao'), 
			    generador : util.escapeById('inputGenerador'), 
			    cargo : util.escapeById('inputCargo'), 
			    variedade : util.escapeById('inputVariedade'), 
			    latada : util.escapeById('inputLatada'), 
			    embalagem : util.escapeById('inputEmbalagem'), 
			    cabine : util.escapeById('inputCabine'), 
			    sacola : util.escapeById('inputSacola'), 
			    cliente : util.escapeById('inputCliente'), 
			    packing : util.escapeById('inputPacking'), 
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
		},
				
		getColumns : function() {
			var that = this;
			var columns = [
			{
				name : "tipoControle",
				editable : false,
				sortable : true,
				label 	 : "Tipo de Controle",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "cor",
				editable : false,
				sortable : true,
				label 	 : "Cor",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "classificacao",
				editable : false,
				sortable : true,
				label 	 : "Classificação",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "qualidade",
				editable : false,
				sortable : true,
				label 	 : "Qualidade",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "condicao",
				editable : false,
				sortable : true,
				label 	 : "Condição",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "pallet",
				editable : false,
				sortable : true,
				label 	 : "Pallet",
				cell 	 : "string",
			}, 
			{
				name : "dataAnalise",
				editable : false,
				sortable : true,
				label 	 : "Data da análise",
				cell 	 : "string",
			}, 
			{
				name : "dataColheita",
				editable : false,
				sortable : true,
				label 	 : "Data da colheita",
				cell 	 : "string",
			}, 
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
					buttons : that.getCellButtons(),
					context : that,
				})
			} ];
			return columns;
		},
		
		getCellButtons : function() {
			var that = this;
			var buttons = [];

			buttons.push({
				id : 'edita_ficha_button',
				type : 'primary',
				icon : 'icon-pencil fa-pencil',
				hint : 'Editar Apontamento qualidade packing',
				onClick : that.editModel,
			}, {
				id : 'delete_button',
				type : 'danger',
				icon : 'icon-trash fa-trash',
				hint : 'Remover Apontamento qualidade packing',
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

		

	});

	return PageApontamentoQualidadePacking;
});
