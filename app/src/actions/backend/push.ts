import { AnyAction } from 'redux';
import { Either, right } from '@sweet-monads/either';
import { fetchGet, wrapFetchJson } from '~actions/backend/fetch';
import { showError } from '~actions/common';
import { EMPTY_STRING } from '~const/common';
import ActionType from '~enums/Backend';
import { NotificationTag } from '~enums/Html';
import Type from '~enums/Types';
import { Push } from '~enums/Routes';
import { GetStateAction, ThunkResult } from '~types/action';
import { NotificationType, PushListener, PushState } from '~types/state';
import { DefaultDispatch } from '~types/store';

const onNotification = (data: NotificationType, listener: PushListener) => (): void => {
  listener(data);
};

export const loadNotifications = () => (dispatch: DefaultDispatch, getState: GetStateAction): Promise<unknown[]> => {
  const state = getState().app.backend.push;
  const promises: Promise<unknown>[] = [];
  state.notificationIds.forEach((notificationId: string) => {
    if (typeof state.notifications[notificationId] === Type.UNDEFINED) {
      promises.push(wrapFetchJson<NotificationType>(Push.FIND_BY_NOTIFICATION_ID, encodeURIComponent(notificationId))
        .then((json) => json.mapLeft((error) =>
          dispatch(showError(EMPTY_STRING, error.message, EMPTY_STRING)))
          .mapRight((data): void => {
            const { listeners } = getState().app.backend.push;
            listeners.forEach((listener) => dispatch(onNotification(data, listener)));
            dispatch({ type: ActionType.NOTIFICATIONS_LOADED, notificationId, data });
          })));
    }
  });
  return Promise.all(promises);
};

export const waitNotifications = (
  sessionId: string,
  eTag: string = EMPTY_STRING,
  timeout = 1000
): ThunkResult<Promise<void>, AnyAction> => (dispatch) => new Promise((resolve, reject): void => {
  setTimeout(() => {
    wrapFetchJson<PushState>(
      Push.FIND_BY_SESSION_ID,
      `${encodeURIComponent(sessionId)}${NotificationTag.E}${encodeURIComponent(eTag)}`
    ).then((pushState) => {
      pushState.mapRight((dto) => {
        dispatch({ type: ActionType.NOTIFICATIONS_FOUND, dto });
        setTimeout(() => {
          dispatch(loadNotifications());
        }, 0);
        resolve();
      }).mapLeft((error) => {
        reject(error);
      });
    }).catch((error) => {
      dispatch(waitNotifications(sessionId, eTag, 10000));
      reject(error);
    });
  }, timeout);
});

export const createSession = () =>
  async (dispatch: DefaultDispatch, getState: GetStateAction): Promise<Either<unknown, string>> => {
    const state = getState().app.backend.push;
    if (state.sessionId) {
      dispatch(waitNotifications(notificationSessionId, EMPTY_STRING, 0));
      return right(state.sessionId);
    }
    const session = await fetchGet(Push.NEW_SESSION);
    return session.asyncChain(async (response) => {
      const notificationSessionId = await response.text();
      dispatch({ type: ActionType.SESSION_CREATED, notificationSessionId });
      dispatch(waitNotifications(notificationSessionId, EMPTY_STRING, 0));
      return right(notificationSessionId);
    });
  };

const valuesPolyfill = <T> (data: Record<string, T>): T[] => Object.keys(data).map((key) => data[key]);

export const subscribe = (listener: PushListener) => (dispatch: DefaultDispatch, getState: GetStateAction): void => {
  dispatch({ type: ActionType.SUBSCRIBE, listener });
  const state = getState().app.backend.push;
  valuesPolyfill(state.notifications).forEach((notification) => listener(notification));
};

export const unsubscribe = (listener: PushListener) => (dispatch: DefaultDispatch): void => {
  dispatch({ type: ActionType.UNSUBSCRIBE, listener });
};
