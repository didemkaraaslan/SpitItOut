import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Switch } from 'react-router';
import './index.css';

import App from './App';

ReactDOM.render
(
  <Router>
    <Switch>
      <Route exact path='/' component={App} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
