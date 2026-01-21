// This file routes the user to the login page if they are logged out, and routes to home if logged in

import { Redirect } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
  const { user, loading } = useAuth();

  // If the user is loading, show a loading indicator
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // If the user is logged in, route to home
  if (user) {
    return <Redirect href="/(tabs)" />;
  }
  // If the user is logged out, route to login
  return <Redirect href="/(auth)/login" />;
}