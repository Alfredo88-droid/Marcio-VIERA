'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminDashboard from './AdminDashboard'
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client'

export default function AdminPage() {
  const router = useRouter(); const [email, setEmail] = useState<string | null>(null)
  useEffect(() => { if (!isSupabaseConfigured()) { router.replace('/admin/login'); return }; createClient().auth.getUser().then(({ data }) => { if (!data.user) router.replace('/admin/login'); else setEmail(data.user.email ?? 'Utilizador') }) }, [router])
  if (!email) return <main className="admin-loading">A carregar o painel...</main>
  return <AdminDashboard userEmail={email} />
}
