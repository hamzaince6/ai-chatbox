import { Stack } from 'expo-router';

export default function CreateAccountLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="signup" />
    </Stack>
  );
} 