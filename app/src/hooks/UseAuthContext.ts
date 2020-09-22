import { AuthContext as AuthContextType } from '~types/context';
import { Dispatch, useContext } from 'react';
import { AuthContext, DispatchContext } from '~components/providers/Auth';
import Type from '~enums/Types';
import { MUST_BE_USED_IN_PROVIDER } from '~const/log';
import { AuthContextAction } from '~types/action';

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (typeof context === Type.UNDEFINED) {
    throw new Error(MUST_BE_USED_IN_PROVIDER);
  }
  return context;
};

export const useAuthDispatch = (): Dispatch<AuthContextAction> => {
  const context = useContext(DispatchContext);
  if (typeof context === Type.UNDEFINED) {
    throw new Error(MUST_BE_USED_IN_PROVIDER);
  }
  return context;
};
