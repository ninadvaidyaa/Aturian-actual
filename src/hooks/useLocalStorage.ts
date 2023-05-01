import { useState, useEffect } from "react";

const useLocalStorage = <T>(key: string, defaultValue: T):[T, (newValue: T) => void] => {
  const [value, setValue] = useState(() => {
    const storedValue =
      typeof window !== "undefined" ? localStorage.getItem(key) : null;
    return storedValue === null ? defaultValue : JSON.parse(storedValue);
  });

  useEffect(() => {
    const listener = (e: StorageEvent): void => {
      if (
        typeof window !== "undefined" &&
        e.storageArea === localStorage &&
        e.key === key
      ) {
        const {newValue} = e;
        setValue(newValue != null ? JSON.parse(newValue) : newValue);
      }
    };
    window.addEventListener("storage", listener);

    return () => {
      window.removeEventListener("storage", listener);
    };
  }, [key, defaultValue]);

  const setValueInLocalStorage= (newValue: T):void => {
    setValue((currentValue: any) => {
      const result =
        typeof newValue === "function" ? newValue(currentValue) : newValue;
      if (typeof window !== "undefined")
        localStorage.setItem(key, JSON.stringify(result));
      return result;
    });
  };

  return [value, setValueInLocalStorage];
};

export default useLocalStorage;