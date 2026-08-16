import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://klempbsbqovcoywbdygd.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsZW1wYnNicW92Y295d2JkeWdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3MDc0NjMsImV4cCI6MjA5NTI4MzQ2M30.fcF8s9EEHXj8owAS3JGNr9isaRw3koFvc39BKschtxg';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
