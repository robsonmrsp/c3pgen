/* generated: 24/09/2016 11:56:38 */
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
	var RolePageCollection = require('collections/RolePageCollection');
	var ModalMultiSelectRoleTemplate = require('text!views/role/tpl/ModalMultiSelectRoleTemplate.html');
	// End of "Import´s" definition

	var ModalRoles = Marionette.LayoutView.extend({
		template : _.template(ModalMultiSelectRoleTemplate),

		regions : {
			gridRegion : '#grid-roles-modal',
			paginatorRegion : '#paginator-roles-modal',
		},
		events : {
			'click .btnOk' : 'close'
		},
		ui : {
			btnOk : ".btnOk",
		},

		initialize : function(opt) {
			var that = this;

			this.projetoRoles = this.collection;
			
			this.roles = new RolePageCollection();
			this.roles.on('fetched', this.endFetch, this);
			this.roles.on('backgrid:selected', this.selectModel, this);

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this.getColumns(),
				emptyText : "Nenhum registro para escolha",
				collection : this.roles,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this.getColumns(),
				collection : this.roles,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.roles.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid role');
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
				this.projetoRoles.add(model)
			else
				this.projetoRoles.remove(model)
		},

		endFetch : function(_collection) {
			var that = this;
			this.roles.each(function(model) {
				if (that.projetoRoles.findWhere({
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
				name : "authority",
				editable : false,
				sortable : false,
				label 	 : "Autoridade",
				cell 	 : "string",
			}, 
			{
				name : "description",
				editable : false,
				sortable : false,
				label 	 : "Descrição",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return ModalRoles;
});
