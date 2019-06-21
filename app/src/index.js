import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import { LocaleProvider } from 'antd';
import moment from 'moment';
import ruRu from 'antd/lib/locale-provider/ru_RU';
import 'moment/locale/ru';

import configureStore, { history } from './stores/configureStore';
import App from './components/App';

import '../styles/index.scss';

const store = configureStore();

moment.locale('ru');

function render (Component) {
  ReactDOM.render(
    <Provider store={store}>
      <LocaleProvider locale={ruRu}>
        <ConnectedRouter history={history}>
          <Component/>
        </ConnectedRouter>
      </LocaleProvider>
    </Provider>,
    document.getElementById('app')
  );
}

render(App);
