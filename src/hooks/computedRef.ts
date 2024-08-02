import { useRef, useState, useMemo, useCallback } from 'react';

// Custom hook
const useComputedRef = <T,>(initialValue: T) => {
  const ref = useRef<T>(initialValue);
  const [, setForceUpdate] = useState(false);

  // Function to force component re-render
  const forceUpdate = useCallback(() => {
    setForceUpdate(prev => !prev);
  }, []);

  // Function to update the ref value and trigger re-render
  const updateRef = useCallback((value: T) => {
    ref.current = value;
    forceUpdate();
  }, [forceUpdate]);

  // Memoized value that updates whenever ref.current changes
  const computedRef = useMemo(() => {
    return ref.current;
  }, [ref.current]);

  return [computedRef, updateRef, ref] as const;
};

export default useComputedRef;