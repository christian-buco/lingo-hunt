import { useRouter } from 'expo-router';
import { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View, 
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { db, auth } from '../../firebase/config';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

// Signup Screen
export default function SignupScreen() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle signup
  const handleSignup = async () => {
    // If the email, password, confirm password, or display name is not filled in, show an error
    if (!email.trim() || !password.trim() || !confirmPassword.trim() || !displayName.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // If the email does not include an @, show an error
    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    // If the password is less than 6 characters, show an error
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    // If the passwords do not match, show an error
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // Try to sign up
    try {
      setLoading(true);
      await signUp(email.trim(), password);
      
      // Get the current user from Firebase auth
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('User not found after signup');
      }
      
      // Create user profile in Firestore
      const userProfile = {
        userId: currentUser.uid,
        email: currentUser.email,
        displayName: displayName.trim(),
        createdAt: serverTimestamp(),
        activeLanguage: 'Spanish',
        deviceToken: null
      };
      
      await setDoc(doc(db, 'users', currentUser.uid), userProfile);
      
      // Redirect to home screen after successful signup and profile creation
      router.replace('/(tabs)');
    } catch (error: any) {
      let errorMessage = 'Failed to create account. Please try again.';
      
      // If credentials are invalid, show an error
      if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      } else if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'An account with this email already exists.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Please choose a stronger password.';
      } else if (error.code === 'auth/operation-not-allowed') {
        errorMessage = 'Email/password accounts are not enabled.';
      }
      
      Alert.alert('Sign Up Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        {/* Heading: Sign Up Create your account */}
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>Create your account</Text>
        
        {/* Email form */}
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Display Name"
            placeholderTextColor="#999"
            value={displayName}
            onChangeText={setDisplayName}
            autoCapitalize="words"
            editable={!loading}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            editable={!loading}
          />
          
          {/* Password form */}
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoComplete="password-new"
            editable={!loading}
          />
          
          {/* Confirm Password form */}
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#999"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
            autoComplete="password-new"
            editable={!loading}
          />
          
          {/* Sign Up Button */}
          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSignup}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Sign Up</Text>
            )}
          </TouchableOpacity>
        </View>
        
        {/* Footer: Already have an account? Sign In */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity 
            onPress={() => router.back()}
            disabled={loading}
          >
            <Text style={styles.linkText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
  linkText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
});