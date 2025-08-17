import { useCallback, useState } from "react";

// ----------------------------------------------------------------------

export type UseBooleanReturn = {
  value: boolean;
  setValue: (value: boolean) => void;
  onTrue: () => void;
  onFalse: () => void;
  toggle: () => void;
};

// ----------------------------------------------------------------------

export function useBoolean(initialValue: boolean = false): UseBooleanReturn {
  const [value, setValue] = useState(initialValue);

  const onTrue = useCallback(() => setValue(true), []);
  const onFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue(prev => !prev), []);

  return {
    value,
    setValue,
    onTrue,
    onFalse,
    toggle,
  };
}
