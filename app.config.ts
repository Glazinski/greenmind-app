import 'dotenv/config';

export default {
  name: 'growbox-app-v2',
  slug: 'growbox-app-v2',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    softwareKeyboardLayoutMode: 'pan',
    package: 'com.glazinski.growboxappv2',
  },
  web: {
    favicon: './assets/favicon.png',
  },
  extra: {
    apiBaseUrl: process.env.EXPO_API_BASE_URL,
    myIpAddress: process.env.EXPO_MY_IP_ADDRESS,
    microserviceUrl: process.env.EXPO_MICROSERVICE_URL,
    eas: {
      projectId: '9ec4dd1f-d361-4e93-adda-9a2b2b360043',
    },
  },
  plugins: ['expo-localization'],
};
