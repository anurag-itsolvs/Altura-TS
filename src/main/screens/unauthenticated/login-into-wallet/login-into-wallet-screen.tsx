import React, { FC, useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView, Linking, Platform } from 'react-native';
import { Dimensions } from 'react-native'
import { useForm, Controller, SubmitHandler, Resolver } from 'react-hook-form';
import Clipboard from '@react-native-community/clipboard';

import GlobalStyle from "../../../../assets/css/style"
import DefaultStatusbar from '../../../components/default-statusbar';
import HeaderShadow from '../../../components/header-shadow';
import Icon from "../../../components/icon"
import { AuthContext } from '../../../context';
import useLocalStorage from '../../../hooks/async-storage';
import BottomSnackbar from '../../../components/snackbar'
import { compareArrayValue } from '../../../components/helper';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { IProps } from '../../../common/variables';
import { Button } from '../../../components/button';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width


type FormValues = {
  phrase: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: !values.phrase ? {} : values,
    errors: !values.phrase ?
      {
        phrase: {
          type: "required",
          message: "This is required."
        }
      }
      : {}
  };
};


const LoginIntoWalletScreen: FC<IProps> = ({ navigation }): JSX.Element => {
  const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormValues>({ resolver: resolver });
  const authData: any = React.useContext(AuthContext)
  const [walletInfo] = useLocalStorage("walletInfo")

  //--------------------------------------------------------------------------//
  //---------------------------- Helper functions ----------------------------//
  //--------------------------------------------------------------------------//

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      var phrase: string = data && data.phrase.trim()
      var trimmedArrayValue: string[] = phrase.split(" ").map(item => item.trim());

      if (walletInfo && walletInfo.phrase) {
        if (compareArrayValue(trimmedArrayValue, walletInfo.phrase)) {
          walletInfo.isUserVerified = true
          authData.auth.saveWalletInfo(walletInfo)
        } else {
          BottomSnackbar.errorSnackbar("Phrase did not matched.")
        }
      } else {
        BottomSnackbar.errorSnackbar("There is no any wallet exist, please create your wallet first.")
      }

    } catch (e) {
      console.log(e)
      BottomSnackbar.errorSnackbar("There is some issue.")
    }
  };

  const pasteCopiedText = async () => {
    const text = await Clipboard.getString();
    console.log(text)
    setValue("phrase", text)
  };

  const goBack = () => {
    navigation.goBack()
  }

  return (

    <DefaultStatusbar>
      <View style={[GlobalStyle.whiteColorBackground, GlobalStyle.flex]}>
        <ScrollView>
          <View style={[GlobalStyle.flex, GlobalStyle.pb_20]}>

            <HeaderShadow>
              <View style={[GlobalStyle.flex, GlobalStyle.whiteColorBackground, GlobalStyle.borderGaryPrimary, GlobalStyle.flexDirectionRow, GlobalStyle.alignItemsCenter, styles.heading, GlobalStyle.mb_10]}>
                <TouchableOpacity onPress={goBack} style={[GlobalStyle.alignItemsCenter, GlobalStyle.circleRadius, GlobalStyle.p_10, GlobalStyle.pl_15, GlobalStyle.flexDirectionRow, GlobalStyle.justifyContentCenter]}>
                  <Icon name={"arrowleft"} type={"AntDesign"} style={[GlobalStyle.font_24, GlobalStyle.primaryBlackColor]} />
                </TouchableOpacity>
                <View style={[GlobalStyle.alignItemsCenter, GlobalStyle.flex, GlobalStyle.pr_25]}>
                  <Text style={[GlobalStyle.boldFont, GlobalStyle.font_18, GlobalStyle.primaryBlackColor]}>
                    Login into wallet!
                  </Text>
                </View>
              </View>
            </HeaderShadow>

            <View style={[GlobalStyle.flex, GlobalStyle.mt_10]}>

              <View style={[GlobalStyle.mb_10, GlobalStyle.plr_20]}>
                <Text style={[GlobalStyle.primaryBlackColor, GlobalStyle.boldFont, GlobalStyle.font_14, GlobalStyle.capitalizeText]}>Phrase</Text>
                <View style={[GlobalStyle.lighterGrayColorBackground, GlobalStyle.radiusFive, GlobalStyle.mt_8, GlobalStyle.flexDirectionRow, GlobalStyle.borderOne, GlobalStyle.borderBlackPrimary]}>
                  <Controller
                    control={control}
                    name="phrase"
                    defaultValue=""
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        value={value}
                        onChangeText={value => onChange(value)}
                        placeholder={"Enter phrase"}
                        multiline={true}
                        numberOfLines={4}
                        placeholderTextColor={GlobalStyle.placeHolderColor.color}
                        autoFocus={true}
                        style={[GlobalStyle.font_16, GlobalStyle.primaryBlackColor, GlobalStyle.ptb_10, GlobalStyle.plr_15, GlobalStyle.flex, GlobalStyle.semiboldFont, { height: 200, textAlignVertical: 'top', }]}
                      />
                    )}
                  />
                </View>

                <View>
                  {errors.phrase && errors.phrase.type === 'required' && <Text style={[GlobalStyle.redColor, GlobalStyle.semiboldFont, GlobalStyle.font_13]}>{errors.phrase.message}</Text>}
                </View>

                <View style={[GlobalStyle.mt_10]}>
                  <Text style={[GlobalStyle.semiboldFont, GlobalStyle.font_15, GlobalStyle.secondaryBlackColorOne]}>
                    Enter 12 words separated by single space
                  </Text>
                </View>

                <View style={[GlobalStyle.alignItemsCenter, GlobalStyle.mt_30]}>
                  <TouchableOpacity onPress={pasteCopiedText} style={[GlobalStyle.whiteColorBackground, GlobalStyle.borderOne, GlobalStyle.borderBluePrimary, GlobalStyle.alignItemsCenter, GlobalStyle.radiusEight, GlobalStyle.p_10, GlobalStyle.flexDirectionRow, GlobalStyle.justifyContentCenter]}>
                    <Icon name={"paste"} type={"Fontisto"} style={[GlobalStyle.font_20, GlobalStyle.primaryBlueColor, GlobalStyle.mr_5]} />
                    <Text style={[GlobalStyle.boldFont, GlobalStyle.font_16, GlobalStyle.primaryBlueColor]}>Paste</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={[GlobalStyle.plr_30, GlobalStyle.mt_30]}>
                <Button
                  onPress={handleSubmit(onSubmit)}
                  title={"Continue"}
                />
              </View>
            </View>

            <View style={[GlobalStyle.alignItemsCenter, GlobalStyle.flex, GlobalStyle.mt_5]}>
              <View style={[GlobalStyle.flexDirectionRow, GlobalStyle.flex, GlobalStyle.alignItemsCenter, GlobalStyle.overflowHidden]}>
                <Text style={[GlobalStyle.semiboldFont, GlobalStyle.subHeadingBlackColor, GlobalStyle.font_13]}>
                  By continuing, you agree to our
                </Text>
                <View style={[Platform.OS === 'ios' ? GlobalStyle.solidBorderBottom : GlobalStyle.dashedBorderBottom, GlobalStyle.ml_5, GlobalStyle.mr_5]}>
                  <Text style={[GlobalStyle.semiboldFont, GlobalStyle.font_13]} onPress={() => Linking.openURL('https://www.alturanft.com/legal/terms-of-service')}>Terms</Text>
                </View>
                <Text style={[GlobalStyle.semiboldFont, GlobalStyle.subHeadingBlackColor, GlobalStyle.font_13]}>
                  &
                </Text>
                <View style={[Platform.OS === 'ios' ? GlobalStyle.solidBorderBottom : GlobalStyle.dashedBorderBottom, GlobalStyle.ml_5]}>
                  <Text style={[GlobalStyle.semiboldFont, GlobalStyle.font_13]} onPress={() => Linking.openURL('https://www.alturanft.com/legal/privacy-and-cookie-policy')}>Policies</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </DefaultStatusbar>
  )
}

export default LoginIntoWalletScreen

const styles = StyleSheet.create({
  heading: {
    height: 55
  },
  inputContainer: {
    height: 200,
    width: SCREEN_WIDTH - 80,
  }
})