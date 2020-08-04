import { Table } from 'antd';
import React, { ReactElement, useState } from 'react';
import { isEmptyArray } from '~utils/CommonUtils';
import Header from '~types/classes/Header';
import useWindowResize from '~hooks/UseWindowResize';
import ResizableTitle from '../ResizableTitle';
import { EMPTY_FUNC } from '~const/common';
import SortType from '~enums/SortType';
import { Sort } from '~const/Sort';
import { PaginationConfig } from 'antd/lib/pagination';
import { SortOrder } from 'antd/lib/table/interface';

interface Props {
  data?: Array<Record<string, unknown>>;
  defaultExpandAllRows?: boolean;
  headers?: Array<Header>;
  totalRecords?: number;
  page?: number;
  pageSize?: number;
  pageSizeOptions?: Array<string>;
  callback?: (currentPage: number, pageSize: number, newSortKey: string, newSortType: SortType) => void;
  rowSelection?: Record<string, unknown>;
  showPagination?: boolean;
  style?: React.CSSProperties;
}

interface SortedInfoType {
  field?: string;
  order?: SortOrder;
}

const initialSortedInfo: SortedInfoType = {
  field: null,
  order: null
};

const ResultTable: React.FC<Props> = ({
  data, defaultExpandAllRows, headers, page, pageSize, rowSelection,
  pageSizeOptions, totalRecords, callback, showPagination, style
}: Props): ReactElement => {
  const [state, setState] = useState({
    columns: headers,
    tableWidth: isEmptyArray(headers) ? 0 : headers.map((header) => header.width)
      .reduce((acc, val) => acc + val, 0)
  });
  const [sortedInfo, setSortedInfo] = useState(initialSortedInfo);
  const windowSize = useWindowResize();
  const components = { header: { cell: ResizableTitle } };
  const dataSource = isEmptyArray(data) ? null : data.map((element, i) => ({ ...element, key: i }));
  const handleResize = (index: number) => (_e: Event, { size }: { size: { width: number, height: number } }): void => {
    setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width
      };
      return { columns: nextColumns, tableWidth: columns.map((col) => col.width).reduce((acc, val) => acc + val, 0) };
    });
  };
  const columns = isEmptyArray(state.columns) ? [] : state.columns.map((col, index) => ({
    ...col,
    sorter: col.sortName ? EMPTY_FUNC : null,
    sortOrder: col.sortName ? sortedInfo.field === col.sortName && sortedInfo.order : null,
    onHeaderCell: (column: Header): Record<string, unknown> => ({
      width: column.width,
      onResize: handleResize(index)
    })
  }));
  const handleChange = (
    { current, pageSize: newPageSize }: PaginationConfig,
    _filters: Partial<Record<keyof string, string[]>>,
    { column, order }: { column: Header, order: SortOrder }
  ): void => {
    setSortedInfo({ order: order || null, field: column ? column.sortName : null });
    callback(current, newPageSize, column ? column.sortName : null, Sort[order] || SortType.NONE);
  };
  return isEmptyArray(dataSource) ? null : (
    <Table columns={columns} dataSource={dataSource} defaultExpandAllRows={defaultExpandAllRows}
      style={{ whiteSpace: 'pre-wrap', maxWidth: windowSize.width - 125, ...style }}
      components={components}
      scroll={state.tableWidth > windowSize.width - 125 ? { x: state.tableWidth } : {}}
      rowSelection={rowSelection}
      onChange={handleChange}
      pagination={showPagination ? {
        current: page + 1, pageSize, total: totalRecords, style: { float: 'left' }, pageSizeOptions,
        showSizeChanger: !isEmptyArray(pageSizeOptions),
        showTotal: (total, range): string => `Show records from ${range[0]} to ${range[1]} of ${total}`
      } : false}/>);
};

ResultTable.defaultProps = {
  showPagination: true,
  rowSelection: null
};

export default ResultTable;
