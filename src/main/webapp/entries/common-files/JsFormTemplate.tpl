/* generated: ${.now} */
define(function(require) {
	// Start "Import´s" Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Backgrid = require('adapters/backgrid-adapter');
	var util = require('utilities/utils');
	var Combobox = require('views/components/Combobox');

	var TemplateForm${entity.name}s = require('text!views/${firstLower(entity.name)}/tpl/Form${entity.name}Template.html');
	var ${entity.name}Model = require('models/${entity.name}Model');
	var ${entity.name}Collection = require('collections/${entity.name}Collection');
	<#list entity.attributes as att>
		<#if att.viewApproach?? && att.viewApproach.type??>
			<#if att.viewApproach.type == 'combo'>		
	var ${att.type.className}Collection = require('collections/${att.type.className}Collection');
			</#if>
		</#if>
	</#list>
	<#if entity.relationships??>	
	<#list entity.relationships as rel >
		<#if rel.viewApproach.type == 'modal'>
	var ${firstUpper(rel.name)}Modal = require('views/modalComponents/${firstUpper(rel.model)}Modal');
		</#if>
	</#list>
	</#if>
	<#if entity.relationships??>	
	<#list entity.relationships as rel>
		<#if (rel.type == 'OneToMany' || rel.type == 'ManyToMany' ) && rel.viewApproach.type == 'multiselect'>
	var ${firstUpper(rel.model)}Collection = require('collections/${firstUpper(rel.model)}Collection');
	var MultiSelect${firstUpper(rel.model)} = require('views/${firstLower(rel.model)}/MultiSelect${firstUpper(rel.model)}');			
		</#if>			
		<#if rel.viewApproach?? >
			<#if rel.viewApproach.type  == 'combo'  >
	var ${rel.model}Collection = require('collections/${rel.model}Collection');			
			</#if>
		</#if>
	</#list>
	</#if>			
	
	// End of "Import´s" definition

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨MAIN BODY¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var Form${entity.name}s = Marionette.LayoutView.extend({
		template : _.template(TemplateForm${entity.name}s),

		regions : {
			<#if entity.relationships??>	
			<#list entity.relationships as rel >
			<#if (rel.type == 'OneToMany' || rel.type == 'ManyToMany' ) && rel.viewApproach.type == 'multiselect'>
			${firstLower(rel.name)}Region : ".${firstLower(rel.name)}-container",
			<#elseif rel.viewApproach.type == 'modal'>
			${firstLower(rel.name)}ModalRegion : '#${firstLower(rel.name)}Modal',
				</#if>
			</#list>
			</#if>
		},

		events : {
			'click 	.save' : 'save',
			'click 	.saveAndContinue' : 'saveAndContinue',
			<#if entity.relationships??>	
			<#list entity.relationships as rel >
				<#if rel.viewApproach.type == 'modal'>
				</#if>
			</#list>
			</#if>
			<#if entity.uniqueConstraints >
				<#list entity.attributes as att>
					<#if att.unique>
			'change  #input${firstUpper(att.name)}' : 'change${firstUpper(att.name)}',	
					</#if>
				</#list>		
			</#if>			
		},
		
		ui : {
			inputId : '#inputId',
		<#list entity.attributes as att>
			input${firstUpper(att.name)} : '#input${firstUpper(att.name)}',
			<#if att.viewApproach?? >
				<#if att.viewApproach.type == 'datepicker'>			
			groupInput${firstUpper(att.name)} : '#groupInput${firstUpper(att.name)}',
				</#if>
			</#if>
		</#list>
		
		<#if entity.relationships??>	
		<#list entity.relationships as rel>
			<#if rel.type == 'OneToMany'>
			<#elseif rel.type == 'ManyToOne'>
				<#if rel.viewApproach?? >
					<#if rel.viewApproach.type  == 'combo'  >
			input${firstUpper(rel.name)} : '#input${firstUpper(rel.name)}', 
					<#elseif rel.viewApproach.type  == 'modal'  >
					<#if rel.viewApproach.hiddenField??>
					</#if>					
					<#if rel.viewApproach.textField??>
					</#if>					
					</#if>
				</#if>
			<#elseif rel.type == 'ManyToMany'>
			<#elseif rel.type == 'OneToOne'>
			</#if>
		</#list>
		</#if>			
			form : '#form${firstUpper(entity.name)}',
		},

		initialize : function() {
			var that = this;
		<#if entity.relationships??>	
		<#list entity.relationships as rel >
			<#if (rel.type == 'OneToMany' || rel.type == 'ManyToMany' ) && rel.viewApproach.type == 'multiselect'>
			that.${firstLower(rel.name)} = new ${firstUpper(rel.model)}Collection();
			that.${firstLower(rel.name)}.add(this.model.get('${firstLower(rel.name)}'));
			this.multiSelect${firstUpper(rel.model)} = new MultiSelect${firstUpper(rel.model)}({
				collection : that.${firstLower(rel.name)},
			});
			</#if>
			<#if rel.viewApproach.type == 'modal'>
			this.${firstLower(rel.name)}Modal = new ${firstUpper(rel.name)}Modal({
				onSelectModel : function(model) {
					that.select${firstUpper(rel.name)}(model);
				},
			});
			</#if>
		</#list>
		</#if>
			this.on('show', function() {
		<#if entity.relationships??>	
		<#list entity.relationships as rel >
			<#if rel.viewApproach.type == 'modal'>
				this.${firstLower(rel.name)}ModalRegion.show(this.${firstLower(rel.name)}Modal);		
			</#if>
		</#list>
		</#if>
		<#list entity.attributes as att>
		  <#if isNumeric(att.type.className)>
				this.ui.input${firstUpper(att.name)}.formatNumber(2);
		  </#if>	
		  <#if att.viewApproach?? >
			<#if att.viewApproach.type == 'datepicker'>		
				this.ui.groupInput${firstUpper(att.name)}.datetimepicker({
				<#if att.type.className == 'Date'>		
					pickTime : false,
				</#if>					
				<#if att.type.className == 'Datetime'>		
					pickTime : true,
				</#if>					
					language : 'pt_BR',
				});
				this.ui.input${firstUpper(att.name)}.datetimepicker({
				<#if att.type.className == 'Date'>		
					pickTime : false,
				</#if>
				<#if att.type.className == 'Datetime'>		
					pickTime : true,
				</#if>				
					language : 'pt_BR',
				});
			</#if>
			<#if att.viewApproach.type == 'combo'>		
				this.combo${firstUpper(att.name)} = new Combobox({
					el : this.ui.input${firstUpper(att.name)},
				   <#if att.viewApproach.values??>
				    values : ${toListString(att.viewApproach.values)}
					<#else>
					comboId : '${(att.viewApproach.comboId)!'id'}',
					comboVal : '${(att.viewApproach.comboVal)!'name'}',
					collectionEntity : ${att.type.className}Collection, 
					</#if>
				});
				this.combo${firstUpper(att.name)}.setValue(this.model.get('${firstLower(att.name)}'));//getJsonValue
			</#if>
		  </#if>
		  <#if att.mask??>
			<#if att.mask != ''>
				this.ui.input${firstUpper(att.name)}.mask('${att.mask}');
			</#if>
		  </#if>
		</#list>
		<#if entity.relationships??>	
		<#list entity.relationships as rel>
			<#if (rel.type == 'OneToMany' || rel.type == 'ManyToMany' ) && rel.viewApproach.type == 'multiselect'>
				this.${firstLower(rel.name)}Region.show(this.multiSelect${firstUpper(rel.model)});
			<#elseif rel.type == 'ManyToOne'>
				<#if rel.viewApproach?? >
					<#if rel.viewApproach.type  == 'combo'  >
				this.combo${firstUpper(rel.name)} = new Combobox({
					el : this.ui.input${firstUpper(rel.name)},
				   <#if rel.viewApproach.values??>
				    values : '${toString(rel.viewApproach.values)}'
					<#else>
					comboId : '${(rel.viewApproach.comboId)!'id'}',
					comboVal : '${(rel.viewApproach.comboVal)!'name'}',
					collectionEntity : ${firstUpper(rel.model)}Collection, 
					</#if>
				});
				this.combo${firstUpper(rel.name)}.setValue(this.model.get('${firstLower(rel.name)}'));					
					</#if>
				</#if>
			</#if>
		</#list>
		</#if>
				this.ui.form.validationEngine('attach', {
					promptPosition : "topLeft",
					isOverflown : false,
					validationEventTrigger : "change"
				});
			});
		},

		saveAndContinue : function() {
			this.save(true)
		},

		save : function(continua) {
			var that = this;
			var ${firstLower(entity.name)} = that.getModel();

			if (this.isValid()) {
				${firstLower(entity.name)}.save({}, {
					success : function(_model, _resp, _options) {
						util.showSuccessMessage('${firstUpper(entity.displayName)!firstUpper(entity.name)} salvo com sucesso!');
						that.clearForm();

						if (continua != true) {
							util.goPage('app/${firstLower(entity.name)}s');
						}
					},

					error : function(_model, _resp, _options) {
						util.showErrorMessage('Problema ao salvar registro',_resp);
					}
				});
			} else {
				util.showMessage('error', 'Verifique campos em destaque!');
			}
		},

		
		clearForm : function() {
			util.clear('inputId');
		<#list entity.attributes as att>
			util.clear('input${firstUpper(att.name)}'); 
		</#list>
		<#if entity.relationships??>	
		<#list entity.relationships as rel >
			<#if rel.viewApproach?? >
				<#if rel.viewApproach.type == 'multiselect'>			
			this.${firstLower(rel.name)}.reset();
			this.multiSelect${firstUpper(rel.model)}.clear();
				<#elseif rel.viewApproach.type  == 'modal'  >
			this.${firstLower(rel.name)}Modal.clear();
				<#elseif rel.viewApproach.type  == 'combo'  >
			this.combo${firstUpper(rel.name)}.clear(); 					 	
				</#if>
			</#if>
		</#list>
		</#if>
		},

		possuiCamposInvalidos : function() {
			return util.hasInvalidFields(this.validateFields);
		},

		isValid : function() {
			return this.ui.form.validationEngine('validate', {
				promptPosition : "topLeft",
				isOverflown : false,
				validationEventTrigger : "change"
			});
		},

		getModel : function() {
			var that = this;
			var ${firstLower(entity.name)} = that.model; 
			${firstLower(entity.name)}.set({
				id: util.escapeById('inputId') || null,
				<#list entity.attributes as att>
				  	<#if isNumeric(att.type.className)>
		    	${firstLower(att.name)} : util.escapeById('input${firstUpper(att.name)}', true), 
		  			<#else>	
		    	${firstLower(att.name)} : util.escapeById('input${firstUpper(att.name)}'), 
					</#if>
				
				</#list>
				<#if entity.relationships??>	
				<#list entity.relationships as rel >
				<#if (rel.type == 'OneToMany' || rel.type == 'ManyToMany' ) && rel.viewApproach.type == 'multiselect'>
				${firstLower(rel.name)} : that.${firstLower(rel.name)}.toJSON(),
				</#if>			
					<#if rel.viewApproach.type == 'modal' >
				${firstLower(rel.name)} : that.${firstLower(rel.name)}Modal.getJsonValue(),
					</#if>			
					<#if rel.viewApproach.type == 'combo'>
				${firstLower(rel.name)} :  that.combo${firstUpper(rel.name)}.getJsonValue(),
					</#if>
				</#list>
				</#if>
			});
			return ${firstLower(entity.name)};
		},
		 
		<#if entity.relationships??>	
		<#list entity.relationships as rel >
			<#if rel.viewApproach.type == 'modal'>
		select${firstUpper(rel.name)} : function(${firstLower(rel.name)}) {
			this.search${firstUpper(rel.name)}Modal.hidePage();	
		},
			</#if>
		</#list>
		</#if>
				
		<#list entity.attributes as att>
			<#if att.unique>
		change${firstUpper(att.name)} : function() {
			var that = this;
			util.validateUnique({
				element : that.ui.input${firstUpper(att.name)},
				fieldName : '${att.name}',
				fieldDisplayName : '${att.displayName}',
				//onlyNumber : true,     //caso queira que as mascaras sejam removidas e somente NUMEROS sejam enviados na consulta.
				view : that,
				collection : ${entity.name}Collection,
			})
		},				
			</#if>
		</#list>		
		
	});

	return Form${entity.name}s;
});