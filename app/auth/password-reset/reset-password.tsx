import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Platform, TextInput } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPasswordScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [otpCode, setOtpCode] = useState(['', '', '', '']);
  const [activeIndex, setActiveIndex] = useState(0);
  const [countdown, setCountdown] = useState(60);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const inputRefs = useRef<Array<TextInput | null>>([null, null, null, null]);

  useEffect(() => {
    startCountdown();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startCountdown = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCountdown(60);
    timerRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResendCode = () => {
    if (countdown === 0) {
      toast.info('Yeni OTP kodu gönderiliyor...', {
        position: "top-right",
        autoClose: 2000,
      });
      startCountdown();
    }
  };

  const handleOtpChange = (text: string, index: number) => {
    if (text.length <= 1 && /^[0-9]*$/.test(text)) {
      const newOtpCode = [...otpCode];
      newOtpCode[index] = text;
      setOtpCode(newOtpCode);
      
      if (text.length === 1 && index < 3) {
        // Sonraki input'a geç
        inputRefs.current[index + 1]?.focus();
      }
      
      // Tüm haneler dolduysa otomatik kontrol et
      if (index === 3 && text.length === 1) {
        const fullCode = newOtpCode.join('') + text;
        verifyOtpCode(fullCode);
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otpCode[index] && index > 0) {
      // Önceki input'a dön
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleBack = () => {
    router.push({
      pathname: '/auth/password-reset/forgot-password',
      params: { email: params.email }
    });
  };

  const verifyOtpCode = (code: string) => {
    toast.success('OTP kodu doğrulandı! Yeni şifrenizi belirleyebilirsiniz.', {
      position: "top-right",
      autoClose: 2000,
      onClose: () => {
        router.push({
          pathname: '/auth/password-reset/new-password',
          params: { email: params.email }
        });
      }
    });
  };

  const maskEmail = (email: string) => {
    if (!email) return '';
    const [username, domain] = email.split('@');
    const maskedUsername = username.slice(0, 2) + '*'.repeat(username.length - 2);
    return maskedUsername + '@' + domain;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ToastContainer />
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={handleBack}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="chevron-back" size={28} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>OTP code verification 🔒</Text>
          <Text style={styles.subtitle}>
            We have sent an OTP code to your email {'\n'}
            {maskEmail(typeof params.email === 'string' ? params.email : 'user@example.com')}. Enter the OTP code below to verify.
          </Text>
        </View>

        <View style={styles.otpContainer}>
          {otpCode.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => inputRefs.current[index] = ref}
              style={[
                styles.otpInput,
                activeIndex === index && styles.otpInputActive,
                digit && styles.otpInputFilled
              ]}
              value={digit}
              onChangeText={(text) => handleOtpChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              onFocus={() => setActiveIndex(index)}
              selectTextOnFocus
            />
          ))}
        </View>

        <TouchableOpacity 
          style={styles.resendContainer}
          onPress={handleResendCode}
          disabled={countdown > 0}
        >
          <Text style={styles.resendText}>Didn't receive email?</Text>
          <Text style={styles.resendTimer}>
            You can resend code in <Text style={styles.timerText}>{countdown}</Text> s
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    justifyContent: 'flex-start',
    paddingTop: 40,
  },
  titleContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  otpInput: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: 'transparent',
    fontSize: 24,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  otpInputActive: {
    borderColor: '#7C3AED',
  },
  otpInputFilled: {
    backgroundColor: '#F3F4F6',
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  resendText: {
    fontSize: 16,
    color: '#1A1A1A',
    marginBottom: 8,
  },
  resendTimer: {
    fontSize: 16,
    color: '#666666',
  },
  timerText: {
    color: '#7C3AED',
    fontWeight: '600',
  },
});

export default ResetPasswordScreen; 