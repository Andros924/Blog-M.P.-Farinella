import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are missing. Some features may not work properly.');
  
  // Create a mock client for development/demo purposes
  const mockClient = {
    auth: {
      signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      signOut: () => Promise.resolve({ error: null }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          order: () => ({
            limit: () => Promise.resolve({ data: [], error: null }),
            single: () => Promise.resolve({ data: null, error: { message: 'No data available' } })
          }),
          single: () => Promise.resolve({ data: null, error: { message: 'No data available' } })
        }),
        order: () => ({
          limit: () => Promise.resolve({ data: [], error: null })
        }),
        limit: () => Promise.resolve({ data: [], error: null })
      }),
      insert: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      update: () => ({
        eq: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } })
      }),
      delete: () => ({
        eq: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } })
      })
    })
  };
  
  export const supabase = mockClient as any;
} else {
  export const supabase = createClient(supabaseUrl, supabaseAnonKey);
}

// Auth helpers
export const signIn = async (email: string, password: string) => {
  if (!supabaseUrl || !supabaseAnonKey) {
    return { data: null, error: { message: 'Supabase not configured. Please set up your environment variables.' } };
  }
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    return { error: null };
  }
  
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    return { user: null, error: { message: 'Supabase not configured' } };
  }
  
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};