/* generated: 05/08/2016 15:59:17 */
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

	var ItemModuloModal = require('text!views/modalComponents/tpl/ItemModuloModalTemplate.html');
	var ItemModuloPageCollection = require('collections/ItemModuloPageCollection');

	// End of "Import´s" definition
	// #####################################################################################################
	// .............................................MAIN-BODY.............................................
	// #####################################################################################################

	var ItemModuloModal = Marionette.LayoutView.extend({
		template : _.template(ItemModuloModal),

		events : {
			'click #btnSearchItemModulo' : 'searchItemModulo',
			'click #btnClearItemModulo' : 'clearModal',
			'click tr' : 'selectRow',
			'keypress' : 'treatKeypress',
		},

		regions : {
			counterRegion : 	'#counter-itemModulo',
			gridRegion : 		'#grid-itemModulo',
			paginatorRegion : 	'#paginator-itemModulo',
		},

		ui : {
    		inputModalName : '#inputModalName',
    		inputModalYamlContent : '#inputModalYamlContent',
		
			form : '#formSearchItemModulo',
			modalScreen : '.modal',
		},
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this.searchItemModulo();
	    	}
		},

		initialize : function(opt) {
			var that = this;

			this.onSelectModel = opt.onSelectModel;

			this.itemModuloCollection = new ItemModuloPageCollection();
			this.itemModuloCollection.state.pageSize = 5;
			this.itemModuloCollection.on('fetching', this._startFetch, this);
			this.itemModuloCollection.on('fetched', this._stopFetch, this);

			this.grid = new Backgrid.Grid({
				row : RowClick,
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.itemModuloCollection,
				emptyText : "Sem registros para exibir."

			});
			
			this.counter = new Counter({
				collection : this.itemModuloCollection ,
			});
			

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.itemModuloCollection,
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
			var modelItemModulo = util.getWrappedModel(e);
			if (modelItemModulo)
				this.onSelectModel(modelItemModulo);
		},
		
		_getColumns : function() {
			var columns = [	

			{
				name : "name",
				editable : false,
				sortable : true,
				label 	 : "Nome do item de módulo",
				cell 	 : "string",
			}, 
			{
				name : "yamlContent",
				editable : false,
				sortable : true,
				label 	 : "Conteudo do arquivo yaml",
				cell 	 : "string",
			}, 
			];
			return columns;
		},

		clearFields : function() {
			util.clear('inputModalId');
			util.clear('inputModalName'); 
			util.clear('inputModalYamlContent'); 
			util.scrollUpModal();
		},

		searchItemModulo : function() {
			this.itemModuloCollection.filterQueryParams = {
	    		name : util.escapeById('inputModalName'),
	    		yamlContent : util.escapeById('inputModalYamlContent'),
			};

			this.itemModuloCollection.fetch({
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
			this.itemModuloCollection.getFirstPage({
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
			this.itemModuloCollection.reset();
		},
		
		// Executada depois da consulta concluida.
		_stopFetch : function() {
			util.stopSpinner();
			util.scrollDownModal();
		},
		
		// Executada Antes da realização da consulta.
		_startFetch : function() {
			util.showSpinner('spinItemModulo');
		},
	});

	return ItemModuloModal;
});
