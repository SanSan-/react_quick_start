import React, { Component, ReactElement } from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { mount, ReactWrapper } from 'enzyme';
import configStore, { MockStore } from 'redux-mock-store';
import thunk from 'redux-thunk';
import { history } from '~src/stores/configureStore';

export const mockStore = (store: Store): MockStore => configStore([thunk])(store);

/* eslint @typescript-eslint/no-explicit-any: 0 */
export const mount2dom = (
  child: ReactElement,
  options: { context: { store: Store } }
): ReactWrapper<any, Record<string, unknown>, Component<Record<string, unknown>,
    Record<string, unknown>, unknown>> =>
  mount(<Provider store={options.context.store}>
    <ConnectedRouter history={history}>
      {child}
    </ConnectedRouter>
  </Provider>, { ...options });
