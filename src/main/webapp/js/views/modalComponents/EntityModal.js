/* generated: 30/08/2015 14:17:03 */
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

	var EntityModal = require('text!views/modalComponents/tpl/EntityModalTemplate.html');
	var EntityPageCollection = require('collections/EntityPageCollection');

	// End of "Import´s" definition
	// #####################################################################################################
	// .............................................MAIN-BODY.............................................
	// #####################################################################################################

	var EntityModal = Marionette.LayoutView.extend({
		template : _.template(EntityModal),

		events : {
			'click #btnSearchEntity' : 'searchEntity',
			'click #btnClearEntity' : 'clearModal',
			'click tr' : 'selectRow',
			'keypress' : 'treatKeypress',
		},

		regions : {
			counterRegion : '#counter',
			gridRegion : '#grid-entity',
			paginatorRegion : '#paginator-entity',
		},

		ui : {
    		inputModalName : '#inputModalName',
    		inputModalDisplayName : '#inputModalDisplayName',
    		inputModalTableName : '#inputModalTableName',
    		inputModalHasOwner : '#inputModalHasOwner',
    		inputModalHasMobile : '#inputModalHasMobile',
		
			form : '#formSearchEntity',
			modalScreen : '.modal',
		},
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this.searchEntity();
	    	}
		},

		initialize : function(opt) {
			var that = this;

			this.onSelectModel = opt.onSelectModel;

			this.entityCollection = new EntityPageCollection();
			this.entityCollection.state.pageSize = 5;
			this.entityCollection.on('fetching', this._startFetch, this);
			this.entityCollection.on('fetched', this._stopFetch, this);

			this.grid = new Backgrid.Grid({
				row : RowClick,
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.entityCollection,
				emptyText : "Sem registros para exibir."

			});
			
			this.counter = new Counter({
				collection : this.entityCollection ,
			});
			

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.entityCollection,
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
			var modelEntity = util.getWrappedModel(e);
			if (modelEntity)
				this.onSelectModel(modelEntity);
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

		searchEntity : function() {
			this.entityCollection.filterQueryParams = {
	    		name : util.escapeById('inputModalName'),
	    		displayName : util.escapeById('inputModalDisplayName'),
	    		tableName : util.escapeById('inputModalTableName'),
	    		hasOwner : util.escapeById('inputModalHasOwner'),
	    		hasMobile : util.escapeById('inputModalHasMobile'),
			};

			this.entityCollection.fetch({
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
			this.entityCollection.getFirstPage({
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
			this.entityCollection.reset();
		},
		
		// Executada depois da consulta concluida.
		_stopFetch : function() {
			util.stopSpinner();
			util.scrollDownModal();
		},
		
		// Executada Antes da realização da consulta.
		_startFetch : function() {
			util.showSpinner('spinEntity');
		},
	});

	return EntityModal;
});
