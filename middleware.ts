import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Firma con Web Crypto API (compatible con Edge Runtime)
async function firmar(valor: string, secreto: string): Promise<string> {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secreto),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(valor))
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const esAdmin = pathname.startsWith('/admin')
  const esLogin = pathname === '/admin/login'

  if (!esAdmin || esLogin) {
    return NextResponse.next()
  }

  const sessionSecret = process.env.ADMIN_SESSION_SECRET
  const cookie = request.cookies.get('mgf_admin')?.value

  let valida = false
  if (cookie && sessionSecret) {
    const [valor, firma] = cookie.split('.')
    if (valor && firma) {
      const esperada = await firmar(valor, sessionSecret)
      if (esperada === firma) valida = true
    }
  }

  if (!valida) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}