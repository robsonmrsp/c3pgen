<!-- generated: ${.now} -->
<!-- Modal ${entity.name}´s form -->
<div class="modal fade" id="dialog${firstUpper(entity.name)}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span>
					<span class="sr-only">Close</span>
				</button>
				<h4 class="modal-title" id="myModalLabel">Pesquisa de ${entity.displayName}</h4>
			</div>
			<div class="modal-body">
				<form id="formSearch${firstUpper(entity.name)}">
						<#list entity.attributes as att>
						<#if att.showInPages >
						  <#if att.viewApproach?? >
							<#if att.type.className == 'Boolean' && att.viewApproach.type  == 'check'  >
							<div id="groupInputModal${firstUpper(att.name)}" class="form-group col-sm-	col-md-	col-lg-   checkbox">
								<label class="checkbox ">
									<input id="inputModal${firstUpper(att.name)}" type="checkbox" >
									${firstUpper(att.displayName)}
								</label>
							</div>
							<#elseif att.viewApproach.type  == 'datepicker'  >
							<div id="groupInputModal${firstUpper(att.name)}Container" class="form-group col-sm-	col-md-	col-lg-  ">
								<label class="control-label" for="inputModal${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}</label>
								<div id="groupInputModal${firstUpper(att.name)}" class="input-group date" data-date-format="${att.dateFormat}">
									<input id="inputModal${firstUpper(att.name)}" type="text" class="form-control append-left"  />
									<div class="input-group-addon	append-right">
										<span class="fa fa-calendar"></span>
									</div>
								</div>
							</div>
							<#elseif att.viewApproach.type  == 'radiogroup'>
							<div id="groupInputModal${firstUpper(att.name)}" class="form-group col-sm-	col-md-	col-lg-  ">
								<label class="control-label" for="inputModal${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}</label>
								<#list att.viewApproach.values as val>	
								<div id="groupInputModal${firstUpper(att.name)}_${val}" class="radio">
									<label>
										<input type="radio" name="inputModal${firstUpper(att.name)}" value="${val}" >
										${firstUpper(val)}
									</label>
								</div>
								</#list>
							</div>
							<#elseif att.viewApproach.type  == 'combo'  >
							<div id="groupInputModal${firstUpper(att.name)}" class="form-group col-sm-	col-md-	col-lg-  ">
								<label class="control-label" for="inputModal${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}</label>
								<select class="form-control" id="inputModal${firstUpper(att.name)}"></select>
							</div>					
						  <#else>
							<div id="groupInputModal${firstUpper(att.name)}" class="form-group col-sm-	col-md-	col-lg-  ">
								<label class="control-label" for="inputModal${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}</label>
								<input type="text" id="inputModal${firstUpper(att.name)}" placeholder="${(att.placeholder)!''}"  class="form-control">
							</div>
						  </#if>
							
		  				  <#else>
							<div id="groupInputModal${firstUpper(att.name)}" class="form-group col-sm-	col-md-	col-lg-  ">
								<label class="control-label" for="inputModal${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}</label>
								<input type="text" id="inputModal${firstUpper(att.name)}" placeholder="${(att.placeholder)!''}"  class="form-control">
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
							<div id="groupInputModal${firstUpper(rel.model)}" class="form-group col-sm-	col-md-	col-lg-  ">
								<label class="control-label" for="inputModal${firstUpper(rel.model)}">${firstUpper(rel.displayName)!firstLower(rel.model)}</label>
								<select class="form-control" id="inputModal${firstUpper(rel.model)}"></select>
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
						<a href="javascript:void(0)" id="btnSearch${firstUpper(entity.name)}" class="btn btn-primary btn-large" >
							<i class="fa fa-search"></i>
							Pesquisar
						</a>
						<a href="javascript:void(0)" id="btnClear${firstUpper(entity.name)}" class="btn btn-info btn-large">
							<i class="fa fa-trash"></i>
							Nova Pesquisa
						</a>
					</div>
					
				<div class="row">
				<div class="col-xs-12">
					<h3 class="header smaller lighter blue">Resultados</h3>
					<div class="divTableResults" id="resultado${firstUpper(entity.name)}Div" >
						<div id="sample-table-2_wrapper" class="dataTables_wrapper form-inline no-footer">
							<div id="messages_div"></div>
							<div id="grid-${firstLower(entity.name)}" class="table-responsive"></div>
							<div class="">
								<div id="counter-${firstLower(entity.name)}" class=" pull-left"></div>
								<div id="paginator-${firstLower(entity.name)}" class="pull-right"></div>
							</div>
						</div>
					</div>
				</div>
				</div>
				</form>				
			</div>
		</div>
	</div>
</div>

