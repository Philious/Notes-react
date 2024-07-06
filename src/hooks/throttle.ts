import { useCallback, useEffect, useRef } from 'react';

export const useThrottle = <T>(callback: (...args: T[]) => void, limit: number) => {
  const lastRan = useRef(Date.now());
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const throttledFunction = useCallback(
    (...args: T[]) => {
      const now = Date.now();

      if (now - lastRan.current < limit) {
        if (timeout.current) {
          clearTimeout(timeout.current);
        }

        timeout.current = setTimeout(() => {
          lastRan.current = Date.now();
          callback(...args);
        }, limit - (now - lastRan.current));
      } else {
        lastRan.current = Date.now();
        callback(...args);
      }
    },
    [callback, limit]
  );

  useEffect(() => {
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, []);

  return throttledFunction;
}