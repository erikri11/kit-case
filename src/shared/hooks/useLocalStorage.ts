import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initial: T) {
  
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
     const saved = localStorage.getItem(key);
      return saved ? (JSON.parse(saved) as T) : initial;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }, [key, storedValue]);

  const removeItem = () => {
    try {
      localStorage.removeItem(key);
      setStoredValue(initial);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  };

  const clearAll = () => {
    try {
      localStorage.clear();
      setStoredValue(initial);
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  };

  return [storedValue, setStoredValue, removeItem, clearAll] as const;
}
