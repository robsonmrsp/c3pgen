import React from "react"
import { Panel } from "react-bootstrap"
import JSPagination from "../core/JSTablePagination"
import DatatableConfig from "../core/DatatableConfig"
import HttpRequest from "../core/HttpRequest"

export default class PageFilme extends React.Component {
    constructor(props) {
        super(props)
        this.service = new HttpRequest("/rs/crud/filmes");
        this.state = {
            datatableConfig: new DatatableConfig(),
            showFilter: false,
        }
    }
    componentDidMount = () => {
        this.paginate();
    }
    create = () => {
        // this.$router.push({ path: "/filmes/new/" });
    }

    editFilme = (_filme) => {
        // this.$router.push({ path: "/filmes/edit/" + _filme.id });
        console.log("editando filme ", _filme);
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

    removeFilme = (_filme) => {
        console.log("removendo filme ", _filme);
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
                console.error("error fetching filme´s page", error);
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
                            &nbsp;Pesquisa de Filme.
                        </h3>
                    </div>
                    <div className="panel-body">
                        <div id="messages_div" />
                        <form id="formFilmeFilter">
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
                                    <div className="form-group">
                                        <label className="control-label" htmlFor="tituloOriginal">Título Original</label>
                                        <input type="text" name="tituloOriginal" onChange={this.changeSearchFormHandle} value={this.state.datatableConfig.filterParameters.tituloOriginal} className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label" htmlFor="duracao">Duração</label>
                                        <input type="text" name="duracao" value={this.state.datatableConfig.filterParameters.duracao} className="form-control" />
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label" htmlFor="sinopse">Sinopse</label>
                                        <textarea rows="3" model={this.state.datatableConfig.filterParameters.sinopse} className="form-control" maxLength="2000" />
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label" htmlFor="titulo">Título</label>
                                        <input type="text" name="titulo" value={this.state.datatableConfig.filterParameters.titulo} className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label" htmlFor="diretor">Diretor</label>
                                        <input type="text" name="diretor" value={this.state.datatableConfig.filterParameters.diretor} className="form-control" />
                                    </div>

                                    <div id="groupInputTituloOriginal" className="form-group   ">
                                        <label className="control-label" htmlFor="inputTituloOriginal">Título</label>
                                        <input type="text" value={this.state.datatableConfig.filterParameters.tituloOriginal} placeholder="Pesquise pelo Título" className="form-control" />
                                    </div>
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
                                            <th className="th-tituloOriginal">
                                                <a >
                                                    <i className="fa " />
                                                    Título Original
                                                </a>
                                            </th>
                                            <th className="th-poster">
                                                <a >
                                                    <i className="fa " />
                                                    Poster
                                                </a>
                                            </th>
                                            <th className="th-duracao">
                                                <a >
                                                    <i className="fa " />
                                                    Duração
                                                </a>
                                            </th>
                                            <th className="th-dataLancamento">
                                                <a >
                                                    <i className="fa " />
                                                    Data do Lançamento
                                                </a>
                                            </th>
                                            <th className="th-sinopse">
                                                <a >
                                                    <i className="fa " />
                                                    Sinopse
                                                </a>
                                            </th>
                                            <th className="th-titulo">
                                                <a >
                                                    <i className="fa " />
                                                    Título
                                                </a>
                                            </th>
                                            <th className="th-diretor">
                                                <a >
                                                    <i className="fa " />
                                                    Diretor
									            </a>
                                            </th>
                                            <th className="th-linguagem">
                                                <a >
                                                    <i className="fa " />
                                                    Linguagem
									            </a>
                                            </th>
                                            <th className="th-classificacao">
                                                <a >
                                                    <i className="fa " />
                                                    Classificação
									            </a>
                                            </th>
                                            <th className="td-actions"> Ações </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.datatableConfig.items.map((filme, index) => {
                                                return (
                                                    <tr key={filme.id}>
                                                        <td>{filme.tituloOriginal}</td>
                                                        <td>{filme.poster}</td>
                                                        <td>{filme.duracao}</td>
                                                        <td>{filme.dataLancamento}</td>
                                                        <td>{filme.sinopse}</td>
                                                        <td>{filme.titulo}</td>
                                                        <td>{filme.diretor}</td>
                                                        <td>{filme.linguagem && filme.linguagem.nome}</td>
                                                        <td>{filme.classificacao && filme.classificacao.nome}</td>
                                                        <td className="td-actions action-butons-cell">
                                                            <button className="btn btn-xs  btn-primary " onClick={(event) => this.editFilme(filme)} data-toggle="tooltip" data-placement="top" title="" data-original-title="Editar Filme">
                                                                <i className="fa fa-pencil fa-lg" />
                                                            </button>

                                                            <button className="btn btn-xs btn-danger " onClick={(event) => this.removeFilme(filme)} data-toggle="tooltip" data-placement="top" title="" data-original-title="Remover Filme">
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
