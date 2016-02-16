<!-- generated: ${.now} -->
<!-- ${entity.name}´s form -->
<div class="main-content-inner">
	<div class="breadcrumbs" id="breadcrumbs">
		<ul class="breadcrumb">
			<li>
				<i class="ace-icon fa fa-home home-icon"></i>
				<a href="#">Home</a>
			</li>
			<li class="active">Cadastrar ${entity.displayName}</li>
		</ul>
	</div>
	<form c3p-form role="form" id="form${firstUpper(entity.name)}" action="rs/crud/uploads/file" method="post" c3p-form-save-button='saveBtn' c3p-form-save-and-continue-button='saveAndContinueBtn' c3p-form-validate-options=''>
		<div class="page-content">
			<div class="page-header">
				<h1>Cadastrar ${entity.displayName}</h1>
			</div>
			<div class="main-principal">
				<div class="row">
					<div class="col-xs-12 col-sm-12">
						<div id="messages_div"></div>
					</div>
				</div>
				<div class="row">
					<div class="col-xs-12 col-sm-12">
						<br>
						<input type="hidden" id="inputId" data-ng-model='${firstLower(entity.name)}Model.id'>
						<div class="panel panel-default plain profile-widget">
							<div id="messages_div"></div>
							<!-- Start .panel -->
							<div class="panel-body">
							<#list entity.attributes as att>
							  <#if att.viewAproach?? >
								<#if att.type.className == 'Boolean' && att.viewAproach.type  == 'check'  >
								<div id="groupInput${firstUpper(att.name)}" class="form-group checkbox">
									<label class="checkbox ">
										<input id="input${firstUpper(att.name)}" type="checkbox" data-ng-model='${firstLower(entity.name)}Model.${firstLower(att.name)}' />
										${firstUpper(att.displayName)}
									</label>
								</div>
								<#elseif att.viewAproach.type  == 'datepicker'  >
								<div id="groupInput${firstUpper(att.name)}Container" class="form-group">
									<label class="control-label" for="input${firstUpper(att.name)}">  ${firstUpper(att.displayName)!firstLower(att.name)}  ${att.required ? string('*','')} </label>
									<div id="groupInput${firstUpper(att.name)}" class="input-group date" data-date-format="${att.dateFormat}"  c3p-date-picker c3p-date-picker-options="{pickTime : false}" >
										<input id="input${firstUpper(att.name)}" placeholder="Escolha ou digite uma data." type="text" class="form-control ${getRequiredClass(att.required)} append-left" c3p-date-picker c3p-date-picker-options="{pickTime : false}"  data-ng-model="${firstLower(entity.name)}Model.${firstLower(att.name)}" />
										<div class="input-group-addon	append-right">
											<span class="fa fa-calendar"></span>
										</div>
									</div>
								</div>
								<#elseif att.viewAproach.type  == 'combo'  >
								<div id="groupInput${firstUpper(att.name)}" class="form-group">
									<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)} ${att.required ? string('*','')} </label>
									<select class="form-control" data-ng-model="${firstLower(entity.name)}Model.${firstLower(att.name)}" ng-options="${firstLower(att.name)} as ${firstLower(att.name)}.${firstLower(rel.viewAproach.textField)} for ${firstLower(att.name)} in ${firstLower(att.name)}s"></select>
								</div>					
								<#elseif att.viewAproach.type  == 'textarea'  >
								<div id="groupInput${firstUpper(att.name)}" class="form-group">
									<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)} ${att.required ? string('*','')} </label>
									<textarea rows="3" id="input${firstUpper(att.name)}" placeholder="${firstUpper(att.displayName)!firstLower(att.name)}"  class="form-control ${getRequiredClass(att.required)}" data-ng-model="${firstLower(entity.name)}Model.${firstLower(att.name)}" > </textarea>
								</div>					
								<#else>
								<div id="groupInput${firstUpper(att.name)}" class="form-group">
									<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)} ${att.required ? string('*','')} </label>
								<#if isNumeric(att.type.className)>
									<input type="text"  c3p-numeric c3p-numeric-options='{places:3}' id="input${firstUpper(att.name)}" placeholder="${(att.placeholder)!''}" data-ng-model="${firstLower(entity.name)}Model.${firstLower(att.name)}" class="form-control ${getRequiredClass(att.required)}">
		  						<#else>
									<input type="text" id="input${firstUpper(att.name)}" placeholder="${(att.placeholder)!''}" data-ng-model="${firstLower(entity.name)}Model.${firstLower(att.name)}" class="form-control ${getRequiredClass(att.required)}">
		  						</#if>
								</div>								
								</#if>
			  				  <#else>
								<div id="groupInput${firstUpper(att.name)}" class="form-group">
									<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)} ${att.required ? string('*','')} </label>
									<input type="text" id="input${firstUpper(att.name)}" placeholder="${(att.placeholder)!''}" data-ng-model="${firstLower(entity.name)}Model.${firstLower(att.name)}" class="form-control ${getRequiredClass(att.required)}">
								</div>
							  </#if>
							</#list>				
							<#if entity.relationships??>	
							<#list entity.relationships as rel>
								<#if (rel.type == 'OneToMany' || rel.type == 'ManyToMany' ) && rel.viewAproach.type == 'multiselect'>

								<#elseif rel.type == 'ManyToOne'>
									<#if rel.viewAproach?? >
										<#if rel.viewAproach.type  == 'combo'  >
								<div id="groupInput${firstUpper(rel.name)}" class="form-group">
									<label class="control-label" for="input${firstUpper(rel.name)}">${firstUpper(rel.displayName)!firstLower(rel.name)} </label>
									<select class="form-control" id="input${firstUpper(rel.name)}"  data-ng-model="${firstLower(entity.name)}Model.${firstLower(rel.name)}" ng-options="${firstLower(rel.name)} as ${firstLower(rel.name)}.${firstLower(rel.viewAproach.comboVal)} for ${firstLower(rel.name)} in ${firstLower(rel.name)}s"></select>
								</div>					
										<#elseif rel.viewAproach.type  == 'modal'  >					
								<div id="groupInput${firstUpper(rel.name)}Container" class="form-group">
									<label class="control-label" for="input${firstUpper(rel.name)}">${firstUpper(rel.displayName)!firstUpper(rel.name)} </label>
									<div id="groupInput${firstUpper(rel.name)}" class="input-group">
										<#if rel.viewAproach.hiddenField??>							
										<input id="input${firstUpper(rel.name)}${firstUpper(rel.viewAproach.hiddenField)}" type="text" class="form-control append-left" data-ng-model="${firstLower(entity.name)}Model.${firstLower(rel.name)}.${firstLower(rel.viewAproach.hiddenField)}" style="display: none;" />
										</#if>
										<#if rel.viewAproach.textField??>							
										<input id="input${firstUpper(rel.name)}${firstUpper(rel.viewAproach.textField)}" placeholder="Escolha um ${firstUpper(rel.displayName)}"  type="text" class="form-control append-left" data-ng-model="${firstLower(entity.name)}Model.${firstLower(rel.name)}.${firstLower(rel.viewAproach.textField)}" />
										</#if>
										<div class="input-group-addon append-right" id="search${firstUpper(rel.name)}Modal" data-toggle="modal">
											<span class="fa fa-search"></span>
										</div>
									</div>
								<div c3p-modal-${firstLower(rel.model)}='' c3p-modal-display='search${firstUpper(rel.name)}Modal' c3p-modal-id="${firstLower(rel.viewAproach.hiddenField)}"  c3p-modal-field-id="input${firstUpper(rel.name)}${firstUpper(rel.viewAproach.hiddenField)}" c3p-modal-field-value="input${firstUpper(rel.name)}${firstUpper(rel.viewAproach.textField)}" c3p-modal-value="${firstLower(rel.viewAproach.textField)}" c3p-modal-post-select="postSelect${firstUpper(rel.name)}"></div>
								</div>		
										</#if>
									</#if>
								</#if>
							</#list>
							</#if>										
								<div class="clearfix form-actions form-group mb15">
									<div class="col-md-9">
										<a id="saveBtn" class="save btn btn-primary">
											<i class="ace-icon save fa fa-check bigger-110"></i>
											Salvar
										</a>
										&nbsp; &nbsp;
										<a id="saveAndContinueBtn" class="saveAndContinue btn btn-primary" ng-show="!${firstLower(entity.name)}Model.id">
											<i class="ace-icon save fa fa-check bigger-110"></i>
											Salvar e Continuar
										</a>
										&nbsp; &nbsp;
										<a class="go-back-link btn btn-default" ng-click='backList()'>
											<i class="ace-icon fa fa-undo bigger-110"></i>
											Voltar para a listagem
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</form>
</div>
