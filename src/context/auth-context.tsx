"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User, signInWithPopup } from 'firebase/auth';
import { auth, db, googleProvider } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { AppUser, UserRole } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

interface AuthContextType {
  user: User | null;
  appUser: AppUser | null;
  userRole: UserRole | null;
  loading: boolean;
  handleLogin: (user: User) => Promise<void>;
  handleGoogleSignIn: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();
  
  const handleLogin = async (firebaseUser: User) => {
    const userDocRef = doc(db, "users", firebaseUser.uid);
    const userDoc = await getDoc(userDocRef);

    let role: UserRole = 'patient'; // Default role
    if (userDoc.exists()) {
      role = userDoc.data().role || 'patient';
    } else {
        // This case is for users who might have been created via phone auth or other methods without a DB entry.
        // We'll create a record for them.
         await setDoc(userDocRef, {
            uid: firebaseUser.uid,
            name: firebaseUser.displayName,
            email: firebaseUser.email,
            role: "patient",
        });
    }

    toast({
      title: "Login Successful",
      description: `Redirecting to ${role} dashboard...`,
    });

    setTimeout(() => {
      switch (role) {
        case "patient":
          router.push("/dashboard/patient");
          break;
        case "practitioner":
          router.push("/dashboard/practitioner");
          break;
        case "admin":
          router.push("/dashboard/admin");
          break;
        default:
          router.push("/dashboard");
      }
    }, 1000);
  };
  
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            role: "patient",
        });
      }

      await handleLogin(user);
    } catch (error: any) {
       toast({
            title: "Google Sign-In Failed",
            description: error.message,
            variant: "destructive"
        })
    } finally {
        setLoading(false);
    }
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data() as AppUser;
          setAppUser(userData);
          setUserRole(userData.role);
        }
      } else {
        setUser(null);
        setAppUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = { user, appUser, userRole, loading, handleLogin, handleGoogleSignIn };

  if (loading) {
      return (
          <div className="min-h-screen flex items-center justify-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary"/>
          </div>
      )
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
