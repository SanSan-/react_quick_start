import { LOCATION_CHANGE } from 'connected-react-router';

const initialState: { module: Record<string, unknown> } = {
  module: null
};

export default (state = initialState, action: { type: string }): Record<string, unknown> => {
  if (action.type === LOCATION_CHANGE) {
    return state;
  }
  return state;
};
