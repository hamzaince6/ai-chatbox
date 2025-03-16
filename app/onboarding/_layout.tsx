import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function OnboardingLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          gestureEnabled: false,
          animationDuration: 200,
          contentStyle: {
            backgroundColor: 'transparent'
          }
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false
          }}
        />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}