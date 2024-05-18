// src/screens/EventSelector.js

import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Theme } from '../config/theme';

const EventSelector = ({ route, navigation }) => {
  const { events, setSelectedEvent } = route.params;

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    navigation.goBack();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={true} onRequestClose={() => navigation.goBack()}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Velg ditt arrangement</Text>
          <Picker selectedValue={null} onValueChange={(itemValue) => handleEventSelect(itemValue)}>
            {events.map(event => (
              <Picker.Item label={event.Name} value={event} key={event.id} />
            ))}
          </Picker>
          <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    color: Theme.Colors.primary,
    fontSize: 16,
  },
});

export default EventSelector;
