'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { FileText, ImagePlus, ExternalLink, LogOut, Pencil, Trash2, Upload, X } from 'lucide-react'

type Article = { id: string; title: string; excerpt: string | null; content: string; created_at: string }
type Photo = { name: string; url: string; path: string }

export default function AdminPanelPage() {
  const supabaseRef = useRef<ReturnType<typeof createClient> | null>(null)
  const getSupabaseClient = () => supabaseRef.current ?? (supabaseRef.current = createClient())
  const fileRef = useRef<HTMLInputElement>(null)
  const [photos, setPhotos] = useState<Photo[]>([])
  const [articles, setArticles] = useState<Article[]>([])
  const [userEmail, setUserEmail] = useState('Administrador')
  const [modal, setModal] = useState<'photo' | 'article' | null>(null)
  const [editing, setEditing] = useState<Article | null>(null)
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')

  async function loadLibrary() {
    const [{ data: files }, { data: rows }, { data: auth }] = await Promise.all([
      getSupabaseClient().storage.from('site-library').list('photos', { sortBy: { column: 'created_at', order: 'desc' } }),
      getSupabaseClient().from('library_articles').select('id,title,excerpt,content,created_at').order('created_at', { ascending: false }),
      getSupabaseClient().auth.getUser(),
    ])
    if (auth.user?.email) setUserEmail(auth.user.email)
    if (files) setPhotos(files.filter((file) => file.name !== '.emptyFolderPlaceholder').map((file) => {
      const path = `photos/${file.name}`
      return { name: file.name, path, url: getSupabaseClient().storage.from('site-library').getPublicUrl(path).data.publicUrl }
    }))
    if (rows) setArticles(rows)
  }

  useEffect(() => { loadLibrary() }, [])

  async function uploadPhotos(files: FileList | null) {
    if (!files?.length) return
    setBusy(true); setMessage('')
    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/') || file.size > 8 * 1024 * 1024) continue
      const path = `photos/${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '-')}`
      const { error } = await getSupabaseClient().storage.from('site-library').upload(path, file, { upsert: false })
      if (error) setMessage(error.message)
    }
    await loadLibrary(); setBusy(false); setModal(null)
  }

  async function saveArticle(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setMessage('')
    const payload = { title: title.trim(), excerpt: excerpt.trim() || null, content: content.trim() }
    const result = editing ? await getSupabaseClient().from('library_articles').update(payload).eq('id', editing.id) : await getSupabaseClient().from('library_articles').insert(payload)
    if (result.error) setMessage(result.error.message); else { await loadLibrary(); closeModal() }
    setBusy(false)
  }

  async function deletePhoto(photo: Photo) { if (!confirm('Apagar esta foto?')) return; await getSupabaseClient().storage.from('site-library').remove([photo.path]); loadLibrary() }
  async function deleteArticle(id: string) { if (!confirm('Apagar este artigo?')) return; await getSupabaseClient().from('library_articles').delete().eq('id', id); loadLibrary() }
  function closeModal() { setModal(null); setEditing(null); setTitle(''); setExcerpt(''); setContent(''); setMessage('') }
  function editArticle(article: Article) { setEditing(article); setTitle(article.title); setExcerpt(article.excerpt ?? ''); setContent(article.content); setModal('article') }

  return <main className="admin-panel-shell">
    <aside className="admin-sidebar"><Link href="/" className="admin-brand"><span>MV</span><b>ADVOGADO</b></Link><div className="admin-sidebar-label">GESTÃO DO SITE</div><nav className="admin-side-nav" aria-label="Biblioteca administrativa"><a className="is-active" href="#fotos" onClick={(event) => { event.preventDefault(); document.getElementById('fotos')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}>Fotos</a><a href="#artigos" onClick={(event) => { event.preventDefault(); document.getElementById('artigos')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}>Artigos</a><Link href="/#contactos">Ver site público <ExternalLink /></Link></nav><button className="admin-logout" onClick={() => getSupabaseClient().auth.signOut()}><LogOut /> Sair</button></aside>
    <section className="admin-content"><header className="admin-topbar"><div><p className="admin-kicker">MV-ADVOGADO</p><h1>PAINEL ADMINISTRATIVO</h1></div><div className="admin-avatar">{userEmail[0]?.toUpperCase()}</div></header><div className="admin-welcome"><p>Olá, {userEmail}</p><span>Escolha arquivos do seu computador e organize o conteúdo do website.</span></div><div className="admin-actions"><button type="button" onClick={() => setModal('photo')}><ImagePlus /> Adicionar Foto</button><button type="button" onClick={() => setModal('article')}><FileText /> Criar Artigo</button></div>
      <section id="fotos" className="admin-section"><div className="admin-section-heading"><div><p className="admin-kicker">BIBLIOTECA VISUAL</p><h2>Fotos</h2></div><span>{photos.length} itens</span></div><div className="admin-list">{photos.map((photo) => <article className="admin-list-item" key={photo.path}><img className="admin-photo-thumb" src={photo.url} alt={photo.name} /><div className="admin-item-copy"><h3>{photo.name}</h3><p>Imagem enviada para a biblioteca</p></div><div className="admin-item-actions"><button type="button" aria-label={`Apagar ${photo.name}`} onClick={() => deletePhoto(photo)}><Trash2 /></button></div></article>)}{!photos.length && <p className="admin-empty">Ainda não há fotos. Adicione a primeira usando o seletor do computador.</p>}</div></section>
      <section id="artigos" className="admin-section"><div className="admin-section-heading"><div><p className="admin-kicker">PUBLICAÇÕES</p><h2>Artigos</h2></div><span>{articles.length} itens</span></div><div className="admin-list">{articles.map((article) => <article className="admin-list-item" key={article.id}><div className="admin-item-icon"><FileText /></div><div className="admin-item-copy"><h3>{article.title}</h3><p>{article.excerpt || 'Artigo guardado na biblioteca'}</p></div><div className="admin-item-actions"><button type="button" aria-label={`Editar ${article.title}`} onClick={() => editArticle(article)}><Pencil /></button><button type="button" aria-label={`Apagar ${article.title}`} onClick={() => deleteArticle(article.id)}><Trash2 /></button></div></article>)}{!articles.length && <p className="admin-empty">Ainda não há artigos. Crie o primeiro no editor.</p>}</div></section>
    </section>
    {modal && <div className="admin-modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && closeModal()}><div className="admin-modal"><button className="admin-modal-close" onClick={closeModal} aria-label="Fechar"><X /></button>{modal === 'photo' ? <><p className="admin-kicker">BIBLIOTECA VISUAL</p><h2>Adicionar fotos</h2><p className="admin-modal-copy">Selecione uma ou várias imagens do computador. PNG, JPG e WEBP até 8 MB.</p><button className="admin-upload-zone" onClick={() => fileRef.current?.click()} disabled={busy}><Upload /><span>{busy ? 'Enviando...' : 'Escolher fotos do computador'}</span></button><input ref={fileRef} hidden type="file" accept="image/png,image/jpeg,image/webp" multiple onChange={(event) => uploadPhotos(event.target.files)} /></> : <form className="admin-form" onSubmit={saveArticle}><p className="admin-kicker">PUBLICAÇÕES</p><h2>{editing ? 'Editar artigo' : 'Criar artigo'}</h2><label htmlFor="article-title">Título<input id="article-title" value={title} onChange={(event) => setTitle(event.target.value)} required /></label><label htmlFor="article-excerpt">Resumo<input id="article-excerpt" value={excerpt} onChange={(event) => setExcerpt(event.target.value)} /></label><label htmlFor="article-content">Texto<textarea id="article-content" rows={8} value={content} onChange={(event) => setContent(event.target.value)} required /></label><button className="admin-submit" disabled={busy} type="submit">{busy ? 'A guardar...' : 'Guardar artigo'}</button></form>}{message && <p className="admin-error">{message}</p>}</div></div>}
  </main>
}
