/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { mount, ReactWrapper } from 'enzyme';
import configStore, { MockStore } from 'redux-mock-store';
import thunk from 'redux-thunk';
import { history } from '~src/stores/configureStore';

export const mockStore = (store): MockStore => configStore([thunk])(store);

export const mount2dom = (child, options): ReactWrapper => mount(<Provider store={options.context.store}>
  <ConnectedRouter history={history}>
    {child}
  </ConnectedRouter>
</Provider>, { ...options });
