/* generated: 03/09/2016 22:18:30 */
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

	var ModalMultiSelectAnexo = require('views/anexo/ModalMultiSelectAnexo');
	var MultiSelectAnexoTemplate = require('text!views/anexo/tpl/MultiSelectAnexoTemplate.html');

	var MultiSelectAnexo = Marionette.LayoutView.extend({
		template : _.template(MultiSelectAnexoTemplate),

		regions : {
			modalMultiSelectAnexoRegion : '#modalMultiSelectAnexos',
			gridAnexosModalRegion : '#gridMultiselectAnexos',
		},

		initialize : function() {
			var that = this;

			this.anexos = this.collection;

			this.gridAnexos = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.anexos,
			});

			this.modalMultiSelectAnexo = new ModalMultiSelectAnexo({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectAnexoRegion.show(that.modalMultiSelectAnexo);
				that.gridAnexosModalRegion.show(that.gridAnexos);
			});
		},
		clear : function(){
			this.modalMultiSelectAnexo.clear();
		},
		
		_getColumns : function() {
			var columns = [

			{
				name : "nome",
				editable : false,
				sortable : false,
				label 	 : "Nome",
				cell 	 : "string",
			}, 
			{
				name : "conteudo",
				editable : false,
				sortable : false,
				label 	 : "Conteudo",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return MultiSelectAnexo
});
