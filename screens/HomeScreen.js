// src/screens/HomeScreen.js

import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, FlatList, Text, TouchableOpacity, ImageBackground, Modal } from "react-native";
import { signOut } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Picker } from '@react-native-picker/picker';
import { auth, firestore } from "../config";
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../contexts/UserContext';
import { View as CustomView, Button as CustomButton } from "../components";
import { Theme } from "../config/theme";

export const HomeScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const fetchEvents = async () => {
      console.log("Attempting to fetch events...");
      try {
        if (user?.uid) {
          const eventsQuery = query(collection(firestore, "events"), where("Users", "array-contains", user.uid));
          const querySnapshot = await getDocs(eventsQuery);
          console.log("Documents fetched successfully:", querySnapshot.docs.length);
          const eventData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setEvents(eventData);

          if (eventData.length === 1) {
            setSelectedEvent(eventData[0]);
          } else if (eventData.length > 1) {
            setModalVisible(true);
          }

          navigation.setParams({ events: eventData, selectedEvent: eventData[0], setSelectedEvent });
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [user]);

  const handleLogout = () => {
    console.log("Attempting to log out...");
    signOut(auth)
      .then(() => console.log("Logout successful."))
      .catch(error => console.error("Error logging out:", error));
  };

  const handleEventSelect = useCallback((event) => {
    setSelectedEvent(event);
    setModalVisible(false);
  }, []);

  const handlePress = useCallback((event) => {
    navigation.navigate('EventDetails', { event });
  }, [navigation]);

  const renderItem = useCallback(({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item)} style={Theme.CustomStyle.card}>
      <ImageBackground source={{ uri: item.ImgEvent }} style={styles.imageBackground} imageStyle={styles.image}>
        <View style={styles.overlay}>
          <Text style={[Theme.Typography.heading2, styles.itemTitle]}>{item.Name}</Text>
          <Text style={styles.itemDetail}>Dato: {new Date(item.Date.seconds * 1000).toLocaleDateString()}</Text>
          <Text style={styles.itemDetail}>Antall gjester: {item.NoGuests}</Text>
          <Text style={styles.itemDetail}>Budsjett: {item.Budget}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  ), [handlePress]);

  return (
    <CustomView isSafe style={styles.container}>
      {selectedEvent && (
        <>
          <FlatList
            data={events}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.flatListContent}
          />
          <CustomButton title="Logg ut" onPress={handleLogout} type="outline" style={styles.logoutButton} />
        </>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select an Event</Text>
            <Picker
              selectedValue={selectedEvent}
              onValueChange={(itemValue) => handleEventSelect(itemValue)}
            >
              {events.map(event => (
                <Picker.Item label={event.Name} value={event} key={event.id} />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>
    </CustomView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.Colors.background,
    padding: 16,
  },
  flatListContent: {
    paddingBottom: 16,
  },

  imageBackground: {
    width: '100%',
    height: 200,
    borderRadius: 25, // Ensures the image respects the card's border radius
    overflow: 'hidden', // Ensures the image doesn't overflow the card
    justifyContent: 'flex-end',
  },
  image: {
    borderRadius: 25, // Ensures the image respects the card's border radius
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Theme.Colors.white,
    marginBottom: 8,
  },
  itemDetail: {
    fontSize: 14,
    color: Theme.Colors.white,
    marginBottom: 4,
  },
  logoutButton: {
    width: '100%',
    marginTop: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: Theme.Colors.white,
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default HomeScreen;
