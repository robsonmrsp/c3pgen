/* generated: 30/08/2015 20:23:12 */
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

	var ApplicationModal = require('text!views/modalComponents/tpl/ApplicationModalTemplate.html');
	var ApplicationPageCollection = require('collections/ApplicationPageCollection');

	// End of "Import´s" definition
	// #####################################################################################################
	// .............................................MAIN-BODY.............................................
	// #####################################################################################################

	var ApplicationModal = Marionette.LayoutView.extend({
		template : _.template(ApplicationModal),

		events : {
			'click #btnSearchApplication' : 'searchApplication',
			'click #btnClearApplication' : 'clearModal',
			'click tr' : 'selectRow',
			'keypress' : 'treatKeypress',
		},

		regions : {
			counterRegion : '#counter',
			gridRegion : '#grid-application',
			paginatorRegion : '#paginator-application',
		},

		ui : {
    		inputModalName : '#inputModalName',
    		inputModalSkin : '#inputModalSkin',
    		inputModalRootPackage : '#inputModalRootPackage',
		
			form : '#formSearchApplication',
			modalScreen : '.modal',
		},
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this.searchApplication();
	    	}
		},

		initialize : function(opt) {
			var that = this;

			this.onSelectModel = opt.onSelectModel;

			this.applicationCollection = new ApplicationPageCollection();
			this.applicationCollection.state.pageSize = 5;
			this.applicationCollection.on('fetching', this._startFetch, this);
			this.applicationCollection.on('fetched', this._stopFetch, this);

			this.grid = new Backgrid.Grid({
				row : RowClick,
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.applicationCollection,
				emptyText : "Sem registros para exibir."

			});
			
			this.counter = new Counter({
				collection : this.applicationCollection ,
			});
			

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.applicationCollection,
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
			var modelApplication = util.getWrappedModel(e);
			if (modelApplication)
				this.onSelectModel(modelApplication);
		},
		
		_getColumns : function() {
			var columns = [	

			{
				name : "name",
				editable : false,
				sortable : true,
				label 	 : "Nome",
				cell 	 : "string",
			}, 
			{
				name : "skin",
				editable : false,
				sortable : true,
				label 	 : "Template",
				cell 	 : "string",
			}, 
			{
				name : "rootPackage",
				editable : false,
				sortable : true,
				label 	 : "Pacote raiz",
				cell 	 : "string",
			}, 
			];
			return columns;
		},

		clearFields : function() {
			util.clear('inputModalId');
			util.clear('inputModalName'); 
			util.clear('inputModalSkin'); 
			util.clear('inputModalRootPackage'); 
			util.scrollUpModal();
		},

		searchApplication : function() {
			this.applicationCollection.filterQueryParams = {
	    		name : util.escapeById('inputModalName'),
	    		skin : util.escapeById('inputModalSkin'),
	    		rootPackage : util.escapeById('inputModalRootPackage'),
			};

			this.applicationCollection.fetch({
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
			this.applicationCollection.getFirstPage({
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
			this.applicationCollection.reset();
		},
		
		// Executada depois da consulta concluida.
		_stopFetch : function() {
			util.stopSpinner();
			util.scrollDownModal();
		},
		
		// Executada Antes da realização da consulta.
		_startFetch : function() {
			util.showSpinner('spinApplication');
		},
	});

	return ApplicationModal;
});
