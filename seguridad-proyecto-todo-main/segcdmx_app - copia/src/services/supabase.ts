
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tqyvulccumldowaxzjiq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxeXZ1bGNjdW1sZG93YXh6amlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNjU3OTcsImV4cCI6MjA3Nzg0MTc5N30.EVkzBTbJCYMSonCHC4TkVqpyxnC302cZAm17DmG7_UE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
