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

	var ClienteModal = require('text!views/modalComponents/tpl/ClienteModalTemplate.html');
	var ClientePageCollection = require('collections/ClientePageCollection');

	// End of "Import´s" definition
	// #####################################################################################################
	// .............................................MAIN-BODY.............................................
	// #####################################################################################################

	var ClienteModal = Marionette.LayoutView.extend({
		template : _.template(ClienteModal),

		events : {
			'click #btnSearchCliente' : 'searchCliente',
			'click #btnClearCliente' : 'clearModal',
			'click tr' : 'selectRow',
			'keypress' : 'treatKeypress',
		},

		regions : {
			counterRegion : '#counter',
			gridRegion : '#grid-cliente',
			paginatorRegion : '#paginator-cliente',
		},

		ui : {
    		inputModalNome : '#inputModalNome',
    		inputModalEmail : '#inputModalEmail',
    		inputModalCpf : '#inputModalCpf',
    		inputModalTelefone : '#inputModalTelefone',
    		inputModalOutroTelefone : '#inputModalOutroTelefone',
		
			form : '#formSearchCliente',
			modalScreen : '.modal',
		},
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this.searchCliente();
	    	}
		},

		initialize : function(opt) {
			var that = this;

			this.onSelectModel = opt.onSelectModel;

			this.clienteCollection = new ClientePageCollection();
			this.clienteCollection.state.pageSize = 5;
			this.clienteCollection.on('fetching', this._startFetch, this);
			this.clienteCollection.on('fetched', this._stopFetch, this);

			this.grid = new Backgrid.Grid({
				row : RowClick,
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.clienteCollection,
				emptyText : "Sem registros para exibir."

			});
			
			this.counter = new Counter({
				collection : this.clienteCollection ,
			});
			

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.clienteCollection,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.on('show', function() {
				that.gridRegion.show(that.grid);
				that.counterRegion.show(that.counter);
				that.paginatorRegion.show(that.paginator);
				this.ui.inputModalCpf.mask('999.999.999-99');
			});
		},

		selectRow : function(e) {
			var modelCliente = util.getWrappedModel(e);
			if (modelCliente)
				this.onSelectModel(modelCliente);
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
				name : "email",
				editable : false,
				sortable : true,
				label 	 : "Email",
				cell 	 : "string",
			}, 
			{
				name : "cpf",
				editable : false,
				sortable : true,
				label 	 : "Cpf",
				cell 	 : "string",
			}, 
			{
				name : "telefone",
				editable : false,
				sortable : true,
				label 	 : "Outro Telefone",
				cell 	 : "string",
			}, 
			{
				name : "outroTelefone",
				editable : false,
				sortable : true,
				label 	 : "Outro Telefone",
				cell 	 : "string",
			}, 
			];
			return columns;
		},

		clearFields : function() {
			util.clear('inputModalId');
			util.clear('inputModalNome'); 
			util.clear('inputModalEmail'); 
			util.clear('inputModalCpf'); 
			util.clear('inputModalTelefone'); 
			util.clear('inputModalOutroTelefone'); 
			util.scrollUpModal();
		},

		searchCliente : function() {
			this.clienteCollection.filterQueryParams = {
	    		nome : util.escapeById('inputModalNome'),
	    		email : util.escapeById('inputModalEmail'),
	    		cpf : util.escapeById('inputModalCpf'),
	    		telefone : util.escapeById('inputModalTelefone'),
	    		outroTelefone : util.escapeById('inputModalOutroTelefone'),
			};

			this.clienteCollection.fetch({
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
			this.clienteCollection.getFirstPage({
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
			this.clienteCollection.reset();
		},
		
		// Executada depois da consulta concluida.
		_stopFetch : function() {
			util.stopSpinner();
			util.scrollDownModal();
		},
		
		// Executada Antes da realização da consulta.
		_startFetch : function() {
			util.showSpinner('spinCliente');
		},
	});

	return ClienteModal;
});
