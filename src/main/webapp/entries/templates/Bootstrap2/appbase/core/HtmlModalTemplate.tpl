<div class="form-group input-append ">
	<div>
		<input type="text" class="  inputCod span3" placeholder="código">
		<input type="text" readonly="readonly" class="inputDesc span9" />
		<span class="input-group-search-prep add-on show-modal-button" data-toggle="modal">
			<span class="icon-white icon-search search-icon-button "></span>
		</span>
	</div>
</div>


<!-- generated: ${.now} -->
<!-- Modal ${entity.name}´s form -->
<div class="modal container-modal fade" id="dialog${firstUpper(entity.name)}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>
				<h4 class="modal-title" id="myModalLabel">Pesquisa de ${entity.displayName}</h4>
			</div>
			<div class="modal-body">
				<form id="formSearch${firstUpper(entity.name)}">
						<#list entity.attributes as att>
						<#if att.showInPages >
						  <#if att.viewApproach?? >
							<#if att.type.className == 'Boolean' && att.viewApproach.type  == 'check'  >
							<div id="groupInputModal${firstUpper(att.name)}" class="form-group checkbox">
								<label class="checkbox ">
									<input id="inputModal${firstUpper(att.name)}" type="checkbox" >
									${firstUpper(att.displayName)}
								</label>
							</div>
							<#elseif att.viewApproach.type  == 'datepicker'  >
							<div id="groupInputModal${firstUpper(att.name)}Container" class="form-group input-append">
								<label class="control-label" for="inputModal${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}  </label>
								<div id="groupInputModal${firstUpper(att.name)}" class="input-group date" data-date-format="${att.dateFormat}">
									<input id="inputModal${firstUpper(att.name)}" type="text" class="form-control append-left" " />
									<span class="input-group-calendar	 add-on">
										<span class="icon-white icon-calendar"></span>
									</span>
								</div>
							</div>							
						
							<#elseif att.viewApproach.type  == 'radiogroup'>
							<div id="groupInputModal${firstUpper(att.name)}" class="form-group">
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
							<div id="groupInputModal${firstUpper(att.name)}" class="form-group">
								<label class="control-label" for="inputModal${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}</label>
								<select class="form-control" id="inputModal${firstUpper(att.name)}"></select>
							</div>					
						  <#else>
							<div id="groupInputModal${firstUpper(att.name)}" class="form-group">
								<label class="control-label" for="inputModal${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}</label>
								<input type="text" id="inputModal${firstUpper(att.name)}" placeholder="${(att.placeholder)!''}"  class="form-control">
							</div>
						  </#if>
							
		  				  <#else>
							<div id="groupInputModal${firstUpper(att.name)}" class="form-group">
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
							<div id="groupInputModal${firstUpper(rel.model)}" class="form-group">
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
					<div class="form-actions modal-spinner" >
						<a href="javascript:void(0)" id="btnSearch${firstUpper(entity.name)}" class="btn btn-primary btn-large" >
							<i class="fa fa-search"></i>
							Pesquisar
						</a>
						<a href="javascript:void(0)" id="btnClear${firstUpper(entity.name)}" class="btn btn-info btn-large">
							<i class="fa fa-trash"></i>
							Nova Pesquisa
						</a>
					</div>
						
					<div class="row-fluid">
						<div id="messages_div"></div>
						<div id="grid-${firstLower(entity.name)}" class="table-responsive"></div>
						<div class="row-fluid">
							<div class="span4">
								<div id="counter-${firstLower(entity.name)}" class="pagination pagination-left"></div>
							</div>
							<div class="span8">
								<div id="paginator-${firstLower(entity.name)}" class="pagination pagination-right" style="margin-top: 0px"></div>
							</div>
						</div>
					</div>
				</form>				
			</div>
		</div>
	</div>
</div>
