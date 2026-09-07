'use client'

import { ChangeEvent, useRef, useState } from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import { ImagePlus, FileText, Pencil, Trash2, LogOut, ExternalLink, Eye, EyeOff, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const BUCKET = 'fotos'

type Photo = { id: string; title: string; detail: string | null; image_url: string; published: boolean; created_at: string }

async function loadPhotos() {
  if (typeof window === 'undefined') return []
  const supabase = createClient()
  const { data, error } = await supabase.from('photos').select('id,title,detail,image_url,published,created_at').order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []) as Photo[]
}

export default function AdminPanelPage() {
  const inputRef = useRef<HTMLInputElement>(null)
  const { data: photos = [], error, mutate } = useSWR('admin-photos', loadPhotos)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')

  const uploadPhoto = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    if (!file.type.startsWith('image/')) return setMessage('Selecione um ficheiro de imagem válido.')
    if (file.size > 10 * 1024 * 1024) return setMessage('A imagem deve ter no máximo 10 MB.')

    setBusy(true); setMessage('')
    try {
      const supabase = createClient()
      const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
      const path = `${crypto.randomUUID()}.${extension}`
      const upload = await supabase.storage.from(BUCKET).upload(path, file, { contentType: file.type, upsert: false })
      if (upload.error) throw upload.error
      const { data: publicFile } = supabase.storage.from(BUCKET).getPublicUrl(path)
      const { error: insertError } = await supabase.from('photos').insert({ title: file.name.replace(/\.[^/.]+$/, ''), detail: 'Fotografia da biblioteca visual', image_url: publicFile.publicUrl, published: true, storage_path: path })
      if (insertError) {
        await supabase.storage.from(BUCKET).remove([path])
        throw insertError
      }
      await mutate()
      setMessage('Foto carregada e publicada com sucesso.')
    } catch (uploadError) {
      setMessage(uploadError instanceof Error ? uploadError.message : 'Não foi possível carregar a foto.')
    } finally { setBusy(false) }
  }

  const togglePublished = async (photo: Photo) => {
    const supabase = createClient()
    const { error: updateError } = await supabase.from('photos').update({ published: !photo.published }).eq('id', photo.id)
    if (updateError) return setMessage(updateError.message)
    await mutate()
  }

  const removePhoto = async (photo: Photo) => {
    if (!window.confirm(`Apagar “${photo.title}”?`)) return
    setBusy(true)
    const supabase = createClient()
    const { error: deleteError } = await supabase.from('photos').delete().eq('id', photo.id)
    if (deleteError) setMessage(deleteError.message)
    else { await mutate(); setMessage('Foto apagada.') }
    setBusy(false)
  }

  return <main className="admin-panel-shell">
    <aside className="admin-sidebar"><Link href="/" className="admin-brand"><span>MV</span><b>ADVOGADO</b></Link><div className="admin-sidebar-label">GESTÃO DO SITE</div><nav className="admin-side-nav"><a className="is-active" href="#fotos">Fotos</a><a href="#artigos">Artigos</a><a href="/#contactos">Ver site público <ExternalLink /></a></nav><Link className="admin-logout" href="/admin"><LogOut /> Sair</Link></aside>
    <section className="admin-content"><header className="admin-topbar"><div><p className="admin-kicker">MV-ADVOGADO</p><h1>PAINEL ADMINISTRATIVO</h1></div><div className="admin-avatar">C</div></header><div className="admin-welcome"><p>Olá, Cliente</p><span>Gerencie os conteúdos que aparecem no website institucional.</span></div>
      <div className="admin-actions"><input ref={inputRef} type="file" accept="image/*" onChange={uploadPhoto} hidden /><button type="button" onClick={() => inputRef.current?.click()} disabled={busy}>{busy ? <Loader2 className="animate-spin" /> : <ImagePlus />} {busy ? 'A carregar...' : 'Adicionar Foto'}</button><button type="button"><FileText /> Criar Artigo</button></div>
      {message && <p role="status" className="admin-feedback">{message}</p>}{error && <p role="alert" className="admin-feedback">Não foi possível carregar o conteúdo. Verifique as permissões da tabela photos.</p>}
      <section id="fotos" className="admin-section"><div className="admin-section-heading"><div><p className="admin-kicker">BIBLIOTECA VISUAL</p><h2>Fotos</h2></div><span>{photos.length} itens</span></div><div className="admin-list">{photos.map((photo) => <article className="admin-list-item" key={photo.id}><img className="admin-photo-thumb" src={photo.image_url} alt="" /><div className="admin-item-copy"><h3>{photo.title}</h3><p>{photo.detail ?? 'Fotografia da biblioteca visual'} · {photo.published ? 'Publicado' : 'Rascunho'}</p></div><div className="admin-item-actions"><button type="button" onClick={() => togglePublished(photo)} aria-label={photo.published ? `Despublicar ${photo.title}` : `Publicar ${photo.title}`}>{photo.published ? <EyeOff /> : <Eye />}</button><button type="button" onClick={() => removePhoto(photo)} aria-label={`Apagar ${photo.title}`}><Trash2 /></button></div></article>)}</div></section>
      <section id="artigos" className="admin-section"><div className="admin-section-heading"><div><p className="admin-kicker">PUBLICAÇÕES</p><h2>Artigos</h2></div><span>0 itens</span></div></section>
    </section>
  </main>
}
