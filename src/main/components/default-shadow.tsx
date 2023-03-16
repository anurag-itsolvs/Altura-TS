import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { Shadow } from 'react-native-shadow-2';
import GlobalStyle from "../../assets/css/style"

interface DefaultShadowProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const DefaultShadow = (props: DefaultShadowProps) => {
  return (
    <Shadow
      distance={5}
      startColor={'#99999915'}
      style={[GlobalStyle.flexDirectionRow, GlobalStyle.mb_5, GlobalStyle.radiusTen]}>
      {props.children}
    </Shadow>
  )
}

export const DarkShadow = (props: DefaultShadowProps) => {
  return (
    <Shadow
      distance={12}
      startColor={'#cccccc90'}
      endColor={'#eeeeee50'}
      containerStyle={{ marginVertical: 10 }}
      style={[GlobalStyle.flexDirectionRow, GlobalStyle.mb_5, GlobalStyle.radiusTen]}>
      {props.children}
    </Shadow>
  )
}


const styles = StyleSheet.create({})