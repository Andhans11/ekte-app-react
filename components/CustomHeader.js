// src/components/CustomHeader.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Assuming you're using Expo and have installed @expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Theme } from '../config/theme';
import { View as CustomView, TextInput, Logo, Button as CustomButton, FormErrorMessage } from "../components";

const CustomHeader = ({ title }) => {
  const navigation = useNavigation();

  return (
    <CustomView isSafe style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <FontAwesome name="angle-left" size={24} color={Theme.Colors.text} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}></Text>
    </CustomView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: Theme.Colors.background, // Customize as needed
  },
  backButton: {
    marginRight: 15,
    
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Theme.Colors.text,
  },
});

export default CustomHeader;
