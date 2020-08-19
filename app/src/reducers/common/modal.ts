import { CommonState } from '~types/state';
import { CommonAction } from '~types/action';
import produce from 'immer';

export const show = (state: CommonState, action: CommonAction): CommonState =>
  produce(state, (draft: CommonState): CommonState => {
    if (state.modals.length === 2) {
      const newModals = [...state.modals];
      newModals[1] = {
        layerId: action.layerId,
        title: action.title,
        data: action.data
      };
      draft.modals = [...newModals];
      return draft;
    }
    draft.modals = [
      ...state.modals,
      {
        layerId: action.layerId,
        title: action.title,
        data: action.data
      }
    ];
    return draft;
  });

export const hide = (state: CommonState, action: CommonAction): CommonState =>
  produce(state, (draft: CommonState): CommonState => {
    draft.modals = [...state.modals].filter((item) => item.layerId !== action.id);
    return draft;
  });

export const hideAll = (state: CommonState): CommonState =>
  produce(state, (draft: CommonState): CommonState => {
    draft.modals = [];
    return draft;
  });
