/** ${entity.name}´s Search Page generated by JSetup ${JSetupVersion} :  at ${.now}  **/
import React from "react"
import JSPagination from "../core/JSTablePagination"
import DatatableConfig from "../core/DatatableConfig"
import { FormGroup, ControlLabel, FormControl, HelpBlock } from "react-bootstrap";

import HttpRequest from "../core/HttpRequest";
import JSInputField from "../core/JSInputField";

export default class Page${firstUpper(entity.name)} extends React.Component {
    constructor(props) {
        super(props)
        this.service = new HttpRequest("/rs/crud/${firstLower(entity.name)}s");
        this.state = {
            datatableConfig: new DatatableConfig(),
            showFilter: false,
        }
    }
    componentDidMount = () => {
        this.paginate();
    }
    create = () => {
        // this.$router.push({ path: "/${firstLower(entity.name)}s/new/" });
    }

    edit${firstUpper(entity.name)} = (_${firstLower(entity.name)}) => {
        // this.$router.push({ path: "/${firstLower(entity.name)}s/edit/" + _${firstLower(entity.name)}.id });
        console.log("editando ${firstLower(entity.name)} ", _${firstLower(entity.name)});
    }

    reset = () => {
    }

    // será que é necessário usar o state??
    changePageSize = (event) => {
        const target = event.target;
        const theDatatableConfig = Object.assign(new DatatableConfig(), this.state.datatableConfig)
        theDatatableConfig.pageSize = parseInt(target.value, 10);
        theDatatableConfig.page = 1;

        // o estado do 
        this.setState({ datatableConfig: theDatatableConfig }, this.paginate);
    }

    remove${firstUpper(entity.name)} = (_${firstLower(entity.name)}) => {
        console.log("removendo ${firstLower(entity.name)} ", _${firstLower(entity.name)});
    }

    paginate = (pageIndex = 1) => {
        const stateConf = this.state.datatableConfig;
        const datatableConfig = Object.assign(new DatatableConfig(), this.state.datatableConfig)
        datatableConfig.page = pageIndex;
        datatableConfig.loading = true;

        this.setState({ datatableConfig });

        this.service.getPage(
            datatableConfig,
            data => {
                datatableConfig.loading = false;
                datatableConfig.totalRecords = data.totalRecords;
                this.setState({ datatableConfig });
            },

            error => {
                console.error("error fetching ${firstLower(entity.name)}´s page", error);
            }
        );
    }

    changeSearchFormHandle = (event) => {
        /* Jogar essa atualização do state para fora, COMO?? */
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        const datatableConfig = { ...this.state.datatableConfig };
        datatableConfig.filterParameters[name] = value;

        this.setState({ datatableConfig });
    }
    showAdvancedSearchHandler = () => {
        console.log("Chamou o advanceSeach");
    }
    render = () => {
        return (
            <div >
                <div className="panel">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            <i className="fa fa-search" />
                            &nbsp;Pesquisa de ${firstUpper(entity.displayName)}.
                        </h3>
                    </div>
                    <div className="panel-body">
                        <div id="messages_div" />
                        <form id="form${firstUpper(entity.name)}Filter">
                            <div className="row">
                                <div className="page-toolbar">
                                    <div className="col-sm-6">
                                        <button type="button" onClick={this.create} className="btn btn-info">
                                            Novo Registro
                                        </button>
                                        <button className="btn btn-default ">Limpar</button>
                                        <button type="button" className="btn btn-default" onClick={() => this.setState({ showFilter: !this.state.showFilter })}  > Pesquisa avançada... </button>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="input-group">
                                            <input type="text" value={this.state.datatableConfig.filterParameters.tituloOriginal} className=" form-control" placeholder="Pesquisar Filme por Título Original" />
                                            <span id="query" className="input-group-btn ">
                                                <button type="button" onClick={(event) => this.paginate()} className="btn btn-default" >
                                                    Pesquisar
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="panel" style={{ display: this.state.showFilter ? "block" : "none" }} >
                                <div className="panel-heading">
                                    <h5 className="panel-title">Filtros avançados</h5>
                                </div>
                                <div className="panel-body">
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
                                    <div>
                                        <button type="button" onClick={(event) => this.paginate()} className="btn btn-info btn-sm search-button loading-button" >
                                            <i className="fa fa-search" />
                                            &nbsp;Pesquisar
                                            </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className="cente">
                            <div className="table-responsive ">
                                <div className="">
                                    <i className="fa fa-align-justify" />
                                    &nbsp;Resultado da pesquisa
                                </div>
                                <table className="table table-striped table-bordered table-hover dataTable no-footer">
                                    <thead>
                                        <tr>
                                 			<#list entity.attributes as att>
                                            <th className="th-${firstLower(att.name)}">
                                                <a >
                                                    <i className="fa " />
                                                    ${firstLower(att.displayName)}
                                                </a>
                                            </th>
											</#list>
                                            <th className="td-actions"> Ações </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.datatableConfig.items.map((${firstLower(entity.name)}, index) => {
                                                return (
                                                    <tr key={${firstLower(entity.name)}.id}>
                                 					<#list entity.attributes as att>
                                                        <td>{${firstLower(entity.name)}.${firstLower(att.name)}}</td>
													</#list>
                                                        <td className="td-actions action-butons-cell">
                                                            <button className="btn btn-xs  btn-primary " onClick={(event) => this.edit${firstUpper(entity.name)}(${firstLower(entity.name)})} data-toggle="tooltip" data-placement="top" title="" data-original-title="Editar Filme">
                                                                <i className="fa fa-pencil fa-lg" />
                                                            </button>

                                                            <button className="btn btn-xs btn-danger " onClick={(event) => this.remove${firstUpper(entity.name)}(${firstLower(entity.name)})} data-toggle="tooltip" data-placement="top" title="" data-original-title="Remover ${firstUpper(entity.displayName)}">
                                                                <i className="fa fa-trash fa-lg" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="row page-footer-components">
                                <div className="col-md-6" >
                                    <div className=" float-left ">
                                        {this.state.datatableConfig.loading ?
                                            <span className="loading-elements">
                                                <span className="">
                                                    <i className="fa fa-spinner fa-spin fa-fw" />
                                                    Carregando...
								            </span>
                                            </span>
                                            :
                                            <span className="has-elements" >
                                                Registros
								                <span className="initial-page">&nbsp;{this.state.datatableConfig.first}&nbsp;</span>
                                                a
								                <span className="final-page">&nbsp;{this.state.datatableConfig.last}&nbsp;</span>
                                                de
								                <span className="total-records">&nbsp;{this.state.datatableConfig.totalRecords}</span>
                                                . Exibindo até
								                <select className="combo-page-size" onChange={this.changePageSize} value={this.state.datatableConfig.pageSize}>
                                                    <option value="3">3</option>
                                                    <option value="5">5</option>
                                                    <option value="10" >10</option>
                                                    <option value="25">25</option>
                                                    <option value="50">50</option>
                                                </select>
                                                por página.
							                </span>
                                        }
                                    </div>
                                </div>
                                <div className="col-md-6" >
                                    <div className="pull-right" >
                                        <JSPagination onPaginate={this.paginate} totalItems={this.state.datatableConfig.totalRecords} page={this.state.datatableConfig.page} pageSize={this.state.datatableConfig.pageSize} />
                                    </div>
                                </div >
                            </div >
                        </div >
                    </div >
                </div >
            </div >
        );
    }
}

