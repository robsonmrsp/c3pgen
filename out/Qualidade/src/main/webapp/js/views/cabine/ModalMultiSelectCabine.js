/* generated: 03/09/2016 22:18:31 */
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
	var CabinePageCollection = require('collections/CabinePageCollection');
	var ModalMultiSelectCabineTemplate = require('text!views/cabine/tpl/ModalMultiSelectCabineTemplate.html');
	// End of "Import´s" definition

	var ModalCabines = Marionette.LayoutView.extend({
		template : _.template(ModalMultiSelectCabineTemplate),

		regions : {
			gridRegion : '#grid-cabines-modal',
			paginatorRegion : '#paginator-cabines-modal',
		},
		events : {
			'click .btnOk' : 'close'
		},
		ui : {
			btnOk : ".btnOk",
		},

		initialize : function(opt) {
			var that = this;

			this.projetoCabines = this.collection;
			
			this.cabines = new CabinePageCollection();
			this.cabines.on('fetched', this.endFetch, this);
			this.cabines.on('backgrid:selected', this.selectModel, this);

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this.getColumns(),
				emptyText : "Nenhum registro para escolha",
				collection : this.cabines,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this.getColumns(),
				collection : this.cabines,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.cabines.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid cabine');
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
				this.projetoCabines.add(model)
			else
				this.projetoCabines.remove(model)
		},

		endFetch : function(_collection) {
			var that = this;
			this.cabines.each(function(model) {
				if (that.projetoCabines.findWhere({
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
			];
			return columns;
		},
	});

	return ModalCabines;
});
