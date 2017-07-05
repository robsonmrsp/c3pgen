<!-- ${entity.name}´s page generated: ${.now}  -->
<div class="panel">
	<div class="panel-heading">
		<h3 class="panel-title">
			<i class="fa fa-search"></i>
			Pesquisa de ${firstUpper(entity.name)}.
		</h3>
	</div>
	<div class="panel-body">
		<div id="messages_div"></div>
		<form id="form${firstUpper(entity.name)}Filter">
			<div class="widget-main  ">
				<div class="row">
					<div class="col-xs-6">
						<a href="#app/new${firstUpper(entity.name)}" class="btn btn-info">
							<i class="fa fa-plus-circle"></i>
							Novo Registro
						</a>
						&nbsp; 
						<a href="javascript:void(0)"  class="btn btn-default reset-button" >Limpar</a>
					</div>
					<div class="col-sm-6">
						<#list entity.basicSearches as basicAttr>
						<div class="input-group">
							<input id="input${firstUpper(basicAttr.name)}" type="text" class="clearable form-control search-query" placeholder="Pesquisar ${entity.displayName} por ${firstUpper(basicAttr.displayName)}">
							<span id="query" class="input-group-btn ">
								<button type="button" class="btn btn-default search-button loading-button"  data-loading-text="<i class='fa fa-spinner fa-spin '></i> Pesquisando...">
									<span class="fa fa-search icon-on-right  "></span>
									Pesquisar
								</button>
							</span>
						</div>
						</#list>		
						<#if entity.completeSearch>
						<div>
							<a href="javascript:void(-1)" class="show-advanced-search-button"> Pesquisa avançada... </a>
						</div>
						</#if>
					</div>
				</div>
					<#if entity.completeSearch>
				<div class="panel advanced-search-form">
					<div class="panel-heading">
						<h5 class="panel-title">Filtros avançados</h5>
					</div>
					<div class="panel-body">
						<!-- inicio dos registros-->							
						<#list entity.advancedSearches as att>
						<#if att.showInPages && !att.basicSearch && att.type.className != 'Boolean' && att.viewApproach.type  != 'upload' && att.viewApproach.type  != 'multiselect'>
						  <#if att.viewApproach?? >
							<#if att.type.className == 'Boolean' && att.viewApproach.type  == 'check'  >
							<!--
						<div id="groupInput${firstUpper(att.name)}" class="form-group col-sm- col-md- col-lg- checkbox">
							<label class="checkbox ">
								<input id="input${firstUpper(att.name)}" type="checkbox" >
								${firstUpper(att.displayName)}
							</label>
						</div>
							-->
							<#elseif att.viewApproach.type  == 'datepicker'  >
						<div id="groupInput${firstUpper(att.name)}Container" class="form-group   ">
							<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}</label>
							<div id="groupInput${firstUpper(att.name)}" class="input-group date" data-date-format="${att.dateFormat}">
								<input id="input${firstUpper(att.name)}" placeholder="Pesquise pela ${firstUpper(att.displayName)}" type="text" class="form-control append-left" />
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
							<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}</label>
							<select class="form-control" id="input${firstUpper(att.name)}"></select>
						</div>					
			  				<#else>
						<div id="groupInput${firstUpper(att.name)}" class="form-group   ">
							<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}</label>
							<input type="text" id="input${firstUpper(att.name)}" placeholder="Pesquise pelo ${firstUpper(att.displayName)}"  class="form-control">
						</div>
						  	</#if>							
			  			<#else>
						<div id="groupInput${firstUpper(att.name)}" class="form-group   ">
							<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}</label>
							<input type="text" id="input${firstUpper(att.name)}" placeholder="Pesquise pelo ${firstUpper(att.displayName)}"  class="form-control">
						</div>
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
						<div id="groupInput${firstUpper(rel.name)}" class="form-group   ">
							<label class="control-label" for="input${firstUpper(rel.name)}">${firstUpper(rel.displayName)!firstLower(rel.name)}</label>
							<select class="form-control" id="input${firstUpper(rel.name)}"></select>
						</div>					
									<#elseif rel.viewApproach.type  == 'modal'  >					
						<div id="groupInput${firstUpper(rel.name)}Container" class="form-group   ">
							<label class="control-label" for="input${firstUpper(rel.name)}">${firstUpper(rel.displayName)!firstUpper(rel.name)}</label>
							<div id="groupInput${firstUpper(rel.name)}" class="input-group">
								<#if rel.viewApproach.hiddenField??>							
								<input id="input${firstUpper(rel.name)}${firstUpper(rel.viewApproach.hiddenField)}" type="hidden" class="form-control append-left"  />
								</#if>
								<#if rel.viewApproach.textField??>							
								<input id="input${firstUpper(rel.name)}${firstUpper(rel.viewApproach.textField)}" placeholder="Pesquise pelo ${firstUpper(rel.displayName)}"  type="text" class="form-control append-left" />
								</#if>
								<div class="input-group-addon append-right search-${firstLower(rel.name)}-modal" data-toggle="modal">
									<span class="fa fa-search"></span>
								</div>
							</div>
						</div>		
									</#if>
								</#if>
							<#elseif rel.type == 'ManyToMany'>
							<#elseif rel.type == 'OneToOne'>
							</#if>
							</#if>
						</#list>
						</#if>
						<div>
							<button type="button" class="btn btn-info btn-sm search-button loading-button" data-loading-text="<i class='fa fa-spinner fa-spin '></i> Pesquisando...">
								<i class="fa fa-search"></i>
								Pesquisar
							</button>
						</div>
					</div>
				</div>
			</div>
							</#if>
		</form>
		<div class="center">
			<div class="datatable-${firstLower(entity.name)}"></div>
		</div>
	</div>
</div>
<#if entity.relationships??>	
	<#list entity.relationships as rel >
		<#if rel.viewApproach.type??>
			<#if rel.viewApproach.type == 'modal'>
				<div id='${firstLower(rel.name)}Modal'></div>
			</#if>
		</#if>
	</#list>
</#if>