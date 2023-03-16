import React, { useState, useEffect, useReducer, useRef, useCallback, FC, Reducer } from "react";
import { Text, View, Image, StyleSheet, ScrollView, TouchableOpacity, Linking, } from 'react-native';
import PINCode, { resetPinCodeInternalStates, deleteUserPinCode } from "@haskkor/react-native-pincode";

import GlobalStyle from "../../../../assets/css/style"
import DefaultStatusbar from '../../../components/default-statusbar';
import HeaderShadow from '../../../components/header-shadow';
import Icon from "../../../components/icon"
import { AuthContext } from "../../../context";
import { LogoutDialog } from "../../../components/logout";
import { DefaultShadow } from "../../../components/default-shadow";
import { DeleteWalletDialog } from "../../../components/delete-wallet";
import useLocalStorage from "../../../hooks/async-storage";
import { IProps } from "../../../common/variables";


const ACTIONS = {
  SET_LOGOUT_DIALOG_VISIBILITY: 'set_logout_dialog_visibility',
  SET_DELETE_WALLET_DIALOG_VISIBILITY: 'set_delete_wallet_dialog_visibility'
}

const initialState = {
  isLogoutDialogVisible: false,
  isDeleteWalletDialogVisible: false
}

type AccountState = {
  isLogoutDialogVisible: boolean;
  isDeleteWalletDialogVisible: boolean
}

type AccountAction = {
  type: string;
  payload: any
}

function reducer(state: AccountState, action: AccountAction) {

  switch (action.type) {

    case ACTIONS.SET_LOGOUT_DIALOG_VISIBILITY:
      return { ...state, isLogoutDialogVisible: action.payload.isLogoutDialogVisible }

    case ACTIONS.SET_DELETE_WALLET_DIALOG_VISIBILITY:
      return { ...state, isDeleteWalletDialogVisible: action.payload.isDeleteWalletDialogVisible }

    default: return state
  }
}

const AccountScreen: FC<IProps> = ({ navigation }): JSX.Element => {
  const [state, dispatch] = useReducer<Reducer<AccountState, AccountAction>>(reducer, initialState)
  const authData: any = React.useContext(AuthContext)
  const [walletInfo] = useLocalStorage("walletInfo")

  //--------------------------------------------------------------------------//
  //---------------------------- Helper functions ----------------------------//
  //--------------------------------------------------------------------------//
  const openLogoutAppDialog = () => {
    dispatch({ type: ACTIONS.SET_LOGOUT_DIALOG_VISIBILITY, payload: { isLogoutDialogVisible: true } })
  }
  const openDeleteWalletDialog = () => {
    dispatch({ type: ACTIONS.SET_DELETE_WALLET_DIALOG_VISIBILITY, payload: { isDeleteWalletDialogVisible: true } })
  }

  //-------------------------- Logout callback functions ---------------------------------//

  const handleNoLogoutDialog = () => {
    dispatch({ type: ACTIONS.SET_LOGOUT_DIALOG_VISIBILITY, payload: { isLogoutDialogVisible: false } })
  }
  const handleYesLogoutDialog = () => {
    walletInfo.isUserVerified = false
    authData.auth.saveWalletInfo(walletInfo)
    dispatch({ type: ACTIONS.SET_LOGOUT_DIALOG_VISIBILITY, payload: { isLogoutDialogVisible: false } })
  }

  //------------------------ Delete Wallet callback functions ----------------------------//

  const handleNoDeleteWalletDialog = async () => {
    dispatch({ type: ACTIONS.SET_DELETE_WALLET_DIALOG_VISIBILITY, payload: { isDeleteWalletDialogVisible: false } })
  }
  const handleYesDeleteWalletDialog = async () => {
    try {
      await deleteUserPinCode();
      await resetPinCodeInternalStates();
      dispatch({ type: ACTIONS.SET_DELETE_WALLET_DIALOG_VISIBILITY, payload: { isDeleteWalletDialogVisible: false } })
      authData.auth.logout()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <DefaultStatusbar>
      <View style={[GlobalStyle.flex, GlobalStyle.lightBlueColorBackground]}>
        <View style={[GlobalStyle.plr_10, GlobalStyle.mt_15, GlobalStyle.mb_10]}>
          <DefaultShadow>

            <View style={[GlobalStyle.alignItemsCenter, GlobalStyle.radiusTen, GlobalStyle.whiteColorBackground, GlobalStyle.flex, GlobalStyle.justifyContentCenter, GlobalStyle.ptb_15]}>
              <View style={[GlobalStyle.flexDirectionRow, GlobalStyle.alignItemsCenter, GlobalStyle.pl_20, GlobalStyle.pr_10]}>
                <View style={[styles.profilePicture, GlobalStyle.lightGrayColorBackground, GlobalStyle.alignItemsCenter, GlobalStyle.justifyContentCenter, GlobalStyle.circleRadius, GlobalStyle.borderOne, GlobalStyle.borderGaryPrimary]}>
                  <Icon name={"wallet"} type={"Ionicons"} style={[GlobalStyle.font_25, GlobalStyle.secondaryBlackColorOne]} />
                </View>
                <View style={[GlobalStyle.flex, GlobalStyle.pl_10, GlobalStyle.pr_5]}>
                  <Text style={[GlobalStyle.boldFont, GlobalStyle.font_18, GlobalStyle.primaryBlueColor]}>
                    {walletInfo && walletInfo.walletName}
                  </Text>
                </View>
              </View>

            </View>
          </DefaultShadow>
        </View>
        <View style={[GlobalStyle.flex,]}>
          <ScrollView>
            <TouchableOpacity onPress={() => { openDeleteWalletDialog() }} delayPressIn={80} style={[GlobalStyle.flex, GlobalStyle.flexDirectionRow, GlobalStyle.ptb_15, GlobalStyle.pl_20, GlobalStyle.pr_10, GlobalStyle.justifyContentSpaceBetween, GlobalStyle.whiteColorBackground, GlobalStyle.borderGaryPrimary, GlobalStyle.borderBottomThin]}>
              <View style={[GlobalStyle.flex, GlobalStyle.flexDirectionRow, GlobalStyle.alignItemsCenter]}>
                <Icon name={"delete"} type={"MaterialCommunityIcons"} style={[GlobalStyle.font_25, GlobalStyle.secondaryBlackColorOne]} />
                <View style={GlobalStyle.ml_15}>
                  <Text style={[GlobalStyle.font_16, GlobalStyle.semiboldFont, GlobalStyle.primaryBlackColor]}>Delete Wallet</Text>
                  <Text style={[GlobalStyle.font_14, GlobalStyle.semiboldFont, GlobalStyle.secondaryBlackColorOne]}>Delete Altura wallet</Text>
                </View>
              </View>
              <View style={[GlobalStyle.flexDirectionRow, GlobalStyle.alignItemsCenter]}>
                <Icon name={"chevron-thin-right"} type={"Entypo"} style={[GlobalStyle.font_20, GlobalStyle.secondaryBlackColorTWo]} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Linking.openURL('https://www.alturanft.com/contact')} delayPressIn={80} style={[GlobalStyle.flex, GlobalStyle.flexDirectionRow, GlobalStyle.ptb_15, GlobalStyle.pl_20, GlobalStyle.pr_10, GlobalStyle.justifyContentSpaceBetween, GlobalStyle.whiteColorBackground, GlobalStyle.borderGaryPrimary, GlobalStyle.borderBottomThin]}>
              <View style={[GlobalStyle.flex, GlobalStyle.flexDirectionRow, GlobalStyle.alignItemsCenter]}>
                <Icon name={"help-circle"} type={"Feather"} style={[GlobalStyle.font_25, GlobalStyle.secondaryBlackColorOne]} />
                <View style={GlobalStyle.ml_15}>
                  <Text style={[GlobalStyle.font_16, GlobalStyle.semiboldFont, GlobalStyle.primaryBlackColor]}>Help</Text>
                  <Text style={[GlobalStyle.font_14, GlobalStyle.semiboldFont, GlobalStyle.secondaryBlackColorOne]}>Help Center, Contact us</Text>
                </View>
              </View>
              <View style={[GlobalStyle.flexDirectionRow, GlobalStyle.alignItemsCenter]}>
                <Icon name={"chevron-thin-right"} type={"Entypo"} style={[GlobalStyle.font_20, GlobalStyle.secondaryBlackColorTWo]} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { openLogoutAppDialog() }} delayPressIn={80} style={[GlobalStyle.flex, GlobalStyle.flexDirectionRow, GlobalStyle.ptb_15, GlobalStyle.pl_20, GlobalStyle.pr_10, GlobalStyle.justifyContentSpaceBetween, GlobalStyle.whiteColorBackground]}>
              <View style={[GlobalStyle.flex, GlobalStyle.flexDirectionRow, GlobalStyle.alignItemsCenter]}>
                <Icon name={"poweroff"} type={"AntDesign"} style={[GlobalStyle.font_23, GlobalStyle.secondaryBlackColorOne]} />
                <View style={GlobalStyle.ml_15}>
                  <Text style={[GlobalStyle.font_16, GlobalStyle.semiboldFont, GlobalStyle.primaryBlackColor]}>Logout</Text>
                  <Text style={[GlobalStyle.font_14, GlobalStyle.semiboldFont, GlobalStyle.secondaryBlackColorOne]}>Logout from the app</Text>
                </View>
              </View>
              <View style={[GlobalStyle.flexDirectionRow, GlobalStyle.alignItemsCenter]}>
                <Icon name={"chevron-thin-right"} type={"Entypo"} style={[GlobalStyle.font_20, GlobalStyle.secondaryBlackColorTWo]} />
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>

      <LogoutDialog
        isLogoutDialogVisible={state.isLogoutDialogVisible}
        handleNoDialog={handleNoLogoutDialog}
        handleYesDialog={handleYesLogoutDialog} />

      <DeleteWalletDialog
        isDeleteWalletDialogVisible={state.isDeleteWalletDialogVisible}
        handleNoDialog={handleNoDeleteWalletDialog}
        handleYesDialog={handleYesDeleteWalletDialog} />

    </DefaultStatusbar>
  )
}

export default AccountScreen

const styles = StyleSheet.create({
  profilePicture: {
    height: 60,
    width: 60,
  },
})