import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import PINCode, { hasUserSetPinCode } from "@haskkor/react-native-pincode";

import LockScreen from '../../../components/lock-screen';
import GlobalStyle from "../../../../assets/css/style"
import { NavigationProp, ParamListBase, useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { pinTypeStatus } from '../../../common/variables';
import { Loading } from '../../../components/loading';

const SetPassCodeScreen = (): JSX.Element => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [pinStatus] = useState<pinTypeStatus>("choose");
  const [checkingPinStatus, setCheckingPinStatus] = useState<boolean>(true);

  useFocusEffect(() => {
    (async () => {
      const hasPin = await hasUserSetPinCode();
      if (hasPin) {
        navigation.replace("BackupWallet")
      }
      setCheckingPinStatus(false)
    })();
    return () => {
      // this now gets called when the component unmounts
    };
  })

  //--------------------------------------------------------------------------//
  //---------------------------- Helper functions ----------------------------//
  //--------------------------------------------------------------------------//

  const goToBackupWalletScreen = () => {
    navigation.replace("BackupWallet")
  }
  return (
    <View style={[GlobalStyle.flex, { backgroundColor: "#ffffff" }]}>
      {
        checkingPinStatus
          ?
          <Loading loading={true} />
          :
          <LockScreen status={pinStatus} finishProcess={goToBackupWalletScreen} />
      }
    </View>
  )
}

export default SetPassCodeScreen

const styles = StyleSheet.create({})