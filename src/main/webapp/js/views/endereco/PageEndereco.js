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

	var TemplateFormEnderecos = require('text!views/endereco/tpl/FormEnderecoTemplate.html');
	var EnderecoModel = require('models/EnderecoModel');
	var EnderecoCollection = require('collections/EnderecoCollection');
	var EnderecoPageCollection = require('collections/EnderecoPageCollection');
	var PageEnderecoTemplate = require('text!views/endereco/tpl/PageEnderecoTemplate.html');
	
	//Filter import
	var SearchCepModal = require('views/modalComponents/CepModal');
	
	// End of "Import´s" definition

	var PageEndereco = Marionette.LayoutView.extend({
		template : _.template(PageEnderecoTemplate),

		regions : {
			gridRegion : '#grid',
			counterRegion : '#counter',
			paginatorRegion : '#paginator',
			searchCepModalRegion : '#cepModal',
		},
		
		events : {
			'click 	#query' : '_queryEndereco',			
			'click 	#reset' : '_resetEndereco',			
			'click #searchCepModal' : '_showSearchCepModal',
			'keypress' : 'treatKeypress',
		},
		
		
		ui : {
			inputComplemento : '#inputComplemento',
			inputNumero : '#inputNumero',
		
			inputCepId : '#inputCepId',
			inputCepCep : '#inputCepCep',
			form : '#formEnderecoFilter',
		},
		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this._queryEndereco();
	    	}
		},

		initialize : function() {
			var that = this;

			this.enderecos = new EnderecoPageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.enderecos
			});

			this.counter = new Counter({
				collection : this.enderecos,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.enderecos,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.enderecos.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid endereco');
				},
				error : function(_col, _resp, _opts) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')) );
				}
			});
			this.searchCepModal = new SearchCepModal({
				onSelectModel : function(model) {
					that._selectCep(model);
				},
			});
			this.on('show', function() {
				that.gridRegion.show(that.grid);
				that.counterRegion.show(that.counter);
				that.paginatorRegion.show(that.paginator);
				this.searchCepModalRegion.show(this.searchCepModal);		
			});
		},
		 
		_queryEndereco : function(){
			var that = this;

			this.enderecos.filterQueryParams = {
	    		complemento : util.escapeById('inputComplemento'), 
	    		numero : util.escapeById('inputNumero'), 
			    cep : util.escapeById('inputCepId'), 
			}
			this.enderecos.fetch({
				success : function(_coll, _resp, _opt) {
					console.info('Consulta para o grid endereco');
				},
				error : function(_coll, _resp, _opt) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				},
				complete : function() {
					
				},
			})		
		},
		_resetEndereco : function(){
			this.ui.form.get(0).reset();
			this.enderecos.reset();
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
				name : "complemento",
				editable : false,
				sortable : true,
				label 	 : "Complemento",
				cell 	 : "string",
			}, 
			{
				name : "numero",
				editable : false,
				sortable : true,
				label 	 : "Número",
				cell 	 : "string",
			}, 
			{
				name : "cep.cep",
				editable : false,
				sortable : true,  //já é possivel ordenar por esses atributos compostos.
				label : "Cep",
				cell : CustomStringCell.extend({
					fieldName : 'cep.cep',
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
			return "app/editEndereco/" + model.get('id');
		},

		_editModel : function(model) {

		},
		_showSearchCepModal : function() {
			this.searchCepModal.showPage();
		},
			
		_selectCep : function(cep) {
			this.searchCepModal.hidePage();	
			this.ui.inputCepId.val(cep.get('id'));
			this.ui.inputCepCep.val(cep.get('cep'));		
		},
		

	});

	return PageEndereco;
});
