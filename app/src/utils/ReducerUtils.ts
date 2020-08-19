import { PageableState, RostersState, SortableState } from '~types/state';
import { Pagination } from '~types/dto';
import { RosterFilter } from '~types/filters';

export const changeSearchFilter = <S extends RostersState, T extends RosterFilter> (
  draft: S,
  filter: T
): S => {
  draft.searchFilter = filter;
  return draft;
};

export const changeSortParameters = <T extends SortableState> (
  draft: T,
  sortKey: string,
  sortType: string
): T => {
  draft.sortKey = sortKey;
  draft.sortType = sortType;
  return draft;
};

export const updatePagination = <T extends PageableState> (
  state: T,
  pagination: Pagination
): Pagination => {
  const { serverFilter, totalRecords } = state;
  const pageNum = pagination ? pagination.pageNum : serverFilter.pageNum;
  const pageSize = pagination ? pagination.pageSize : serverFilter.pageSize;
  const newTotalRecords = pagination ? pagination.totalRecords : totalRecords;
  return { pageNum, pageSize, totalRecords: newTotalRecords };
};
