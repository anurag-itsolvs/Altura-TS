import { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigator from './main/navigations';
import RNBootSplash from "react-native-bootsplash";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = ((): JSX.Element => {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Navigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
})

const styles = StyleSheet.create({
})

export default App;