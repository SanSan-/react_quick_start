import { DefaultState, DefaultStringState } from '~types/state';
import AuthMode from '~enums/AuthMode';

export interface AppContext extends DefaultStringState {
  __appToolbarTitle?: string;
  __appToolbarSystem?: string;
  __appToolbarLeft?: string;
  __appToolbarRight?: string;
  __appModals?: string;
  __appModal?: string;
}

export interface AuthContext extends DefaultState {
  username?: string;
  roles?: string[];
  projects?: string[];
  authMode?: AuthMode;
  version?: string;
  logoutUrl?: string;
  authUrl?: string;
  apiUrl?: string;
  engineAdminUrl?: string;
  url?: string;
}
