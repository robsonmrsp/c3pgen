import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import FormFilme from '../components/filme/FormFilme';
import PageFilme from '../components/filme/PageFilme';

const Root = () => {
  return (
    <Router>
      <div>
        <Route path="/filmes/new" component={FormFilme} exact />
        <Route path="/filmes/list" component={PageFilme} exact />
      </div>
    </Router>
  );
};

export default Root;
