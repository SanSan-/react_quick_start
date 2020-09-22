import React, { ReactElement, useMemo } from 'react';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { GeneralState } from '~types/store';
import { CommonDialog, PromiseDialog } from '~types/state';
import * as actions from '~actions/common';
import DialogTypes from '~enums/module/Dialog';
import Error from '../Modal/Error';
import Confirm from '../Modal/Confirm';
import Alert from '../Modal/Alert';

interface Props {
  dispatch?: ThunkDispatch<GeneralState, unknown, AnyAction>;
  dialogs?: PromiseDialog[];
  hideDialog: (index: number) => CommonDialog
}

const Container: React.FC<Props> = ({ dialogs, hideDialog }: Props): ReactElement => {
  const handleDialog = (index: number, func: (idx?: number, promise?: Promise<Response | void>) => void): () => void =>
    (...args) => {
      hideDialog(index);
      func(...args);
    };
  useMemo(() => {
    const types = [
      DialogTypes.ALERT,
      DialogTypes.CONFIRM,
      DialogTypes.ERROR
    ];
    for (let idx = 0; idx < dialogs.length; idx++) {
      if (!types.includes(dialogs[idx].type)) {
        hideDialog(idx);
        return false;
      }
    }
    return true;
  }, []);
  for (let idx: number = dialogs.length - 1; idx >= 0; idx--) {
    const { type, reject, resolve, ...nextProps } = dialogs[idx];
    const callbackProps = {
      reject: handleDialog(idx, reject),
      resolve: handleDialog(idx, resolve)
    };
    switch (type) {
      case DialogTypes.ALERT:
        return <Alert {...nextProps} {...callbackProps} />;
      case DialogTypes.CONFIRM:
        return <Confirm {...nextProps} {...callbackProps} />;
      case DialogTypes.ERROR:
        return <Error {...nextProps} {...callbackProps} />;
    }
  }
  return null;
};

export default connect((state: GeneralState) => ({
  dialogs: state.app.common.dialogs
}), (dispatch) => bindActionCreators(actions, dispatch))(Container);
