import { BreadcrumbState } from '~types/state';
import { BreadcrumbAction, ThunkResult } from '~types/action';
import ActionType from '~enums/module/Breadcrumb';
import { AnyAction } from 'redux';
import { push } from 'connected-react-router';

export const updateBreadcrumb = (value: BreadcrumbState): BreadcrumbAction => ({
  type: ActionType.UPDATE,
  value
});

export const addBreadcrumb = (value: BreadcrumbState): BreadcrumbAction => ({
  type: ActionType.ADD,
  value
});

export const selectBreadcrumb = (value: BreadcrumbState): ThunkResult<void, AnyAction> => (dispatch) => {
  dispatch(push(value.link));
  dispatch(updateBreadcrumb(value));
};
