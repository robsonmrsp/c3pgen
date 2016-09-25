/* generated: 24/09/2016 12:52:18 */
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
	var SessionPageCollection = require('collections/SessionPageCollection');
	var ModalMultiSelectSessionTemplate = require('text!views/session/tpl/ModalMultiSelectSessionTemplate.html');
	// End of "Import´s" definition

	var ModalSessions = Marionette.LayoutView.extend({
		template : _.template(ModalMultiSelectSessionTemplate),

		regions : {
			gridRegion : '#grid-sessions-modal',
			paginatorRegion : '#paginator-sessions-modal',
		},
		events : {
			'click .btnOk' : 'close'
		},
		ui : {
			btnOk : ".btnOk",
		},

		initialize : function(opt) {
			var that = this;

			this.projetoSessions = this.collection;
			
			this.sessions = new SessionPageCollection();
			this.sessions.on('fetched', this.endFetch, this);
			this.sessions.on('backgrid:selected', this.selectModel, this);

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this.getColumns(),
				emptyText : "Nenhum registro para escolha",
				collection : this.sessions,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this.getColumns(),
				collection : this.sessions,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.sessions.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid session');
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
				this.projetoSessions.add(model)
			else
				this.projetoSessions.remove(model)
		},

		endFetch : function(_collection) {
			var that = this;
			this.sessions.each(function(model) {
				if (that.projetoSessions.findWhere({
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
			{
				name : "creationDate",
				editable : false,
				sortable : false,
				label 	 : "Data da criação",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return ModalSessions;
});
