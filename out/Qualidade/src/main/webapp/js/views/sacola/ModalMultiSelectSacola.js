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
	var SacolaPageCollection = require('collections/SacolaPageCollection');
	var ModalMultiSelectSacolaTemplate = require('text!views/sacola/tpl/ModalMultiSelectSacolaTemplate.html');
	// End of "Import´s" definition

	var ModalSacolas = Marionette.LayoutView.extend({
		template : _.template(ModalMultiSelectSacolaTemplate),

		regions : {
			gridRegion : '#grid-sacolas-modal',
			paginatorRegion : '#paginator-sacolas-modal',
		},
		events : {
			'click .btnOk' : 'close'
		},
		ui : {
			btnOk : ".btnOk",
		},

		initialize : function(opt) {
			var that = this;

			this.projetoSacolas = this.collection;
			
			this.sacolas = new SacolaPageCollection();
			this.sacolas.on('fetched', this.endFetch, this);
			this.sacolas.on('backgrid:selected', this.selectModel, this);

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Nenhum registro para escolha",
				collection : this.sacolas,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.sacolas,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.sacolas.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid sacola');
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
				this.projetoSacolas.add(model)
			else
				this.projetoSacolas.remove(model)
		},

		endFetch : function(_collection) {
			var that = this;
			this.sacolas.each(function(model) {
				if (that.projetoSacolas.findWhere({
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

	return ModalSacolas;
});
