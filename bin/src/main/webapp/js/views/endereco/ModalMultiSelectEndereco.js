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
	var EnderecoPageCollection = require('collections/EnderecoPageCollection');
	var ModalMultiSelectEnderecoTemplate = require('text!views/endereco/tpl/ModalMultiSelectEnderecoTemplate.html');
	// End of "Import´s" definition

	var ModalEnderecos = Marionette.LayoutView.extend({
		template : _.template(ModalMultiSelectEnderecoTemplate),

		regions : {
			gridRegion : '#grid-enderecos-modal',
			paginatorRegion : '#paginator-enderecos-modal',
		},
		events : {
			'click .btnOk' : 'close'
		},
		ui : {
			btnOk : ".btnOk",
		},

		initialize : function(opt) {
			var that = this;

			this.projetoEnderecos = this.collection;
			
			this.enderecos = new EnderecoPageCollection();
			this.enderecos.on('fetched', this.endFetch, this);
			this.enderecos.on('backgrid:selected', this.selectModel, this);

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Nenhum registro para escolha",
				collection : this.enderecos,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.enderecos,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.enderecos.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid endereco');
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
				this.projetoEnderecos.add(model)
			else
				this.projetoEnderecos.remove(model)
		},

		endFetch : function(_collection) {
			var that = this;
			this.enderecos.each(function(model) {
				if (that.projetoEnderecos.findWhere({
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
				name : "complemento",
				editable : false,
				sortable : false,
				label 	 : "Complemento",
				cell 	 : "string",
			}, 
			{
				name : "numero",
				editable : false,
				sortable : false,
				label 	 : "Número",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return ModalEnderecos;
});
