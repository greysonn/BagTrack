import { ipcRenderer  } from 'electron';
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
  }

  public render(): React.ReactNode {
    return (
      <div className='settings'>
        <div className='container'>
          <div className='title'>
            Settings
          </div>
          <div className='settings-box'>
            yeeet
          </div>
        </div>
      </div>
    );
  }
}
