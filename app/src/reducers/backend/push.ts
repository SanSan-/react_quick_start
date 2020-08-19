import { NotificationType, PushState } from '~types/state';
import { EMPTY_ACTION, EMPTY_STRING } from '~const/common';
import { PushAction } from '~types/action';
import produce from 'immer';
import ActionType from '~enums/Backend';

const retain = (
  object: Record<string, NotificationType | Record<string, unknown>>,
  ids: string[]
): Record<string, NotificationType> => {
  const idSet = new Set(ids);
  return Object.keys(object)
    .filter((key: string) => idSet.has(key))
    .reduce((acc, current) => ({ ...acc, [current]: object[current] }), {});
};

export const initialState: PushState = {
  eTag: EMPTY_STRING,
  notifications: {},
  notificationIds: [],
  listeners: []
};

const push = (state: PushState = initialState, action: PushAction = EMPTY_ACTION): PushState =>
  produce(state, (draft: PushState): PushState => {
    switch (action.type) {
      case ActionType.SESSION_CREATED: {
        draft.sessionId = action.notificationSessionId;
        return draft;
      }
      case ActionType.NOTIFICATIONS_FOUND: {
        draft.eTag = action.dto.eTag;
        draft.notificationIds = action.dto.notificationIds;
        draft.notifications = retain(state.notifications, action.dto.notificationIds);
        return draft;
      }
      case ActionType.NOTIFICATIONS_LOADED: {
        draft.notifications = { ...state.notifications, [action.notificationId]: action.data };
        return draft;
      }
      case ActionType.SUBSCRIBE: {
        const { listener } = action;
        draft.listeners = [...state.listeners, listener];
        return draft;
      }
      case ActionType.UNSUBSCRIBE: {
        const { listener } = action;
        draft.listeners = state.listeners.filter((item) => item !== listener);
        return draft;
      }
      default:
        return draft;
    }
  });

export default push;
