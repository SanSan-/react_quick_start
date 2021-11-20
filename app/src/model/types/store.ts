import { LocationChangePayload } from 'connected-react-router';
import { BackendState, CommonState, ModuleState } from '~types/state';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

interface ApplicationState {
  backend?: BackendState;
  common?: CommonState;
  module?: ModuleState;
}

export interface GeneralState {
  app?: ApplicationState;
  router?: LocationChangePayload;
}

export type DefaultDispatch = ThunkDispatch<GeneralState, unknown, AnyAction>;
