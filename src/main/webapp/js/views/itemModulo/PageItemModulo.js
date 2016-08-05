/* generated: 05/08/2016 15:59:17 */
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

	var TemplateFormItemModulos = require('text!views/itemModulo/tpl/FormItemModuloTemplate.html');
	var ItemModuloModel = require('models/ItemModuloModel');
	var ItemModuloCollection = require('collections/ItemModuloCollection');
	var ItemModuloPageCollection = require('collections/ItemModuloPageCollection');
	var PageItemModuloTemplate = require('text!views/itemModulo/tpl/PageItemModuloTemplate.html');
	
	//Filter import
	var SearchModuloModal = require('views/modalComponents/ModuloModal');
	
	// End of "Import´s" definition

	var PageItemModulo = Marionette.LayoutView.extend({
		template : _.template(PageItemModuloTemplate),

		regions : {
			gridRegion : '#grid',
			counterRegion : '#counter',
			paginatorRegion : '#paginator',
			searchModuloModalRegion : '#moduloModal',
		},
		
		events : {
			'click 	#query' : '_queryItemModulo',			
			'click 	#reset' : '_resetItemModulo',			
			'click #searchModuloModal' : '_showSearchModuloModal',
			'keypress' : 'treatKeypress',
		},
		
		
		ui : {
			inputName : '#inputName',
			inputYamlContent : '#inputYamlContent',
		
			inputModuloId : '#inputModuloId',
			inputModuloName : '#inputModuloName',
			form : '#formItemModuloFilter',
		},
		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this._queryItemModulo();
	    	}
		},

		initialize : function() {
			var that = this;

			this.itemModulos = new ItemModuloPageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.itemModulos
			});

			this.counter = new Counter({
				collection : this.itemModulos,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.itemModulos,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.itemModulos.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid itemModulo');
				},
				error : function(_col, _resp, _opts) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')) );
				}
			});
			this.searchModuloModal = new SearchModuloModal({
				onSelectModel : function(model) {
					that._selectModulo(model);
				},
			});
			this.on('show', function() {
				that.gridRegion.show(that.grid);
				that.counterRegion.show(that.counter);
				that.paginatorRegion.show(that.paginator);
				this.searchModuloModalRegion.show(this.searchModuloModal);		
		
			});
		},
		 
		_queryItemModulo : function(){
			var that = this;

			this.itemModulos.filterQueryParams = {
	    		name : util.escapeById('inputName'),
	    		yamlContent : util.escapeById('inputYamlContent'),
			    modulo : util.escapeById('inputModuloId'), 
			}
			this.itemModulos.fetch({
				success : function(_coll, _resp, _opt) {
					console.info('Consulta para o grid itemModulo');
				},
				error : function(_coll, _resp, _opt) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				},
				complete : function() {
					
				},
			})		
		},
		_resetItemModulo : function(){
			this.ui.form.get(0).reset();
			this.itemModulos.reset();
			util.clear('inputModuloId');
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
				label 	 : "Nome do item de módulo",
				cell 	 : "string",
			}, 
			{
				name : "yamlContent",
				editable : false,
				sortable : true,
				label 	 : "Conteudo do arquivo yaml",
				cell 	 : "string",
			}, 
			{
				name : "modulo.name",
				editable : false,
				sortable : true,  //já é possivel ordenar por esses atributos compostos.
				label : "Módulo",
				cell : CustomStringCell.extend({
					fieldName : 'modulo.name',
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
							util.showSuccessMessage('ItemModulo removido com sucesso!');
						},
						error : function(_model, _resp) {
							util.showErrorMessage('Problema ao salvar registro',_resp);
						}
					});
				}
			});
		},

		_getDeletePath : function(model) {
			// alert('Delete,,, ' + JSON.stringify(model));
		},

		_getEditPath : function(model) {
			return "app/editItemModulo/" + model.get('id');
		},

		_editModel : function(model) {

		},
		_showSearchModuloModal : function() {
			this.searchModuloModal.showPage();
		},
			
		_selectModulo : function(modulo) {
			this.searchModuloModal.hidePage();	
			this.ui.inputModuloId.val(modulo.get('id'));
			this.ui.inputModuloName.val(modulo.get('name'));		
		},
		

	});

	return PageItemModulo;
});
