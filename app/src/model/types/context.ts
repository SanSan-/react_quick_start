import { DefaultState, DefaultStringState } from '~types/state';

export interface AppContext extends DefaultStringState {
  __appToolbarTitle?: string;
  __appToolbarSystem?: string;
  __appToolbarLeft?: string;
  __appToolbarRight?: string;
  __appModals?: string;
  __appModal?: string;
}

export interface AuthContext extends DefaultState {
  version?: string;
  login?: string;
  roles?: string;
  rights?: string[];
  url?: string;
  ip?: string;
  name?: string;
  lastName?: string;
  middleName?: string;
  email?: string;
}
