import React from 'react';
import { View as RNView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from "../config";

// Define a base style for the component
const baseStyle = StyleSheet.create({
  defaultBackground: {
    backgroundColor: Colors.background, // Set your global background color here
  }
});

export const View = ({ isSafe, style, children }) => {
  const insets = useSafeAreaInsets();

  if (isSafe) {
    return (
      <RNView style={[baseStyle.defaultBackground, { paddingTop: insets.top }, style]}>
        {children}
      </RNView>
    );
  }

  return <RNView style={[baseStyle.defaultBackground, StyleSheet.flatten(style)]}>
    {children}
  </RNView>;
};
