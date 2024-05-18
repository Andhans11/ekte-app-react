import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Theme } from '../../config/theme';

const Input = ({ placeholder, ...props }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Theme.Colors.placeholder}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: Theme.Colors.border,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    backgroundColor: Theme.Colors.background,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default Input;
