/* generated: 24/09/2016 11:56:34 */
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

	var EmbalagemModal = require('text!views/modalComponents/tpl/EmbalagemModalTemplate.html');
	var EmbalagemPageCollection = require('collections/EmbalagemPageCollection');

	// End of "Import´s" definition
	// #####################################################################################################
	// .............................................MAIN-BODY.............................................
	// #####################################################################################################

	var EmbalagemModal = Marionette.LayoutView.extend({
		template : _.template(EmbalagemModal),

		events : {
			'click #btnSearchEmbalagem' : 'searchEmbalagem',
			'click #btnClearEmbalagem' : 'clearModal',
			'click tr' : 'selectRow',
			'keypress' : 'treatKeypress',
		},

		regions : {
			counterRegion : 	'#counter-embalagem',
			gridRegion : 		'#grid-embalagem',
			paginatorRegion : 	'#paginator-embalagem',
		},

		ui : {
    		inputModalNome : '#inputModalNome',
		
			form : '#formSearchEmbalagem',
			modalScreen : '.modal',
		},
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this.searchEmbalagem();
	    	}
		},

		initialize : function(opt) {
			var that = this;

			this.onSelectModel = opt.onSelectModel;

			this.embalagemCollection = new EmbalagemPageCollection();
			this.embalagemCollection.state.pageSize = 5;
			this.embalagemCollection.on('fetching', this.startFetch, this);
			this.embalagemCollection.on('fetched', this.stopFetch, this);

			this.grid = new Backgrid.Grid({
				row : RowClick,
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this.getColumns(),
				emptyText : "Sem registros",
				collection : this.embalagemCollection,
				emptyText : "Sem registros para exibir."

			});
			
			this.counter = new Counter({
				collection : this.embalagemCollection ,
			});
			

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this.getColumns(),
				collection : this.embalagemCollection,
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
			var modelEmbalagem = util.getWrappedModel(e);
			if (modelEmbalagem)
				this.onSelectModel(modelEmbalagem);
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

		searchEmbalagem : function() {
			this.embalagemCollection.filterQueryParams = {
	    		nome : util.escapeById('inputModalNome'),
			};

			this.embalagemCollection.fetch({
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
			this.embalagemCollection.getFirstPage({
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
			this.embalagemCollection.reset();
		},
		
		// Executada depois da consulta concluida.
		stopFetch : function() {
			util.stopSpinner();
			util.scrollDownModal();
		},
		
		// Executada Antes da realização da consulta.
		startFetch : function() {
			util.showSpinner('spinEmbalagem');
		},
	});

	return EmbalagemModal;
});
