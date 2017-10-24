/* generated by JSetup ${JSetupVersion} :  at ${.now} */
define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var util = require('utilities/utils');
	var JSetup = require('views/components/JSetup');

	var TemplateForm${entity.name}s = require('text!views/${firstLower(entity.name)}/tpl/Form${entity.name}Template.html');
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
	var Modal${firstUpper(rel.name)} = require('views/modalComponents/Modal${firstUpper(rel.model)}');
		</#if>
		<#if rel.viewApproach.type == 'multiselectmodal'>
	var MultiselectModal${firstUpper(rel.name)} = require('views/modalComponents/MultiselectModal${firstUpper(rel.model)}');
		</#if>		
	</#list>
	</#if>
	
	var ${entity.name} = require('models/${entity.name}');
	<#if entity.relationships??>	
	<#list entity.relationships as rel>
		<#if rel.viewApproach?? >
			<#if rel.viewApproach.type  == 'combo'  ||  rel.viewApproach.type  == 'multiselect' ||  rel.viewApproach.type  == 'multiselectmodal'>
	var ${rel.model} = require('models/${rel.model}');			
			</#if>
		</#if>
	</#list>
	</#if>			
	
	var Form${entity.name}s = JSetup.View.extend({
		template : _.template(TemplateForm${entity.name}s),

		/** The declared form Regions. */
		regions : {
			<#list entity.attributes as att >
			<#if att.viewApproach.type == 'upload'>
			upload${firstUpper(att.name)}Region : '.${firstLower(att.name)}-container',		
			</#if>
			</#list>
			<#if entity.relationships??>	
			<#list entity.relationships as rel >
				<#if rel.viewApproach.type == 'modal'>
			modal${firstUpper(rel.name)}Region : '.${firstLower(rel.name)}.modal',
				</#if>
				<#if rel.viewApproach.type == 'multiselectmodal'>
			multiselectModal${firstUpper(rel.name)}Region : '.${firstLower(rel.name)}-container',
				</#if>
			</#list>
			</#if>
		},

		/** The form events you'd like to listen */
		events : {
			'click 	.save' : 'save',
			'click 	.save-continue' : 'saveAndContinue',
			<#if entity.relationships??>	
			<#list entity.relationships as rel >
				<#if rel.viewApproach.type == 'modal'>
			'click .search-${firstLower(rel.name)}-modal' : 'showModal${firstUpper(rel.name)}',
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
		/** All the important fields must be here. */
		ui : {
			inputId : '#inputId',
			saveButton : '.button-saving',
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
				<#if rel.viewApproach?? >
					<#if  rel.viewApproach.type  == 'multiselect'>
			input${firstUpper(rel.name)} : '#input${firstUpper(rel.name)}',
					</#if> 
				</#if>
			<#elseif rel.type == 'ManyToOne'>
				<#if rel.viewApproach?? >
					<#if rel.viewApproach.type  == 'combo'  || rel.viewApproach.type  == 'multiselect'>
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
				<#if rel.viewApproach?? >
					<#if rel.viewApproach.type  == 'multiselect'>
			input${firstUpper(rel.name)} : '#input${firstUpper(rel.name)}', 
					</#if>
				</#if>
			<#elseif rel.type == 'OneToOne'>
			</#if>
		</#list>
		</#if>			
			form : '#form${firstUpper(entity.name)}',
		},
		
		/** First function called, like a constructor. */
		initialize : function(options) {
			var that = this;
			//here the code 
		},
		
		/** Called after DOM´s ready.*/
		onShowView : function() {
			var that = this;
		<#list entity.attributes as att>
		  <#if att.type.className == 'Boolean' && att.viewApproach.type  == 'check'  >
		    this.ui.input${firstUpper(att.name)}.bootstrapSwitch();
		  </#if>
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
		  <#if att.inputAs == 'percent' || att.inputAs == 'percentagem' || att.inputAs == 'decimal' || att.type.className == 'Double' || att.inputAs == 'monetario'>
			this.ui.input${firstUpper(att.name)}.decimal();
		  </#if>	
		  <#if att.inputAs == 'integer' || att.type.className == 'Integer'>
			this.ui.input${firstUpper(att.name)}.integer();
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
				initialValue : that.model.get('${firstLower(att.name)}'),
			});
			</#if>
		  </#if>
		</#list>			

		<#if entity.relationships??>
		<#list entity.relationships as rel>
			<#if (rel.type == 'OneToMany' || rel.type == 'ManyToMany' ) && rel.viewApproach.type == 'multiselectmodal'>
			this.multiselectModal${firstUpper(rel.name)} = new MultiselectModal${firstUpper(rel.name)}({
				initialValues : that.model.get('${firstLower(rel.name)}'),
			});
			</#if>
			<#if (rel.type == 'OneToMany' || rel.type == 'ManyToMany' ) && rel.viewApproach.type == 'multiselect'>
			this.multiselect${firstUpper(rel.name)} = new JSetup.Multiselect({
				el : this.ui.input${firstUpper(rel.name)},
			   <#if rel.viewApproach.values??>
			    values : '${toString(rel.viewApproach.values)}'
				<#else>
				comboId : '${(rel.viewApproach.comboId)!'id'}',
				comboVal : '${(rel.viewApproach.comboVal)!'name'}',
				collectionEntity : ${firstUpper(rel.model)}.Collection, 
				</#if>
			    initialValue : that.model.get('${firstLower(rel.name)}'),
			});
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
				collectionEntity : ${firstUpper(rel.model)}.Collection, 
				</#if>
				initialValue : that.model.get('${firstLower(rel.name)}'),					
			});
					</#if>
				</#if>
			</#if>
		</#list>
		</#if>			
		<#if entity.relationships??>	
		<#list entity.relationships as rel >
			<#if rel.viewApproach.type == 'modal'>
			this.modal${firstUpper(rel.name)} = new Modal${firstUpper(rel.name)}({
				onSelectModel : function(model) {
					that.onSelect${firstUpper(rel.name)}(model);
				},
				suggestConfig : {
					showValue : '${firstLower(rel.viewApproach.textField)}',
					field : that.ui.input${firstUpper(rel.name)}${firstUpper(rel.viewApproach.textField)}
				},
				initialValue : that.model.get('${firstLower(rel.name)}'),		
			});
			</#if>
		</#list>
		</#if>
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
			<#if rel.viewApproach.type == 'modal'>
			this.modal${firstUpper(rel.name)}Region.show(this.modal${firstUpper(rel.name)});		
			</#if>
			<#if rel.viewApproach.type == 'multiselectmodal'>
			this.multiselectModal${firstUpper(rel.name)}Region.show(this.multiselectModal${firstUpper(rel.name)});		
			</#if>
		</#list>
		</#if>
		<#list entity.attributes as att >
			<#if att.viewApproach.type == 'upload'>
			this.upload${firstUpper(att.name)}Region.show(this.uploadView${firstUpper(att.name)});		
			</#if>
		</#list>
		},
		
		saveAndContinue : function() {
			this.save(true)
		},

		save : function(continua) {
			var that = this;
			var ${firstLower(entity.name)} = that.getModel();

			if (this.isValid()) {
			this.ui.saveButton.button('loading');
				${firstLower(entity.name)}.save({}, {
					success : function(_model, _resp, _options) {
						util.showSuccessMessage('${firstUpper(entity.displayName)!firstUpper(entity.name)} salvo com sucesso!');
						that.clearForm();

						if (continua != true) {
							util.goPage('app/${firstLower(entity.name)}s', true);
						}
					},

					error : function(_model, _resp, _options) {
						that.ui.saveButton.button('reset');
						util.showErrorMessage('Problema ao salvar registro',_resp);
					}
				});
			} 
		},
		
		getModel : function() {
			var that = this;
			var ${firstLower(entity.name)} = that.model; 
			${firstLower(entity.name)}.set({
				id: this.ui.inputId.escape(),
				<#list entity.attributes as att>
				<#if isNumeric(att.type.className)>
		    	${firstLower(att.name)} : this.ui.input${firstUpper(att.name)}.escape(true),
		    	<#else> 
		    	${firstLower(att.name)} : this.ui.input${firstUpper(att.name)}.escape(), 
		    	</#if>
				</#list>
				
				<#if entity.relationships??>	
				<#list entity.relationships as rel >
					<#if (rel.type == 'OneToMany' || rel.type == 'ManyToMany' ) && rel.viewApproach.type == 'multiselect'>
				${firstLower(rel.name)} :  that.multiselect${firstUpper(rel.name)}.getJsonValue(),
					</#if>			
					<#if rel.viewApproach.type == 'modal' >
				${firstLower(rel.name)} : that.modal${firstUpper(rel.name)}.getJsonValue(),
					</#if>			
					<#if rel.viewApproach.type == 'multiselectmodal' >
				${firstLower(rel.name)} : that.multiselectModal${firstUpper(rel.name)}.getJsonValue(),
					</#if>			
					<#if rel.viewApproach.type == 'combo'>
				${firstLower(rel.name)} :  that.combo${firstUpper(rel.name)}.getJsonValue(),
					</#if>
				</#list>
				</#if>
			});
			return ${firstLower(entity.name)};
		},
		
		customClearForm : function(){
			this.ui.saveButton.button('reset');
		<#list entity.attributes as att>
		<#if att.viewApproach.type == 'upload'>
			this.uploadView${firstUpper(att.name)}.clear();		
		</#if>
		</#list>
		<#list entity.relationships as rel >
			<#if rel.viewApproach?? >
				<#if rel.viewApproach.type == 'modal' >
		    this.modal${firstUpper(rel.name)}.clear(); 
				</#if> 
				<#if  rel.viewApproach.type == 'combo'>
		    this.combo${firstUpper(rel.name)}.clear(); 
				</#if>
				<#if  rel.viewApproach.type == 'multiselect'>
		    this.multiselect${firstUpper(rel.name)}.clear(); 
				</#if>
				<#if  rel.viewApproach.type == 'multiselectmodal'>
		    this.multiselectModal${firstUpper(rel.name)}.clear(); 
				</#if>
			</#if>
		</#list>	
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
				collection : ${entity.name}.Collection,
			})
		},				
			</#if>
		</#list>		
	});

	return Form${entity.name}s;
});