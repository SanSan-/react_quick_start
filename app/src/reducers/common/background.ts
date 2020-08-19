import { CommonState } from '~types/state';
import produce from 'immer';

export const show = (state: CommonState): CommonState =>
  produce(state, (draft: CommonState): CommonState => {
    draft.background = true;
    return draft;
  });

export const hide = (state: CommonState): CommonState =>
  produce(state, (draft: CommonState): CommonState => {
    draft.background = false;
    return draft;
  });
