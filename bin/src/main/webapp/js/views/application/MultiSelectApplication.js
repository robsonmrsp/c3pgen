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

	var ModalMultiSelectApplication = require('views/application/ModalMultiSelectApplication');
	var MultiSelectApplicationTemplate = require('text!views/application/tpl/MultiSelectApplicationTemplate.html');

	var MultiSelectApplication = Marionette.LayoutView.extend({
		template : _.template(MultiSelectApplicationTemplate),

		regions : {
			modalMultiSelectApplicationRegion : '#modalMultiSelectApplications',
			gridApplicationsModalRegion : '#gridMultiselectApplications',
		},

		initialize : function() {
			var that = this;

			this.applications = this.collection;

			this.gridApplications = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.applications,
			});

			this.modalMultiSelectApplication = new ModalMultiSelectApplication({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectApplicationRegion.show(that.modalMultiSelectApplication);
				that.gridApplicationsModalRegion.show(that.gridApplications);
			});
		},
		clear : function(){
			this.modalMultiSelectApplication.clear();
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
				name : "skin",
				editable : false,
				sortable : false,
				label 	 : "Template",
				cell 	 : "string",
			}, 
			{
				name : "rootPackage",
				editable : false,
				sortable : false,
				label 	 : "Pacote raiz",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return MultiSelectApplication
});
