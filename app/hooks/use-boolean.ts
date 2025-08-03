import { useState, useCallback } from "react";

// ----------------------------------------------------------------------

export type UseBooleanReturn = {
  value: boolean;
  setValue: (value: boolean) => void;
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
};

// ----------------------------------------------------------------------

export function useBoolean(initialValue: boolean = false): UseBooleanReturn {
  const [value, setValue] = useState(initialValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((prev) => !prev), []);

  return {
    value,
    setValue,
    setTrue,
    setFalse,
    toggle,
  };
}
