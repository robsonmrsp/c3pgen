/* generated: 24/09/2016 12:52:18 */
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

	var SessionModal = require('text!views/modalComponents/tpl/SessionModalTemplate.html');
	var SessionPageCollection = require('collections/SessionPageCollection');
	var UserCollection = require('collections/UserCollection');			

	// End of "Import´s" definition
	// #####################################################################################################
	// .............................................MAIN-BODY.............................................
	// #####################################################################################################

	var SessionModal = Marionette.LayoutView.extend({
		template : _.template(SessionModal),

		events : {
			'click #btnSearchSession' : 'searchSession',
			'click #btnClearSession' : 'clearModal',
			'click tr' : 'selectRow',
			'keypress' : 'treatKeypress',
		},

		regions : {
			counterRegion : 	'#counter-session',
			gridRegion : 		'#grid-session',
			paginatorRegion : 	'#paginator-session',
		},

		ui : {
    		inputModalName : '#inputModalName',
    		inputModalCreationDate : '#inputModalCreationDate',
			groupInputModalCreationDate : '#groupInputModalCreationDate',
			inputModalUser : '#inputModalUser', 
		
			form : '#formSearchSession',
			modalScreen : '.modal',
		},
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this.searchSession();
	    	}
		},

		initialize : function(opt) {
			var that = this;

			this.onSelectModel = opt.onSelectModel;

			this.sessionCollection = new SessionPageCollection();
			this.sessionCollection.state.pageSize = 5;
			this.sessionCollection.on('fetching', this.startFetch, this);
			this.sessionCollection.on('fetched', this.stopFetch, this);

			this.grid = new Backgrid.Grid({
				row : RowClick,
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this.getColumns(),
				emptyText : "Sem registros",
				collection : this.sessionCollection,
				emptyText : "Sem registros para exibir."

			});
			
			this.counter = new Counter({
				collection : this.sessionCollection ,
			});
			

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this.getColumns(),
				collection : this.sessionCollection,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.on('show', function() {
				that.gridRegion.show(that.grid);
				that.counterRegion.show(that.counter);
				that.paginatorRegion.show(that.paginator);
				this.ui.groupInputModalCreationDate.datetimepicker({
					pickTime : true,
					language : 'pt_BR',
				});
				this.ui.inputModalCreationDate.datetimepicker({
					pickTime : true,
					language : 'pt_BR',
				});
				this.ui.inputModalCreationDate.mask('99/99/9999');
				var comboUser = new Combobox({
					el : this.ui.inputModalUser,
					comboId : 'id',
					comboVal : 'name',
					collectionEntity : UserCollection, //provavelmente vá ocorrer um erro pois UserCollection não foi declarado
				});
			});
		},

		selectRow : function(e) {
			var modelSession = util.getWrappedModel(e);
			if (modelSession){
				this.modelSelect = modelSession; 
				this.onSelectModel(modelSession);
			}
		},
		getJsonValue : function() {
			var ret = {}; 
			if(this.modelSelect){
				return this.modelSelect.toJSON();
			}
			return ret;
		},
		
		getValue : function() {
			return this.modelSelect;
		},
		
		getColumns : function() {
			var columns = [	

			{
				name : "name",
				editable : false,
				sortable : true,
				label 	 : "Nome",
				cell 	 : "string",
			}, 
			{
				name : "creationDate",
				editable : false,
				sortable : true,
				label 	 : "Data da criação",
				cell 	 : "string",
			}, 
			];
			return columns;
		},

		clearFields : function() {
			util.clear('inputModalId');
			util.clear('inputModalName'); 
			util.clear('inputModalCreationDate'); 
			util.clear('inputModalUser'); 					 	
			util.scrollUpModal();
		},

		searchSession : function() {
			this.sessionCollection.filterQueryParams = {
	    		name : util.escapeById('inputModalName'),
	    		creationDate : util.escapeById('inputModalCreationDate'),
			};

			this.sessionCollection.fetch({
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
			this.sessionCollection.getFirstPage({
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
			this.sessionCollection.reset();
		},
		
		// Executada depois da consulta concluida.
		stopFetch : function() {
			util.stopSpinner();
			util.scrollDownModal();
		},
		
		// Executada Antes da realização da consulta.
		startFetch : function() {
			util.showSpinner('spinSession');
		},
	});

	return SessionModal;
});
