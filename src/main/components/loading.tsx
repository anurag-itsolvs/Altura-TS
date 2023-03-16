import React from 'react';
import { View, StyleSheet, Image, Text, ActivityIndicator } from 'react-native';
import GlobalStyle from "../../assets/css/style"

interface LoadingProps {
  loading: boolean;
  style?: any
}

export function Loading(props: LoadingProps) {
  if (!props.loading) {
    return <View />;
  }

  return (
    <View style={[StyleSheet.absoluteFill, styles.overlay, props.style ? props.style : null]}>
      <View style={styles.container}>
        <ActivityIndicator
          color={GlobalStyle.primaryBlueColor.color}
          size="large"
          style={styles.activityIndicator} />
        <Text style={[GlobalStyle.font_16, GlobalStyle.primaryBlueColor, GlobalStyle.semiboldFont]}>Loading...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "transparent",
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  container: {
    flexDirection: 'column',
    padding: 5,
    borderRadius: 8,
    height: 80,
    width: 100,
    alignItems: "center",
    justifyContent: "center"
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  }
});