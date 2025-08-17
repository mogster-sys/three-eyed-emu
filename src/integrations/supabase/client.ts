import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Frontend-only mode: create a mock client when env vars are missing
const SUPABASE_AVAILABLE = !!(supabaseUrl && supabaseAnonKey);

export const supabase = SUPABASE_AVAILABLE 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null; // Will be handled gracefully by hooks

export const isSupabaseAvailable = SUPABASE_AVAILABLE;