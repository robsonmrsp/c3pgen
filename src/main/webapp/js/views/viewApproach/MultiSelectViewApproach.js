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

	var ModalMultiSelectViewApproach = require('views/viewApproach/ModalMultiSelectViewApproach');
	var MultiSelectViewApproachTemplate = require('text!views/viewApproach/tpl/MultiSelectViewApproachTemplate.html');

	var MultiSelectViewApproach = Marionette.LayoutView.extend({
		template : _.template(MultiSelectViewApproachTemplate),

		regions : {
			modalMultiSelectViewApproachRegion : '#modalMultiSelectViewApproachs',
			gridViewApproachsModalRegion : '#gridMultiselectViewApproachs',
		},

		initialize : function() {
			var that = this;

			this.viewApproachs = this.collection;

			this.gridViewApproachs = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.viewApproachs,
			});

			this.modalMultiSelectViewApproach = new ModalMultiSelectViewApproach({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectViewApproachRegion.show(that.modalMultiSelectViewApproach);
				that.gridViewApproachsModalRegion.show(that.gridViewApproachs);
			});
		},
		clear : function(){
			this.modalMultiSelectViewApproach.clear();
		},
		
		_getColumns : function() {
			var columns = [

			{
				name : "type",
				editable : false,
				sortable : false,
				label 	 : "Tipo",
				cell 	 : "string",
			}, 
			{
				name : "comboId",
				editable : false,
				sortable : false,
				label 	 : "Id visto no combo",
				cell 	 : "string",
			}, 
			{
				name : "comboName",
				editable : false,
				sortable : false,
				label 	 : "Nome visto no combo",
				cell 	 : "string",
			}, 
			{
				name : "comboVal",
				editable : false,
				sortable : false,
				label 	 : "Valor visto no combo",
				cell 	 : "string",
			}, 
			{
				name : "textField",
				editable : false,
				sortable : false,
				label 	 : "Campo de texto no modal",
				cell 	 : "string",
			}, 
			{
				name : "hiddenField",
				editable : false,
				sortable : false,
				label 	 : "Campo de escondido do modal",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return MultiSelectViewApproach
});
