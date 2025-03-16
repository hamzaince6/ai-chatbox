import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { FontAwesome, AntDesign, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUpScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);

  const handleContinue = () => {
    if (!email.trim()) {
      toast.error('Lütfen email adresinizi giriniz', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    if (!password.trim()) {
      toast.error('Lütfen şifrenizi giriniz', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    if (!agreed) {
      toast.error('Lütfen kullanım koşullarını kabul ediniz', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    // Tüm validasyonlar başarılı
    toast.success('Tüm validasyonlar başarılı, kayıt işlemine devam ediliyor...', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      onClose: () => {
        router.push('/auth/complete-profile');
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ToastContainer />
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/auth')} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="#1A1A1A" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Hello there <Text>👋</Text></Text>
            <Text style={styles.subtitle}>Please enter your email & password to create an account.</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email address</Text>
              <TextInput
                style={[styles.input, isFocusedEmail && styles.inputFocused]}
                placeholder="Email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                selectionColor="#7C3AED"
                cursorColor="#7C3AED"
                onFocus={() => setIsFocusedEmail(true)}
                onBlur={() => setIsFocusedEmail(false)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <View style={[styles.passwordContainer, isFocusedPassword && styles.inputFocused]}>
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  placeholder="Password"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  selectionColor="#7C3AED"
                  cursorColor="#7C3AED"
                  onFocus={() => setIsFocusedPassword(true)}
                  onBlur={() => setIsFocusedPassword(false)}
                />
                <TouchableOpacity 
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="#999" />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.checkbox}
              onPress={() => setAgreed(!agreed)}
            >
              <View style={[styles.checkboxBox, agreed && styles.checkboxChecked]}>
                {agreed && <Ionicons name="checkmark" size={18} color="white" />}
              </View>
              <Text style={styles.checkboxText}>
                I agree to Qubiko AI{' '}
                <Text style={styles.link}>Public Agreement</Text>,{' '}
                <Text style={styles.link}>Terms</Text>, &{' '}
                <Text style={styles.link}>Privacy Policy</Text>.
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.continueButton}
              onPress={handleContinue}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>

            <View style={styles.loginSection}>
              <Text style={styles.loginText}>Already have an account?{' '}
                <Text style={styles.loginLink} onPress={() => router.push('/auth')}>Log in</Text>
              </Text>
            </View>

            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.orText}>or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialButtonsContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <AntDesign name="google" size={24} color="#DB4437" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.socialButton}>
                <AntDesign name="apple1" size={24} color="black" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.socialButton}>
                <FontAwesome name="facebook" size={24} color="#4267B2" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  titleContainer: {
    marginBottom: 40,
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  form: {
    gap: 24,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  input: {
    backgroundColor: '#F8F9FA',
    borderRadius: 50,
    padding: 16,
    fontSize: 16,
    color: '#1A1A1A',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  inputFocused: {
    borderColor: '#7C3AED',
    borderWidth: 1,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  passwordInput: {
    flex: 1,
    paddingRight: 50,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    padding: 8,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 12,
    marginBottom: 32,
  },
  checkboxBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#7C3AED',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#7C3AED',
  },
  checkboxText: {
    flex: 1,
    fontSize: 14,
    color: '#1A1A1A',
    lineHeight: 20,
  },
  link: {
    color: '#7C3AED',
    textDecorationLine: 'underline',
  },
  continueButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  loginSection: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  loginText: {
    fontSize: 14,
    color: '#666666',
  },
  loginLink: {
    color: '#7C3AED',
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  orText: {
    marginHorizontal: 12,
    color: '#666666',
    fontSize: 14,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    paddingHorizontal: 24,
  },
  socialButton: {
    width: 100,
    height: 48,
    backgroundColor: 'white',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
});

export default SignUpScreen; 