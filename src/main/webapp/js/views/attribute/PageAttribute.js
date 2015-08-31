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

	var TemplateFormAttributes = require('text!views/attribute/tpl/FormAttributeTemplate.html');
	var AttributeModel = require('models/AttributeModel');
	var AttributeCollection = require('collections/AttributeCollection');
	var AttributePageCollection = require('collections/AttributePageCollection');
	var PageAttributeTemplate = require('text!views/attribute/tpl/PageAttributeTemplate.html');
	
	//Filter import
	var SearchEntityModal = require('views/modalComponents/TheEntityModal');
	
	// End of "Import´s" definition

	var PageAttribute = Marionette.LayoutView.extend({
		template : _.template(PageAttributeTemplate),

		regions : {
			gridRegion : '#grid',
			counterRegion : '#counter',
			paginatorRegion : '#paginator',
			searchEntityModalRegion : '#entityModal',
		},
		
		events : {
			'click 	#query' : '_queryAttribute',			
			'click 	#reset' : '_resetAttribute',			
			'click #searchEntityModal' : '_showSearchEntityModal',
			'keypress' : 'treatKeypress',
		},
		
		
		ui : {
			inputName : '#inputName',
			inputDisplayName : '#inputDisplayName',
			inputMaxLen : '#inputMaxLen',
			inputTableFieldName : '#inputTableFieldName',
			inputMasc : '#inputMasc',
			inputDefaultValue : '#inputDefaultValue',
			inputPlaceholder : '#inputPlaceholder',
			inputRequired : '#inputRequired',
			inputUnique : '#inputUnique',
		
			inputEntityId : '#inputEntityId',
			inputEntityName : '#inputEntityName',
			form : '#formAttributeFilter',
		},
		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this._queryAttribute();
	    	}
		},

		initialize : function() {
			var that = this;

			this.attributes = new AttributePageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.attributes
			});

			this.counter = new Counter({
				collection : this.attributes,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.attributes,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.attributes.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid attribute');
				},
				error : function(_col, _resp, _opts) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')) );
				}
			});
			this.searchEntityModal = new SearchEntityModal({
				onSelectModel : function(model) {
					that._selectEntity(model);
				},
			});
			this.on('show', function() {
				that.gridRegion.show(that.grid);
				that.counterRegion.show(that.counter);
				that.paginatorRegion.show(that.paginator);
				this.searchEntityModalRegion.show(this.searchEntityModal);		
			});
		},
		 
		_queryAttribute : function(){
			var that = this;

			this.attributes.filterQueryParams = {
	    		name : util.escapeById('inputName'), 
	    		displayName : util.escapeById('inputDisplayName'), 
	    		maxLen : util.escapeById('inputMaxLen'), 
	    		tableFieldName : util.escapeById('inputTableFieldName'), 
	    		masc : util.escapeById('inputMasc'), 
	    		defaultValue : util.escapeById('inputDefaultValue'), 
	    		placeholder : util.escapeById('inputPlaceholder'), 
	    		required : util.escapeById('inputRequired'), 
	    		unique : util.escapeById('inputUnique'), 
			    entity : util.escapeById('inputEntityId'), 
			}
			this.attributes.fetch({
				success : function(_coll, _resp, _opt) {
					console.info('Consulta para o grid attribute');
				},
				error : function(_coll, _resp, _opt) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				},
				complete : function() {
					
				},
			})		
		},
		_resetAttribute : function(){
			this.ui.form.get(0).reset();
			this.attributes.reset();
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
				name : "name",
				editable : false,
				sortable : true,
				label 	 : "Nome",
				cell 	 : "string",
			}, 
			{
				name : "displayName",
				editable : false,
				sortable : true,
				label 	 : "Nome apresentado na tela",
				cell 	 : "string",
			}, 
			{
				name : "maxLen",
				editable : false,
				sortable : true,
				label 	 : "Tamanho máximo",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "tableFieldName",
				editable : false,
				sortable : true,
				label 	 : "Nome da coluna na tabela",
				cell 	 : "string",
			}, 
			{
				name : "masc",
				editable : false,
				sortable : true,
				label 	 : "Formato de Máscara",
				cell 	 : "string",
			}, 
			{
				name : "defaultValue",
				editable : false,
				sortable : true,
				label 	 : "Valor padrão",
				cell 	 : "string",
			}, 
			{
				name : "placeholder",
				editable : false,
				sortable : true,
				label 	 : "Placeholder",
				cell 	 : "string",
			}, 
			{
				name : "required",
				editable : false,
				sortable : true,
				label 	 : "Obrigatório",
				cell 	 : "string",
			}, 
			{
				name : "unique",
				editable : false,
				sortable : true,
				label 	 : "Único",
				cell 	 : "string",
			}, 
			{
				name : "entity.name",
				editable : false,
				sortable : true,  //já é possivel ordenar por esses atributos compostos.
				label : "Entidade",
				cell : CustomStringCell.extend({
					fieldName : 'entity.name',
				}),
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
			return "app/editAttribute/" + model.get('id');
		},

		_editModel : function(model) {

		},
		_showSearchEntityModal : function() {
			this.searchEntityModal.showPage();
		},
			
		_selectEntity : function(entity) {
			this.searchEntityModal.hidePage();	
			this.ui.inputEntityId.val(entity.get('id'));
			this.ui.inputEntityName.val(entity.get('name'));		
		},
		

	});

	return PageAttribute;
});
