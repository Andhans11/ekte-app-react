import "dotenv/config";

export default {
  expo: {
    name: "Ekte planlegging",
    slug: "ekte-app",
    privacy: "public",
    platforms: ["ios", "android"],
    version: "0.19.0",
    orientation: "portrait",
    icon: "./assets/splash.png",
    splash: {
      image: "./assets/splash.png",
      backgroundColor: "#faf2f5", 
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
    },
  },
};
