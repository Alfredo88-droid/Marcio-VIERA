import { createClient } from '@supabase/supabase-js'

export function createServerClient() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Supabase server configuration is missing.')
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } })
}

export const PHOTO_TABLE = 'fotos'
export const PHOTO_BUCKET = 'fotos'

type PhotoRow = { id: string; title: string; detail: string | null; image_url: string; published: boolean; created_at: string; storage_path?: string | null }

export async function listPhotos() {
  const supabase = createServerClient()
  const { data, error } = await supabase.from(PHOTO_TABLE).select('id,title,detail,image_url,published,created_at,storage_path').order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []) as PhotoRow[]
}

export async function uploadPhoto(file: File, title: string) {
  const supabase = createServerClient()
  const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const path = `${crypto.randomUUID()}.${extension}`
  const bytes = Buffer.from(await file.arrayBuffer())
  const upload = await supabase.storage.from(PHOTO_BUCKET).upload(path, bytes, { contentType: file.type, upsert: false })
  if (upload.error) throw upload.error
  const { data: publicFile } = supabase.storage.from(PHOTO_BUCKET).getPublicUrl(path)
  const { data, error } = await supabase.from(PHOTO_TABLE).insert({ title, detail: 'Fotografia da biblioteca visual', image_url: publicFile.publicUrl, published: true, storage_path: path }).select('id,title,detail,image_url,published,created_at,storage_path').single()
  if (error) { await supabase.storage.from(PHOTO_BUCKET).remove([path]); throw error }
  return data
}

export async function deletePhoto(id: string) {
  const supabase = createServerClient()
  const { data: photo, error: readError } = await supabase.from(PHOTO_TABLE).select('storage_path').eq('id', id).single()
  if (readError) throw readError
  const { error } = await supabase.from(PHOTO_TABLE).delete().eq('id', id)
  if (error) throw error
  if (photo?.storage_path) await supabase.storage.from(PHOTO_BUCKET).remove([photo.storage_path])
}
