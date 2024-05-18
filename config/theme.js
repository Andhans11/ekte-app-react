// src/config/Theme.js

export const Colors = {
  orange: "#f57c00",
  blue: "#039be5",
  black: "#222222",
  mediumGray: "#6e6869",
  red: "#fc5c65",

  primary: "#D6B0A5",    // Updated to pastel pink
  secondary: "#ABBCCB",  // Updated to soft teal
  accent: "#AF9888",     // Updated to a matching beige
  background: "#FEFEFE", // Keep as very light pinkish beige
  text: "#455151",       // Updated to a darker gray for better contrast
  textlight: "#FAFAFA",  // Keep as very light color for text
  highlight: "#806751",  // Updated to brown for highlighting elements or links
  warning: "#F6F6F7",    // Updated to very light gray for warnings or alerts
  danger: "#FC5C65",     // Keep as pastel red for errors or dangerous actions
  dark: "#2F2F2F",       // Added dark black
  gray: "#C4C4C4",       // Added medium gray
  lightGray: "#F0F0F0",  // Added light gray
  veryLightGray: "#F6F6F7", // Added very light gray
  white: "#FFFFFF",      // Added white
};

export const Typography = {
  heading1: {
    fontSize: 32,
    fontFamily: 'Quicksand-Bold',
    fontWeight: 'bold',
    color: Colors.text,
  },
  heading2: {
    fontSize: 24,
    fontFamily: 'Quicksand-Bold',
    fontWeight: '600',
    color: Colors.secondary,
  },
  smallsubheader: {
    fontSize: 12,
    fontFamily: 'Quicksand-Bold',
    fontWeight: '500',
    color: Colors.text,
  },
  body: {
    fontSize: 16,
    fontFamily: 'SourceSans-Bold',
    fontWeight: 'normal',
    color: Colors.text,
  },
  caption: {
    fontSize: 12,
    fontFamily: 'SourceSans-Regular',
    fontWeight: '300',
    color: Colors.mediumGray,
  },
  button: {
    fontSize: 18,
    fontFamily: 'SourceSans-Bold',
    fontWeight: '500',
    color: Colors.white,
  },
  link: {
    fontSize: 16,
    fontFamily: 'SourceSans-Regular',
    fontWeight: 'normal',
    color: Colors.highlight,
    textDecorationLine: 'underline',
  }
};

export const CustomStyle = {
  card: {
    backgroundColor: Colors.white,
    borderRadius: 25,
    padding: 0,
    marginVertical: 10,
    // Shadow for iOS
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // Shadow for Android
    elevation: 10,
    overflow: 'hidden',
  },
};

export const Theme = {
  Colors,
  Typography,
  CustomStyle,
};
