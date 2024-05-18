import React from 'react';
import { View, Slider, StyleSheet } from 'react-native';
import { Theme } from '../../config/theme';

const CustomSlider = ({ value, onValueChange, ...props }) => {
  return (
    <View style={styles.container}>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={100}
        value={value}
        onValueChange={onValueChange}
        minimumTrackTintColor={Theme.Colors.primary}
        maximumTrackTintColor={Theme.Colors.border}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  slider: {
    width: '100%',
  },
});

export default CustomSlider;
