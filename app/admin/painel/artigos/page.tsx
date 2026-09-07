'use client'

import { ChangeEvent, FormEvent, useRef, useState } from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import { ArrowLeft, Eye, EyeOff, FileText, ImagePlus, Loader2, Pencil, Plus, Trash2 } from 'lucide-react'

type Article = { id: string; title: string; excerpt: string | null; content: string; cover_url: string | null; published: boolean; created_at: string }
const fetcher = async (url: string) => { const response = await fetch(url); if (!response.ok) throw new Error((await response.json()).error || 'Não foi possível carregar os artigos.'); return response.json() as Promise<Article[]> }

export default function ArticlesPage() {
  const { data: articles = [], error, mutate } = useSWR('/api/artigos', fetcher)
  const inputRef = useRef<HTMLInputElement>(null)
  const [editing, setEditing] = useState<Article | null>(null)
  const [open, setOpen] = useState(false)
  const [cover, setCover] = useState<File | null>(null)
  const [preview, setPreview] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')

  const reset = () => { setEditing(null); setCover(null); setPreview(''); setOpen(false) }
  const chooseCover = (event: ChangeEvent<HTMLInputElement>) => { const file = event.target.files?.[0]; if (!file) return; setCover(file); setPreview(URL.createObjectURL(file)); event.target.value = '' }
  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setBusy(true); setMessage('')
    const form = new FormData(event.currentTarget)
    if (cover) form.append('cover', cover)
    if (editing) form.append('id', editing.id)
    const response = await fetch('/api/artigos', { method: editing ? 'PATCH' : 'POST', body: form })
    const result = await response.json()
    if (!response.ok) setMessage(result.error || 'Não foi possível guardar o artigo.')
    else { await mutate(); reset(); setMessage(editing ? 'Artigo atualizado.' : 'Artigo criado como rascunho.') }
    setBusy(false)
  }
  const toggle = async (article: Article) => { const form = new FormData(); form.append('id', article.id); form.append('published', String(!article.published)); const response = await fetch('/api/artigos', { method: 'PATCH', body: form }); if (response.ok) mutate(); else setMessage((await response.json()).error) }
  const remove = async (article: Article) => { if (!window.confirm(`Apagar “${article.title}”?`)) return; const response = await fetch('/api/artigos', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: article.id }) }); if (response.ok) mutate(); else setMessage((await response.json()).error) }

  return <main className="admin-panel-shell"><aside className="admin-sidebar"><Link href="/" className="admin-brand"><span>MV</span><b>ADVOGADO</b></Link><div className="admin-sidebar-label">GESTÃO DO SITE</div><nav className="admin-side-nav"><Link href="/admin/painel/fotos">Fotos</Link><Link className="is-active" href="/admin/painel/artigos">Artigos</Link><Link href="/#contactos">Ver site público</Link></nav><Link className="admin-logout" href="/admin">Sair</Link></aside><section className="admin-content"><header className="admin-topbar"><div><p className="admin-kicker">MV-ADVOGADO</p><h1>PAINEL ADMINISTRATIVO</h1></div><div className="admin-avatar">C</div></header><div className="admin-welcome"><p>Publicações</p><span>Escreva e organize os artigos do website institucional.</span></div><div className="admin-actions"><button type="button" onClick={() => { setEditing(null); setOpen(true) }}><Plus /> Novo Artigo</button><Link className="admin-secondary-link" href="/admin/painel/fotos"><ImagePlus /> Gerir Fotos</Link></div>{message && <p role="status" className="admin-feedback">{message}</p>}{error && <p role="alert" className="admin-feedback">{error.message}</p>}
  {open && <form className="admin-editor" onSubmit={save}><div className="admin-section-heading"><div><p className="admin-kicker">EDITOR</p><h2>{editing ? 'Editar artigo' : 'Novo artigo'}</h2></div><button type="button" className="admin-text-button" onClick={reset}>Cancelar</button></div><label>Título<input name="title" defaultValue={editing?.title ?? ''} required /></label><label>Resumo<textarea name="excerpt" defaultValue={editing?.excerpt ?? ''} rows={2} /></label><label>Conteúdo<textarea name="content" defaultValue={editing?.content ?? ''} rows={9} required /></label><div className="admin-cover-picker"><input ref={inputRef} hidden type="file" accept="image/jpeg,image/png,image/webp" onChange={chooseCover} /><button type="button" onClick={() => inputRef.current?.click()}><ImagePlus /> {cover ? 'Trocar capa' : 'Adicionar capa'}</button>{(preview || editing?.cover_url) && <img src={preview || editing?.cover_url || ''} alt="Pré-visualização da capa" />}</div><button type="submit" disabled={busy}>{busy ? <Loader2 className="animate-spin" /> : <FileText />} {busy ? 'A guardar...' : 'Guardar artigo'}</button></form>}
  <section className="admin-section"><div className="admin-section-heading"><div><p className="admin-kicker">PUBLICAÇÕES</p><h2>Artigos</h2></div><span>{articles.length} itens</span></div><div className="admin-list">{articles.map((article) => <article className="admin-list-item" key={article.id}>{article.cover_url && <img className="admin-photo-thumb" src={article.cover_url} alt="" />}<div className="admin-item-copy"><h3>{article.title}</h3><p>{article.excerpt || article.content.slice(0, 90)} · {article.published ? 'Publicado' : 'Rascunho'}</p></div><div className="admin-item-actions"><button type="button" onClick={() => toggle(article)} aria-label={article.published ? 'Despublicar artigo' : 'Publicar artigo'}>{article.published ? <EyeOff /> : <Eye />}</button><button type="button" onClick={() => { setEditing(article); setOpen(true); setPreview('') }} aria-label="Editar artigo"><Pencil /></button><button type="button" onClick={() => remove(article)} aria-label="Apagar artigo"><Trash2 /></button></div></article>)}</div></section></section></main>
}
