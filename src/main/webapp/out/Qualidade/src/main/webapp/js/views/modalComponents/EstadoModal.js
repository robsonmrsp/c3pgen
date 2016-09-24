/* generated: 24/09/2016 11:56:37 */
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

	var EstadoModal = require('text!views/modalComponents/tpl/EstadoModalTemplate.html');
	var EstadoPageCollection = require('collections/EstadoPageCollection');

	// End of "Import´s" definition
	// #####################################################################################################
	// .............................................MAIN-BODY.............................................
	// #####################################################################################################

	var EstadoModal = Marionette.LayoutView.extend({
		template : _.template(EstadoModal),

		events : {
			'click #btnSearchEstado' : 'searchEstado',
			'click #btnClearEstado' : 'clearModal',
			'click tr' : 'selectRow',
			'keypress' : 'treatKeypress',
		},

		regions : {
			counterRegion : 	'#counter-estado',
			gridRegion : 		'#grid-estado',
			paginatorRegion : 	'#paginator-estado',
		},

		ui : {
    		inputModalNome : '#inputModalNome',
    		inputModalFaixaCep1Ini : '#inputModalFaixaCep1Ini',
    		inputModalFaixaCep1Fim : '#inputModalFaixaCep1Fim',
    		inputModalFaixaCep2Ini : '#inputModalFaixaCep2Ini',
    		inputModalFaixaCep2Fim : '#inputModalFaixaCep2Fim',
		
			form : '#formSearchEstado',
			modalScreen : '.modal',
		},
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this.searchEstado();
	    	}
		},

		initialize : function(opt) {
			var that = this;

			this.onSelectModel = opt.onSelectModel;

			this.estadoCollection = new EstadoPageCollection();
			this.estadoCollection.state.pageSize = 5;
			this.estadoCollection.on('fetching', this.startFetch, this);
			this.estadoCollection.on('fetched', this.stopFetch, this);

			this.grid = new Backgrid.Grid({
				row : RowClick,
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this.getColumns(),
				emptyText : "Sem registros",
				collection : this.estadoCollection,
				emptyText : "Sem registros para exibir."

			});
			
			this.counter = new Counter({
				collection : this.estadoCollection ,
			});
			

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this.getColumns(),
				collection : this.estadoCollection,
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
			var modelEstado = util.getWrappedModel(e);
			if (modelEstado)
				this.onSelectModel(modelEstado);
		},
		
		getColumns : function() {
			var columns = [	

			{
				name : "nome",
				editable : false,
				sortable : true,
				label 	 : "Nome",
				cell 	 : "string",
			}, 
			{
				name : "faixaCep1Ini",
				editable : false,
				sortable : true,
				label 	 : "Faixa_cep1_ini",
				cell 	 : "string",
			}, 
			{
				name : "faixaCep1Fim",
				editable : false,
				sortable : true,
				label 	 : "Faixa_cep1_fim",
				cell 	 : "string",
			}, 
			{
				name : "faixaCep2Ini",
				editable : false,
				sortable : true,
				label 	 : "Faixa_cep2_ini",
				cell 	 : "string",
			}, 
			{
				name : "faixaCep2Fim",
				editable : false,
				sortable : true,
				label 	 : "Faixa_cep2_fim",
				cell 	 : "string",
			}, 
			];
			return columns;
		},

		clearFields : function() {
			util.clear('inputModalId');
			util.clear('inputModalNome'); 
			util.clear('inputModalFaixaCep1Ini'); 
			util.clear('inputModalFaixaCep1Fim'); 
			util.clear('inputModalFaixaCep2Ini'); 
			util.clear('inputModalFaixaCep2Fim'); 
			util.scrollUpModal();
		},

		searchEstado : function() {
			this.estadoCollection.filterQueryParams = {
	    		nome : util.escapeById('inputModalNome'),
	    		faixaCep1Ini : util.escapeById('inputModalFaixaCep1Ini'),
	    		faixaCep1Fim : util.escapeById('inputModalFaixaCep1Fim'),
	    		faixaCep2Ini : util.escapeById('inputModalFaixaCep2Ini'),
	    		faixaCep2Fim : util.escapeById('inputModalFaixaCep2Fim'),
			};

			this.estadoCollection.fetch({
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
			this.estadoCollection.getFirstPage({
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
			this.estadoCollection.reset();
		},
		
		// Executada depois da consulta concluida.
		stopFetch : function() {
			util.stopSpinner();
			util.scrollDownModal();
		},
		
		// Executada Antes da realização da consulta.
		startFetch : function() {
			util.showSpinner('spinEstado');
		},
	});

	return EstadoModal;
});
