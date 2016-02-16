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
		<#if att.viewAproach?? >
			<#if att.viewAproach.type == 'combo'>		
	var ${att.type.className}Collection = require('collections/${att.type.className}Collection');
			</#if>
		</#if>
	</#list>
	<#if entity.relationships??>	
	<#list entity.relationships as rel >
		<#if rel.viewAproach.type == 'modal'>
	var Search${firstUpper(rel.name)}Modal = require('views/modalComponents/${firstUpper(rel.model)}Modal');
		</#if>
	</#list>
	</#if>
	<#if entity.relationships??>	
	<#list entity.relationships as rel>
		<#if (rel.type == 'OneToMany' || rel.type == 'ManyToMany' ) && rel.viewAproach.type == 'multiselect'>
	var ${firstUpper(rel.model)}Collection = require('collections/${firstUpper(rel.model)}Collection');
	var MultiSelect${firstUpper(rel.model)} = require('views/${firstLower(rel.model)}/MultiSelect${firstUpper(rel.model)}');			
		</#if>			
		<#if rel.viewAproach?? >
			<#if rel.viewAproach.type  == 'combo'  >
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
			<#if (rel.type == 'OneToMany' || rel.type == 'ManyToMany' ) && rel.viewAproach.type == 'multiselect'>
			${firstLower(rel.name)}Region : ".${firstLower(rel.name)}-container",
			<#elseif rel.viewAproach.type == 'modal'>
			search${firstUpper(rel.name)}ModalRegion : '#${firstLower(rel.name)}Modal',
				</#if>
			</#list>
			</#if>
		},

		events : {
			'click 	.save' : 'save',
			'click 	.saveAndContinue' : 'saveAndContinue',
			<#if entity.relationships??>	
			<#list entity.relationships as rel >
				<#if rel.viewAproach.type == 'modal'>
			'click #search${firstUpper(rel.name)}Modal' : '_showSearch${firstUpper(rel.name)}Modal',
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
			<#if att.viewAproach?? >
				<#if att.viewAproach.type == 'datepicker'>			
			groupInput${firstUpper(att.name)} : '#groupInput${firstUpper(att.name)}',
				</#if>
			</#if>
		</#list>
		
		<#if entity.relationships??>	
		<#list entity.relationships as rel>
			<#if rel.type == 'OneToMany'>
			<#elseif rel.type == 'ManyToOne'>
				<#if rel.viewAproach?? >
					<#if rel.viewAproach.type  == 'combo'  >
			input${firstUpper(rel.name)} : '#input${firstUpper(rel.name)}', 
					<#elseif rel.viewAproach.type  == 'modal'  >
					<#if rel.viewAproach.hiddenField??>
			input${firstUpper(rel.name)}${firstUpper(rel.viewAproach.hiddenField)} : '#input${firstUpper(rel.name)}${firstUpper(rel.viewAproach.hiddenField)}',
					</#if>					
					<#if rel.viewAproach.textField??>
			input${firstUpper(rel.name)}${firstUpper(rel.viewAproach.textField)} : '#input${firstUpper(rel.name)}${firstUpper(rel.viewAproach.textField)}',
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
			<#if (rel.type == 'OneToMany' || rel.type == 'ManyToMany' ) && rel.viewAproach.type == 'multiselect'>
			that.${firstLower(rel.name)} = new ${firstUpper(rel.model)}Collection();
			that.${firstLower(rel.name)}.add(this.model.get('${firstLower(rel.name)}'));
			this.multiSelect${firstUpper(rel.model)} = new MultiSelect${firstUpper(rel.model)}({
				collection : that.${firstLower(rel.name)},
			});
			</#if>
			<#if rel.viewAproach.type == 'modal'>
			this.search${firstUpper(rel.name)}Modal = new Search${firstUpper(rel.name)}Modal({
				onSelectModel : function(model) {
					that._select${firstUpper(rel.name)}(model);
				},
			});
			</#if>
		</#list>
		</#if>
			this.on('show', function() {
		<#if entity.relationships??>	
		<#list entity.relationships as rel >
			<#if rel.viewAproach.type == 'modal'>
				this.search${firstUpper(rel.name)}ModalRegion.show(this.search${firstUpper(rel.name)}Modal);		
			</#if>
		</#list>
		</#if>
		<#list entity.attributes as att>
		  <#if isNumeric(att.type.className)>
				this.ui.input${firstUpper(att.name)}.formatNumber(2);
		  </#if>	
		  <#if att.viewAproach?? >
			<#if att.viewAproach.type == 'datepicker'>		
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
			<#if att.viewAproach.type == 'combo'>		
				this.combo${firstUpper(att.name)} = new Combobox({
					el : this.ui.input${firstUpper(att.name)},
				   <#if att.viewAproach.values??>
				    values : ${toListString(att.viewAproach.values)}
					<#else>
					comboId : '${(att.viewAproach.comboId)!'id'}',
					comboVal : '${(att.viewAproach.comboVal)!'name'}',
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
			<#if (rel.type == 'OneToMany' || rel.type == 'ManyToMany' ) && rel.viewAproach.type == 'multiselect'>
				this.${firstLower(rel.name)}Region.show(this.multiSelect${firstUpper(rel.model)});
			<#elseif rel.type == 'ManyToOne'>
				<#if rel.viewAproach?? >
					<#if rel.viewAproach.type  == 'combo'  >
				this.combo${firstUpper(rel.name)} = new Combobox({
					el : this.ui.input${firstUpper(rel.name)},
				   <#if rel.viewAproach.values??>
				    values : '${toString(rel.viewAproach.values)}'
					<#else>
					comboId : '${(rel.viewAproach.comboId)!'id'}',
					comboVal : '${(rel.viewAproach.comboVal)!'name'}',
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
			var ${firstLower(entity.name)} = that._getModel();

			if (this._isValid()) {
				${firstLower(entity.name)}.save({}, {
					success : function(_model, _resp, _options) {
						util.showMessage('success', '${entity.name} salvo com sucesso!');
						that.clearForm();

						if (continua != true) {
							util.goPage('app/${firstLower(entity.name)}s');
						}
					},

					error : function(_model, _resp, _options) {
						util.showMessage('error', 'Problema ao salvar registro: ' + util.getJson(_resp.responseText).legalMessage || '');
						console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
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
			<#if rel.viewAproach?? >
				<#if rel.viewAproach.type == 'multiselect'>			
			this.${firstLower(rel.name)}.reset();
			this.multiSelect${firstUpper(rel.model)}.clear();
				<#elseif rel.viewAproach.type  == 'modal'  >
					<#if rel.viewAproach.hiddenField??>
			util.clear('input${firstUpper(rel.name)}${firstUpper(rel.viewAproach.hiddenField)}');
					</#if>					
					<#if rel.viewAproach.textField??>
			util.clear('input${firstUpper(rel.name)}${firstUpper(rel.viewAproach.textField)}');
					</#if>
				<#elseif rel.viewAproach.type  == 'combo'  >
			util.clear('input${firstUpper(rel.name)}'); 					 	
				</#if>
			</#if>
		</#list>
		</#if>
		},

		possuiCamposInvalidos : function() {
			return util.hasInvalidFields(this.validateFields);
		},

		_isValid : function() {
			return this.ui.form.validationEngine('validate', {
				promptPosition : "topLeft",
				isOverflown : false,
				validationEventTrigger : "change"
			});
		},

		_getModel : function() {
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
				<#if (rel.type == 'OneToMany' || rel.type == 'ManyToMany' ) && rel.viewAproach.type == 'multiselect'>
					${firstLower(rel.name)} : that.${firstLower(rel.name)}.toJSON(),
				</#if>			
					<#if rel.viewAproach.type == 'modal' >
					${firstLower(rel.name)} : that._get${firstUpper(rel.name)}(),
					</#if>			
					<#if rel.viewAproach.type == 'combo'>
					${firstLower(rel.name)} :  that.combo${firstUpper(rel.name)}.getJsonValue(),
					</#if>
				</#list>
				</#if>
			});
			return ${firstLower(entity.name)};
		},
		 
		<#if entity.relationships??>	
		<#list entity.relationships as rel >
			<#if rel.viewAproach.type == 'modal' >
		_get${firstUpper(rel.name)} : function() {			
			var ${firstLower(rel.viewAproach.hiddenField)} = util.escapeById('input${firstUpper(rel.name)}${firstUpper(rel.viewAproach.hiddenField)}');
			var ${firstLower(rel.viewAproach.textField)} = util.escapeById('input${firstUpper(rel.name)}${firstUpper(rel.viewAproach.textField)}');
			var ${firstLower(rel.name)} = null;
			
			if (${firstLower(rel.viewAproach.hiddenField)} && ${firstLower(rel.viewAproach.textField)}) {
				${firstLower(rel.name)} = {
					${firstLower(rel.viewAproach.hiddenField)} : ${firstLower(rel.viewAproach.hiddenField)},
					${firstLower(rel.viewAproach.textField)} : ${firstLower(rel.viewAproach.textField)},
				}
			}
			return ${firstLower(rel.name)};
		},	
			<#elseif rel.viewAproach.type == 'combo'>
		_get${firstUpper(rel.name)} : function() {
			var id =  this.combo${firstUpper(rel.name)}.getRawValue();			
			
			if(id){
				return {
					id: id,
				}
			}
			return null;
		},				
			</#if>			
		</#list>
		</#if>
		
		<#if entity.relationships??>	
		<#list entity.relationships as rel >
			<#if rel.viewAproach.type == 'modal'>
		_showSearch${firstUpper(rel.name)}Modal : function() {
			this.search${firstUpper(rel.name)}Modal.showPage();
		},
			
		_select${firstUpper(rel.name)} : function(${firstLower(rel.name)}) {
			this.search${firstUpper(rel.name)}Modal.hidePage();	
			this.ui.input${firstUpper(rel.name)}${firstUpper(rel.viewAproach.hiddenField)}.val(${firstLower(rel.name)}.get('${firstLower(rel.viewAproach.hiddenField)}'));
			this.ui.input${firstUpper(rel.name)}${firstUpper(rel.viewAproach.textField)}.val(${firstLower(rel.name)}.get('${firstLower(rel.viewAproach.textField)}'));		
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