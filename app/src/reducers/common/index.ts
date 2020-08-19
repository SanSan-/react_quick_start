import { EMPTY_STRING } from '~const/common';
import ActionType from '~enums/Common';

import * as background from './background';
import * as dialog from './dialog';
import * as modal from './modal';
import * as spinner from './spinner';
import { CommonState } from '~types/state';
import { CommonAction } from '~types/action';

export const initialState: CommonState = {
  spinner: 0,
  spinners: {},
  spinnerMessage: EMPTY_STRING,
  spinnerTimestamp: null,
  background: false,
  modals: [],
  dialogs: []
};

const commonReducers = (state: CommonState = initialState, action: CommonAction): CommonState => {
  switch (action.type) {
    case ActionType.BACKGROUND_SHOW:
      return background.show(state);
    case ActionType.BACKGROUND_HIDE:
      return background.hide(state);
    case ActionType.DIALOG_SHOW:
      return dialog.show(state, action);
    case ActionType.DIALOG_HIDE:
      return dialog.hide(state, action);
    case ActionType.MODAL_SHOW:
      return modal.show(state, action);
    case ActionType.MODAL_HIDE:
      return modal.hide(state, action);
    case ActionType.MODALS_HIDE:
      return modal.hideAll(state);
    case ActionType.SPINNER_SHOW:
      return spinner.show(state, action);
    case ActionType.SPINNER_HIDE:
      return spinner.hide(state, action);
    default:
      return { ...state };
  }
};

export default commonReducers;
