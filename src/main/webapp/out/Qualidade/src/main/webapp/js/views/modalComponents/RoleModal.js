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

	var RoleModal = require('text!views/modalComponents/tpl/RoleModalTemplate.html');
	var RolePageCollection = require('collections/RolePageCollection');

	// End of "Import´s" definition
	// #####################################################################################################
	// .............................................MAIN-BODY.............................................
	// #####################################################################################################

	var RoleModal = Marionette.LayoutView.extend({
		template : _.template(RoleModal),

		events : {
			'click #btnSearchRole' : 'searchRole',
			'click #btnClearRole' : 'clearModal',
			'click tr' : 'selectRow',
			'keypress' : 'treatKeypress',
		},

		regions : {
			counterRegion : 	'#counter-role',
			gridRegion : 		'#grid-role',
			paginatorRegion : 	'#paginator-role',
		},

		ui : {
    		inputModalAuthority : '#inputModalAuthority',
    		inputModalDescription : '#inputModalDescription',
		
			form : '#formSearchRole',
			modalScreen : '.modal',
		},
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this.searchRole();
	    	}
		},

		initialize : function(opt) {
			var that = this;

			this.onSelectModel = opt.onSelectModel;

			this.roleCollection = new RolePageCollection();
			this.roleCollection.state.pageSize = 5;
			this.roleCollection.on('fetching', this.startFetch, this);
			this.roleCollection.on('fetched', this.stopFetch, this);

			this.grid = new Backgrid.Grid({
				row : RowClick,
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this.getColumns(),
				emptyText : "Sem registros",
				collection : this.roleCollection,
				emptyText : "Sem registros para exibir."

			});
			
			this.counter = new Counter({
				collection : this.roleCollection ,
			});
			

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this.getColumns(),
				collection : this.roleCollection,
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
			var modelRole = util.getWrappedModel(e);
			if (modelRole){
				this.modelSelect = modelRole; 
				this.onSelectModel(modelRole);
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
				name : "authority",
				editable : false,
				sortable : true,
				label 	 : "Autoridade",
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
			util.clear('inputModalAuthority'); 
			util.clear('inputModalDescription'); 
			util.scrollUpModal();
		},

		searchRole : function() {
			this.roleCollection.filterQueryParams = {
	    		authority : util.escapeById('inputModalAuthority'),
	    		description : util.escapeById('inputModalDescription'),
			};

			this.roleCollection.fetch({
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
			this.roleCollection.getFirstPage({
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
			this.roleCollection.reset();
		},
		
		// Executada depois da consulta concluida.
		stopFetch : function() {
			util.stopSpinner();
			util.scrollDownModal();
		},
		
		// Executada Antes da realização da consulta.
		startFetch : function() {
			util.showSpinner('spinRole');
		},
	});

	return RoleModal;
});
