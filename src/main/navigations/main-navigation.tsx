import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, Dimensions, Button } from "react-native"
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import GlobalStyle from "../../assets/css/style"
import Icon from '../components/icon';
import HomeScreen from '../screens/authenticated/home';
import AccountScreen from '../screens/authenticated/account';
import UnlockScreen from '../screens/authenticated/unlock-screen';

const UnLocalScreenStack = createNativeStackNavigator()
function UnLocalScreenNavigator() {
  return (
    <UnLocalScreenStack.Navigator screenOptions={({ route, navigation }) => ({ headerShown: false })}>
      <UnLocalScreenStack.Screen name="UnLock" component={UnlockScreen} />
    </UnLocalScreenStack.Navigator >
  )
}

const BottomTab = createMaterialBottomTabNavigator();
function TabStackNavigator() {

  const insets = useSafeAreaInsets();
  return (
    <BottomTab.Navigator
      activeColor={GlobalStyle.primaryBlueColor.color}
      inactiveColor={GlobalStyle.primaryBlueColor.color}
      barStyle={[styles.barStyle, { height: 68 + insets.bottom }]}
      shifting={false}>

      <BottomTab.Screen
        name={'Wallet'}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused }) => {
            return <Icon name={'wallet'} type="Entypo" style={[{ color: GlobalStyle.primaryBlueColor.color, fontSize: 22 }]} />
          },
        }}
      />
      <BottomTab.Screen
        name={'Account'}
        component={AccountScreen}

        options={{
          tabBarIcon: ({ color, focused }) => {
            return <Icon name={'person-outline'} type="Ionicons" style={[{ color: GlobalStyle.primaryBlueColor.color, fontSize: 20 }]} />
          },
        }}
      />
    </BottomTab.Navigator>
  );
}

const MainStack = createNativeStackNavigator();
export function MainRootTabStackNavigator() {
  return (
    <MainStack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false, }}>
      <MainStack.Screen name="Home" component={TabStackNavigator} />
      <MainStack.Screen name="PassCode" component={UnLocalScreenNavigator} />
    </MainStack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    fontSize: GlobalStyle.font_13.fontSize,
    fontFamily: GlobalStyle.boldFont.fontFamily,
  },
  barStyle: {
    backgroundColor: GlobalStyle.lightGrayColorBackground.backgroundColor,
    borderColor: GlobalStyle.lightBlueColorBackground.backgroundColor,
    borderTopWidth: 1,
  }
})


