import * as actions from '~actions/common';
import { initialState as common } from '~reducers/common';
import CommonEnum from '~enums/Common';
import fetchMock from 'fetch-mock';
import { assertEquals, mockStore } from '~test/__mocks/utils';
import Spinner from '~enums/Spinner';

const commonStore = {
  app: {
    common
  }
};

describe('Common action tests', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  test('showSpinner() action test', () => {
    const store = mockStore(commonStore);
    const [id, message] = [Spinner.ID, Spinner.MESSAGE];
    const expected = {
      type: CommonEnum.SPINNER_SHOW,
      id,
      message
    };
    return assertEquals(store, actions.showSpinner(), expected);
  });
});
