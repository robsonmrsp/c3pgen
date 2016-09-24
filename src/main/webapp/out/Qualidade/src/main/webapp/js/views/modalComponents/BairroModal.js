/* generated: 24/09/2016 11:56:36 */
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

	var BairroModal = require('text!views/modalComponents/tpl/BairroModalTemplate.html');
	var BairroPageCollection = require('collections/BairroPageCollection');

	// End of "Import´s" definition
	// #####################################################################################################
	// .............................................MAIN-BODY.............................................
	// #####################################################################################################

	var BairroModal = Marionette.LayoutView.extend({
		template : _.template(BairroModal),

		events : {
			'click #btnSearchBairro' : 'searchBairro',
			'click #btnClearBairro' : 'clearModal',
			'click tr' : 'selectRow',
			'keypress' : 'treatKeypress',
		},

		regions : {
			counterRegion : 	'#counter-bairro',
			gridRegion : 		'#grid-bairro',
			paginatorRegion : 	'#paginator-bairro',
		},

		ui : {
    		inputModalNome : '#inputModalNome',
		
			form : '#formSearchBairro',
			modalScreen : '.modal',
		},
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this.searchBairro();
	    	}
		},

		initialize : function(opt) {
			var that = this;

			this.onSelectModel = opt.onSelectModel;

			this.bairroCollection = new BairroPageCollection();
			this.bairroCollection.state.pageSize = 5;
			this.bairroCollection.on('fetching', this.startFetch, this);
			this.bairroCollection.on('fetched', this.stopFetch, this);

			this.grid = new Backgrid.Grid({
				row : RowClick,
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this.getColumns(),
				emptyText : "Sem registros",
				collection : this.bairroCollection,
				emptyText : "Sem registros para exibir."

			});
			
			this.counter = new Counter({
				collection : this.bairroCollection ,
			});
			

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this.getColumns(),
				collection : this.bairroCollection,
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
			var modelBairro = util.getWrappedModel(e);
			if (modelBairro)
				this.onSelectModel(modelBairro);
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
			];
			return columns;
		},

		clearFields : function() {
			util.clear('inputModalId');
			util.clear('inputModalNome'); 
			util.scrollUpModal();
		},

		searchBairro : function() {
			this.bairroCollection.filterQueryParams = {
	    		nome : util.escapeById('inputModalNome'),
			};

			this.bairroCollection.fetch({
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
			this.bairroCollection.getFirstPage({
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
			this.bairroCollection.reset();
		},
		
		// Executada depois da consulta concluida.
		stopFetch : function() {
			util.stopSpinner();
			util.scrollDownModal();
		},
		
		// Executada Antes da realização da consulta.
		startFetch : function() {
			util.showSpinner('spinBairro');
		},
	});

	return BairroModal;
});
