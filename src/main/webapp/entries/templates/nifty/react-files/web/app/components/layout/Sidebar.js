import React from "react";
import { HashRouter as Router, NavLink } from "react-router-dom";

export default class Sidebar extends React.Component {
    render() {
        return (
            <Router>
                <nav id="mainnav-container" className="sidebar" >
                    <div id="mainnav">
                        <div id="mainnav-menu-wrap">
                            <div className="nano">
                                <div className="nano-content">
                                    <div id="mainnav-profile" className="mainnav-profile">
                                        <div className="profile-wrap text-center">
                                            <div className="pad-btm">
                                                <img className="img-circle img-md" src="images/no_photo.jpg" alt="Profile " />
                                            </div>
                                            <a href="#profile-nav" className="box-block" data-toggle="collapse" aria-expanded="false">
                                                <p className="mnp-name">System Admin</p>
                                                <span className="mnp-desc">contato@jsetup.com</span>
                                            </a>
                                        </div>
                                    </div>
                                    <ul id="mainnav-menu" className="list-group">
                                        <li className="list-divider" />
                                        <li className="list-header">Acesso Rápido</li>
                                        <li>
                                            <a href="/dashboards">
                                                <i className="fa fa-line-chart" />
                                                <span className="menu-title">Dashboard</span>
                                            </a>
                                        </li>
                                        <li className="list-divider" />
                                        <li>
                                            <a href="/change-me">
                                                <i className="fa fa-table" />
                                                <span className="menu-title">Cadastros</span>
                                                <i className="arrow" />
                                            </a>
                                            <ul className="">
													                                       <li id="linguagems">
                                                    <NavLink to="/linguagems/list"> Pesquisa de Linguagem </NavLink>
                                                </li>
                                            </ul>
		                                       <li id="avaliacaos">
                                                    <NavLink to="/avaliacaos/list"> Pesquisa de Avaliacao </NavLink>
                                                </li>
                                            </ul>
		                                       <li id="assinantes">
                                                    <NavLink to="/assinantes/list"> Pesquisa de Assinante </NavLink>
                                                </li>
                                            </ul>
		                                       <li id="generos">
                                                    <NavLink to="/generos/list"> Pesquisa de Genero </NavLink>
                                                </li>
                                            </ul>
		                                       <li id="criticos">
                                                    <NavLink to="/criticos/list"> Pesquisa de Critico </NavLink>
                                                </li>
                                            </ul>
		                                       <li id="filmes">
                                                    <NavLink to="/filmes/list"> Pesquisa de Filme </NavLink>
                                                </li>
                                            </ul>
		                                       <li id="visualizacaos">
                                                    <NavLink to="/visualizacaos/list"> Pesquisa de Visualizacao </NavLink>
                                                </li>
                                            </ul>
		                                       <li id="classificacaos">
                                                    <NavLink to="/classificacaos/list"> Pesquisa de Classificacao </NavLink>
                                                </li>
                                            </ul>
		                                       <li id="ators">
                                                    <NavLink to="/ators/list"> Pesquisa de Ator </NavLink>
                                                </li>
                                            </ul>
		                                       <li id="users">
                                                    <NavLink to="/users/list"> Pesquisa de User </NavLink>
                                                </li>
                                            </ul>
		                                       <li id="roles">
                                                    <NavLink to="/roles/list"> Pesquisa de Role </NavLink>
                                                </li>
                                            </ul>
		                                       <li id="permissions">
                                                    <NavLink to="/permissions/list"> Pesquisa de Permission </NavLink>
                                                </li>
                                            </ul>
		                                       <li id="groups">
                                                    <NavLink to="/groups/list"> Pesquisa de Group </NavLink>
                                                </li>
                                            </ul>
		                                       <li id="items">
                                                    <NavLink to="/items/list"> Pesquisa de Item </NavLink>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="list-divider" />
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </Router>
        );
    }
}

