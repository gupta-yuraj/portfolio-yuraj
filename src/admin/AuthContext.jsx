import { createContext, useContext, useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || "";

const AuthContext = createContext(null);

/*
  Single-admin auth: the login screen only ever asks for a password.
  Under the hood it still uses Supabase Auth (secure, hashed, real
  sessions) — it just always signs in with the fixed VITE_ADMIN_EMAIL,
  so there's nothing extra for the one admin to remember or type.
*/
export function AdminAuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const signIn = async (password) => {
    if (!isSupabaseConfigured) throw new Error("Supabase is not configured. Add your credentials to .env first.");
    if (!ADMIN_EMAIL) throw new Error("VITE_ADMIN_EMAIL is not set — see .env.example.");
    const { data, error } = await supabase.auth.signInWithPassword({ email: ADMIN_EMAIL, password });
    if (error) throw error;
    setSession(data.session);
    return data.session;
  };

  const signOut = async () => {
    if (!isSupabaseConfigured) return;
    await supabase.auth.signOut();
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ session, loading, configured: isSupabaseConfigured, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
