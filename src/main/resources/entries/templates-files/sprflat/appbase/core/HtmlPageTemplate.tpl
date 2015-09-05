<!-- generated: ${.now} -->
<!-- ${entity.name}´s page -->
<div class="main-content-inner">
	<div class="breadcrumbs" id="breadcrumbs">
		<ul class="breadcrumb">
			<li>
				<i class="ace-icon fa fa-home home-icon"></i>
				<a href="#">Home</a>
			</li>
			<li class="active">Pesquisar ${entity.displayName}</li>
		</ul>
	</div>
	<div class="page-content">
		<div class="page-header">
			<h1>Pesquisar ${entity.displayName}</h1>
		</div>
		<div class="main-content">
			<div class="panel panel-default plain">
				<div class="">
					<div class="col-xs-12 col-sm-12">
				<form role="form" id="form${firstUpper(entity.name)}Filter">
					<br>
					<#list entity.attributes as att>
					  <#if att.viewAproach?? >
						<#if att.type.className == 'Boolean' && att.viewAproach.type  == 'check'  >
							<div id="groupInput${firstUpper(att.name)}" class="form-group checkbox">
								<label class="checkbox ">
									<input id="input${firstUpper(att.name)}" type="checkbox" >
									${firstUpper(att.displayName)}
								</label>
							</div>
						<#elseif att.viewAproach.type  == 'datepicker'  >
							<div id="groupInput${firstUpper(att.name)}Container" class="form-group">
								<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}</label>
								<div id="groupInput${firstUpper(att.name)}" class="input-group date" data-date-format="${att.dateFormat}">
									<input id="input${firstUpper(att.name)}" placeholder="Pesquise pela ${firstUpper(att.displayName)}" type="text" class="form-control append-left" />
									<div class="input-group-addon	append-right">
										<span class="fa fa-calendar"></span>
									</div>
								</div>
							</div>
						<#elseif att.viewAproach.type  == 'radiogroup'>
							<div id="groupInput${firstUpper(att.name)}" class="form-group">
								<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}</label>
								<#list att.viewAproach.values as val>	
								<div id="groupInput${firstUpper(att.name)}_${val}" class="radio">
									<label>
										<input type="radio" name="input${firstUpper(att.name)}" value="${val}" >
										${firstUpper(val)}
									</label>
								</div>
								</#list>
							</div>
						<#elseif att.viewAproach.type  == 'combo'  >
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
					</#list>		
					<#if entity.relationships??>	
					<#list entity.relationships as rel>
						<#if rel.type == 'OneToMany'>
						
						<#elseif rel.type == 'ManyToOne'>
							<#if rel.viewAproach?? >
								<#if rel.viewAproach.type  == 'combo'  >
						<div id="groupInput${firstUpper(rel.name)}" class="form-group">
							<label class="control-label" for="input${firstUpper(rel.name)}">${firstUpper(rel.displayName)!firstLower(rel.name)}</label>
							<select class="form-control" id="input${firstUpper(rel.name)}"></select>
						</div>					
								<#elseif rel.viewAproach.type  == 'modal'  >					
						<div id="groupInput${firstUpper(rel.name)}Container" class="form-group">
							<label class="control-label" for="input${firstUpper(rel.name)}">${firstUpper(rel.displayName)!firstUpper(rel.name)}</label>
							<div id="groupInput${firstUpper(rel.name)}" class="input-group">
								<#if rel.viewAproach.hiddenField??>							
								<input id="input${firstUpper(rel.name)}${firstUpper(rel.viewAproach.hiddenField)}" type="hidden" class="form-control append-left"  />
								</#if>
								<#if rel.viewAproach.textField??>							
								<input id="input${firstUpper(rel.name)}${firstUpper(rel.viewAproach.textField)}" placeholder="Pesquise pelo ${firstUpper(rel.displayName)}"  type="text" class="form-control append-left" />
								</#if>
								<div class="input-group-addon append-right" id="search${firstUpper(rel.name)}Modal" data-toggle="modal">
									<span class="fa fa-search"></span>
								</div>
							</div>
						</div>		
								</#if>
							</#if>
						<#elseif rel.type == 'ManyToMany'>
						<#elseif rel.type == 'OneToOne'>
						</#if>
					</#list>
					</#if>
					
					</form>
				</div>
			</div>
			<div class="clearfix form-actions form-group mb15">
				<div class="col-md-9">
					<a href="javascript:void(0)" id="query" class="btn btn-primary">
						<i class="fa fa-search"></i>
						Pesquisar
					</a>
					&nbsp;
					<a href="#app/new${firstUpper(entity.name)}" class="btn btn-info">
						<i class="fa fa-plus "></i>
						Novo
					</a>
					&nbsp;
					<a href="javascript:void(0)" id="reset" class="btn btn-default">Limpar</a>
				</div>
			</div>
			</div>
			<div class="panel panel-default plain toggle panelClose panelRefresh">
				<div class="panel-body">
					<h3 class="header smaller lighter blue">Resultados</h3>
					<div>
						<div id="sample-table-2_wrapper" class="dataTables_wrapper form-inline no-footer">
							<div id="messages_div"></div>
							<div id="grid" class="table-responsive"></div>
							<div class="row">
								<div id="counter" class="col-xs-6 pull-left"></div>
								<div id="paginator" class="col-xs-6 pull-right"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<#if entity.relationships??>	
<#list entity.relationships as rel >
	<#if rel.viewAproach.type == 'modal'>
<div id='${firstLower(rel.name)}Modal'></div>
	</#if>
</#list>
</#if>
