import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Theme } from '../../config/theme';

const Password = ({ placeholder, ...props }) => {
  const [secureText, setSecureText] = useState(true);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Theme.Colors.placeholder}
        secureTextEntry={secureText}
        {...props}
      />
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => setSecureText(!secureText)}
      >
        <FontAwesome name={secureText ? "eye-slash" : "eye"} size={20} color={Theme.Colors.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    position: 'relative',
  },
  input: {
    height: 40,
    borderColor: Theme.Colors.border,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 40,
    backgroundColor: Theme.Colors.background,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    flex: 1,
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
  },
});

export default Password;
