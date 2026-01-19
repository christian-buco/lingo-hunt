import { StyleSheet, Text, View } from 'react-native';

export default function ProgressScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Progress</Text>
      <Text style={styles.stat}>🔥 3 day streak</Text>
      <Text style={styles.stat}>⭐ 150 points</Text>
      <Text style={styles.stat}>📚 12 words learned</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  stat: {
    fontSize: 20,
    marginBottom: 20,
  },
});