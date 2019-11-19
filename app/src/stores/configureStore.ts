import { createStore, applyMiddleware, combineReducers, compose, Store } from 'redux';
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

const composeEnchacers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const defaultApplyMiddleware = applyMiddleware(...middlware);
const enchacer = __DEBUG__ ? composeWithDevTools(defaultApplyMiddleware) : composeEnchacers(defaultApplyMiddleware);

const reducers = combineReducers({
  app: rootReducer,
  router: connectRouter(history)
});

export default (initialState: GeneralStateType): Store => createStore(reducers, initialState, enchacer);
