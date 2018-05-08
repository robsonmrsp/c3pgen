import 'nanoscroller/bin/css/nanoscroller.css';
import 'metismenu/dist/metisMenu.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import $ from 'jquery';

import 'eonasdan-bootstrap-datetimepicker';
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css';

import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.min.css';
import './assets/css/app.css';


import App from './App';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const nifty = require('./assets/css/theme/demo/js/nifty');
const bootstrap = require('bootstrap');
const nanoscroller = require('nanoscroller/bin/javascripts/jquery.nanoscroller.js');
const metisMenu = require('metismenu/dist/metisMenu.js');


const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    const newApp = require('./App').default;
    render(newApp);
  });
}
