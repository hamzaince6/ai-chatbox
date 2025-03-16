import { useCallback, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { useRouter } from 'expo-router';
import { useFonts, Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ONBOARDING_DATA = [
  {
    title: 'The Best Unparalleled Conversational Brilliance',
    description: 'Experience AI-powered conversations that adapt to your needs, providing intelligent and context-aware responses.',
    image: require('../../assets/images/artboard-1.png'),
    gradient: ['#FFFFFF', '#FFFFFF'],
  },
  {
    title: 'Harness the Power of AI Assistants for Productivity',
    description: 'Let our AI assistants handle your tasks while you focus on what matters most. Boost your productivity effortlessly.',
    image: require('../../assets/images/artboard-2.png'),
    gradient: ['#FFFFFF', '#FFFFFF'],
  },
  {
    title: 'Diverse AI Helpers to Revolutionize Your Tasks',
    description: 'From writing to analysis, our AI helpers are designed to transform how you work and create.',
    image: require('../../assets/images/artboard-3.png'),
    gradient: ['#FFFFFF', '#FFFFFF']
  },
];

export default function Onboarding() {
  const router = useRouter();
  const splideRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fontsLoaded] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-SemiBold': Inter_600SemiBold,
  });

  const handleSkip = useCallback(() => {
    router.replace('/auth');
  }, [router]);

  const handleNext = useCallback(() => {
    if (currentIndex === ONBOARDING_DATA.length - 1) {
      router.replace('/auth');
    } else {
      splideRef.current?.go(currentIndex + 1);
    }
  }, [router, currentIndex]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Splide
        ref={splideRef}
        options={{
          type: 'slide',
          perPage: 1,
          arrows: false,
          pagination: false,
          drag: true,
          gap: '1rem',
          width: SCREEN_WIDTH,
          height: '100vh',
          breakpoints: {
            640: {
              height: '100vh',
            },
          },
        }}
        onMoved={(splide) => {
          const index = splide.index;
          setCurrentIndex(index);
        }}
      >
        {ONBOARDING_DATA.map((item, index) => (
          <SplideSlide key={index}>
            <View style={styles.slide}>
              <LinearGradient
                colors={item.gradient}
                style={styles.gradient}
              >
                <View style={styles.imageContainer}>
                  <Image
                    source={item.image}
                    style={styles.image}
                    resizeMode="cover"
                  />
                  {/* Gradient Overlay */}
                  <LinearGradient
                    colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.9)', '#FFFFFF']}
                    locations={[0, 0.4219, 0.6198, 0.8073, 1]}
                    style={styles.imageOverlay}
                  />
                </View>
                <View style={styles.customPagination}>
                  {ONBOARDING_DATA.map((_, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => splideRef.current?.go(index)}
                      style={[styles.customPaginationDot, currentIndex === index && styles.customPaginationDotActive]}
                    />
                  ))}
                </View>
                <View style={styles.content}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
              </LinearGradient>
            </View>
          </SplideSlide>
        ))}
      </Splide>

      <View style={styles.footer}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={handleSkip}
            style={[styles.button, styles.skipButton]}
          >
            <Text style={[styles.buttonText, styles.skipButtonText]}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleNext}
            style={[styles.button, styles.nextButton]}
          >
            <Text style={[styles.buttonText, styles.nextButtonText]}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: '100vh',
  },
  slide: {
    width: SCREEN_WIDTH,
    height: '100vh',
    position: 'relative',
  },
  gradient: {
    flex: 1,
    height: '100vh',
    position: 'relative',
  },
  imageContainer: {
    height: '50vh',
    width: '100%',
    overflow: 'hidden',
    borderRadius: 0,
    marginTop: 0,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-SemiBold',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 40,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: '90%',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingBottom: 48,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 24,
  },
  customPagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24,
  },
  customPaginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 4,
  },
  customPaginationDotActive: {
    backgroundColor: '#7C3AED',
    width: 32,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 100,
    minWidth: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipButton: {
    backgroundColor: '#F4F4F4',
    borderWidth: 1,
    borderColor: '#7E92F8',
  },
  nextButton: {
    backgroundColor: 'transparent',
    backgroundImage: 'linear-gradient(180deg, #7E92F8 0%, #6972F0 100%)',
    shadowColor: 'rgba(116, 131, 244, 0.10)',
    shadowOffset: { width: 4, height: 8 },
    shadowRadius: 24,
    shadowOpacity: 1,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Urbanist',
    fontWeight: '700',
    lineHeight: 28.8,
    letterSpacing: 0.2,
  },
  skipButtonText: {
    backgroundImage: 'linear-gradient(180deg, #7E92F8 0%, #6972F0 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  nextButtonText: {
    color: '#FFFFFF',
  },
});