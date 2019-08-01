/**
 * React renderer.
 */
import * as React from 'react';
import { Link } from 'react-router-dom';

import SettingsIcon from '@public/img/settings.svg';
import HomeIcon from '@public/img/home.svg';
import '@public/scss/navbar.scss';

type NavbarProps = {};

type NavbarState = {
  activeLink: 'home' | 'settings';
}

/**
 * Navbar Component
 */
export class Navbar extends React.Component<NavbarProps, NavbarState> {
  constructor(props: NavbarProps) {
    super(props);
    this.state = {
      activeLink: 'home'
    };
  }

  public render(): React.ReactNode {
    // tslint:disable: react-this-binding-issue
    return (
      <div className='navbar'>
        <div className='title'>
          <p>
            BagTrack
          </p>
        </div>
        <div className='subtitle'>
          <p>
            By Grey
          </p>
        </div>
        <div className='links'>
          <Link onClick={(): void => { this.setState({ activeLink: 'home' }) }}  to='/' className='link-container'>
            <div id='home' className={`link ${this.state.activeLink === 'home' ? 'active' : null}`}>
              <HomeIcon width={16} height={16} className='icon' />HOME
            </div>
          </Link>
          <Link onClick={(): void => { this.setState({ activeLink: 'settings' }) }} to='/settings' className='link-container'>
            <div className={`link ${this.state.activeLink === 'settings' ? 'active' : null}`}>
              <SettingsIcon width={16} height={16} className='icon' />Settings
            </div>
          </Link>
        </div>
      </div>
    );
  }
}
