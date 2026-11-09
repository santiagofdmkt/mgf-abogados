import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

// Áreas que entran con prioridad alta (más urgentes / rentables)
const ALTA_PRIORIDAD = ['accidentes-trabajo', 'despidos', 'accidentes-transito']

// Largos máximos para que nadie pueda llenar la base con textos enormes
const MAX = { nombre: 100, telefono: 40, email: 120, area: 50, mensaje: 3000 }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Devuelve el texto limpio y recortado, o null si no es texto o está vacío
function texto(valor: unknown, max: number): string | null {
  if (typeof valor !== 'string') return null
  const limpio = valor.trim()
  if (!limpio) return null
  return limpio.slice(0, max)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const nombre = texto(body?.nombre, MAX.nombre)
    const telefono = texto(body?.telefono, MAX.telefono)
    const email = texto(body?.email, MAX.email)
    const area = texto(body?.area, MAX.area)
    const mensaje = texto(body?.mensaje, MAX.mensaje)

    if (!nombre) {
      return NextResponse.json({ error: 'El nombre es obligatorio' }, { status: 400 })
    }

    // Un email mal escrito no bloquea el envío: se descarta si hay otro medio de contacto
    const emailValido = email && EMAIL_RE.test(email) ? email : null

    if (!telefono && !emailValido) {
      return NextResponse.json({ error: 'Falta un teléfono o email de contacto' }, { status: 400 })
    }

    const prioridad = area && ALTA_PRIORIDAD.includes(area) ? 'alta' : 'media'

    const { error } = await supabaseAdmin.from('consultas').insert({
      nombre,
      telefono,
      email: emailValido,
      area,
      mensaje,
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