import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import configureStore, { history } from './stores/configureStore';
import App from './components/App';

import '../styles/index.scss';

const store = configureStore();

function render (Component) {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Component/>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
  );
}

render(App);
