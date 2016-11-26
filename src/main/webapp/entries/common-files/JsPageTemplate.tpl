/* generated: ${.now} */
define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backgrid = require('adapters/backgrid-adapter');
	var util = require('utilities/utils');
	var JSetup = require('views/components/JSetup');
	var JSetupView = require('views/core/JSetupView');
	
	var ${entity.name}Model = require('models/${entity.name}Model');
	var ${entity.name}Collection = require('collections/${entity.name}Collection');
	var ${entity.name}PageCollection = require('collections/${entity.name}PageCollection');
	var Page${entity.name}Template = require('text!views/${firstLower(entity.name)}/tpl/Page${entity.name}Template.html');

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
	var Modal${firstUpper(rel.name)} = require('views/modalComponents/${firstUpper(rel.model)}Modal');
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

	var Page${entity.name} = JSetupView.extend({
		template : _.template(Page${entity.name}Template),

		regions : {
			gridRegion : '#grid',
			counterRegion : '#counter',
			paginatorRegion : '#paginator',
			<#if entity.relationships??>	
			<#list entity.relationships as rel >
				<#if rel.viewApproach.type == 'modal'>
			modal${firstUpper(rel.name)}Region : '#${firstLower(rel.name)}Modal',
				</#if>
			</#list>
			</#if>			
		},
		
		events : {
			'click 	#reset' : 'reset${firstUpper(entity.name)}',			
			<#if entity.relationships??>	
			<#list entity.relationships as rel >
				<#if rel.viewApproach.type == 'modal'>
			'click #search${firstUpper(rel.name)}Modal' : 'showModal${firstUpper(rel.name)}',
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

			this.counter = new JSetup.Counter({
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
			this.modal${firstUpper(rel.name)} = new Modal${firstUpper(rel.name)}({
				onSelectModel : function(model) {
					that.onSelect${firstUpper(rel.name)}(model);
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
				this.modal${firstUpper(rel.name)}Region.show(this.modal${firstUpper(rel.name)});		
			</#if>
			</#if>
		</#list>
		</#if>
		<#list entity.attributes as att>
					<#if att.showInPages >
		  <#if att.inputAs == 'cpf' >
				this.ui.input${firstUpper(att.name)}.cpf();
		  </#if>	
		  <#if att.inputAs == 'percent' >
				this.ui.input${firstUpper(att.name)}.decimal();
		  </#if>	
		  <#if att.inputAs == 'fone' >
				this.ui.input${firstUpper(att.name)}.fone();
		  </#if>
		  <#if att.inputAs == 'date' >
				this.ui.input${firstUpper(att.name)}.date();
				this.ui.groupInput${firstUpper(att.name)}.date();
		  </#if>	
		  <#if att.inputAs == 'datetime' >
				this.ui.input${firstUpper(att.name)}.datetime();
				this.ui.groupInput${firstUpper(att.name)}.datetime();
		  </#if>	
		  <#if att.inputAs == 'decimal' >
				this.ui.input${firstUpper(att.name)}.decimal();
		  </#if>	
		  <#if att.inputAs == 'integer' >
				this.ui.input${firstUpper(att.name)}.integer();
		  </#if>	
		  <#if att.inputAs == 'money' >
				this.ui.input${firstUpper(att.name)}.money();
		  </#if>	
		  <#if att.viewApproach?? >
			<#if att.viewApproach.type == 'combo'>		
				this.combo${firstUpper(att.name)} = new JSetup.Combobox({
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
				this.combo${firstUpper(rel.model)} = new JSetup.Combobox({
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
				this.search${firstUpper(entity.name)}();
			});
		},
		 
		search${firstUpper(entity.name)} : function(){
			var that = this;

			this.${firstLower(entity.name)}s.filterQueryParams = {
			<#list entity.attributes as att>
				<#if att.showInPages >
	    		${firstLower(att.name)} : this.ui.input${firstUpper(att.name)}.escape(), 
				</#if>
			</#list>
			<#if entity.relationships??>	
			<#list entity.relationships as rel >
				<#if rel.showInPages >			
				<#if rel.viewApproach.type == 'modal' >
			    ${firstLower(rel.name)} : this.modal${firstUpper(rel.name)}.getRawValue(), 
				</#if> 
				<#if  rel.viewApproach.type == 'combo'>
			    ${firstLower(rel.name)} : this.combo${firstUpper(rel.model)}.getRawValue(), 
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
				sortable : true,
				label 	 : "${firstUpper(att.displayName)!firstUpper(att.name)}",
				<#if att.inputAs == 'percent'>
				cell : JSetup.PercentCell,
		  		<#elseif att.inputAs == 'money'>
		  		cell : JSetup.MoneyCell,	
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
				sortable : true,  
				label : "${rel.displayName}",
				cell : JSetup.CustomStringCell.extend({
					fieldName : '${firstLower(rel.name)}.${rel.viewApproach.textField}',
				}),
			},	
					</#if>
					<#if rel.viewApproach.type == 'combo'>
			{
				name : "${firstLower(rel.name)}.${rel.viewApproach.comboVal}",
				sortable : true,  
				label : "${rel.displayName}",
				cell : JSetup.CustomStringCell.extend({
					fieldName : '${firstLower(rel.name)}.${rel.viewApproach.comboVal}',
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
				cell : JSetup.ActionCell.extend({
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
		showModal${firstUpper(rel.name)} : function() {
			this.modal${firstUpper(rel.name)}.showPage();
		},
			
		onSelect${firstUpper(rel.name)} : function(${firstLower(rel.name)}) {
			this.modal${firstUpper(rel.name)}.hidePage();	
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
