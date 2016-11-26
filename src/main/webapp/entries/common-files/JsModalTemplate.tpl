/* generated: ${.now} */
define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var util = require('utilities/utils');

	var JSetup = require('views/components/JSetup');
	var JSetupView = require('views/core/JSetupView');

	var Combobox = require('views/components/Combobox');

	var ${entity.name}Modal = require('text!views/modalComponents/tpl/${entity.name}ModalTemplate.html');
	var ${entity.name}PageCollection = require('collections/${entity.name}PageCollection');
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
	<#list entity.relationships as rel>
	<#if rel.showInPages >
		<#if rel.viewApproach?? && rel.viewApproach.type??>
			<#if rel.viewApproach.type  == 'combo'  >
	var ${rel.model}Collection = require('collections/${rel.model}Collection');			
			</#if>
		</#if>
	</#if>
	</#list>
	</#if>			

	<#list entity.attributes as att>
	<#if att.showInPages >
		<#if att.viewApproach?? >
			<#if att.viewApproach.type == 'combo'>		
	var ${att.type.className}Collection = require('collections/${att.type.className}Collection');
			</#if>
		</#if>
		</#if>
	</#list>

	var ${entity.name}Modal = JSetupView.extend({
		template : _.template(${entity.name}Modal),

		events : {
			'click .btnSearch${entity.name}' : 'search${entity.name}',
			'click .btnClear${entity.name}' : 'clearModal',
			'click tr' : 'selectRow',
			'keypress' : 'treatKeypress',
		},

		regions : {
			counterRegion : 	'.counter-${firstLower(entity.name)}',
			gridRegion : 		'.grid-${firstLower(entity.name)}',
			paginatorRegion : 	'.paginator-${firstLower(entity.name)}',
		},

		ui : {
		<#list entity.attributes as att>
    		inputModal${firstUpper(att.name)} : '.inputModal${firstUpper(att.name)}',
    		<#if att.viewApproach?? >
				<#if att.viewApproach.type == 'datepicker'>			
			groupInputModal${firstUpper(att.name)} : '.groupInputModal${firstUpper(att.name)}',
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
			inputModal${firstUpper(rel.model)} : '.inputModal${firstUpper(rel.model)}', 
					</#if>
				</#if>
			<#elseif rel.type == 'ManyToMany'>
			<#elseif rel.type == 'OneToOne'>
			</#if>
		</#if>
		</#list>
		</#if>
		
			form : '#formSearch${entity.name}',
			modalScreen : '.modal',
		},
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this.search${entity.name}();
	    	}
		},

		initialize : function(opt) {
			var that = this;

			this.onSelectModel = opt.onSelectModel;

			this.${firstLower(entity.name)}Collection = new ${entity.name}PageCollection();
			this.${firstLower(entity.name)}Collection.state.pageSize = 5;
			this.${firstLower(entity.name)}Collection.on('fetching', this.startFetch, this);
			this.${firstLower(entity.name)}Collection.on('fetched', this.stopFetch, this);

			this.grid = new Backgrid.Grid({
				row : JSetup.RowClick,
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this.getColumns(),
				emptyText : "Sem registros",
				collection : this.${firstLower(entity.name)}Collection,
				emptyText : "Sem registros para exibir."

			});
			
			this.counter = new JSetup.Counter({
				collection : this.${firstLower(entity.name)}Collection ,
			});
			

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this.getColumns(),
				collection : this.${firstLower(entity.name)}Collection,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.on('show', function() {
				that.gridRegion.show(that.grid);
				that.counterRegion.show(that.counter);
				that.paginatorRegion.show(that.paginator);
		 <#list entity.attributes as att>
	   	   <#if att.showInPages >
			  <#if att.inputAs == 'cpf' >
					this.ui.inputModal${firstUpper(att.name)}.cpf();
			  </#if>	
			  <#if att.inputAs == 'percent' >
					this.ui.input${firstUpper(att.name)}.decimal();
			  </#if>			  
			  <#if att.inputAs == 'fone' >
					this.ui.inputModal${firstUpper(att.name)}.fone();
			  </#if>
			  <#if att.inputAs == 'date' >
					this.ui.inputModal${firstUpper(att.name)}.date();
					this.ui.groupInputModal${firstUpper(att.name)}.date();
			  </#if>	
			  <#if att.inputAs == 'datetime' >
					this.ui.inputModal${firstUpper(att.name)}.datetime();
					this.ui.groupInputModal${firstUpper(att.name)}.datetime();
			  </#if>	
			  <#if att.inputAs == 'decimal' >
					this.ui.inputModal${firstUpper(att.name)}.decimal();
			  </#if>	
			  <#if att.inputAs == 'integer' >
					this.ui.inputModal${firstUpper(att.name)}.integer();
			  </#if>	
			  <#if att.inputAs == 'money' >
					this.ui.inputModal${firstUpper(att.name)}.money();
			  </#if>	
			  <#if att.viewApproach?? >
				<#if att.viewApproach.type == 'combo'>		
					var combo${firstUpper(att.name)} = new JSetup.Combobox({
						el : this.ui.inputModal${firstUpper(att.name)},
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
		  </#if>
		</#list>
		
		<#if entity.relationships??>	
		<#list entity.relationships as rel>
		<#if rel.showInPages >
			<#if rel.type == 'OneToMany'>
			<#elseif rel.type == 'ManyToOne'>
				<#if rel.viewApproach?? >
					<#if rel.viewApproach.type  == 'combo'  >
				var combo${firstUpper(rel.model)} = new JSetup.Combobox({
					el : this.ui.inputModal${firstUpper(rel.model)},
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

		selectRow : function(e) {
			var model${entity.name} = util.getWrappedModel(e);
			if (model${entity.name}){
				this.modelSelect = model${entity.name}; 
				this.onSelectModel(model${entity.name});
			}
		},
		getJsonValue : function() {
			if (this.modelSelect) {
				return this.modelSelect.toJSON();
			} else {
				return this.jsonValue;
			}
			return null;
		},
		
		getRawValue : function() {
			var json = this.getJsonValue();
			if(json )
				return json.id
			return null;
		},
		
		getValue : function() {
			return this.modelSelect;
		},

		setValue : function(value) {
			this.jsonValue = value;
		},

		getColumns : function() {
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
			</#list>			];
			return columns;
		},

		search${entity.name} : function() {
			this.${firstLower(entity.name)}Collection.filterQueryParams = {
			<#list entity.attributes as att>
			<#if att.showInPages >
	    		${firstLower(att.name)} : this.ui.inputModal${firstUpper(att.name)}.escape(),
			</#if>
			</#list>		
			};

			this.${firstLower(entity.name)}Collection.fetch({
				resetState : true,
				success : function(_coll, _resp, _opt) {
					//caso queira algum tratamento de sucesso adicional
				},
				error : function(_coll, _resp, _opt) {
					console.error(_coll, _resp, _opt)
				}
			});
		},

		hidePage : function() {
			this.ui.modalScreen.modal('hide');
		},

		showPage : function() {
			this.clearForm();
			this.ui.modalScreen.modal('show');
			
			this.search${entity.name}();
		},

		clearModal : function() {
			this.clearForm();
			util.scrollUpModal();
			this.ui.form.get(0).reset();
			this.${firstLower(entity.name)}Collection.reset();
		},
		
		// Executada depois da consulta concluida.
		stopFetch : function() {
			util.stopSpinner();
			util.scrollDownModal();
		},
		
		// Executada Antes da realização da consulta.
		startFetch : function() {
			util.showSpinner('spin${entity.name}');
		},
	});

	return ${entity.name}Modal;
});
