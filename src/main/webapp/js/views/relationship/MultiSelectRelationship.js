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

	var ModalMultiSelectRelationship = require('views/relationship/ModalMultiSelectRelationship');
	var MultiSelectRelationshipTemplate = require('text!views/relationship/tpl/MultiSelectRelationshipTemplate.html');

	var MultiSelectRelationship = Marionette.LayoutView.extend({
		template : _.template(MultiSelectRelationshipTemplate),

		regions : {
			modalMultiSelectRelationshipRegion : '#modalMultiSelectRelationships',
			gridRelationshipsModalRegion : '#gridMultiselectRelationships',
		},

		initialize : function() {
			var that = this;

			this.relationships = this.collection;

			this.gridRelationships = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.relationships,
			});

			this.modalMultiSelectRelationship = new ModalMultiSelectRelationship({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectRelationshipRegion.show(that.modalMultiSelectRelationship);
				that.gridRelationshipsModalRegion.show(that.gridRelationships);
			});
		},
		clear : function(){
			this.modalMultiSelectRelationship.clear();
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

	return MultiSelectRelationship
});
