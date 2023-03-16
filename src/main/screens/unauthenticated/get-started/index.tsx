import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { FC, useEffect } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, StatusBar, } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import GlobalStyle from "../../../../assets/css/style"
import { IProps } from '../../../common/variables';
import { Button, LinkButton } from '../../../components/button';
import DefaultStatusbar from '../../../components/default-statusbar';
import Icon from "../../../components/icon"


const GetStartedScreen: FC<IProps> = ({ navigation }): JSX.Element => {
  const insets = useSafeAreaInsets();

  //--------------------------------------------------------------------------//
  //---------------------------- Helper functions ----------------------------//
  //--------------------------------------------------------------------------//
  const goToSetPassCodeScreenScreen = () => {
    navigation.navigate("SetPassCode")
  }

  const goToLoginToWallet = () => {
    navigation.navigate("LoginIntoWallet")
  }

  return (
    <DefaultStatusbar>
      <View style={[GlobalStyle.whiteColorBackground, GlobalStyle.flex, { paddingBottom: insets.bottom }]}>
        <View style={[GlobalStyle.flex, GlobalStyle.justifyContentCenter]}>
          <View style={[GlobalStyle.alignItemsCenter, styles.heading]}>
            <View style={[styles.imageWrapper, GlobalStyle.radiusEight, GlobalStyle.overflowHidden]}  >
              <Image resizeMode={"contain"} style={styles.image} source={require('../../../../assets/images/logo.png')} />
            </View>

            <Text style={[GlobalStyle.boldFont, GlobalStyle.font_25, GlobalStyle.mt_20, GlobalStyle.primaryBlackColor]}>Welcome To Altura!</Text>
            <Text style={[GlobalStyle.semiboldFont, GlobalStyle.font_18, GlobalStyle.primaryBlackColor]}> Web3 Infrastructure for Games</Text>
          </View>

          <View style={[GlobalStyle.plr_30, GlobalStyle.mt_30]}>
            {/* <TouchableOpacity onPress={goToSetPassCodeScreenScreen} style={[GlobalStyle.blackColorBackground, GlobalStyle.alignItemsCenter, GlobalStyle.circleRadius, GlobalStyle.p_15, GlobalStyle.flexDirectionRow, GlobalStyle.justifyContentCenter]}>
              <Text style={[GlobalStyle.boldFont, GlobalStyle.font_16, GlobalStyle.whiteColor]}>Create a new wallet</Text>
              <Icon name={"arrowright"} type={"AntDesign"} style={[GlobalStyle.font_20, GlobalStyle.whiteColor, GlobalStyle.ml_5]} />
            </TouchableOpacity> */}

            <Button
              onPress={goToSetPassCodeScreenScreen}
              title={"Create a new wallet"}
            />
            <LinkButton
              onPress={goToLoginToWallet}
              title={"I already have a wallet"}
            />

          </View>
        </View>
        <View style={[GlobalStyle.alignItemsCenter, GlobalStyle.ptb_10, GlobalStyle.plr_10]}>
          <Text style={[GlobalStyle.semiboldFont, GlobalStyle.subHeadingBlackColor, GlobalStyle.font_12]}>With Altura you can create, update, and transfer NFTs in-game without technical complexity or costly investment.</Text>
        </View>
      </View>
    </DefaultStatusbar>
  )
}

export default GetStartedScreen

const styles = StyleSheet.create({
  heading: {
    marginTop: 50
  },
  imageWrapper: {
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    width: 100
  },
  image: {
    width: "100%"
  },
})