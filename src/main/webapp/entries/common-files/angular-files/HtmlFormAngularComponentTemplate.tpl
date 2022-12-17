<!-- ${entity.name}´s form generated by JSetup ${JSetupVersion} :  at ${.now}  -->
<div class="card">
	<form #${firstLower(entity.name)}Form="ngForm">
		<div class="card-header">
			<i class="ace-icon fa fa-wpforms"></i>
			Formulário de cadastro de ${firstUpper(entity.displayName)}
		</div>
		<div class="card-block">
		<#list entity.attributes as att>
			<#if att.viewApproach?? >
				<#if att.type.className == 'Boolean' && att.viewApproach.type  == 'check'  >
				<#elseif att.viewApproach.type  == 'combo'  >
				<#elseif att.viewApproach.type  == 'textarea'  >
			<div id="groupInput${firstUpper(att.name)}" class="form-group   ">
				<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)} ${att.required ? string('*','')}</label>
				<textarea rows="3" id="input${firstUpper(att.name)}" name="${att.name}" class=" form-control " [(ngModel)]="${firstLower(entity.name)}.${att.name}" ${getMaxLen(att.maxLen)} #${att.name}="ngModel"></textarea>
					<#if att.required>
				<div *ngIf="${att.name}.invalid && (${att.name}.dirty || ${att.name}.touched) && ${att.name}.errors.required" class="alert-danger">
					${firstUpper(att.displayName)!firstLower(att.name)} é Obrigatório!
				</div>					
					</#if>				
			</div>
				<#elseif att.viewApproach.type  == 'upload'  >
				<#else>
			<div id="groupInput${firstUpper(att.name)}" class="form-group   ">
				<label class="control-label" for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)} ${att.required ? string('*','')}</label>
				<input ${getMaxLen(att.inputAs,att.type.className,att.type.className, att.mask)} type="text" id="input${firstUpper(att.name)}" name="${att.name}" class=" form-control " [(ngModel)]="${firstLower(entity.name)}.${att.name}" ${getMaxLen(att.maxLen)} #${att.name}="ngModel" />
					<#if att.required>
				<div *ngIf="${att.name}.invalid && (${att.name}.dirty || ${att.name}.touched) && ${att.name}.errors.required" class="alert-danger">
					${firstUpper(att.displayName)!firstLower(att.name)} é Obrigatório!
				</div>					
					</#if>				
			</div>
				</#if>
		  <#else>
		  </#if>
		</#list>		
		<#if entity.relationships??>	
		  <#list entity.relationships as rel>
			<#if (rel.type == 'OneToMany' || rel.type == 'ManyToMany' ) && rel.viewApproach.type == 'multiselectmodal'>
				<#elseif rel.type == 'ManyToOne'>
					<#if rel.viewApproach?? >
						<#if rel.viewApproach.type  == 'combo'  >
						<#elseif rel.viewApproach.type  == 'modal'>
						</#if>
					</#if>
				</#if>
			</#list>
		</#if>
		</div>
		<div class="card-footer">
			<button type="submit" [disabled]="!${firstLower(entity.name)}.form.valid" class=" btn btn-primary " (click)="save()">
				<i class="save fa fa-check "></i>
				Salvar
			</button>
			&nbsp; 
			<button type="button" class="btn btn-info ">
				<i class="fa fa-check bigger-110"></i>
				Salvar e Continuar
			</button>
			&nbsp; 
			<a class="btn btn-secondary" [routerLink]="['/${firstLower(entity.name)}/page']">
				<i class="fa fa-undo "> </i>
				Voltar para a listagem
			</a>
		</div>
	</form>
</div>