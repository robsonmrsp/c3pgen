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

	var AttributeTypeModal = require('text!views/modalComponents/tpl/AttributeTypeModalTemplate.html');
	var AttributeTypePageCollection = require('collections/AttributeTypePageCollection');

	// End of "Import´s" definition
	// #####################################################################################################
	// .............................................MAIN-BODY.............................................
	// #####################################################################################################

	var AttributeTypeModal = Marionette.LayoutView.extend({
		template : _.template(AttributeTypeModal),

		events : {
			'click #btnSearchAttributeType' : 'searchAttributeType',
			'click #btnClearAttributeType' : 'clearModal',
			'click tr' : 'selectRow',
			'keypress' : 'treatKeypress',
		},

		regions : {
			counterRegion : '#counter',
			gridRegion : '#grid-attributeType',
			paginatorRegion : '#paginator-attributeType',
		},

		ui : {
    		inputModalClassName : '#inputModalClassName',
    		inputModalFormat : '#inputModalFormat',
		
			form : '#formSearchAttributeType',
			modalScreen : '.modal',
		},
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this.searchAttributeType();
	    	}
		},

		initialize : function(opt) {
			var that = this;

			this.onSelectModel = opt.onSelectModel;

			this.attributeTypeCollection = new AttributeTypePageCollection();
			this.attributeTypeCollection.state.pageSize = 5;
			this.attributeTypeCollection.on('fetching', this._startFetch, this);
			this.attributeTypeCollection.on('fetched', this._stopFetch, this);

			this.grid = new Backgrid.Grid({
				row : RowClick,
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.attributeTypeCollection,
				emptyText : "Sem registros para exibir."

			});
			
			this.counter = new Counter({
				collection : this.attributeTypeCollection ,
			});
			

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.attributeTypeCollection,
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
			var modelAttributeType = util.getWrappedModel(e);
			if (modelAttributeType)
				this.onSelectModel(modelAttributeType);
		},
		
		_getColumns : function() {
			var columns = [	

			{
				name : "className",
				editable : false,
				sortable : true,
				label 	 : "Nome",
				cell 	 : "string",
			}, 
			{
				name : "format",
				editable : false,
				sortable : true,
				label 	 : "Formato",
				cell 	 : "string",
			}, 
			];
			return columns;
		},

		clearFields : function() {
			util.clear('inputModalId');
			util.clear('inputModalClassName'); 
			util.clear('inputModalFormat'); 
			util.scrollUpModal();
		},

		searchAttributeType : function() {
			this.attributeTypeCollection.filterQueryParams = {
	    		className : util.escapeById('inputModalClassName'),
	    		format : util.escapeById('inputModalFormat'),
			};

			this.attributeTypeCollection.fetch({
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
			this.attributeTypeCollection.getFirstPage({
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
			this.attributeTypeCollection.reset();
		},
		
		// Executada depois da consulta concluida.
		_stopFetch : function() {
			util.stopSpinner();
			util.scrollDownModal();
		},
		
		// Executada Antes da realização da consulta.
		_startFetch : function() {
			util.showSpinner('spinAttributeType');
		},
	});

	return AttributeTypeModal;
});
