import React, { ReactElement } from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { mount, ReactWrapper } from 'enzyme';
import configStore, { MockStore } from 'redux-mock-store';
import thunk from 'redux-thunk';
import { history } from '~src/stores/configureStore';
import AuthProvider from '~components/providers/Auth';
import { InputEvents, MouseEvents, WindowEvents } from '~enums/Events';
import { CommonAction } from '~types/action';
import { CommonState } from '~types/state';

export const assertEquals = (store: MockStore, action: CommonAction, expected: unknown): void =>
  expect(store.dispatch(action)).toEqual(expected);

export const assertEqualsAction = (store: MockStore, expected: CommonAction[] = []): void =>
  expect(store.getActions()).toEqual(expected);

export const assertHasAction = (store: MockStore, expected = {}): void =>
  expect(store.getActions()).toContainEqual(expect.objectContaining(expected));

export const assertContainText = (regExp: string, expected: string): void =>
  expect(expected).toEqual(expect.stringMatching(regExp));

export const mockStore = (store: { app: { common: CommonState } }): MockStore => configStore([thunk])(store);

const append2dom = (child: ReactElement, options: { context: { store: Store } }): ReactElement => <Provider
  store={options.context.store}>
  <ConnectedRouter history={history}>
    <AuthProvider>
      {child}
    </AuthProvider>
  </ConnectedRouter>
</Provider>;

export const mount2dom = (child: ReactElement, options: { context: { store: Store } }): ReactWrapper => mount(
  append2dom(child, options), { ...options });

export const resizeWindow = (width: number, height: number): void => {
  window.innerWidth = width;
  window.innerHeight = height;
  window.dispatchEvent(new Event(WindowEvents.RESIZE));
};

export const simulateChangeNBlur = (
  wrapper: ReactWrapper, elementId: string, elementType: string, value: string): void => {
  const input = wrapper.find(elementId).find(elementType);
  input.simulate(MouseEvents.FOCUS);
  input.instance().value = value;
  input.simulate(InputEvents.CHANGE);
  input.simulate(MouseEvents.BLUR);
};

export const simulateChangeNBlurOnInput = (wrapper: ReactWrapper, elementId: string, value: string): void =>
  simulateChangeNBlur(wrapper, elementId, 'input', value);

export const simulateChangeNBlurOnTextarea = (wrapper: ReactWrapper, elementId: string, value: string): void =>
  simulateChangeNBlur(wrapper, elementId, 'textarea', value);
