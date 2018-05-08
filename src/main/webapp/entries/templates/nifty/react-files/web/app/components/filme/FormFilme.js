import React, { Component } from "react";
import { FormGroup, ControlLabel, FormControl, HelpBlock } from "react-bootstrap";

import HttpRequest from "../core/HttpRequest";
import JSInputField from "../core/JSInputField";
import { required, mustMatch, minLength } from '../core/validation/rules';


export default class FormFilme extends React.Component {

    constructor() {
        super();
        this.service = new HttpRequest("/rs/crud/filmes");
        this.state = {
            filme: {
                id: '',
                titulo: "ABC",
                tituloOriginal: "ABCDE",
                poster: '',
                duracao: 125.5,
                dataLancamento: '',
                sinopse: '',
                diretor: '',
            },

            // criar um objeto para encapsular o validador abaixo... assim poderemos NAO definir a mensagem. Tal objeto teria apenas o metodo isValid e a message.
            validationFields: {
                titulo: {
                    isValid: () => {
                        return this.state.filme.titulo.length !== 0;
                    },
                    message: "Título é obrigatorio",
                }
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
        console.log("Salvando o objeto: " + this.state.filme);
        this.service.save(
            this.state.filme,
            data => {
                this.filme = data;
            },
            error => {
                console.error("error saving filme ", error);
            }
        );
    }

    // precisa ser melhorado para exibir menos código e tratar os campos de valores diferentes, como booleanos com on, e off, por exemplo
    changeFormHandle = (changeEvent) => {
        /* Jogar essa atualização do state para fora, COMO?? */
        const target = changeEvent.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        const filme = { ...this.state.filme };
        filme[name] = value;
        this.setState({ filme });
    }

    render = () => {
        return (
            <div className="panel">
                <div className="panel-heading">
                    <h3 className="panel-title">Cadastro de Filme</h3>
                </div>
                <div className="panel-body">
                    <div className="panel">
                        <div className="panel-body">
                            <form>
                                <FormGroup controlId="titulo" validationState={this.getValidationState("titulo")} >
                                    <ControlLabel>Título</ControlLabel>
                                    <JSInputField name="titulo" type="text" value={this.state.filme.titulo} placeholder="Título" onChange={this.changeFormHandle} className="form-control" />
                                    <FormControl.Feedback />
                                    <HelpBlock className={this.state.validationFields.titulo.isValid() ? "hide" : "block"} >{this.state.validationFields.titulo.message}</HelpBlock>
                                </FormGroup>

                                <FormGroup controlId="tituloOriginal" validationState={this.getValidationState("tituloOriginal")} >
                                    <ControlLabel>Título Original</ControlLabel>
                                    <JSInputField name="tituloOriginal" type="text" value={this.state.filme.tituloOriginal} placeholder="Título Original" onChange={this.changeFormHandle} className="form-control" />
                                    <FormControl.Feedback />
                                </FormGroup>

                                <FormGroup controlId="duracao" validationState={this.getValidationState("duracao")} >
                                    <ControlLabel>Duração</ControlLabel>
                                    <JSInputField name="duracao" plugin="decimal" type="text" value={this.state.filme.duracao} placeholder="duracao" onChange={this.changeFormHandle} className="form-control" />
                                    <FormControl.Feedback />
                                </FormGroup>

                                <FormGroup controlId="Data de Lancamento" validationState={this.getValidationState("dataLancamento")} >
                                    <ControlLabel>Data de Lançamento</ControlLabel>
                                    <JSInputField name="dataLancamento" plugin="date" type="text" value={this.state.filme.dataLancamento} placeholder="dataLancamento" onChange={this.changeFormHandle} className="form-control" />
                                    <FormControl.Feedback />
                                </FormGroup>

                                <FormGroup controlId="sinopse" validationState={this.getValidationState("sinopse")} >
                                    <ControlLabel>Sinópse</ControlLabel>
                                    <JSInputField name="sinopse" plugin="textarea" value={this.state.filme.sinopse} placeholder="Sinópse" onChange={this.changeFormHandle} className="form-control" />
                                    <FormControl.Feedback />
                                </FormGroup>

                                <FormGroup controlId="diretor" validationState={this.getValidationState("diretor")} >
                                    <ControlLabel>Diretor</ControlLabel>
                                    <JSInputField name="diretor" type="text" value={this.state.filme.diretor} placeholder="Diretor" onChange={this.changeFormHandle} className="form-control" />
                                    <FormControl.Feedback />
                                </FormGroup>
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
