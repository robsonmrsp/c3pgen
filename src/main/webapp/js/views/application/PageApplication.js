/* generated: 30/08/2015 20:23:11 */
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

	var TemplateFormApplications = require('text!views/application/tpl/FormApplicationTemplate.html');
	var ApplicationModel = require('models/ApplicationModel');
	var ApplicationCollection = require('collections/ApplicationCollection');
	var ApplicationPageCollection = require('collections/ApplicationPageCollection');
	var PageApplicationTemplate = require('text!views/application/tpl/PageApplicationTemplate.html');
	
	//Filter import
	
	// End of "Import´s" definition

	var PageApplication = Marionette.LayoutView.extend({
		template : _.template(PageApplicationTemplate),

		regions : {
			gridRegion : '#grid',
			counterRegion : '#counter',
			paginatorRegion : '#paginator',
		},
		
		events : {
			'click 	#query' : '_queryApplication',			
			'click 	#reset' : '_resetApplication',			
			'keypress' : 'treatKeypress',
		},
		
		
		ui : {
			inputName : '#inputName',
			inputSkin : '#inputSkin',
			inputRootPackage : '#inputRootPackage',
		
			form : '#formApplicationFilter',
		},
		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this._queryApplication();
	    	}
		},

		initialize : function() {
			var that = this;

			this.applications = new ApplicationPageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.applications
			});

			this.counter = new Counter({
				collection : this.applications,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.applications,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.applications.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid application');
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
		 
		_queryApplication : function(){
			var that = this;

			this.applications.filterQueryParams = {
	    		name : util.escapeById('inputName'), 
	    		skin : util.escapeById('inputSkin'), 
	    		rootPackage : util.escapeById('inputRootPackage'), 
			}
			this.applications.fetch({
				success : function(_coll, _resp, _opt) {
					console.info('Consulta para o grid application');
				},
				error : function(_coll, _resp, _opt) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				},
				complete : function() {
					
				},
			})		
		},
		_resetApplication : function(){
			this.ui.form.get(0).reset();
			this.applications.reset();
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
				name : "skin",
				editable : false,
				sortable : true,
				label 	 : "Template",
				cell 	 : "string",
			}, 
			{
				name : "rootPackage",
				editable : false,
				sortable : true,
				label 	 : "Pacote raiz",
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
			return "app/editApplication/" + model.get('id');
		},

		_editModel : function(model) {

		},
		

	});

	return PageApplication;
});
