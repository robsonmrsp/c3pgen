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
	var CepPageCollection = require('collections/CepPageCollection');
	var ModalMultiSelectCepTemplate = require('text!views/cep/tpl/ModalMultiSelectCepTemplate.html');
	// End of "Import´s" definition

	var ModalCeps = Marionette.LayoutView.extend({
		template : _.template(ModalMultiSelectCepTemplate),

		regions : {
			gridRegion : '#grid-ceps-modal',
			paginatorRegion : '#paginator-ceps-modal',
		},
		events : {
			'click .btnOk' : 'close'
		},
		ui : {
			btnOk : ".btnOk",
		},

		initialize : function(opt) {
			var that = this;

			this.projetoCeps = this.collection;
			
			this.ceps = new CepPageCollection();
			this.ceps.on('fetched', this.endFetch, this);
			this.ceps.on('backgrid:selected', this.selectModel, this);

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Nenhum registro para escolha",
				collection : this.ceps,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.ceps,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.ceps.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid cep');
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
				this.projetoCeps.add(model)
			else
				this.projetoCeps.remove(model)
		},

		endFetch : function(_collection) {
			var that = this;
			this.ceps.each(function(model) {
				if (that.projetoCeps.findWhere({
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
				name : "logradouro",
				editable : false,
				sortable : false,
				label 	 : "Logadouro",
				cell 	 : "string",
			}, 
			{
				name : "numero",
				editable : false,
				sortable : false,
				label 	 : "Numero",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return ModalCeps;
});
