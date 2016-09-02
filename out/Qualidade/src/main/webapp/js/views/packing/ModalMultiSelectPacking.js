/* generated: 02/09/2016 16:23:48 */
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
	var PackingPageCollection = require('collections/PackingPageCollection');
	var ModalMultiSelectPackingTemplate = require('text!views/packing/tpl/ModalMultiSelectPackingTemplate.html');
	// End of "Import´s" definition

	var ModalPackings = Marionette.LayoutView.extend({
		template : _.template(ModalMultiSelectPackingTemplate),

		regions : {
			gridRegion : '#grid-packings-modal',
			paginatorRegion : '#paginator-packings-modal',
		},
		events : {
			'click .btnOk' : 'close'
		},
		ui : {
			btnOk : ".btnOk",
		},

		initialize : function(opt) {
			var that = this;

			this.projetoPackings = this.collection;
			
			this.packings = new PackingPageCollection();
			this.packings.on('fetched', this.endFetch, this);
			this.packings.on('backgrid:selected', this.selectModel, this);

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Nenhum registro para escolha",
				collection : this.packings,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.packings,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.packings.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid packing');
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
				this.projetoPackings.add(model)
			else
				this.projetoPackings.remove(model)
		},

		endFetch : function(_collection) {
			var that = this;
			this.packings.each(function(model) {
				if (that.projetoPackings.findWhere({
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
			 
			];
			return columns;
		},
	});

	return ModalPackings;
});
