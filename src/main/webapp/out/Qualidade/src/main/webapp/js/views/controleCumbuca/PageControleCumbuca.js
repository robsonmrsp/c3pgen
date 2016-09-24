/* generated: 24/09/2016 11:56:33 */
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
	var GeneralActionsCell = require('views/components/GeneralActionsCell');

	var CustomNumberCell = require('views/components/CustomNumberCell');

	var TemplateFormControleCumbucas = require('text!views/controleCumbuca/tpl/FormControleCumbucaTemplate.html');
	var ControleCumbucaModel = require('models/ControleCumbucaModel');
	var ControleCumbucaCollection = require('collections/ControleCumbucaCollection');
	var ControleCumbucaPageCollection = require('collections/ControleCumbucaPageCollection');
	var PageControleCumbucaTemplate = require('text!views/controleCumbuca/tpl/PageControleCumbucaTemplate.html');
	
	//Filter import
	var CabineCollection = require('collections/CabineCollection');			
	
	// End of "Import´s" definition

	var PageControleCumbuca = Marionette.LayoutView.extend({
		template : _.template(PageControleCumbucaTemplate),

		regions : {
			gridRegion : '#grid',
			counterRegion : '#counter',
			paginatorRegion : '#paginator',
		},
		
		events : {
			'click 	#reset' : 'resetControleCumbuca',			
			'keypress' : 'treatKeypress',
			
			'click 	.search-button' : 'searchControleCumbuca',
			'click .show-advanced-search-button' : 'toggleAdvancedForm',
		},
		
		
		ui : {
			inputDataRegistro : '#inputDataRegistro',
			groupInputDataRegistro : '#groupInputDataRegistro',
			inputPeso : '#inputPeso',
			inputTipo : '#inputTipo',
			inputQuantidadeCachos : '#inputQuantidadeCachos',
		
			inputCabine : '#inputCabine', 
			form : '#formControleCumbucaFilter',
			advancedSearchForm : '.advanced-search-form',
		},
		
		toggleAdvancedForm : function() {
			this.ui.advancedSearchForm.slideToggle("slow");
		},

		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this.searchControleCumbuca();
	    	}
		},

		initialize : function() {
			var that = this;

			this.controleCumbucas = new ControleCumbucaPageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this.getColumns(),
				emptyText : "Sem registros",
				collection : this.controleCumbucas
			});

			this.counter = new Counter({
				collection : this.controleCumbucas,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this.getColumns(),
				collection : this.controleCumbucas,
				className : ' paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.controleCumbucas.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid controleCumbuca');
				},
				error : function(_col, _resp, _opts) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')) );
				}
			});
			this.on('show', function() {
				that.gridRegion.show(that.grid);
				that.counterRegion.show(that.counter);
				that.paginatorRegion.show(that.paginator);
				this.ui.groupInputDataRegistro.datetimepicker({
					pickTime : false,
					language : 'pt_BR',
				});
				this.ui.inputDataRegistro.datetimepicker({
					pickTime : false,
					language : 'pt_BR',
				});
				this.ui.inputDataRegistro.mask('99/99/9999');
				this.ui.inputPeso.formatNumber(2);
				this.ui.inputTipo.formatNumber(2);
				this.ui.inputQuantidadeCachos.formatNumber(2);
		
				var comboCabine = new Combobox({
					el : this.ui.inputCabine,
					comboId : 'id',
					comboVal : 'nome',
					collectionEntity : CabineCollection,
				});
			});
		},
		 
		searchControleCumbuca : function(){
			var that = this;

			this.controleCumbucas.filterQueryParams = {
	    		dataRegistro : util.escapeById('inputDataRegistro'),
	    		peso : util.escapeById('inputPeso'),
	    		tipo : util.escapeById('inputTipo'),
	    		quantidadeCachos : util.escapeById('inputQuantidadeCachos'),
			    cabine : util.escapeById('inputCabine'), 
			}
			this.controleCumbucas.fetch({
				success : function(_coll, _resp, _opt) {
					console.info('Consulta para o grid controleCumbuca');
				},
				error : function(_coll, _resp, _opt) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				},
				complete : function() {
					
				},
			})		
		},
		resetControleCumbuca : function(){
			this.ui.form.get(0).reset();
			this.controleCumbucas.reset();
		},
				
		getColumns : function() {
			var that = this;
			var columns = [
			{
				name : "dataRegistro",
				editable : false,
				sortable : true,
				label 	 : "Data de Registro",
				cell 	 : "string",
			}, 
			{
				name : "peso",
				editable : false,
				sortable : true,
				label 	 : "Nome",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "tipo",
				editable : false,
				sortable : true,
				label 	 : "Tipo de Máquina",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "quantidadeCachos",
				editable : false,
				sortable : true,
				label 	 : "N. de Cachos",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "cabine.nome",
				editable : false,
				sortable : true,  
				label : "Cabine",
				cell : CustomStringCell.extend({
					fieldName : 'cabine.nome',
				}),
			},	
			{
				name : "acoes",
				label : "Ações(Editar, Deletar)",
				sortable : false,
				cell : GeneralActionsCell.extend({
					buttons : that.getCellButtons(),
					context : that,
				})
			} ];
			return columns;
		},
		
		getCellButtons : function() {
			var that = this;
			var buttons = [];

			buttons.push({
				id : 'edita_ficha_button',
				type : 'primary',
				icon : 'icon-pencil fa-pencil',
				hint : 'Editar Controle Cumbuca',
				onClick : that.editModel,
			}, {
				id : 'delete_button',
				type : 'danger',
				icon : 'icon-trash fa-trash',
				hint : 'Remover Controle Cumbuca',
				onClick : that.deleteModel,
			});

			return buttons;
		},

		deleteModel : function(model) {
			var that = this;
			
			var modelTipo = new ControleCumbucaModel({
				id : model.id,
			});
			
			util.Bootbox.confirm("Tem certeza que deseja remover o registro [ " + model.get('id') + " ] ?", function(yes) {
				if (yes) {
					modelTipo.destroy({
						success : function() {
							that.controleCumbucas.remove(model);
							util.showSuccessMessage('Controle Cumbuca removido com sucesso!');
						},
						error : function(_model, _resp) {
							util.showErrorMessage('Problema ao remover o registro',_resp);
						}
					});
				}
			});
		},

		editModel : function(model) {
			util.goPage("app/editControleCumbuca/" + model.get('id'));
		},

		

	});

	return PageControleCumbuca;
});
