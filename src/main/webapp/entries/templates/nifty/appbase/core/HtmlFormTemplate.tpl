<!-- ${entity.name}´s form generated: ${.now}  -->
<div class="panel">
	<!--Panel heading-->
	<div class="panel-heading">
		<h3 class="panel-title">Cadastro de ${firstUpper(entity.displayName)}</h3>
	</div>
	<!--Panel body-->
	<div class="panel-body">
		<div class="panel">
			<div class="panel-body">
				<div id="messages_div"></div>
				<form role="form" id="form${firstUpper(entity.name)}">
					<input type="hidden" id="inputId" value="{{id}}">
				<#list entity.attributes as att>
				  <#if att.viewApproach?? >
					<#if att.type.className == 'Boolean' && att.viewApproach.type  == 'check'  >
					<div id="groupInput${firstUpper(att.name)}" class="form-group    checkbox">
						<label class="checkbox ">
							<input id="input${firstUpper(att.name)}" type="checkbox" {{${firstLower(att.name)} ? 'checked' :''}}>
							${firstUpper(att.displayName)}
						</label>
					</div>
					<#elseif att.viewApproach.type  == 'datepicker'  >
					<div id="groupInput${firstUpper(att.name)}Container" class="form-group   ">
						<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}  ${att.required ? string('*','')}</label>
						<div id="groupInput${firstUpper(att.name)}" class="input-group date" data-date-format="${att.dateFormat}">
							<input id="input${firstUpper(att.name)}" placeholder="Escolha ou digite uma data." type="text" ${getRequiredClass(att.required)} class="form-control append-left" value="{{${firstLower(att.name)}}}"  data-date-format="${att.dateFormat}" />
							<div class="input-group-addon	append-right">
								<span class="fa fa-calendar"></span>
							</div>
						</div>
					</div>
					<#elseif att.viewApproach.type  == 'radiogroup'>
					<div id="groupInput${firstUpper(att.name)}" class="form-group   ">
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
					<div id="groupInput${firstUpper(att.name)}" class="form-group   ">
						<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}  ${att.required ? string('*','')}</label>
						<select class="form-control" id="input${firstUpper(att.name)}"></select>
					</div>					
					<#elseif att.viewApproach.type  == 'textarea'  >
					<div id="groupInput${firstUpper(att.name)}" class="form-group   ">
						<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}  ${att.required ? string('*','')}</label>
						<textarea rows="3" id="input${firstUpper(att.name)}" placeholder="${firstUpper(att.displayName)!firstLower(att.name)}" ${getRequiredClass(att.required)} value="{{${att.name}}}"  class="form-control " ${getMaxLen(att.maxLen)}>{{${att.name}}} </textarea>
					</div>					
					<#elseif att.viewApproach.type  == 'upload'  >
					<div id="groupInput${firstUpper(att.name)}" class="form-group   ">
						<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}  </label>
						<span class="${att.name}-container"> </span>
						<input type="text"  id="input${firstUpper(att.name)}" placeholder="${(att.placeholder)!''}" value="{{${firstLower(att.name)}}}" ${getRequiredClass(att.required)} class="form-control " ${getMaxLen(att.maxLen)} style="display : none">
					</div>
					<#else>
					<div id="groupInput${firstUpper(att.name)}" class="form-group   ">
						<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}  ${att.required ? string('*','')}</label>
						<input type="text"  id="input${firstUpper(att.name)}" placeholder="${(att.placeholder)!''}" ${getRequiredClass(att.required)} value="{{${firstLower(att.name)}}}" class="form-control  " ${getMaxLen(att.maxLen)}>
					</div>	
					</#if>
  				  <#else>
					<div id="groupInput${firstUpper(att.name)}" class="form-group   ">
						<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}  ${att.required ? string('*','')}</label>
						<input type="text" id="input${firstUpper(att.name)}" placeholder="${(att.placeholder)!''}" value="{{${firstLower(att.name)}}}" ${getRequiredClass(att.required)} class="form-control  "  ${getMaxLen(att.maxLen)}>
					</div>
				  </#if>
				</#list>		
				<#if entity.relationships??>	
				<#list entity.relationships as rel>
					<#if (rel.type == 'OneToMany' || rel.type == 'ManyToMany' ) && rel.viewApproach.type == 'multiselectmodal'>
					<div id="${firstLower(rel.name)}MultiselectModal" class="${firstLower(rel.name)}-container panel"> </div>
					</#if>					
					<#if (rel.type == 'OneToMany' || rel.type == 'ManyToMany' ) && rel.viewApproach.type == 'multiselect'>

					<div id="groupInput${firstUpper(rel.name)}" class="form-group   ">
						<label class="control-label" for="input${firstUpper(rel.name)}">${firstUpper(rel.displayName)!firstLower(rel.name)}</label>
						<select class="form-control" id="input${firstUpper(rel.name)}" multiple data-placeholder="-- Selecione --" ></select>
					</div>					
			
					<#elseif rel.type == 'ManyToOne'>
						<#if rel.viewApproach?? >
							<#if rel.viewApproach.type  == 'combo'  >
					<div id="groupInput${firstUpper(rel.name)}" class="form-group   ">
						<label class="control-label" for="input${firstUpper(rel.name)}">${firstUpper(rel.displayName)!firstLower(rel.name)}</label>
						<select class="form-control" id="input${firstUpper(rel.name)}"></select>
					</div>					
							<#elseif rel.viewApproach.type  == 'modal'  >					
					<div id="groupInput${firstUpper(rel.name)}Container" class="form-group   ">
						<label class="control-label" for="input${firstUpper(rel.name)}">${firstUpper(rel.displayName)!firstUpper(rel.name)}</label>
						<div id="groupInput${firstUpper(rel.name)}" class="input-group">
							<#if rel.viewApproach.hiddenField??>							
							<input id="input${firstUpper(rel.name)}${firstUpper(rel.viewApproach.hiddenField)}" type="hidden" class="form-control append-left" value="{{${firstLower(rel.name)} && ${firstLower(rel.name)}.${firstLower(rel.viewApproach.hiddenField)}}}" />
							</#if>
							<#if rel.viewApproach.textField??>							
							<input id="input${firstUpper(rel.name)}${firstUpper(rel.viewApproach.textField)}" placeholder="Escolha um ${firstUpper(rel.displayName)}"  type="text" class="form-control append-left" value="{{${firstLower(rel.name)} && ${firstLower(rel.name)}.${firstLower(rel.viewApproach.textField)}}}" />
							</#if>
							<div class="input-group-addon append-right search-${firstLower(rel.name)}-modal"  data-toggle="modal">
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
		<div >
			<div class="clearfix form-actions">
				<a href="javascript:void(-1)" id="save"  class="save btn btn-primary  button-saving" data-loading-text="<i class='fa fa-spinner fa-spin '></i> Salvando...">
					<i class="save fa fa-check "></i>
					Salvar
				</a>
				&nbsp; &nbsp; 
				<a href="javascript:void(-1)" class="save-continue btn btn-info  button-saving" data-loading-text="<i class='fa fa-spinner fa-spin '></i> Salvando..."  style="display: {{ id ? 'none' : 'inline-block' }} ">
					<i class="fa fa-check "></i>
					Salvar e Continuar
				</a>
				&nbsp; &nbsp; 
				<a href="#app/${firstLower(entity.name)}s" class="go-back-link btn btn-light" >
					<i class=" fa fa-undo "></i>
					Voltar para a listagem
				</a>
			</div>
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