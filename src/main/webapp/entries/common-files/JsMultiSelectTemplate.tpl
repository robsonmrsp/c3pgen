/* generated: ${.now} */
define(function(require) {

	var util = require('utilities/utils');

	var JSetup = require('views/components/JSetup');
	var JSetupView = require('views/core/JSetupView');

	var MultiselectModal${entity.name}Template = require('text!views/modalComponents/tpl/MultiselectModal${entity.name}Template.html');
	var ${entity.name}PageCollection = require('collections/${entity.name}PageCollection');
	var ${entity.name}PageClientCollection = ${entity.name}PageCollection.extend({
		mode : 'client',
		state : {
			pageSize : 10,
		},
	})
	
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

	var MultiselectModal${entity.name} = JSetupView.extend({
		template : _.template(MultiselectModal${entity.name}Template),

		/** The declared form Regions. */
		regions : {
			dataTablePrincipalRegion : 	'.datatable-principal',
			dataTableModalRegion : 		'.datatable-modal',
		},
		
		/** The form events you'd like to listen */
		events : {
			'click .btn-search' : 'search',
			'click .btn-reset' : 'clearModal',
			'keypress' : 'treatKeypress',
		},
		
		/** All the inportant fields must be here. */		
		ui : {
			loadButton : '.button-loading',
		<#list entity.attributes as att>
    		inputModal${firstUpper(att.name)} : '.inputModal${firstUpper(att.name)}',
    		<#if att.viewApproach?? >
				<#if att.viewApproach.type == 'datepicker'>			
			groupInputModal${firstUpper(att.name)} : '.groupInputModal${firstUpper(att.name)}',
				</#if>
			</#if>
		</#list>
		
			form : '#formSearch${entity.name}',
			modalScreen : '.modal',
		},
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this.search();
	    	}
		},		
		
		/** First function called, like a constructor. */
		initialize : function(opt) {
			var that = this;
			this.principalCollection = new  ${entity.name}PageClientCollection(opt.initialValues) ;

			this.modalCollection = new ${entity.name}PageCollection();
			this.modalCollection.on('fetching', this.startFetch, this);
			this.modalCollection.on('fetched', this.stopFetch, this);
			this.modalCollection.on('backgrid:selected', this.selectModel, this);
			
			this.dataTablePrincipal = new JSetup.DataTable({
				columns : this.getPrincipalColumns(),
				collection : this.principalCollection
			});
			
			this.dataTableModal = new JSetup.DataTable({
				columns : this.getModalColumns(),
				collection : this.modalCollection
			});
		},

		
		/** Called after DOM´s ready.*/
		onShowView :  function() {
			var that = this;
	 <#list entity.attributes as att>
   	   <#if att.showInPages >
		  <#if att.inputAs == 'cpf' >
			this.ui.inputModal${firstUpper(att.name)}.cpf();
		  </#if>	
		  <#if att.inputAs == 'cnpj' >
			this.ui.inputModal${firstUpper(att.name)}.cnpj();
		  </#if>	
		  <#if att.inputAs == 'fone' || att.inputAs == 'telephone' || att.inputAs == 'telefone' >
			this.ui.inputModal${firstUpper(att.name)}.fone();
		  </#if>
		  <#if att.inputAs == 'date' || att.type.className == 'Date'>
			this.ui.inputModal${firstUpper(att.name)}.date();
			this.ui.groupInputModal${firstUpper(att.name)}.date();
		  </#if>	
		  <#if att.inputAs == 'datetime' ||  att.type.className == 'Datetime'>
			this.ui.inputModal${firstUpper(att.name)}.datetime();
			this.ui.groupInputModal${firstUpper(att.name)}.datetime();
		  </#if>	
		  <#if  att.inputAs == 'percent' || att.inputAs == 'percentagem' || att.inputAs == 'decimal' || att.type.className == 'Double'>
			this.ui.inputModal${firstUpper(att.name)}.decimal();
		  </#if>	
		  <#if att.inputAs == 'integer' || att.type.className == 'Integer'>
			this.ui.inputModal${firstUpper(att.name)}.integer();
		  </#if>	
		  <#if att.inputAs == 'money' || att.inputAs == 'monetario'>
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
			var combo${firstUpper(rel.name)} = new JSetup.Combobox({
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
 		    that.dataTablePrincipalRegion.show(that.dataTablePrincipal);
			that.dataTableModalRegion.show(that.dataTableModal);
			that.ui.modalScreen.on('show.bs.modal', function() {
				that.search();
			});
		},
		
		search : function() {
			var that = this;
			this.modalCollection.filterQueryParams = {
			<#list entity.attributes as att>
			<#if att.showInPages >
	    		${firstLower(att.name)} : this.ui.inputModal${firstUpper(att.name)}.escape(),
			</#if>
			</#list>
			<#if entity.relationships??>	
				<#list entity.relationships as rel>
					<#if rel.viewApproach?? >
						<#if rel.viewApproach.type  == 'combo'  >
				${firstLower(rel.name)} : this.ui.inputModal${firstUpper(rel.name)}.escape(),
						</#if>
					</#if>
				</#list>
			</#if>				
			};

			this.modalCollection.fetch({
				resetState : true,
				success : function(_coll, _resp, _opt) {
					//caso queira algum tratamento de sucesso adicional
				},
				error : function(_coll, _resp, _opt) {
					console.error(_coll, _resp, _opt)
				},
			});
		},

		getJsonValue : function() {
			return this.principalCollection && this.principalCollection.fullCollection && this.principalCollection.fullCollection.toJSON();
		},
				
		getValue : function() {
			return (this.principalCollection && this.principalCollection.fullCollection )
		},

		setValue : function(collection) {
			this.principalCollection = collection; 
		},


		clear : function() {
			this.$el.find('input[type=checkbox]').prop('checked', false);
			this.principalCollection.reset();
		},

		clearModal : function() {
			this.$el.find('input[type=checkbox]').prop('checked', false);
		<#list entity.attributes as att>
    		this.ui.inputModal${firstUpper(att.name)}.val(''),
		</#list>
			this.modalCollection.reset();
		},
		
		selectModel : function(model, checked) {
			if (checked) {
				if (model.get && model.get('id')) {
					this.principalCollection.add(model)
				}
			} else {
				this.principalCollection.remove(model);
			}
		},

		endFetch : function(_collection) {

			var that = this;

			this.ui.searchButton.button('reset');

			this.modalCollection.each(function(model) {
				if (that.principalCollection.findWhere({
					id : model.get('id')
				})) {
					model.trigger("backgrid:select", model, true);
				}
			});
		},
		
		getPrincipalColumns : function() {
			var that = this;
			var columns = [	

			<#list entity.attributes as att>
				<#if att.showInPages >			
			{
				name : "${att.name}",
				sortable : true,
				editable : false,
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
			</#list>
			{
				name : "acoes",
				label : "Deletar",
				editable : false,
				sortable : false,
				cell : JSetup.ActionCell.extend({
					buttons : that.getCellPrincipalButtons(),
					context : that,
				})
			}];
			return columns;
		},
		
		getCellPrincipalButtons : function() {
			var that = this;
			var buttons = [];

			buttons.push({
				id : 'delete_button',
				type : 'danger',
				customClass : 'auth[delete-${firstLower(entity.name)}, disable]',
				icon : 'fa-trash',
				hint : 'Remover ${firstUpper(entity.displayName)!firstUpper(entity.name)}',
				onClick : that.deleteModel,
			});

			return buttons;
		},

		deleteModel : function(model) {
			var that = this;
			
			util.Bootbox.confirm("Tem certeza que deseja remover o registro [ " + model.get('id') + " ] ?", function(yes) {
				if (yes) {
					that.principalCollection.remove(model);
				}
			});
			
		},
		
		getModalColumns : function() {
			var columns = [	
			{
				name : "",
				cell : "select-row",
				headerCell : "select-all"
			}, 
			<#list entity.attributes as att>
				<#if att.showInPages >			
			{
				name : "${att.name}",
				sortable : true,
				editable : false,
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
			</#list>
			];
			return columns;
		},

		startFetch : function() {
			this.ui.loadButton.button('loading')
		},
		
		stopFetch : function() {
			var that = this;
			this.ui.loadButton.button('reset')

			this.modalCollection.each(function(model) {
				if (that.principalCollection.findWhere({
					id : model.get('id')
				})) {
					model.trigger("backgrid:select", model, true);
				}
			});
			util.scrollDownModal();
		},		
	});

	return MultiselectModal${entity.name}
});
