<div class="modal fade" id="dialog${firstUpper(entity.displayName)}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span>
					<span class="sr-only">Close</span>
				</button>
				<h4 class="modal-title" id="myModalLabel">Pesquisa de ${firstUpper(entity.displayName)}</h4>
			</div>
			<div class="modal-body">
			<div class="panel panel-default plain profile-widget" >
				<div class="panel-body">
				<#list entity.attributes as att>
				  <#if att.viewAproach?? >
					<#if att.type.className == 'Boolean' && att.viewAproach.type  == 'check'  >
					<div id="groupInput${firstUpper(att.name)}" class="form-group checkbox">
						<label class="checkbox ">
							<input id="input${firstUpper(att.name)}" type="checkbox" data-ng-model='${firstLower(entity.name)}Parameters.${firstLower(att.name)}' />
							${firstUpper(att.displayName)}
						</label>
					</div>
					<#elseif att.viewAproach.type  == 'datepicker'  >
					<div id="groupInput${firstUpper(att.name)}Container" class="form-group">
						<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}</label>
						<div id="groupInput${firstUpper(att.name)}" class="input-group date" data-date-format="${att.dateFormat}"  c3p-date-picker c3p-date-picker-options="{pickTime :false}" >
							<input id="input${firstUpper(att.name)}" placeholder="Escolha ou digite uma data." type="text" class="form-control  append-left" c3p-date-picker c3p-date-picker-options="{pickTime : false}"  data-ng-model="${firstLower(entity.name)}Parameters.${firstLower(att.name)}" />
							<div class="input-group-addon	append-right">
								<span class="fa fa-calendar"></span>
							</div>
						</div>
					</div>
					<#elseif att.viewAproach.type  == 'combo'  >
					<div id="groupInput${firstUpper(att.name)}" class="form-group">
						<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}</label>
						<select class="form-control" data-ng-model="${firstLower(entity.name)}Parameters.${firstLower(att.name)}" ng-options="${firstLower(att.name)} as ${firstLower(att.name)}.${firstLower(rel.viewAproach.comboVal)} for ${firstLower(att.name)} in ${firstLower(att.name)}s"></select>
					</div>					
					<#elseif att.viewAproach.type  == 'textarea'  >
					<div id="groupInput${firstUpper(att.name)}" class="form-group">
						<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}</label>
						<textarea rows="3" id="input${firstUpper(att.name)}" placeholder="${firstUpper(att.displayName)!firstLower(att.name)}"  class="form-control " data-ng-model="${firstLower(entity.name)}Parameters.${firstLower(att.name)}" > </textarea>
					</div>					
					<#else>
					<div id="groupInput${firstUpper(att.name)}" class="form-group">
						<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}</label>
					<#if isNumeric(att.type.className)>
						<input type="text"  c3p-numeric c3p-numeric-options='{places:3}' id="input${firstUpper(att.name)}" placeholder="${(att.placeholder)!''}" data-ng-model="${firstLower(entity.name)}Parameters.${firstLower(att.name)}" class="form-control ">
							<#else>
						<input type="text" id="input${firstUpper(att.name)}" placeholder="${(att.placeholder)!''}" data-ng-model="${firstLower(entity.name)}Parameters.${firstLower(att.name)}" class="form-control ">
							</#if>
					</div>								
					</#if>
						  <#else>
					<div id="groupInput${firstUpper(att.name)}" class="form-group">
						<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}</label>
						<input type="text" id="input${firstUpper(att.name)}" placeholder="${(att.placeholder)!''}" data-ng-model="${firstLower(entity.name)}Parameters.${firstLower(att.name)}" class="form-control ">
					</div>
				  </#if>
				</#list>				
				<#if entity.relationships??>	
				<#list entity.relationships as rel>
					<#if (rel.type == 'OneToMany' || rel.type == 'ManyToMany' ) && rel.viewAproach.type == 'multiselect'>
									
					<#elseif rel.type == 'ManyToOne'>
						<#if rel.viewAproach?? >
							<#if rel.viewAproach.type  == 'combo'  >
					<div id="groupInput${firstUpper(rel.name)}" class="form-group">
						<label class="control-label" for="input${firstUpper(rel.name)}">${firstUpper(rel.displayName)!firstLower(rel.name)}</label>
						<select class="form-control" id="input${firstUpper(rel.name)}"  data-ng-model="${firstLower(entity.name)}Parameters.${firstLower(rel.name)}" ng-options="${firstLower(rel.name)}.id as ${firstLower(rel.name)}.${firstLower(rel.viewAproach.comboVal)} for ${firstLower(rel.name)} in ${firstLower(rel.name)}s"></select>
					</div>					
							</#if>
						</#if>
					</#if>
				</#list>
				</#if>	
					<div class="clearfix form-actions form-group mb15">
						<div class="col-md-9">
							<a id="queryBtn" ng-click="query${entity.name}s()" class="save btn btn-primary">
								<i class="ace-icon save fa fa-check bigger-110"></i>
								Pesquisar
							</a>
						</div>
					</div>
						<h3 class="header smaller lighter blue">Resultados</h3>
						<div>
							<div id="sample-table-2_wrapper" class="dataTables_wrapper form-inline no-footer">
								<div id="messages_div"></div>
								<table class="table backgrid table-striped table-bordered table-responsive table-hover dataTable no-footer  " c3p-expose st-pipe="get${firstUpper(entity.name)}s" st-table="pager${firstUpper(entity.name)}s.itens">
									<thead>
										<tr>
										<#list entity.attributes as att>
											<#if isNumeric(att.type.className)>
											<th st-sort="${att.name}" class="number-fix-120">
									  		<#else>	
											<th st-sort="${att.name}">
											</#if>
												<a>
													<b class="direction-icon"></b>
													${firstUpper(att.displayName)!firstUpper(att.name)}
												</a>
											</th>
										</#list>
										</tr>
									</thead>
									
									<tr ng-repeat="${firstLower(entity.name)} in pager${firstUpper(entity.name)}s.itens"  ng-click="${firstLower(entity.name)}Selected(${firstLower(entity.name)})" click-to-close-modal='dialog${firstUpper(entity.displayName)}' >
									<#list entity.attributes as att>
										<#if isNumeric(att.type.className)>
										<td class="number-fix-120">{{${firstLower(entity.name)}.${firstLower(att.name)} | formatDecimal : 2 }}</td>
										<#else>
										<td>{{${firstLower(entity.name)}.${firstLower(att.name)}}}</td>
										</#if>
									</#list>												
									</tr>
									<tr ng-if="pager${firstUpper(entity.name)}s.itens.length == 0">
										<td class="text-center" colspan="${entity.totalInnerElements}" >Sem registros</td>
									</tr>
									</tbody>
									<tfoot  ng-if="pager${firstUpper(entity.name)}s.itens.length != 0">
										<tr>
											<td class="text-center" st-pagination="" st-items-by-page="5" colspan="${entity.totalInnerElements}"></td>
										</tr>
									</tfoot>
								</table>
							</div>
						</div>
					</div>
					<br>
				</div>
			</div>
		</div>
	</div>
</div>
