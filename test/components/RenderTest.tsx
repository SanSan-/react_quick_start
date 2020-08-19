import React from 'react';
import { spy } from 'sinon';

import App from '~components/module/App';

import { mockOptions } from '~test/__mocks/state';
import { mount2dom } from '~test/__mocks/utils';
import { GeneralState } from '~types/store';

describe('Render component pages test', () => {

  test('App component test: should render', () => {
    const dispatch = spy();
    const mockState: GeneralState = {
      app: {},
      router: {
        location: {
          pathname: '/',
          search: ''
        }
      }
    };
    const wrapper = mount2dom(<App dispatch={dispatch}/>, mockOptions(mockState));
    return expect(wrapper).toHaveLength(1);
  });

});
