/* generated: 03/09/2016 22:18:34 */
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
	var PermissionPageCollection = require('collections/PermissionPageCollection');
	var ModalMultiSelectPermissionTemplate = require('text!views/permission/tpl/ModalMultiSelectPermissionTemplate.html');
	// End of "Import´s" definition

	var ModalPermissions = Marionette.LayoutView.extend({
		template : _.template(ModalMultiSelectPermissionTemplate),

		regions : {
			gridRegion : '#grid-permissions-modal',
			paginatorRegion : '#paginator-permissions-modal',
		},
		events : {
			'click .btnOk' : 'close'
		},
		ui : {
			btnOk : ".btnOk",
		},

		initialize : function(opt) {
			var that = this;

			this.projetoPermissions = this.collection;
			
			this.permissions = new PermissionPageCollection();
			this.permissions.on('fetched', this.endFetch, this);
			this.permissions.on('backgrid:selected', this.selectModel, this);

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this.getColumns(),
				emptyText : "Nenhum registro para escolha",
				collection : this.permissions,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this.getColumns(),
				collection : this.permissions,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.permissions.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid permission');
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
				this.projetoPermissions.add(model)
			else
				this.projetoPermissions.remove(model)
		},

		endFetch : function(_collection) {
			var that = this;
			this.permissions.each(function(model) {
				if (that.projetoPermissions.findWhere({
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
				name : "name",
				editable : false,
				sortable : false,
				label 	 : "Nome",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return ModalPermissions;
});
