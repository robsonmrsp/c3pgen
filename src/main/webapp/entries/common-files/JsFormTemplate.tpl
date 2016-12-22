/* generated: ${.now} */
define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var util = require('utilities/utils');
	var JSetupView = require('views/core/JSetupView');
	var JSetup = require('views/components/JSetup');

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
	var Modal${firstUpper(rel.name)} = require('views/modalComponents/${firstUpper(rel.model)}Modal');
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
	
	var Form${entity.name}s = JSetupView.extend({
		template : _.template(TemplateForm${entity.name}s),

		regions : {
			<#list entity.attributes as att >
			<#if att.viewApproach.type == 'upload'>
			upload${firstUpper(att.name)}Region : '.${firstLower(att.name)}-container',		
			</#if>
			</#list>
			<#if entity.relationships??>	
			<#list entity.relationships as rel >
			<#if (rel.type == 'OneToMany' || rel.type == 'ManyToMany' ) && rel.viewApproach.type == 'multiselect'>
			${firstLower(rel.name)}Region : ".${firstLower(rel.name)}-container",
			<#elseif rel.viewApproach.type == 'modal'>
			modal${firstUpper(rel.name)}Region : '#${firstLower(rel.name)}Modal',
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
			'click #search${firstUpper(rel.name)}Modal' : 'showModal${firstUpper(rel.name)}',
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
		</#list>
		</#if>			
			form : '#form${firstUpper(entity.name)}',
		},
		initialize : function() {
			var that = this;
		<#list entity.attributes as att >
			<#if att.viewApproach.type == 'upload'>
			this.uploadView${firstUpper(att.name)} = new JSetup.InputUpload({
				bindElement : that.ui.input${firstUpper(att.name)},
				onSuccess : function(resp, options) {
					console.info('Upload da ${att.name} concluido...[ ' + resp + ' ]')
				},
				onError : function(resp, options) {
					console.error('Problemas ao uppar foto1')
				}
			});
			</#if>
		</#list >
				
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
			this.modal${firstUpper(rel.name)} = new Modal${firstUpper(rel.name)}({
				onSelectModel : function(model) {
					that.onSelect${firstUpper(rel.name)}(model);
				},
			});
			this.modal${firstUpper(rel.name)}.setValue(this.model.get('${firstLower(rel.name)}'));
			</#if>
		</#list>
		</#if>
			this.on('show', function() {
		<#if entity.relationships??>	
		<#list entity.relationships as rel >
			<#if rel.viewApproach.type == 'modal'>
				this.modal${firstUpper(rel.name)}Region.show(this.modal${firstUpper(rel.name)});		
			</#if>
		</#list>
		</#if>
		<#list entity.attributes as att >
			<#if att.viewApproach.type == 'upload'>
				this.upload${firstUpper(att.name)}Region.show(this.uploadView${firstUpper(att.name)});		
			</#if>
		</#list>
                //Formating inputs as		
		<#list entity.attributes as att>
		  <#if att.inputAs == 'cpf' >
				this.ui.input${firstUpper(att.name)}.cpf();
		  </#if>	
		  <#if att.inputAs == 'percent' || att.inputAs == 'percentagem'>
				this.ui.input${firstUpper(att.name)}.decimal();
		  </#if>
		  <#if att.inputAs == 'fone' || att.inputAs == 'telephone' >
				this.ui.input${firstUpper(att.name)}.fone();
		  </#if>
		  <#if att.inputAs == 'date' || || att.type.className == 'Date'>
				this.ui.input${firstUpper(att.name)}.date();
				this.ui.groupInput${firstUpper(att.name)}.date();
		  </#if>	
		  <#if att.inputAs == 'datetime' || || att.type.className == 'Datetime'>
				this.ui.input${firstUpper(att.name)}.datetime();
				this.ui.groupInput${firstUpper(att.name)}.datetime();
		  </#if>	
		  <#if att.inputAs == 'decimal' || att.type.className == 'Double'>
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
				this.combo${firstUpper(att.name)}.setValue(this.model.get('${firstLower(att.name)}'));//getJsonValue
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
				this.combo${firstUpper(rel.name)} = new JSetup.Combobox({
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
		
		getModel : function() {
			var that = this;
			var ${firstLower(entity.name)} = that.model; 
			${firstLower(entity.name)}.set({
				id: this.ui.inputId.escape(),
				<#list entity.attributes as att>
		    	${firstLower(att.name)} : this.ui.input${firstUpper(att.name)}.escape(), 
				</#list>
				
				<#if entity.relationships??>	
				<#list entity.relationships as rel >
				<#if (rel.type == 'OneToMany' || rel.type == 'ManyToMany' ) && rel.viewApproach.type == 'multiselect'>
					${firstLower(rel.name)} : that.${firstLower(rel.name)}.toJSON(),
				</#if>			
					<#if rel.viewApproach.type == 'modal' >
				${firstLower(rel.name)} : that.modal${firstUpper(rel.name)}.getJsonValue(),
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
		showModal${firstUpper(rel.name)} : function() {
			// add more before the modal is open
			this.modal${firstUpper(rel.name)}.showPage();
		},
			</#if>
		</#list>
		</#if>
				<#if entity.relationships??>	
		<#list entity.relationships as rel >
			<#if rel.viewApproach.type == 'modal'>
		onSelect${firstUpper(rel.name)} : function(${firstLower(rel.name)}) {
			this.modal${firstUpper(rel.name)}.hidePage();	
			this.ui.input${firstUpper(rel.name)}${firstUpper(rel.viewApproach.hiddenField)}.val(${firstLower(rel.name)}.get('${firstLower(rel.viewApproach.hiddenField)}'));
			this.ui.input${firstUpper(rel.name)}${firstUpper(rel.viewApproach.textField)}.val(${firstLower(rel.name)}.get('${firstLower(rel.viewApproach.textField)}'));		
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
				//onlyNumber : true,     
				view : that,
				collection : ${entity.name}Collection,
			})
		},				
			</#if>
		</#list>		
	});

	return Form${entity.name}s;
});