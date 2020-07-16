import React from 'react';
import { spy } from 'sinon';

import App from '~components/App';

import { mockOptions } from '~test/__mocks/state';
import { mount2dom } from '~test/__mocks/utils';
import { GeneralStateType } from '~types/store';

describe('Render component pages test', () => {

  it('App component test: should render', () => {
    const dispatch = spy();
    const mockState: GeneralStateType = {
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
