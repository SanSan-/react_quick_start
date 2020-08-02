import React, { ReactElement, useState } from 'react';
import { connect } from 'react-redux';
import dayjs, { Dayjs } from 'dayjs';
import { Button, Checkbox, Col, Collapse, DatePicker, Form, Input, message, Radio, Row, Select } from 'antd';
import ResultTable from '../../module/ResultTable';
import { rowHeaders } from '~const/dictionary/headers';
import {
  defaultFilter,
  defaultValidators,
  statusFilter,
  thingsFilter,
  typesFilter
} from '~const/dictionary/rosterFilter';
import { filterInnerObject, isEmpty, isEmptyObject } from '~utils/CommonUtils';
import { numValidator, textValidator } from '~utils/ValidationUtils';
import { EMPTY_FUNC, EMPTY_STRING, FORM_ELEMENT_SIZE } from '~const/common';
import { getRows } from '~src/mocks/mockTable';
import { Dispatch } from 'redux';
import { RosterFilterType, ValidatorType, ValidStatusType } from '~types/state';
import produce from 'immer';

const Panel = Collapse.Panel;
const Item = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;
const Search = Input.Search;

const initialBufferState: { filter?: RosterFilterType, validators?: Record<string, ValidatorType> } = {};

interface Props {
  searchFilter: RosterFilterType;
  handleSearchCallback: (filter: RosterFilterType) => void,
  dispatch: Dispatch
}

const Roster: React.FC<Props> = (props: Props): Array<ReactElement> => {
  const searchFilter = props.searchFilter || defaultFilter;
  const { handleSearchCallback } = props;
  const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 17 } };
  const [filter, setFilter] = useState({
    ...searchFilter
  });
  const [validators, setValidators] = useState({
    ...defaultValidators
  });
  const [buffer, setBuffer] = useState(initialBufferState);
  const setDateRange = (startDate: string, endDate: string, value: Dayjs) => {
    setFilter((state) => produce(state, (draft) => {
      draft[startDate] = value;
      draft[endDate] = value;
    }));
    setBuffer(initialBufferState);
  };
  const clearAllFilters = () => {
    setBuffer((state) => produce(state, (draft) => {
      draft.filter = filter;
      draft.validators = validators;
    }));
    setFilter(defaultFilter);
    setValidators(defaultValidators);
  };
  const restoreFiltersFromBuffer = () => {
    setFilter(buffer.filter);
    setValidators(buffer.validators);
    setBuffer(initialBufferState);
  };
  const setValidator = (key: string, validateStatus: ValidStatusType, help: string) => {
    setValidators((state) => produce(state, (draft) => {
      draft[key] = {
        validateStatus,
        help
      };
    }));
  };
  const validateInput = (
    key: string,
    callback: (text: string) => boolean,
    errorMessage = 'Validation error!'
  ) => (e: React.ChangeEvent<HTMLInputElement>) => {
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
  const updateFilter = <K extends keyof RosterFilterType, T extends RosterFilterType[K]> (key: K, value: T) => {
    setFilter((state) => produce(state, (draft) => {
      draft[key] = value;
    }));
    setBuffer(initialBufferState);
  };
  const handleInput = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isEmpty(value)) {
      setValidator(key, null, EMPTY_STRING);
    }
    updateFilter(key, value);
  };
  const handleRadio = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilter(key, e.target.value);
  };
  const handleCheckbox = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilter(key, e.target.checked);
  };
  const handleSelector = (key: string) => (value: Dayjs) => {
    updateFilter(key, value);
  };
  const handleSearch = (value: string) => {
    if (!value || value.length === 0) {
      /* eslint-disable-next-line no-void */
      void message.warning('Search field is empty!');
    }
  };
  const handleSubmit = (callback: (filter: RosterFilterType) => void) => {
    if (isEmptyObject(filterInnerObject(validators, 'validateStatus', 'error'))) {
      callback(filter);
    } else {
      /* eslint-disable-next-line no-void */
      void message.error('Search is impossible! Fields has validation error!');
    }
  };
  const renderDatePicker = () => <div>
    <div>
      <b>Loading</b> <span style={{ float: 'right', marginRight: '12%' }}>
        <a id={'clearDateRangeId'}
          onClick={() => setDateRange('dateStart', 'dateEnd', null)}>clear</a></span>
    </div>
    <Item label={'from'} htmlFor={'dateStart'}>
      <DatePicker size={FORM_ELEMENT_SIZE} value={filter.dateStart}
        onChange={handleSelector('dateStart')}/>
    </Item>
    <Item label={'to'} htmlFor={'dateEnd'}>
      <DatePicker size={FORM_ELEMENT_SIZE} value={filter.dateEnd}
        onChange={handleSelector('dateEnd')}/>
    </Item>
    <div>
      <a id={'setDateRangeId'}
        onClick={() => setDateRange('dateStart', 'dateEnd', dayjs())}>today</a>
    </div>
  </div>;
  const renderMainFilter = () => <div>
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
    <Item label={'type'}>
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
  const renderAdvancedFilter = () => <div>
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
  const renderThings = (startSlice: number, endSlice: number) =>
    <Radio.Group size={'large'} value={filter.otherThing.value}
      onChange={handleRadio('otherThing')}>
      {thingsFilter.slice(startSlice, endSlice)
        .map((thing, i) => <Radio.Button value={thing.value} key={`thing-${i}`}>
          {thing.description}
        </Radio.Button>)}
    </Radio.Group>;
  const renderOtherFilter = () => <div>
    <div>
      <b>Other</b>
    </div>
    <Item label={'status'} labelCol={{ span: 2 }} wrapperCol={{ span: 21 }}>
      <Select size={FORM_ELEMENT_SIZE} id={'otherStatus'} placeholder={'any'}
        mode='multiple'
        value={filter.otherStatus}
        onChange={handleSelector('otherStatus')}
        allowClear={true}>
        {statusFilter.map((statusItem) => (<Option key={statusItem.key}>{statusItem.label}</Option>))}
      </Select>
    </Item>
    <Item htmlFor={'otherThing'} labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
      <Col span={3}>
        {renderThings(0, 1)}
      </Col>
      <Col span={20}>
        {renderThings(1, 4)}
        {renderThings(4, 7)}
      </Col>
    </Item>
  </div>;
  const renderSearch = () => <div id='simple_layout'>
    <Search id={'roster-search-field'}
      placeholder={'Find some rosters by name or other things'}
      onSearch={handleSearch}
      style={{ width: 300 }}/>
  </div>;
  const renderTable = () => {
    let i = 0;
    const tableData = getRows.map((item) => {
      i++;
      return { rowNum: i, ...item };
    });
    return <ResultTable data={tableData}
      totalRecords={3}
      page={0}
      pageSize={10}
      callback={EMPTY_FUNC}
      headers={rowHeaders}
      key={'roster-rows-table-id'}
    />;
  };
  return [
    <Collapse defaultActiveKey={[]} key={'roster-collapse-id'}>
      <Panel key={'rosterSearchId'} header={'Extended search'}>
        <Form {...formItemLayout} className={'roster-search'}>
          <Row>
            <Col span={4}>{renderDatePicker()}</Col>
            <Col span={5}>{renderMainFilter()}</Col>
            <Col span={5}>{renderAdvancedFilter()}</Col>
            <Col span={10}>{renderOtherFilter()}</Col>
          </Row>
          <Row>
            {renderSearch()}
          </Row>
          <Item>
            <Button type={'primary'} htmlType={'submit'} onClick={() => handleSubmit(handleSearchCallback)}>
              Search
            </Button>
            &nbsp;&nbsp;&nbsp;
            {isEmptyObject(buffer) ?
              <a id={'clearAllFiltersId'} onClick={() => clearAllFilters()}>clear</a> :
              <a id={'restoreFiltersId'} onClick={() => restoreFiltersFromBuffer()}>restore data</a>}
          </Item>
        </Form>
      </Panel>
    </Collapse>, renderTable()
  ];
};

Roster.defaultProps = {
  handleSearchCallback: (filter: RosterFilterType) => {
    // eslint-disable-next-line no-console
    console.log(filter);
  }
};

export default connect()(Roster);
