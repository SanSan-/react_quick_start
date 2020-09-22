import React, { ReactElement, ReactNode, useState } from 'react';
import Modal from '../../Modal';
import { Collapse } from 'antd';

const { Panel } = Collapse;

export interface Props {
  title?: string;
  children?: ReactNode;
  message?: ReactNode;
  details?: ReactNode;
  okLabel?: ReactNode;
  resolve?: () => void;
}

const Error: React.FC<Props> = ({ title, children, details, message, okLabel, resolve }: Props): ReactElement => {
  const [visible, setVisible] = useState(true);
  const okCallback = (): void => {
    resolve();
    setVisible(false);
  };
  return <Modal title={title} okCallback={okCallback} okLabel={okLabel}
    visible={visible}>
    <p>{message}</p>
    <Collapse>
      <Panel header="More information" key="panel-1">
        <p>{details}</p>
      </Panel>
    </Collapse>
    {children}
  </Modal>;
};

export default Error;
