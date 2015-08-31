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
	var ApplicationPageCollection = require('collections/ApplicationPageCollection');
	var ModalMultiSelectApplicationTemplate = require('text!views/application/tpl/ModalMultiSelectApplicationTemplate.html');
	// End of "Import´s" definition

	var ModalApplications = Marionette.LayoutView.extend({
		template : _.template(ModalMultiSelectApplicationTemplate),

		regions : {
			gridRegion : '#grid-applications-modal',
			paginatorRegion : '#paginator-applications-modal',
		},
		events : {
			'click .btnOk' : 'close'
		},
		ui : {
			btnOk : ".btnOk",
		},

		initialize : function(opt) {
			var that = this;

			this.projetoApplications = this.collection;
			
			this.applications = new ApplicationPageCollection();
			this.applications.on('fetched', this.endFetch, this);
			this.applications.on('backgrid:selected', this.selectModel, this);

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Nenhum registro para escolha",
				collection : this.applications,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.applications,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.applications.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid application');
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
				this.projetoApplications.add(model)
			else
				this.projetoApplications.remove(model)
		},

		endFetch : function(_collection) {
			var that = this;
			this.applications.each(function(model) {
				if (that.projetoApplications.findWhere({
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
				name : "name",
				editable : false,
				sortable : false,
				label 	 : "Nome",
				cell 	 : "string",
			}, 
			{
				name : "skin",
				editable : false,
				sortable : false,
				label 	 : "Template",
				cell 	 : "string",
			}, 
			{
				name : "rootPackage",
				editable : false,
				sortable : false,
				label 	 : "Pacote raiz",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return ModalApplications;
});
