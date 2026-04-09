import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://wpxyteguyifhcmogouis.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'REMOVED_SERVICE_KEY';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'REMOVED_ANON_KEY';

// Check if credentials are configured
const hasCredentials = supabaseUrl && supabaseServiceKey;

if (!hasCredentials) {
  console.warn('⚠️  Supabase credentials not configured. Using mock data.');
}

// Client with service role for admin operations (bypasses RLS)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Client with anon key for public operations
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Test connection
supabaseAdmin.from('categories').select('*', { count: 'exact', head: true })
  .then(({ error }) => {
    if (error) {
      console.error('❌ Supabase connection failed:', error.message);
    } else {
      console.log('✅ Supabase connected successfully');
    }
  });
