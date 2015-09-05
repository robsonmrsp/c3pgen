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
			<div class="hr-24"></div>
			
			<div class="panel panel-default plain">
				<div class="">
					<div class="col-xs-12 col-sm-12">
			
				<form role="form" id="form${firstUpper(entity.name)}">
				<br>
				<input type="hidden" id="inputId" value="{{id}}">
				<#list entity.attributes as att>
				  <#if att.viewAproach?? >
					<#if att.type.className == 'Boolean' && att.viewAproach.type  == 'check'  >
					<div id="groupInput${firstUpper(att.name)}" class="form-group checkbox ">
						<label class="checkbox ">
							<input id="input${firstUpper(att.name)}" type="checkbox" {{${firstLower(att.name)} ? 'checked' :''}}>
							${firstUpper(att.displayName)}
						</label>
					</div>
					<#elseif att.viewAproach.type  == 'datepicker'  >
					<div id="groupInput${firstUpper(att.name)}Container" class="form-group">
						<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}</label>
						<div id="groupInput${firstUpper(att.name)}" class="input-group date" data-date-format="${att.dateFormat}">
							<input id="input${firstUpper(att.name)}" placeholder="Escolha ou digite uma data." type="text" class="form-control ${getRequiredClass(att.required)} append-left" value="{{${firstLower(att.name)}}}" />
							<div class="input-group-addon	append-right">
								<span class="fa fa-calendar"></span>
							</div>
						</div>
					</div>
					<#elseif att.viewAproach.type  == 'radiogroup'>
					<div id="groupInput${firstUpper(att.name)}" class="form-group">
						<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}</label>
						<#list att.viewAproach.values as val>	
						<div id="groupInput${firstUpper(att.name)}_${val}" class="radio">
							<label>
								<input type="radio" name="input${firstUpper(att.name)}" value="${val}" >
								${firstUpper(val)}
							</label>
						</div>
						</#list>
					</div>
					<#elseif att.viewAproach.type  == 'combo'  >
					<div id="groupInput${firstUpper(att.name)}" class="form-group">
						<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}</label>
						<select class="form-control" id="input${firstUpper(att.name)}"></select>
					</div>					
					<#else>
					<div id="groupInput${firstUpper(att.name)}" class="form-group">
						<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}</label>
						<input type="text" id="input${firstUpper(att.name)}" placeholder="${(att.placeholder)!''}" value="{{${firstLower(att.name)}}}" class="form-control ${getRequiredClass(att.required)}">
					</div>
					
					</#if>
  				  <#else>
					<div id="groupInput${firstUpper(att.name)}" class="form-group">
						<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}</label>
						<input type="text" id="input${firstUpper(att.name)}" placeholder="${(att.placeholder)!''}" value="{{${firstLower(att.name)}}}" class="form-control ${getRequiredClass(att.required)}">
					</div>
				  </#if>
				</#list>		
				<#if entity.relationships??>	
				<#list entity.relationships as rel>
					<#if (rel.type == 'OneToMany' || rel.type == 'ManyToMany' ) && rel.viewAproach.type == 'multiselect'>

					<div class="${firstLower(rel.name)}-container panel"></div>					
					<#elseif rel.type == 'ManyToOne'>
						<#if rel.viewAproach?? >
							<#if rel.viewAproach.type  == 'combo'  >
					<div id="groupInput${firstUpper(rel.name)}" class="form-group">
						<label class="control-label" for="input${firstUpper(rel.name)}">${firstUpper(rel.displayName)!firstLower(rel.name)}</label>
						<select class="form-control" id="input${firstUpper(rel.name)}"></select>
					</div>					
							<#elseif rel.viewAproach.type  == 'modal'  >					
					<div id="groupInput${firstUpper(rel.name)}Container" class="form-group">
						<label class="control-label" for="input${firstUpper(rel.name)}">${firstUpper(rel.displayName)!firstUpper(rel.name)}</label>
						<div id="groupInput${firstUpper(rel.name)}" class="input-group">
							<#if rel.viewAproach.hiddenField??>							
							<input id="input${firstUpper(rel.name)}${firstUpper(rel.viewAproach.hiddenField)}" type="hidden" class="form-control append-left" value="{{${firstLower(rel.name)} && ${firstLower(rel.name)}.${firstLower(rel.viewAproach.hiddenField)}}}" />
							</#if>
							<#if rel.viewAproach.textField??>							
							<input id="input${firstUpper(rel.name)}${firstUpper(rel.viewAproach.textField)}"  placeholder="Escolha um ${firstUpper(rel.displayName)}" type="text" class="form-control append-left" value="{{${firstLower(rel.name)} && ${firstLower(rel.name)}.${firstLower(rel.viewAproach.textField)}}}" />
							</#if>
							<div class="input-group-addon append-right" id="search${firstUpper(rel.name)}Modal" data-toggle="modal">
								<span class="fa fa-search"></span>
							</div>
						</div>
					</div>		
							</#if>
						</#if>
					</#if>
				</#list>
				</#if>
				</form>
				</div>
			</div>
			<div class="clearfix form-actions form-group mb15">
				<div class="col-md-9">
					<a href="javascript:void(0)" id="save"  class="save btn btn-primary">
						<i class="ace-icon save fa fa-check bigger-110"></i>
						Salvar
					</a>
					&nbsp;
					<a href="javascript:void(0)" class=" saveAndContinue  btn btn-info" style="display: {{ id ? 'none' : 'inline-block' }} ">
						<i class="ace-icon fa fa-check bigger-110"></i>
						Salvar e Continuar
					</a>
					&nbsp;

					<a class="go-back-link btn btn-default" href="#app/${firstLower(entity.name)}s">
						<i class="ace-icon fa fa-undo bigger-110"></i>
						Voltar para a listagem
					</a>
				</div>
			</div>
    	  </div>
		</div>
	</div>
</div>				
<#if entity.relationships??>	
<#list entity.relationships as rel >
	<#if rel.viewAproach.type == 'modal'>
<div id='${firstLower(rel.name)}Modal'></div>
	</#if>
</#list>
</#if>
