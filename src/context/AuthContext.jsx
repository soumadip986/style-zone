import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AuthContext = createContext(null);

const DEMO_ADMIN = {
  id: 'admin-demo-user',
  email: 'admin@stylezone.com',
  role: 'admin',
  user_metadata: { full_name: 'Store Administrator' }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [adminProfile, setAdminProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const enableDemoLogin = import.meta.env.VITE_ENABLE_DEMO_LOGIN !== 'false';

  // Helper to query public.admin_profiles for the authenticated user ID (auth.uid())
  const verifyAdminProfile = async (userId) => {
    if (!isSupabaseConfigured || !supabase || !userId) return null;
    try {
      const { data, error } = await supabase
        .from('admin_profiles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (!error && data) {
        return data;
      }
    } catch (err) {
      console.warn('Error verifying admin profile in Supabase:', err);
    }
    return null;
  };

  useEffect(() => {
    // Check local session first
    const savedDemoUser = localStorage.getItem('sz_admin_session');
    if (savedDemoUser) {
      try {
        const parsed = JSON.parse(savedDemoUser);
        setUser(parsed);
        setAdminProfile(parsed.profile || { role: parsed.role || 'admin' });
      } catch (e) {
        localStorage.removeItem('sz_admin_session');
      }
    }

    // If Supabase is configured, check active Supabase Auth session & admin_profiles
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(async ({ data: { session } }) => {
        if (session?.user) {
          const profile = await verifyAdminProfile(session.user.id);
          if (profile) {
            setAdminProfile(profile);
            setUser({
              ...session.user,
              role: profile.role || 'admin',
              profile
            });
          } else if (enableDemoLogin) {
            // Development fallback
            setUser(session.user);
            setAdminProfile({ role: 'admin' });
          } else {
            // Non-admin authenticated user: deny and sign out
            await supabase.auth.signOut();
            setUser(null);
            setAdminProfile(null);
          }
        }
        setIsLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session?.user) {
          const profile = await verifyAdminProfile(session.user.id);
          if (profile) {
            setAdminProfile(profile);
            setUser({
              ...session.user,
              role: profile.role || 'admin',
              profile
            });
          } else if (enableDemoLogin) {
            setUser(session.user);
            setAdminProfile({ role: 'admin' });
          } else {
            // Non-admin authenticated user
            await supabase.auth.signOut();
            setUser(null);
            setAdminProfile(null);
          }
        } else if (!localStorage.getItem('sz_admin_session')) {
          setUser(null);
          setAdminProfile(null);
        }
      });

      return () => subscription.unsubscribe();
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);

    // If Supabase is active, authenticate with Supabase Auth
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        // If Supabase Auth credentials failed and demo login is enabled, check demo credentials
        if (enableDemoLogin && (email === 'admin@stylezone.com' || password === 'admin123')) {
          const demoSession = {
            ...DEMO_ADMIN,
            email: email || DEMO_ADMIN.email
          };
          localStorage.setItem('sz_admin_session', JSON.stringify(demoSession));
          setUser(demoSession);
          setAdminProfile({ role: 'admin' });
          setIsLoading(false);
          return demoSession;
        }
        setIsLoading(false);
        throw error;
      }

      // Supabase user authenticated successfully: check public.admin_profiles for auth.uid()
      const profile = await verifyAdminProfile(data.user.id);

      if (!profile && !enableDemoLogin) {
        // Authenticated non-admin user: deny access and sign out immediately
        await supabase.auth.signOut();
        setUser(null);
        setAdminProfile(null);
        setIsLoading(false);
        throw new Error('Access denied. Your account is not authorized in admin_profiles.');
      }

      const verifiedUser = {
        ...data.user,
        role: profile?.role || 'admin',
        profile: profile || { role: 'admin' }
      };

      setAdminProfile(profile || { role: 'admin' });
      setUser(verifiedUser);
      setIsLoading(false);
      return verifiedUser;
    }

    // Demo / Offline fallback mode
    if (enableDemoLogin) {
      if ((email === 'admin@stylezone.com' && password === 'admin123') || (email && password && password.length >= 6)) {
        const demoSession = {
          ...DEMO_ADMIN,
          email: email || DEMO_ADMIN.email
        };
        localStorage.setItem('sz_admin_session', JSON.stringify(demoSession));
        setUser(demoSession);
        setAdminProfile({ role: 'admin' });
        setIsLoading(false);
        return demoSession;
      } else {
        setIsLoading(false);
        throw new Error('Invalid credentials. Use admin@stylezone.com / admin123');
      }
    }

    setIsLoading(false);
    throw new Error('Supabase Auth is not configured and demo login is disabled.');
  };

  const logout = async () => {
    setIsLoading(true);
    localStorage.removeItem('sz_admin_session');
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('Error during Supabase sign out:', err);
      }
    }
    setUser(null);
    setAdminProfile(null);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        adminProfile,
        isAdmin: Boolean(user && (adminProfile || enableDemoLogin)),
        isLoading,
        login,
        logout,
        enableDemoLogin,
        isSupabaseConfigured
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}


