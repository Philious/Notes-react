import { useCallback, useEffect, useRef } from 'react';

const useDebounce = <T>(callback: (...args: T[]) => void, delay: number) => {
  const handler = useRef<NodeJS.Timeout | null>(null);

  const debouncedFunction = useCallback(
    (...args: T[]) => {
      if (handler.current) {
        clearTimeout(handler.current);
      }
      handler.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  useEffect(() => {
    return () => {
      if (handler.current) {
        clearTimeout(handler.current);
      }
    };
  }, []);

  return debouncedFunction;
};

export default useDebounce;
