import React, { Component } from "react";

const Header = () => {
    return (
        <header id="navbar">
            <div id="navbar-container" className="boxed">
                <div className="navbar-header">
                    <a href="/change-me" className="navbar-brand no-print">
                        <img src="images/logo.png" alt="Nifty Logo" className="brand-icon" />
                        <div className="brand-title">
                            <span className="brand-text">React Admin</span>
                        </div>
                    </a>
                </div>
                <div className="navbar-content clearfix no-print">
                    <ul className="nav navbar-top-links pull-left">
                        <li className="tgl-menu-btn">
                            <a href="/change-me" className="mainnav-toggle" >
                                <i className="fa demo-pli-view-list" />
                            </a>
                        </li>
                        <li className="mega-dropdown">
                            <a href="/change-me" className="mega-dropdown-toggle">
                                <i className="demo-pli-layout-grid" />
                            </a>
                            <div className="dropdown-menu mega-dropdown-menu" />
                        </li>
                    </ul>
                    <span className="main-header" />
                    <ul className="nav navbar-top-links pull-right">

                        <li id="dropdown-user" className="dropdown">
                            <a href="/change-me" data-toggle="dropdown" className="dropdown-toggle text-right">
                                <span className="pull-right">
                                    <i className="fa fa-user-o ic-user" />
                                </span>
                                <div className="index-username hidden-xs">chico</div>
                            </a>
                            <div className="dropdown-menu dropdown-menu-md dropdown-menu-right panel-default">
                                <br />
                                <ul className="head-list">
                                    <li>
                                        <a href="/profile">
                                            <i className="fa fa-user-o icon-lg icon-fw" />
                                            Meus Dados
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/help">
                                            <i className="fa fa-info-circle icon-lg icon-fw" />
                                            Ajuda
                                        </a>
                                    </li>
                                </ul>
                                <div className="pad-all text-right">
                                    <a href="/logout" className="btn btn-primary">
                                        <i className="fa fa-sign-out" />
                                        Sair
                                    </a>
                                </div>
                            </div>
                        </li>
                        <li>
                            <a href="/change-me" className="aside-toggle navbar-aside-icon">
                                <i className="pci-ver-dots" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header;
