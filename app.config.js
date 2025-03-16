export default {
  name: 'AI Chatbox',
  slug: 'ai-chatbox',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/favicon.svg',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/favicon.svg',
    resizeMode: 'contain',
    backgroundColor: '#ffffff'
  },
  assetBundlePatterns: [
    '**/*'
  ],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.aichatbox.app'
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/favicon.svg',
      backgroundColor: '#ffffff'
    },
    package: 'com.aichatbox.app'
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/favicon.svg',
    build: {
      babel: {
        include: ['@expo/vector-icons', 'expo-router']
      }
    },
    publicPath: '/',
    staticDirectory: './public'
  },
  plugins: [
    'expo-router'
  ],
  scheme: 'ai-chatbox'
}; 