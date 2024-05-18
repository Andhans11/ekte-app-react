// screens/EventDetailsScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EventDetailsScreen = ({ route }) => {
  const { event } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.Name}</Text>
      <Text>Number of Guests: {event.NoGuests}</Text>
      <Text>Description: {event.Date}</Text>  // Assuming there's a Description field
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  }
});

export default EventDetailsScreen;
