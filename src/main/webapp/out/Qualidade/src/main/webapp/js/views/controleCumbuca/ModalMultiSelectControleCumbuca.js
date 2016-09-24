/* generated: 24/09/2016 11:56:34 */
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
	var ControleCumbucaPageCollection = require('collections/ControleCumbucaPageCollection');
	var ModalMultiSelectControleCumbucaTemplate = require('text!views/controleCumbuca/tpl/ModalMultiSelectControleCumbucaTemplate.html');
	// End of "Import´s" definition

	var ModalControleCumbucas = Marionette.LayoutView.extend({
		template : _.template(ModalMultiSelectControleCumbucaTemplate),

		regions : {
			gridRegion : '#grid-controleCumbucas-modal',
			paginatorRegion : '#paginator-controleCumbucas-modal',
		},
		events : {
			'click .btnOk' : 'close'
		},
		ui : {
			btnOk : ".btnOk",
		},

		initialize : function(opt) {
			var that = this;

			this.projetoControleCumbucas = this.collection;
			
			this.controleCumbucas = new ControleCumbucaPageCollection();
			this.controleCumbucas.on('fetched', this.endFetch, this);
			this.controleCumbucas.on('backgrid:selected', this.selectModel, this);

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this.getColumns(),
				emptyText : "Nenhum registro para escolha",
				collection : this.controleCumbucas,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this.getColumns(),
				collection : this.controleCumbucas,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.controleCumbucas.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid controleCumbuca');
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
				this.projetoControleCumbucas.add(model)
			else
				this.projetoControleCumbucas.remove(model)
		},

		endFetch : function(_collection) {
			var that = this;
			this.controleCumbucas.each(function(model) {
				if (that.projetoControleCumbucas.findWhere({
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
				name : "dataRegistro",
				editable : false,
				sortable : false,
				label 	 : "Data de Registro",
				cell 	 : "string",
			}, 
			{
				name : "peso",
				editable : false,
				sortable : false,
				label 	 : "Nome",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "tipo",
				editable : false,
				sortable : false,
				label 	 : "Tipo de Máquina",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "quantidadeCachos",
				editable : false,
				sortable : false,
				label 	 : "N. de Cachos",
				cell : CustomNumberCell.extend({}),
			}, 
			];
			return columns;
		},
	});

	return ModalControleCumbucas;
});
