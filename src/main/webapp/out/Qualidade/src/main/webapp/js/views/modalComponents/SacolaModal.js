/* generated: 24/09/2016 12:52:15 */
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

	var SacolaModal = require('text!views/modalComponents/tpl/SacolaModalTemplate.html');
	var SacolaPageCollection = require('collections/SacolaPageCollection');

	// End of "Import´s" definition
	// #####################################################################################################
	// .............................................MAIN-BODY.............................................
	// #####################################################################################################

	var SacolaModal = Marionette.LayoutView.extend({
		template : _.template(SacolaModal),

		events : {
			'click #btnSearchSacola' : 'searchSacola',
			'click #btnClearSacola' : 'clearModal',
			'click tr' : 'selectRow',
			'keypress' : 'treatKeypress',
		},

		regions : {
			counterRegion : 	'#counter-sacola',
			gridRegion : 		'#grid-sacola',
			paginatorRegion : 	'#paginator-sacola',
		},

		ui : {
    		inputModalNome : '#inputModalNome',
		
			form : '#formSearchSacola',
			modalScreen : '.modal',
		},
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this.searchSacola();
	    	}
		},

		initialize : function(opt) {
			var that = this;

			this.onSelectModel = opt.onSelectModel;

			this.sacolaCollection = new SacolaPageCollection();
			this.sacolaCollection.state.pageSize = 5;
			this.sacolaCollection.on('fetching', this.startFetch, this);
			this.sacolaCollection.on('fetched', this.stopFetch, this);

			this.grid = new Backgrid.Grid({
				row : RowClick,
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this.getColumns(),
				emptyText : "Sem registros",
				collection : this.sacolaCollection,
				emptyText : "Sem registros para exibir."

			});
			
			this.counter = new Counter({
				collection : this.sacolaCollection ,
			});
			

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this.getColumns(),
				collection : this.sacolaCollection,
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
			var modelSacola = util.getWrappedModel(e);
			if (modelSacola){
				this.modelSelect = modelSacola; 
				this.onSelectModel(modelSacola);
			}
		},
		getJsonValue : function() {
			var ret = {}; 
			if(this.modelSelect){
				return this.modelSelect.toJSON();
			}
			return ret;
		},
		
		getValue : function() {
			return this.modelSelect;
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

		searchSacola : function() {
			this.sacolaCollection.filterQueryParams = {
	    		nome : util.escapeById('inputModalNome'),
			};

			this.sacolaCollection.fetch({
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
			this.sacolaCollection.getFirstPage({
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
			this.sacolaCollection.reset();
		},
		
		// Executada depois da consulta concluida.
		stopFetch : function() {
			util.stopSpinner();
			util.scrollDownModal();
		},
		
		// Executada Antes da realização da consulta.
		startFetch : function() {
			util.showSpinner('spinSacola');
		},
	});

	return SacolaModal;
});
