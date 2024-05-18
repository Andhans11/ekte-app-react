// src/providers/AuthenticatedUserProvider.js

import React, { useState, createContext, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, firestore } from '../config';
import { getDoc, doc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthenticatedUserContext = createContext({});

export const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch and set user data from Firestore
  const fetchUserData = async (uid) => {
    try {
      const userDoc = await getDoc(doc(firestore, 'users', uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUser(userData);
        await AsyncStorage.setItem('user', JSON.stringify(userData)); // Save user data to AsyncStorage
      } else {
        console.error('User data not found');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to load user data from AsyncStorage
  const loadUserData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading user data from AsyncStorage:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if user is already logged in
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        fetchUserData(authUser.uid);
      } else {
        setLoading(false);
      }
    });

    // Load user data from AsyncStorage on app start
    loadUserData();

    return () => unsubscribe();
  }, []);

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {!loading && children}
    </AuthenticatedUserContext.Provider>
  );
};
