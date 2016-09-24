/* generated: 24/09/2016 11:56:37 */
define(function(require) {
	// Start "Import´s Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Backgrid = require('adapters/backgrid-adapter');
	var Marionette = require('marionette');
	var CustomNumberCell = require('views/components/CustomNumberCell');

	var util = require('utilities/utils');
	var EstadoPageCollection = require('collections/EstadoPageCollection');
	var ModalMultiSelectEstadoTemplate = require('text!views/estado/tpl/ModalMultiSelectEstadoTemplate.html');
	// End of "Import´s" definition

	var ModalEstados = Marionette.LayoutView.extend({
		template : _.template(ModalMultiSelectEstadoTemplate),

		regions : {
			gridRegion : '#grid-estados-modal',
			paginatorRegion : '#paginator-estados-modal',
		},
		events : {
			'click .btnOk' : 'close'
		},
		ui : {
			btnOk : ".btnOk",
		},

		initialize : function(opt) {
			var that = this;

			this.projetoEstados = this.collection;
			
			this.estados = new EstadoPageCollection();
			this.estados.on('fetched', this.endFetch, this);
			this.estados.on('backgrid:selected', this.selectModel, this);

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this.getColumns(),
				emptyText : "Nenhum registro para escolha",
				collection : this.estados,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this.getColumns(),
				collection : this.estados,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.estados.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid estado');
				},
				error : function(_col, _resp, _opts) {
					console.error(_resp.responseText || _resp.getResponseHeader('exception'));
				}
			});


			this.on('show', function() {
				that.gridRegion.show(that.grid);
				that.paginatorRegion.show(that.paginator);
			});
		},

		selectModel : function(model, checked) {
			if (checked)
				this.projetoEstados.add(model)
			else
				this.projetoEstados.remove(model)
		},

		endFetch : function(_collection) {
			var that = this;
			this.estados.each(function(model) {
				if (that.projetoEstados.findWhere({
					id : model.get('id')
				})) {
					model.trigger("backgrid:select", model, true);
				}
			});
		},
		clear : function(){
			this.grid.$el.find('input[type=checkbox]').prop('checked', false);
		},
		getColumns : function() {
			var columns = [{
				name : "",
				cell : "select-row",
				headerCell : "select-all"
			}, 
			 
			{
				name : "nome",
				editable : false,
				sortable : false,
				label 	 : "Nome",
				cell 	 : "string",
			}, 
			{
				name : "faixaCep1Ini",
				editable : false,
				sortable : false,
				label 	 : "Faixa_cep1_ini",
				cell 	 : "string",
			}, 
			{
				name : "faixaCep1Fim",
				editable : false,
				sortable : false,
				label 	 : "Faixa_cep1_fim",
				cell 	 : "string",
			}, 
			{
				name : "faixaCep2Ini",
				editable : false,
				sortable : false,
				label 	 : "Faixa_cep2_ini",
				cell 	 : "string",
			}, 
			{
				name : "faixaCep2Fim",
				editable : false,
				sortable : false,
				label 	 : "Faixa_cep2_fim",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return ModalEstados;
});
