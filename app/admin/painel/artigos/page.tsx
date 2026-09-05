import Link from 'next/link'
import { ArrowLeft, FileText } from 'lucide-react'

export default function AdminArticlesPage() {
  return (
    <main className="admin-panel-shell">
      <aside className="admin-sidebar">
        <Link href="/" className="admin-brand"><span>MV</span><b>ADVOGADO</b></Link>
        <div className="admin-sidebar-label">GESTÃO DO SITE</div>
        <nav className="admin-side-nav"><Link href="/admin/painel/fotos">Fotos</Link><Link className="is-active" href="/admin/painel/artigos">Artigos</Link><a href="/#contactos">Ver site público</a></nav>
        <Link className="admin-logout" href="/admin/painel"><ArrowLeft /> Voltar ao painel</Link>
      </aside>
      <section className="admin-content">
        <header className="admin-topbar"><div><p className="admin-kicker">PUBLICAÇÕES</p><h1>ARTIGOS</h1></div><div className="admin-avatar">C</div></header>
        <div className="admin-welcome"><p>Gestão de artigos</p><span>Esta área está pronta para receber a criação e publicação dos conteúdos jurídicos.</span></div>
        <div className="admin-actions"><button type="button"><FileText /> Criar Artigo</button></div>
        <section className="admin-section admin-empty-state"><FileText /><h2>Biblioteca de artigos</h2><p>A publicação de artigos será conectada ao Supabase nesta área.</p></section>
      </section>
    </main>
  )
}
