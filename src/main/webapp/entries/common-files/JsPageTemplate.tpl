/* generated: ${.now} */
define(function(require) {
	var util = require('utilities/utils');
	var JSetup = require('views/components/JSetup');	
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
	var Modal${firstUpper(rel.name)} = require('views/modalComponents/Modal${firstUpper(rel.model)}');
		</#if>
		</#if>
	</#list>
	</#if>
	var ${entity.name} = require('models/${entity.name}');
	<#if entity.relationships??>	
	<#list entity.relationships as rel>
		<#if rel.showInPages >
		<#if rel.viewApproach?? >
			<#if rel.viewApproach.type  == 'combo'  >
	var ${rel.model} = require('models/${rel.model}');			
			</#if>
		</#if>
		</#if>
	</#list>
	</#if>			

	var Page${entity.name} = JSetup.View.extend({
		template : _.template(Page${entity.name}Template),

		/** The declared form Regions. */
		regions : {
			dataTable${firstUpper(entity.name)}Region : '.datatable-${firstLower(entity.name)}',
			<#if entity.relationships??>	
			<#list entity.relationships as rel >
				<#if rel.viewApproach.type == 'modal'>
			modal${firstUpper(rel.name)}Region : '#${firstLower(rel.name)}Modal',
				</#if>
			</#list>
			</#if>			
		},
		
		/** The form events you'd like to listen */
		events : {
			'click 	.reset-button' : 'reset${firstUpper(entity.name)}',			
			<#if entity.relationships??>	
			<#list entity.relationships as rel >
				<#if rel.viewApproach.type == 'modal'>
			'click .search-${firstLower(rel.name)}-modal' : 'showModal${firstUpper(rel.name)}',
				</#if>
			</#list>
			</#if>
			'keypress' : 'treatKeypress',
			
			'click 	.search-button' : 'search${firstUpper(entity.name)}',
			'click  .show-advanced-search-button' : 'toggleAdvancedForm',
		},
		
		/** All the important fields must be here. */		
		ui : {
			loadButton : '.loading-button',
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
		
		/** First function called, like a constructor. */		
		initialize : function() {
			var that = this;
			this.${firstLower(entity.name)}s = new ${entity.name}.PageCollection();
			this.${firstLower(entity.name)}s.on('fetching', this.startFetch, this);
			this.${firstLower(entity.name)}s.on('fetched', this.stopFetch, this);
			
			this.dataTable${firstUpper(entity.name)} = new JSetup.DataTable({
				columns : this.getColumns(),
				collection : this.${firstLower(entity.name)}s
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
		},

		/** Called after DOM´s ready.*/		
		onShowView : function() {
			var that = this;
		<#list entity.attributes as att>
		<#if att.showInPages >
		  <#if att.inputAs == 'cpf' >
			this.ui.input${firstUpper(att.name)}.cpf();
		  </#if>	
		  <#if att.inputAs == 'cnpj' >
			this.ui.input${firstUpper(att.name)}.cnpj();
		  </#if>	
		  <#if att.inputAs == 'fone' || att.inputAs == 'telephone' || att.inputAs == 'telefone' >
			this.ui.input${firstUpper(att.name)}.fone();
		  </#if>
		  <#if att.inputAs == 'date' || att.type.className == 'Date'>
			this.ui.input${firstUpper(att.name)}.date();
			this.ui.groupInput${firstUpper(att.name)}.date();
		  </#if>	
		  <#if att.inputAs == 'datetime' ||  att.type.className == 'Datetime'>
			this.ui.input${firstUpper(att.name)}.datetime();
			this.ui.groupInput${firstUpper(att.name)}.datetime();
		  </#if>	
		  <#if att.inputAs == 'percent' || att.inputAs == 'percentagem' || att.inputAs == 'decimal' || att.type.className == 'Double'>
			this.ui.input${firstUpper(att.name)}.decimal();
		  </#if>	
		  <#if att.inputAs == 'integer' || att.type.className == 'Integer'>
			this.ui.input${firstUpper(att.name)}.integer();
		  </#if>	
		  <#if att.inputAs == 'money' || att.inputAs == 'monetario'>
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
				collectionEntity : ${firstUpper(rel.model)}.Collection,
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
			that.dataTable${firstUpper(entity.name)}Region.show(that.dataTable${firstUpper(entity.name)});
		<#if entity.relationships??>	
		<#list entity.relationships as rel >
			<#if rel.showInPages >		
			<#if rel.viewApproach.type == 'modal'>
			this.modal${firstUpper(rel.name)}Region.show(this.modal${firstUpper(rel.name)});		
			</#if>
			</#if>
		</#list>
		</#if>		
			this.search${firstUpper(entity.name)}();
		},
		 
		search${firstUpper(entity.name)} : function(){
			var that = this;
			this.ui.loadButton.button('loading');
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
					//console.info('Consulta para o grid ${firstLower(entity.name)}');
				},
				error : function(_coll, _resp, _opt) {
					//console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				},
				complete : function(){
					that.ui.loadButton.button('reset');
				}
			})		
		},
		reset${firstUpper(entity.name)} : function(){
			this.ui.form.get(0).reset();
			this.${firstLower(entity.name)}s.reset();
		<#list entity.relationships as rel >
			<#if rel.viewApproach?? >
				<#if rel.viewApproach.type == 'modal' >
			 this.modal${firstUpper(rel.name)}.clear(); 
				</#if> 
				<#if  rel.viewApproach.type == 'combo'>
			 this.combo${firstUpper(rel.model)}.clear(); 
				</#if>
			</#if>
		</#list>
		},
				
		getColumns : function() {
			var that = this;
			var columns = [
			<#list entity.attributes as att>
				<#if att.showInPages && att.viewApproach.type  != 'upload' >			
	
			{
				name : "${att.name}",
				sortable : true,
				editable : false,
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
				editable : false,  
				sortable : true,  
				label : "${rel.displayName}",
				cell : JSetup.EntityCell.extend({
					fieldName : '${firstLower(rel.name)}.${rel.viewApproach.textField}',
				}),
			},	
					</#if>
					<#if rel.viewApproach.type == 'combo'>
			{
				name : "${firstLower(rel.name)}.${rel.viewApproach.comboVal}",
				editable : false,
				sortable : true,  
				label : "${rel.displayName}",
				cell : JSetup.EntityCell.extend({
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
				editable : false,
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
				id : 'edit_button',
				type : 'primary',
				icon : 'fa-pencil',
				customClass : 'auth[edit-${firstLower(entity.name)},disable]',
				hint : 'Editar ${firstUpper(entity.displayName)!firstUpper(entity.name)}',
				onClick : that.editModel,
			}, {
				id : 'delete_button',
				type : 'danger',
				customClass : 'auth[delete-${firstLower(entity.name)}, disable]',
				icon : 'fa-trash',
				hint : 'Remover ${firstUpper(entity.displayName)!firstUpper(entity.name)}',
				onClick : that.deleteModel,
			});

			return buttons;
		},

		deleteModel : function(model) {
			var that = this;
			
			var modelTipo = new ${entity.name}.Model({id : model.id});
			
			util.confirm({
				title : "Importante",
				text : "Tem certeza que deseja remover o registro [ " + model.get('id') + " ] ?",
				onConfirm : function() {
					modelTipo.destroy({
						success : function() {
							that.${firstLower(entity.name)}s.remove(model);
							util.alert({title : "Concluido", text : "Registro removido com sucesso!"});
						},
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
		
		// adictional functions
		toggleAdvancedForm : function() {
			this.ui.advancedSearchForm.slideToggle("slow");
		},

		treatKeypress : function(e) {
			if (util.enterPressed(e)) {
				e.preventDefault();
				this.search${firstUpper(entity.name)}();
			}
		},
		startFetch : function() {
			this.ui.loadButton.button('loading')
		},

		stopFetch : function() {
			this.ui.loadButton.button('reset')
		}
	});

	return Page${entity.name};
});
