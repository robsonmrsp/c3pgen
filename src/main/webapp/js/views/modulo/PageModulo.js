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

	var TemplateFormModulos = require('text!views/modulo/tpl/FormModuloTemplate.html');
	var ModuloModel = require('models/ModuloModel');
	var ModuloCollection = require('collections/ModuloCollection');
	var ModuloPageCollection = require('collections/ModuloPageCollection');
	var PageModuloTemplate = require('text!views/modulo/tpl/PageModuloTemplate.html');
	
	//Filter import
	
	// End of "Import´s" definition

	var PageModulo = Marionette.LayoutView.extend({
		template : _.template(PageModuloTemplate),

		regions : {
			gridRegion : '#grid',
			counterRegion : '#counter',
			paginatorRegion : '#paginator',
		},
		
		events : {
			'click 	#query' : '_queryModulo',			
			'click 	#reset' : '_resetModulo',			
			'keypress' : 'treatKeypress',
		},
		
		
		ui : {
			inputNome : '#inputNome',
		
			form : '#formModuloFilter',
		},
		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this._queryModulo();
	    	}
		},

		initialize : function() {
			var that = this;

			this.modulos = new ModuloPageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.modulos
			});

			this.counter = new Counter({
				collection : this.modulos,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.modulos,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.modulos.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid modulo');
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
		 
		_queryModulo : function(){
			var that = this;

			this.modulos.filterQueryParams = {
	    		nome : util.escapeById('inputNome'),
			}
			this.modulos.fetch({
				success : function(_coll, _resp, _opt) {
					console.info('Consulta para o grid modulo');
				},
				error : function(_coll, _resp, _opt) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				},
				complete : function() {
					
				},
			})		
		},
		_resetModulo : function(){
			this.ui.form.get(0).reset();
			this.modulos.reset();
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
				name : "nome",
				editable : false,
				sortable : true,
				label 	 : "Nome do Módulo",
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
							util.showSuccessMessage('Modulo removido com sucesso!');
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
			return "app/editModulo/" + model.get('id');
		},

		_editModel : function(model) {

		},
		

	});

	return PageModulo;
});
