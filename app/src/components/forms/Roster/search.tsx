import React, { ChangeEventHandler, FocusEventHandler, ReactElement, useState } from 'react';
import { Button, Checkbox, Col, Collapse, Form, Input, Row, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { RosterFilter, SearchBuffer, Validator } from '~types/filters';
import { defaultFilter, defaultValidators, typesFilter } from '~dictionaries/rosterFilter';
import {
  createClearAllFilters,
  createHandleSelect,
  createHandleSubmit,
  createHandleThings,
  createRestoreFiltersFromBuffer,
  createSetValidator,
  createUpdateDateFilter,
  handleUpdateFilter
} from '~utils/FilterUtils';
import { isEmpty, isEmptyObject } from '~utils/CommonUtils';
import { EMPTY_STRING, FORM_ELEMENT_SIZE } from '~const/common';
import { SelectValue } from 'antd/lib/select';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { RosterSearchHeader } from '~enums/Forms';
import DateFilter from '~components/filters/DateFilter';
import renderSelectFilter from '~components/filters/SelectFilter';
import renderThingsFilter from '~components/filters/ThingsFilter';
import { numValidator, textValidator } from '~utils/ValidationUtils';

const Panel = Collapse.Panel;
const Item = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;

const initialBufferState: SearchBuffer<RosterFilter> = {};

interface Props {
  searchFilter?: RosterFilter;
  handleCallback?: (actual: RosterFilter) => void;
}

const renderDateFilter = (filter: RosterFilter, callback: (startDate: string, endDate: string) => void): ReactElement =>
  <DateFilter label={'Loading'}
    startDate={filter.dateStart}
    endDate={filter.dateEnd}
    todayId={'setDateRangeId'}
    clearDateId={'clearDateRangeId'}
    startDateHtmlFor={'dateStart'}
    endDateHtmlFor={'dateEnd'}
    callback={callback}
  />;

const renderMainFilter = <T extends HTMLInputElement> (
  filter: RosterFilter,
  validators: Record<string, Validator>,
  handleInput: (key: string) => ChangeEventHandler<T>,
  validateInput: (key: string, callback: (text: string) => boolean, errorMessage: string) => FocusEventHandler<T>,
  handleSelector: (key: string) => (val: SelectValue, option: ReactElement<unknown> | ReactElement<unknown>[]) => void,
  handleCheckbox: (key: string) => (e: CheckboxChangeEvent) => void
): ReactElement => <div>
    <div>
      <b>Main</b>
    </div>
    <Item label={'number'} hasFeedback
      validateStatus={validators.rosterNumber.validateStatus}
      help={validators.rosterNumber.help}>
      <Input size={FORM_ELEMENT_SIZE} placeholder={'XXX'} id={'rosterNumber'}
        value={filter.rosterNumber}
        onBlur={validateInput('rosterNumber', numValidator, 'Enter any digits')}
        onChange={handleInput('rosterNumber')}
        allowClear={true}/>
    </Item>
    <Item label={'type'} labelAlign={'left'}>
      <Select size={FORM_ELEMENT_SIZE} id={'rosterType'} value={filter.rosterType}
        onChange={handleSelector('rosterType')}>
        {typesFilter.map((typeItem) => (<Option key={typeItem}>{typeItem}</Option>))}
      </Select>
    </Item>
    <Item label={'is valid'}>
      <Checkbox size={FORM_ELEMENT_SIZE} checked={filter.isRosterValidation}
        onChange={handleCheckbox('isRosterValidation')}/>
    </Item>
  </div>;

const renderAdvancedFilter = <T extends HTMLTextAreaElement> (
  filter: RosterFilter,
  validators: Record<string, Validator>,
  handleInput: (key: string) => ChangeEventHandler<T>,
  validateInput: (key: string, callback: (text: string) => boolean, errorMessage: string) => FocusEventHandler<T>
): ReactElement => <div>
    <div>
      <b>Advanced</b>
    </div>
    <Item label={'name'} hasFeedback
      validateStatus={validators.rosterName.validateStatus}
      help={validators.rosterName.help}>
      <TextArea size={FORM_ELEMENT_SIZE} autoSize={{ minRows: 2, maxRows: 6 }}
        placeholder={'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'}
        id={'rosterName'}
        value={filter.rosterName}
        onBlur={validateInput('rosterName', textValidator, 'Maximum 255 symbols')}
        onChange={handleInput('rosterName')}
        allowClear={true}/>
    </Item>
  </div>;

const renderOtherFilter = (
  filter: RosterFilter,
  handleStatus: (value: SelectValue) => void,
  handleThing: (index: number) => void
): ReactElement => <div>
  <Row>
    <Col>
      <Item label={'status'} labelCol={{ span: 3 }} wrapperCol={{ span: 21 }}>
        {renderSelectFilter(filter.selected, handleStatus)}
      </Item>
    </Col>
  </Row>
  <Row>
    <Col>
      <div><b>Things</b></div>
      {renderThingsFilter(filter.otherThing, handleThing)}
    </Col>
  </Row>
</div>;

const RosterSearch: React.FC<Props> = ({ searchFilter, handleCallback }: Props): ReactElement => {
  const [filter, setFilter] = useState({ ...defaultFilter, ...searchFilter } as RosterFilter);
  const [isSearchFilterExpanded, setIsSearchFilterExpanded] = useState(false);
  const [validators, setValidators] = useState(defaultValidators);
  const [buffer, setBuffer] = useState(initialBufferState);

  const clearAllFilters = createClearAllFilters(
    filter, defaultFilter, setFilter, setBuffer, validators, defaultValidators, setValidators);
  const restoreFiltersFromBuffer = createRestoreFiltersFromBuffer(buffer, setFilter, setBuffer, setValidators);
  const updateDateFilter = createUpdateDateFilter('dateStart', 'dateEnd', setFilter, setBuffer);
  const setValidator = createSetValidator(setValidators);
  const validateInput = (
    key: string,
    callback: (text: string) => boolean,
    errorMessage = 'Validation error!'
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const value = e.target.value;
    if (isEmpty(value)) {
      return setValidator(key, null, EMPTY_STRING);
    }
    if (callback(value)) {
      setValidator(key, 'success', EMPTY_STRING);
    } else {
      setValidator(key, 'error', errorMessage);
    }
  };
  const handleInput = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (isEmpty(value)) {
      setValidator(key, null, EMPTY_STRING);
    }
    handleUpdateFilter(key, value, setFilter, setBuffer);
  };
  const handleSelector = (key: string) => (value: SelectValue) => handleUpdateFilter(
    key, value as string, setFilter, setBuffer);
  const handleCheckbox = (key: string) => (e: CheckboxChangeEvent) => handleUpdateFilter(
    key, e.target.checked, setFilter, setBuffer);
  const handleSubmit = createHandleSubmit(filter, validators, setIsSearchFilterExpanded);
  const handleStatus = createHandleSelect(setFilter, setBuffer);
  const handleThings = createHandleThings(setFilter, setBuffer);

  const formItemLayout = { labelCol: { span: 9 }, wrapperCol: { span: 15 } };
  return <Collapse className='search-collapse'
    activeKey={[isSearchFilterExpanded ? RosterSearchHeader.ID : null]}
    defaultActiveKey={[]}
    key={'roster-collapse-id'}
    onChange={(): void => setIsSearchFilterExpanded(!isSearchFilterExpanded)}>
    <Panel className='search-panel' header={RosterSearchHeader.DESC} key={RosterSearchHeader.ID}>
      <Form {...formItemLayout} className={'roster-search'}>
        <Row>
          <Col span={4}>{renderDateFilter(filter, updateDateFilter)}</Col>
          <Col span={5}>
            {renderMainFilter(filter, validators, handleInput, validateInput, handleSelector, handleCheckbox)}
          </Col>
          <Col span={5}>{renderAdvancedFilter(filter, validators, handleInput, validateInput)}</Col>
          <Col span={10}>{renderOtherFilter(filter, handleStatus, handleThings)}</Col>
        </Row>
        <Row>
          <Col>
            <Item>
              <Button type={'primary'} htmlType={'submit'} onClick={() => handleSubmit(handleCallback)}
                icon={<SearchOutlined />}>
                Search
              </Button>
              &nbsp;&nbsp;&nbsp;
              {isEmptyObject(buffer) ?
                <a id={'clearAllFiltersId'} onClick={clearAllFilters}>clear</a> :
                <a id={'restoreFiltersId'} onClick={restoreFiltersFromBuffer}>restore data</a>}
            </Item>
          </Col>
        </Row>
      </Form>
    </Panel>
  </Collapse>;
};

export default RosterSearch;
