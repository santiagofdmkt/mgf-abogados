import { NextResponse } from 'next/server'
import crypto from 'crypto'

function firmar(valor: string, secreto: string) {
  return crypto.createHmac('sha256', secreto).update(valor).digest('hex')
}

export async function POST(request: Request) {
  try {
    const { password } = await request.json()

    const adminPassword = process.env.ADMIN_PASSWORD
    const sessionSecret = process.env.ADMIN_SESSION_SECRET

    if (!adminPassword || !sessionSecret) {
      return NextResponse.json({ error: 'Configuración incompleta del servidor' }, { status: 500 })
    }

    if (password !== adminPassword) {
      return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 })
    }

    const valor = 'ok'
    const firma = firmar(valor, sessionSecret)
    const cookieValue = `${valor}.${firma}`

    const res = NextResponse.json({ ok: true })
    res.cookies.set('mgf_admin', cookieValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 8,
    })
    return res
  } catch {
    return NextResponse.json({ error: 'Error inesperado' }, { status: 500 })
  }
}