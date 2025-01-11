import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(`
    Error: Missing Supabase environment variables
    Make sure you have both NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
    defined in your .env file.
  `);
}

export const supabase = createClient<Database>(
  supabaseUrl || 'https://iwninyfrcerymkrcactj.supabase.co',
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3bmlueWZyY2VyeW1rcmNhY3RqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2MTUzMTQsImV4cCI6MjA1MjE5MTMxNH0.s0JpqwcaF2Q-j19TrOBB8qdkpDCDrNoaMG_NMNaU3sg',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
); 