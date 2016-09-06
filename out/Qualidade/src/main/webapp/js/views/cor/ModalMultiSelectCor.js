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
	var CorPageCollection = require('collections/CorPageCollection');
	var ModalMultiSelectCorTemplate = require('text!views/cor/tpl/ModalMultiSelectCorTemplate.html');
	// End of "Import´s" definition

	var ModalCors = Marionette.LayoutView.extend({
		template : _.template(ModalMultiSelectCorTemplate),

		regions : {
			gridRegion : '#grid-cors-modal',
			paginatorRegion : '#paginator-cors-modal',
		},
		events : {
			'click .btnOk' : 'close'
		},
		ui : {
			btnOk : ".btnOk",
		},

		initialize : function(opt) {
			var that = this;

			this.projetoCors = this.collection;
			
			this.cors = new CorPageCollection();
			this.cors.on('fetched', this.endFetch, this);
			this.cors.on('backgrid:selected', this.selectModel, this);

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this.getColumns(),
				emptyText : "Nenhum registro para escolha",
				collection : this.cors,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this.getColumns(),
				collection : this.cors,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.cors.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid cor');
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
				this.projetoCors.add(model)
			else
				this.projetoCors.remove(model)
		},

		endFetch : function(_collection) {
			var that = this;
			this.cors.each(function(model) {
				if (that.projetoCors.findWhere({
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

	return ModalCors;
});
