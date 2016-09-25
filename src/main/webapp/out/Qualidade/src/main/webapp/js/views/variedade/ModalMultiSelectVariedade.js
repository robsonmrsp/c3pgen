/* generated: 24/09/2016 12:52:15 */
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
	var VariedadePageCollection = require('collections/VariedadePageCollection');
	var ModalMultiSelectVariedadeTemplate = require('text!views/variedade/tpl/ModalMultiSelectVariedadeTemplate.html');
	// End of "Import´s" definition

	var ModalVariedades = Marionette.LayoutView.extend({
		template : _.template(ModalMultiSelectVariedadeTemplate),

		regions : {
			gridRegion : '#grid-variedades-modal',
			paginatorRegion : '#paginator-variedades-modal',
		},
		events : {
			'click .btnOk' : 'close'
		},
		ui : {
			btnOk : ".btnOk",
		},

		initialize : function(opt) {
			var that = this;

			this.projetoVariedades = this.collection;
			
			this.variedades = new VariedadePageCollection();
			this.variedades.on('fetched', this.endFetch, this);
			this.variedades.on('backgrid:selected', this.selectModel, this);

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this.getColumns(),
				emptyText : "Nenhum registro para escolha",
				collection : this.variedades,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this.getColumns(),
				collection : this.variedades,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.variedades.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid variedade');
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
				this.projetoVariedades.add(model)
			else
				this.projetoVariedades.remove(model)
		},

		endFetch : function(_collection) {
			var that = this;
			this.variedades.each(function(model) {
				if (that.projetoVariedades.findWhere({
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

	return ModalVariedades;
});
