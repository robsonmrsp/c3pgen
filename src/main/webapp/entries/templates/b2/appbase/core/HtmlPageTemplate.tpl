<div>
	<h1>Pesquisa De ${firstUpper(entity.displayName)}</h1>
	<div id="messages"></div>
		<fieldset>
			<legend>Pesquisa</legend>
			<form role="form" id="form${firstUpper(entity.name)}Filter">
				<#list entity.attributes as att>
				<#if att.showInPages >
				  <#if att.viewApproach?? >
					<#if att.type.className == 'Boolean' && att.viewApproach.type  == 'check'  >
				<div id="groupInput${firstUpper(att.name)}" class="form-group checkbox">
					<label class="checkbox ">
						<input id="input${firstUpper(att.name)}" type="checkbox" >
						${firstUpper(att.displayName)}
					</label>
				</div>
					<#elseif att.viewApproach.type  == 'datepicker'  >
				<div id="groupInput${firstUpper(att.name)}Container" class="form-group input-append">
					<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}  </label>
					<div id="groupInput${firstUpper(att.name)}" class="input-group date" data-date-format="${att.dateFormat}">
						<input id="input${firstUpper(att.name)}" placeholder="Escolha ou digite uma data." type="text" class="form-control append-left"  />
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
					<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}</label>
					<select class="form-control" id="input${firstUpper(att.name)}"></select>
				</div>					
	  				<#else>
				<div id="groupInput${firstUpper(att.name)}" class="form-group">
					<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}</label>
					<input type="text" id="input${firstUpper(att.name)}" placeholder="Pesquise pelo ${firstUpper(att.displayName)}"  class="form-control">
				</div>
				  	</#if>							
	  			<#else>
				<div id="groupInput${firstUpper(att.name)}" class="form-group">
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
				<div id="groupInput${firstUpper(rel.name)}" class="form-group">
					<label class="control-label" for="input${firstUpper(rel.name)}">${firstUpper(rel.displayName)!firstLower(rel.name)}</label>
					<select class="form-control" id="input${firstUpper(rel.name)}"></select>
				</div>					
							<#elseif rel.viewApproach.type  == 'modal'  >					
				<div id="groupInput${firstUpper(rel.name)}Container" class="form-group input-append">
					<label class="control-label" for="input${firstUpper(rel.name)}">${firstUpper(rel.displayName)!firstUpper(rel.name)}</label>
					<div id="groupInput${firstUpper(rel.name)}" class="input-group">
						<#if rel.viewApproach.hiddenField??>							
						<input id="input${firstUpper(rel.name)}${firstUpper(rel.viewApproach.hiddenField)}" type="hidden" class="form-control append-left"  />
						</#if>
						<#if rel.viewApproach.textField??>							
						<input id="input${firstUpper(rel.name)}${firstUpper(rel.viewApproach.textField)}" placeholder="Pesquise pelo ${firstUpper(rel.displayName)}"  type="text" class="form-control append-left" />
						</#if>
						<span class="input-group-search	 add-on " id="search${firstUpper(rel.name)}Modal" data-toggle="modal">
							<span class="icon-white icon-search"></span>
						</span>
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

		</form>
	</fieldset>
				
	<div class="form-actions">
		<a href="javascript:void(0)" id="query" class="btn btn-primary btn-large">
			<i class="icon-search"></i>
			Pesquisar
		</a>
		<a href="#app/new${firstUpper(entity.name)}" class="btn btn-info btn-large">
			<i class="icon-plus"></i>
			Novo
		</a>
		<a href="javascript:void(0)" id="reset" class="btn btn-large">
		<i class="icon-refresh"></i>
		Limpar</a>
	</div>
	<div id="grid" class="dataTables_wrapper form-inline"></div>
	<div class="row-fluid">
		<div class="span6">
			<div id="counter" class="pagination pagination-left"></div>
		</div>
		<div class="span6">
			<div id="paginator" class="pagination pagination-right" style="margin-top: 0px"></div>
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
