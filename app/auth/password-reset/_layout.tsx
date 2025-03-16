import { Stack } from 'expo-router';

export default function PasswordResetLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="reset-password" />
      <Stack.Screen name="new-password" />
    </Stack>
  );
} 