/* generated: 30/08/2015 20:23:12 */
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
	var PaisPageCollection = require('collections/PaisPageCollection');
	var ModalMultiSelectPaisTemplate = require('text!views/pais/tpl/ModalMultiSelectPaisTemplate.html');
	// End of "Import´s" definition

	var ModalPaiss = Marionette.LayoutView.extend({
		template : _.template(ModalMultiSelectPaisTemplate),

		regions : {
			gridRegion : '#grid-paiss-modal',
			paginatorRegion : '#paginator-paiss-modal',
		},
		events : {
			'click .btnOk' : 'close'
		},
		ui : {
			btnOk : ".btnOk",
		},

		initialize : function(opt) {
			var that = this;

			this.projetoPaiss = this.collection;
			
			this.paiss = new PaisPageCollection();
			this.paiss.on('fetched', this.endFetch, this);
			this.paiss.on('backgrid:selected', this.selectModel, this);

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Nenhum registro para escolha",
				collection : this.paiss,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.paiss,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.paiss.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid pais');
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
				this.projetoPaiss.add(model)
			else
				this.projetoPaiss.remove(model)
		},

		endFetch : function(_collection) {
			var that = this;
			this.paiss.each(function(model) {
				if (that.projetoPaiss.findWhere({
					id : model.get('id')
				})) {
					model.trigger("backgrid:select", model, true);
				}
			});
		},
		clear : function(){
			this.grid.$el.find('input[type=checkbox]').prop('checked', false);
		},
		_getColumns : function() {
			var columns = [{
				name : "",
				cell : "select-row",
				headerCell : "select-all"
			}, 
			 
			{
				name : "codigo",
				editable : false,
				sortable : false,
				label 	 : "Código",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "nome",
				editable : false,
				sortable : false,
				label 	 : "Nome",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return ModalPaiss;
});
