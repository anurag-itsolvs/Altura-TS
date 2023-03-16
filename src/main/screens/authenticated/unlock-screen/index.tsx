import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useCallback, useState } from 'react'
import LockScreen from '../../../components/lock-screen';
import GlobalStyle from "../../../../assets/css/style"
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { IProps, pinTypeStatus } from '../../../common/variables';


const UnlockScreen: FC<IProps> = ({ navigation }): JSX.Element => {
  const [pinStatus] = useState<pinTypeStatus>("enter");

  //--------------------------------------------------------------------------//
  //---------------------------- Helper functions ----------------------------//
  //--------------------------------------------------------------------------//

  const goToBackupWalletScreen = () => {
    navigation.navigate("Home")
  }
  return (
    <View style={[GlobalStyle.flex, { backgroundColor: "#ffffff" }]}>
      <LockScreen status={pinStatus} finishProcess={goToBackupWalletScreen} />
    </View>
  )
}

export default UnlockScreen

const styles = StyleSheet.create({})