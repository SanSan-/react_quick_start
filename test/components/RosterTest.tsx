import React from 'react';
import Roster from '~forms/Roster';
import { Button, Input, message } from 'antd';
import { mount2dom } from '../__mocks/utils';
import dayjs from 'dayjs';
import { ANT_DATE_FORMAT, EMPTY_STRING } from '~const/common';
import { mockOptions } from '~test/__mocks/state';
import { GeneralStateType } from '~types/store';

const mockState: GeneralStateType = {
  app: {},
  router: {
    location: {
      pathname: '/',
      search: EMPTY_STRING
    }
  }
};
const Search = Input.Search;

describe('Roster form component test', () => {

  test('Roster form test: should call handleSearch()', () => {
    const dispatch = jest.fn();
    const handleMessageWarning = jest.spyOn(message, 'warning');
    const wrapper = mount2dom(<Roster dispatch={dispatch}/>, mockOptions(mockState));
    wrapper.find('.ant-collapse-header').first().simulate('click');
    const button = wrapper.find(Search).find('.ant-input-search-icon').first();
    button.simulate('click');
    return expect(handleMessageWarning).toHaveBeenCalled();
  });

  test('Roster form test: should not call handleSearch()', () => {
    const dispatch = jest.fn();
    const handleMessageWarning = jest.spyOn(message, 'warning');
    const wrapper = mount2dom(<Roster dispatch={dispatch}/>, mockOptions(mockState));
    wrapper.find('.ant-collapse-header').first().simulate('click');
    const input = wrapper.find(Search).find('input');
    const button = wrapper.find(Search).find('.ant-input-search-icon').first();
    input.instance().value = '123';
    button.simulate('click');
    return expect(handleMessageWarning).not.toHaveBeenCalled();
  });

  const simulateChangeBlurInput = (wrapper, elementId, value) => {
    wrapper.find('.ant-collapse-header').first().simulate('click');
    const input = wrapper.find(elementId).find('input');
    input.simulate('focus');
    input.instance().value = value;
    input.simulate('change');
    input.simulate('blur');
  };

  test('Roster form test: should call ERROR on validate input', () => {
    const dispatch = jest.fn();
    const callback = jest.fn();
    const wrapper = mount2dom(<Roster dispatch={dispatch} handleSearchCallback={callback}/>, mockOptions(mockState));
    simulateChangeBlurInput(wrapper, '#rosterNumber', '!@#$$');
    wrapper.find(Button).first().simulate('click');
    return expect(callback).not.toHaveBeenCalled();
  });

  test('Roster form test: should call SUCCESS on validate input', () => {
    const dispatch = jest.fn();
    const callback = jest.fn();
    const wrapper = mount2dom(<Roster dispatch={dispatch} handleSearchCallback={callback}/>, mockOptions(mockState));
    simulateChangeBlurInput(wrapper, '#rosterNumber', '123');
    wrapper.find(Button).first().simulate('click');
    return expect(callback).toHaveBeenCalled();
  });

  test('Roster form test: should call SUCCESS on validate empty input', () => {
    const dispatch = jest.fn();
    const callback = jest.fn();
    const wrapper = mount2dom(<Roster dispatch={dispatch} handleSearchCallback={callback}/>, mockOptions(mockState));
    simulateChangeBlurInput(wrapper, '#rosterNumber', EMPTY_STRING);
    wrapper.find(Button).first().simulate('click');
    return expect(callback).toHaveBeenCalled();
  });

  test('Roster form test: should call clearAllFilters() and restoreFiltersFromBuffer()', () => {
    const dispatch = jest.fn();
    const inputText = '12345';
    const wrapper = mount2dom(<Roster dispatch={dispatch}/>, mockOptions(mockState));
    wrapper.find('.ant-collapse-header').first().simulate('click');
    simulateChangeBlurInput(wrapper, '#rosterNumber', inputText);
    wrapper.find('a#clearAllFiltersId').simulate('click');
    expect(wrapper.find('a#clearAllFiltersId')).toHaveLength(0);
    expect(wrapper.find('a#restoreFiltersId')).toHaveLength(1);
    expect(wrapper.find('#rosterNumber').find('input').instance().value).toEqual(EMPTY_STRING);
    wrapper.find('a#restoreFiltersId').simulate('click');
    expect(wrapper.find('a#restoreFiltersId')).toHaveLength(0);
    expect(wrapper.find('a#clearAllFiltersId')).toHaveLength(1);
    expect(wrapper.find('#rosterNumber').find('input').instance().value).toEqual(inputText);
  });

  test('Roster form test: should call clearAllFilters() and return clear after change input', () => {
    const dispatch = jest.fn();
    const oldText = '12345';
    const newText = '98765';
    const wrapper = mount2dom(<Roster dispatch={dispatch}/>, mockOptions(mockState));
    wrapper.find('.ant-collapse-header').first().simulate('click');
    simulateChangeBlurInput(wrapper, '#rosterNumber', oldText);
    wrapper.find('a#clearAllFiltersId').simulate('click');
    expect(wrapper.find('a#clearAllFiltersId')).toHaveLength(0);
    expect(wrapper.find('a#restoreFiltersId')).toHaveLength(1);
    expect(wrapper.find('#rosterNumber').find('input').instance().value).toEqual(EMPTY_STRING);
    simulateChangeBlurInput(wrapper, '#rosterNumber', newText);
    expect(wrapper.find('a#restoreFiltersId')).toHaveLength(0);
    expect(wrapper.find('a#clearAllFiltersId')).toHaveLength(1);
    expect(wrapper.find('#rosterNumber').find('input').instance().value).toEqual(newText);
  });

  test('Roster form test: should call clearAllFilters() and return clear after set date range change', () => {
    const dispatch = jest.fn();
    const inputText = '12345';
    const wrapper = mount2dom(<Roster dispatch={dispatch}/>, mockOptions(mockState));
    wrapper.find('.ant-collapse-header').first().simulate('click');
    simulateChangeBlurInput(wrapper, '#rosterNumber', inputText);
    wrapper.find('a#clearAllFiltersId').simulate('click');
    expect(wrapper.find('a#clearAllFiltersId')).toHaveLength(0);
    expect(wrapper.find('a#restoreFiltersId')).toHaveLength(1);
    expect(wrapper.find('#rosterNumber').find('input').instance().value).toEqual(EMPTY_STRING);
    wrapper.find('a#setDateRangeId').simulate('click');
    expect(wrapper.find('a#restoreFiltersId')).toHaveLength(0);
    expect(wrapper.find('a#clearAllFiltersId')).toHaveLength(1);
    expect(wrapper.find('[htmlFor=\'dateStart\']').find('input').instance().value)
      .toEqual(dayjs().format(ANT_DATE_FORMAT));
    expect(wrapper.find('[htmlFor=\'dateEnd\']').find('input').instance().value)
      .toEqual(dayjs().format(ANT_DATE_FORMAT));
    wrapper.find('a#clearDateRangeId').simulate('click');
    expect(wrapper.find('[htmlFor=\'dateStart\']').find('input').instance().value).toEqual(EMPTY_STRING);
    expect(wrapper.find('[htmlFor=\'dateEnd\']').find('input').instance().value).toEqual(EMPTY_STRING);
  });

});
