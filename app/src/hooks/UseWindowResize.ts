import { EffectCallback, useCallback, useEffect, useState } from 'react';
import { isClient } from '~utils/CommonUtils';
import { EMPTY_FUNC } from '~const/common';

interface WindowResizeType {
  width?: number;
  height?: number;
}

const useWindowResize = (): WindowResizeType => {
  const getSize = useCallback((): WindowResizeType => ({
    width: isClient() ? window.innerWidth : null,
    height: isClient() ? window.innerHeight : null
  }), []);

  const [windowSize, setWindowSize] = useState(getSize());

  useEffect((): EffectCallback => {
    if (!isClient()) {
      return EMPTY_FUNC;
    }
    const handleResize = (): void => {
      setWindowSize(getSize());
    };
    window.addEventListener('resize', handleResize);
    return (): void => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export default useWindowResize;
