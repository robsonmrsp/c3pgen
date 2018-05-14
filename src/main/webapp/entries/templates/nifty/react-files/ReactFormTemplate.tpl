/* ${entity.name}´s Form generated by JSetup ${JSetupVersion} :  at ${.now} */  
import React, { Component } from "react";
import { FormGroup, ControlLabel, FormControl, HelpBlock } from "react-bootstrap";

import HttpRequest from "../core/HttpRequest";
import JSInputField from "../core/JSInputField";

import { isEmpty, isNotEmpty } from "../core/JSUtils";

export default class Form${firstUpper(entity.name)} extends React.Component {

    constructor() {
        super();
        this.service = new HttpRequest("/rs/crud/${firstLower(entity.name)}s");
        this.state = {
            ${firstLower(entity.name)}: {
                id: '',
			<#list entity.attributes as att>
		    	${firstLower(att.name)}: '',    	
			</#list>
            },

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
    getValidationState = (fieldName) => {
        if (this.state.validationFields[fieldName]) {
            if (!(this.state.validationFields[fieldName].isValid())) {
                return "error";
            }
        }
        return null;
    }
    submitFormHandle = (clickEvent) => {
        console.log("Salvando o objeto: " + this.state.${firstLower(entity.name)});
        this.service.save(
            this.state.${firstLower(entity.name)},
            data => {
                this.${firstLower(entity.name)} = data;
            },
            error => {
                console.error("error saving ${firstLower(entity.name)} ", error);
            }
        );
    }

    changeFormHandle = (changeEvent) => {
        /* Jogar essa atualização do state para fora, COMO?? */
        const target = changeEvent.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

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
                            <form>
                            <#list entity.attributes as att>
                                <FormGroup controlId="titulo" validationState={this.getValidationState("${firstLower(att.name)}")} >
                                    <ControlLabel>${firstUpper(att.displayName)}</ControlLabel>
								<#if att.plugin??>
                                    <JSInputField name="${firstLower(att.name)}" plugin="${firstLower(att.plugin)}" type="text" value={this.state.${firstLower(entity.name)}.${firstLower(att.name)}}  onChange={this.changeFormHandle} className="form-control" />
                                <#else>    
                                    <JSInputField name="${firstLower(att.name)}" type="text" value={this.state.${firstLower(entity.name)}.${firstLower(att.name)}}  onChange={this.changeFormHandle} className="form-control" />
								</#if>                                    
                                    <FormControl.Feedback />
                                    <HelpBlock className={this.state.validationFields.${firstLower(att.name)}.isValid() ? "hide" : "block"} >{this.state.validationFields.${firstLower(att.name)}.message}</HelpBlock>
                                </FormGroup>
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
                            <button onClick={this.handleClick} className="btn-lg btn btn-light" >
                                <i className=" fa fa-undo " />
                                &nbsp; Voltar para a listagem
                            </button>
                        </div >
                    </div >
                </div >
            </div >
        )
    }
}

