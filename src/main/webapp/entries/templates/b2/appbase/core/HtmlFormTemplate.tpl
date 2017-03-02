<div>
	<h1>Cadastro De ${firstUpper(entity.displayName)}</h1>
	<div id="messages"></div>
		<fieldset>
			<legend></legend>
			<form role="form" id="form${firstUpper(entity.name)}">
			<input type="hidden" id="inputId" value="{{id}}">
			<#list entity.attributes as att>
			  <#if att.viewApproach?? >
				<#if att.type.className == 'Boolean' && att.viewApproach.type  == 'check'  >
				<div id="groupInput${firstUpper(att.name)}" class="form-group checkbox">
					<label class="checkbox ">
						<input id="input${firstUpper(att.name)}" type="checkbox" {{${firstLower(att.name)} ? 'checked' :''}}>
						${firstUpper(att.displayName)}
					</label>
				</div>
				<#elseif att.viewApproach.type  == 'datepicker'  >
				<div id="groupInput${firstUpper(att.name)}Container" class="form-group input-append">
					<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}  ${att.required ? string('*','')}</label>
					<div id="groupInput${firstUpper(att.name)}" class="input-group date" data-date-format="${att.dateFormat}">
						<input id="input${firstUpper(att.name)}" placeholder="Escolha ou digite uma data." type="text" class="form-control ${getRequiredClass(att.required)} append-left" value="{{${firstLower(att.name)}}}" />
						<span class="input-group-calendar	 add-on">
							<span class="icon-white icon-calendar"></span>
						</span>
					</div>
				</div>
				<#elseif att.viewApproach.type  == 'radiogroup'>
				<div id="groupInput${firstUpper(att.name)}" class="form-group">
					<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}</label>
					<#list att.viewApproach.values as val>	
					<div id="groupInput${firstUpper(att.name)}_${val}" class="radio">
						<label>
							<input type="radio" name="input${firstUpper(att.name)}" value="${val}" >
							${firstUpper(val)}
						</label>
					</div>
					</#list>
				</div>
				<#elseif att.viewApproach.type  == 'combo'  >
				<div id="groupInput${firstUpper(att.name)}" class="form-group">
					<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}  ${att.required ? string('*','')}</label>
					<select class="form-control" id="input${firstUpper(att.name)}"></select>
				</div>					
				<#elseif att.viewApproach.type  == 'textarea'  >
				<div id="groupInput${firstUpper(att.name)}" class="form-group">
					<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}  ${att.required ? string('*','')}</label>
					<textarea rows="3" id="input${firstUpper(att.name)}" placeholder="${firstUpper(att.displayName)!firstLower(att.name)}" value="{{${att.name}}}"  class="form-control ${getRequiredClass(att.required)}">{{${att.name}}} </textarea>
				</div>					
				<#else>
				<div id="groupInput${firstUpper(att.name)}" class="form-group">
					<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}  ${att.required ? string('*','')}</label>
					<input type="text" id="input${firstUpper(att.name)}" placeholder="${(att.placeholder)!''}" value="{{${firstLower(att.name)}}}" class="form-control ${getRequiredClass(att.required)}">
				</div>
				</#if>
			  <#else>
				<div id="groupInput${firstUpper(att.name)}" class="form-group">
					<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}  ${att.required ? string('*','')}</label>
					<input type="text" id="input${firstUpper(att.name)}" placeholder="${(att.placeholder)!''}" value="{{${firstLower(att.name)}}}" class="form-control ${getRequiredClass(att.required)}">
				</div>
			  </#if>
			</#list>		
			<#if entity.relationships??>	
			<#list entity.relationships as rel>
				<#if (rel.type == 'OneToMany' || rel.type == 'ManyToMany' ) && rel.viewApproach.type == 'multiselect'>
				<div class="${firstLower(rel.name)}-container panel"></div>					
				<#elseif rel.type == 'ManyToOne'>
					<#if rel.viewApproach?? >
						<#if rel.viewApproach.type  == 'combo'  >
				<div id="groupInput${firstUpper(rel.name)}" class="form-group">
					<label class="control-label" for="input${firstUpper(rel.name)}">${firstUpper(rel.displayName)!firstLower(rel.name)}</label>
					<select class="form-control" id="input${firstUpper(rel.name)}"></select>
				</div>					
						<#elseif rel.viewApproach.type  == 'modal'  >					
				<div id="groupInput${firstUpper(rel.name)}Container" class="form-group input-append">
					<label class="control-label" for="input${firstUpper(rel.name)}">${firstUpper(rel.displayName)!firstUpper(rel.name)}</label>
					<div id="groupInput${firstUpper(rel.name)}" class="input-group">
						<#if rel.viewApproach.hiddenField??>							
						<input id="input${firstUpper(rel.name)}${firstUpper(rel.viewApproach.hiddenField)}" type="hidden" class="form-control append-left" value="{{${firstLower(rel.name)} && ${firstLower(rel.name)}.${firstLower(rel.viewApproach.hiddenField)}}}" />
						</#if>
						<#if rel.viewApproach.textField??>							
						<input id="input${firstUpper(rel.name)}${firstUpper(rel.viewApproach.textField)}" placeholder="Escolha um ${firstUpper(rel.displayName)}"  type="text" class="form-control append-left" value="{{${firstLower(rel.name)} && ${firstLower(rel.name)}.${firstLower(rel.viewApproach.textField)}}}" />
						</#if>
						<span class="input-group-search	 add-on" id="search${firstUpper(rel.name)}Modal" data-toggle="modal">
							<span class="icon-white icon-search"></span>
						</span>
					</div>
				</div>		
						</#if>
					</#if>
				</#if>
			</#list>
			</#if>
			</form>
		</fieldset>
		
		
		<div class="clearfix form-actions">
			<a href="javascript:void(0)" id="save"  class="save btn btn-primary btn-large ">
				<i class="ace-icon save fa fa-check bigger-110"></i>
				Salvar
			</a>
			&nbsp;
			<a href="javascript:void(0)" class=" saveAndContinue  btn-large btn btn-info" style="display: {{ id ? 'none' : 'inline-block' }} ">
				<i class="ace-icon fa fa-check bigger-110"></i>
				Salvar e Continuar
			</a>
			<a class="go-back-link btn-large btn-light" href="#app/${firstLower(entity.name)}s">
				<i class="ace-icon fa fa-undo bigger-110"></i>
				Voltar para a listagem
			</a>
		</div>
	</div>
</div>
<#if entity.relationships??>	
<#list entity.relationships as rel >
	<#if rel.viewApproach.type == 'modal'>
<div id='${firstLower(rel.name)}Modal'></div>
	</#if>
</#list>
</#if>
