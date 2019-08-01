/**
 * React renderer.
 */
import * as history from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, Router } from 'react-router';

import { App } from './App';
import { Home } from './routes/Home';

const browserHistory: history.History = history.createBrowserHistory();

ReactDOM.render(
  <Router history={browserHistory}>
    <App />

    <Route exact path='' component={Home} />
  </Router>
, document.getElementById('root')
);
