import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Theme } from '../../config/theme';

const Textarea = ({ placeholder, ...props }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textarea}
        placeholder={placeholder}
        placeholderTextColor={Theme.Colors.placeholder}
        multiline
        numberOfLines={4}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  textarea: {
    height: 100,
    borderColor: Theme.Colors.border,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingTop: 10,
    backgroundColor: Theme.Colors.background,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default Textarea;
