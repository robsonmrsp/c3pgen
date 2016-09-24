/* generated: ${.now} */
define(function(require) {
	// Start "Import´s Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Backgrid = require('adapters/backgrid-adapter');
	var util = require('utilities/utils');
	var Combobox = require('views/components/Combobox');
	var CustomStringCell = require('views/components/CustomStringCell');
	var Counter = require('views/components/Counter');
	var ActionsCell = require('views/components/ActionsCell');
	var CustomNumberCell = require('views/components/CustomNumberCell');

	var TemplateForm${entity.name}s = require('text!views/${firstLower(entity.name)}/tpl/Form${entity.name}Template.html');
	var ${entity.name}Model = require('models/${entity.name}Model');
	var ${entity.name}Collection = require('collections/${entity.name}Collection');
	var ${entity.name}PageCollection = require('collections/${entity.name}PageCollection');
	var Page${entity.name}Template = require('text!views/${firstLower(entity.name)}/tpl/Page${entity.name}Template.html');
	
	//Filter import
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
		<#if rel.viewAproach?? >
			<#if rel.viewAproach.type  == 'combo'  >
	var ${rel.model}Collection = require('collections/${rel.model}Collection');			
			</#if>
		</#if>
	</#list>
	</#if>			
	
	// End of "Import´s" definition

	var Page${entity.name} = Marionette.LayoutView.extend({
		template : _.template(Page${entity.name}Template),

		regions : {
			gridRegion : '#grid',
			counterRegion : '#counter',
			paginatorRegion : '#paginator',
			<#if entity.relationships??>	
			<#list entity.relationships as rel >
				<#if rel.viewAproach.type == 'modal'>
			search${firstUpper(rel.name)}ModalRegion : '#${firstLower(rel.name)}Modal',
				</#if>
			</#list>
			</#if>			
		},
		
		events : {
			'click 	#query' : '_query${firstUpper(entity.name)}',			
			'click 	#reset' : '_reset${firstUpper(entity.name)}',			
			<#if entity.relationships??>	
			<#list entity.relationships as rel >
				<#if rel.viewAproach.type == 'modal'>
			'click #search${firstUpper(rel.name)}Modal' : '_showSearch${firstUpper(rel.name)}Modal',
				</#if>
			</#list>
			</#if>
			'keypress' : 'treatKeypress',
		},
		
		
		ui : {
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
			form : '#form${firstUpper(entity.name)}Filter',
		},
		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this._query${firstUpper(entity.name)}();
	    	}
		},

		initialize : function() {
			var that = this;

			this.${firstLower(entity.name)}s = new ${entity.name}PageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.${firstLower(entity.name)}s
			});

			this.counter = new Counter({
				collection : this.${firstLower(entity.name)}s,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.${firstLower(entity.name)}s,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.${firstLower(entity.name)}s.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid ${firstLower(entity.name)}');
				},
				error : function(_col, _resp, _opts) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')) );
				}
			});
		<#if entity.relationships??>	
		<#list entity.relationships as rel >
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
				that.gridRegion.show(that.grid);
				that.counterRegion.show(that.counter);
				that.paginatorRegion.show(that.paginator);
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
				var combo${firstUpper(att.name)} = new Combobox({
					el : this.ui.input${firstUpper(att.name)},
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
				this.ui.input${firstUpper(att.name)}.mask('${att.mask}');
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
					el : this.ui.input${firstUpper(rel.name)},
				   <#if rel.viewAproach.values??>
				    values : '${toString(rel.viewAproach.values)}'
					<#else>
					comboId : '${(rel.viewAproach.comboId)!'id'}',
					comboVal : '${(rel.viewAproach.comboVal)!'name'}',
					collectionEntity : ${firstUpper(rel.model)}Collection,
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
		 
		_query${firstUpper(entity.name)} : function(){
			var that = this;

			this.${firstLower(entity.name)}s.filterQueryParams = {
			<#list entity.attributes as att>
	    		${firstLower(att.name)} : util.escapeById('input${firstUpper(att.name)}'), 
			</#list>
			<#if entity.relationships??>	
			<#list entity.relationships as rel >
				<#if rel.viewAproach.type == 'modal' >
			    ${firstLower(rel.name)} : util.escapeById('input${firstUpper(rel.name)}${firstUpper(rel.viewAproach.hiddenField)}'), 
				</#if> 
				<#if  rel.viewAproach.type == 'combo'>
			    ${firstLower(rel.name)} : util.escapeById('input${firstUpper(rel.name)}'), 
				</#if>
			</#list>
			</#if>
			}
			this.${firstLower(entity.name)}s.fetch({
				success : function(_coll, _resp, _opt) {
					console.info('Consulta para o grid ${firstLower(entity.name)}');
				},
				error : function(_coll, _resp, _opt) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				},
				complete : function() {
					
				},
			})		
		},
		_reset${firstUpper(entity.name)} : function(){
			this.ui.form.get(0).reset();
			this.${firstLower(entity.name)}s.reset();
		},
				
		_getColumns : function() {
			var columns = [
			//{
			//	name : "id",
			//	label : "id",
			//	editable : false,
			//	cell : Backgrid.IntegerCell.extend({
			//		orderSeparator : ''
			//	})
			//}, 
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
			<#if entity.relationships??>	
				<#list entity.relationships as rel >
					<#if rel.viewAproach.type == 'modal'>
			{
				name : "${firstLower(rel.name)}.${rel.viewAproach.textField}",
				editable : false,
				sortable : true,  //já é possivel ordenar por esses atributos compostos.
				label : "${rel.displayName}",
				cell : CustomStringCell.extend({
					fieldName : '${firstLower(rel.name)}.${rel.viewAproach.textField}',
				}),
			},	
					</#if>
				</#list>
			</#if>
			{
				name : "acoes",
				label : "Ações(Editar, Deletar)",
				sortable : false,
				cell : ActionsCell.extend({
					editPath : this._getEditPath,
					deletePath : this._getDeletePath,
					editModel : this._editModel,
					deleteModel : this._deleteModel
				})
			} ];
			return columns;
		},

		_deleteModel : function(model) {
			util.Bootbox.confirm("Tem certeza que deseja remover o registro [ " + model.get('id') + "] ?", function(yes) {
				if (yes) {
					model.destroy({
						success : function() {
							util.showMessage('success', 'Registro removido com sucesso!');
						},
						error : function() {
							util.showMessage('error', 'Problemas ao remover registro!');
							console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
						}
					});
				}
			});
		},

		_getDeletePath : function(model) {
			// alert('Delete,,, ' + JSON.stringify(model));
		},

		_getEditPath : function(model) {
			return "app/edit${entity.name}/" + model.get('id');
		},

		_editModel : function(model) {

		},
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
		

	});

	return Page${entity.name};
});
