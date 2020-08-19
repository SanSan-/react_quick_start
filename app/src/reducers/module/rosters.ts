import { RosterFilter } from '~types/filters';
import dayjs from 'dayjs';
import ActionType from '~enums/module/Roster';
import { DATE_FORMAT } from '~const/common';
import { RostersState } from '~types/state';
import { pageableState } from '~model/states/PageableState';
import { rowHeaders } from '~dictionaries/headers';
import { SortType } from '~enums/SortType';
import { Pagination, RowsDto } from '~types/dto';
import { RosterAction } from '~types/action';
import produce, { original } from 'immer';
import { changeSearchFilter, changeSortParameters, updatePagination } from '~utils/ReducerUtils';

export const defaultSearchFilter: RosterFilter = {
  dateStart: dayjs().format(DATE_FORMAT),
  dateEnd: dayjs().format(DATE_FORMAT)
};

export const emptySearchFilter: RosterFilter = {
  dateEnd: dayjs().format(DATE_FORMAT)
};

export const initialState: RostersState = {
  ...pageableState,
  data: [],
  searchFilter: defaultSearchFilter,
  tableHeaders: rowHeaders,
  sortKey: null,
  sortType: SortType.DESC as string
};

const loadSuccess = (draft: RostersState, rosters: RowsDto[], pagination: Pagination): RostersState => {
  const { pageNum, pageSize, totalRecords } = updatePagination(original(draft), pagination);
  draft.data = rosters || [];
  draft.totalRecords = totalRecords;
  draft.serverFilter = {
    pageNum,
    pageSize
  };
  return draft;
};

const rosters = (state: RostersState = initialState, action: RosterAction): RostersState =>
  produce(state, (draft: RostersState): RostersState => {
    switch (action.type) {
      case ActionType.LOAD_SUCCESS:
        return loadSuccess(draft, action.rosters, action.pagination);
      case ActionType.CHANGE_SEARCH_FILTER:
        return changeSearchFilter(draft, action.filter);
      case ActionType.CHANGE_SORT:
        return changeSortParameters(draft, action.sortKey, action.sortType);
      case ActionType.INIT:
        return initialState;
      default:
        return draft;
    }
  });

export default rosters;
