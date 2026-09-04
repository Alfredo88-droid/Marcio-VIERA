'use client'

import { useEffect, useState } from 'react'
import { Pencil, Plus, Save, Trash2, Upload, X } from 'lucide-react'

type Kind = 'photos' | 'articles'
type Item = { id?: string; title: string; description?: string; content?: string; image_url?: string; published?: boolean }

export function AdminContentManager({ kind }: { kind: Kind }) {
  const isPhoto = kind === 'photos'
  const [items, setItems] = useState<Item[]>([])
  const [editing, setEditing] = useState<Item | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const readResponse = async (response: Response) => {
    const text = await response.text()
    if (!text.trim()) return {}
    try { return JSON.parse(text) } catch { return { error: 'Resposta inválida do servidor.' } }
  }

  const load = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/content?type=${kind}`, { cache: 'no-store' })
      const data = await readResponse(response)
      if (!response.ok) setError(data.error ?? 'Não foi possível carregar o conteúdo.')
      else setItems(Array.isArray(data) ? data : [])
    } catch {
      setError('Não foi possível ligar ao servidor.')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => { void load() }, [kind])

  const save = async () => {
    if (!editing?.title.trim()) return setError('Preencha o título.')
    setError('')
    const method = editing.id ? 'PATCH' : 'POST'
    const response = await fetch('/api/admin/content', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...editing, type: kind }) })
    const data = await readResponse(response)
    if (!response.ok) return setError(data.error ?? 'Não foi possível guardar.')
    setEditing(null)
    void load()
  }

  const remove = async (id: string) => {
    if (!window.confirm('Excluir este conteúdo?')) return
    const response = await fetch('/api/admin/content', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: kind, id }) })
    if (!response.ok) setError('Não foi possível excluir.')
    else void load()
  }

  return <div className="admin-manager">
    <div className="admin-manager-toolbar"><p>{loading ? 'A carregar…' : `${items.length} ${isPhoto ? 'fotos' : 'artigos'}`}</p><button className="admin-primary" onClick={() => setEditing({ title: '', published: false })}><Plus /> {isPhoto ? 'Adicionar foto' : 'Criar artigo'}</button></div>
    {error && <p className="admin-error" role="alert">{error}</p>}
    {editing && <div className="admin-editor"><div className="admin-editor-heading"><h2>{editing.id ? 'Editar' : 'Novo'} {isPhoto ? 'foto' : 'artigo'}</h2><button onClick={() => setEditing(null)} aria-label="Fechar"><X /></button></div><label>Título<input value={editing.title} onChange={(event) => setEditing({ ...editing, title: event.target.value })} /></label>{isPhoto ? <><label>URL da imagem<input placeholder="https://…" value={editing.image_url ?? ''} onChange={(event) => setEditing({ ...editing, image_url: event.target.value })} /></label><p className="admin-help"><Upload /> Cole a URL pública da imagem armazenada no Supabase Storage.</p><label>Descrição<input value={editing.description ?? ''} onChange={(event) => setEditing({ ...editing, description: event.target.value })} /></label></> : <label>Conteúdo<textarea rows={8} value={editing.content ?? ''} onChange={(event) => setEditing({ ...editing, content: event.target.value })} /></label>}<label className="admin-check"><input type="checkbox" checked={editing.published ?? false} onChange={(event) => setEditing({ ...editing, published: event.target.checked })} /> Publicar no site</label><button className="admin-primary" onClick={save}><Save /> Guardar</button></div>}
    <div className="admin-list">{items.map((item) => <article className="admin-list-item" key={item.id}><div className="admin-item-copy"><h3>{item.title}</h3><p>{isPhoto ? item.description || 'Sem descrição' : item.published ? 'Publicado' : 'Rascunho'}</p></div><div className="admin-item-actions"><button onClick={() => setEditing(item)} aria-label={`Editar ${item.title}`}><Pencil /></button><button onClick={() => item.id && remove(item.id)} aria-label={`Apagar ${item.title}`}><Trash2 /></button></div></article>)}</div>
  </div>
}
