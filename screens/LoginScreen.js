// src/screens/LoginScreen.js

import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { View as CustomView, TextInput, Logo, Button as CustomButton, FormErrorMessage } from "../components";
import { Images, Colors, auth, firestore } from "../config";
import { useTogglePasswordVisibility } from "../hooks";
import { loginValidationSchema } from "../utils";
import { Theme } from "../config/theme";
import { useUser } from "../contexts/UserContext"; // Import the UserContext
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LoginScreen = ({ navigation }) => {
  const [errorState, setErrorState] = useState("");
  const { passwordVisibility, handlePasswordVisibility, rightIcon } = useTogglePasswordVisibility();
  const { setUser } = useUser(); // Get setUser from the UserContext

  const handleLogin = async (values) => {
    const { email, password } = values;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Log user UID
      console.log('Logged in user UID:', user.uid);

      // Fetch user data from Firestore
      const userDoc = await getDoc(doc(firestore, "users", user.uid));
      if (userDoc.exists()) {
        console.log('User data fetched from Firestore:', userDoc.data());
        const userData = userDoc.data();
        setUser(userData); // Save user data in the context
        await AsyncStorage.setItem('user', JSON.stringify(userData)); // Save user data to AsyncStorage
        navigation.navigate("Dashboard"); // Navigate to HomeScreen
      } else {
        setErrorState("User data not found");
        console.error("User data not found for UID:", user.uid);
      }
    } catch (error) {
      setErrorState(error.message);
      console.error("Error during login:", error);
    }
  };



  return (
    <>
      <CustomView isSafe style={styles.container}>
        <KeyboardAwareScrollView enableOnAndroid={true}>
          {/* LogoContainer: consist app logo and screen title */}
          <View style={styles.logoContainer}>
            <Logo uri={Images.logo} />
            <Text style={styles.screenTitle}></Text>
          </View>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginValidationSchema}
            onSubmit={(values) => handleLogin(values)}
          >
            {({
              values,
              touched,
              errors,
              handleChange,
              handleSubmit,
              handleBlur,
            }) => (
              <>
                {/* Input fields */}
                <TextInput
                  name="email"
                  leftIconName="email"
                  placeholder="E-postadresse"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  autoFocus={true}
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                />
                <FormErrorMessage
                  error={errors.email}
                  visible={touched.email}
                />
                <TextInput
                  name="password"
                  leftIconName="key-variant"
                  placeholder="Passord"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={passwordVisibility}
                  textContentType="password"
                  rightIcon={rightIcon}
                  handlePasswordVisibility={handlePasswordVisibility}
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                />
                <FormErrorMessage
                  error={errors.password}
                  visible={touched.password}
                />
                {/* Display Screen Error Messages */}
                {errorState !== "" ? (
                  <FormErrorMessage error={errorState} visible={true} />
                ) : null}
                {/* Buttons container */}
                <View style={styles.buttonsContainer}>
                  {/* Login button */}
                  <CustomButton
                    borderless
                    title={"Logg inn"}
                    style={styles.halfWidthButton}
                    type="primary"
                    onPress={handleSubmit}
                  />
                  {/* Button to navigate to SignupScreen to create a new account */}
                  <TouchableOpacity
                    style={styles.borderlessButtonContainer}
                    onPress={() => navigation.navigate('Signup')}
                  >
                    <Text style={styles.borderlessButton}>Ikke registrert deg enda?</Text>
                    <Text style={styles.linkText}>Begynn planleggingen her</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.borderlessButtonContainer}
                    onPress={() => navigation.navigate('ForgotPassword')}
                  >
                    <Text style={styles.linkText}>Glemt passord</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </KeyboardAwareScrollView>
      </CustomView>

      {/* App info footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Ekte</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 60, // Ensure content is below the header
  },
  logoContainer: {
    alignItems: "center",
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.black,
    paddingTop: 20,
  },
  footer: {
    paddingHorizontal: 12,
    paddingBottom: 48,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.primary,
  },
  button: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: "700",
  },
  borderlessButtonContainer: {
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    alignItems: 'center',
  },
  halfWidthButton: {
    width: '100%',
    marginTop: 20,
  },
  linkText: {
    fontSize: 16,
    color: Colors.text,
    textDecorationLine: 'underline',
  },
});
