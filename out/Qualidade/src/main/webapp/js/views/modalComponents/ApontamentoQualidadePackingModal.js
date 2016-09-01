/* generated: 01/09/2016 17:25:05 */
define(function(require) {
	// Start "Import´s" Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Backgrid = require('adapters/backgrid-adapter');
	var util = require('utilities/utils');
	var RadioButtonCell = require('views/components/RadioButtonCell');
	var Counter = require('views/components/Counter');
	var RowClick = require('views/components/CustomClickedRow');
	var Combobox = require('views/components/Combobox');
	var CustomNumberCell = require('views/components/CustomNumberCell');

	var ApontamentoQualidadePackingModal = require('text!views/modalComponents/tpl/ApontamentoQualidadePackingModalTemplate.html');
	var ApontamentoQualidadePackingPageCollection = require('collections/ApontamentoQualidadePackingPageCollection');

	// End of "Import´s" definition
	// #####################################################################################################
	// .............................................MAIN-BODY.............................................
	// #####################################################################################################

	var ApontamentoQualidadePackingModal = Marionette.LayoutView.extend({
		template : _.template(ApontamentoQualidadePackingModal),

		events : {
			'click #btnSearchApontamentoQualidadePacking' : 'searchApontamentoQualidadePacking',
			'click #btnClearApontamentoQualidadePacking' : 'clearModal',
			'click tr' : 'selectRow',
			'keypress' : 'treatKeypress',
		},

		regions : {
			counterRegion : 	'#counter-apontamentoQualidadePacking',
			gridRegion : 		'#grid-apontamentoQualidadePacking',
			paginatorRegion : 	'#paginator-apontamentoQualidadePacking',
		},

		ui : {
    		inputModalAparencia : '#inputModalAparencia',
    		inputModalDiametroMinimo : '#inputModalDiametroMinimo',
    		inputModalDiametroMaximo : '#inputModalDiametroMaximo',
    		inputModalDiametroMedio : '#inputModalDiametroMedio',
    		inputModalBrixMinimo : '#inputModalBrixMinimo',
    		inputModalBrixMaximo : '#inputModalBrixMaximo',
    		inputModalBrixMedio : '#inputModalBrixMedio',
    		inputModalPesoCachoMinimo : '#inputModalPesoCachoMinimo',
    		inputModalPesoCachoMaximo : '#inputModalPesoCachoMaximo',
    		inputModalPesoSacolaMinimo : '#inputModalPesoSacolaMinimo',
    		inputModalPesoSacolaMaximo : '#inputModalPesoSacolaMaximo',
    		inputModalNumeroCachoSacola : '#inputModalNumeroCachoSacola',
    		inputModalNumeroSacola : '#inputModalNumeroSacola',
    		inputModalPesoCumbucaMinimo : '#inputModalPesoCumbucaMinimo',
    		inputModalPesoCumbucaMaximo : '#inputModalPesoCumbucaMaximo',
    		inputModalNumeroCachosCumbuca : '#inputModalNumeroCachosCumbuca',
    		inputModalNumeroCumbucas : '#inputModalNumeroCumbucas',
    		inputModalPesoBruto : '#inputModalPesoBruto',
    		inputModalPesoLiquido : '#inputModalPesoLiquido',
    		inputModalCorposEstranhos : '#inputModalCorposEstranhos',
    		inputModalBagasAquosas : '#inputModalBagasAquosas',
    		inputModalBagasCristalinas : '#inputModalBagasCristalinas',
    		inputModalFirmeza : '#inputModalFirmeza',
    		inputModalDanos : '#inputModalDanos',
    		inputModalPragas : '#inputModalPragas',
    		inputModalDoencas : '#inputModalDoencas',
    		inputModalAparenciaEngaco : '#inputModalAparenciaEngaco',
    		inputModalDesgrana : '#inputModalDesgrana',
    		inputModalPodridao : '#inputModalPodridao',
    		inputModalCicatrizes : '#inputModalCicatrizes',
    		inputModalRachaduras : '#inputModalRachaduras',
    		inputModalRachadurasCampo : '#inputModalRachadurasCampo',
    		inputModalAmolecimento : '#inputModalAmolecimento',
    		inputModalObservacao : '#inputModalObservacao',
    		inputModalDataHora : '#inputModalDataHora',
		
			form : '#formSearchApontamentoQualidadePacking',
			modalScreen : '.modal',
		},
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this.searchApontamentoQualidadePacking();
	    	}
		},

		initialize : function(opt) {
			var that = this;

			this.onSelectModel = opt.onSelectModel;

			this.apontamentoQualidadePackingCollection = new ApontamentoQualidadePackingPageCollection();
			this.apontamentoQualidadePackingCollection.state.pageSize = 5;
			this.apontamentoQualidadePackingCollection.on('fetching', this._startFetch, this);
			this.apontamentoQualidadePackingCollection.on('fetched', this._stopFetch, this);

			this.grid = new Backgrid.Grid({
				row : RowClick,
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.apontamentoQualidadePackingCollection,
				emptyText : "Sem registros para exibir."

			});
			
			this.counter = new Counter({
				collection : this.apontamentoQualidadePackingCollection ,
			});
			

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.apontamentoQualidadePackingCollection,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.on('show', function() {
				that.gridRegion.show(that.grid);
				that.counterRegion.show(that.counter);
				that.paginatorRegion.show(that.paginator);
			});
		},

		selectRow : function(e) {
			var modelApontamentoQualidadePacking = util.getWrappedModel(e);
			if (modelApontamentoQualidadePacking)
				this.onSelectModel(modelApontamentoQualidadePacking);
		},
		
		_getColumns : function() {
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
			];
			return columns;
		},

		clearFields : function() {
			util.clear('inputModalId');
			util.clear('inputModalAparencia'); 
			util.clear('inputModalDiametroMinimo'); 
			util.clear('inputModalDiametroMaximo'); 
			util.clear('inputModalDiametroMedio'); 
			util.clear('inputModalBrixMinimo'); 
			util.clear('inputModalBrixMaximo'); 
			util.clear('inputModalBrixMedio'); 
			util.clear('inputModalPesoCachoMinimo'); 
			util.clear('inputModalPesoCachoMaximo'); 
			util.clear('inputModalPesoSacolaMinimo'); 
			util.clear('inputModalPesoSacolaMaximo'); 
			util.clear('inputModalNumeroCachoSacola'); 
			util.clear('inputModalNumeroSacola'); 
			util.clear('inputModalPesoCumbucaMinimo'); 
			util.clear('inputModalPesoCumbucaMaximo'); 
			util.clear('inputModalNumeroCachosCumbuca'); 
			util.clear('inputModalNumeroCumbucas'); 
			util.clear('inputModalPesoBruto'); 
			util.clear('inputModalPesoLiquido'); 
			util.clear('inputModalCorposEstranhos'); 
			util.clear('inputModalBagasAquosas'); 
			util.clear('inputModalBagasCristalinas'); 
			util.clear('inputModalFirmeza'); 
			util.clear('inputModalDanos'); 
			util.clear('inputModalPragas'); 
			util.clear('inputModalDoencas'); 
			util.clear('inputModalAparenciaEngaco'); 
			util.clear('inputModalDesgrana'); 
			util.clear('inputModalPodridao'); 
			util.clear('inputModalCicatrizes'); 
			util.clear('inputModalRachaduras'); 
			util.clear('inputModalRachadurasCampo'); 
			util.clear('inputModalAmolecimento'); 
			util.clear('inputModalObservacao'); 
			util.clear('inputModalDataHora'); 
			util.scrollUpModal();
		},

		searchApontamentoQualidadePacking : function() {
			this.apontamentoQualidadePackingCollection.filterQueryParams = {
	    		aparencia : util.escapeById('inputModalAparencia'),
	    		diametroMinimo : util.escapeById('inputModalDiametroMinimo'),
	    		diametroMaximo : util.escapeById('inputModalDiametroMaximo'),
	    		diametroMedio : util.escapeById('inputModalDiametroMedio'),
	    		brixMinimo : util.escapeById('inputModalBrixMinimo'),
	    		brixMaximo : util.escapeById('inputModalBrixMaximo'),
	    		brixMedio : util.escapeById('inputModalBrixMedio'),
	    		pesoCachoMinimo : util.escapeById('inputModalPesoCachoMinimo'),
	    		pesoCachoMaximo : util.escapeById('inputModalPesoCachoMaximo'),
	    		pesoSacolaMinimo : util.escapeById('inputModalPesoSacolaMinimo'),
	    		pesoSacolaMaximo : util.escapeById('inputModalPesoSacolaMaximo'),
	    		numeroCachoSacola : util.escapeById('inputModalNumeroCachoSacola'),
	    		numeroSacola : util.escapeById('inputModalNumeroSacola'),
	    		pesoCumbucaMinimo : util.escapeById('inputModalPesoCumbucaMinimo'),
	    		pesoCumbucaMaximo : util.escapeById('inputModalPesoCumbucaMaximo'),
	    		numeroCachosCumbuca : util.escapeById('inputModalNumeroCachosCumbuca'),
	    		numeroCumbucas : util.escapeById('inputModalNumeroCumbucas'),
	    		pesoBruto : util.escapeById('inputModalPesoBruto'),
	    		pesoLiquido : util.escapeById('inputModalPesoLiquido'),
	    		corposEstranhos : util.escapeById('inputModalCorposEstranhos'),
	    		bagasAquosas : util.escapeById('inputModalBagasAquosas'),
	    		bagasCristalinas : util.escapeById('inputModalBagasCristalinas'),
	    		firmeza : util.escapeById('inputModalFirmeza'),
	    		danos : util.escapeById('inputModalDanos'),
	    		pragas : util.escapeById('inputModalPragas'),
	    		doencas : util.escapeById('inputModalDoencas'),
	    		aparenciaEngaco : util.escapeById('inputModalAparenciaEngaco'),
	    		desgrana : util.escapeById('inputModalDesgrana'),
	    		podridao : util.escapeById('inputModalPodridao'),
	    		cicatrizes : util.escapeById('inputModalCicatrizes'),
	    		rachaduras : util.escapeById('inputModalRachaduras'),
	    		rachadurasCampo : util.escapeById('inputModalRachadurasCampo'),
	    		amolecimento : util.escapeById('inputModalAmolecimento'),
	    		observacao : util.escapeById('inputModalObservacao'),
	    		dataHora : util.escapeById('inputModalDataHora'),
			};

			this.apontamentoQualidadePackingCollection.fetch({
				resetState : true,
				success : function(_coll, _resp, _opt) {
					//caso queira algum tratamento de sucesso adicional
				},
				error : function(_coll, _resp, _opt) {
					console.error(_coll, _resp, _opt)
				}
			});
		},

		hidePage : function() {
			this.ui.modalScreen.modal('hide');
		},

		showPage : function() {
			this.clearModal();

			this.ui.modalScreen.modal('show');
			this.apontamentoQualidadePackingCollection.getFirstPage({
				success : function(_col, _resp, _opts) {
					//caso queira algum tratamento de sucesso adicional
				},
				error : function(_col, _resp, _opts) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				}
			});
		},

		clearModal : function() {
			this.clearFields();
			this.ui.form.get(0).reset();
			this.apontamentoQualidadePackingCollection.reset();
		},
		
		// Executada depois da consulta concluida.
		_stopFetch : function() {
			util.stopSpinner();
			util.scrollDownModal();
		},
		
		// Executada Antes da realização da consulta.
		_startFetch : function() {
			util.showSpinner('spinApontamentoQualidadePacking');
		},
	});

	return ApontamentoQualidadePackingModal;
});
