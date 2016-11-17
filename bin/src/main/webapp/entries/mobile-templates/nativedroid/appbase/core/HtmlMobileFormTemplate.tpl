<!-- generated: ${.now} -->
<!-- Begin ${entity.name}´s form -->
<div class="row">
	<div class="col-xs-12 col-sm-12 col-md-12">
		<form>
			<input type="hidden" id="inputId" value="{{id}}">
			<div class="box">
				<div class="box">
				<#list entity.attributes as att>
				  <#if att.viewApproach??  >
					<#if att.type.className == 'Boolean' && att.viewApproach.type  == 'check'  >
						<input  id="input${firstUpper(att.name)}" type="checkbox" {{${firstLower(att.name)} ? 'checked' :''}}>
						<label for="input${firstUpper(att.name)}" > ${firstUpper(att.displayName)} </label>
					<#elseif att.viewApproach.type  == 'datepicker'  >
						<label for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}:</label>
						<input type="date" data-role="date" id="input${firstUpper(att.name)}" value="{{${firstLower(att.name)}}}" data-clear-btn="true" class="${getRequiredClass(att.required)}" placeholder="Digite aqui ${firstUpper(att.displayName)!firstLower(att.name)}...">
					<#elseif att.viewApproach.type  == 'combo'>
						<label for="inputinput${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}:</label>
						<select id="input${firstUpper(att.name)}">
							<option value="">&nbsp;SELECIONE </option> 
						</select>

					<#elseif att.viewApproach.type  == 'textarea'>
						<label for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}:</label>
						<textarea cols="40" rows="8" id="input${firstUpper(att.name)}" placeholder="Entre com ">{{${firstLower(att.name)}}}</textarea>
					<#else>
						<label for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}:</label>
						
					  <#if att.type.hasNumeric()  >
						<input type="number" id="input${firstUpper(att.name)}" placeholder="${(att.placeholder)!''}" value="{{${firstLower(att.name)}}}" class="${getRequiredClass(att.required)}">
					<#else>
						<input type="text" id="input${firstUpper(att.name)}" placeholder="${(att.placeholder)!''}" value="{{${firstLower(att.name)}}}" class="${getRequiredClass(att.required)}">
					</#if>
					</#if>
  				  <#else>
						<label for="input${firstUpper(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}:</label>
						<#if att.type.hasNumeric()  >
						<input type="text" id="input${firstUpper(att.name)}" placeholder="${(att.placeholder)!''}" value="{{${firstLower(att.name)}}}" class="${getRequiredClass(att.required)}">
					   <#else>
					  </#if>
				  </#if>
				</#list>
				<#list entity.relationships as rel>
						<#if rel.viewApproach?? >
							<#if rel.viewApproach.type  == 'combo'  >
						<label for="input${firstUpper(rel.name)}">${firstUpper(rel.displayName)!firstLower(rel.name)}:</label>
						<select id="input${firstUpper(rel.name)}">
							<option value="">&nbsp;SELECIONE</option>
						</select>
						</#if>
					</#if>
				</#list>
				</div>
			</div>
		</form>
	</div>
</div>
<div id="floatButtonSave" style="position: fixed; display: block; z-index: 9; bottom: 10px; right: 10px;"></div>
<!-- End ${entity.name}´s form -->

		
