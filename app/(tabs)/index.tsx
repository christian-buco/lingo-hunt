import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Challenge</Text>
      <Text style={styles.word}>café</Text>
      <Text style={styles.translation}>coffee</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => router.push('/camera')}
      >
        <Text style={styles.buttonText}>📸 Take Photo</Text>
      </TouchableOpacity>
      
      <Text style={styles.hint}>Find a coffee cup and take a photo!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  word: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  translation: {
    fontSize: 24,
    color: '#666',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  hint: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});