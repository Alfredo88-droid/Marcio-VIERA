import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://excmuboxxqijodnbtigo.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_9dZL4CT5GYVPPAaB6jjmUQ_Ehaax6oT'

export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseKey)
}
