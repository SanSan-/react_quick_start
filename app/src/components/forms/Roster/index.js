import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { Button, Checkbox, Col, Collapse, DatePicker, Form, Input, message, Radio, Row, Select } from 'antd';
import ResultTable from '../../module/ResultTable';
import { rowHeaders } from '~constants/dictionary/headers';
import {
  thingsFilter,
  statusFilter,
  typesFilter,
  defaultValidators,
  defaultFilter
} from '~constants/dictionary/rosterFilter';
import { filterInnerObject, isEmpty, isEmptyObject } from '~utils/CommonUtils';
import { numValidator, textValidator } from '~utils/ValidationUtils';
import { FORM_ELEMENT_SIZE } from '~constants/common';
import { getRows } from '~app/mocks/mockTable';

const Panel = Collapse.Panel;
const Item = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;
const Search = Input.Search;

class Roster extends PureComponent {
  constructor (props) {
    super(props);
    this.setDateRange = this.setDateRange.bind(this);
    this.clearAllFilters = this.clearAllFilters.bind(this);
    this.restoreFiltersFromBuffer = this.restoreFiltersFromBuffer.bind(this);
    this.setValidator = this.setValidator.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleSelector = this.handleSelector.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    const searchFilter = props.searchFilter || defaultFilter.toJS();
    this.state = {
      filter: {
        ...searchFilter
      },
      validators: {
        ...defaultValidators.toJS()
      },
      buffer: null
    };
  }

  setDateRange = (startDate, endDate, value) => {
    this.setState({
      filter: {
        ...this.state.filter,
        [startDate]: value,
        [endDate]: value
      },
      buffer: null
    });
  };

  clearAllFilters = () => {
    this.setState({
      buffer: {
        filter: this.state.filter,
        validators: this.state.validators
      }
    });
    this.setState({
      filter: defaultFilter.toJS(),
      validators: defaultValidators.toJS()
    });
  };

  restoreFiltersFromBuffer = () => {
    this.setState({
      filter: this.state.buffer.filter,
      validators: this.state.buffer.validators
    });
    this.setState({ buffer: null });
  };

  setValidator = (key, validateStatus, help) => {
    this.setState({
      validators: {
        ...this.state.validators,
        [key]: {
          validateStatus,
          help
        }
      }
    });
  };

  validateInput = (key, callback, errorMessage = 'Validation error!') => (e) => {
    const value = e.target.value;
    if (isEmpty(value)) {
      return this.setValidator(key, null, '');
    }
    if (callback(value)) {
      this.setValidator(key, 'success', '');
    } else {
      this.setValidator(key, 'error', errorMessage);
    }
  };

  handleInput = (key) => (e) => {
    const value = e.target.value;
    if (isEmpty(value)) {
      return this.setValidator(key, null, '');
    }
    this.setState({
      filter: {
        ...this.state.filter,
        [key]: value
      },
      buffer: null
    });
  };

  handleRadio = (key) => (e) => {
    this.setState({
      filter: {
        ...this.state.filter,
        [key]: { value: e.target.value }
      },
      buffer: null
    });
  };

  handleCheckbox = (key) => (e) => {
    this.setState({
      filter: {
        ...this.state.filter,
        [key]: e.target.checked
      },
      buffer: null
    });
  };

  handleSelector = (key) => (value) => {
    this.setState({
      filter: {
        ...this.state.filter,
        [key]: value
      },
      buffer: null
    });
  };

  handleSearch = (value) => {
    if (!value || value.length === 0) {
      message.warning('Search field is empty!');
    }
  };

  handleSubmit = (callback) => {
    if (isEmptyObject(filterInnerObject(this.state.validators, 'validateStatus', 'error'))) {
      callback(this.state.filter);
    } else {
      message.error('Search is impossible! Fields has validation error!');
    }
  };

  renderDatePicker = () => (<div>
    <div>
      <b>Loading</b> <span style={{ float: 'right', marginRight: '12%' }}>
        <a id={'clearDateRangeId'}
          onClick={() => this.setDateRange('dateStart', 'dateEnd', null)}>clear</a></span>
    </div>
    <Item label={'from'} htmlFor={'dateStart'}>
      <DatePicker size={FORM_ELEMENT_SIZE} value={this.state.filter.dateStart}
        onChange={this.handleSelector('dateStart')}/>
    </Item>
    <Item label={'to'} htmlFor={'dateEnd'}>
      <DatePicker size={FORM_ELEMENT_SIZE} value={this.state.filter.dateEnd}
        onChange={this.handleSelector('dateEnd')}/>
    </Item>
    <div>
      <a id={'setDateRangeId'}
        onClick={() => this.setDateRange('dateStart', 'dateEnd', moment())}>today</a>
    </div>
  </div>);

  renderMainFilter = () => (<div>
    <div>
      <b>Main</b>
    </div>
    <Item label={'number'} hasFeedback
      validateStatus={this.state.validators.rosterNumber.validateStatus}
      help={this.state.validators.rosterNumber.help}>
      <Input size={FORM_ELEMENT_SIZE} placeholder={'XXX'} id={'rosterNumber'}
        value={this.state.filter.rosterNumber}
        onBlur={this.validateInput('rosterNumber', numValidator, 'Enter any digits')}
        onChange={this.handleInput('rosterNumber')}
        allowClear={true}/>
    </Item>
    <Item label={'type'}>
      <Select size={FORM_ELEMENT_SIZE} id={'rosterType'} value={this.state.filter.rosterType}
        onChange={this.handleSelector('rosterType')}>
        {typesFilter.toJS().map((typeItem) => (<Option key={typeItem}>{typeItem}</Option>))}
      </Select>
    </Item>
    <Item label={'is valid'}>
      <Checkbox size={FORM_ELEMENT_SIZE} value={this.state.filter.isRosterValidation}
        onChange={this.handleCheckbox('isRosterValidation')}/>
    </Item>
  </div>);

  renderAdvancedFilter = () => (<div>
    <div>
      <b>Advanced</b>
    </div>
    <Item label={'name'} hasFeedback
      validateStatus={this.state.validators.rosterName.validateStatus}
      help={this.state.validators.rosterName.help}>
      <TextArea size={FORM_ELEMENT_SIZE} autosize={{ minRows: 2, maxRows: 6 }}
        placeholder={'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'}
        id={'rosterName'}
        value={this.state.filter.rosterName}
        onBlur={this.validateInput('rosterName', textValidator, 'Maximum 255 symbols')}
        onChange={this.handleInput('rosterName')}/>
    </Item>
  </div>);

  renderThings = (startSlice, endSlice) => <Radio.Group size={'large'} value={this.state.filter.otherThing.value}
    onChange={this.handleRadio('otherThing')}>
    {thingsFilter.toJS().slice(startSlice, endSlice)
      .map((thing, i) => (<Radio.Button value={thing.value} key={`thing-${i}`}>
        {thing.description}
      </Radio.Button>))}
  </Radio.Group>;

  renderOtherFilter = () => (<div>
    <div>
      <b>Other</b>
    </div>
    <Item label={'status'} labelCol={{ span: 2 }} wrapperCol={{ span: 21 }}>
      <Select size={FORM_ELEMENT_SIZE} id={'otherStatus'} placeholder={'any'}
        mode='multiple'
        value={this.state.filter.otherStatus}
        onChange={this.handleSelector('otherStatus')}>
        {statusFilter.toJS().map((statusItem) => (<Option key={statusItem.id}>{statusItem.description}</Option>))}
      </Select>
    </Item>
    <Item htmlFor={'otherThing'} labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
      <Col span={3}>
        {this.renderThings(0, 1)}
      </Col>
      <Col span={20}>
        {this.renderThings(1, 4)}
        {this.renderThings(4, 7)}
      </Col>
    </Item>
  </div>);

  renderSearch = () => <div id='simple_layout'>
    <Search id={'roster-search-field'}
      placeholder={'Find some rosters by name or other things'}
      onSearch={this.handleSearch}
      style={{ width: 300 }}/>
  </div>;

  renderTable = () => {
    let i = 0;
    const tableData = getRows.map((item) => {
      i++;
      return { rowNum: i, ...item };
    });
    return <ResultTable data={tableData}
      totalRecords={3}
      pageNum={0}
      pageSize={10}
      paginationCallback={() => {
      }}
      headers={rowHeaders}
    />;
  };

  render () {
    const { handleSearchCallback } = this.props;
    const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 17 } };
    return [<Collapse defaultActiveKey={[]}>
      <Panel key={'rosterSearchId'} header={'Extended search'}>
        <Form {...formItemLayout} className={'roster-search'}>
          <Row>
            <Col span={4}>{this.renderDatePicker()}</Col>
            <Col span={5}>{this.renderMainFilter()}</Col>
            <Col span={5}>{this.renderAdvancedFilter()}</Col>
            <Col span={10}>{this.renderOtherFilter()}</Col>
          </Row>
          <Row>
            {this.renderSearch()}
          </Row>
          <Item>
            <Button type={'primary'} htmlType={'submit'} onClick={() => this.handleSubmit(handleSearchCallback)}>
              Search
            </Button>
            &nbsp;&nbsp;&nbsp;
            {isEmpty(this.state.buffer) ?
              <a id={'clearAllFiltersId'} onClick={() => this.clearAllFilters()}>clear</a> :
              <a id={'restoreFiltersId'} onClick={() => this.restoreFiltersFromBuffer()}>restore data</a>}
          </Item>
        </Form>
      </Panel>
    </Collapse>, this.renderTable()];
  }
}

Roster.propTypes = {
  searchFilter: PropTypes.object,
  handleSearchCallback: PropTypes.func,
  dispatch: PropTypes.func.isRequired
};

export default connect()(Roster);
