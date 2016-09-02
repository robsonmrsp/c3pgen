/* generated: 02/09/2016 16:23:49 */
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

	var ModalMultiSelectSession = require('views/session/ModalMultiSelectSession');
	var MultiSelectSessionTemplate = require('text!views/session/tpl/MultiSelectSessionTemplate.html');

	var MultiSelectSession = Marionette.LayoutView.extend({
		template : _.template(MultiSelectSessionTemplate),

		regions : {
			modalMultiSelectSessionRegion : '#modalMultiSelectSessions',
			gridSessionsModalRegion : '#gridMultiselectSessions',
		},

		initialize : function() {
			var that = this;

			this.sessions = this.collection;

			this.gridSessions = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.sessions,
			});

			this.modalMultiSelectSession = new ModalMultiSelectSession({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectSessionRegion.show(that.modalMultiSelectSession);
				that.gridSessionsModalRegion.show(that.gridSessions);
			});
		},
		clear : function(){
			this.modalMultiSelectSession.clear();
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

	return MultiSelectSession
});
