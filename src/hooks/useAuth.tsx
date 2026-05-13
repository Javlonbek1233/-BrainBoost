import { useState, useEffect, createContext, useContext } from 'react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, User, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { UserProfile } from '../types';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Sync profile
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          const newProfile: UserProfile = {
            userId: user.uid,
            displayName: user.displayName || 'Learning Ninja',
            email: user.email || '',
            photoURL: user.photoURL || '',
            level: 1,
            xp: 0,
            streak: 0,
            lastActive: new Date().toISOString(),
            stats: {
              quizzesCompleted: 0,
              flashcardsMastered: 0,
              studyMinutes: 0,
            },
            weakTopics: [],
            preferences: {
              darkMode: true,
              pomodoroLength: 25,
            }
          };
          await setDoc(userDocRef, newProfile);
          setProfile(newProfile);
        } else {
          setProfile(userDoc.data() as UserProfile);
        }

        // Listen for profile changes
        const unsubProfile = onSnapshot(userDocRef, (doc) => {
          if (doc.exists()) {
            setProfile(doc.data() as UserProfile);
          }
        });
        return () => unsubProfile();
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
