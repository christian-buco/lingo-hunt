import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)/login" />
      <Stack.Screen name="(auth)/signup" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen 
        name="camera" 
        options={{ 
          presentation: 'modal',
          headerShown: true,
          title: 'Take Photo'
        }} 
      />
    </Stack>
  );
}