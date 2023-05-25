/* ${entity.name}´s Form generated by JSetup ${JSetupVersion} :  at ${.now} */  
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Alert, Button, FormGroup, ControlLabel, FormControl, HelpBlock } from "react-bootstrap";

import HttpRequest from "../core/HttpRequest";
import JSInputField from "../core/JSInputField";
import JSCombobox from "../core/JSCombobox";
import Message from "../core/Message";

<#if entity.relationships??>	
	<#list entity.relationships as rel >
		<#if rel.viewApproach.type == 'modal'>
import Modal${firstUpper(rel.model)} from "../${firstLower(rel.model)}/Modal${firstUpper(rel.model)}";
		</#if>
		<#if rel.viewApproach.type == 'multiselectmodal'>
		</#if>		
	</#list>
</#if>

import { isEmpty, isNotEmpty } from "../core/JSUtils";

const empty${firstUpper(entity.name)} = {
	id: '',
<#list entity.attributes as att>
	${firstLower(att.name)}: '',    	
</#list>
};

export default class Form${firstUpper(entity.name)} extends React.Component {
    constructor() {
        super();
        this.service = new HttpRequest("/api/crud/${firstLower(entity.name)}s");
<#if entity.relationships??>	
	<#list entity.relationships as rel >
		<#if rel.viewApproach.type == 'combo'>
        this.service${firstUpper(rel.model)} = new HttpRequest("/api/crud/${firstLower(rel.model)}s");
		</#if>		
	</#list>
</#if>
        
        this.state = {
            ${firstLower(entity.name)}: empty${firstUpper(entity.name)},
		<#if entity.relationships??>	
			<#list entity.relationships as rel >
				<#if rel.viewApproach.type == 'combo'>
			${firstLower(rel.name)}List: [],
				</#if>		
			</#list>
		</#if>
		
            message: new Message(),
            showMessage: false,

            validationFields: {
            <#list entity.attributes as att>
            <#if att.required == true>
                ${firstLower(att.name)}: {
                    isValid: () => {
                        return isNotEmpty(this.state.${firstLower(entity.name)}.${firstLower(att.name)});
                    },
                    message: "Campo Obrigatório!",
                },
            </#if>
			</#list>
            }
        }
    }
    componentDidMount = () => {
<#if entity.relationships??>	
	<#list entity.relationships as rel >
		<#if rel.viewApproach.type == 'combo'>
        this.service${firstUpper(rel.model)}.getAll(
            ${firstLower(rel.name)}List => {
                this.setState({ ${firstLower(rel.name)}List  });
            },
            error => {
                console.error("error fetching forr combobox", error);
            }
        );
		</#if>		
	</#list>
</#if>
    
    }
    getValidationState = (fieldName) => {
        if (this.state.validationFields[fieldName]) {
            if (!(this.state.validationFields[fieldName].isValid())) {
                return "error";
            }
        }
        return null;
    }
    
	getValidationMessage = (fieldName) => {
        const fieldValidator = this.state.validationFields[fieldName];
        if (fieldValidator) {
            return fieldValidator.message;
        }
        return false;
    }
    
    validateField = (fieldName) => {
        const fieldValidator = this.state.validationFields[fieldName];
        if (fieldValidator) {
            return fieldValidator.isValid && fieldValidator.isValid();
        }
        return "";
    }

    submitFormHandle = (clickEvent) => {
        console.log("Salvando o objeto: " + this.state.${firstLower(entity.name)});
        this.service.save(
            this.state.${firstLower(entity.name)},
            data => {
                this.${firstLower(entity.name)} = data;
				this.setState({ message: new Message("success", "Success saving ${firstUpper(entity.name)}"), showMessage: true })
                this.setState({ ${firstLower(entity.name)}: empty${firstUpper(entity.name)} });

            },
            error => {
                console.error("error saving ${firstLower(entity.name)} ", error);
				this.setState({ message: new Message("danger", "Error saving ${firstUpper(entity.name)}"), showMessage: true })
            }
        );
    }

    changeFormDateHandle = (name, value) => {
    	const ${firstLower(entity.name)} = { ...this.state.${firstLower(entity.name)} };
        ${firstLower(entity.name)}[name] = value;
        this.setState({ ${firstLower(entity.name)} });
    }

    render = () => {
        return (
            <div className="panel">
                <div className="panel-heading">
                    <h3 className="panel-title">Cadastro de ${firstUpper(entity.displayName)}</h3>
                </div>
                <div className="panel-body">
                    <div className="panel">
                        <div className="panel-body">
                            {this.state.showMessage ?
                                <Alert bsStyle={this.state.message.type} onDismiss={() => { this.setState({ showMessage: false }) }}>
                                    {this.state.message.text}
                                </Alert>
                                
                                : null
                            }                        
                            <form>
                            <#list entity.attributes as att>
                                <FormGroup controlId="${firstLower(att.name)}" validationState={this.getValidationState("${firstLower(att.name)}")} >
                                    <ControlLabel>${firstUpper(att.displayName)}</ControlLabel>
								<#if att.plugin??>
                                    <JSInputField name="${firstLower(att.name)}" plugin="${firstLower(att.plugin)}" type="text" value={this.state.${firstLower(entity.name)}.${firstLower(att.name)}}  onChange={(event) => this.changeFormDateHandle("${firstLower(att.name)}", event.target.value)} className="form-control" />
                                <#else>    
                                    <JSInputField name="${firstLower(att.name)}" type="text" value={this.state.${firstLower(entity.name)}.${firstLower(att.name)}}  onChange={(event) => this.changeFormDateHandle("${firstLower(att.name)}", event.target.value)} className="form-control" />
								</#if>                                    
                                    <FormControl.Feedback />
                                    <HelpBlock className={this.validateField("${firstLower(att.name)}") ? "hide" : "block"} >{this.getValidationMessage("${firstLower(att.name)}")}</HelpBlock>
                                </FormGroup>
                                
                            </#list>
				<#list entity.relationships as rel>
					<#if (rel.type == 'OneToMany' || rel.type == 'ManyToMany' ) && rel.viewApproach.type == 'multiselectmodal'>
					</#if>
					<#if (rel.type == 'OneToMany' || rel.type == 'ManyToMany' ) && rel.viewApproach.type == 'multiselect'>
					<#elseif rel.type == 'ManyToOne'>
						<#if rel.viewApproach?? >
							<#if rel.viewApproach.type  == 'combo'  >
		                        <FormGroup controlId="titulo" validationState={this.getValidationState("${firstLower(rel.name)}")} >
		                            <ControlLabel>${firstUpper(rel.displayName)}</ControlLabel>
		                            <FormControl.Feedback />
		                            <JSCombobox value={this.state.${firstLower(entity.name)}.${firstLower(rel.name)}} values={this.state.${firstLower(rel.name)}List} displayValue="${(rel.viewApproach.comboVal)!'name'}" idValue="${(rel.viewApproach.comboId)!'id'}" onChange={(event) => this.changeFormDateHandle("${firstLower(rel.name)}", event.target.value)} className="form-control" />
		                            <HelpBlock className={this.validateField("${firstLower(rel.name)}") ? "hide" : "block"} >{this.getValidationMessage("${firstLower(rel.name)}")}</HelpBlock>
		                        </FormGroup>      	
		                        				
							<#elseif rel.viewApproach.type  == 'modal'  >
		                        <FormGroup controlId="titulo" validationState={this.getValidationState("${firstLower(rel.name)}")} >
		                            <ControlLabel>${firstUpper(rel.displayName)}</ControlLabel>
		                            <FormControl.Feedback />
									<Modal${firstUpper(rel.model)} value={this.state.${firstLower(entity.name)}.${firstLower(rel.name)}} displayValue="${(rel.viewApproach.textField)!'name'}" idValue="${(rel.viewApproach.hiddenField)!'id'}" onChange={(event) => this.changeFormDateHandle("${firstLower(rel.name)}", event.target.value)}  />
		                            <HelpBlock className={this.validateField("${firstLower(rel.name)}") ? "hide" : "block"} >{this.getValidationMessage("${firstLower(rel.name)}")}</HelpBlock>
		                        </FormGroup>
		                              					
							</#if>
						</#if>
					</#if>
                 </#list>
                            </form>
                        </div>
                    </div >
                    <div >
                        <div className="clearfix form-actions">
                            <button onClick={this.submitFormHandle} className="btn btn-primary btn-lg " >
                                <i className="fa fa-check " />
                                &nbsp; Salvar
                            </button>
                            &nbsp;
                            <button onClick={this.handleClick} className="btn btn-primary btn-lg ">
                                <i className="fa fa-check " />
                                &nbsp; Salvar e continuar
                            </button>
                            &nbsp;
                            
                            <NavLink to="/${firstLower(entity.name)}s/list" className="btn-lg btn btn-light">
								<i className=" fa fa-undo " />
                                &nbsp; Voltar para a listagem
                             </NavLink>
                        </div >
                    </div >
                </div >
            </div >
        )
    }
}

