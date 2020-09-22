import React, { Context, Dispatch, ReactElement, useReducer } from 'react';
import { AuthContext as AuthContextType } from '~types/context';
import { AuthContextAction } from '~types/action';
import reducer, { defaultState } from '~reducers/backend/auth';

export const AuthContext: Context<AuthContextType> = React.createContext(null as AuthContextType);
export const DispatchContext: Context<Dispatch<AuthContextAction>> = React.createContext(
  null as Dispatch<AuthContextAction>);

interface Props {
  children?: ReactElement | ReactElement[];
}

const AuthProvider: React.FC<Props> = ({ children }: Props): ReactElement => {
  const initialState = {
    ...defaultState
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return <DispatchContext.Provider value={dispatch}>
    <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
  </DispatchContext.Provider>;
};

export default AuthProvider;
