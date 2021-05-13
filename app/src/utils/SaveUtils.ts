import saveAs from 'file-saver';
import * as backend from '~actions/backend';
import { EMPTY_STRING } from '~const/common';
import { ContentType } from '~enums/Http';
import { SaveFileResponseAction, SendActionResponseAction, ThunkResult } from '~types/action';
import { AnyAction } from 'redux';
import { Either } from '@sweet-monads/either';
import { ErrorType } from '~types/dto';
import { ReportResponse } from '~types/response';

export const saveBase64StringAsFile = (data: string, fileName: string): void => {
  const blob = new Blob(
    [new Uint8Array(window.atob(data).split(EMPTY_STRING).map((symbol) => symbol.charCodeAt(0)))],
    { type: ContentType.OCTET_STREAM }
  );
  saveAs(blob, fileName);
};

export const exportToExcelAction = (
  parameters: Record<string, string>,
  endpoint: string,
  callback: (binaryData: number[], fileName: string) => SendActionResponseAction,
  errorCallback: () => AnyAction,
  timezone?: string
): ThunkResult<Promise<void>, SaveFileResponseAction> =>
  (dispatch) =>
    (dispatch(backend.executeRequestAsync(endpoint, { ...parameters, timezone }))
      .then((either: Either<ErrorType, ReportResponse>) => {
        either.mapRight((response) =>
          dispatch(backend.wrapResponse(response, callback(response.data, response.fileName), errorCallback()))
        ).mapLeft(() => dispatch(errorCallback()));
      })
      .catch((response: Error) => {
        // eslint-disable-next-line no-console
        console.error(response);
        dispatch(errorCallback());
      })
    );
