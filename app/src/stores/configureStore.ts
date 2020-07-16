import { createStore, applyMiddleware, combineReducers, compose, Store, Func3 } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunkMiddleware from 'redux-thunk';
import { createHashHistory } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import rootReducer from '../reducers';
import { GeneralStateType } from '~types/store';

export const history = createHashHistory();

const middlware = [
  thunkMiddleware,
  routerMiddleware(history)
];

/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */
const composeEnchacers: <A, B, C, T1, T2, T3, R>(
    f1: (b: C) => R,
    f2: (a: B) => C,
    f3: (a: A) => B,
    f4: Func3<T1, T2, T3, A>
) => Func3<T1, T2, T3, R> = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
/* eslint-disable-next-line @typescript-eslint/no-unsafe-call */
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const defaultApplyMiddleware = applyMiddleware(...middlware);
const enchacer = __DEBUG__ ? composeWithDevTools(defaultApplyMiddleware) : composeEnchacers(defaultApplyMiddleware);

const reducers = combineReducers({
  app: rootReducer,
  router: connectRouter(history)
});

export default (initialState: GeneralStateType): Store => createStore(reducers, initialState, enchacer);
