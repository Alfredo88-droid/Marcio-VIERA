import { NextResponse } from 'next/server'
import { createServerClient, PHOTO_BUCKET } from '@/lib/supabase/server'

const TABLE = 'artigos'
const fields = 'id,title,excerpt,content,cover_url,cover_path,published,created_at,updated_at'

function message(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback
}

export async function GET() {
  try {
    const { data, error } = await createServerClient().from(TABLE).select(fields).order('created_at', { ascending: false })
    if (error) throw error
    return NextResponse.json(data ?? [])
  } catch (error) {
    return NextResponse.json({ error: message(error, 'Não foi possível carregar os artigos.') }, { status: 500 })
  }
}

export async function POST(request: Request) {
  let coverPath: string | null = null
  try {
    const form = await request.formData()
    const title = String(form.get('title') || '').trim()
    const excerpt = String(form.get('excerpt') || '').trim()
    const content = String(form.get('content') || '').trim()
    const file = form.get('cover')
    if (!title || !content) return NextResponse.json({ error: 'Título e conteúdo são obrigatórios.' }, { status: 400 })
    const supabase = createServerClient()
    let coverUrl: string | null = null
    if (file instanceof File && file.size > 0) {
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) return NextResponse.json({ error: 'A capa deve ser JPG, PNG ou WEBP.' }, { status: 400 })
      if (file.size > 10 * 1024 * 1024) return NextResponse.json({ error: 'A capa deve ter no máximo 10 MB.' }, { status: 400 })
      const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
      coverPath = `artigos/${crypto.randomUUID()}.${extension}`
      const upload = await supabase.storage.from(PHOTO_BUCKET).upload(coverPath, Buffer.from(await file.arrayBuffer()), { contentType: file.type, upsert: false })
      if (upload.error) throw upload.error
      coverUrl = supabase.storage.from(PHOTO_BUCKET).getPublicUrl(coverPath).data.publicUrl
    }
    const { data, error } = await supabase.from(TABLE).insert({ title, excerpt: excerpt || null, content, cover_url: coverUrl, cover_path: coverPath, published: false }).select(fields).single()
    if (error) throw error
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    if (coverPath) await createServerClient().storage.from(PHOTO_BUCKET).remove([coverPath])
    return NextResponse.json({ error: message(error, 'Não foi possível criar o artigo.') }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const form = await request.formData()
    const id = String(form.get('id') || '')
    if (!id) return NextResponse.json({ error: 'Artigo inválido.' }, { status: 400 })
    const supabase = createServerClient()
    const values: Record<string, string | boolean | null> = {}
    for (const key of ['title', 'excerpt', 'content']) if (form.has(key)) values[key] = String(form.get(key) || '').trim() || null
    if (form.has('published')) values.published = form.get('published') === 'true'
    const file = form.get('cover')
    let newPath: string | null = null
    if (file instanceof File && file.size > 0) {
      const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
      newPath = `artigos/${crypto.randomUUID()}.${extension}`
      const upload = await supabase.storage.from(PHOTO_BUCKET).upload(newPath, Buffer.from(await file.arrayBuffer()), { contentType: file.type, upsert: false })
      if (upload.error) throw upload.error
      values.cover_path = newPath
      values.cover_url = supabase.storage.from(PHOTO_BUCKET).getPublicUrl(newPath).data.publicUrl
    }
    const { data, error } = await supabase.from(TABLE).update(values).eq('id', id).select(fields).single()
    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: message(error, 'Não foi possível atualizar o artigo.') }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    const supabase = createServerClient()
    const { data: article, error: readError } = await supabase.from(TABLE).select('cover_path').eq('id', id).single()
    if (readError) throw readError
    const { error } = await supabase.from(TABLE).delete().eq('id', id)
    if (error) throw error
    if (article?.cover_path) await supabase.storage.from(PHOTO_BUCKET).remove([article.cover_path])
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: message(error, 'Não foi possível apagar o artigo.') }, { status: 500 })
  }
}
