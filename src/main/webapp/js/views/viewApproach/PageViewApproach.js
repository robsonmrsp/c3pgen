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

	var TemplateFormViewApproachs = require('text!views/viewApproach/tpl/FormViewApproachTemplate.html');
	var ViewApproachModel = require('models/ViewApproachModel');
	var ViewApproachCollection = require('collections/ViewApproachCollection');
	var ViewApproachPageCollection = require('collections/ViewApproachPageCollection');
	var PageViewApproachTemplate = require('text!views/viewApproach/tpl/PageViewApproachTemplate.html');
	
	//Filter import
	
	// End of "Import´s" definition

	var PageViewApproach = Marionette.LayoutView.extend({
		template : _.template(PageViewApproachTemplate),

		regions : {
			gridRegion : '#grid',
			counterRegion : '#counter',
			paginatorRegion : '#paginator',
		},
		
		events : {
			'click 	#query' : '_queryViewApproach',			
			'click 	#reset' : '_resetViewApproach',			
			'keypress' : 'treatKeypress',
		},
		
		
		ui : {
			inputType : '#inputType',
			inputComboId : '#inputComboId',
			inputComboName : '#inputComboName',
			inputComboVal : '#inputComboVal',
			inputTextField : '#inputTextField',
			inputHiddenField : '#inputHiddenField',
		
			form : '#formViewApproachFilter',
		},
		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this._queryViewApproach();
	    	}
		},

		initialize : function() {
			var that = this;

			this.viewApproachs = new ViewApproachPageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.viewApproachs
			});

			this.counter = new Counter({
				collection : this.viewApproachs,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.viewApproachs,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.viewApproachs.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid viewApproach');
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
		 
		_queryViewApproach : function(){
			var that = this;

			this.viewApproachs.filterQueryParams = {
	    		type : util.escapeById('inputType'), 
	    		comboId : util.escapeById('inputComboId'), 
	    		comboName : util.escapeById('inputComboName'), 
	    		comboVal : util.escapeById('inputComboVal'), 
	    		textField : util.escapeById('inputTextField'), 
	    		hiddenField : util.escapeById('inputHiddenField'), 
			}
			this.viewApproachs.fetch({
				success : function(_coll, _resp, _opt) {
					console.info('Consulta para o grid viewApproach');
				},
				error : function(_coll, _resp, _opt) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				},
				complete : function() {
					
				},
			})		
		},
		_resetViewApproach : function(){
			this.ui.form.get(0).reset();
			this.viewApproachs.reset();
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
				name : "type",
				editable : false,
				sortable : true,
				label 	 : "Tipo",
				cell 	 : "string",
			}, 
			{
				name : "comboId",
				editable : false,
				sortable : true,
				label 	 : "Id visto no combo",
				cell 	 : "string",
			}, 
			{
				name : "comboName",
				editable : false,
				sortable : true,
				label 	 : "Nome visto no combo",
				cell 	 : "string",
			}, 
			{
				name : "comboVal",
				editable : false,
				sortable : true,
				label 	 : "Valor visto no combo",
				cell 	 : "string",
			}, 
			{
				name : "textField",
				editable : false,
				sortable : true,
				label 	 : "Campo de texto no modal",
				cell 	 : "string",
			}, 
			{
				name : "hiddenField",
				editable : false,
				sortable : true,
				label 	 : "Campo de escondido do modal",
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
			return "app/editViewApproach/" + model.get('id');
		},

		_editModel : function(model) {

		},
		

	});

	return PageViewApproach;
});
