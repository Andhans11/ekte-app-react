// src/navigation/AppStack.js

import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CustomAppHeader from '../components/CustomAppHeader';
import { HomeScreen } from "../screens";
import EventSelector from "../screens/EventSelector";

const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={HomeScreen}
        options={({ route }) => ({
          headerShown: true,
          header: () => (
            <CustomAppHeader
              events={route.params?.events || []}
              selectedEvent={route.params?.selectedEvent || null}
              setSelectedEvent={route.params?.setSelectedEvent}
            />
          ),
        })}
      />
      <Stack.Screen name="EventSelector" component={EventSelector} />
    </Stack.Navigator>
  );
};
