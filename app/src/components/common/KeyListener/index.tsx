import React, { ReactElement, useEffect } from 'react';
import { MouseEvents } from '~enums/Events';

interface Props {
  keyCode: number;
  onKeyDown: (e?: KeyboardEvent) => void;
}

const KeyListener: React.FC<Props> = ({ keyCode, onKeyDown }: Props): ReactElement => {
  const handleKeyDown = (e: KeyboardEvent): void => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    if (e.isPropagationStopped && e.isPropagationStopped()) {
      return;
    }
    if (e.keyCode === keyCode) {
      onKeyDown(e);
    }
  };
  useEffect(() => {
    window.addEventListener(MouseEvents.MOUSEDOWN, handleKeyDown, false);
    return (): void => {
      window.removeEventListener(MouseEvents.MOUSEDOWN, handleKeyDown, false);
    };
  }, []);
  return <span />;
};

export default KeyListener;
