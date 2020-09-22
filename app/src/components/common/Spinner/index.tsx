import React, { ReactElement } from 'react';
import { PromiseDialog, SpinnerState } from '~types/state';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { GeneralState } from '~types/store';

const loading = <LoadingOutlined style={{ fontSize: 48 }} spin/>;

interface Props {
  id: string;
  spinners?: Record<string, SpinnerState>;
  dialogs?: PromiseDialog[];
}

const Spinner: React.FC<Props> = ({ id, dialogs, spinners }: Props): ReactElement => {
  const visible = spinners[id] && spinners[id].counter > 0 && dialogs.length === 0;
  const message = spinners[id] && spinners[id].message || null;

  return <div hidden={!visible} style={{ textAlign: 'center' }}>
    <Spin indicator={loading} tip={message}/>
  </div>;
};

export default connect((state: GeneralState) => ({
  spinners: state.app.common.spinners,
  dialogs: state.app.common.dialogs
}))(Spinner);
