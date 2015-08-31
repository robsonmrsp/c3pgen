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
	var RelationshipPageCollection = require('collections/RelationshipPageCollection');
	var ModalMultiSelectRelationshipTemplate = require('text!views/relationship/tpl/ModalMultiSelectRelationshipTemplate.html');
	// End of "Import´s" definition

	var ModalRelationships = Marionette.LayoutView.extend({
		template : _.template(ModalMultiSelectRelationshipTemplate),

		regions : {
			gridRegion : '#grid-relationships-modal',
			paginatorRegion : '#paginator-relationships-modal',
		},
		events : {
			'click .btnOk' : 'close'
		},
		ui : {
			btnOk : ".btnOk",
		},

		initialize : function(opt) {
			var that = this;

			this.projetoRelationships = this.collection;
			
			this.relationships = new RelationshipPageCollection();
			this.relationships.on('fetched', this.endFetch, this);
			this.relationships.on('backgrid:selected', this.selectModel, this);

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Nenhum registro para escolha",
				collection : this.relationships,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.relationships,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.relationships.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid relationship');
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
				this.projetoRelationships.add(model)
			else
				this.projetoRelationships.remove(model)
		},

		endFetch : function(_collection) {
			var that = this;
			this.relationships.each(function(model) {
				if (that.projetoRelationships.findWhere({
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
				name : "displayName",
				editable : false,
				sortable : false,
				label 	 : "Nome apresentado na tela",
				cell 	 : "string",
			}, 
			{
				name : "ownerName",
				editable : false,
				sortable : false,
				label 	 : "Dono do relacionamento",
				cell 	 : "string",
			}, 
			{
				name : "model",
				editable : false,
				sortable : false,
				label 	 : "Modelo",
				cell 	 : "string",
			}, 
			{
				name : "uniDirecional",
				editable : false,
				sortable : false,
				label 	 : "É unidirecional",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return ModalRelationships;
});
