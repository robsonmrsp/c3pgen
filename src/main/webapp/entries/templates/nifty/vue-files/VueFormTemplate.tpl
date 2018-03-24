<!-- ${entity.name}´s form generated by JSetup ${JSetupVersion} :  at ${.now}  -->
<template>
<div class="panel">
	<div class="panel-heading">
		<h3 class="panel-title">Cadastro de ${firstUpper(entity.displayName)}</h3>
	</div>
	<div class="panel-body">
		<div class="panel">
			<div class="panel-body">
				<div id="messages_div"> </div>
				<form role="form" >
					<input type="hidden" id="inputId" v-model="${firstLower(entity.name)}.id">
	<#list entity.attributes as att>
		<#if att.viewApproach?? >
			<#if att.type.className == 'Boolean' && att.viewApproach.type  == 'check'>
					<div class="form-group">
						<p class="control-label" for="${firstLower(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}  </p>
						<toggle-button  v-model="${firstLower(entity.name)}.${firstLower(att.name)}" name="${firstLower(att.name)}" :width="70" :height="30" :color="{checked: '#7ABE5C', unchecked: '#8F9EA6'}" :sync="true" :labels="{checked: 'Sim', unchecked: 'Não'}"/>
					</div>					
			<#elseif att.viewApproach.type  == 'datepicker'>	
				<#if att.required == true>
					<div :class="{'form-group': true, 'has-error': errors.has('${firstLower(att.name)}') }">
						<label class="control-label" for="${firstLower(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)} *</label>
						<div class="input-group">
							<date-picker v-validate="'required'" ${getVueMask(att.type.className)} v-model="${firstLower(entity.name)}.${firstLower(att.name)}" name="${firstLower(att.name)}" :config="{format: '${att.dateFormat}',useCurrent: false}"></date-picker>
							<div class="input-group-addon	append-right">
								<span class="fa fa-calendar"></span>
							</div>
						</div>
						<span v-show="errors.has('${firstLower(att.name)}')"  class="help-block help-block form-error"  >{{ errors.first('${firstLower(att.name)}') }}</span>
					</div>							
				<#else>
					<div class="form-group">
						<label class="control-label" for="${firstLower(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}</label>
						<div class="input-group">
							<date-picker ${getVueMask(att.type.className)} v-model="${firstLower(entity.name)}.${firstLower(att.name)}" name="${firstLower(att.name)}" :config="{format: '${att.dateFormat}',useCurrent: false}"></date-picker>
							<div class="input-group-addon	append-right">
								<span class="fa fa-calendar"></span>
							</div>
						</div>
					</div>
				</#if>
			<#elseif att.viewApproach.type  == 'radiogroup'>
			<#elseif att.viewApproach.type  == 'combo'>
			
			<#elseif att.viewApproach.type  == 'textarea'>	
				<#if att.required == true>
					<div :class="{'form-group': true, 'has-error': errors.has('${firstLower(att.name)}') }">
						<label class="control-label" for="${firstLower(att.name)}"> ${firstUpper(att.displayName)!firstLower(att.name)}</label>
						<textarea rows="3" v-validate="'required'" v-model="${firstLower(entity.name)}.${firstLower(att.name)}" name="${firstLower(att.name)}" class="form-control" maxlength="2000"></textarea>
						<span v-show="errors.has('${firstLower(att.name)}')"  class="help-block help-block form-error"  >{{ errors.first('${firstLower(att.name)}') }}</span>
					</div>					
				<#else>
					<div class="form-group">
						<label class="control-label" for="${firstLower(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)} </label>
						<textarea rows="3"  v-model="${firstLower(entity.name)}.${firstLower(att.name)}" name="${firstLower(att.name)}" class="form-control" maxlength="2000"></textarea>
					</div>					
				</#if>
			<#elseif att.viewApproach.type  == 'upload'>	
			<#else>	
				<#if att.required == true>			
					<div :class="{'form-group': true, 'has-error': errors.has('${firstLower(att.name)}') }">
						<label class="control-label" for="${firstLower(att.name)}">${firstUpper(att.displayName)!firstLower(att.name)}  *</label>
						<input type="text" v-validate="'required'" ${getVueMask(att.type.className)}  name="${firstLower(att.name)}" v-model="${firstLower(entity.name)}.${firstLower(att.name)}" class="form-control"  >
						<span v-show="errors.has('${firstLower(att.name)}')"  class="help-block help-block form-error"  >{{ errors.first('${firstLower(att.name)}') }}</span>
					</div>
				<#else>
					<div class="form-group">
						<label class="control-label" for="${firstLower(att.name)}">${firstUpper(att.displayName)!firstUpper(att.name)}</label>
						<input type="text" ${getVueMask(att.type.className)} name="${firstLower(att.name)}"  v-model="${firstLower(entity.name)}.${firstLower(att.name)}" class="form-control" >
					</div>
				</#if>
			</#if>
  	   <#else>
  	   </#if>
	</#list> 
	<#if entity.relationships??>	
		<#list entity.relationships as rel>
			<#if rel.viewApproach.type == 'modal'>
					<Modal${firstUpper(rel.model)} v-model="${firstLower(entity.name)}.${rel.name}" :displayValue="'${rel.viewApproach.textField}'"> </Modal${firstUpper(rel.model)}> 
			<#elseif rel.viewApproach.type == 'combo'>
					<div class="form-group">
						<label class="control-label" for="${firstLower(rel.name)}">${firstUpper(rel.displayName)!firstLower(rel.name)}</label>
  						<multiselect v-model="${firstLower(entity.name)}.${firstLower(rel.name)}" name="${firstLower(rel.name)}" track-by="${(rel.viewApproach.comboVal)}" label="${(rel.viewApproach.comboVal)}" placeholder="-- Selecione --" :options="${firstLower(rel.model)}s" :searchable="false" selectLabel="" deselectLabel="" ></multiselect>						
					</div>
			<#elseif rel.viewApproach.type == 'multiselect'>
					<div class="form-group">
						<label class="control-label" for="${firstLower(rel.name)}">${firstUpper(rel.displayName)!firstLower(rel.name)}</label>
  						<multiselect v-model="${firstLower(entity.name)}.${firstLower(rel.name)}" name="${firstLower(rel.name)}" :multiple="true" track-by="${(rel.viewApproach.comboVal)}" label="${(rel.viewApproach.comboVal)}" placeholder="-- Selecione --" :options="${firstLower(rel.model)}s" :searchable="false" selectLabel="" deselectLabel="" ></multiselect>						
					</div>					
			</#if>
		</#list> 
   </#if>
				</form>
			</div>
		</div>
		<div >
			<div class="clearfix form-actions">
				<a @click="save" class="btn btn-primary btn-lg ">
					<i class="fa fa-check "></i>
					Salvar
				</a>
				&nbsp; 
				<a @click="save(true)" class="btn btn-info btn-lg">
					<i class="fa fa-check "></i>
					Salvar e Continuar
				</a>
				&nbsp; 
				<a @click="goBackList" class="btn-lg btn btn-light" >
					<i class=" fa fa-undo "></i>
					Voltar para a listagem
				</a>
			</div>
		</div>
	</div>
</div>
</template>
<script>

import HttpRequest from "@/components/core/HttpRequest";
	<#if entity.relationships??>	
	<#list entity.relationships as rel >
		<#if rel.viewApproach.type == 'modal'>
import Modal${firstUpper(rel.model)} from "@/components/${firstLower(rel.model)}/Modal${firstUpper(rel.model)}";
		</#if>
	</#list>
	</#if>

export default {
  name: "Form${entity.name}",

  components: {
	<#if entity.relationships??>	
	<#list entity.relationships as rel >
		<#if rel.viewApproach.type == 'modal'>
	 	Modal${firstUpper(rel.model)},
		</#if>
	</#list>
	</#if>
  },
  
  data: function() {
    return {
		${firstLower(entity.name)}: {},
	<#if entity.relationships??>	
	<#list entity.relationships as rel >
		<#if rel.viewApproach.type == 'combo' || rel.viewApproach.type == 'multiselect'>
		${firstLower(rel.model)}s: [], 
		</#if>
	</#list>
	</#if>
    };
  },
  
  created() {
    this.service = new HttpRequest("/rs/crud/${firstLower(entity.name)}s");
	<#if entity.relationships??>	
	<#list entity.relationships as rel >
		<#if rel.viewApproach.type == 'combo' || rel.viewApproach.type == 'multiselect'>
    this.${firstLower(rel.model)}Service = new HttpRequest("/rs/crud/${firstLower(rel.model)}s");
		</#if>
	</#list>
	</#if>
  },

  mounted() {
    let id = this.$route.params.id;
    if (id) {
      this.service.getById(
        id,
        data => {
          this.${firstLower(entity.name)} = data;
        },
        error => {
          console.error("Error fetching  by id", error);
        }
      );
    }
   	<#if entity.relationships??>	
	<#list entity.relationships as rel >
		<#if rel.viewApproach.type == 'combo' || rel.viewApproach.type == 'multiselect' >
	  this.${firstLower(rel.model)}Service.getAll(
		data => {
        	this.${firstLower(rel.model)}s = data;
        },
        error => {
        	console.error("Error fetching  ${firstLower(rel.model)}s", error);
        }
	 )
		</#if>
	</#list>
	</#if>
  },

  methods: {
    save: function(_continue) {
      this.service.save(
        this.${firstLower(entity.name)},
        data => {
          this.${firstLower(entity.name)} = data;
        },
        error => {
          console.error("error saving ${firstLower(entity.name)} ", error);
        }
      );
    },

    goBackList: function() {
      this.$router.push({ path: "/${firstLower(entity.name)}s/list" });
    }
  }
};
</script>
