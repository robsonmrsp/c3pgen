/* generated by JSetup ${JSetupVersion} :  at ${.now} */
define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Util = require('utilities/Utils');
	var Waves = require('waves');

	var FloatButtonSave = require('views/components/FloatButtonSave');
	var Combobox = require('views/components/Combobox');

	var TemplateForm${entity.name}s = require('text!views/${firstLower(entity.name)}/tpl/Form${entity.name}Template.html');
	var ${entity.name}Model = require('models/${entity.name}Model');
	var ${entity.name}Collection = require('collections/${entity.name}Collection');

	<#if entity.relationships??>	
		<#list entity.relationships as rel >
			<#if rel.viewApproach.type == 'combo'>
	var ${rel.model}Collection = require('collections/${rel.model}Collection');			
			</#if>
		</#list>
	</#if>
	
	// End of "Import´s" definition
	var Form${entity.name}s = Marionette.LayoutView.extend({
		template : _.template(TemplateForm${entity.name}s),

		regions : {
			floatButtonSaveRegion : '#floatButtonSave',
		},

		events : {
		},
		
		ui : {
			inputId : '#inputId',
		<#list entity.attributes as att>
			input${firstUpper(att.name)} : '#input${firstUpper(att.name)}',
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

		},

		initialize : function() {
			var that = this;

			this.floatButtonSave = new FloatButtonSave({});
			
			this.floatButtonSave.setOnClickSave(function() {
				var ${firstLower(entity.name)} = that._getModel();
				${firstLower(entity.name)}.save();
				console.info('${firstLower(entity.name)}  Salvo com sucesso');
				Util.goPage('app/${firstLower(entity.name)}s', true);
			});
			
			this.floatButtonSave.setOnClickCancel(function() {
				Util.goPage('app/${firstLower(entity.name)}', true);
			});
			
			this.on('show', function() {
				this.floatButtonSaveRegion.show(this.floatButtonSave);
				
				
		<#if entity.relationships??>	
		<#list entity.relationships as rel>
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
		</#list>
		</#if>
				
			})
		},
		

		saveAndContinue : function() {
			this.save(true)
		},

		clearForm : function() {
			Util.clear('inputId');
		<#list entity.attributes as att>
			Util.clear('input${firstUpper(att.name)}'); 
		</#list>
		},
		
		_getModel : function() {
			var that = this;
			var ${firstLower(entity.name)} = that.model; 
			${firstLower(entity.name)}.set({
				id: Util.escapeById('inputId') || null,
				<#list entity.attributes as att>
		    	${firstLower(att.name)} : Util.escapeById('input${firstUpper(att.name)}'), 
				</#list>
				<#if entity.relationships??>	
					<#list entity.relationships as rel >
						<#if rel.viewApproach.type == 'combo'>
				${firstLower(rel.name)} :  that.combo${firstUpper(rel.name)}.getJsonValue(),
						</#if>
					</#list>
				</#if>

			});
			return ${firstLower(entity.name)};
		},
	});

	return Form${entity.name}s;
});