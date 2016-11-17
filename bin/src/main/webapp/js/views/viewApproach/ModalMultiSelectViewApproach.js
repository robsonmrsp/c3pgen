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
	var ViewApproachPageCollection = require('collections/ViewApproachPageCollection');
	var ModalMultiSelectViewApproachTemplate = require('text!views/viewApproach/tpl/ModalMultiSelectViewApproachTemplate.html');
	// End of "Import´s" definition

	var ModalViewApproachs = Marionette.LayoutView.extend({
		template : _.template(ModalMultiSelectViewApproachTemplate),

		regions : {
			gridRegion : '#grid-viewApproachs-modal',
			paginatorRegion : '#paginator-viewApproachs-modal',
		},
		events : {
			'click .btnOk' : 'close'
		},
		ui : {
			btnOk : ".btnOk",
		},

		initialize : function(opt) {
			var that = this;

			this.projetoViewApproachs = this.collection;
			
			this.viewApproachs = new ViewApproachPageCollection();
			this.viewApproachs.on('fetched', this.endFetch, this);
			this.viewApproachs.on('backgrid:selected', this.selectModel, this);

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Nenhum registro para escolha",
				collection : this.viewApproachs,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.viewApproachs,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.viewApproachs.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid viewApproach');
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
				this.projetoViewApproachs.add(model)
			else
				this.projetoViewApproachs.remove(model)
		},

		endFetch : function(_collection) {
			var that = this;
			this.viewApproachs.each(function(model) {
				if (that.projetoViewApproachs.findWhere({
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
				name : "type",
				editable : false,
				sortable : false,
				label 	 : "Tipo",
				cell 	 : "string",
			}, 
			{
				name : "comboId",
				editable : false,
				sortable : false,
				label 	 : "Id visto no combo",
				cell 	 : "string",
			}, 
			{
				name : "comboName",
				editable : false,
				sortable : false,
				label 	 : "Nome visto no combo",
				cell 	 : "string",
			}, 
			{
				name : "comboVal",
				editable : false,
				sortable : false,
				label 	 : "Valor visto no combo",
				cell 	 : "string",
			}, 
			{
				name : "textField",
				editable : false,
				sortable : false,
				label 	 : "Campo de texto no modal",
				cell 	 : "string",
			}, 
			{
				name : "hiddenField",
				editable : false,
				sortable : false,
				label 	 : "Campo de escondido do modal",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return ModalViewApproachs;
});
