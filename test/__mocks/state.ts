import { EMPTY_FUNC } from '~const/common';
import { Store } from 'redux';
import { GeneralStateType } from '~types/store';

export const mockOptions = (state: GeneralStateType): { context: { store: Store<GeneralStateType> } } => ({
  context: {
    store: {
      getState: (): GeneralStateType => (state),
      dispatch: EMPTY_FUNC,
      subscribe: EMPTY_FUNC
    }
  }
});
