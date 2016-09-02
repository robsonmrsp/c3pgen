/* generated: 02/09/2016 16:23:48 */
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

	var ModalMultiSelectEmbalagem = require('views/embalagem/ModalMultiSelectEmbalagem');
	var MultiSelectEmbalagemTemplate = require('text!views/embalagem/tpl/MultiSelectEmbalagemTemplate.html');

	var MultiSelectEmbalagem = Marionette.LayoutView.extend({
		template : _.template(MultiSelectEmbalagemTemplate),

		regions : {
			modalMultiSelectEmbalagemRegion : '#modalMultiSelectEmbalagems',
			gridEmbalagemsModalRegion : '#gridMultiselectEmbalagems',
		},

		initialize : function() {
			var that = this;

			this.embalagems = this.collection;

			this.gridEmbalagems = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.embalagems,
			});

			this.modalMultiSelectEmbalagem = new ModalMultiSelectEmbalagem({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectEmbalagemRegion.show(that.modalMultiSelectEmbalagem);
				that.gridEmbalagemsModalRegion.show(that.gridEmbalagems);
			});
		},
		clear : function(){
			this.modalMultiSelectEmbalagem.clear();
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
			];
			return columns;
		},
	});

	return MultiSelectEmbalagem
});
