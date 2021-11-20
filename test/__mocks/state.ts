import { EMPTY_FUNC, EMPTY_STRING } from '~const/common';
import { GeneralState } from '~types/store';
import backendReducers from '~reducers/backend';
import commonReducers, { initialState as commonState } from '~reducers/common';
import { LocationChangePayload } from 'connected-react-router';
import { ModuleState } from '~types/state';
import CommonEnum from '~enums/Common';
import { AuthContext } from '~types/context';

export const backendInitialState = backendReducers({}, { type: 'unknown' });
export const commonInitialState = commonReducers(commonState, { type: 'unknown' });
export const router: LocationChangePayload = {
  location: {
    pathname: EMPTY_STRING,
    search: '?id=1',
    state: EMPTY_STRING,
    hash: '#'
  },
  action: 'POP',
  isFirstRendering: true
};

export const backendRequestMock = {
  tokens: {
    [SERVER_MODULE_NAME]: {
      token: 'token',
      validUntil: new Date().getTime() + 60000
    }
  }
};

export const mockDispatch = async (result: unknown): Promise<unknown> => (await result);

export const mockStore = (module: ModuleState): GeneralState => ({
  app: {
    common: commonInitialState,
    backend: {
      ...backendInitialState,
      request: backendRequestMock
    },
    module
  }
});

export const mockContext = {
  context: {
    __appToolbarTitle: CommonEnum.TOOLBAR_TITLE,
    __appToolbarLeft: CommonEnum.TOOLBAR_LEFT,
    __appToolbarRight: CommonEnum.TOOLBAR_RIGHT
  }
};

export const mockOptions = (
  state: GeneralState, dispatch: (result: unknown) => Promise<unknown> = jest.fn()): Record<string, unknown> => ({
  context: {
    store: {
      getState: (): GeneralState => (state),
      dispatch,
      subscribe: EMPTY_FUNC
    },
    __appModal: CommonEnum.MODAL,
    __appToolbarTitle: CommonEnum.TOOLBAR_TITLE
  }
});

export const mockAuthContext = (): AuthContext => ({
  version: '1.0.0',
  login: 'admin',
  roles: 'admin',
  rights: getAvailableEndpointsIds,
  url: 'http://localhost',
  ip: '127.0.0.1'
});

export const mockWindowsSize = (): Record<string, unknown> => ({
  width: window.innerWidth,
  height: window.innerHeight
});
