import * as React from 'react';
import { toast } from 'react-toastify';
import { DragRegion } from './components/dragRegion';
import { Navbar } from './components/navbar';

import { Redirect, Route  } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { Home } from './routes/Home';
import { Settings } from './routes/Settings';

import '@public/scss/main.scss';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

/**
 * App component
 */
export class App extends React.Component {
  public render(): React.ReactNode {
    return (
      <HashRouter>
        <div className='app'>
          <DragRegion />
          <Navbar />
          <Redirect to='/' />

          <Route exact path='/' component={Home} />
          <Route exact path='/settings' component={Settings} />
        </div>
      </HashRouter>
    );
  }
}
