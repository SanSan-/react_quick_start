import { EMPTY_FUNC } from '~const/common';
import { Store } from 'redux';


export const mockOptions = (state: Store):
    { context: { store: { getState: () => Store; dispatch: () => void; subscribe: () => void } } } => ({
  context: {
    store: {
      getState: (): Store => (state),
      dispatch: EMPTY_FUNC,
      subscribe: EMPTY_FUNC
    }
  }
});
