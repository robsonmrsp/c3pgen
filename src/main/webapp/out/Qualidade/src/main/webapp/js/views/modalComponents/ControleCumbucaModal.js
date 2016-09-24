/* generated: 24/09/2016 11:56:34 */
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

	var ControleCumbucaModal = require('text!views/modalComponents/tpl/ControleCumbucaModalTemplate.html');
	var ControleCumbucaPageCollection = require('collections/ControleCumbucaPageCollection');
	var CabineCollection = require('collections/CabineCollection');			

	// End of "Import´s" definition
	// #####################################################################################################
	// .............................................MAIN-BODY.............................................
	// #####################################################################################################

	var ControleCumbucaModal = Marionette.LayoutView.extend({
		template : _.template(ControleCumbucaModal),

		events : {
			'click #btnSearchControleCumbuca' : 'searchControleCumbuca',
			'click #btnClearControleCumbuca' : 'clearModal',
			'click tr' : 'selectRow',
			'keypress' : 'treatKeypress',
		},

		regions : {
			counterRegion : 	'#counter-controleCumbuca',
			gridRegion : 		'#grid-controleCumbuca',
			paginatorRegion : 	'#paginator-controleCumbuca',
		},

		ui : {
    		inputModalDataRegistro : '#inputModalDataRegistro',
			groupInputModalDataRegistro : '#groupInputModalDataRegistro',
    		inputModalPeso : '#inputModalPeso',
    		inputModalTipo : '#inputModalTipo',
    		inputModalQuantidadeCachos : '#inputModalQuantidadeCachos',
			inputModalCabine : '#inputModalCabine', 
		
			form : '#formSearchControleCumbuca',
			modalScreen : '.modal',
		},
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this.searchControleCumbuca();
	    	}
		},

		initialize : function(opt) {
			var that = this;

			this.onSelectModel = opt.onSelectModel;

			this.controleCumbucaCollection = new ControleCumbucaPageCollection();
			this.controleCumbucaCollection.state.pageSize = 5;
			this.controleCumbucaCollection.on('fetching', this.startFetch, this);
			this.controleCumbucaCollection.on('fetched', this.stopFetch, this);

			this.grid = new Backgrid.Grid({
				row : RowClick,
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this.getColumns(),
				emptyText : "Sem registros",
				collection : this.controleCumbucaCollection,
				emptyText : "Sem registros para exibir."

			});
			
			this.counter = new Counter({
				collection : this.controleCumbucaCollection ,
			});
			

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this.getColumns(),
				collection : this.controleCumbucaCollection,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.on('show', function() {
				that.gridRegion.show(that.grid);
				that.counterRegion.show(that.counter);
				that.paginatorRegion.show(that.paginator);
				this.ui.groupInputModalDataRegistro.datetimepicker({
					pickTime : false,
					language : 'pt_BR',
				});
				this.ui.inputModalDataRegistro.datetimepicker({
					pickTime : false,
					language : 'pt_BR',
				});
				this.ui.inputModalDataRegistro.mask('99/99/9999');
				var comboCabine = new Combobox({
					el : this.ui.inputModalCabine,
					comboId : 'id',
					comboVal : 'nome',
					collectionEntity : CabineCollection, //provavelmente vá ocorrer um erro pois CabineCollection não foi declarado
				});
			});
		},

		selectRow : function(e) {
			var modelControleCumbuca = util.getWrappedModel(e);
			if (modelControleCumbuca)
				this.onSelectModel(modelControleCumbuca);
		},
		
		getColumns : function() {
			var columns = [	

			{
				name : "dataRegistro",
				editable : false,
				sortable : true,
				label 	 : "Data de Registro",
				cell 	 : "string",
			}, 
			{
				name : "peso",
				editable : false,
				sortable : true,
				label 	 : "Nome",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "tipo",
				editable : false,
				sortable : true,
				label 	 : "Tipo de Máquina",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "quantidadeCachos",
				editable : false,
				sortable : true,
				label 	 : "N. de Cachos",
				cell : CustomNumberCell.extend({}),
			}, 
			];
			return columns;
		},

		clearFields : function() {
			util.clear('inputModalId');
			util.clear('inputModalDataRegistro'); 
			util.clear('inputModalPeso'); 
			util.clear('inputModalTipo'); 
			util.clear('inputModalQuantidadeCachos'); 
			util.clear('inputModalCabine'); 					 	
			util.scrollUpModal();
		},

		searchControleCumbuca : function() {
			this.controleCumbucaCollection.filterQueryParams = {
	    		dataRegistro : util.escapeById('inputModalDataRegistro'),
	    		peso : util.escapeById('inputModalPeso'),
	    		tipo : util.escapeById('inputModalTipo'),
	    		quantidadeCachos : util.escapeById('inputModalQuantidadeCachos'),
			};

			this.controleCumbucaCollection.fetch({
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
			this.controleCumbucaCollection.getFirstPage({
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
			this.controleCumbucaCollection.reset();
		},
		
		// Executada depois da consulta concluida.
		stopFetch : function() {
			util.stopSpinner();
			util.scrollDownModal();
		},
		
		// Executada Antes da realização da consulta.
		startFetch : function() {
			util.showSpinner('spinControleCumbuca');
		},
	});

	return ControleCumbucaModal;
});
