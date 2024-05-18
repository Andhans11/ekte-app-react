// navigation/AuthStack.js

import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen, SignupScreen, ForgotPasswordScreen } from "../screens";
import WelcomeScreen from "../screens/WelcomeScreen";
import CustomHeader from '../components/CustomHeader';

const Stack = createStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{
          headerShown: true,
          header: () => <CustomHeader title="Logg Inn" />, // Use the custom header
        }}
      />
           <Stack.Screen 
        name="Signup" 
        component={SignupScreen} 
        options={{
          headerShown: true,
          header: () => <CustomHeader title="Start planleggingen" />, // Use the custom header
        }}
        />
      <Stack.Screen 
      name="ForgotPassword" 
      component={ForgotPasswordScreen} 
      options={{
        headerShown: true,
        header: () => <CustomHeader title="Glemt passord" />, // Use the custom header
      }}
      />
    </Stack.Navigator>
  );
};
