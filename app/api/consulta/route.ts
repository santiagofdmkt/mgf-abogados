import { NextResponse } from 'next/server'
import { EMAIL_DESTINO } from '@/lib/contacto'

export const runtime = 'nodejs'

const MAX = { nombre: 120, telefono: 30, email: 160, area: 80, mensaje: 6000 }

function limpiar(valor: unknown, max: number): string {
  if (typeof valor !== 'string') return ''
  return valor.trim().slice(0, max)
}

function escaparHtml(texto: string): string {
  return texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Cuerpo invalido' }, { status: 400 })
  }

  const nombre = limpiar(body.nombre, MAX.nombre)
  const telefono = limpiar(body.telefono, MAX.telefono)
  const email = limpiar(body.email, MAX.email)
  const area = limpiar(body.area, MAX.area)
  const mensaje = limpiar(body.mensaje, MAX.mensaje)

  if (!nombre || telefono.replace(/\D/g, '').length < 8) {
    return NextResponse.json({ ok: false, error: 'Faltan datos' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.MAIL_FROM
  if (!apiKey || !from) {
    console.error('Falta RESEND_API_KEY o MAIL_FROM en las variables de entorno')
    return NextResponse.json({ ok: false, error: 'Envio no configurado' }, { status: 500 })
  }
  const to = process.env.MAIL_TO || EMAIL_DESTINO

  const nombreAsunto = nombre.replace(/[\r\n]+/g, ' ')
  const asunto = `Nueva consulta web (${area || 'sin area'}) - ${nombreAsunto}`

  const texto = [
    'Nueva consulta desde la web',
    '',
    `Nombre: ${nombre}`,
    `Telefono: ${telefono}`,
    `Email: ${email || '(no informado)'}`,
    '',
    mensaje,
  ].join('\n')

  const html = `
    <div style="font-family: Arial, sans-serif; font-size: 14px; color: #1e293b; max-width: 600px;">
      <h2 style="color: #0f2747; margin: 0 0 16px;">Nueva consulta desde la web</h2>
      <table style="border-collapse: collapse; margin-bottom: 16px;">
        <tr><td style="padding: 4px 14px 4px 0; color: #64748b;">Nombre</td><td><strong>${escaparHtml(nombre)}</strong></td></tr>
        <tr><td style="padding: 4px 14px 4px 0; color: #64748b;">Telefono</td><td><strong>${escaparHtml(telefono)}</strong></td></tr>
        <tr><td style="padding: 4px 14px 4px 0; color: #64748b;">Email</td><td>${escaparHtml(email || '(no informado)')}</td></tr>
      </table>
      <div style="white-space: pre-wrap; background: #f1f5f9; border-radius: 8px; padding: 14px; line-height: 1.6;">${escaparHtml(mensaje)}</div>
    </div>
  `

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: asunto,
        html,
        text: texto,
        ...(emailValido ? { reply_to: email } : {}),
      }),
    })

    if (!res.ok) {
      const detalle = await res.text()
      console.error('Resend rechazo el envio:', res.status, detalle)
      return NextResponse.json({ ok: false, error: 'No se pudo enviar' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Error llamando a Resend:', err)
    return NextResponse.json({ ok: false, error: 'No se pudo enviar' }, { status: 502 })
  }
}