import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { Dimensions } from 'react-native'

export interface IProps {
  navigation: NavigationProp<ParamListBase>
}

export type pinTypeStatus = "enter" | "choose" | "locked";

export interface WalletInfo {
  isUserVerified: boolean;
  phrase: string[];
  walletName: string
}

export interface CryptoAssetsItem {
  id: number
  icon_url: string;
  title: string;
  sub_title: string;
  value: string;
}

export interface CryptoAssetsItemProps extends CryptoAssetsItem {
  item: CryptoAssetsItem
}

export const SCREEN_HEIGHT = Dimensions.get('window').height
export const SCREEN_WIDTH = Dimensions.get('window').width

