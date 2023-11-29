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
    backgroundColor: '#126D34',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#126D34',
    },
    softwareKeyboardLayoutMode: 'pan',
    package: 'com.glazinski.growboxappv2',
  },
  extra: {
    apiBaseUrl: process.env.EXPO_API_BASE_URL,
    myIpAddress: process.env.EXPO_MY_IP_ADDRESS,
    eas: {
      projectId: '9ec4dd1f-d361-4e93-adda-9a2b2b360043',
    },
  },
};
