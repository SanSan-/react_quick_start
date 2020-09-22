import React, { ReactElement, ReactNode, useState } from 'react';
import Modal from '../../Modal';

export interface Props {
  title?: string;
  children?: ReactNode;
  message?: ReactNode;
  details?: ReactNode;
  okLabel?: ReactNode;
  cancelLabel?: ReactNode;
  resolve?: (arg: boolean) => void;
}

const Confirm: React.FC<Props> = ({ title, children, message, okLabel, cancelLabel, resolve }: Props): ReactElement => {
  const [visible, setVisible] = useState(true);
  const okCallback = (): void => {
    resolve(true);
    setVisible(false);
  };
  const cancelCallback = (): void => {
    resolve(false);
    setVisible(false);
  };
  return <Modal title={title} okCallback={okCallback} okLabel={okLabel}
    visible={visible} hideCancelBtn={false} cancelLabel={cancelLabel}
    cancelCallback={cancelCallback}>
    <p>{message}</p>
    {children}
  </Modal>;
};

export default Confirm;
