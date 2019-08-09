import React, { PureComponent } from 'react';

import { Table } from 'antd';
import PropTypes from 'prop-types';
import { isEmptyArray } from '~utils/CommonUtils';

class ResultTable extends PureComponent {

  render () {
    const { data, headers, pageNum, pageSize, totalRecords, paginationCallback } = this.props;
    const dataSource = isEmptyArray(data) ? null : data.map((element, i) => ({ ...element, key: i }));
    return isEmptyArray(dataSource) ? null : (
      <Table columns={headers} dataSource={dataSource} style={{ whiteSpace: 'pre' }}
             pagination={{
               current: pageNum + 1, pageSize: pageSize, total: totalRecords, style: { float: 'left' },
               showSizeChanger: true, pageSizeOptions: [1, 5, 10, 25, 50, 100],
               showTotal: ((total, range) => `Show records from ${range[0]} to ${range[1]} of ${total}`),
               onChange: paginationCallback, onShowSizeChange: paginationCallback
             }}/>);
  }
}

ResultTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  headers: PropTypes.arrayOf(PropTypes.object),
  totalRecords: PropTypes.number,
  pageSize: PropTypes.number,
  pageNum: PropTypes.number,
  paginationCallback: PropTypes.func
};

export default ResultTable;
