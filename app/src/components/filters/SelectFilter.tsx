import React, { ReactElement } from 'react';
import { TreeSelect } from 'antd';
import { SelectValue } from 'antd/lib/select';
import { DataNode } from 'antd/lib/tree';
import { TreeSelectProps } from 'antd/lib/tree-select';
import { statusesMetaFilter } from '~dictionaries/rosterFilter';
import Statuses from '~types/classes/Statuses';
import { FORM_ELEMENT_SIZE } from '~const/common';

const treeData = statusesMetaFilter.map((item: Statuses, i: number): DataNode => ({
  title: item.description,
  value: `${i}-0-0`,
  key: `${i}-0-0`,
  children: item.statuses.map((node): DataNode => ({
    title: node.label,
    value: node.key,
    key: node.key
  }))
}));

const renderSelectFilter = (otherStatus: string[], handleTreeSelector: (value: SelectValue) => void): ReactElement => {
  const props: TreeSelectProps<SelectValue> = {
    id: 'selected',
    treeData,
    allowClear: true,
    value: otherStatus,
    onChange: handleTreeSelector,
    treeCheckable: true,
    showCheckedStrategy: 'SHOW_CHILD',
    placeholder: 'any',
    size: FORM_ELEMENT_SIZE,
    className: 'selected__select'
  };
  return <TreeSelect {...props} />;
};

export default renderSelectFilter;
