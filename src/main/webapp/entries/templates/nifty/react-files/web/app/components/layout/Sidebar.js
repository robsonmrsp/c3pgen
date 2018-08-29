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
                                            <ul className="ul_filmes">
                                                <li id="filmes">
                                                    <NavLink to="/filmes/list">Filme </NavLink>
                                                </li>
                                            </ul>
                                            <ul className="ul_classificacaos">
                                                <li id="classificacaos">
                                                    <NavLink to="/classificacaos/list">Classificacao </NavLink>
                                                </li>
                                            </ul>
                                            <ul className="ul_users">
                                                <li id="users">
                                                    <NavLink to="/users/list">Usuário </NavLink>
                                                </li>
                                            </ul>
                                            <ul className="ul_roles">
                                                <li id="roles">
                                                    <NavLink to="/roles/list">Papel </NavLink>
                                                </li>
                                            </ul>
                                            <ul className="ul_permissions">
                                                <li id="permissions">
                                                    <NavLink to="/permissions/list">Permissão </NavLink>
                                                </li>
                                            </ul>
                                            <ul className="ul_groups">
                                                <li id="groups">
                                                    <NavLink to="/groups/list">Grupo de Permissões </NavLink>
                                                </li>
                                            </ul>
                                            <ul className="ul_items">
                                                <li id="items">
                                                    <NavLink to="/items/list">Item </NavLink>
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

