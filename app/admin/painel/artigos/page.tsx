import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { AdminContentManager } from '@/components/admin-content-manager'

export default function AdminArticlesPage() {
  return (
    <main className="admin-panel-shell">
      <aside className="admin-sidebar">
        <Link href="/" className="admin-brand"><span>MV</span><b>ADVOGADO</b></Link>
        <div className="admin-sidebar-label">GESTÃO DO SITE</div>
        <nav className="admin-side-nav"><Link href="/admin/painel/fotos">Fotos</Link><Link className="is-active" href="/admin/painel/artigos">Artigos</Link><Link href="/#contactos">Ver site público</Link></nav>
        <Link className="admin-logout" href="/admin">Sair</Link>
      </aside>
      <section className="admin-content">
        <header className="admin-topbar"><div><p className="admin-kicker">PUBLICAÇÕES</p><h1>ARTIGOS</h1></div><div className="admin-avatar">C</div></header>
        <div className="admin-welcome"><p>Gestão de artigos</p><span>Crie e organize os conteúdos publicados no website institucional.</span></div>
        <AdminContentManager kind="articles" />
        <Link className="admin-back" href="/admin/painel"><ArrowLeft /> Voltar ao painel</Link>
      </section>
    </main>
  )
}
