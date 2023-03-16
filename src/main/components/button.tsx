import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native';

import GlobalStyle from "../../assets/css/style"
import Icon from "./icon"

interface ButtonProps {
  title: string;
  onPress: () => void;
}

interface DisabledButtonProps {
  title: string;
}


export const Button: FC<ButtonProps> = (props): JSX.Element => {
  return (
    <TouchableOpacity onPress={props.onPress} style={[GlobalStyle.blackColorBackground, GlobalStyle.alignItemsCenter, GlobalStyle.circleRadius, GlobalStyle.p_15, GlobalStyle.flexDirectionRow, GlobalStyle.justifyContentCenter]}>
      <Text style={[GlobalStyle.boldFont, GlobalStyle.font_16, GlobalStyle.whiteColor]}>{props.title}</Text>
      <Icon name={"arrowright"} type={"AntDesign"} style={[GlobalStyle.font_20, GlobalStyle.whiteColor, GlobalStyle.ml_5]} />
    </TouchableOpacity>
  )
}

export const LinkButton: FC<ButtonProps> = (props): JSX.Element => {
  return (
    <TouchableOpacity onPress={props.onPress} style={[GlobalStyle.mt_10, GlobalStyle.whiteColorBackground, GlobalStyle.alignItemsCenter, GlobalStyle.circleRadius, GlobalStyle.p_15, GlobalStyle.flexDirectionRow, GlobalStyle.justifyContentCenter]}>
      <Text style={[GlobalStyle.boldFont, GlobalStyle.font_16, GlobalStyle.primaryBlackColor]}>{props.title}</Text>
    </TouchableOpacity>
  )
}

export const DisabledButton: FC<DisabledButtonProps> = (props): JSX.Element => {
  return (
    <TouchableOpacity activeOpacity={1} style={[GlobalStyle.inActiveColorBackground, GlobalStyle.alignItemsCenter, GlobalStyle.circleRadius, GlobalStyle.p_15, GlobalStyle.flexDirectionRow, GlobalStyle.justifyContentCenter]}>
      <Text style={[GlobalStyle.boldFont, GlobalStyle.font_16, GlobalStyle.secondaryBlackColorTWo]}>{props.title}</Text>
      <Icon name={"arrowright"} type={"AntDesign"} style={[GlobalStyle.font_20, GlobalStyle.secondaryBlackColorTWo, GlobalStyle.ml_5]} />
    </TouchableOpacity>
  )
}



const styles = StyleSheet.create({})