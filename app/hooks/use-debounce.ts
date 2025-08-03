import { useState, useEffect, useMemo } from "react";

// ----------------------------------------------------------------------

export type UseDebounceReturn<T> = {
  debouncedValue: T;
  isDebouncing: boolean;
};

// ----------------------------------------------------------------------

/**
 * Hook that debounces a value
 * @param value - The value to debounce
 * @param delay - The delay in milliseconds (default: 500ms)
 * @returns Object containing debouncedValue and isDebouncing state
 */
export function useDebounce<T>(
  value: T,
  delay: number = 500,
): UseDebounceReturn<T> {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const [isDebouncing, setIsDebouncing] = useState<boolean>(false);

  useEffect(() => {
    setIsDebouncing(true);
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setIsDebouncing(false);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return useMemo(
    () => ({
      debouncedValue,
      isDebouncing,
    }),
    [debouncedValue, isDebouncing],
  );
}

// ----------------------------------------------------------------------

/**
 * Hook that debounces a callback function
 * @param callback - The callback function to debounce
 * @param delay - The delay in milliseconds (default: 500ms)
 * @returns Debounced callback function
 */
export function useDebouncedCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number = 500,
): T {
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null,
  );

  const debouncedCallback = useMemo(() => {
    return ((...args: Parameters<T>) => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      const timer = setTimeout(() => {
        callback(...args);
      }, delay);

      setDebounceTimer(timer);
    }) as T;
  }, [callback, delay, debounceTimer]);

  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  return debouncedCallback;
}
