import { LOCATION_CHANGE } from 'connected-react-router';

const initialState = {
  module: null
};

export default (state = initialState, action): object => {
  if (action.type === LOCATION_CHANGE) {
    return state;
  }
  return state;
};
