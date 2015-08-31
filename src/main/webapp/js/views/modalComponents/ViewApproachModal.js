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

	var ViewApproachModal = require('text!views/modalComponents/tpl/ViewApproachModalTemplate.html');
	var ViewApproachPageCollection = require('collections/ViewApproachPageCollection');

	// End of "Import´s" definition
	// #####################################################################################################
	// .............................................MAIN-BODY.............................................
	// #####################################################################################################

	var ViewApproachModal = Marionette.LayoutView.extend({
		template : _.template(ViewApproachModal),

		events : {
			'click #btnSearchViewApproach' : 'searchViewApproach',
			'click #btnClearViewApproach' : 'clearModal',
			'click tr' : 'selectRow',
			'keypress' : 'treatKeypress',
		},

		regions : {
			counterRegion : '#counter',
			gridRegion : '#grid-viewApproach',
			paginatorRegion : '#paginator-viewApproach',
		},

		ui : {
    		inputModalType : '#inputModalType',
    		inputModalComboId : '#inputModalComboId',
    		inputModalComboName : '#inputModalComboName',
    		inputModalComboVal : '#inputModalComboVal',
    		inputModalTextField : '#inputModalTextField',
    		inputModalHiddenField : '#inputModalHiddenField',
		
			form : '#formSearchViewApproach',
			modalScreen : '.modal',
		},
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this.searchViewApproach();
	    	}
		},

		initialize : function(opt) {
			var that = this;

			this.onSelectModel = opt.onSelectModel;

			this.viewApproachCollection = new ViewApproachPageCollection();
			this.viewApproachCollection.state.pageSize = 5;
			this.viewApproachCollection.on('fetching', this._startFetch, this);
			this.viewApproachCollection.on('fetched', this._stopFetch, this);

			this.grid = new Backgrid.Grid({
				row : RowClick,
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.viewApproachCollection,
				emptyText : "Sem registros para exibir."

			});
			
			this.counter = new Counter({
				collection : this.viewApproachCollection ,
			});
			

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.viewApproachCollection,
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
			var modelViewApproach = util.getWrappedModel(e);
			if (modelViewApproach)
				this.onSelectModel(modelViewApproach);
		},
		
		_getColumns : function() {
			var columns = [	

			{
				name : "type",
				editable : false,
				sortable : true,
				label 	 : "Tipo",
				cell 	 : "string",
			}, 
			{
				name : "comboId",
				editable : false,
				sortable : true,
				label 	 : "Id visto no combo",
				cell 	 : "string",
			}, 
			{
				name : "comboName",
				editable : false,
				sortable : true,
				label 	 : "Nome visto no combo",
				cell 	 : "string",
			}, 
			{
				name : "comboVal",
				editable : false,
				sortable : true,
				label 	 : "Valor visto no combo",
				cell 	 : "string",
			}, 
			{
				name : "textField",
				editable : false,
				sortable : true,
				label 	 : "Campo de texto no modal",
				cell 	 : "string",
			}, 
			{
				name : "hiddenField",
				editable : false,
				sortable : true,
				label 	 : "Campo de escondido do modal",
				cell 	 : "string",
			}, 
			];
			return columns;
		},

		clearFields : function() {
			util.clear('inputModalId');
			util.clear('inputModalType'); 
			util.clear('inputModalComboId'); 
			util.clear('inputModalComboName'); 
			util.clear('inputModalComboVal'); 
			util.clear('inputModalTextField'); 
			util.clear('inputModalHiddenField'); 
			util.scrollUpModal();
		},

		searchViewApproach : function() {
			this.viewApproachCollection.filterQueryParams = {
	    		type : util.escapeById('inputModalType'),
	    		comboId : util.escapeById('inputModalComboId'),
	    		comboName : util.escapeById('inputModalComboName'),
	    		comboVal : util.escapeById('inputModalComboVal'),
	    		textField : util.escapeById('inputModalTextField'),
	    		hiddenField : util.escapeById('inputModalHiddenField'),
			};

			this.viewApproachCollection.fetch({
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
			this.viewApproachCollection.getFirstPage({
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
			this.viewApproachCollection.reset();
		},
		
		// Executada depois da consulta concluida.
		_stopFetch : function() {
			util.stopSpinner();
			util.scrollDownModal();
		},
		
		// Executada Antes da realização da consulta.
		_startFetch : function() {
			util.showSpinner('spinViewApproach');
		},
	});

	return ViewApproachModal;
});
