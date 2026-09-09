'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, LockKeyhole } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function AdminLoginPage() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(''); setLoading(true)
    const form = new FormData(event.currentTarget)
    const { error } = await createClient().auth.signInWithPassword({ email: String(form.get('email')), password: String(form.get('password')) })
    if (error) setError('Email ou senha inválidos.')
    else window.location.href = '/admin/painel'
    setLoading(false)
  }
  return <main className="admin-shell"><div className="admin-login-card"><Link className="admin-back" href="/"><ArrowLeft /> Voltar ao site</Link><div className="admin-brand"><span>MV</span><b>ADVOGADO</b></div><p className="admin-kicker">ÁREA RESERVADA</p><h1>Acesso administrativo</h1><p className="admin-intro">Entre para gerir os conteúdos institucionais do seu escritório.</p><form className="admin-form" onSubmit={handleSubmit}><label htmlFor="email">Email<input id="email" name="email" type="email" placeholder="seu@email.com" autoComplete="email" required /></label><label htmlFor="password">Senha<input id="password" name="password" type="password" placeholder="••••••••" autoComplete="current-password" required /></label>{error && <p role="alert" className="form-error">{error}</p>}<button className="admin-submit" type="submit" disabled={loading}><LockKeyhole /> {loading ? 'A ENTRAR...' : 'ENTRAR'}</button></form><p className="admin-note">Acesso protegido pelo Supabase Auth.</p></div></main>
}
