import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { AdminContentManager } from '@/components/admin-content-manager'

export default function AdminPhotosPage() {
  return (
    <main className="admin-panel-shell">
      <aside className="admin-sidebar">
        <Link href="/" className="admin-brand"><span>MV</span><b>ADVOGADO</b></Link>
        <div className="admin-sidebar-label">GESTÃO DO SITE</div>
        <nav className="admin-side-nav"><Link className="is-active" href="/admin/painel/fotos">Fotos</Link><Link href="/admin/painel/artigos">Artigos</Link><Link href="/#contactos">Ver site público</Link></nav>
        <Link className="admin-logout" href="/admin">Sair</Link>
      </aside>
      <section className="admin-content">
        <header className="admin-topbar"><div><p className="admin-kicker">BIBLIOTECA VISUAL</p><h1>FOTOS</h1></div><div className="admin-avatar">C</div></header>
        <div className="admin-welcome"><p>Gestão de fotos</p><span>Adicione e organize as imagens do website institucional.</span></div>
        <AdminContentManager kind="photos" />
        <Link className="admin-back" href="/admin/painel"><ArrowLeft /> Voltar ao painel</Link>
      </section>
    </main>
  )
}
