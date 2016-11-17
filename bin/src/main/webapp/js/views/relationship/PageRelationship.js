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

	var TemplateFormRelationships = require('text!views/relationship/tpl/FormRelationshipTemplate.html');
	var RelationshipModel = require('models/RelationshipModel');
	var RelationshipCollection = require('collections/RelationshipCollection');
	var RelationshipPageCollection = require('collections/RelationshipPageCollection');
	var PageRelationshipTemplate = require('text!views/relationship/tpl/PageRelationshipTemplate.html');
	
	//Filter import
	var SearchEntityModal = require('views/modalComponents/EntityModal');
	var SearchViewApproachModal = require('views/modalComponents/ViewApproachModal');
	
	// End of "Import´s" definition

	var PageRelationship = Marionette.LayoutView.extend({
		template : _.template(PageRelationshipTemplate),

		regions : {
			gridRegion : '#grid',
			counterRegion : '#counter',
			paginatorRegion : '#paginator',
			searchEntityModalRegion : '#entityModal',
			searchViewApproachModalRegion : '#viewApproachModal',
		},
		
		events : {
			'click 	#query' : '_queryRelationship',			
			'click 	#reset' : '_resetRelationship',			
			'click #searchEntityModal' : '_showSearchEntityModal',
			'click #searchViewApproachModal' : '_showSearchViewApproachModal',
			'keypress' : 'treatKeypress',
		},
		
		
		ui : {
			inputName : '#inputName',
			inputDisplayName : '#inputDisplayName',
			inputOwnerName : '#inputOwnerName',
			inputModel : '#inputModel',
			inputUniDirecional : '#inputUniDirecional',
		
			inputEntityId : '#inputEntityId',
			inputEntityName : '#inputEntityName',
			inputViewApproachId : '#inputViewApproachId',
			inputViewApproachName : '#inputViewApproachName',
			form : '#formRelationshipFilter',
		},
		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this._queryRelationship();
	    	}
		},

		initialize : function() {
			var that = this;

			this.relationships = new RelationshipPageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.relationships
			});

			this.counter = new Counter({
				collection : this.relationships,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.relationships,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.relationships.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid relationship');
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
			this.searchViewApproachModal = new SearchViewApproachModal({
				onSelectModel : function(model) {
					that._selectViewApproach(model);
				},
			});
			this.on('show', function() {
				that.gridRegion.show(that.grid);
				that.counterRegion.show(that.counter);
				that.paginatorRegion.show(that.paginator);
				this.searchEntityModalRegion.show(this.searchEntityModal);		
				this.searchViewApproachModalRegion.show(this.searchViewApproachModal);		
			});
		},
		 
		_queryRelationship : function(){
			var that = this;

			this.relationships.filterQueryParams = {
	    		name : util.escapeById('inputName'), 
	    		displayName : util.escapeById('inputDisplayName'), 
	    		ownerName : util.escapeById('inputOwnerName'), 
	    		model : util.escapeById('inputModel'), 
	    		uniDirecional : util.escapeById('inputUniDirecional'), 
			    entity : util.escapeById('inputEntityId'), 
			    viewApproach : util.escapeById('inputViewApproachId'), 
			}
			this.relationships.fetch({
				success : function(_coll, _resp, _opt) {
					console.info('Consulta para o grid relationship');
				},
				error : function(_coll, _resp, _opt) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				},
				complete : function() {
					
				},
			})		
		},
		_resetRelationship : function(){
			this.ui.form.get(0).reset();
			this.relationships.reset();
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
				name : "ownerName",
				editable : false,
				sortable : true,
				label 	 : "Dono do relacionamento",
				cell 	 : "string",
			}, 
			{
				name : "model",
				editable : false,
				sortable : true,
				label 	 : "Modelo",
				cell 	 : "string",
			}, 
			{
				name : "uniDirecional",
				editable : false,
				sortable : true,
				label 	 : "É unidirecional",
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
				name : "viewApproach.name",
				editable : false,
				sortable : true,  //já é possivel ordenar por esses atributos compostos.
				label : "Tipo",
				cell : CustomStringCell.extend({
					fieldName : 'viewApproach.name',
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
			return "app/editRelationship/" + model.get('id');
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
		_showSearchViewApproachModal : function() {
			this.searchViewApproachModal.showPage();
		},
			
		_selectViewApproach : function(viewApproach) {
			this.searchViewApproachModal.hidePage();	
			this.ui.inputViewApproachId.val(viewApproach.get('id'));
			this.ui.inputViewApproachName.val(viewApproach.get('name'));		
		},
		

	});

	return PageRelationship;
});
