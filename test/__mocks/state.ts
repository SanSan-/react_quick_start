import { EMPTY_FUNC } from '~const/common';


export const mockOptions = (state: object): object => ({
  context: {
    store: {
      getState: (): object => (state),
      dispatch: EMPTY_FUNC,
      subscribe: EMPTY_FUNC
    }
  }
});
