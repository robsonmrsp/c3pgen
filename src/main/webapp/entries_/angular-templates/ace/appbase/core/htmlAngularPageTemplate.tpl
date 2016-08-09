<!-- generated: ${.now} -->
<div class="main-content-inner">
	<div class="breadcrumbs" id="breadcrumbs">
		<ul class="breadcrumb">
			<li>
				<i class="ace-icon fa fa-home home-icon"></i>
				<a href="#">Home</a>
			</li>
			<li class="active">Pesquisa ${firstUpper(entity.displayName)!firstUpper(entity.name)}</li>
		</ul>
	</div>	
	<div class="page-content">
		<div class="page-header">
			<h1>Pesquisa ${firstUpper(entity.displayName)!firstUpper(entity.name)}</h1>
		</div>
		<div class="main-principal">
			<div class="row">
				<div class="col-xs-12 col-sm-12">
					<div id="messages_div"></div>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-12 col-sm-12">
					<h3 class="header smaller lighter blue">Filtros da pesquisa</h3>					
					<div class="panel panel-default plain profile-widget">
						<!-- Start .panel -->
						<div class="panel-body">

						<form c3p-form role="form" id="page${firstUpper(entity.name)}" action="rs/crud/uploads/file" method="post" c3p-form-save-button='saveBtn' c3p-form-save-and-continue-button='saveAndContinueBtn' c3p-form-validate-options=''>
						<#list entity.attributes as att>
						  <#if att.viewApproach?? >
							<#if att.type.className == 'Boolean' && att.viewApproach.type  == 'check'  >
							<div id="groupInput${firstUpper(att.name)}" class="form-group checkbox">
								<label class="checkbox ">
									<input id="input${firstUpper(att.name)}" type="checkbox" data-ng-model='${firstLower(entity.name)}Filter.${firstLower(att.name)}' />
									${firstUpper(att.displayName)}
								</label>
							</div>
							<#elseif att.viewApproach.type  == 'datepicker'  >
							<div id="groupInput${firstUpper(att.name)}Container" class="form-group">
								<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}</label>
								<div id="groupInput${firstUpper(att.name)}" class="input-group date" data-date-format="${att.dateFormat}"  c3p-date-picker c3p-date-picker-options="{pickTime : false}" >
									<input id="input${firstUpper(att.name)}" placeholder="Pesquise pela ${firstUpper(att.displayName)}"  type="text" class="form-control  append-left" c3p-date-picker c3p-date-picker-options="{pickTime : false }"  data-ng-model="${firstLower(entity.name)}Filter.${firstLower(att.name)}" />
									<div class="input-group-addon	append-right">
										<span class="fa fa-calendar"></span>
									</div>
								</div>
							</div>
							<#elseif att.viewApproach.type  == 'combo'  >
							<div id="groupInput${firstUpper(att.name)}" class="form-group">
								<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}</label>
								<select class="form-control" data-ng-model="${firstLower(entity.name)}Filter.${firstLower(att.name)}" ng-options="${firstLower(att.name)} as ${firstLower(att.name)}.${firstLower(rel.viewApproach.comboVal)} for ${firstLower(att.name)} in ${firstLower(att.name)}s"></select>
							</div>					
							<#elseif att.viewApproach.type  == 'textarea'  >
							<div id="groupInput${firstUpper(att.name)}" class="form-group">
								<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}</label>
								<textarea rows="3" id="input${firstUpper(att.name)}" placeholder="Pesquise pelo ${firstUpper(att.displayName)!firstLower(att.name)}"  class="form-control " data-ng-model="${firstLower(entity.name)}Filter.${firstLower(att.name)}" > </textarea>
							</div>					
							<#else>
							<div id="groupInput${firstUpper(att.name)}" class="form-group">
								<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}</label>
							<#if isNumeric(att.type.className)>
								<input type="text"  c3p-numeric c3p-numeric-options='{places:3}' id="input${firstUpper(att.name)}" placeholder="Pesquise pelo ${(att.placeholder)!''}" data-ng-model="${firstLower(entity.name)}Filter.${firstLower(att.name)}" class="form-control ">
	  						<#else>
								<input type="text" id="input${firstUpper(att.name)}" placeholder="Pesquise pelo  ${(att.placeholder)!''}" data-ng-model="${firstLower(entity.name)}Filter.${firstLower(att.name)}" class="form-control ">
	  						</#if>
							</div>								
							</#if>
		  				  <#else>
							<div id="groupInput${firstUpper(att.name)}" class="form-group">
								<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}</label>
								<input type="text" id="input${firstUpper(att.name)}" placeholder="Pesquise pelo ${(att.placeholder)!''}" data-ng-model="${firstLower(entity.name)}Filter.${firstLower(att.name)}" class="form-control ">
							</div>
						  </#if>
						</#list>				
						<#if entity.relationships??>	
						<#list entity.relationships as rel>
							<#if (rel.type == 'OneToMany' || rel.type == 'ManyToMany' ) && rel.viewApproach.type == 'multiselect'>

							<#elseif rel.type == 'ManyToOne'>
								<#if rel.viewApproach?? >
									<#if rel.viewApproach.type  == 'combo'  >
							<div id="groupInput${firstUpper(rel.name)}" class="form-group">
								<label class="control-label" for="input${firstUpper(rel.name)}">${firstUpper(rel.displayName)!firstLower(rel.name)}</label>
								<select class="form-control" id="input${firstUpper(rel.name)}"  data-ng-model="${firstLower(entity.name)}Filter.${firstLower(rel.name)}" ng-options="${firstLower(rel.name)} as ${firstLower(rel.name)}.${firstLower(rel.viewApproach.comboVal)} for ${firstLower(rel.name)} in ${firstLower(rel.name)}s"></select>
							</div>					
									<#elseif rel.viewApproach.type  == 'modal'  >					
							<div id="groupInput${firstUpper(rel.name)}Container" class="form-group">
								<label class="control-label" for="input${firstUpper(rel.name)}">${firstUpper(rel.displayName)!firstUpper(rel.name)}</label>
								<div id="groupInput${firstUpper(rel.name)}" class="input-group">
									<#if rel.viewApproach.hiddenField??>							
									<input id="input${firstUpper(rel.name)}${firstUpper(rel.viewApproach.hiddenField)}" type="text" class="form-control append-left" data-ng-model="${firstLower(entity.name)}Filter.${firstLower(rel.name)}.${firstLower(rel.viewApproach.hiddenField)}" style="display: none;" />
									</#if>
									<#if rel.viewApproach.textField??>							
									<input id="input${firstUpper(rel.name)}${firstUpper(rel.viewApproach.textField)}" placeholder="Pesquise pelo ${firstUpper(rel.displayName)}"  type="text" class="form-control append-left" data-ng-model="${firstLower(entity.name)}Filter.${firstLower(rel.name)}.${firstLower(rel.viewApproach.textField)}" />
									</#if>
									<div class="input-group-addon append-right" id="search${firstUpper(rel.name)}Modal" data-toggle="modal">
										<span class="fa fa-search"></span>
									</div>
								</div>
								<div c3p-modal-${firstLower(rel.model)}='' c3p-modal-display='search${firstUpper(rel.name)}Modal' c3p-modal-id="${firstLower(rel.viewApproach.hiddenField)}"  c3p-modal-field-id="input${firstUpper(rel.name)}${firstUpper(rel.viewApproach.hiddenField)}" c3p-modal-field-value="input${firstUpper(rel.name)}${firstUpper(rel.viewApproach.textField)}" c3p-modal-value="${firstLower(rel.viewApproach.textField)}" c3p-modal-post-select="postSelect${firstUpper(rel.name)}"></div>
							</div>		
									</#if>
								</#if>
							</#if>
						</#list>
						</#if>										
							<div class="clearfix form-actions form-group mb15">
								<div class="col-md-9">
									<a id="queryBtn" ng-click="query${firstUpper(entity.name)}s()" class="save btn btn-primary">
										<i class="ace-icon save fa fa-check bigger-110"></i>
										Pesquisar
									</a>
									&nbsp; &nbsp;
									<a class="go-back-link btn btn-success" ng-click='new${firstUpper(entity.name)}()'>
										<i class="ace-icon fa fa-plus bigger-110"></i>
										Novo
									</a>
									&nbsp; &nbsp;
									<button ng-click='reset()' type="reset" class="btn">Limpar</button>								
								</div>
							</div>
						</form>
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
									<#if entity.relationships??>	
										<#list entity.relationships as rel >
											<#if rel.viewApproach.type == 'modal'>
										<th st-sort="${firstLower(rel.name)}.${rel.viewApproach.textField}">
											<a>
												<b class="direction-icon"></b>
												${rel.displayName}
											</a>
										</th>														
											</#if>
										</#list>
									</#if>
										<th class="td-actions"> Ações(Editar, Excluir)</th>
									</tr>
								</thead>
								<tr ng-repeat="${firstLower(entity.name)} in pager${firstUpper(entity.name)}s.itens">
								<#list entity.attributes as att>
									<#if isNumeric(att.type.className)>    
									<td class="number-fix-120">{{${firstLower(entity.name)}.${firstLower(att.name)} | formatDecimal : 2 }}</td>
									<#else>
									<td>{{${firstLower(entity.name)}.${firstLower(att.name)}}}</td>
									</#if>
								</#list>	
								<#list entity.relationships as rel >
									<#if rel.viewApproach.type == 'modal'>
									<td>{{${firstLower(entity.name)}.${firstLower(rel.name)}.${rel.viewApproach.textField}}}</td>											
									</#if>
								</#list>																						
									<td class="td-actions editable renderable">
										<a ng-click='editaItem(${firstLower(entity.name)})' class="btn btn-xs button_cell btn-primary" data-toggle="tooltip" data-placement="top" data-original-title="Editar ${firstLower(entity.displayName)}">
											<i class="fa fa-pencil fa-lg"></i>
										</a>
										<a ng-click='removeItem(${firstLower(entity.name)})' class="bt-delete btn btn-xs  button_cell btn-danger" data-toggle="tooltip" data-placement="top" data-original-title="Remover ${firstLower(entity.displayName)}">
											<i class="fa fa-times fa-lg"></i>
										</a>
									</td>
								</tr>
								<tr ng-if="pager${firstUpper(entity.name)}s.itens.length == 0">
									<td class="text-center" colspan="${entity.totalInnerElements + 1}" >Sem registros</td>
								</tr>
								</tbody>
								<tfoot ng-if="pager${firstUpper(entity.name)}s.itens.length != 0">

									<tr>
										<td class="text-center" st-pagination="" st-items-by-page="10" colspan="${entity.totalInnerElements + 1}"></td>
									</tr>
								</tfoot>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
