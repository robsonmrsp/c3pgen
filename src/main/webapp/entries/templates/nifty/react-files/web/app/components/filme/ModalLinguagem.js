import React from "react"
import { Modal } from 'react-bootstrap'

import JSPagination from "../core/JSTablePagination"
import DatatableConfig from "../core/DatatableConfig"
import HttpRequest from "../core/HttpRequest"

export default class ModalLinguagem extends React.Component {
    // por garantia, será gerado um objeto com os mesmos atributos do objeto passado, pelo menos os atributos
    //  mais simples.Assim o usuário do componente poderá escolher qualquer um desses para ver no campo de texto
    static defaultProps = {
        value: {
            id: "",
            nome: "",
            tipo: "",
        },
        displayValue: "name",
        idValue: "id"
    }
    constructor(props) {
        super(props)
        this.service = new HttpRequest("/rs/crud/linguagems");
        this.state = {
            datatableConfig: new DatatableConfig(5),
            showModal: false
        }
    }
    componentDidMount = () => {
        this.paginate();
    }

    onSelect = (linguagem) => {
        console.log(linguagem)
        this.props.onChange(linguagem);
        this.closeModal();
    }

    closeModal = () => {
        this.setState({ showModal: false });
    }

    openModal = () => {
        this.setState({ showModal: true });
    }

    reset = () => {
    }

    // será que é necessário usar o state??
    changePageSize = (event) => {
        const target = event.target;
        const theDatatableConfig = Object.assign(new DatatableConfig(), this.state.datatableConfig)
        theDatatableConfig.pageSize = parseInt(target.value, 10);
        theDatatableConfig.page = 1;

        this.setState({ datatableConfig: theDatatableConfig }, this.paginate);
    }

    removeLinguagem = (_linguagem) => {
        console.log("removendo linguagem ", _linguagem);
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
                console.error("error fetching linguagem´s page", error);
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

    render = () => {
        return (
            <div >
                <div className="input-group mar-btm">
                    <input type="text" className="form-control" value={this.props.value && this.props.value[this.props.displayValue]} placeholder="Nome" />
                    <span className="input-group-addon" onClick={this.openModal}>
                        <i className="fa fa-search" />
                    </span>
                </div>

                <Modal show={this.state.showModal} onHide={this.closeModal} bsSize="large" >
                    <Modal.Header closeButton>
                        <Modal.Title>Pesquisa de Linguagem</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="">
                            <div id="groupInputModalCnpj" className="form-group col-sm-	col-md-	col-lg-  ">
                                <label className="control-label" htmlFor="inputModalCnpj">Nome</label>
                                <input type="text" id="inputModalCnpj" placeholder="" className="form-control inputModalCnpj" />
                            </div>
                            <div id="groupInputModalTradingName" className="form-group col-sm-	col-md-	col-lg-  ">
                                <label className="control-label" htmlFor="inputModalTradingName">Descricao</label>
                                <input type="text" id="inputModalTradingName" placeholder="" className="form-control inputModalTradingName" />
                            </div>
                            <div className="form-actions spinner" id="spinSupplier">
                                <button type="button" id="btnSearchSupplier" className="btnSearchSupplier btn btn-primary btn-large button-loading" data-loading-text="<i className='fa fa-spinner fa-spin '></i> Pesquisando...">
                                    <i className="fa fa-search" />
                                    &nbsp;Pesquisar
						        </button>
                                <button type="button" id="btnClearSupplier" className="btnClearSupplier btn btn-info btn-large">
                                    <i className="fa fa-trash" />
                                    &nbsp;Nova Pesquisa
						        </button>
                            </div>

                            <div className="">
                                <div className="cente">
                                    <h3 className="header smaller lighter blue">Resultados</h3>
                                    <div className="table-responsive ">
                                        <table className="demo-add-niftycheck table table-hover">
                                            <thead>
                                                <tr>
                                                    <th className="th-tituloOriginal">
                                                        <a >
                                                            <i className="fa " />
                                                            Nome
                                                        </a>
                                                    </th>
                                                    <th className="th-poster">
                                                        <a >
                                                            <i className="fa " />
                                                            Descrição
                                                        </a>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.datatableConfig.items.map((linguagem, index) => {
                                                        return (
                                                            <tr key={linguagem.id} onClick={() => this.onSelect(linguagem)} >
                                                                <td>{linguagem.nome}</td>
                                                                <td>{linguagem.descricao}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                                {this.state.datatableConfig.items.length === 0 ?
                                                    <tr className="empty"><td colSpan="2">Sem registros</td></tr> : null
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="row page-footer-components fixed-table-pagination">
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
                    </Modal.Body>
                </Modal>
            </div >
        );
    }
}
