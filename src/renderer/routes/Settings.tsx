import { toast } from 'react-toastify'
import * as React from 'react';

import * as GoatLogo from '@public/img/goat.png';
import * as StockxLogo from '@public/img/stockx.png';
import '@public/scss/settings.scss';
import { ipcRenderer, IpcMessageEvent } from 'electron';

type SettingProps = {};
type SettingState = {
  stockxUsername: string;
  stockxPassword: string;
  goatUsername: string;
  goatPassword: string;
};

/**
 * Home component to be used as main homepage
 */
export class Settings extends React.Component<SettingProps, SettingState> {
  constructor(props: SettingProps) {
    super(props);
    this.state = {
      stockxUsername: '',
      stockxPassword: '',
      goatUsername: '',
      goatPassword: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.showToast = this.showToast.bind(this);
    this.goatLogin = this.goatLogin.bind(this);

    ipcRenderer.on('goatLoginResponse', (event: IpcMessageEvent, success: boolean) => {
      if (success) {
        toast.success('Successfully logged into goat and saved credentials.');
      } else {
        toast.error('There was an issue logging into goat, please try again later');
      }
    });
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
                    <input value={this.state.stockxUsername} className='input' placeholder='Username'
                      onChange={this.handleChange} name='stockxUsername' />
                  </div>
                </div>
                <div className='row'>
                  <div className='col'>
                    <input value={this.state.stockxPassword} className='input' placeholder='Password'
                      onChange={this.handleChange} name='stockxPassword' type='password' />
                  </div>
                </div>
                <div className='row' style={{ marginTop: '22px', marginBottom: '22px' }}>
                  <div className='col'>
                    <button onClick={this.showToast} className='stockx-btn'>Login to <img className='img' src={StockxLogo.toString()}/></button>
                  </div>
                </div>
              </div>
              <div className='col'>
                <div className='row'>
                  <div className='col'>
                    <p>Goat Account</p>
                    <input value={this.state.goatUsername} className='input' placeholder='Username'
                      onChange={this.handleChange} name='goatUsername' />
                  </div>
                </div>
                <div className='row'>
                  <div className='col'>
                    <input value={this.state.goatPassword} className='input' placeholder='Password'
                      onChange={this.handleChange} name='goatPassword' type='password' />
                  </div>
                </div>
                <div className='row' style={{ marginTop: '22px', marginBottom: '22px' }}>
                  <div className='col'>
                    <button onClick={this.goatLogin} className='goat-btn'>Login to <img className='img' src={GoatLogo.toString()}/></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private handleChange(event: any): void {
    // tslint:disable-next-line: no-object-literal-type-assertion
    const newState: Pick<SettingState, keyof SettingState> = { [event.target.name]: event.target.value } as Pick<SettingState, keyof SettingState>;
    this.setState(newState);
  }

  private goatLogin(): void {
    ipcRenderer.send('goatLogin', {
      username: this.state.goatUsername,
      password: this.state.goatPassword
    });
  }

  private showToast(): void {
    toast.error('Stockx connections may be coming soon.');
  }
}
