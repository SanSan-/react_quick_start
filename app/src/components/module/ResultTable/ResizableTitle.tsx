import React, { ReactElement } from 'react';
import { Resizable, ResizeCallbackData } from 'react-resizable';

interface ResizableType {
    width?: number;
    onResize: (e: React.SyntheticEvent, data: ResizeCallbackData) => unknown;
}

const ResizableTitle = (props: ResizableType): ReactElement => {
  const { onResize, width, ...restProps } = props;
  if (!width) {
    return <th {...restProps} />;
  }
  return <Resizable
    width={width}
    height={0}
    onResize={onResize}
    draggableOpts={{ enableUserSelecthack: false }}>
    <th {...restProps} />
  </Resizable>;
};

export default ResizableTitle;
