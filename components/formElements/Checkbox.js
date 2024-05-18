import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Theme } from '../../config/theme';

const Checkbox = ({ label, checked, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <FontAwesome
        name={checked ? "check-square-o" : "square-o"}
        size={24}
        color={Theme.Colors.text}
      />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
    color: Theme.Colors.text,
  },
});

export default Checkbox;
