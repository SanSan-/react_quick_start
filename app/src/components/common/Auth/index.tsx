import React, { ReactElement, useEffect } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { GeneralState } from '~types/store';
import { AnyAction } from 'redux';
import { useAuthContext, useAuthDispatch } from '~hooks/UseAuthContext';
import { checkAuth } from '~actions/backend/session';
import { isClient, isEmpty, isEmptyArray } from '~utils/CommonUtils';
import { clearAuthContext, getRights, getUser, loadRights, loadUrl, loadUser } from '~actions/backend/auth';
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
  const setAuthContext = (): void => {
    if (isEmpty(context.login) || isEmpty(context.version) || isEmpty(context.roles) || isEmpty(context.ip)) {
      dispatch(getUser()).then((either) => {
        either.mapRight((response) => {
          authDispatch(loadUser(response));
        });
      });
    }
    if (isEmptyArray(context.rights)) {
      dispatch(getRights()).then((either) => {
        either.mapRight((response) => authDispatch(loadRights(response as string[])));
      });
    }
    if (isEmpty(context.url)) {
      authDispatch(loadUrl(isClient()));
    }
  };
  useEffect(() => {
    dispatch(checkAuth());
  }, []);
  useEffect(() => {
    if (state === LoginState.LOGGED_IN) {
      setAuthContext();
    }
  }, [state]);
  switch (state) {
    case LoginState.LOGGED_IN: {
      return React.Children.only(children);
    }
    case LoginState.PASSWORD_EXPIRED: {
      authDispatch(clearAuthContext());
      return <div>Change Password Form</div>;
    }
    case LoginState.UNKNOWN:
      return null;
    // eslint-disable-next-line no-duplicate-case
    case LoginState.LOGGED_OUT:
    case LoginState.UNAUTHENTICATED:
    default: {
      authDispatch(clearAuthContext());
      return <div>Login Form</div>;
    }
  }
};

export default connect((state: GeneralState) => ({
  state: state.app.backend.session.state
}))(Auth);
