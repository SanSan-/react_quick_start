import { ReactNode } from 'react';
import { DEFAULT_ALERT_OK, DEFAULT_CONFIRM_CANCEL, DEFAULT_CONFIRM_OK } from '~const/Dialog';
import ActionType from '~enums/Common';
import Spinner from '~enums/Spinner';
import Dialog from '~enums/module/Dialog';
import { CommonAction, GetStateAction, ThunkResult } from '~types/action';
import { AnyResponse } from '~types/response';
import { DefaultDispatch } from '~types/store';
import { CommonDialog } from '~types/state';

export const showSpinner = (id: string = Spinner.ID, message: string = Spinner.MESSAGE): CommonAction => ({
  type: ActionType.SPINNER_SHOW,
  id,
  message
});

export const hideSpinner = (id: string = Spinner.ID, force = false) =>
  (dispatch: DefaultDispatch, getState: GetStateAction): void => {
    const { spinners } = getState().app.common;
    const timestamp = spinners[id] && spinners[id].timestamp || 0;
    const now = new Date().getTime();
    if (force || !Spinner.HIDE_DELAY || (now - timestamp) >= Spinner.HIDE_DELAY) {
      dispatch({
        type: ActionType.SPINNER_HIDE,
        id,
        force
      });
    } else {
      window.setTimeout(() => dispatch({
        type: ActionType.SPINNER_HIDE,
        id,
        force
      }), Spinner.HIDE_DELAY - (now - timestamp));
    }
  };

export const showBackground = (): CommonAction => ({
  type: ActionType.BACKGROUND_SHOW
});

export const hideBackground = (): CommonAction => ({
  type: ActionType.BACKGROUND_HIDE
});

export const showModal = (layerId: string, data: string, title: string): CommonAction => ({
  type: ActionType.MODAL_SHOW,
  layerId,
  data,
  title
});

export const hideModal = (id: string): CommonAction => ({
  type: ActionType.MODAL_HIDE,
  id
});

export const hideModals = (): CommonAction => ({
  type: ActionType.MODALS_HIDE
});

export const showDialog = (payload: CommonDialog): ThunkResult<Promise<CommonAction>, CommonAction> =>
  (dispatch) => new Promise((resolve, reject): CommonAction =>
    dispatch({
      type: ActionType.DIALOG_SHOW,
      payload: {
        ...payload,
        resolve,
        reject
      }
    }));

export const hideDialog = (index: number): CommonDialog => ({
  type: ActionType.DIALOG_HIDE,
  index
});

export const showAlert = (title: string, message: string, okLabel: string = DEFAULT_ALERT_OK):
  ThunkResult<Promise<CommonAction>, CommonAction> => showDialog({
  type: Dialog.ALERT,
  title,
  message,
  okLabel
});

export const showConfirm = (
  title: string, message: string, okLabel: string = DEFAULT_CONFIRM_OK, cancelLabel: string = DEFAULT_CONFIRM_CANCEL
): ThunkResult<Promise<CommonAction>, CommonAction> => showDialog({
  type: Dialog.CONFIRM,
  title,
  message,
  okLabel,
  cancelLabel
});

export const showError = (title: string, message: ReactNode, details: string, okLabel: string = DEFAULT_ALERT_OK):
  ThunkResult<Promise<CommonAction>, CommonAction> => showDialog({
  type: Dialog.ERROR,
  title,
  message,
  details,
  okLabel
});

export const showResponseError = (response: AnyResponse, okLabel: string = DEFAULT_ALERT_OK):
  ThunkResult<Promise<CommonAction>, CommonAction> => showDialog({
  type: Dialog.ERROR,
  title: response.responseTitle,
  message: JSON.stringify(response),
  okLabel
});
