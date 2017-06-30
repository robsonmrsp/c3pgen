/* generated: ${.now} */
define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Backgrid = require('adapters/backgrid-adapter');
	var Marionette = require('marionette');
	var CustomNumberCell = require('views/components/CustomNumberCell');

	var util = require('utilities/utils');
	var ${firstUpper(entity.name)}PageCollection = require('collections/${firstUpper(entity.name)}PageCollection');
	var ModalMultiSelect${firstUpper(entity.name)}Template = require('text!views/${firstLower(entity.name)}/tpl/ModalMultiSelect${firstUpper(entity.name)}Template.html');
	// End of "Import´s" definition

	var Modal${firstUpper(entity.name)}s = Marionette.LayoutView.extend({
		template : _.template(ModalMultiSelect${firstUpper(entity.name)}Template),

		regions : {
			gridRegion : '#grid-${firstLower(entity.name)}s-modal',
			paginatorRegion : '#paginator-${firstLower(entity.name)}s-modal',
		},
		events : {
			'click .btnOk' : 'close'
		},
		ui : {
			btnOk : ".btnOk",
		},

		initialize : function(opt) {
			var that = this;

			this.projeto${firstUpper(entity.name)}s = this.collection;
			
			this.${firstLower(entity.name)}s = new ${firstUpper(entity.name)}PageCollection();
			this.${firstLower(entity.name)}s.on('fetched', this.endFetch, this);
			this.${firstLower(entity.name)}s.on('backgrid:selected', this.selectModel, this);

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this.getColumns(),
				emptyText : "Nenhum registro para escolha",
				collection : this.${firstLower(entity.name)}s,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this.getColumns(),
				collection : this.${firstLower(entity.name)}s,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.${firstLower(entity.name)}s.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid ${firstLower(entity.name)}');
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
				this.projeto${firstUpper(entity.name)}s.add(model)
			else
				this.projeto${firstUpper(entity.name)}s.remove(model)
		},

		endFetch : function(_collection) {
			var that = this;
			this.${firstLower(entity.name)}s.each(function(model) {
				if (that.projeto${firstUpper(entity.name)}s.findWhere({
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
			 
			<#list entity.attributes as att>
			<#if att.showInPages && att.viewApproach.type  != 'upload' >
			{
				name : "${att.name}",
				editable : false,
				sortable : false,
				label 	 : "${firstUpper(att.displayName)!firstUpper(att.name)}",
				<#if isNumeric(att.type.className)>
				cell : CustomNumberCell.extend({}),
		  		<#else>	
				cell 	 : "string",
		  		</#if>	
			}, 
			</#if>	
			</#list>
			];
			return columns;
		},
	});

	return Modal${firstUpper(entity.name)}s;
});
