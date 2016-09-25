/* generated: 24/09/2016 12:52:16 */
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

	var ModalMultiSelectEndereco = require('views/endereco/ModalMultiSelectEndereco');
	var MultiSelectEnderecoTemplate = require('text!views/endereco/tpl/MultiSelectEnderecoTemplate.html');

	var MultiSelectEndereco = Marionette.LayoutView.extend({
		template : _.template(MultiSelectEnderecoTemplate),

		regions : {
			modalMultiSelectEnderecoRegion : '#modalMultiSelectEnderecos',
			gridEnderecosModalRegion : '#gridMultiselectEnderecos',
		},

		initialize : function() {
			var that = this;

			this.enderecos = this.collection;

			this.gridEnderecos = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.enderecos,
			});

			this.modalMultiSelectEndereco = new ModalMultiSelectEndereco({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectEnderecoRegion.show(that.modalMultiSelectEndereco);
				that.gridEnderecosModalRegion.show(that.gridEnderecos);
			});
		},
		clear : function(){
			this.modalMultiSelectEndereco.clear();
		},
		
		_getColumns : function() {
			var columns = [

			{
				name : "complemento",
				editable : false,
				sortable : false,
				label 	 : "Complemento",
				cell 	 : "string",
			}, 
			{
				name : "numero",
				editable : false,
				sortable : false,
				label 	 : "Número",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return MultiSelectEndereco
});
