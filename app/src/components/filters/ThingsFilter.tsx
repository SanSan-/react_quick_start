import React, { ReactElement } from 'react';
import { Button, Col, Form, Row } from 'antd';
import { EMPTY_STRING } from '~const/common';
import { VISIBILITY_ACTIVE } from '~const/styles';
import { thingsFilter } from '~dictionaries/rosterFilter';
import { isEmptyArray } from '~utils/CommonUtils';

const Item = Form.Item;

const colClassName = 'things-filter-change-col';

export const updateThingsFilter = (current: string[], index: number): string[] => {
  if (isEmptyArray(thingsFilter[index].weight)) {
    return [];
  }
  return thingsFilter[index].weight.every((thing) => current.includes(thing)) ?
    current.filter((thing) => !thingsFilter[index].weight.includes(thing)) :
    Array.from(new Set(current.concat(thingsFilter[index].weight)));
};

const renderThing = (index: number, isActive: string, handleThing: (index: number) => void): ReactElement =>
  <Button className={`thing-btn${isActive}`} id={`thing-btn-${thingsFilter[index].value}`}
    value={thingsFilter[index].value} onClick={(): void => handleThing(index)}>
    {thingsFilter[index].description}
  </Button>;

const renderThingsFilter = (current: string[], handleThing: (index: number) => void): ReactElement => {
  const actives = thingsFilter.map(
    (thing): string => thing.weight.every((el) => current.includes(el)) ? VISIBILITY_ACTIVE : EMPTY_STRING);
  return <Item htmlFor={'otherThing'} labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
    <Row>
      <Col span={2} className={colClassName}>
        <div>
          {renderThing(0, isEmptyArray(current) ? VISIBILITY_ACTIVE : EMPTY_STRING, handleThing)}
        </div>
      </Col>
      <Col span={2} className={colClassName}>
        <div>
          {renderThing(1, actives[1], handleThing)}
        </div>
      </Col>
      <Col span={2} className={colClassName}>
        <div>
          {renderThing(2, actives[2], handleThing)}
        </div>
      </Col>
      <Col span={2} className={colClassName}>
        <div>
          {renderThing(3, actives[3], handleThing)}
        </div>
      </Col>
    </Row>
    <Row>
      <Col span={2} className={colClassName}>
        <div>
          &nbsp;
        </div>
      </Col>
      <Col span={2} className={colClassName}>
        <div>
          {renderThing(4, actives[4], handleThing)}
        </div>
      </Col>
      <Col span={2} className={colClassName}>
        <div>
          {renderThing(5, actives[5], handleThing)}
        </div>
      </Col>
      <Col span={2} className={colClassName}>
        <div>
          {renderThing(6, actives[6], handleThing)}
        </div>
      </Col>
    </Row>
  </Item>;
};

export default renderThingsFilter;
