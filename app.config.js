import "dotenv/config";

export default {
  expo: {
    name: "BuffetApp",
    slug: "BuffetApp",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./buffet-src/assets/icon.png",
    splash: {
      image: "./buffet-src/assets/buffet-logo-vertical.png",
      resizeMode: "contain",
      backgroundColor: "#FF8C20",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./buffet-src/assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
    },
    web: {
      favicon: "./buffet-src/assets/favicon.png",
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
