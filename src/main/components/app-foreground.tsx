
import { FC, useEffect, useRef, useState } from 'react';
import { Text, View, Image, StyleSheet, StatusBar, TouchableOpacity, Platform, AppState } from 'react-native';

import GlobalStyle from "../../assets/css/style"
import { IProps } from '../common/variables';
import useLocalStorage from '../hooks/async-storage';


const AppForegroundStatus: FC<IProps> = ({ navigation }): JSX.Element => {

  const appState = useRef(AppState.currentState);
  const [walletInfo, setWalletValue] = useLocalStorage("walletInfo")
  const [pinStatus, setPinStatus] = useState("enter");

  useEffect(() => {
    if (walletInfo && walletInfo.isUserVerified) {
      navigation.navigate("PassCode")
    }

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        if (walletInfo && walletInfo.isUserVerified) {
          navigation.navigate("PassCode")
        }
      }
      appState.current = nextAppState;
    });

    return () => subscription.remove();
  }, [walletInfo]);

  return (
    <></>
  )
}

export default AppForegroundStatus

const styles = StyleSheet.create({})