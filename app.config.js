module.exports = {
  expo: {
    name: 'ai-chatbox',
    slug: 'ai-chatbox',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    assetBundlePatterns: [
      '**/*'
    ],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff'
      }
    },
    web: {
      bundler: 'metro',
      favicon: './assets/favicon.png',
      build: {
        babel: {
          include: ['@expo/vector-icons', 'expo-router']
        }
      }
    },
    plugins: [
      'expo-router'
    ],
    scheme: 'ai-chatbox'
  }
}; 