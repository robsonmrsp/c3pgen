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

	var OperationModal = require('text!views/modalComponents/tpl/OperationModalTemplate.html');
	var OperationPageCollection = require('collections/OperationPageCollection');

	// End of "Import´s" definition
	// #####################################################################################################
	// .............................................MAIN-BODY.............................................
	// #####################################################################################################

	var OperationModal = Marionette.LayoutView.extend({
		template : _.template(OperationModal),

		events : {
			'click #btnSearchOperation' : 'searchOperation',
			'click #btnClearOperation' : 'clearModal',
			'click tr' : 'selectRow',
			'keypress' : 'treatKeypress',
		},

		regions : {
			counterRegion : 	'#counter-operation',
			gridRegion : 		'#grid-operation',
			paginatorRegion : 	'#paginator-operation',
		},

		ui : {
    		inputModalName : '#inputModalName',
    		inputModalCanEdit : '#inputModalCanEdit',
    		inputModalCanRead : '#inputModalCanRead',
    		inputModalCanUpdate : '#inputModalCanUpdate',
    		inputModalCanDelete : '#inputModalCanDelete',
    		inputModalCanExecute : '#inputModalCanExecute',
		
			form : '#formSearchOperation',
			modalScreen : '.modal',
		},
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this.searchOperation();
	    	}
		},

		initialize : function(opt) {
			var that = this;

			this.onSelectModel = opt.onSelectModel;

			this.operationCollection = new OperationPageCollection();
			this.operationCollection.state.pageSize = 5;
			this.operationCollection.on('fetching', this._startFetch, this);
			this.operationCollection.on('fetched', this._stopFetch, this);

			this.grid = new Backgrid.Grid({
				row : RowClick,
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.operationCollection,
				emptyText : "Sem registros para exibir."

			});
			
			this.counter = new Counter({
				collection : this.operationCollection ,
			});
			

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.operationCollection,
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
			var modelOperation = util.getWrappedModel(e);
			if (modelOperation)
				this.onSelectModel(modelOperation);
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
				name : "canEdit",
				editable : false,
				sortable : true,
				label 	 : "Pode Editar",
				cell 	 : "string",
			}, 
			{
				name : "canRead",
				editable : false,
				sortable : true,
				label 	 : "Pode Ler",
				cell 	 : "string",
			}, 
			{
				name : "canUpdate",
				editable : false,
				sortable : true,
				label 	 : "Pode atualizar",
				cell 	 : "string",
			}, 
			{
				name : "canDelete",
				editable : false,
				sortable : true,
				label 	 : "Pode Deletar",
				cell 	 : "string",
			}, 
			{
				name : "canExecute",
				editable : false,
				sortable : true,
				label 	 : "Pode executar",
				cell 	 : "string",
			}, 
			];
			return columns;
		},

		clearFields : function() {
			util.clear('inputModalId');
			util.clear('inputModalName'); 
			util.clear('inputModalCanEdit'); 
			util.clear('inputModalCanRead'); 
			util.clear('inputModalCanUpdate'); 
			util.clear('inputModalCanDelete'); 
			util.clear('inputModalCanExecute'); 
			util.scrollUpModal();
		},

		searchOperation : function() {
			this.operationCollection.filterQueryParams = {
	    		name : util.escapeById('inputModalName'),
	    		canEdit : util.escapeById('inputModalCanEdit'),
	    		canRead : util.escapeById('inputModalCanRead'),
	    		canUpdate : util.escapeById('inputModalCanUpdate'),
	    		canDelete : util.escapeById('inputModalCanDelete'),
	    		canExecute : util.escapeById('inputModalCanExecute'),
			};

			this.operationCollection.fetch({
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
			this.operationCollection.getFirstPage({
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
			this.operationCollection.reset();
		},
		
		// Executada depois da consulta concluida.
		_stopFetch : function() {
			util.stopSpinner();
			util.scrollDownModal();
		},
		
		// Executada Antes da realização da consulta.
		_startFetch : function() {
			util.showSpinner('spinOperation');
		},
	});

	return OperationModal;
});
