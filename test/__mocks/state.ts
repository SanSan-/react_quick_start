import { EMPTY_FUNC } from '~const/common';
import { Store } from 'redux';
import { GeneralState } from '~types/store';

export const mockOptions = (state: GeneralState): { context: { store: Store<GeneralState> } } => ({
  context: {
    store: {
      getState: (): GeneralState => (state),
      dispatch: EMPTY_FUNC,
      subscribe: EMPTY_FUNC
    }
  }
});
