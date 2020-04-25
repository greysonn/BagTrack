import * as React from 'react';
import { toast } from 'react-toastify'

import * as GoatLogo from '@public/img/goat.png';
import * as StockxLogo from '@public/img/stockx.png';
import CyberLogo from '@public/img/cyber.svg';
import '@public/scss/settings.scss';
import { IpcRendererEvent, ipcRenderer } from 'electron';

type SettingProps = {};
type SettingState = {
  stockxEmail: string;
  stockxPassword: string;
  goatUsername: string;
  goatPassword: string;
  cyberCookie: string;
};

ipcRenderer.on('goatLoginResponse', (event: IpcRendererEvent, success: boolean) => {
  if (success) {
    toast.success('Successfully logged into goat and saved credentials.');
  } else {
    toast.error('There was an issue logging into goat, please try again later');
  }
});

ipcRenderer.on('stockxLoginResponse', (event: IpcRendererEvent, success: boolean) => {
  if (success) {
    toast.success('Successfully logged into stockx and saved credentials.');
  } else {
    toast.error('There was an issue logging into stockx, please try again later');
  }
});

/**
 * Home component to be used as main homepage
 */
export class Settings extends React.Component<SettingProps, SettingState> {
  constructor(props: SettingProps) {
    super(props);
    this.state = {
      stockxEmail: '',
      stockxPassword: '',
      goatUsername: '',
      goatPassword: '',
      cyberCookie: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.stockxLogin = this.stockxLogin.bind(this);
    this.goatLogin = this.goatLogin.bind(this);
    this.cyberLogin = this.cyberLogin.bind(this);
  }

  public componentDidMount(): void {
    ipcRenderer.send('requestSettings');

    ipcRenderer.on('loadSettings', (event: IpcRendererEvent, settings: SettingState) => {
      this.setState(settings);
    });
  }

  public componentWillUnmount(): void {
    ipcRenderer.removeAllListeners('loadSettings');
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
                    <input value={this.state.stockxEmail} className='input' placeholder='Email'
                      onChange={this.handleChange} name='stockxEmail' />
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
                    <button onClick={this.stockxLogin} className='stockx-btn'>Login to <img className='img' src={StockxLogo.toString()}/></button>
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
            <div className="row" style={{ marginTop: '10px' }}>
              <div className='col'>
                <div className='row'>
                  <div className='col'>
                    <p>Cyber Dashboard Cookie</p>
                    <input value={this.state.cyberCookie} className='input' placeholder='dashboard_session cookie'
                      onChange={this.handleChange} name='cyberCookie' />
                  </div>
                </div>
                <div className='row' style={{ marginTop: '22px', marginBottom: '22px' }}>
                  <div className='col'>
                    <button onClick={this.cyberLogin} className='cyber-btn'>Login to <CyberLogo className='img'/></button>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="row"></div>
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

  private stockxLogin(): void {
    ipcRenderer.send('stockxLogin', {
      email: this.state.stockxEmail,
      password: this.state.stockxPassword
    });
  }

  private cyberLogin(): void {
    ipcRenderer.send('cyberLogin', {
      cookie: this.state.cyberCookie
    })
  }
}
