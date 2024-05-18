// components/CustomSplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import Logo from './Logo'; // Assuming you have a Logo component

const CustomSplashScreen = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0);  // Initial opacity for the logo

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true
      }
    ).start(() => {
      navigation.replace('Welcome');  // Navigate to Welcome screen after animation
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ ...styles.logo, opacity: fadeAnim }}>
        <Logo uri={require('../assets/logo_ekte_rosa_300.png')} />
        <Text style={styles.tagline}>Welcome to Our App</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#faf4f2',  // Use a suitable background color
  },
  logo: {
    alignItems: 'center'
  },
  tagline: {
    marginTop: 20,
    fontSize: 18,
    color: '#333'
  }
});

export default CustomSplashScreen;
