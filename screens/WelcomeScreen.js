// src/screens/WelcomeScreen.js

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';
import { View as CustomView, Logo } from "../components";
import { Button } from '../components/Button'; // Import Button component
import { Theme } from '../config/theme';
import { FontAwesome } from '@expo/vector-icons'; // Assuming you're using Expo and have installed @expo/vector-icons

const { width } = Dimensions.get('window');
const totalSlides = 3;

// Static imports for the animations
import screen1Animation from '../assets/animations/screen1.json';
import screen2Animation from '../assets/animations/screen2.json';
import screen3Animation from '../assets/animations/screen3.json';

const animations = [screen1Animation, screen2Animation, screen3Animation];
const titles = ["Finn ditt sted", "Administrer budsjettet ditt", "Nyt din spesielle dag"];
const descriptions = [
  "Oppdag vakre steder som passer din stil og budsjett. Planlegg din perfekte dag uten anstrengelse.",
  "Hold oversikt over utgiftene dine og hold deg innenfor budsjettet med vårt brukervennlige budsjettstyringsverktøy.",
  "Slapp av og nyt bryllupsdagen mens vi hjelper deg med å håndtere alt smidig."
];

const WelcomeScreen = ({ navigation }) => {
  const scrollX = useSharedValue(0);
  const scrollViewRef = useRef(null);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const dotIndicatorStyle = useAnimatedStyle(() => {
    const dotWidth = 8;
    const dotMargin = 8; // Adjust this value if the margin between dots changes
    const translateX = interpolate(
      scrollX.value,
      [0, width * (totalSlides - 1)],
      [0, (dotWidth + dotMargin) * (totalSlides - 1)]
    );

    return {
      transform: [{ translateX }],
    };
  });

  const handleNext = (index) => {
    if (index < totalSlides - 1) {
      scrollViewRef.current.scrollTo({
        x: (index + 1) * width,
        animated: true,
      });
    } else {
      navigation.navigate('NextScreen'); // Adjust this to your next screen
    }
  };

  const parallaxStyle = (index) => useAnimatedStyle(() => {
    const scale = interpolate(
      scrollX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0.5, 1, 0.5]
    );

    return {
      transform: [{ scale }],
    };
  });

  return (
    <CustomView isSafe style={styles.container}>
      <Logo uri={require('../assets/logo_ekte_rosa_300.png')} />
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        style={styles.carousel}
      >
        {animations.map((animation, i) => (
          <View key={i} style={styles.slide}>
            <Animated.View style={[styles.lottieContainer, parallaxStyle(i)]}>
              <LottieView source={animation} autoPlay loop style={styles.lottie} />
            </Animated.View>
            <Text style={styles.title}>{titles[i]}</Text>
            <Text style={styles.description}>{descriptions[i]}</Text>
            {i < totalSlides - 1 && (
              <View style={styles.navigationButtonContainer}>
                <Button
                  title={<FontAwesome name="angle-right" size={24} color="white" />}
                  onPress={() => handleNext(i)}
                />
              </View>
            )}
            {i === totalSlides - 1 && (
              <View style={styles.lastPageButtons}>
                <Button
                  title="Logg Inn"
                  type="primary"
                  onPress={() => navigation.navigate('Login')}
                  style={styles.halfWidthButton}
                />
                <Button
                  title="Registrer deg"
                  type="outline"
                  onPress={() => navigation.navigate('Signup')}
                  style={styles.halfWidthButton}
                />
              </View>
            )}
          </View>
        ))}
      </Animated.ScrollView>
      <View style={styles.dotContainer}>
        {Array.from({ length: totalSlides }).map((_, i) => (
          <View key={i} style={styles.dot} />
        ))}
        <Animated.View style={[styles.activeDot, dotIndicatorStyle]} />
      </View>
    </CustomView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.Colors.background, // Background color
    paddingVertical: 20,
  },
  carousel: {
    flexDirection: 'row',
    width: width,
  },
  slide: {
    width: width,
    alignItems: 'center',
    padding: 20,
  },
  lottieContainer: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Theme.Colors.text, // Text color
    marginVertical: 20,
  },
  description: {
    fontSize: 16,
    color: Theme.Colors.text, // Text color
    textAlign: 'center',
    marginBottom: 40,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Theme.Colors.accent, // Dot color
    marginHorizontal: 4, // Adjust this value if the margin between dots changes
  },
  activeDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Theme.Colors.secondary, // Primary color for active dot
    left: 4, // Adjust this value if the margin between dots changes
  },
  navigationButtonContainer: {
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
  lastPageButtons: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '90%',
  },
  halfWidthButton: {
    width: '100%',
    marginBottom: 20,
  },
});

export default WelcomeScreen;
