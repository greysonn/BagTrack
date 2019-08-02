import { toast } from 'react-toastify'
import * as React from 'react';

import '@public/scss/settings.scss';

type SettingProps = {};
type SettingState = {};

/**
 * Home component to be used as main homepage
 */
export class Settings extends React.Component<SettingProps, SettingState> {
  constructor(props: SettingProps) {
    super(props);
    this.showToast = this.showToast.bind(this);
  }

  public render(): React.ReactNode {
    return (
      <div className='settings'>
        <div className='container'>
          <div className='title'>
            Settings
          </div>
          <div className='settings-box'>
            <div className='subheader'>
              <p>
                Connections
              </p>
            </div>
            <div className='row' style={{ marginTop: '10px' }}>
              <div className='col'>
                <div className='row'>
                  <div className='col'>
                    <p>Stockx Account</p>
                    <input className='input' placeholder='Email Address' />
                  </div>
                </div>
                <div className='row'>
                  <div className='col'>
                    <input className='input' placeholder='Password' />
                  </div>
                </div>
              </div>
              <div className='col'>
                <div className='row'>
                  <div className='col'>
                    <p>Goat Account</p>
                    <input className='input' placeholder='Email Address' />
                  </div>
                </div>
                <div className='row'>
                  <div className='col'>
                    <input className='input' placeholder='Password' />
                  </div>
                </div>
              </div>
            </div>
            <div className='row' style={{ marginTop: '22px', marginBottom: '22px' }}>
              <div className='col'>
                <button onClick={this.showToast} className='save-btn'>Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private showToast(): void {
    toast.error('Stockx/Goat connections may be coming soon.');
  }
}
