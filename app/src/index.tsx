import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import { ConfigProvider } from 'antd';
import ruRu from 'antd/es/locale/ru_RU';
import 'dayjs/locale/ru';

import configureStore, { history } from './stores/configureStore';
import App from './components/App';
import { APP_ID } from '~const/common';

import '../styles/index.scss';

import { enableES5 } from 'immer';
import { isIE } from '~utils/CommonUtils';

if (isIE()) {
  enableES5();
}

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
