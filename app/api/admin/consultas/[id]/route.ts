import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

const ESTADOS_VALIDOS = ['nuevo', 'contactado', 'en proceso', 'derivado']
const PRIORIDADES_VALIDAS = ['alta', 'media', 'baja']

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()

    const updates: Record<string, string> = {}

    if (typeof body.estado === 'string') {
      if (!ESTADOS_VALIDOS.includes(body.estado)) {
        return NextResponse.json({ error: `Estado inválido: "${body.estado}"` }, { status: 400 })
      }
      updates.estado = body.estado
    }

    if (typeof body.prioridad === 'string') {
      if (!PRIORIDADES_VALIDAS.includes(body.prioridad)) {
        return NextResponse.json({ error: `Prioridad inválida: "${body.prioridad}"` }, { status: 400 })
      }
      updates.prioridad = body.prioridad
    }

    if (typeof body.nota === 'string') {
      updates.nota = body.nota
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'Nada para actualizar' }, { status: 400 })
    }

    const { error } = await supabaseAdmin.from('consultas').update(updates).eq('id', id)

    if (error) {
      console.error('Error actualizando consulta:', error)
      return NextResponse.json({ error: 'No se pudo actualizar' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Error en PATCH consulta:', err)
    return NextResponse.json({ error: 'Error inesperado' }, { status: 500 })
  }
}