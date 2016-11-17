/* generated: 30/08/2015 20:23:12 */
define(function(require) {
	// Start "Import´s Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Backgrid = require('adapters/backgrid-adapter');
	var util = require('utilities/utils');
	var Combobox = require('views/components/Combobox');
	var CustomStringCell = require('views/components/CustomStringCell');
	var Counter = require('views/components/Counter');
	var ActionsCell = require('views/components/ActionsCell');
	var CustomNumberCell = require('views/components/CustomNumberCell');

	var TemplateFormAttributeTypes = require('text!views/attributeType/tpl/FormAttributeTypeTemplate.html');
	var AttributeTypeModel = require('models/AttributeTypeModel');
	var AttributeTypeCollection = require('collections/AttributeTypeCollection');
	var AttributeTypePageCollection = require('collections/AttributeTypePageCollection');
	var PageAttributeTypeTemplate = require('text!views/attributeType/tpl/PageAttributeTypeTemplate.html');
	
	//Filter import
	
	// End of "Import´s" definition

	var PageAttributeType = Marionette.LayoutView.extend({
		template : _.template(PageAttributeTypeTemplate),

		regions : {
			gridRegion : '#grid',
			counterRegion : '#counter',
			paginatorRegion : '#paginator',
		},
		
		events : {
			'click 	#query' : '_queryAttributeType',			
			'click 	#reset' : '_resetAttributeType',			
			'keypress' : 'treatKeypress',
		},
		
		
		ui : {
			inputClassName : '#inputClassName',
			inputFormat : '#inputFormat',
		
			form : '#formAttributeTypeFilter',
		},
		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this._queryAttributeType();
	    	}
		},

		initialize : function() {
			var that = this;

			this.attributeTypes = new AttributeTypePageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.attributeTypes
			});

			this.counter = new Counter({
				collection : this.attributeTypes,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.attributeTypes,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.attributeTypes.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid attributeType');
				},
				error : function(_col, _resp, _opts) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')) );
				}
			});
			this.on('show', function() {
				that.gridRegion.show(that.grid);
				that.counterRegion.show(that.counter);
				that.paginatorRegion.show(that.paginator);
			});
		},
		 
		_queryAttributeType : function(){
			var that = this;

			this.attributeTypes.filterQueryParams = {
	    		className : util.escapeById('inputClassName'), 
	    		format : util.escapeById('inputFormat'), 
			}
			this.attributeTypes.fetch({
				success : function(_coll, _resp, _opt) {
					console.info('Consulta para o grid attributeType');
				},
				error : function(_coll, _resp, _opt) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				},
				complete : function() {
					
				},
			})		
		},
		_resetAttributeType : function(){
			this.ui.form.get(0).reset();
			this.attributeTypes.reset();
		},
				
		_getColumns : function() {
			var columns = [
			//{
			//	name : "id",
			//	label : "id",
			//	editable : false,
			//	cell : Backgrid.IntegerCell.extend({
			//		orderSeparator : ''
			//	})
			//}, 
			{
				name : "className",
				editable : false,
				sortable : true,
				label 	 : "Nome",
				cell 	 : "string",
			}, 
			{
				name : "format",
				editable : false,
				sortable : true,
				label 	 : "Formato",
				cell 	 : "string",
			}, 
			{
				name : "acoes",
				label : "Ações(Editar, Deletar)",
				sortable : false,
				cell : ActionsCell.extend({
					editPath : this._getEditPath,
					deletePath : this._getDeletePath,
					editModel : this._editModel,
					deleteModel : this._deleteModel
				})
			} ];
			return columns;
		},

		_deleteModel : function(model) {
			util.Bootbox.confirm("Tem certeza que deseja remover o registro [ " + model.get('id') + "] ?", function(yes) {
				if (yes) {
					model.destroy({
						success : function() {
							util.showMessage('success', 'Registro removido com sucesso!');
						},
						error : function() {
							util.showMessage('error', 'Problemas ao remover registro!');
							console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
						}
					});
				}
			});
		},

		_getDeletePath : function(model) {
			// alert('Delete,,, ' + JSON.stringify(model));
		},

		_getEditPath : function(model) {
			return "app/editAttributeType/" + model.get('id');
		},

		_editModel : function(model) {

		},
		

	});

	return PageAttributeType;
});
