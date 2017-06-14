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
	
	var ${entity.name}Model = require('models/${entity.name}Model');
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
			
			'click .show-modal-button' : 'showPage',
			
			'change .inputCod' : 'searchOne${entity.name}',
		},

		regions : {
			counterRegion : 	'#counter-${firstLower(entity.name)}',
			gridRegion : 		'#grid-${firstLower(entity.name)}',
			paginatorRegion : 	'#paginator-${firstLower(entity.name)}',
		},

		ui : {
			inputCod : '.inputCod',
			inputDesc : '.inputDesc',
			searchIcon : '.search-icon-button',
			
		<#list entity.attributes as att>
    		inputModal${firstUpper(att.name)} : '#inputModal${firstUpper(att.name)}',
    		<#if att.viewApproach?? >
				<#if att.viewApproach.type == 'datepicker'>			
			groupInputModal${firstUpper(att.name)} : '#groupInputModal${firstUpper(att.name)}',
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
			inputModal${firstUpper(rel.model)} : '#inputModal${firstUpper(rel.model)}', 
					</#if>
				</#if>
			<#elseif rel.type == 'ManyToMany'>
			<#elseif rel.type == 'OneToOne'>
			</#if>
		</#if>
		</#list>
		</#if>
			modalSpinner : '.modal-spinner',
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
				row : RowClick,
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this.getColumns(),
				emptyText : "Sem registros",
				collection : this.${firstLower(entity.name)}Collection,
				emptyText : "Sem registros para exibir."

			});
			
			this.counter = new Counter({
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
		  <#if att.viewApproach?? >
			<#if att.viewApproach.type == 'datepicker'>		
				this.ui.groupInputModal${firstUpper(att.name)}.datetimepicker({
				<#if att.type.className == 'Date'>		
					pickTime : false,
				</#if>			
				<#if att.type.className == 'Datetime'>		
					pickTime : true,
				</#if>										
					language : 'pt_BR',
				});
				this.ui.inputModal${firstUpper(att.name)}.datetimepicker({
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
				var combo${firstUpper(att.name)} = new Combobox({
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
		  <#if att.mask??>
			<#if att.mask != ''>
				this.ui.inputModal${firstUpper(att.name)}.mask('${att.mask}');
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
				var combo${firstUpper(rel.model)} = new Combobox({
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
				that.ui.inputDesc.clearField({
					onClear : function() {
						that.clear();
					}
				});		
			});
		},

		selectRow : function(e) {
			var model = util.getWrappedModel(e);
			if (model) {
				this.modelSelect = model;
				this.setValue(model.toJSON())
				this.onSelectModel(model);
			}
		},

		getRawValue : function() {
			var json = this.getJsonValue();
			if (json)
				return json.id
			return null;
		},

		getJsonValue : function() {
			if (_.isEmpty(this.modelSelect) && _.isEmpty(this.jsonValue)) {
				return null;
			}
			if (this.modelSelect) {
				return this.modelSelect.toJSON();
			} else {
				return this.jsonValue;
			}
		},

		getValue : function() {
			return this.modelSelect;
		},

		clear : function() {
			this.modelSelect = null;
			this.setValue(null);
		},

		setValue : function(value) {
			this.jsonValue = value;
			if (value) {
				this.ui.inputCod.val(value.id);
				this.ui.inputDesc.val(value.descricao);
			} else {
				this.ui.inputCod.val('');
				this.ui.inputDesc.val('');
			}
		},

		getColumns : function() {
			var columns = [	

			<#list entity.attributes as att>
			<#if att.showInPages >
			{
				name : "${att.name}",
				editable : false,
				sortable : false,
				label 	 : "${firstUpper(att.displayName)!firstUpper(att.name)}",
				<#if isNumeric(att.type.className)>
				cell : CustomNumberCell.extend({}),
		  		<#else>	
				cell 	 : "string",
		  		</#if>	
			}, 
	  		</#if>	
			</#list>
			];
			return columns;
		},

		clearFields : function() {
			util.clear('inputModalId');
		<#list entity.attributes as att>
		<#if att.showInPages >
			util.clear('inputModal${firstUpper(att.name)}'); 
		</#if>
		</#list>
		<#if entity.relationships??>	
		<#list entity.relationships as rel >
		<#if rel.showInPages >
			<#if rel.viewApproach?? >
				<#if rel.viewApproach.type  == 'combo'  >
			util.clear('inputModal${firstUpper(rel.name)}'); 					 	
				</#if>
			</#if>
		</#if>
		</#list>
		</#if>
			util.scrollUpModal();
		},


		searchOne${entity.name} : function() {
			var that = this;
			if (!that.ui.inputCod.val()) {
				return false;
			}
			
			var model = new ${firstUpper(entity.name)}Model();
			model.set('id', that.ui.inputCod.val());
			
			that.ui.searchIcon.addClass('icon-spinner icon-spin')
			that.ui.searchIcon.removeClass('icon-search')
			that.ui.inputDesc.val('');
			model.fetch({
				success : function(_model, rsp, xh) {
					that.clear();
					if (rsp) {
						that.setValue(_model.toJSON());
						that.onSelectModel(_model);
					}
					that.ui.searchIcon.removeClass('icon-spinner icon-spin')
					that.ui.searchIcon.addClass('icon-search')
				},
				error : function(mod, rsp, xh) {
					that.ui.searchIcon.removeClass('icon-spinner icon-spin')
					that.ui.searchIcon.addClass('icon-search')
				},
			})
		},

		search${entity.name} : function() {
			this.${firstLower(entity.name)}Collection.filterQueryParams = {
			<#list entity.attributes as att>
			<#if att.showInPages >
	    		${firstLower(att.name)} : util.escapeById('inputModal${firstUpper(att.name)}'),
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
			this.clearModal();
			this.ui.modalScreen.modal('show');
			this.search${entity.name}();
		},

		clearModal : function() {
			this.clearFields();
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
			util.showSpinner(this.ui.modalSpinner);
		},
	});

	return ${entity.name}Modal;
});
