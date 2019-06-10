import PropTypes from 'prop-types';

export const mockOptions = (state) => ({
  context: {
    store: {
      getState: () => (state),
      dispatch: () => {
      },
      subscribe: () => {
      }
    }
  },
  childContextTypes: {
    store: PropTypes.object
  }
});
