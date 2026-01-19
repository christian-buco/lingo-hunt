import { Redirect } from 'expo-router';

export default function Index() {
  // For now, always redirect to login
  // TODO: Check auth status in Epic 2
  const isLoggedIn = false;

  if (isLoggedIn) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/(auth)/login" />;
}