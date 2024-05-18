// src/components/Button.js

import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { Theme } from '../config/theme';

export const Button = ({
  onPress,
  title,
  type = 'primary', 
  style, // Accept additional styles
  textStyle, // Accept additional text styles
}) => {
  const buttonStyle = [styles.button, styles[type], style]; // Combine styles
  const textStyles = [styles.text, styles[`${type}Text`], textStyle]; // Combine text styles

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        buttonStyle,
        pressed && { opacity: 0.7 },
      ]}
    >
      <Text style={textStyles}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: { 
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: { 
    color: Theme.Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Modern Button Style
  primary: {
    backgroundColor: Theme.Colors.primary,
  },
  primaryText: {
    color: Theme.Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Secondary Button Style
  secondary: {
    backgroundColor: Theme.Colors.secondary,
  },
  secondaryText: {
    color: Theme.Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Outlined Button Style
  outline: {
    backgroundColor: Theme.Colors.white,
    borderWidth: 2,
    borderColor: Theme.Colors.primary, // Can use primary or secondary color
    
  },
  outlineText: {
    color: Theme.Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  }
});
