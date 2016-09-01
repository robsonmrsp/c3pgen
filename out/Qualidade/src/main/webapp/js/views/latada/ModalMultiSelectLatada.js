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
	var LatadaPageCollection = require('collections/LatadaPageCollection');
	var ModalMultiSelectLatadaTemplate = require('text!views/latada/tpl/ModalMultiSelectLatadaTemplate.html');
	// End of "Import´s" definition

	var ModalLatadas = Marionette.LayoutView.extend({
		template : _.template(ModalMultiSelectLatadaTemplate),

		regions : {
			gridRegion : '#grid-latadas-modal',
			paginatorRegion : '#paginator-latadas-modal',
		},
		events : {
			'click .btnOk' : 'close'
		},
		ui : {
			btnOk : ".btnOk",
		},

		initialize : function(opt) {
			var that = this;

			this.projetoLatadas = this.collection;
			
			this.latadas = new LatadaPageCollection();
			this.latadas.on('fetched', this.endFetch, this);
			this.latadas.on('backgrid:selected', this.selectModel, this);

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Nenhum registro para escolha",
				collection : this.latadas,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.latadas,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.latadas.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid latada');
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
				this.projetoLatadas.add(model)
			else
				this.projetoLatadas.remove(model)
		},

		endFetch : function(_collection) {
			var that = this;
			this.latadas.each(function(model) {
				if (that.projetoLatadas.findWhere({
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

	return ModalLatadas;
});
