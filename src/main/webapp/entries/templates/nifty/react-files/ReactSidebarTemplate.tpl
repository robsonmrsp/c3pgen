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
											<#list application.entities as entity>
                                            <ul className="ul_${firstLower(entity.name)}s">
		                                       <li id="${firstLower(entity.name)}s">
                                                    <NavLink to="/${firstLower(entity.name)}s/list">${entity.displayName} </NavLink>
                                                </li>
                                            </ul>
											</#list>
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

