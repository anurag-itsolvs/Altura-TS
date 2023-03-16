import React, { useEffect } from 'react';
import { Alert, Linking, BackHandler } from 'react-native'
import RNBootSplash from "react-native-bootsplash";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WalletInfo } from '../common/variables';

const initialState = {
  loading: true,
  walletInfo: {
    isUserVerified: false,
    phrase: null,
    walletName: null
  }
}

type AuthState = {
  loading: boolean;
  walletInfo: WalletInfo
}

type AuthAction = {
  type: string;
  payload: any
}

export function AuthHook() {

  const reducer = (authState: AuthState, action: AuthAction) => {
    switch (action.type) {
      case 'SET_LOADING':
        return {
          ...authState,
          loading: action.payload,
        };
      case 'SET_WALLET_INFO':
        return {
          ...authState,
          walletInfo: action.payload,
        };
      case 'REMOVE_WALLET_INFO':
        return {
          ...authState,
          walletInfo: undefined,
        };
      default:
        return authState
    }
  }

  const [authState, dispatch] = React.useReducer(reducer, initialState);

  const auth = React.useMemo(
    () => ({
      logout: async () => {
        await AsyncStorage.removeItem("walletInfo");
        dispatch({ type: 'REMOVE_WALLET_INFO', payload: null })
      },
      saveWalletInfo: async (data: WalletInfo) => {
        try {
          await AsyncStorage.setItem("walletInfo", JSON.stringify(data));
          dispatch({ type: 'SET_WALLET_INFO', payload: data })
        } catch (error) {
          console.log(error);
        }
      }
    }), [])

  useEffect(() => {
    const init = async () => {
      // -------------------------------------------------------------------//
      // On app init we are getting the wallet info from local storage and setting 
      // in a state 
      // -------------------------------------------------------------------//
      await getWalletInfo()
      dispatch({ type: 'SET_LOADING', payload: false })
    };

    init().finally(async () => {
      await RNBootSplash.hide({ fade: true });
    });

  }, [])

  const getWalletInfo = async () => {
    const walletInfo = await AsyncStorage.getItem("walletInfo");
    var currentWalletInfo = null
    if (walletInfo) {
      currentWalletInfo = JSON.parse(walletInfo);
    }

    dispatch({ type: 'SET_WALLET_INFO', payload: currentWalletInfo })
  }


  return { auth, authState };
}