/* generated: 01/09/2016 17:25:05 */
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
	var CboPageCollection = require('collections/CboPageCollection');
	var ModalMultiSelectCboTemplate = require('text!views/cbo/tpl/ModalMultiSelectCboTemplate.html');
	// End of "Import´s" definition

	var ModalCbos = Marionette.LayoutView.extend({
		template : _.template(ModalMultiSelectCboTemplate),

		regions : {
			gridRegion : '#grid-cbos-modal',
			paginatorRegion : '#paginator-cbos-modal',
		},
		events : {
			'click .btnOk' : 'close'
		},
		ui : {
			btnOk : ".btnOk",
		},

		initialize : function(opt) {
			var that = this;

			this.projetoCbos = this.collection;
			
			this.cbos = new CboPageCollection();
			this.cbos.on('fetched', this.endFetch, this);
			this.cbos.on('backgrid:selected', this.selectModel, this);

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Nenhum registro para escolha",
				collection : this.cbos,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.cbos,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.cbos.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid cbo');
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
				this.projetoCbos.add(model)
			else
				this.projetoCbos.remove(model)
		},

		endFetch : function(_collection) {
			var that = this;
			this.cbos.each(function(model) {
				if (that.projetoCbos.findWhere({
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
				cell 	 : "string",
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

	return ModalCbos;
});
