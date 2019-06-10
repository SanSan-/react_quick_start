import { LOCATION_CHANGE } from 'connected-react-router';

const initialState = {
  module: null
};

export default function (state = initialState, action) {
  if (action.type === LOCATION_CHANGE) {
    return state;
  }
  return state;
}
