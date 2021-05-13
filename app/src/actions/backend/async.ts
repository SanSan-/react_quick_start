import { AnyAction } from 'redux';
import { Either, right } from '@sweet-monads/either';
import { executeRequest, handleErrorJson, processEnd, processStart } from '~actions/backend/request';
import { createSession, subscribe, unsubscribe } from '~actions/backend/push';
import { ControllerPath, InvokeAsync } from '~enums/Routes';
import Type from '~enums/Types';
import { AsyncAction, AsyncOptions, ThunkResult } from '~types/action';
import { ErrorType } from '~types/dto';
import { AnyRequest, AnyResponse } from '~types/response';
import { NotificationType } from '~types/state';

export const defaultOptions: AsyncAction = {
  moduleId: SERVER_MODULE_NAME,
  spinner: false
};

export const executeRequestAsync = <T extends AnyResponse> (
  endpointId: string,
  parameters: Record<string, unknown>,
  options: AsyncAction = defaultOptions
): ThunkResult<Promise<Either<ErrorType, T>>, AnyAction> => async (dispatch) => {
    const actualOptions = { ...defaultOptions, ...options };
    const invokeSyncOptions: AsyncOptions = {
      controllerPath: ControllerPath.INVOKE_ASYNC,
      moduleId: actualOptions.moduleId,
      spinner: false
    };
    dispatch(processStart(actualOptions.spinner));
    const response = await dispatch(createSession())
      .then((session) => session.asyncChain((notificationSessionId) =>
        dispatch(executeRequest<AnyRequest>(endpointId, { ...parameters, notificationSessionId }, invokeSyncOptions))))
      .then((either) => either.asyncChain(({ requestId }) => {
        if (typeof requestId === Type.STRING) {
          return new Promise<Either<unknown, unknown>>((resolve, reject) => {
            const listener = (notification: NotificationType): void => {
              if (notification.type === InvokeAsync.REPLY && notification.requestId === requestId) {
                resolve(right(notification.data));
                dispatch(unsubscribe(listener));
              }
              if (notification.type === InvokeAsync.ERROR && notification.requestId === requestId) {
                handleErrorJson(notification.error, reject);
                dispatch(unsubscribe(listener));
              }
            };
            dispatch(subscribe(listener));
          });
        }
      }));
    dispatch(processEnd(actualOptions.spinner));
    return response.mapLeft((e) => {
      throw e;
    });
  };
