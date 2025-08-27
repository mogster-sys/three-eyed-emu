import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, isSupabaseAvailable } from '@/integrations/supabase/client';
import { Database } from '@/lib/types';
import { authRateLimiter } from '@/utils/rateLimiter';
import { emailSchema, passwordSchema, validateAndSanitize } from '@/utils/validation';

type UserProfile = Database['public']['Tables']['users']['Row'];

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Frontend-only mode: skip auth when Supabase unavailable
    if (!isSupabaseAvailable || !supabase) {
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    if (!supabase) return;
    
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    if (!supabase) throw new Error('Supabase not available - connect backend to enable auth');
    
    if (!authRateLimiter.isAllowed('auth')) {
      throw new Error('Too many attempts. Please try again later.');
    }
    
    const emailValidation = validateAndSanitize(emailSchema, email);
    if (!emailValidation.success) {
      throw new Error(emailValidation.error);
    }
    
    const passwordValidation = validateAndSanitize(passwordSchema, password);
    if (!passwordValidation.success) {
      throw new Error(passwordValidation.error);
    }
    
    const { data, error } = await supabase.auth.signUp({
      email: emailValidation.data!,
      password: passwordValidation.data!,
    });

    if (error) throw error;

    // Create user profile
    if (data.user) {
      await supabase.from('users').insert({
        id: data.user.id,
        email: data.user.email!,
        full_name: fullName,
      });
    }

    return data;
  };

  const signIn = async (email: string, password: string) => {
    if (!supabase) throw new Error('Supabase not available - connect backend to enable auth');
    
    if (!authRateLimiter.isAllowed('auth')) {
      throw new Error('Too many attempts. Please try again later.');
    }
    
    const emailValidation = validateAndSanitize(emailSchema, email);
    if (!emailValidation.success) {
      throw new Error(emailValidation.error);
    }
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailValidation.data!,
      password,
    });

    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    if (!supabase) return;
    
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    isSupabaseAvailable,
  };
};