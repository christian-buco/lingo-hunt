import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { db } from '../firebase/config';

export default function Index() {
  const [connectionStatus, setConnectionStatus] = useState("Testing...");

  useEffect(() => {
    // Test Firestore connection
    const testConnection = async () => {
      try {
        // Try to read from a collection (even if empty)
        const querySnapshot = await getDocs(collection(db, "test"));
        setConnectionStatus("Firebase Connected! ✅");
      } catch (error) {
        console.error("Firebase error:", error);
        setConnectionStatus("Firebase Error ❌");
      }
    };

    testConnection();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LangSnap App</Text>
      <Text style={styles.subtitle}>{connectionStatus}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
});