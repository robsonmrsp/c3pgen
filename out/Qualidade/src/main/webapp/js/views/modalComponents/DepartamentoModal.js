/* generated: 01/09/2016 17:25:05 */
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

	var DepartamentoModal = require('text!views/modalComponents/tpl/DepartamentoModalTemplate.html');
	var DepartamentoPageCollection = require('collections/DepartamentoPageCollection');

	// End of "Import´s" definition
	// #####################################################################################################
	// .............................................MAIN-BODY.............................................
	// #####################################################################################################

	var DepartamentoModal = Marionette.LayoutView.extend({
		template : _.template(DepartamentoModal),

		events : {
			'click #btnSearchDepartamento' : 'searchDepartamento',
			'click #btnClearDepartamento' : 'clearModal',
			'click tr' : 'selectRow',
			'keypress' : 'treatKeypress',
		},

		regions : {
			counterRegion : 	'#counter-departamento',
			gridRegion : 		'#grid-departamento',
			paginatorRegion : 	'#paginator-departamento',
		},

		ui : {
    		inputModalNome : '#inputModalNome',
    		inputModalDescricao : '#inputModalDescricao',
		
			form : '#formSearchDepartamento',
			modalScreen : '.modal',
		},
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this.searchDepartamento();
	    	}
		},

		initialize : function(opt) {
			var that = this;

			this.onSelectModel = opt.onSelectModel;

			this.departamentoCollection = new DepartamentoPageCollection();
			this.departamentoCollection.state.pageSize = 5;
			this.departamentoCollection.on('fetching', this._startFetch, this);
			this.departamentoCollection.on('fetched', this._stopFetch, this);

			this.grid = new Backgrid.Grid({
				row : RowClick,
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.departamentoCollection,
				emptyText : "Sem registros para exibir."

			});
			
			this.counter = new Counter({
				collection : this.departamentoCollection ,
			});
			

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.departamentoCollection,
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
			var modelDepartamento = util.getWrappedModel(e);
			if (modelDepartamento)
				this.onSelectModel(modelDepartamento);
		},
		
		_getColumns : function() {
			var columns = [	

			{
				name : "nome",
				editable : false,
				sortable : true,
				label 	 : "Nome",
				cell 	 : "string",
			}, 
			{
				name : "descricao",
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
			util.clear('inputModalNome'); 
			util.clear('inputModalDescricao'); 
			util.scrollUpModal();
		},

		searchDepartamento : function() {
			this.departamentoCollection.filterQueryParams = {
	    		nome : util.escapeById('inputModalNome'),
	    		descricao : util.escapeById('inputModalDescricao'),
			};

			this.departamentoCollection.fetch({
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
			this.departamentoCollection.getFirstPage({
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
			this.departamentoCollection.reset();
		},
		
		// Executada depois da consulta concluida.
		_stopFetch : function() {
			util.stopSpinner();
			util.scrollDownModal();
		},
		
		// Executada Antes da realização da consulta.
		_startFetch : function() {
			util.showSpinner('spinDepartamento');
		},
	});

	return DepartamentoModal;
});
