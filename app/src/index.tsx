import React from 'react';
import ReactDOM from 'react-dom';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import { ConfigProvider } from 'antd';
import moment from 'moment';
import ruRu from 'antd/lib/locale-provider/ru_RU';
import 'moment/locale/ru';

import configureStore, { history } from './stores/configureStore';
import App from './components/App';
import { APP_ID } from '~const/common';

import '../styles/index.scss';

moment.locale('ru');

const render = (Component: React.FunctionComponent, store: Store): void => {
  ReactDOM.render(
    <Provider store={store}>
      <ConfigProvider locale={ruRu}>
        <ConnectedRouter history={history}>
          <Component/>
        </ConnectedRouter>
      </ConfigProvider>
    </Provider>,
    document.getElementById(APP_ID)
  );
};

render(App, configureStore());
