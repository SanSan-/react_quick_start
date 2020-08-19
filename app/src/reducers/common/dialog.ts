import { CommonState, PromiseDialog } from '~types/state';
import { CommonAction } from '~types/action';
import produce from 'immer';

export const show = (state: CommonState, action: CommonAction): CommonState =>
  produce(state, (draft: CommonState): CommonState => {
    draft.dialogs = [...state.dialogs, action.payload as PromiseDialog];
    return draft;
  });

export const hide = (state: CommonState, action: CommonAction): CommonState =>
  produce(state, (draft: CommonState): CommonState => {
    const dialogs = [...state.dialogs];
    dialogs.slice(action.index, 1);
    draft.dialogs = dialogs;
    return draft;
  });
