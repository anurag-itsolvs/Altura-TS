import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useLocalStorage(key: string, initialValue?: any) {
  const [walletInfo, setWalletInfo] = useState(initialValue);

  useEffect(() => {
    AsyncStorage.getItem(key)
      .then(value => {
        if (value === null) return initialValue;
        return JSON.parse(value);
      })
      .then(setWalletInfo)
  }, [key, initialValue]);

  const setWalletValue = (value: any) => {
    const valueToStore = value instanceof Function ? value(walletInfo) : value;
    setWalletInfo(valueToStore);
    AsyncStorage.setItem(key, JSON.stringify(valueToStore));
  }

  return [walletInfo, setWalletValue];
}