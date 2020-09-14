import { applyMiddleware, combineReducers, compose, createStore, PreloadedState, Store, StoreEnhancer } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunkMiddleware from 'redux-thunk';
import { createHashHistory } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import rootReducer from '../reducers';
import { GeneralState } from '~types/store';
import handleErrors from '~src/middlewares/handleErrors';

export const history = createHashHistory();

const middleware = [
  handleErrors,
  thunkMiddleware,
  routerMiddleware(history)
];

/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */
const composeEnchacers: (...args: StoreEnhancer[]) => StoreEnhancer =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-call */
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const defaultApplyMiddleware = applyMiddleware(...middleware);
const enchacer = __DEBUG__ ? composeWithDevTools(defaultApplyMiddleware) : composeEnchacers(defaultApplyMiddleware);

const reducers = combineReducers({
  app: rootReducer,
  router: connectRouter(history)
});

export default (initialState: PreloadedState<GeneralState>): Store => createStore(reducers, initialState, enchacer);
