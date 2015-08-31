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

	var TheEntityModal = require('text!views/modalComponents/tpl/TheEntityModalTemplate.html');
	var TheEntityPageCollection = require('collections/TheEntityPageCollection');

	// End of "Import´s" definition
	// #####################################################################################################
	// .............................................MAIN-BODY.............................................
	// #####################################################################################################

	var TheEntityModal = Marionette.LayoutView.extend({
		template : _.template(TheEntityModal),

		events : {
			'click #btnSearchTheEntity' : 'searchTheEntity',
			'click #btnClearTheEntity' : 'clearModal',
			'click tr' : 'selectRow',
			'keypress' : 'treatKeypress',
		},

		regions : {
			counterRegion : '#counter',
			gridRegion : '#grid-theEntity',
			paginatorRegion : '#paginator-theEntity',
		},

		ui : {
    		inputModalName : '#inputModalName',
    		inputModalDisplayName : '#inputModalDisplayName',
    		inputModalTableName : '#inputModalTableName',
    		inputModalHasOwner : '#inputModalHasOwner',
    		inputModalHasMobile : '#inputModalHasMobile',
		
			form : '#formSearchTheEntity',
			modalScreen : '.modal',
		},
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this.searchTheEntity();
	    	}
		},

		initialize : function(opt) {
			var that = this;

			this.onSelectModel = opt.onSelectModel;

			this.theEntityCollection = new TheEntityPageCollection();
			this.theEntityCollection.state.pageSize = 5;
			this.theEntityCollection.on('fetching', this._startFetch, this);
			this.theEntityCollection.on('fetched', this._stopFetch, this);

			this.grid = new Backgrid.Grid({
				row : RowClick,
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.theEntityCollection,
				emptyText : "Sem registros para exibir."

			});
			
			this.counter = new Counter({
				collection : this.theEntityCollection ,
			});
			

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.theEntityCollection,
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
			var modelTheEntity = util.getWrappedModel(e);
			if (modelTheEntity)
				this.onSelectModel(modelTheEntity);
		},
		
		_getColumns : function() {
			var columns = [	

			{
				name : "name",
				editable : false,
				sortable : true,
				label 	 : "Name",
				cell 	 : "string",
			}, 
			{
				name : "displayName",
				editable : false,
				sortable : true,
				label 	 : "DisplayName",
				cell 	 : "string",
			}, 
			{
				name : "tableName",
				editable : false,
				sortable : true,
				label 	 : "TableName",
				cell 	 : "string",
			}, 
			{
				name : "hasOwner",
				editable : false,
				sortable : true,
				label 	 : "HasOwner",
				cell 	 : "string",
			}, 
			{
				name : "hasMobile",
				editable : false,
				sortable : true,
				label 	 : "HasMobile",
				cell 	 : "string",
			}, 
			];
			return columns;
		},

		clearFields : function() {
			util.clear('inputModalId');
			util.clear('inputModalName'); 
			util.clear('inputModalDisplayName'); 
			util.clear('inputModalTableName'); 
			util.clear('inputModalHasOwner'); 
			util.clear('inputModalHasMobile'); 
			util.scrollUpModal();
		},

		searchTheEntity : function() {
			this.theEntityCollection.filterQueryParams = {
	    		name : util.escapeById('inputModalName'),
	    		displayName : util.escapeById('inputModalDisplayName'),
	    		tableName : util.escapeById('inputModalTableName'),
	    		hasOwner : util.escapeById('inputModalHasOwner'),
	    		hasMobile : util.escapeById('inputModalHasMobile'),
			};

			this.theEntityCollection.fetch({
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
			this.theEntityCollection.getFirstPage({
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
			this.theEntityCollection.reset();
		},
		
		// Executada depois da consulta concluida.
		_stopFetch : function() {
			util.stopSpinner();
			util.scrollDownModal();
		},
		
		// Executada Antes da realização da consulta.
		_startFetch : function() {
			util.showSpinner('spinTheEntity');
		},
	});

	return TheEntityModal;
});
