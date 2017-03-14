<!-- ${entity.name}´s multiselect generated: ${.now}  -->
<div class="panel panel-default plain toggle ">
	<div class="panel-heading">
		<span class="panel-title">
			<span class="pull-left"> ${entity.displayName}s &nbsp;&nbsp;&nbsp;</span>
		</span>
		<span>
			<a href="#modalMultiselect${firstUpper(entity.name)}" class="btn btn-info btn-xs" data-toggle="modal">
				<i class="fa  fa-plus-square">&nbsp;&nbsp;Add/Remove ${entity.displayName}</i>
			</a>
		</span>
		<div class="panel-controls panel-controls-hide" style="display: none;">
			<a href="javascript:void(-1)" class="toggle panel-minimize">
				<i class="im-minus"></i>
			</a>
		</div>
	</div>
	<div class="panel-body" style="border: none">
		<div >
			<div class="center">
				<div  class="datatable-principal "></div>
			</div>
		</div>
	</div>
</div>
<div>
	<div class="modal fade" id="modalMultiselect${firstUpper(entity.name)}" tabindex="-1" role="dialog" aria-labelledby="modal${firstUpper(entity.name)}s" aria-hidden="true" style="display: none;">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title" id="myModalLabel">${entity.displayName}</h4>
				</div>
				<div class="modal-body">
				<form id="formSearch${firstUpper(entity.name)}">
						<#list entity.attributes as att>
						<#if att.showInPages && !att.basicSearch && att.type.className != 'Boolean' && att.viewApproach.type  != 'upload' && att.viewApproach.type  != 'multiselect'>
						  <#if att.viewApproach?? >
							<#if att.type.className == 'Boolean' && att.viewApproach.type  == 'check'  >
							<div id="groupInputModal${firstUpper(att.name)}" class=" groupInputModal${firstUpper(att.name)} form-group col-sm-	col-md-	col-lg-   checkbox">
								<label class="checkbox ">
									<input id="inputModal${firstUpper(att.name)}" type="checkbox" class="inputModal${firstUpper(att.name)}">
									${firstUpper(att.displayName)}
								</label>
							</div>
							<#elseif att.viewApproach.type  == 'datepicker'  >
							<div id="groupInputModal${firstUpper(att.name)}Container" class=" groupInputModal${firstUpper(att.name)} form-group col-sm-	col-md-	col-lg-  ">
								<label class="control-label" for="inputModal${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}</label>
								<div id="groupInputModal${firstUpper(att.name)}" class="input-group date" data-date-format="${att.dateFormat}">
									<input id="inputModal${firstUpper(att.name)}" type="text" class="form-control append-left inputModal${firstUpper(att.name)}"  />
									<div class="input-group-addon	append-right">
										<span class="fa fa-calendar"></span>
									</div>
								</div>
							</div>
							<#elseif att.viewApproach.type  == 'radiogroup'>
							<div id="groupInputModal${firstUpper(att.name)}" class=" groupInputModal${firstUpper(att.name)} form-group col-sm-	col-md-	col-lg-  ">
								<label class="control-label" for="inputModal${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}</label>
								<#list att.viewApproach.values as val>	
								<div id="groupInputModal${firstUpper(att.name)}_${val}" class="radio">
									<label>
										<input type="radio" name="inputModal${firstUpper(att.name)}" value="${val}" class="inputModal${firstUpper(att.name)}">
										${firstUpper(val)}
									</label>
								</div>
								</#list>
							</div>
							<#elseif att.viewApproach.type  == 'combo'  >
							<div id="groupInputModal${firstUpper(att.name)}" class="groupInputModal${firstUpper(att.name)} form-group col-sm-	col-md-	col-lg-  ">
								<label class="control-label" for="inputModal${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}</label>
								<select class="form-control inputModal${firstUpper(att.name)}" id="inputModal${firstUpper(att.name)}" ></select>
							</div>					
						  <#else>
							<div id="groupInputModal${firstUpper(att.name)}" class="form-group col-sm-	col-md-	col-lg-  ">
								<label class="control-label" for="inputModal${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}</label>
								<input type="text" id="inputModal${firstUpper(att.name)}" placeholder="${(att.placeholder)!''}"  class="form-control inputModal${firstUpper(att.name)}">
							</div>
						  </#if>
							
		  				  <#else>
							<div id="groupInputModal${firstUpper(att.name)}" class="form-group col-sm-	col-md-	col-lg-  ">
								<label class="control-label" for="inputModal${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}</label>
								<input type="text" id="inputModal${firstUpper(att.name)}" placeholder="${(att.placeholder)!''}"  class="form-control inputModal${firstUpper(att.name)}">
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
							<div id="groupInputModal${firstUpper(rel.model)}" class="groupInputModal${firstUpper(rel.model)} form-group col-sm-	col-md-	col-lg-  ">
								<label class="control-label" for="inputModal${firstUpper(rel.model)}">${firstUpper(rel.displayName)!firstLower(rel.model)}</label>
								<select class="form-control inputModal${firstUpper(rel.name)}" id="inputModal${firstUpper(rel.model)}"></select>
							</div>					
									</#if>
								</#if>
							<#elseif rel.type == 'ManyToMany'>
							<#elseif rel.type == 'OneToOne'>
							</#if>
							</#if>
						</#list>
						</#if>
					<div class="form-actions spinner" id="spin${firstUpper(entity.name)}">
						<button type="button"  class="btn-search btn btn-primary btn-large button-loading" data-loading-text="<i class='fa fa-spinner fa-spin '></i> Pesquisando...">
							<i class="fa fa-search"></i>
							Pesquisar
						</button>
						<button type="button" class="btn-reset btn btn-info btn-large" >
							<i class="fa fa-trash"></i>
							Limpar
						</button>
					</div>
					
				<div class="row">
				<div class="col-xs-12">
					<h3 class="header smaller lighter blue">Resultados</h3>
					<div class="center">
						<div  class="datatable-modal "></div>
					</div>
				</div>
				</div>
				</form>				
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" data-dismiss="modal">Pronto</button>
				</div>
			</div>
		</div>
	</div>
</div>