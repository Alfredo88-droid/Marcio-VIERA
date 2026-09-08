'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, LockKeyhole } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function AdminLoginPage() {
  const router = useRouter(); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState(''); const [busy, setBusy] = useState(false)
  async function submit(event: React.FormEvent) { event.preventDefault(); setBusy(true); setError(''); const { error } = await createClient().auth.signInWithPassword({ email, password }); if (error) setError('Email ou senha inválidos.'); else router.push('/admin/painel'); setBusy(false) }
  return <main className="admin-shell"><div className="admin-login-card"><Link className="admin-back" href="/"><ArrowLeft /> Voltar ao site</Link><div className="admin-brand"><span>MV</span><b>ADVOGADO</b></div><p className="admin-kicker">ÁREA RESERVADA</p><h1>Acesso administrativo</h1><p className="admin-intro">Entre para gerir fotos e artigos do seu escritório.</p><form className="admin-form" onSubmit={submit}><label htmlFor="email">Email<input id="email" value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="seu@email.com" autoComplete="email" required /></label><label htmlFor="password">Senha<input id="password" value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="••••••••" autoComplete="current-password" required /></label>{error && <p className="admin-error">{error}</p>}<button className="admin-submit" disabled={busy} type="submit"><LockKeyhole /> {busy ? 'A entrar...' : 'ENTRAR'}</button></form></div></main>
}
