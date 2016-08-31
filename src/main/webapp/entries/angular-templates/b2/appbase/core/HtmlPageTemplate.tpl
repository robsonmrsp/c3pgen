<!-- generated: ${.now} -->
<!-- ${entity.name}´s page -->
<h1>${entity.displayName}</h1>
<div id="messages"></div>
<section class="panel">
	<div class="panel-body" style="overflow: hidden; display: block;">
		<div id="messages"></div>
		<div class="adv-table editable-table ">
			<div class="clearfix">
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
								<div id="groupInput${firstUpper(att.name)}Container" class="form-group">
									<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}</label>
									<div id="groupInput${firstUpper(att.name)}" class="input-group date" data-date-format="${att.dateFormat}">
										<input id="input${firstUpper(att.name)}" placeholder="Pesquise pela ${firstUpper(att.displayName)}" type="text" class="form-control append-left" />
										<div class="input-group-addon	append-right">
											<span class="fa fa-calendar"></span>
										</div>
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
										<div class="add-on " id="search${firstUpper(rel.name)}Modal" data-toggle="modal">
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
							<i class="icon-plus"></i>
						Limpar</a>
					</div>
				</div>
			</div>
			<div class="row">&nbsp;</div>
			<!-- DAQUI PRA BAIXO FALTA FAZER -->
			<div id="grid_consumo_alimentar" class="dataTables_wrapper form-inline"></div>
			<div class="row">
				<div id="paginator" class="pagination pagination-centered"></div>
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