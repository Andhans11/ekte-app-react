import React from 'react';
import { TextInput as RNTextInput } from 'react-native';

import { View } from './View';
import { Icon } from './Icon';
import { Button as CustomButton } from './Button';
import { Colors } from '../config';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const TextInput = ({
  width = '100%',
  leftIconName,
  rightIcon,
  handlePasswordVisibility,
  ...otherProps
}) => {
  return (
    <View
      style={{
        backgroundColor: Colors.white,
        borderRadius: 8,
        flexDirection: 'row',
        padding: 12,
        marginVertical: 12,
        width,
        borderWidth: 1,
        borderColor: Colors.mediumGray
      }}
    >
      {leftIconName ? (
        <Icon
          name={leftIconName}
          size={22}
          color={Colors.mediumGray}
          style={{ marginRight: 10 }}
        />
      ) : null}
      <RNTextInput
        style={{
          flex: 1,
          width: '100%',
          fontSize: 18,
          color: Colors.black
        }}
        placeholderTextColor={Colors.mediumGray}
        {...otherProps}
      />
      {rightIcon ? (
        <TouchableOpacity onPress={handlePasswordVisibility}>
          <Icon
            name={rightIcon}
            size={22}
            color={Colors.mediumGray}
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};