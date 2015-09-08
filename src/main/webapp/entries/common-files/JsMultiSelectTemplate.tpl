/* generated: ${.now} */
define(function(require) {
	// Start "Import´s" Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Backgrid = require('adapters/backgrid-adapter');
	var Marionette = require('marionette');
	var util = require('utilities/utils');
	var BaseModel = require('models/BaseModel');
	var CustomNumberCell = require('views/components/CustomNumberCell');

	var ModalMultiSelect${entity.name} = require('views/${firstLower(entity.name)}/ModalMultiSelect${firstUpper(entity.name)}');
	var MultiSelect${firstUpper(entity.name)}Template = require('text!views/${firstLower(entity.name)}/tpl/MultiSelect${firstUpper(entity.name)}Template.html');

	var MultiSelect${firstUpper(entity.name)} = Marionette.LayoutView.extend({
		template : _.template(MultiSelect${firstUpper(entity.name)}Template),

		regions : {
			modalMultiSelect${firstUpper(entity.name)}Region : '#modalMultiSelect${firstUpper(entity.name)}s',
			grid${firstUpper(entity.name)}sModalRegion : '#gridMultiselect${firstUpper(entity.name)}s',
		},

		initialize : function() {
			var that = this;

			this.${firstLower(entity.name)}s = this.collection;

			this.grid${firstUpper(entity.name)}s = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.${firstLower(entity.name)}s,
			});

			this.modalMultiSelect${firstUpper(entity.name)} = new ModalMultiSelect${firstUpper(entity.name)}({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelect${firstUpper(entity.name)}Region.show(that.modalMultiSelect${firstUpper(entity.name)});
				that.grid${firstUpper(entity.name)}sModalRegion.show(that.grid${firstUpper(entity.name)}s);
			});
		},
		clear : function(){
			this.modalMultiSelect${firstUpper(entity.name)}.clear();
		},
		
		_getColumns : function() {
			var columns = [

			<#list entity.attributes as att>
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
			</#list>
			];
			return columns;
		},
	});

	return MultiSelect${firstUpper(entity.name)}
});
