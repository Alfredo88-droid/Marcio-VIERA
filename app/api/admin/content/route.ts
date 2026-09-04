import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const tableFor = (type: string) => type === 'photos' ? 'photos' : type === 'articles' ? 'articles' : null

export async function GET(request: Request) {
  const type = new URL(request.url).searchParams.get('type') ?? ''
  const table = tableFor(type)
  if (!table) return NextResponse.json({ error: 'Tipo inválido' }, { status: 400 })
  const supabase = await createClient()
  const { data, error } = await supabase.from(table).select('*').order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data ?? [])
}

export async function POST(request: Request) {
  const body = await request.json()
  const table = tableFor(body.type)
  if (!table) return NextResponse.json({ error: 'Tipo inválido' }, { status: 400 })
  const supabase = await createClient()
  const payload = { ...body, type: undefined, id: undefined }
  delete payload.type
  delete payload.id
  const { data, error } = await supabase.from(table).insert(payload).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function PATCH(request: Request) {
  const body = await request.json()
  const table = tableFor(body.type)
  if (!table || !body.id) return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 })
  const supabase = await createClient()
  const payload = { ...body, type: undefined, id: undefined }
  delete payload.type
  delete payload.id
  const { data, error } = await supabase.from(table).update(payload).eq('id', body.id).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(request: Request) {
  const body = await request.json()
  const table = tableFor(body.type)
  if (!table || !body.id) return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 })
  const supabase = await createClient()
  const { error } = await supabase.from(table).delete().eq('id', body.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
