import { applyMiddleware, combineReducers, compose, createStore, Func3, PreloadedState, Store } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunkMiddleware from 'redux-thunk';
import { createHashHistory } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import rootReducer from '../reducers';
import { GeneralStateType } from '~types/store';

export const history = createHashHistory();

const middleware = [
  thunkMiddleware,
  routerMiddleware(history)
];

/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */
const composeEnchacers: <A, B, C, T1, T2, T3, R>(
  f1: (b: C) => R,
  f2?: (a: B) => C,
  f3?: (a: A) => B,
  f4?: Func3<T1, T2, T3, A>
) => Func3<T1, T2, T3, R> = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  /* eslint-disable-next-line @typescript-eslint/no-unsafe-call */
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const defaultApplyMiddleware = applyMiddleware(...middleware);
const enchacer = __DEBUG__ ? composeWithDevTools(defaultApplyMiddleware) : composeEnchacers(defaultApplyMiddleware);

const reducers = combineReducers({
  app: rootReducer,
  router: connectRouter(history)
});

export default (initialState: PreloadedState<GeneralStateType>): Store => createStore(reducers, initialState, enchacer);
