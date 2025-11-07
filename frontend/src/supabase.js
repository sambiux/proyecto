import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://szcyvbhsxsgfnvpnotse.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6Y3l2YmhzeHNnZm52cG5vdHNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0NjIwNzUsImV4cCI6MjA3ODAzODA3NX0.DmqW1jGkptwWE6eiX37bF8PQxmlI2BdxOy2qkjhWRJg";
export const supabase = createClient(supabaseUrl, supabaseKey);
