/* generated: 24/09/2016 11:56:36 */
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
	var CidadePageCollection = require('collections/CidadePageCollection');
	var ModalMultiSelectCidadeTemplate = require('text!views/cidade/tpl/ModalMultiSelectCidadeTemplate.html');
	// End of "Import´s" definition

	var ModalCidades = Marionette.LayoutView.extend({
		template : _.template(ModalMultiSelectCidadeTemplate),

		regions : {
			gridRegion : '#grid-cidades-modal',
			paginatorRegion : '#paginator-cidades-modal',
		},
		events : {
			'click .btnOk' : 'close'
		},
		ui : {
			btnOk : ".btnOk",
		},

		initialize : function(opt) {
			var that = this;

			this.projetoCidades = this.collection;
			
			this.cidades = new CidadePageCollection();
			this.cidades.on('fetched', this.endFetch, this);
			this.cidades.on('backgrid:selected', this.selectModel, this);

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this.getColumns(),
				emptyText : "Nenhum registro para escolha",
				collection : this.cidades,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this.getColumns(),
				collection : this.cidades,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.cidades.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid cidade');
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
				this.projetoCidades.add(model)
			else
				this.projetoCidades.remove(model)
		},

		endFetch : function(_collection) {
			var that = this;
			this.cidades.each(function(model) {
				if (that.projetoCidades.findWhere({
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
				name : "cep",
				editable : false,
				sortable : false,
				label 	 : "Cep",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return ModalCidades;
});
