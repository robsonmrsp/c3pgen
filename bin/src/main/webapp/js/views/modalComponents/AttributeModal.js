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

	var AttributeModal = require('text!views/modalComponents/tpl/AttributeModalTemplate.html');
	var AttributePageCollection = require('collections/AttributePageCollection');

	// End of "Import´s" definition
	// #####################################################################################################
	// .............................................MAIN-BODY.............................................
	// #####################################################################################################

	var AttributeModal = Marionette.LayoutView.extend({
		template : _.template(AttributeModal),

		events : {
			'click #btnSearchAttribute' : 'searchAttribute',
			'click #btnClearAttribute' : 'clearModal',
			'click tr' : 'selectRow',
			'keypress' : 'treatKeypress',
		},

		regions : {
			counterRegion : '#counter',
			gridRegion : '#grid-attribute',
			paginatorRegion : '#paginator-attribute',
		},

		ui : {
    		inputModalName : '#inputModalName',
    		inputModalDisplayName : '#inputModalDisplayName',
    		inputModalMaxLen : '#inputModalMaxLen',
    		inputModalTableFieldName : '#inputModalTableFieldName',
    		inputModalMasc : '#inputModalMasc',
    		inputModalDefaultValue : '#inputModalDefaultValue',
    		inputModalPlaceholder : '#inputModalPlaceholder',
    		inputModalRequired : '#inputModalRequired',
    		inputModalUnique : '#inputModalUnique',
		
			form : '#formSearchAttribute',
			modalScreen : '.modal',
		},
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this.searchAttribute();
	    	}
		},

		initialize : function(opt) {
			var that = this;

			this.onSelectModel = opt.onSelectModel;

			this.attributeCollection = new AttributePageCollection();
			this.attributeCollection.state.pageSize = 5;
			this.attributeCollection.on('fetching', this._startFetch, this);
			this.attributeCollection.on('fetched', this._stopFetch, this);

			this.grid = new Backgrid.Grid({
				row : RowClick,
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.attributeCollection,
				emptyText : "Sem registros para exibir."

			});
			
			this.counter = new Counter({
				collection : this.attributeCollection ,
			});
			

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.attributeCollection,
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
			var modelAttribute = util.getWrappedModel(e);
			if (modelAttribute)
				this.onSelectModel(modelAttribute);
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
				name : "displayName",
				editable : false,
				sortable : true,
				label 	 : "Nome apresentado na tela",
				cell 	 : "string",
			}, 
			{
				name : "maxLen",
				editable : false,
				sortable : true,
				label 	 : "Tamanho máximo",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "tableFieldName",
				editable : false,
				sortable : true,
				label 	 : "Nome da coluna na tabela",
				cell 	 : "string",
			}, 
			{
				name : "masc",
				editable : false,
				sortable : true,
				label 	 : "Formato de Máscara",
				cell 	 : "string",
			}, 
			{
				name : "defaultValue",
				editable : false,
				sortable : true,
				label 	 : "Valor padrão",
				cell 	 : "string",
			}, 
			{
				name : "placeholder",
				editable : false,
				sortable : true,
				label 	 : "Placeholder",
				cell 	 : "string",
			}, 
			{
				name : "required",
				editable : false,
				sortable : true,
				label 	 : "Obrigatório",
				cell 	 : "string",
			}, 
			{
				name : "unique",
				editable : false,
				sortable : true,
				label 	 : "Único",
				cell 	 : "string",
			}, 
			];
			return columns;
		},

		clearFields : function() {
			util.clear('inputModalId');
			util.clear('inputModalName'); 
			util.clear('inputModalDisplayName'); 
			util.clear('inputModalMaxLen'); 
			util.clear('inputModalTableFieldName'); 
			util.clear('inputModalMasc'); 
			util.clear('inputModalDefaultValue'); 
			util.clear('inputModalPlaceholder'); 
			util.clear('inputModalRequired'); 
			util.clear('inputModalUnique'); 
			util.scrollUpModal();
		},

		searchAttribute : function() {
			this.attributeCollection.filterQueryParams = {
	    		name : util.escapeById('inputModalName'),
	    		displayName : util.escapeById('inputModalDisplayName'),
	    		maxLen : util.escapeById('inputModalMaxLen'),
	    		tableFieldName : util.escapeById('inputModalTableFieldName'),
	    		masc : util.escapeById('inputModalMasc'),
	    		defaultValue : util.escapeById('inputModalDefaultValue'),
	    		placeholder : util.escapeById('inputModalPlaceholder'),
	    		required : util.escapeById('inputModalRequired'),
	    		unique : util.escapeById('inputModalUnique'),
			};

			this.attributeCollection.fetch({
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
			this.attributeCollection.getFirstPage({
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
			this.attributeCollection.reset();
		},
		
		// Executada depois da consulta concluida.
		_stopFetch : function() {
			util.stopSpinner();
			util.scrollDownModal();
		},
		
		// Executada Antes da realização da consulta.
		_startFetch : function() {
			util.showSpinner('spinAttribute');
		},
	});

	return AttributeModal;
});
