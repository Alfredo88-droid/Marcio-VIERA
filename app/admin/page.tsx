import Link from 'next/link'
import { ArrowLeft, LockKeyhole } from 'lucide-react'

export default function AdminLoginPage() {
  return (
    <main className="admin-shell">
      <div className="admin-login-card">
        <Link className="admin-back" href="/"><ArrowLeft /> Voltar ao site</Link>
        <div className="admin-brand"><span>MV</span><b>ADVOGADO</b></div>
        <p className="admin-kicker">ÁREA RESERVADA</p>
        <h1>Acesso administrativo</h1>
        <p className="admin-intro">Entre para gerir os conteúdos institucionais do seu escritório.</p>
        <form className="admin-form" action="/admin/painel">
          <label htmlFor="email">Email<input id="email" name="email" type="email" placeholder="seu@email.com" autoComplete="email" required /></label>
          <label htmlFor="password">Senha<input id="password" name="password" type="password" placeholder="••••••••" autoComplete="current-password" required /></label>
          <button className="admin-submit" type="submit"><LockKeyhole /> ENTRAR</button>
        </form>
        <p className="admin-note">A autenticação será conectada ao Supabase Auth numa próxima etapa.</p>
      </div>
    </main>
  )
}
