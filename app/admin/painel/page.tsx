'use client'

import Link from 'next/link'
import { ImagePlus, FileText, Pencil, Trash2, LogOut, ExternalLink } from 'lucide-react'

const photos = [
  { title: 'Imagem institucional', detail: 'Fotografia do escritório' },
  { title: 'Identidade MV', detail: 'Marca e posicionamento' },
]
const articles = [
  { title: 'Contratos empresariais: o que deve ser analisado antes de assinar?', detail: 'Insight jurídico · Rascunho' },
  { title: 'A importância da assessoria jurídica preventiva', detail: 'Insight jurídico · Rascunho' },
]

export default function AdminPanelPage() {
  return (
    <main className="admin-panel-shell">
      <aside className="admin-sidebar">
        <Link href="/" className="admin-brand"><span>MV</span><b>ADVOGADO</b></Link>
        <div className="admin-sidebar-label">GESTÃO DO SITE</div>
        <nav className="admin-side-nav"><Link className="is-active" href="/admin/painel/fotos">Fotos</Link><Link href="/admin/painel/artigos">Artigos</Link><Link href="/#contactos">Ver site público <ExternalLink /></Link></nav>
        <Link className="admin-logout" href="/admin"><LogOut /> Sair</Link>
      </aside>
      <section className="admin-content">
        <header className="admin-topbar"><div><p className="admin-kicker">MV-ADVOGADO</p><h1>PAINEL ADMINISTRATIVO</h1></div><div className="admin-avatar">C</div></header>
        <div className="admin-welcome"><p>Olá, Cliente</p><span>Gerencie os conteúdos que aparecem no website institucional.</span></div>
        <div className="admin-actions"><button type="button"><ImagePlus /> Adicionar Foto</button><button type="button"><FileText /> Criar Artigo</button></div>
        <section id="fotos" className="admin-section"><div className="admin-section-heading"><div><p className="admin-kicker">BIBLIOTECA VISUAL</p><h2>Fotos</h2></div><span>{photos.length} itens</span></div><div className="admin-list">{photos.map((photo) => <article className="admin-list-item" key={photo.title}><div className="admin-item-icon"><ImagePlus /></div><div className="admin-item-copy"><h3>{photo.title}</h3><p>{photo.detail}</p></div><div className="admin-item-actions"><button type="button" aria-label={`Editar ${photo.title}`}><Pencil /></button><button type="button" aria-label={`Apagar ${photo.title}`}><Trash2 /></button></div></article>)}</div></section>
        <section id="artigos" className="admin-section"><div className="admin-section-heading"><div><p className="admin-kicker">PUBLICAÇÕES</p><h2>Artigos</h2></div><span>{articles.length} itens</span></div><div className="admin-list">{articles.map((article) => <article className="admin-list-item" key={article.title}><div className="admin-item-icon"><FileText /></div><div className="admin-item-copy"><h3>{article.title}</h3><p>{article.detail}</p></div><div className="admin-item-actions"><button type="button" aria-label={`Editar ${article.title}`}><Pencil /></button><button type="button" aria-label={`Apagar ${article.title}`}><Trash2 /></button></div></article>)}</div></section>
      </section>
    </main>
  )
}
