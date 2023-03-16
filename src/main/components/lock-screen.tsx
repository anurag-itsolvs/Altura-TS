import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PINCode from '@haskkor/react-native-pincode'

import GlobalStyle from "../../assets/css/style"
import { pinTypeStatus } from '../common/variables';
import BottomSnackbar from './snackbar';

interface LockScreenProps {
  status: pinTypeStatus;
  finishProcess: () => void
}

const LockScreen = (props: LockScreenProps) => {
  const onClickButtonLockedPage = () => {
    BottomSnackbar.successSnackbar("Please wait for sometime!")
  }

  return (
    <PINCode status={props.status}
      finishProcess={props.finishProcess}
      timeLocked={150000}
      textDescriptionLockedPage={"To protect your information, access has been locked for 2.5 minutes."}
      onClickButtonLockedPage={onClickButtonLockedPage}
      colorCircleButtons={GlobalStyle.lightBlueColorBackground.backgroundColor}
      colorPassword={GlobalStyle.primaryBlueColor.color}
      colorPasswordEmpty={GlobalStyle.primaryBlueColor.color}
      colorPasswordError={GlobalStyle.primaryBlueColor.color}
      stylePinCodeColorTitle={GlobalStyle.primaryBlackColor.color}
      stylePinCodeColorSubtitle={GlobalStyle.primaryBlackColor.color}
      stylePinCodeButtonNumber={GlobalStyle.primaryBlueColor.color}
    />
  )
}

export default LockScreen

const styles = StyleSheet.create({})