import { CommonState, SpinnerState } from '~types/state';
import { EMPTY_STRING } from '~const/common';
import { CommonAction } from '~types/action';
import produce from 'immer';

const spinnerInitailState: SpinnerState = {
  counter: 0,
  message: EMPTY_STRING,
  timestamp: null
};

export const show = (state: CommonState, action: CommonAction): CommonState =>
  produce(state, (draft: CommonState): CommonState => {
    const counter = state.spinners[action.id] && state.spinners[action.id].counter || 0;
    const timestamp = state.spinners[action.id] && state.spinners[action.id].timestamp || null;
    draft.spinners = {
      ...state.spinners,
      [action.id]: {
        ...state.spinners[action.id] || spinnerInitailState,
        counter: counter + 1,
        message: action.message,
        timestamp: timestamp || new Date().getTime()
      }
    };
    return draft;
  });

export const hide = (state: CommonState, action: CommonAction): CommonState =>
  produce(state, (draft: CommonState): CommonState => {
    const counter = state.spinners[action.id] && state.spinners[action.id].counter || 0;
    const timestamp = state.spinners[action.id] && state.spinners[action.id].timestamp || null;
    draft.spinners = {
      ...state.spinners,
      [action.id]: {
        ...state.spinners[action.id] || spinnerInitailState,
        counter: action.force || counter <= 1 ? 0 : counter - 1,
        timestamp: action.force || counter <= 1 ? null : timestamp
      }
    };
    return draft;
  });

