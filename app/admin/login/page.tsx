'use client'

import { FormEvent, useState } from 'react'
import { ArrowRight, LockKeyhole, Mail, ShieldCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client'

export default function AdminLoginPage() {
  const router = useRouter()
  const configured = isSupabaseConfigured()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(''); if (!configured) { setError('O acesso Supabase ainda não está configurado neste Preview.'); return }; setLoading(true)
    const { error: signInError } = await createClient().auth.signInWithPassword({ email, password })
    if (signInError) { setError('Email ou palavra-passe inválidos.'); setLoading(false); return }
    router.replace('/admin'); router.refresh()
  }

  return <main className="admin-login-page"><section className="admin-login-card"><div className="admin-login-mark">MV</div><p className="admin-eyebrow">ÁREA RESERVADA</p><h1>Aceda ao seu painel.</h1><p className="admin-login-copy">Entre com o seu email e palavra-passe para gerir artigos e fotografias.</p><form onSubmit={handleSubmit} className="admin-login-form"><label>Email<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" autoComplete="email" /></label><label>Palavra-passe<input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" autoComplete="current-password" /></label>{error && <p className="admin-login-error" role="alert">{error}</p>}<button disabled={loading || !configured} className="admin-primary-button" type="submit">{loading ? 'A entrar...' : 'Entrar no painel'} <ArrowRight aria-hidden="true" /></button></form><div className="admin-login-secure"><ShieldCheck aria-hidden="true" /> Acesso protegido por Supabase Auth</div></section><aside className="admin-login-aside"><LockKeyhole aria-hidden="true" /><p>Conteúdo com a sua assinatura.</p><span>Publique histórias, imagens e novidades num só lugar.</span></aside></main>
}
