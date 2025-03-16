import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const AuthScreen = () => {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#c2e9fb', '#e6c3f2']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome to</Text>
            <Text style={styles.appNameText}>Qubiko AI <Text>👋</Text></Text>
          </View>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Log in</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.signupButton}
              onPress={() => router.push('/auth/signup')}
            >
              <Text style={styles.signupButtonText}>Sign up</Text>
            </TouchableOpacity>
            
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.orText}>or continue with</Text>
              <View style={styles.dividerLine} />
            </View>
            
            <View style={styles.socialButtonsContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <AntDesign name="google" size={20} color="#DB4437" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.socialButton}>
                <AntDesign name="apple1" size={20} color="black" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.socialButton}>
                <FontAwesome name="facebook" size={20} color="#4267B2" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  welcomeContainer: {
    marginBottom: 80,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: '500',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  appNameText: {
    fontSize: 32,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  loginButton: {
    backgroundColor: 'transparent',
    backgroundImage: 'linear-gradient(180deg, #7E92F8 0%, #6972F0 100%)',
    width: '100%',
    padding: 16,
    borderRadius: 100,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  signupButton: {
    backgroundColor: 'white',
    width: '100%',
    padding: 16,
    borderRadius: 100,
    alignItems: 'center',
    marginBottom: 32,
  },
  signupButtonText: {
    color: '#7C3AED',
    fontSize: 16,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'white',
  },
  orText: {
    color: '#666666',
    fontSize: 14,
    marginHorizontal: 12,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    gap: 16,
  },
  socialButton: {
    backgroundColor: 'white',
    width: 120,
    height: 40,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  }
});

export default AuthScreen;