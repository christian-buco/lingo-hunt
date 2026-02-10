import {
    User,
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase/config';

// Define the context type
// Functions: signIn, signUp, signOut, resetPassword
interface AuthContextType {
    user: User | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string, displayName: string, username: string) => Promise<void>;
    signOut: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
    // Define states
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Listen for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);
            setLoading(false);

            // Update lastLogin timestamp in Firestore once per day (Efficient)
            if (user) {
                try {
                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    const userData = userDoc.data();

                    const lastLogin = userData?.lastLogin?.toDate();
                    const today = new Date();

                    // Update if last login was on a different day (or first time)
                    const shouldUpdate = !lastLogin || lastLogin.toDateString() !== today.toDateString();

                    if (shouldUpdate) {
                        await updateDoc(doc(db, 'users', user.uid), {
                            lastLogin: serverTimestamp(),
                        });
                        console.log('Updated lastLogin for user:', user.uid);
                    }

                } catch (error) {
                    console.error('Error updating lastLogin:', error);
                }
            }
        });

        return unsubscribe;
    }, []);

    // Define functions
    // Sign in with email and password
    const signIn = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    // Sign up with email and password
    const signUp = async (email: string, password: string, displayName: string, username: string) => {
        // Create auth account
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Create user profile in Firestore
        const today = new Date().toISOString().split('T')[0];
        await setDoc(doc(db, 'users', user.uid), {
            email: email,
            displayName: displayName.trim(),
            username: username.trim(),
            photoURL: null,
            createdAt: serverTimestamp(),

            // Overall stats
            totalChallengesCompleted: 0,
            totalScore: 0,

            // Language settings
            activeLanguage: 'spanish',
            nativeLanguage: 'english',
            languages: {
                spanish: {
                    level: 1,
                    totalScore: 0,
                    challengesCompleted: 0,
                    streakDays: 0,
                    lastActiveDate: serverTimestamp(),
                    startedAt: serverTimestamp()
                }
            },

            // Privacy
            privacy: 'friends',
            shareProgress: true,

            // Social
            friendCount: 0,
            
            // Metadata
            lastLogin: serverTimestamp(),
            deviceToken: null,
        });
    };

    // Sign out
    const signOut = async () => {
        await firebaseSignOut(auth);
    };

    // Reset password
    const resetPassword = async (email: string) => {
        await sendPasswordResetEmail(auth, email);
    };

    // Define the value to be passed to the context
    const value = {
        user,
        loading,
        signIn,
        signUp,
        signOut,
        resetPassword,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


// Create the hook
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
