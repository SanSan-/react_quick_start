import React, { ReactElement, useEffect } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { GeneralState } from '~types/store';
import { AnyAction } from 'redux';
import { useAuthContext, useAuthDispatch } from '~hooks/UseAuthContext';
import { checkAuth } from '~actions/backend/session';
import { isClient, isEmpty } from '~utils/CommonUtils';
import {
  clearAuthContext,
  getGeneralSettings,
  getUser,
  loadGeneralSettings,
  loadUrl,
  loadUser
} from '~actions/backend/auth';
import { connect } from 'react-redux';
import LoginState from '~enums/LoginState';

interface Props {
  state?: string;
  children: ReactElement;
  dispatch?: ThunkDispatch<GeneralState, unknown, AnyAction>;
}

const Auth: React.FC<Props> = ({ state, children, dispatch }: Props): ReactElement => {
  const authDispatch = useAuthDispatch();
  const context = useAuthContext();
  // eslint-disable-next-line no-console
  console.log('[Auth]', context);
  const setAuthContext = (): void => {
    if (isEmpty(context.username)) {
      getUser().then((either) => {
        either.mapRight((response) => {
          authDispatch(loadUser(response));
        });
      });
    }
    if (isEmpty(context.logoutUrl) || isEmpty(context.authUrl) || isEmpty(context.apiUrl) ||
      isEmpty(context.engineAdminUrl)) {
      getGeneralSettings().then((either) => {
        either.mapRight((response) => authDispatch(loadGeneralSettings(response)));
      });
    }
    if (isEmpty(context.url)) {
      authDispatch(loadUrl(isClient()));
    }
  };
  useEffect(() => {
    dispatch(checkAuth(context.logoutUrl));
  }, []);
  useEffect(() => {
    if (state === LoginState.LOGGED_IN) {
      setAuthContext();
    } else {
      authDispatch(clearAuthContext());
    }
  }, [state]);
  switch (state) {
    case LoginState.LOGGED_IN: {
      return React.Children.only(children);
    }
    case LoginState.PASSWORD_EXPIRED: {
      return <div>Change Password Form</div>;
    }
    case LoginState.UNKNOWN:
      return null;
    // eslint-disable-next-line no-duplicate-case
    case LoginState.LOGGED_OUT:
    case LoginState.UNAUTHENTICATED:
    default: {
      return <div>Login Form</div>;
    }
  }
};

export default connect((state: GeneralState) => ({
  state: state.app.backend.session.state
}))(Auth);
