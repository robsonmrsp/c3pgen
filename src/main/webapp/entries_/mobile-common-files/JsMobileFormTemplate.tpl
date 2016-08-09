/* generated: ${.now} */
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
	<#list entity.attributes as att>
		<#if att.viewApproach?? >
			<#if att.viewApproach.type == 'combo'>		
	var ${att.type.className}Collection = require('collections/${att.type.className}Collection');
			</#if>
		</#if>
	</#list>
	
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
			});
			return ${firstLower(entity.name)};
		},
	});

	return Form${entity.name}s;
});