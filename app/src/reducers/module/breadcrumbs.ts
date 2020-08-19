import { BreadcrumbState } from '~types/state';
import { APP_DESC } from '~const/settings';
import { SLASH_SIGN } from '~const/common';
import produce, { original } from 'immer';
import { isEmpty } from '~utils/CommonUtils';
import { BreadcrumbAction } from '~types/action';
import ActionType from '~enums/module/Breadcrumb';
import { LOCATION_CHANGE } from 'connected-react-router';

export const initialState: BreadcrumbState[] = [{ title: APP_DESC, link: SLASH_SIGN }];

const updateBreadcrumb = (draft: BreadcrumbState[], link: string): BreadcrumbState[] => {
  for (let i = 0; i < original(draft).length; i++) {
    if (!isEmpty(original(draft)[i].link) && original(draft)[i].link.includes(link)) {
      draft.slice(i + 1, original(draft).length - i);
      break;
    }
  }
  return draft;
};

const addBreadcrumb = (draft: BreadcrumbState[], value: BreadcrumbState): BreadcrumbState[] => {
  if (!original(draft).some((item) => (item.title === value.title || item.link === value.link))) {
    draft.push(value);
    return draft;
  }
  for (let i = 0; i < original(draft).length; i++) {
    if (original(draft)[i].title === value.title || original(draft)[i].link === value.link) {
      draft[i] = value;
      break;
    }
  }
  return draft;
};

const breadcrumbs = (state: BreadcrumbState[] = initialState, action: BreadcrumbAction): BreadcrumbState[] =>
  produce(state, (draft: BreadcrumbState[]): BreadcrumbState[] => {
    switch (action.type) {
      case ActionType.UPDATE:
        return updateBreadcrumb(draft, action.value.link);
      case ActionType.ADD:
        return addBreadcrumb(draft, action.value);
      case LOCATION_CHANGE: {
        if (action.payload && action.payload.location.pathname === SLASH_SIGN) {
          return [state[0]];
        }
        return updateBreadcrumb(draft, action.payload.location.pathname);
      }
      default:
        return draft;
    }
  });

export default breadcrumbs;
