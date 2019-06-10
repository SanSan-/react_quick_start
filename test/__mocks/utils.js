/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { mount } from 'enzyme';
import configStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { history } from '~stores/configureStore';

export const mockStore = (store) => configStore([thunk])(store);

export const mount2dom = (child, options) => mount(<Provider store={options.context.store}>
  <ConnectedRouter history={history}>
    {child}
  </ConnectedRouter>
</Provider>, { ...options });
