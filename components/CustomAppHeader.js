import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Modal, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { useUser } from '../contexts/UserContext';
import { Theme } from '../config/theme';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Input, Password, Button } from '../components/formElements';


const CustomAppHeader = ({ events, selectedEvent, setSelectedEvent }) => {
  const { user } = useUser();
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    console.log('User data:', user);
    console.log('Selected Event:', selectedEvent);
  }, [user, selectedEvent]);

  const handleEventChange = () => {
    if (events.length > 1) {
      setModalVisible(true);
    }
  };

  const renderEventPill = ({ item }) => (
    <TouchableOpacity
      style={[styles.eventPill, item === selectedEvent && styles.selectedEventPill]}
      onPress={() => {
        setSelectedEvent(item);
        setModalVisible(false);
      }}
    >
      <Text style={styles.eventPillText}>{item.Name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <ImageBackground
        source={{ uri: 'https://example.com/graphic-background.png' }} // Replace with your graphic background URL
        style={styles.headerContainer}
      >
        <View style={styles.topRow}>
        <View style={styles.locationDetails}>
            <TouchableOpacity onPress={handleEventChange} style={styles.eventNameContainer}>
              <Text style={[Theme.Typography.caption, styles.eventName]}>
                {selectedEvent?.Name} Bryllup {events.length > 1 && <FontAwesome name="caret-down" size={14} color={Theme.Colors.accent} />}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesome name="comments" size={24} color={Theme.Colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesome name="bell" size={24} color={Theme.Colors.text} />
          </TouchableOpacity>
        </View>
        <View style={styles.locationRow}>

        </View>
        <Formik
          initialValues={{ search: '' }}
          validationSchema={Yup.object({
            search: Yup.string().required('Required'),
          })}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.searchContainer}>
              <FontAwesome name="search" size={20} color={Theme.Colors.text} />
              <Input
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
              <TouchableOpacity style={styles.filterButton} onPress={handleSubmit}>
                <FontAwesome name="filter" size={20} color={Theme.Colors.text} />
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  SafeAreaView: {
    backgroundColor: Theme.Colors.background,
  },
    headerContainer: {
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    backgroundColor: Theme.Colors.background,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  iconButton: {
    marginHorizontal: 10,
  },
  locationDetails: {
    flex: 1,
    alignItems: 'Flex-Start',
  },
  eventNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventName: {
    fontSize: 18,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 5,
    marginTop: 10,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    color: Theme.Colors.text,
  },
  filterButton: {
    padding: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  topSheet: {
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  eventPillContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  eventPill: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  selectedEventPill: {
    backgroundColor: Theme.Colors.primary,
  },
  eventPillText: {
    color: Theme.Colors.text,
    fontWeight: 'bold',
  },
});

export default CustomAppHeader;
