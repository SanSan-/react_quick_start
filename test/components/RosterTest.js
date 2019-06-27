/* eslint-disable no-undef */
import React from 'react';

import Roster from '~components/Roster';
import { Input, message } from 'antd';

import { mockOptions } from '../__mocks/state';
import { mount2dom } from '../__mocks/utils';

const mockState = {
  app: {},
  router: {
    location: {
      pathname: '/',
      search: ''
    }
  }
};
const Search = Input.Search;

describe('Roster form component test', () => {

  it('Roster form test: should call handleSearch()', () => {
    const dispatch = jest.fn();
    const handleMessageWarning = jest.spyOn(message, 'warning');
    const wrapper = mount2dom(<Roster dispatch={dispatch}/>, mockOptions(mockState));
    const component = wrapper.find('Roster');
    // eslint-disable-next-line no-unused-vars
    const handleRosterSearch = jest.spyOn(component.instance(), 'handleSearch');
    const button = wrapper.find(Search).find('.ant-input-search-icon').first();
    button.simulate('click');
    return expect(handleMessageWarning).toHaveBeenCalled();
  });

  it('Roster form test: should not call handleSearch()', () => {
    const dispatch = jest.fn();
    const handleMessageWarning = jest.spyOn(message, 'warning');
    const wrapper = mount2dom(<Roster dispatch={dispatch}/>, mockOptions(mockState));
    const input = wrapper.find(Search).find('input');
    const button = wrapper.find(Search).find('.ant-input-search-icon').first();
    input.instance().value = '123';
    button.simulate('click');
    return expect(handleMessageWarning).not.toHaveBeenCalled();
  });

});
