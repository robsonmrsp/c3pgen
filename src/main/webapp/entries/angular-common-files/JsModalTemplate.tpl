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
	var RadioButtonCell = require('views/components/RadioButtonCell');
	var Counter = require('views/components/Counter');
	var RowClick = require('views/components/CustomClickedRow');
	var Combobox = require('views/components/Combobox');
	var CustomNumberCell = require('views/components/CustomNumberCell');

	var ${entity.name}Modal = require('text!views/modalComponents/tpl/${entity.name}ModalTemplate.html');
	var ${entity.name}PageCollection = require('collections/${entity.name}PageCollection');
	<#list entity.attributes as att>
		<#if att.viewAproach?? >
			<#if att.viewAproach.type == 'combo'>		
	var ${att.type.className}Collection = require('collections/${att.type.className}Collection');
			</#if>
		</#if>
	</#list>
	<#if entity.relationships??>	
	<#list entity.relationships as rel>
		<#if rel.viewAproach?? >
			<#if rel.viewAproach.type  == 'combo'  >
	var ${rel.model}Collection = require('collections/${rel.model}Collection');			
			</#if>
		</#if>
	</#list>
	</#if>			

	<#list entity.attributes as att>
		<#if att.viewAproach?? >
			<#if att.viewAproach.type == 'combo'>		
	var ${att.type.className}Collection = require('collections/${att.type.className}Collection');
			</#if>
		</#if>
	</#list>
	// End of "Import´s" definition
	// #####################################################################################################
	// .............................................MAIN-BODY.............................................
	// #####################################################################################################

	var ${entity.name}Modal = Marionette.LayoutView.extend({
		template : _.template(${entity.name}Modal),

		events : {
			'click #btnSearch${entity.name}' : 'search${entity.name}',
			'click #btnClear${entity.name}' : 'clearModal',
			'click tr' : 'selectRow',
			'keypress' : 'treatKeypress',
		},

		regions : {
			counterRegion : '#counter',
			gridRegion : '#grid-${firstLower(entity.name)}',
			paginatorRegion : '#paginator-${firstLower(entity.name)}',
		},

		ui : {
		<#list entity.attributes as att>
    		inputModal${firstUpper(att.name)} : '#inputModal${firstUpper(att.name)}',
    		<#if att.viewAproach?? >
				<#if att.viewAproach.type == 'datepicker'>			
			groupInputModal${firstUpper(att.name)} : '#groupInputModal${firstUpper(att.name)}',
				</#if>
			</#if>
		</#list>
		<#if entity.relationships??>	
		<#list entity.relationships as rel>
			<#if rel.type == 'OneToMany'>
			<#elseif rel.type == 'ManyToOne'>
				<#if rel.viewAproach?? >
					<#if rel.viewAproach.type  == 'combo'  >
			inputModal${firstUpper(rel.model)} : '#inputModal${firstUpper(rel.model)}', 
					</#if>
				</#if>
			<#elseif rel.type == 'ManyToMany'>
			<#elseif rel.type == 'OneToOne'>
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
			this.${firstLower(entity.name)}Collection.on('fetching', this._startFetch, this);
			this.${firstLower(entity.name)}Collection.on('fetched', this._stopFetch, this);

			this.grid = new Backgrid.Grid({
				row : RowClick,
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.${firstLower(entity.name)}Collection,
				emptyText : "Sem registros para exibir."

			});
			
			this.counter = new Counter({
				collection : this.${firstLower(entity.name)}Collection ,
			});
			

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.${firstLower(entity.name)}Collection,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.on('show', function() {
				that.gridRegion.show(that.grid);
				that.counterRegion.show(that.counter);
				that.paginatorRegion.show(that.paginator);
						<#list entity.attributes as att>
		  <#if att.viewAproach?? >
			<#if att.viewAproach.type == 'datepicker'>		
				this.ui.groupInputModal${firstUpper(att.name)}.datetimepicker({
				<#if att.type.className == 'Date'>		
					pickTime : false,
				</#if>					
					language : 'pt_BR',
				});
				this.ui.inputModal${firstUpper(att.name)}.datetimepicker({
				<#if att.type.className == 'Date'>		
					pickTime : false,
				</#if>
					language : 'pt_BR',
				});
			</#if>
			<#if att.viewAproach.type == 'combo'>		
				var combo${firstUpper(att.name)} = new Combobox({
					el : this.ui.inputModal${firstUpper(att.name)},
				   <#if att.viewAproach.values??>
				    values : ${toListString(att.viewAproach.values)}
					<#else>
					comboId : '${(att.viewAproach.comboId)!'id'}',
					comboVal : '${(att.viewAproach.comboVal)!'name'}',
					collectionEntity : ${att.type.className}Collection, 
					</#if>
				});
			</#if>
		  </#if>
		  <#if att.mask??>
			<#if att.mask != ''>
				this.ui.inputModal${firstUpper(att.name)}.mask('${att.mask}');
			</#if>
		  </#if>
		</#list>
		<#if entity.relationships??>	
		<#list entity.relationships as rel>
			<#if rel.type == 'OneToMany'>
			<#elseif rel.type == 'ManyToOne'>
				<#if rel.viewAproach?? >
					<#if rel.viewAproach.type  == 'combo'  >
				var combo${firstUpper(rel.model)} = new Combobox({
					el : this.ui.inputModal${firstUpper(rel.model)},
				   <#if rel.viewAproach.values??>
				    values : '${toString(rel.viewAproach.values)}'
					<#else>
					comboId : '${(rel.viewAproach.comboId)!'id'}',
					comboVal : '${(rel.viewAproach.comboVal)!'name'}',
					collectionEntity : ${firstUpper(rel.model)}Collection, //provavelmente vá ocorrer um erro pois ${rel.model}Collection não foi declarado
					</#if>
				});
					</#if>
				</#if>
			<#elseif rel.type == 'ManyToMany'>
			<#elseif rel.type == 'OneToOne'>
			</#if>
		</#list>
		</#if>			
			});
		},

		selectRow : function(e) {
			var model${entity.name} = util.getWrappedModel(e);
			if (model${entity.name})
				this.onSelectModel(model${entity.name});
		},
		
		_getColumns : function() {
			var columns = [	

			<#list entity.attributes as att>
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
			</#list>
			];
			return columns;
		},

		clearFields : function() {
			util.clear('inputModalId');
		<#list entity.attributes as att>
			util.clear('inputModal${firstUpper(att.name)}'); 
		</#list>
		<#if entity.relationships??>	
		<#list entity.relationships as rel >
			<#if rel.viewAproach?? >
				<#if rel.viewAproach.type  == 'combo'  >
			util.clear('inputModal${firstUpper(rel.name)}'); 					 	
				</#if>
			</#if>
		</#list>
		</#if>
			util.scrollUpModal();
		},

		search${entity.name} : function() {
			this.${firstLower(entity.name)}Collection.filterQueryParams = {
			<#list entity.attributes as att>
	    		${firstLower(att.name)} : util.escapeById('inputModal${firstUpper(att.name)}'),
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
			this.clearModal();

			this.ui.modalScreen.modal('show');
			this.${firstLower(entity.name)}Collection.getFirstPage({
				success : function(_col, _resp, _opts) {
					//caso queira algum tratamento de sucesso adicional
				},
				error : function(_col, _resp, _opts) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				}
			});
		},

		clearModal : function() {
			this.clearFields();
			this.ui.form.get(0).reset();
			this.${firstLower(entity.name)}Collection.reset();
		},
		
		// Executada depois da consulta concluida.
		_stopFetch : function() {
			util.stopSpinner();
			util.scrollDownModal();
		},
		
		// Executada Antes da realização da consulta.
		_startFetch : function() {
			util.showSpinner('spin${entity.name}');
		},
	});

	return ${entity.name}Modal;
});
