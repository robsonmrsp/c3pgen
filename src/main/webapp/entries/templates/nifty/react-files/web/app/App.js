
import { HashRouter } from "react-router-dom";

import React from 'react';
import Root from './router/Root';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';

import './assets/css/custom.css';

export default class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <div id="container" className="effect aside-float aside-bright navbar-fixed mainnav-fixed aside-fixed print-content mainnav-lg">
          <Header />
          <div className="boxed">
            <div id="content-container">
              <div id="page-head">
                <div id="page-title">
                  <h1 className="page-header text-overflow">Bootstrap Tables</h1>
                </div>
                <ol className="breadcrumb">
                  <li><a href="#"><i className="demo-pli-home" /></a></li>
                  <li><a href="#">Tables</a></li>
                  <li className="active">Bootstrap Tables</li>
                </ol>
              </div>
              <div id="page-content">
                <Root />
              </div>
            </div>
            <Sidebar />
          </div>
        </div>
      </HashRouter>
    )
  }
}

