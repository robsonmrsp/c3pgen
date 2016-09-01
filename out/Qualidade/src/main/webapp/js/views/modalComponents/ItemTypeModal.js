/* generated: 01/09/2016 17:25:06 */
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

	var ItemTypeModal = require('text!views/modalComponents/tpl/ItemTypeModalTemplate.html');
	var ItemTypePageCollection = require('collections/ItemTypePageCollection');

	// End of "Import´s" definition
	// #####################################################################################################
	// .............................................MAIN-BODY.............................................
	// #####################################################################################################

	var ItemTypeModal = Marionette.LayoutView.extend({
		template : _.template(ItemTypeModal),

		events : {
			'click #btnSearchItemType' : 'searchItemType',
			'click #btnClearItemType' : 'clearModal',
			'click tr' : 'selectRow',
			'keypress' : 'treatKeypress',
		},

		regions : {
			counterRegion : 	'#counter-itemType',
			gridRegion : 		'#grid-itemType',
			paginatorRegion : 	'#paginator-itemType',
		},

		ui : {
    		inputModalName : '#inputModalName',
    		inputModalDescription : '#inputModalDescription',
		
			form : '#formSearchItemType',
			modalScreen : '.modal',
		},
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this.searchItemType();
	    	}
		},

		initialize : function(opt) {
			var that = this;

			this.onSelectModel = opt.onSelectModel;

			this.itemTypeCollection = new ItemTypePageCollection();
			this.itemTypeCollection.state.pageSize = 5;
			this.itemTypeCollection.on('fetching', this._startFetch, this);
			this.itemTypeCollection.on('fetched', this._stopFetch, this);

			this.grid = new Backgrid.Grid({
				row : RowClick,
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.itemTypeCollection,
				emptyText : "Sem registros para exibir."

			});
			
			this.counter = new Counter({
				collection : this.itemTypeCollection ,
			});
			

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.itemTypeCollection,
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
			var modelItemType = util.getWrappedModel(e);
			if (modelItemType)
				this.onSelectModel(modelItemType);
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
				name : "description",
				editable : false,
				sortable : true,
				label 	 : "Descrição",
				cell 	 : "string",
			}, 
			];
			return columns;
		},

		clearFields : function() {
			util.clear('inputModalId');
			util.clear('inputModalName'); 
			util.clear('inputModalDescription'); 
			util.scrollUpModal();
		},

		searchItemType : function() {
			this.itemTypeCollection.filterQueryParams = {
	    		name : util.escapeById('inputModalName'),
	    		description : util.escapeById('inputModalDescription'),
			};

			this.itemTypeCollection.fetch({
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
			this.itemTypeCollection.getFirstPage({
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
			this.itemTypeCollection.reset();
		},
		
		// Executada depois da consulta concluida.
		_stopFetch : function() {
			util.stopSpinner();
			util.scrollDownModal();
		},
		
		// Executada Antes da realização da consulta.
		_startFetch : function() {
			util.showSpinner('spinItemType');
		},
	});

	return ItemTypeModal;
});
