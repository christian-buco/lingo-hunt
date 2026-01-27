import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CountryFlag from "react-native-country-flag";
import React from 'react';

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = () => {
    // TODO: Implement logout in Epic 2
    router.replace('/(auth)/login');
  };

  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: 'column',
        }
      ]}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <CountryFlag isoCode="us" size={25} />

      </View>
      <View style={{flex: 2, backgroundColor: '#000500'}} />
      <View style={{flex: 1, backgroundColor: '#1f501f'}} />
      <View style={{flex: 1, backgroundColor: '#0faddd'}} />
      <View style={{flex: 1, backgroundColor: '#0a1924'}} />
      <View style={{flex: 1, backgroundColor: '#4b1635'}} />
      <View style={{flex: 1, backgroundColor: '#caa21f'}} />
      <View style={{flex: 1, backgroundColor: '#ca2a15'}} />
      
      <Text>Profile pic</Text>
      <Text>user@example.com</Text>
      <Text>Level 3</Text>
      
      <TouchableOpacity 
        onPress={handleLogout}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
});




