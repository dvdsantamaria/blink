import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

// Check if credentials are configured
const hasCredentials = supabaseUrl && supabaseServiceKey;

if (!hasCredentials) {
  console.warn('⚠️  Supabase credentials not configured. Some features will be limited.');
}

// Client with service role for admin operations (bypasses RLS)
export const supabaseAdmin = hasCredentials 
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null as any; // Type assertion for development

// Client with anon key for public operations
export const supabaseClient = hasCredentials
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null as any;
