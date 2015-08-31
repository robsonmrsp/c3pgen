/* generated: 30/08/2015 20:23:12 */
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

	var ModalMultiSelectAttribute = require('views/attribute/ModalMultiSelectAttribute');
	var MultiSelectAttributeTemplate = require('text!views/attribute/tpl/MultiSelectAttributeTemplate.html');

	var MultiSelectAttribute = Marionette.LayoutView.extend({
		template : _.template(MultiSelectAttributeTemplate),

		regions : {
			modalMultiSelectAttributeRegion : '#modalMultiSelectAttributes',
			gridAttributesModalRegion : '#gridMultiselectAttributes',
		},

		initialize : function() {
			var that = this;

			this.attributes = this.collection;

			this.gridAttributes = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.attributes,
			});

			this.modalMultiSelectAttribute = new ModalMultiSelectAttribute({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectAttributeRegion.show(that.modalMultiSelectAttribute);
				that.gridAttributesModalRegion.show(that.gridAttributes);
			});
		},
		clear : function(){
			this.modalMultiSelectAttribute.clear();
		},
		
		_getColumns : function() {
			var columns = [

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
				name : "maxLen",
				editable : false,
				sortable : false,
				label 	 : "Tamanho máximo",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "tableFieldName",
				editable : false,
				sortable : false,
				label 	 : "Nome da coluna na tabela",
				cell 	 : "string",
			}, 
			{
				name : "masc",
				editable : false,
				sortable : false,
				label 	 : "Formato de Máscara",
				cell 	 : "string",
			}, 
			{
				name : "defaultValue",
				editable : false,
				sortable : false,
				label 	 : "Valor padrão",
				cell 	 : "string",
			}, 
			{
				name : "placeholder",
				editable : false,
				sortable : false,
				label 	 : "Placeholder",
				cell 	 : "string",
			}, 
			{
				name : "required",
				editable : false,
				sortable : false,
				label 	 : "Obrigatório",
				cell 	 : "string",
			}, 
			{
				name : "unique",
				editable : false,
				sortable : false,
				label 	 : "Único",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return MultiSelectAttribute
});
