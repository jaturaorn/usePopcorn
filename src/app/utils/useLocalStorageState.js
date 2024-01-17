"use client";

import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  // * lazy evaluation
  const [value, setValue] = useState(() => {
    const storedValues = localStorage.getItem(key);
    return storedValues ? JSON.parse(storedValues) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
