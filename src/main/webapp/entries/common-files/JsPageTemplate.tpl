/* generated: ${.now} */
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

	var TemplateForm${entity.name}s = require('text!views/${firstLower(entity.name)}/tpl/Form${entity.name}Template.html');
	var ${entity.name}Model = require('models/${entity.name}Model');
	var ${entity.name}Collection = require('collections/${entity.name}Collection');
	var ${entity.name}PageCollection = require('collections/${entity.name}PageCollection');
	var Page${entity.name}Template = require('text!views/${firstLower(entity.name)}/tpl/Page${entity.name}Template.html');
	
	//Filter import
	<#list entity.attributes as att>
		<#if att.showInPages >
		<#if att.viewApproach?? >
			<#if att.viewApproach.type == 'combo'>		
	var ${att.type.className}Collection = require('collections/${att.type.className}Collection');
			</#if>
		</#if>
		</#if>
	</#list>
	<#if entity.relationships??>	
	<#list entity.relationships as rel >
	<#if rel.showInPages >
		<#if rel.viewApproach.type == 'modal'>
	var Search${firstUpper(rel.name)}Modal = require('views/modalComponents/${firstUpper(rel.model)}Modal');
		</#if>
		</#if>
	</#list>
	</#if>
	<#if entity.relationships??>	
	<#list entity.relationships as rel>
		<#if rel.showInPages >
		<#if rel.viewApproach?? >
			<#if rel.viewApproach.type  == 'combo'  >
	var ${rel.model}Collection = require('collections/${rel.model}Collection');			
			</#if>
		</#if>
		</#if>
	</#list>
	</#if>			
	
	// End of "Import´s" definition

	var Page${entity.name} = Marionette.LayoutView.extend({
		template : _.template(Page${entity.name}Template),

		regions : {
			gridRegion : '#grid',
			counterRegion : '#counter',
			paginatorRegion : '#paginator',
			<#if entity.relationships??>	
			<#list entity.relationships as rel >
				<#if rel.viewApproach.type == 'modal'>
			search${firstUpper(rel.name)}ModalRegion : '#${firstLower(rel.name)}Modal',
				</#if>
			</#list>
			</#if>			
		},
		
		events : {
			'click 	#reset' : 'reset${firstUpper(entity.name)}',			
			<#if entity.relationships??>	
			<#list entity.relationships as rel >
				<#if rel.viewApproach.type == 'modal'>
			'click #search${firstUpper(rel.name)}Modal' : 'showSearch${firstUpper(rel.name)}Modal',
				</#if>
			</#list>
			</#if>
			'keypress' : 'treatKeypress',
			
			'click 	.search-button' : 'search${firstUpper(entity.name)}',
			'click .show-advanced-search-button' : 'toggleAdvancedForm',
		},
		
		
		ui : {
		<#list entity.attributes as att>
			<#if att.showInPages >
			input${firstUpper(att.name)} : '#input${firstUpper(att.name)}',
				<#if att.viewApproach?? >
					<#if att.viewApproach.type == 'datepicker'>						
			groupInput${firstUpper(att.name)} : '#groupInput${firstUpper(att.name)}',
					</#if>
				</#if>
			</#if>
		</#list>
		
		<#if entity.relationships??>	
		<#list entity.relationships as rel>
			<#if rel.showInPages >
			<#if rel.type == 'OneToMany'>
			<#elseif rel.type == 'ManyToOne'>
				<#if rel.viewApproach?? >
					<#if rel.viewApproach.type  == 'combo'  >
			input${firstUpper(rel.name)} : '#input${firstUpper(rel.name)}', 
					<#elseif rel.viewApproach.type  == 'modal'  >
					<#if rel.viewApproach.hiddenField??>
			input${firstUpper(rel.name)}${firstUpper(rel.viewApproach.hiddenField)} : '#input${firstUpper(rel.name)}${firstUpper(rel.viewApproach.hiddenField)}',
					</#if>					
					<#if rel.viewApproach.textField??>
			input${firstUpper(rel.name)}${firstUpper(rel.viewApproach.textField)} : '#input${firstUpper(rel.name)}${firstUpper(rel.viewApproach.textField)}',
					</#if>					
					</#if>
				</#if>
			<#elseif rel.type == 'ManyToMany'>
			<#elseif rel.type == 'OneToOne'>
				</#if>
			</#if>
		</#list>
		</#if>			
			form : '#form${firstUpper(entity.name)}Filter',
			advancedSearchForm : '.advanced-search-form',
		},
		
		toggleAdvancedForm : function() {
			this.ui.advancedSearchForm.slideToggle("slow");
		},

		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this.search${firstUpper(entity.name)}();
	    	}
		},

		initialize : function() {
			var that = this;

			this.${firstLower(entity.name)}s = new ${entity.name}PageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this.getColumns(),
				emptyText : "Sem registros",
				collection : this.${firstLower(entity.name)}s
			});

			this.counter = new Counter({
				collection : this.${firstLower(entity.name)}s,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this.getColumns(),
				collection : this.${firstLower(entity.name)}s,
				className : ' paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.${firstLower(entity.name)}s.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid ${firstLower(entity.name)}');
				},
				error : function(_col, _resp, _opts) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')) );
				}
			});
		<#if entity.relationships??>	
		<#list entity.relationships as rel >
			<#if rel.showInPages >
			<#if rel.viewApproach.type == 'modal'>
			this.search${firstUpper(rel.name)}Modal = new Search${firstUpper(rel.name)}Modal({
				onSelectModel : function(model) {
					that.select${firstUpper(rel.name)}(model);
				},
			});
			</#if>
			</#if>
		</#list>
		</#if>
			this.on('show', function() {
				that.gridRegion.show(that.grid);
				that.counterRegion.show(that.counter);
				that.paginatorRegion.show(that.paginator);
		<#if entity.relationships??>	
		<#list entity.relationships as rel >
			<#if rel.showInPages >		
			<#if rel.viewApproach.type == 'modal'>
				this.search${firstUpper(rel.name)}ModalRegion.show(this.search${firstUpper(rel.name)}Modal);		
			</#if>
			</#if>
		</#list>
		</#if>
		<#list entity.attributes as att>
					<#if att.showInPages >
		  <#if isNumeric(att.type.className)>
				this.ui.input${firstUpper(att.name)}.formatNumber(2);
		  </#if>	
		  <#if att.viewApproach?? >
			<#if att.viewApproach.type == 'datepicker'>		
				this.ui.groupInput${firstUpper(att.name)}.datetimepicker({
				<#if att.type.className == 'Date'>		
					pickTime : false,
				</#if>					
					language : 'pt_BR',
				});
				this.ui.input${firstUpper(att.name)}.datetimepicker({
				<#if att.type.className == 'Date'>		
					pickTime : false,
				</#if>
					language : 'pt_BR',
				});
			</#if>
			<#if att.viewApproach.type == 'combo'>		
				var combo${firstUpper(att.name)} = new Combobox({
					el : this.ui.input${firstUpper(att.name)},
				   <#if att.viewApproach.values??>
				    values : ${toListString(att.viewApproach.values)}
					<#else>
					comboId : '${(att.viewApproach.comboId)!'id'}',
					comboVal : '${(att.viewApproach.comboVal)!'name'}',
					collectionEntity : ${att.type.className}Collection, 
					</#if>
				});
			</#if>
		  </#if>
		  <#if att.mask??>
			<#if att.mask != ''>
				this.ui.input${firstUpper(att.name)}.mask('${att.mask}');
			</#if>
		  </#if>
		  </#if>
		</#list>
		<#if entity.relationships??>	
		
		<#list entity.relationships as rel>
			<#if rel.showInPages >		
			<#if rel.type == 'OneToMany'>
			<#elseif rel.type == 'ManyToOne'>
				<#if rel.viewApproach?? >
					<#if rel.viewApproach.type  == 'combo'  >
				var combo${firstUpper(rel.model)} = new Combobox({
					el : this.ui.input${firstUpper(rel.name)},
				   <#if rel.viewApproach.values??>
				    values : '${toString(rel.viewApproach.values)}'
					<#else>
					comboId : '${(rel.viewApproach.comboId)!'id'}',
					comboVal : '${(rel.viewApproach.comboVal)!'name'}',
					collectionEntity : ${firstUpper(rel.model)}Collection,
					</#if>
				});
					</#if>
				</#if>
			<#elseif rel.type == 'ManyToMany'>
			<#elseif rel.type == 'OneToOne'>
			</#if>
			</#if>
		</#list>
		</#if>
			});
		},
		 
		search${firstUpper(entity.name)} : function(){
			var that = this;

			this.${firstLower(entity.name)}s.filterQueryParams = {
			<#list entity.attributes as att>
				<#if att.showInPages >
	    		${firstLower(att.name)} : util.escapeById('input${firstUpper(att.name)}'),
				</#if>
			</#list>
			<#if entity.relationships??>	
			<#list entity.relationships as rel >
				<#if rel.showInPages >			
				<#if rel.viewApproach.type == 'modal' >
			    ${firstLower(rel.name)} : util.escapeById('input${firstUpper(rel.name)}${firstUpper(rel.viewApproach.hiddenField)}'), 
				</#if> 
				<#if  rel.viewApproach.type == 'combo'>
			    ${firstLower(rel.name)} : util.escapeById('input${firstUpper(rel.name)}'), 
				</#if>
				</#if>
			</#list>
			</#if>
			}
			this.${firstLower(entity.name)}s.fetch({
				success : function(_coll, _resp, _opt) {
					console.info('Consulta para o grid ${firstLower(entity.name)}');
				},
				error : function(_coll, _resp, _opt) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				},
				complete : function() {
					
				},
			})		
		},
		reset${firstUpper(entity.name)} : function(){
			this.ui.form.get(0).reset();
			this.${firstLower(entity.name)}s.reset();
		<#list entity.relationships as rel >
			<#if rel.viewApproach?? >
				<#if rel.viewApproach.hiddenField??>
			util.clear('input${firstUpper(rel.name)}${firstUpper(rel.viewApproach.hiddenField)}');
				</#if>					
			</#if>
		</#list>
		},
				
		getColumns : function() {
			var that = this;
			var columns = [
			<#list entity.attributes as att>
				<#if att.showInPages >			
			{
				name : "${att.name}",
				editable : false,
				sortable : true,
				label 	 : "${firstUpper(att.displayName)!firstUpper(att.name)}",
				<#if isNumeric(att.type.className)>
				cell : CustomNumberCell.extend({}),
		  		<#else>	
				cell 	 : "string",
		  		</#if>	
			}, 
		  		</#if>	
			</#list>
			<#if entity.relationships??>	
				<#list entity.relationships as rel >
				<#if rel.showInPages >				
					<#if rel.viewApproach.type == 'modal'>
			{
				name : "${firstLower(rel.name)}.${rel.viewApproach.textField}",
				editable : false,
				sortable : true,  
				label : "${rel.displayName}",
				cell : CustomStringCell.extend({
					fieldName : '${firstLower(rel.name)}.${rel.viewApproach.textField}',
				}),
			},	
					</#if>
				</#if>
				</#list>
			</#if>
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
				hint : 'Editar ${firstUpper(entity.displayName)!firstUpper(entity.name)}',
				onClick : that.editModel,
			}, {
				id : 'delete_button',
				type : 'danger',
				icon : 'icon-trash fa-trash',
				hint : 'Remover ${firstUpper(entity.displayName)!firstUpper(entity.name)}',
				onClick : that.deleteModel,
			});

			return buttons;
		},

		deleteModel : function(model) {
			var that = this;
			
			var modelTipo = new ${entity.name}Model({
				id : model.id,
			});
			
			util.Bootbox.confirm("Tem certeza que deseja remover o registro [ " + model.get('id') + " ] ?", function(yes) {
				if (yes) {
					modelTipo.destroy({
						success : function() {
							that.${firstLower(entity.name)}s.remove(model);
							util.showSuccessMessage('${firstUpper(entity.displayName)!firstUpper(entity.name)} removido com sucesso!');
						},
						error : function(_model, _resp) {
							util.showErrorMessage('Problema ao remover o registro',_resp);
						}
					});
				}
			});
		},

		editModel : function(model) {
			util.goPage("app/edit${entity.name}/" + model.get('id'));
		},

		<#if entity.relationships??>	
		<#list entity.relationships as rel >
				<#if rel.showInPages >		
			<#if rel.viewApproach.type == 'modal'>
		showSearch${firstUpper(rel.name)}Modal : function() {
			this.search${firstUpper(rel.name)}Modal.showPage();
		},
			
		select${firstUpper(rel.name)} : function(${firstLower(rel.name)}) {
			this.search${firstUpper(rel.name)}Modal.hidePage();	
			this.ui.input${firstUpper(rel.name)}${firstUpper(rel.viewApproach.hiddenField)}.val(${firstLower(rel.name)}.get('${firstLower(rel.viewApproach.hiddenField)}'));
			this.ui.input${firstUpper(rel.name)}${firstUpper(rel.viewApproach.textField)}.val(${firstLower(rel.name)}.get('${firstLower(rel.viewApproach.textField)}'));		
		},
			</#if>
			</#if>
		</#list>
		</#if>
		

	});

	return Page${entity.name};
});
