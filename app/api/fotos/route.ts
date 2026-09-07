import { NextResponse } from 'next/server'
import { deletePhoto, listPhotos, uploadPhoto, createServerClient, PHOTO_TABLE } from '@/lib/supabase/server'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const publishedOnly = url.searchParams.get('published') === 'true'
    const photos = await listPhotos()
    return NextResponse.json(publishedOnly ? photos.filter((photo) => photo.published) : photos)
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Não foi possível carregar as fotos.' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')
    if (!(file instanceof File)) return NextResponse.json({ error: 'Selecione uma imagem.' }, { status: 400 })
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) return NextResponse.json({ error: 'Use JPG, JPEG, PNG ou WEBP.' }, { status: 400 })
    if (file.size > 10 * 1024 * 1024) return NextResponse.json({ error: 'A imagem deve ter no máximo 10 MB.' }, { status: 400 })
    const title = String(formData.get('title') || file.name.replace(/\.[^/.]+$/, ''))
    return NextResponse.json(await uploadPhoto(file, title), { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Não foi possível carregar a foto.' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, published } = await request.json()
    const supabase = createServerClient()
    const { error } = await supabase.from(PHOTO_TABLE).update({ published: Boolean(published) }).eq('id', id)
    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Não foi possível atualizar a foto.' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    await deletePhoto(id)
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Não foi possível apagar a foto.' }, { status: 500 })
  }
}
