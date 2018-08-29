import React, { Component } from "react";

const Header = () => {
    return (
        <header id="navbar">
            <div id="navbar-container" className="boxed">
                <div className="navbar-header">
                    <a href="index.html" className="navbar-brand">
                        <img src=" images/logo.png" alt="Nifty Logo" className="brand-icon" />
                        <div className="brand-title">
                            <span className="brand-text">Nifty</span>
                        </div>
                    </a>
                </div>
                <div className="navbar-content">
                    <ul className="nav navbar-top-links">
                        <li className="tgl-menu-btn">
                            <a className="mainnav-toggle" href="#">
                                <i className="demo-pli-list-view" />
                            </a>
                        </li>
                        <li>
                            <div className="custom-search-form">
                                <label className="btn btn-trans" forHtml="search-input" data-toggle="collapse" data-target="#nav-searchbox">
                                    <i className="demo-pli-magnifi-glass" />
                                </label>
                                <form>
                                    <div className="search-container collapse" id="nav-searchbox">
                                        <input id="search-input" type="text" className="form-control" placeholder="Type for search..." />
                                    </div>
                                </form>
                            </div>
                        </li>
                        {/* <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~--> */}
                        {/* <!--End Search--> */}
                    </ul>
                    <ul className="nav navbar-top-links">
                        <li className="mega-dropdown">
                            <a href="#" className="mega-dropdown-toggle">
                                <i className="demo-pli-layout-grid" />
                            </a>
                            <div className="dropdown-menu mega-dropdown-menu">
                                <div className="row">
                                    <div className="col-sm-4 col-md-3">
                                        <ul className="list-unstyled">
                                            <li className="dropdown-header"><i className="demo-pli-file icon-lg icon-fw" /> Pages</li>
                                            <li><a href="#">Profile</a></li>
                                            <li><a href="#">Search Result</a></li>
                                            <li><a href="#">FAQ</a></li>
                                            <li><a href="#">Sreen Lock</a></li>
                                            <li><a href="#">Maintenance</a></li>
                                            <li><a href="#">Invoice</a></li>
                                            <li><a href="#" className="disabled">Disabled</a></li>                                        </ul>

                                    </div>
                                    <div className="col-sm-4 col-md-3">
                                        <ul className="list-unstyled">
                                            <li className="dropdown-header"><i className="demo-pli-mail icon-lg icon-fw" /> Mailbox</li>
                                            <li><a href="#"><span className="pull-right label label-danger">Hot</span>Indox</a></li>
                                            <li><a href="#">Read Message</a></li>
                                            <li><a href="#">Compose</a></li>
                                            <li><a href="#">Template</a></li>
                                        </ul>
                                        <p className="pad-top text-main text-sm text-uppercase text-bold"><i className="icon-lg demo-pli-calendar-4 icon-fw" />News</p>
                                        <p className="pad-top mar-top bord-top text-sm">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.</p>
                                    </div>
                                    <div className="col-sm-4 col-md-3">
                                        <ul className="list-unstyled">
                                            <li>
                                                <a href="#" className="media mar-btm">
                                                    <span className="badge badge-success pull-right">90%</span>
                                                    <div className="media-left">
                                                        <i className="demo-pli-data-settings icon-2x" />
                                                    </div>
                                                    <div className="media-body">
                                                        <p className="text-semibold text-main mar-no">Data Backup</p>
                                                        <small className="text-muted">This is the item description</small>
                                                    </div>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="media mar-btm">
                                                    <div className="media-left">
                                                        <i className="demo-pli-support icon-2x" />
                                                    </div>
                                                    <div className="media-body">
                                                        <p className="text-semibold text-main mar-no">Support</p>
                                                        <small className="text-muted">This is the item description</small>
                                                    </div>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="media mar-btm">
                                                    <div className="media-left">
                                                        <i className="demo-pli-computer-secure icon-2x" />
                                                    </div>
                                                    <div className="media-body">
                                                        <p className="text-semibold text-main mar-no">Security</p>
                                                        <small className="text-muted">This is the item description</small>
                                                    </div>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="media mar-btm">
                                                    <div className="media-left">
                                                        <i className="demo-pli-map-2 icon-2x" />
                                                    </div>
                                                    <div className="media-body">
                                                        <p className="text-semibold text-main mar-no">Location</p>
                                                        <small className="text-muted">This is the item description</small>
                                                    </div>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-sm-12 col-md-3">
                                        <p className="dropdown-header"><i className="demo-pli-file-jpg icon-lg icon-fw" /> Gallery</p>
                                        <div className="row img-gallery">
                                            <div className="col-xs-4">
                                                <img className="img-responsive" src=" images/thumbs/img-1.jpg" alt="thumbs" />
                                            </div>
                                            <div className="col-xs-4">
                                                <img className="img-responsive" src=" images/thumbs/img-3.jpg" alt="thumbs" />
                                            </div>
                                            <div className="col-xs-4">
                                                <img className="img-responsive" src=" images/thumbs/img-2.jpg" alt="thumbs" />
                                            </div>
                                            <div className="col-xs-4">
                                                <img className="img-responsive" src=" images/thumbs/img-4.jpg" alt="thumbs" />
                                            </div>
                                            <div className="col-xs-4">
                                                <img className="img-responsive" src=" images/thumbs/img-6.jpg" alt="thumbs" />
                                            </div>
                                            <div className="col-xs-4">
                                                <img className="img-responsive" src=" images/thumbs/img-5.jpg" alt="thumbs" />
                                            </div>
                                        </div>
                                        <a href="#" className="btn btn-block btn-primary">Browse Gallery</a>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="dropdown">
                            <a href="#" data-toggle="dropdown" className="dropdown-toggle">
                                <i className="demo-pli-bell" />
                                <span className="badge badge-header badge-danger" />
                            </a>
                            <div className="dropdown-menu dropdown-menu-md dropdown-menu-right">
                                <div className="nano scrollable">
                                    <div className="nano-content">
                                        <ul className="head-list">
                                            <li>
                                                <a href="#" className="media add-tooltip" data-title="Used space : 95%" data-container="body" data-placement="bottom">
                                                    <div className="media-left">
                                                        <i className="demo-pli-data-settings icon-2x text-main" />
                                                    </div>
                                                    <div className="media-body">
                                                        <p className="text-nowrap text-main text-semibold">HDD is full</p>
                                                        <div className="progress progress-sm mar-no">
                                                            <div style={{ width: '95%' }} className="progress-bar progress-bar-danger">
                                                                <span className="sr-only">95% Complete</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="media" href="#">
                                                    <div className="media-left">
                                                        <i className="demo-pli-file-edit icon-2x" />
                                                    </div>
                                                    <div className="media-body">
                                                        <p className="mar-no text-nowrap text-main text-semibold">Write a news article</p>
                                                        <small>Last Update 8 hours ago</small>
                                                    </div>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="media" href="#">
                                                    <span className="label label-info pull-right">New</span>
                                                    <div className="media-left">
                                                        <i className="demo-pli-speech-bubble-7 icon-2x" />
                                                    </div>
                                                    <div className="media-body">
                                                        <p className="mar-no text-nowrap text-main text-semibold">Comment Sorting</p>
                                                        <small>Last Update 8 hours ago</small>
                                                    </div>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="media" href="#">
                                                    <div className="media-left">
                                                        <i className="demo-pli-add-user-star icon-2x" />
                                                    </div>
                                                    <div className="media-body">
                                                        <p className="mar-no text-nowrap text-main text-semibold">New User Registered</p>
                                                        <small>4 minutes ago</small>
                                                    </div>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="media" href="#">
                                                    <div className="media-left">
                                                        <img className="img-circle img-sm" alt="Profile Pic" src=" images/profile-photos/9.png" />
                                                    </div>
                                                    <div className="media-body">
                                                        <p className="mar-no text-nowrap text-main text-semibold">Lucy sent you a message</p>
                                                        <small>30 minutes ago</small>
                                                    </div>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="media" href="#">
                                                    <div className="media-left">
                                                        <img className="img-circle img-sm" alt="Profile Pic" src=" images/profile-photos/3.png" />
                                                    </div>
                                                    <div className="media-body">
                                                        <p className="mar-no text-nowrap text-main text-semibold">Jackson sent you a message</p>
                                                        <small>40 minutes ago</small>
                                                    </div>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="pad-all bord-top">
                                    <a href="#" className="btn-link text-main box-block">
                                        <i className="pci-chevron chevron-right pull-right" />Show All Notifications
                                    </a>
                                </div>
                            </div>
                        </li>
                        <li id="dropdown-user" className="dropdown">
                            <a href="#" data-toggle="dropdown" className="dropdown-toggle text-right">
                                <span className="ic-user pull-right">
                                    <i className="demo-pli-male" />
                                </span>
                            </a>


                            <div className="dropdown-menu dropdown-menu-sm dropdown-menu-right panel-default">
                                <ul className="head-list">
                                    <li>
                                        <a href="#"><i className="demo-pli-male icon-lg icon-fw" />  Profile</a>
                                    </li>
                                    <li>
                                        <a href="#"><span className="badge badge-danger pull-right">9</span><i className="demo-pli-mail icon-lg icon-fw" /> Messages</a>
                                    </li>
                                    <li>
                                        <a href="#"><span className="label label-success pull-right">New</span><i className="demo-pli-gear icon-lg icon-fw" /> Settings</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="demo-pli-computer-secure icon-lg icon-fw" /> Lock screen</a>
                                    </li>
                                    <li>
                                        <a href="pages-login.html"><i className="demo-pli-unlock icon-lg icon-fw" /> Logout</a>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li>
                            <a href="#" className="aside-toggle">
                                <i className="demo-pli-dot-vertical" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </header >
    )
}

export default Header;
