import { Stack } from 'expo-router';
import { AuthProvider } from '../contexts/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}