import * as backend from '~actions/backend';
import { RosterAction, ThunkResult } from '~types/action';
import ActionType from '~enums/module/Roster';
import { RosterFilter } from '~types/filters';
import { Either } from '@sweet-monads/either';
import { ErrorType, Pagination, RowsDto } from '~types/dto';
import { RostersResponse } from '~types/response';
import { rosterApi } from '~dictionaries/backend';

const init = (): RosterAction => ({
  type: ActionType.INIT
});

export const changeSearchFilter = (filter: RosterFilter): RosterAction => ({
  type: ActionType.CHANGE_SEARCH_FILTER,
  filter
});

export const changeSort = (sortKey: string, sortType: string): RosterAction => ({
  type: ActionType.CHANGE_SORT,
  sortKey,
  sortType
});

export const loadSuccess = (rosters: RowsDto[], pagination: Pagination): RosterAction => ({
  type: ActionType.LOAD_SUCCESS,
  rosters,
  pagination
});

export const load = (
  filter: RosterFilter, pageNum: number, pageSize: number, sortKey: string, sortType: string
): ThunkResult<Promise<void>, RosterAction> => (dispatch) => (
  dispatch(backend.executeRequest(rosterApi.find, { filter, pageNum, pageSize, sortKey, sortType }))
    .then((either: Either<ErrorType, RostersResponse>) => {
      either.mapRight((response) =>
        dispatch(backend.wrapResponse(response, loadSuccess(response.rows, response.pagination), init())));
    })
    // eslint-disable-next-line no-console
    .catch((response: Error) => console.error(response))
);
