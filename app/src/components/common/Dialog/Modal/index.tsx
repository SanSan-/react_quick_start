import React, { ReactElement, ReactNode } from 'react';
import { Modal } from 'antd';

interface Props {
  title: string;
  children?: ReactNode;
  okLabel?: ReactNode;
  cancelLabel?: ReactNode;
  visible?: boolean;
  hideCancelBtn?: boolean;
  okCallback: () => void;
  cancelCallback?: () => void;
}

const Form: React.FC<Props> = ({
  title, children, visible, okLabel, okCallback, hideCancelBtn, cancelLabel, cancelCallback
}: Props): ReactElement =>
  <Modal
    title={title}
    centered
    visible={visible}
    okText={okLabel}
    cancelText={cancelLabel}
    onOk={okCallback}
    onCancel={cancelCallback}
    cancelButtonProps={{ ghost: hideCancelBtn }}
    destroyOnClose={true}
  >{children}</Modal>;

Form.defaultProps = {
  visible: false,
  hideCancelBtn: true
};

export default Form;
