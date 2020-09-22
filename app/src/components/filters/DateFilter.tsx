import React, { ReactElement } from 'react';
import { Col, DatePicker, Form, Row } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { DATE_FORMAT, FORM_ELEMENT_SIZE } from '~const/common';
import { getValidDayjs } from '~utils/DateUtils';

const Item = Form.Item;

interface Props {
  startDate: string;
  endDate: string;
  callback: (startDate: string, endDate: string) => void;
  label?: string;
  isDisabled?: boolean;
  className?: string;
  todayId?: string;
  clearDateId?: string;
  startDateHtmlFor?: string;
  endDateHtmlFor?: string;
}

const DateFilter: React.FC<Props> = ({
  startDate, endDate, callback, label, isDisabled, className, todayId, clearDateId, startDateHtmlFor, endDateHtmlFor
}: Props): ReactElement => {
  const setDateToToday = (): void => callback(dayjs().format(DATE_FORMAT), dayjs().format(DATE_FORMAT));
  const clearDate = (): void => callback(null, null);

  return <div className={className || null}>
    <Row>
      <Col>
        <div>
          <b>{label || null}</b>
          <a className='date-filter-label-clear' id={clearDateId} onClick={() => clearDate()}
            disabled={isDisabled}>clear</a>
        </div>
      </Col>
    </Row>
    <Row>
      <Col>
        <div>
          <Item label={'from'} htmlFor={startDateHtmlFor} labelCol={{ span: 5 }}
            wrapperCol={{ span: 19 }}>
            <DatePicker size={FORM_ELEMENT_SIZE} value={getValidDayjs(startDate, DATE_FORMAT)}
              disabled={isDisabled}
              className={'date-input'}
              onChange={(newDate: Dayjs): void => callback(newDate ? newDate.format(DATE_FORMAT) : null, endDate)}
              format={DATE_FORMAT}/>
          </Item>
        </div>
      </Col>
    </Row>
    <Row>
      <Col>
        <div>
          <Item label={'to'} htmlFor={endDateHtmlFor} labelCol={{ span: 5 }}
            wrapperCol={{ span: 19 }}>
            <DatePicker size={FORM_ELEMENT_SIZE} value={getValidDayjs(endDate, DATE_FORMAT)}
              disabled={isDisabled}
              className={'date-input'}
              onChange={(newDate: Dayjs): void => callback(startDate, newDate ? newDate.format(DATE_FORMAT) : null)}
              format={DATE_FORMAT}/>
          </Item>
        </div>
      </Col>
    </Row>
    <Row>
      <Col>
        <div>
          <a id={todayId} onClick={() => setDateToToday()} disabled={isDisabled}>today</a>
        </div>
      </Col>
    </Row>
  </div>;
};

DateFilter.defaultProps = {
  isDisabled: false
};

export default DateFilter;
