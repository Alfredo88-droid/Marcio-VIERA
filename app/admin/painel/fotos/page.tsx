import Link from 'next/link'
import { ArrowLeft, ImagePlus } from 'lucide-react'

export default function AdminPhotosPage() {
  return (
    <main className="admin-panel-shell">
      <aside className="admin-sidebar">
        <Link href="/" className="admin-brand"><span>MV</span><b>ADVOGADO</b></Link>
        <div className="admin-sidebar-label">GESTÃO DO SITE</div>
        <nav className="admin-side-nav"><Link className="is-active" href="/admin/painel/fotos">Fotos</Link><Link href="/admin/painel/artigos">Artigos</Link><a href="/#contactos">Ver site público</a></nav>
        <Link className="admin-logout" href="/admin/painel"><ArrowLeft /> Voltar ao painel</Link>
      </aside>
      <section className="admin-content">
        <header className="admin-topbar"><div><p className="admin-kicker">BIBLIOTECA VISUAL</p><h1>FOTOS</h1></div><div className="admin-avatar">C</div></header>
        <div className="admin-welcome"><p>Gestão de fotos</p><span>Esta área está pronta para receber o upload e a organização das imagens do site.</span></div>
        <div className="admin-actions"><button type="button"><ImagePlus /> Adicionar Foto</button></div>
        <section className="admin-section admin-empty-state"><ImagePlus /><h2>Biblioteca de fotos</h2><p>O upload de imagens será conectado ao Supabase nesta área.</p></section>
      </section>
    </main>
  )
}
