import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

// Áreas que entran con prioridad alta (más urgentes / rentables)
const ALTA_PRIORIDAD = ['accidentes-trabajo', 'despidos', 'accidentes-transito']

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { nombre, telefono, email, area, mensaje } = body

    if (!nombre || typeof nombre !== 'string') {
      return NextResponse.json({ error: 'El nombre es obligatorio' }, { status: 400 })
    }

    const prioridad = area && ALTA_PRIORIDAD.includes(area) ? 'alta' : 'media'

    const { error } = await supabaseAdmin.from('consultas').insert({
      nombre,
      telefono: telefono || null,
      email: email || null,
      area: area || null,
      mensaje: mensaje || null,
      prioridad,
    })

    if (error) {
      console.error('Error guardando consulta:', error)
      return NextResponse.json({ error: 'No se pudo guardar la consulta' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Error en /api/consulta:', err)
    return NextResponse.json({ error: 'Error inesperado' }, { status: 500 })
  }
}