import * as React from 'react';
import { Navbar } from './components/navbar';
import { DragRegion } from './components/dragRegion';

import '@public/scss/main.scss';

/**
 * App component
 */
export class App extends React.Component {
  public render(): React.ReactNode {
    return (
      <div className='app'>
        <DragRegion />
        <Navbar />
      </div>
    );
  }
}
