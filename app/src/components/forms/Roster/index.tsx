import React, { ReactElement, useEffect } from 'react';
import { connect } from 'react-redux';
import { Input, message } from 'antd';
import * as actions from '~actions/module/rosters';
import ResultTable from '~components/common/ResultTable';
import { defaultFilter } from '~dictionaries/rosterFilter';
import { DOT_SIGN } from '~const/common';
import { RosterFilter, ServerFilter } from '~types/filters';
import { GeneralState } from '~types/store';
import RosterSearch from '~forms/Roster/search';
import { createHandleSearch } from '~utils/FilterUtils';
import { emptySearchFilter } from '~reducers/module/rosters';
import { isEmpty } from '~utils/CommonUtils';
import { trimSpaces } from '~utils/ValidationUtils';
import { bindActionCreators } from 'redux';
import { RosterAction, ThunkResult } from '~types/action';
import { RostersState } from '~types/state';
import { RowsDto } from '~types/dto';
import Header from '~types/classes/Header';

const Search = Input.Search;

interface Props {
  state: RostersState;
  changeSearchFilter: (filter: RosterFilter) => RosterAction;
  changeSort: (sortKey: string, sortType: string) => RosterAction;
  load: (
    filter: RosterFilter, pageNum: number, pageSize: number, sortKey: string, sortType: string
  ) => ThunkResult<Promise<void>, RosterAction>;
}

const filterMatcher = <T extends RosterFilter> (obj: T, key: string): boolean => (
  !obj[key] || isEmpty(obj[key]) || (obj[key].length === 0) ||
  obj[key] === 'any' || (key === 'otherThings' && obj[key] === defaultFilter[key])
);

const filterMapper = <T extends RosterFilter, K extends keyof T, E extends T[K]> (obj: T, key: K): E => {
  switch (key) {
    case 'rosterSum':
      return trimSpaces(obj[key]).replace(/,|-/g, DOT_SIGN);
    default:
      return obj[key];
  }
};

const renderFastSearch = (callback: (value: string) => void) => <div id='simple_layout'>
  <Search id={'roster-search-field'}
    key={'roster-fast-search-id'}
    placeholder={'Find some rosters by name or other things'}
    onSearch={callback}
    style={{ width: 300 }}/>
</div>;

const renderTable = (
  data: RowsDto[], tableHeaders: Header[], serverFilter: ServerFilter, pageSizeOptions: string[],
  totalRecords: number,
  callback: (currentPage: number, pageSize: number, sortKey: string, sortType: string) => void
) => {
  if (!data || data.length === 0) {
    return <div key={'roster-rows-table-id'}>There is no rosters</div>;
  }
  const tableData = data.map((item, i) => ({ rowNum: serverFilter.pageNum * serverFilter.pageSize + i, ...item }));
  return <ResultTable data={tableData}
    totalRecords={totalRecords}
    page={serverFilter.pageNum}
    pageSize={serverFilter.pageSize}
    pageSizeOptions={pageSizeOptions}
    callback={callback}
    headers={tableHeaders}
    key={'roster-rows-table-id'}
  />;
};

const Roster: React.FC<Props> = ({ state, changeSearchFilter, changeSort, load }: Props): ReactElement => {
  const { data, tableHeaders, searchFilter, serverFilter, sortKey, sortType, pageSizeOptions, totalRecords } = state;
  useEffect(() => {
    load(searchFilter, 0, serverFilter.pageSize, sortKey, sortType);
  }, []);
  const handleChangePage = (page: number, pageSize: number, newSortKey: string, newSortType: string): void => {
    changeSort(newSortKey, newSortType);
    load(searchFilter, page - 1, pageSize, newSortKey, newSortType);
  };
  const updateFilter = (filter: RosterFilter): void => {
    changeSearchFilter(filter);
    load(filter, serverFilter.pageNum, serverFilter.pageSize, sortKey, sortType);
  };
  const handleSearch = createHandleSearch(emptySearchFilter, updateFilter, filterMatcher, filterMapper);
  const handleFastSearch = (value: string) => {
    if (!value || value.length === 0) {
      message.warning('Search field is empty!');
    }
  };
  return <div>
    <RosterSearch searchFilter={searchFilter} handleCallback={handleSearch} key={'roster-search-collapse-id'}/>
    {renderFastSearch(handleFastSearch)}
    {renderTable(data, tableHeaders, serverFilter, pageSizeOptions, totalRecords, handleChangePage)}
  </div>;
};

export default connect((state: GeneralState) => ({
  state: state.app.module.rosters
}), (dispatch) => bindActionCreators(actions, dispatch))(Roster);
