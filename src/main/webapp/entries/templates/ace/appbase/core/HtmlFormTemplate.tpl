<!-- ${entity.name}´s form generated: ${.now}  -->
<div class="breadcrumbs" id="breadcrumbs">
	<ul class="breadcrumb">
		<li>
			<i class="ace-icon fa fa-home home-icon"></i>
			<a href="#">Home</a>
		</li>
		<li class="active">Formulário de cadastro de ${entity.displayName}</li>
	</ul>
</div>
<div class="col-sm-12 page-form ">
	<div id="messages_div"></div>				
	<div class="row">
		<div class="col-xs-12">
			<div class="widget-box transparent_  ">
				<div class="widget-header widget-header-flat">
					<h4 class="widget-title lighter">
						<i class="ace-icon fa fa-wpforms"></i>
						Formulário de cadastro de ${entity.displayName}
					</h4>
				</div>
				<div class="widget-body">
					<div class="widget-main">
						<form role="form" id="form${firstUpper(entity.name)}">
							<input type="hidden" id="inputId" value="{{id}}">
						<#list entity.attributes as att>
						  <#if att.viewApproach?? >
							<#if att.type.className == 'Boolean' && att.viewApproach.type  == 'check'  >
							<div id="groupInput${firstUpper(att.name)}" class="form-group col-sm-	col-md-	col-lg-   checkbox">
								<label class="checkbox ">
									<input id="input${firstUpper(att.name)}" type="checkbox" {{${firstLower(att.name)} ? 'checked' :''}}>
									${firstUpper(att.displayName)}
								</label>
							</div>
							<#elseif att.viewApproach.type  == 'datepicker'  >
							<div id="groupInput${firstUpper(att.name)}Container" class="form-group col-sm-	col-md-	col-lg-  ">
								<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}  ${att.required ? string('*','')}</label>
								<div id="groupInput${firstUpper(att.name)}" class="input-group date" data-date-format="${att.dateFormat}">
									<input id="input${firstUpper(att.name)}" placeholder="Escolha ou digite uma data." type="text" class="form-control ${getRequiredClass(att.required)} append-left" value="{{${firstLower(att.name)}}}"  data-date-format="${att.dateFormat}" />
									<div class="input-group-addon	append-right">
										<span class="fa fa-calendar"></span>
									</div>
								</div>
							</div>
							<#elseif att.viewApproach.type  == 'radiogroup'>
							<div id="groupInput${firstUpper(att.name)}" class="form-group col-sm-	col-md-	col-lg-  ">
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
							<div id="groupInput${firstUpper(att.name)}" class="form-group col-sm-	col-md-	col-lg-  ">
								<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}  ${att.required ? string('*','')}</label>
								<select class="form-control" id="input${firstUpper(att.name)}"></select>
							</div>					
							<#elseif att.viewApproach.type  == 'textarea'  >
							<div id="groupInput${firstUpper(att.name)}" class="form-group col-sm-	col-md-	col-lg-  ">
								<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}  ${att.required ? string('*','')}</label>
								<textarea rows="3" id="input${firstUpper(att.name)}" placeholder="${firstUpper(att.displayName)!firstLower(att.name)}" value="{{${att.name}}}"  class="form-control ${getRequiredClass(att.required)}" ${getMaxLen(att.maxLen)}>{{${att.name}}} </textarea>
							</div>					
							<#elseif att.viewApproach.type  == 'upload'  >
							<div id="groupInput${firstUpper(att.name)}" class="form-group col-sm-	col-md-	col-lg-  ">
								<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}  </label>
								<span class="${att.name}-container"> </span>
								<input type="text"  id="input${firstUpper(att.name)}" placeholder="${(att.placeholder)!''}" value="{{${firstLower(att.name)}}}" class="form-control ${getRequiredClass(att.required)} " ${getMaxLen(att.maxLen)} style="display : none">
							</div>
							<#else>
							<div id="groupInput${firstUpper(att.name)}" class="form-group col-sm-	col-md-	col-lg-  ">
								<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}  ${att.required ? string('*','')}</label>
								<input type="text"  id="input${firstUpper(att.name)}" placeholder="${(att.placeholder)!''}" value="{{${firstLower(att.name)}}}" class="form-control ${getRequiredClass(att.required)} " ${getMaxLen(att.maxLen)}>
							</div>	
							</#if>
		  				  <#else>
							<div id="groupInput${firstUpper(att.name)}" class="form-group col-sm-	col-md-	col-lg-  ">
								<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}  ${att.required ? string('*','')}</label>
								<input type="text" id="input${firstUpper(att.name)}" placeholder="${(att.placeholder)!''}" value="{{${firstLower(att.name)}}}" class="form-control ${getRequiredClass(att.required)} "  ${getMaxLen(att.maxLen)}>
							</div>
						  </#if>
						</#list>		
						<#if entity.relationships??>	
						<#list entity.relationships as rel>
							<#if (rel.type == 'OneToMany' || rel.type == 'ManyToMany' ) && rel.viewApproach.type == 'multiselectmodal'>
							<div id="${firstLower(rel.name)}MultiselectModal" class="${firstLower(rel.name)}-container panel"> </div>
							</#if>					
							<#if (rel.type == 'OneToMany' || rel.type == 'ManyToMany' ) && rel.viewApproach.type == 'multiselect'>

							<div id="groupInput${firstUpper(rel.name)}" class="form-group col-sm-	col-md-	col-lg-  ">
								<label class="control-label" for="input${firstUpper(rel.name)}">${firstUpper(rel.displayName)!firstLower(rel.name)}</label>
								<select class="form-control" id="input${firstUpper(rel.name)}" multiple data-placeholder="-- Selecione --" ></select>
							</div>					
					
							<#elseif rel.type == 'ManyToOne'>
								<#if rel.viewApproach?? >
									<#if rel.viewApproach.type  == 'combo'  >
							<div id="groupInput${firstUpper(rel.name)}" class="form-group col-sm-	col-md-	col-lg-  ">
								<label class="control-label" for="input${firstUpper(rel.name)}">${firstUpper(rel.displayName)!firstLower(rel.name)}</label>
								<select class="form-control" id="input${firstUpper(rel.name)}"></select>
							</div>					
									<#elseif rel.viewApproach.type  == 'modal'  >					
							<div id="groupInput${firstUpper(rel.name)}Container" class="form-group col-sm-	col-md-	col-lg-  ">
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
			<div class="">
				<div class="clearfix form-actions">
					<button type="button" id="save"  class="save btn btn-primary auth[save-${firstLower(entity.name)}, disable] button-saving" data-loading-text="<i class='fa fa-spinner fa-spin '></i> Salvando...">
						<i class="ace-icon save fa fa-check bigger-110"></i>
						Salvar
					</button>
					&nbsp; &nbsp; &nbsp;
					<button type="button" class="save-continue btn btn-info auth[save-continue-${firstLower(entity.name)}, disable] button-saving" data-loading-text="<i class='fa fa-spinner fa-spin '></i> Salvando..."  style="display: {{ id ? 'none' : 'inline-block' }} ">
						<i class="ace-icon fa fa-check bigger-110"></i>
						Salvar e Continuar
					</button>
					&nbsp; &nbsp; &nbsp;
					<a  class="go-back-link btn btn-light" href="#app/${firstLower(entity.name)}s">
						<i class="ace-icon fa fa-undo bigger-110"></i>
						Voltar para a listagem
					</a>
				</div>
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
