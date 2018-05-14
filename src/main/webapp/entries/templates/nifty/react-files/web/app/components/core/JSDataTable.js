import React from 'react';
import JSPagination from "../core/JSTablePagination"
import DatatableConfig from "../core/DatatableConfig"


export default class JSDataTable extends React.Component {

    // props = datatableConfig
    constructor(props) {
        super(props)
        console.log('');
    }
    changePageSize = (event) => {
        const target = event.target;
        const theDatatableConfig = Object.assign(new DatatableConfig(), this.props.datatableConfig)
        theDatatableConfig.pageSize = parseInt(target.value, 10);
        theDatatableConfig.page = 1;

        // o estado do 
        // this.setState({ datatableConfig: theDatatableConfig }, this.props.paginate);
    }

    render = () => {
        return (
            <div className="center" >
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
                                this.props.datatableConfig.items.map((item, index) => {
                                    return (
                                        <tr key={item.id}>
                                            this.prop.columns.map((column) => {
                                                return (<td>{item[column.name]}</td>)
                                            }
                                        )
                                            <td className="td-actions action-butons-cell">
                                                <button className="btn btn-xs  btn-primary " onClick={(event) => this.editFilme(item)} data-toggle="tooltip" data-placement="top" title="" data-original-title="Editar Filme">
                                                    <i className="fa fa-pencil fa-lg" />
                                                </button>

                                                <button className="btn btn-xs btn-danger " onClick={(event) => this.removeFilme(item)} data-toggle="tooltip" data-placement="top" title="" data-original-title="Remover Filme">
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
                            {this.props.datatableConfig.loading ?
                                <span className="loading-elements">
                                    <span className="">
                                        <i className="fa fa-spinner fa-spin fa-fw" />
                                        Carregando...
                            </span>
                                </span>
                                :
                                <span className="has-elements" >
                                    Registros
                                <span className="initial-page">&nbsp;{this.props.datatableConfig.first}&nbsp;</span>
                                    a
                                <span className="final-page">&nbsp;{this.props.datatableConfig.last}&nbsp;</span>
                                    de
                                <span className="total-records">&nbsp;{this.props.datatableConfig.totalRecords}</span>
                                    . Exibindo até
                                <select className="combo-page-size" onChange={this.changePageSize} value={this.props.datatableConfig.pageSize}>
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
                            <JSPagination onPaginate={this.props.paginate} totalItems={this.props.datatableConfig.totalRecords} page={this.props.datatableConfig.page} pageSize={this.props.datatableConfig.pageSize} />
                        </div>
                    </div >
                </div >
            </div >
        );
    }
}
