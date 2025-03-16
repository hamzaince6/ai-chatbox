import { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts, Inter_600SemiBold } from '@expo-google-fonts/inter';

export default function SplashScreen() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    'Inter-SemiBold': Inter_600SemiBold,
  });

  const spinValue = new Animated.Value(0);
  const scaleValue = new Animated.Value(0.3);
  const opacityValue = new Animated.Value(0);
  const loaderSpinValue = new Animated.Value(0);

  useEffect(() => {
    if (!fontsLoaded) return;

    // Spin animation for logo
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Spin animation for loader
    Animated.loop(
      Animated.timing(loaderSpinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Scale and fade in animation
    Animated.sequence([
      Animated.parallel([
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Navigate to onboarding after 500ms
    const timer = setTimeout(() => {
      router.replace('/onboarding');
    }, 500);

    return () => clearTimeout(timer);
  }, [fontsLoaded]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const loaderSpin = loaderSpinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: opacityValue,
            transform: [
              { scale: scaleValue },
            ],
          },
        ]}
      >
        <Animated.View
          style={[
            styles.logo,
            {
              transform: [{ rotate: spin }],
            },
          ]}
        >
          <View style={styles.atom}>
            <View style={[styles.orbit, styles.orbit1]} />
            <View style={[styles.orbit, styles.orbit2]} />
            <View style={[styles.orbit, styles.orbit3]} />
            <View style={styles.nucleus} />
          </View>
        </Animated.View>
        <Text style={styles.title}>Qubiko</Text>
      </Animated.View>
      <Animated.View
        style={[
          styles.loaderContainer,
          {
            opacity: opacityValue,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.loader,
            {
              transform: [{ rotate: loaderSpin }],
            },
          ]}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  atom: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  orbit: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '100%',
    height: '100%',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#7C3AED',
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
  orbit1: {
    transform: [{ translateX: -50 }, { translateY: -50 }, { rotate: '0deg' }],
  },
  orbit2: {
    transform: [{ translateX: -50 }, { translateY: -50 }, { rotate: '60deg' }],
  },
  orbit3: {
    transform: [{ translateX: -50 }, { translateY: -50 }, { rotate: '120deg' }],
  },
  nucleus: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: '#7C3AED',
    borderRadius: 10,
    top: '50%',
    left: '50%',
    transform: [{ translateX: -10 }, { translateY: -10 }],
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-SemiBold',
    color: '#1A1A1A',
    marginTop: 20,
  },
  loaderContainer: {
    position: 'absolute',
    bottom: 80,
  },
  loader: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#7C3AED',
    borderTopColor: 'transparent',
  },
});