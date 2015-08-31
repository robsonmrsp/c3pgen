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

	var RelationshipModal = require('text!views/modalComponents/tpl/RelationshipModalTemplate.html');
	var RelationshipPageCollection = require('collections/RelationshipPageCollection');

	// End of "Import´s" definition
	// #####################################################################################################
	// .............................................MAIN-BODY.............................................
	// #####################################################################################################

	var RelationshipModal = Marionette.LayoutView.extend({
		template : _.template(RelationshipModal),

		events : {
			'click #btnSearchRelationship' : 'searchRelationship',
			'click #btnClearRelationship' : 'clearModal',
			'click tr' : 'selectRow',
			'keypress' : 'treatKeypress',
		},

		regions : {
			counterRegion : '#counter',
			gridRegion : '#grid-relationship',
			paginatorRegion : '#paginator-relationship',
		},

		ui : {
    		inputModalName : '#inputModalName',
    		inputModalDisplayName : '#inputModalDisplayName',
    		inputModalOwnerName : '#inputModalOwnerName',
    		inputModalModel : '#inputModalModel',
    		inputModalUniDirecional : '#inputModalUniDirecional',
		
			form : '#formSearchRelationship',
			modalScreen : '.modal',
		},
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this.searchRelationship();
	    	}
		},

		initialize : function(opt) {
			var that = this;

			this.onSelectModel = opt.onSelectModel;

			this.relationshipCollection = new RelationshipPageCollection();
			this.relationshipCollection.state.pageSize = 5;
			this.relationshipCollection.on('fetching', this._startFetch, this);
			this.relationshipCollection.on('fetched', this._stopFetch, this);

			this.grid = new Backgrid.Grid({
				row : RowClick,
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.relationshipCollection,
				emptyText : "Sem registros para exibir."

			});
			
			this.counter = new Counter({
				collection : this.relationshipCollection ,
			});
			

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.relationshipCollection,
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
			var modelRelationship = util.getWrappedModel(e);
			if (modelRelationship)
				this.onSelectModel(modelRelationship);
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
				name : "ownerName",
				editable : false,
				sortable : true,
				label 	 : "Dono do relacionamento",
				cell 	 : "string",
			}, 
			{
				name : "model",
				editable : false,
				sortable : true,
				label 	 : "Modelo",
				cell 	 : "string",
			}, 
			{
				name : "uniDirecional",
				editable : false,
				sortable : true,
				label 	 : "É unidirecional",
				cell 	 : "string",
			}, 
			];
			return columns;
		},

		clearFields : function() {
			util.clear('inputModalId');
			util.clear('inputModalName'); 
			util.clear('inputModalDisplayName'); 
			util.clear('inputModalOwnerName'); 
			util.clear('inputModalModel'); 
			util.clear('inputModalUniDirecional'); 
			util.scrollUpModal();
		},

		searchRelationship : function() {
			this.relationshipCollection.filterQueryParams = {
	    		name : util.escapeById('inputModalName'),
	    		displayName : util.escapeById('inputModalDisplayName'),
	    		ownerName : util.escapeById('inputModalOwnerName'),
	    		model : util.escapeById('inputModalModel'),
	    		uniDirecional : util.escapeById('inputModalUniDirecional'),
			};

			this.relationshipCollection.fetch({
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
			this.relationshipCollection.getFirstPage({
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
			this.relationshipCollection.reset();
		},
		
		// Executada depois da consulta concluida.
		_stopFetch : function() {
			util.stopSpinner();
			util.scrollDownModal();
		},
		
		// Executada Antes da realização da consulta.
		_startFetch : function() {
			util.showSpinner('spinRelationship');
		},
	});

	return RelationshipModal;
});
