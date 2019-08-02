import * as history from 'history';
import * as React from 'react';
import { toast } from 'react-toastify';
import { DragRegion } from './components/dragRegion';
import { Navbar } from './components/navbar';

import { Route, Router } from 'react-router';
import { Home } from './routes/Home';

import '@public/scss/main.scss';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
const browserHistory: history.History = history.createBrowserHistory();

/**
 * App component
 */
export class App extends React.Component {
  public render(): React.ReactNode {
    return (
      <Router history={browserHistory}>
        <div className='app'>
          <DragRegion />
          <Navbar />

          <Route exact path='' component={Home} />
        </div>
      </Router>
    );
  }
}
